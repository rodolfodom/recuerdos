import { Router } from "express";
import uploadController from "../controllers/image/uploadController.js";
import getImageController from "../controllers/image/getImageController.js";
import multer from "multer";

const storage = multer.memoryStorage()
const upload = multer({storage})

const imageRouter = Router()

imageRouter.post('/upload', upload.single('image') ,uploadController);
imageRouter.post('/get',getImageController);


export default imageRouter