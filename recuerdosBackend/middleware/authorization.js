import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

export default function authorization(req, res, next){
    const token = req.headers.authorization;
    
    if (!token) {
        return res.status(401).json({ mensaje: 'Token no proporcionado' });
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, decoded)=>{
        if (err) {
            return res.status(401).json({ mensaje: 'Token inválido' });
        }

        req.userID = decoded.userID;
        //console.log("************* usuario autorizado en middleware ************")
        next();
    })
}