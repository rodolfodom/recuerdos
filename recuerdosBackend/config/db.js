import  Sequelize  from "sequelize";
import dotenv from "dotenv"

dotenv.config()

console.log(process.env.DB_URI)
const db = new Sequelize(process.env.DB_URI)

export default db;