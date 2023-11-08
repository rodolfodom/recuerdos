import { Router } from "express";
import uploadController from "../controllers/image/uploadController.js";
import multer from "multer";

const storage = multer.memoryStorage()
const upload = multer({storage})

const imageRouter = Router()

imageRouter.post('/upload', upload.single('image') ,uploadController);


export default imageRouter