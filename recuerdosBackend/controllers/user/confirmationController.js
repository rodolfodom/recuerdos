import {User, Directory} from "../../models/index.js"
import { v4 as uuidv4 } from "uuid"

export default async function confirmationController(req, res){
    const user = await User.findOne({where:{token: req.params.token}})

    if(user === null){
        const jsonResponse = {
            success: false,
            msg: "El token proporcionado no coincide con ningun usuario"
        }

        res.status(404).json(jsonResponse)
    }else{

        try {
            const jsonResponse = {
                success: true,
                msg: "La cuenta ha sido confirmada"
            }
            const directoryID = uuidv4()
            const rootDirectory = Directory.build({directoryID, name: 'root', userID: user.get('userID')})
            await rootDirectory.save()
            await user.update({token: null, confirmated: true})
        
            res.status(200).json(jsonResponse)
            
        } catch(error){
            const jsonResponse = {
                success: false,
                msg: "Ocurrió un error"
            }
            res.status(500).json(jsonResponse)
        }


    }
    
    
    
}