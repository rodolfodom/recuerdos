import Role from "./roles.js";
import User from "./user.js";
import Directory from "./directory.js";
import Image from "./image.js";

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

export {Role, User, Directory, Image}