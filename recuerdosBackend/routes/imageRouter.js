import { Router } from "express";
import authorization from "../middleware/authorization.js";
import uploadController from "../controllers/image/uploadController.js";
import getImageController from "../controllers/image/getImageController.js";
import multer from "multer";

const storage = multer.memoryStorage()
const upload = multer({storage})

const imageRouter = Router()
imageRouter.use(authorization)
imageRouter.post('/upload', upload.single('image') ,uploadController);
imageRouter.post('/get',getImageController);


export default imageRouter