import db from "../config/db.js";
import { DataTypes } from "sequelize";
import User from "./user.js";

const Role = db.define('Role', {
    roleID: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        incrementMe: true
    },
    name: {
        type: DataTypes.STRING(50),
        allowNull: false,
        unique: true
    }
})

Role.hasMany(User, {
    foreignKey: 'roleID',
    allowNull: false,
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
});


User.belongsTo(Role, {
    foreignKey: 'roleID',
    allowNull: false,
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
});

export default Role
