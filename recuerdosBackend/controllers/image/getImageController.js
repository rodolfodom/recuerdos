import { Image } from "../../models/index.js";
import dotenv from "dotenv";

dotenv.config();

export default function getImageController(req, res) {
  const { imageID } = req.body;

  try {
    const myImage = Image.findOne({ where: { imageID } }).toJSON();
    res.status(200).json({
      success: true,
      data: {
        ...myImage,
        url: `${process.env.CLOUDFRONT_DISTRIBUTION}/${imageID}`,
      },
    });
  } catch (error) {
    res.status(400).json({
        success: false,
        data: {
          error: error.message
        },
      });


  }
}
