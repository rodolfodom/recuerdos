import archiver from "archiver";
import dotenv from "dotenv"
import { Image, Directory } from "../../models/index.js";
import { PassThrough }  from "stream"
import axios from "axios";

dotenv.config()

export default async function download(req, res){
    console.log(req.params)
    const { imageID } = req.params
    const {userID} = req

    try{
        const image = await Image.findOne({
            where: {imageID}
        })
        
        if(image === null) throw new Error("No se ha encontrado la imagen") 

        const container = await Directory.findOne({
            where: {directoryID: image.directoryID}
        })

        if(container.userID != userID) throw new Error("El usuario no esta autorizado")

        const archive = archiver('zip', {
            zlib: {level: 9}
        })

        const passThrough = new PassThrough();
        archive.pipe(passThrough)
        
        const response = await axios.get(`${process.env.CLOUDFRONT_DISTRIBUTION}/${image.imageID}`, { responseType: 'arraybuffer' });

        archive.append(response.data, {name: `${image.imageID}.png`})
        await archive.finalize()

        res.attachment(`${image.imageID}.zip`)
        passThrough.pipe(res)

    }catch(error){
        console.log(error.message)
    }

}