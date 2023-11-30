import { Directory, Image } from "../../models/index.js";
import dotenv from "dotenv";

dotenv.config();

export default async function getDirectoryChildren(req, res) {
  const userID = req.userID
  const { directoryID } = req.params
  
  try {
    
    const directory = await Directory.findByPk(directoryID);
    if(directory === null) throw new Error("El directorio específicado no existe")
    if(directory.userID != userID) throw new Error("Usuario no autorizado")

    const childrenDirectories = await Directory.findAll({
      where: {
        containerDirectoryID: directory.directoryID
      }
    })
    
    const childrenImages = await Image.findAll({
      where: {
        directoryID: directory.directoryID
      }
    })

    const childrenDirectoriesJson = childrenDirectories.map(dir => dir.toJSON())
    const childrenImagesJson = childrenImages.map(img => img.toJSON())

    const children = {
      images: childrenImagesJson,
      directories: childrenDirectoriesJson
    }


    res.status(200)
      .json({
        success: true,
        data: children
      })

  }catch(error){
    res.status(400)
      .json({
        success: false,
        msg: error.message
      })
  }
}
