import {User, Directory} from "../../models/index.js"
import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"
import dotenv from "dotenv"


dotenv.config()

export default async function logInController(req, res){
    const {email, password} = req.body
    
    try{
        const user = await User.findOne({where: {email}})
        

        if(!user || !bcrypt.compareSync(password, user.password)){
            res.status(401).json({msg: "Credenciales inválidas"})
        }else if(!user.confirmated) {
            res.status(401).json({msg: 'La cuenta no ha sido confirmada'})
        }else{
            const rootDirectory = await Directory.findOne({
                where: {
                    userID: user.userID,
                    name: 'root',
                    containerDirectoryID: null
                }
            })

            
            
            const authToken = jwt.sign({userID: user.userID}, process.env.JWT_SECRET, {
                expiresIn: '1h'
            })

    
            res.status(200)
            .cookie('tokenAuth', authToken)
            .cookie('rootDirectory', rootDirectory.directoryID)
            .json({
                authToken, 
                rootDirectory: rootDirectory.directoryID
            })
            }


    }catch(error){
        console.log(error)
        res.status(500).json({msg: 'server error'})
    }
    




}