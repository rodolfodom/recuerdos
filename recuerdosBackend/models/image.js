import db from "../config/db.js";
import { DataTypes } from "sequelize";

const Image = db.define(
  "Image",
  {
    imageID: {
      primaryKey: true,
      type: DataTypes.UUID,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    directoryID:{
        type: DataTypes.UUID,
        allowNull: false,
        references: {
            model: "Directories",
            key: "directoryID",
        }
    }
  },
  {
    indexes: [
      {
        unique: true,
        fields: ["name", "directoryID"],
      },
    ],
  }
);

export default Image;
