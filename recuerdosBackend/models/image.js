import db from "../config/db.js";
import { DataTypes} from "sequelize";
import Directory from "./directory.js";

const Image = db.define('Image', {
    imageID: {
        primaryKey: true,
        type: DataTypes.UUID,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    url: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    }
})




export default Image