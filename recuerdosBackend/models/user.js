import db from "../config/db.js";
import { DataTypes, UUIDV4} from "sequelize";
import Role from "./roles.js";

const User = db.define('User', {
    userID: {
        primaryKey: true,
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false
    },
    firstName: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            is: /^[A-Za-zÁÉÍÓÚÑáéíóúñ\s-]{1,100}$/
        }
    },
    fatherLastName: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            is: /^[A-Za-zÁÉÍÓÚÑáéíóúñ\s-]{1,100}$/
        }
    },
    motherLastName: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            is: /^[A-Za-zÁÉÍÓÚÑáéíóúñ\s-]{1,100}$/
        }
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
            is: /^[\w\.-]+@[a-zA-Z\d\.-]+\.[a-zA-Z]{2,}$/
        }
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    confirmated: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
        allowNull: false,
    },
    token: {
        type: DataTypes.UUID,
        defaultValue: UUIDV4,
        unique: true,
        allowNull: true
    }
})


export default User