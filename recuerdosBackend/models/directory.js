import db from "../config/db.js";
import { DataTypes } from "sequelize";

const Directory = db.define("Directory", {
  directoryID: {
    type: DataTypes.UUID,
    primaryKey: true,
    allowNull: false,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  userID: {
    type: DataTypes.UUID,
    allowNull: false,
    references: {
      model: "Users",
      key: "userID",
    },
    containerDirectoryID: {
      type: DataTypes.UUID,
      unique: true,
      allowNull: false,
      references: {
        model: "Directories",
        key: "directoryID",
      },
    },
  },
}, {
    indexes: [
        {
            unique: true,
            fields: ["name", "userID", "containerDirectoryID"]
        }
    ]
});

export default Directory;
