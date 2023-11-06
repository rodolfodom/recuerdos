import db from "../config/db.js";
import { DataTypes} from "sequelize";
import Role from "./roles.js";

const User = db.define('User', {
    userID: {
        primaryKey: true,
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUID,
        allowNull: false
    },
    firstName: {
        type: DataTypes.STRING,
        allowNull: false
    },
    fatherLastName: {
        type: DataTypes.STRING,
        allowNull: false
    },
    motherLastName: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    },
    confimated: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
        allowNull: false

    },
    token: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: true
    }
})




export default User