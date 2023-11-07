import db from "../config/db.js";
import { DataTypes } from "sequelize";
import User from "./user.js";

const Role = db.define('Role', {
    roleID: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: DataTypes.STRING(50),
        allowNull: false,
        unique: true
    }
})


export default Role
