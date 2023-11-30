import { Directory } from "../../models/index.js";
import dotenv from "dotenv";
import { v4 as uuidv4 } from "uuid";

dotenv.config();

export default async function createDirectory(req, res) {
  const { name, containerDirectoryID } = req.body;
  const userID = req.userID;

  console.log(userID)

  try {
    const container = await Directory.findByPk(containerDirectoryID);
    console.log("2")
    console.log(container)

    if (container.userID != userID) throw new Error("Usuario no autorizado");
    console.log("3")
    if (container === null)
      throw new Error("El directorio contenedor no existe");

    const newDirectoryID = uuidv4();
    const newDirectory = await Directory.create({
      directoryID: newDirectoryID,
      name,
      containerDirectoryID,
      userID,
    });

    const newDirectoryJson = newDirectory.toJSON();

    res.status(200).json({
      success: true,
      directory: newDirectory,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
}
