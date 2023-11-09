import { S3Client, PutObjectCommand} from "@aws-sdk/client-s3"
import dotenv from "dotenv"
import {v4 as uuidv4} from "uuid"
import { Image, Directory } from "../../models/index.js"



dotenv.config()
const bucketName = process.env.BUCKET_NAME
const bucketRegion = process.env.BUCKET_REGION


const s3 = new S3Client({
    region: bucketRegion,
})

export default async function uploadController(req, res){

    const {description, name, containerDirectoryID} = req.body


    const imageID = uuidv4()
    const command = new PutObjectCommand({
        Bucket: bucketName,
        Key: imageID,
        Body: req.file.buffer,
        ContentType: req.file.mimetype
    })

    try{
        const container = await Directory.findByPk(containerDirectoryID)
        if(container === null) throw new Error("El directorio no existe")
        await s3.send(command)
        const newImage = Image.build({description, name, imageID, containerDirectoryID})
        await newImage.save()
        res.status(200).json({success: true, msg: "imagen cargada exitosamente"})

    }catch(error){
        res.status(400).json({success: false, msg: error.message})
    }
    
}
