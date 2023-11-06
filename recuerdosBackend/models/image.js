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

Image.belongsTo(Directory, {
    foreignKey: 'directoryID',
    allowNull: false,
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
});

Directory.hasMany(Image, {
    foreignKey: 'directoryID',
    allowNull: false,
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
});


export default Image