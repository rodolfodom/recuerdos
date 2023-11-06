import db from "../config/db.js";
import { DataTypes} from "sequelize";
import User from "./user.js";


const Directory = db.define('Directory', {
        directoryID: {
            type: DataTypes.UUID,
            primaryKey: true,
            allowNull: false
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false
        }
    }    
)

Directory.hasMany(Directory, {
    foreignKey: 'containerDirectoryID',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
});
Directory.belongsTo(Directory, {
    foreignKey: 'containerDirectoryID',
    allowNull: false,
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
});


Directory.belongsTo(User, {
    foreignKey: 'userID',
    allowNull: false,
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
});


User.hasMany(Directory,{
    foreignKey: 'userID',
    allowNull: false,
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
});



export default Directory