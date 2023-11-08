import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3"
import dotenv from "dotenv"
import {v4 as uuidv4} from "uuid"

dotenv.config()
const bucketName = process.env.BUCKET_NAME
const bucketRegion = process.env.BUCKET_REGION


const s3 = new S3Client({
    region: bucketRegion,
})


export default async function uploadController(req, res){
    console.log(req.file)

    const command = new PutObjectCommand({
        Bucket: bucketName,
        Key: uuidv4(),
        Body: req.file.buffer,
        ContentType: req.file.mimetype
    })

    const respuesta = await s3.send(command)
    console.log("respuesta bucket", respuesta)
    res.send({})
}
