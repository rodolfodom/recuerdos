import Role from "./roles.js";
import User from "./user.js";
import Directory from "./directory.js";
import Image from "./image.js";
import { QueryInterface } from "sequelize";

Role.hasMany(User, {
  foreignKey: {
    name: "roleID",
    allowNull: false,
  },
  sourceKey: "roleID",
});

User.belongsTo(Role, {
  foreignKey: {
    name: "roleID",
    allowNull: false,
  },
  sourceKey: "roleID",
});

Directory.belongsTo(User, {
  foreignKey: {
    name: "userID",
    allowNull: false,
  },
  sourceKey: "userID",
});

User.hasMany(Directory, {
  foreignKey: {
    name: "userID",
    allowNull: false,
  },
  sourceKey: "userID",
});

Image.belongsTo(Directory, {
  foreignKey: {
    name: "directoryID",
    allowNull: false,
  },
  sourceKey: "directoryID",
});

Directory.hasMany(Image, {
  foreignKey: {
    name: "directoryID",
    allowNull: false,
  },
  sourceKey: "directoryID",
});

Directory.hasMany(Directory, {
  foreignKey: "containerDirectoryID",
  sourceKey: "directoryID",
});

Directory.belongsTo(Directory, {
  foreignKey: "containerDirectoryID",
  sourceKey: "directoryID",
});

export { Role, User, Directory, Image };
