import User from "../../models/user.js"

export default async function confirmationController(req, res){
    const user = await User.findOne({where:{token: req.params.token}})

    if(user=== null){
        const jsonResponse = {
            success: false,
            msg: "El token proporcionado no coincide con ningun usuario"
        }

        res.status(404).json(jsonResponse)
    }else{
        const jsonResponse = {
            success: true,
            msg: "La cuenta ha sido confirmada"
        }

        await user.update({token: null, confirmated: true})

        res.status(200).json(jsonResponse)
    }
    

}