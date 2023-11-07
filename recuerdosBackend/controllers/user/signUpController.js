import User from "../../models/user.js"
import bcrypt from "bcrypt";
const rounds = 5;
const passwordRegExp = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@#$%^&+=!.]).{8,}$/

export default async function signUpController(req, res){
    try {
        if(!passwordRegExp.test(req.body.password)){
            throw new Error("La contraseña no cumple los requisitos", {cause: "password"})
        }
        const newUserData = {
            ...req.body,
            roleID: 2,
            password: await bcrypt.hash(req.body.password, rounds)
        }
        const newUser = User.build(newUserData)
        await newUser.save()

        const jsonResponse = {
            success: true,
            data: {
                msg: "Usuario registrado exitosamente",
                user: newUser.get("email")
            }
        }

        res.status(200).json(jsonResponse)

    } catch (error) {
        console.log("***********************************************")
        console.log(error.cause)
        console.log("***********************************************")



        const jsonResponse = {
            success: false,
            data: {
                msg: error.message,
                cause: error.cause? [error.cause]: error.errors.map(error => error.path)
            }
        }

        res.status(400).json(jsonResponse)
    } 
}
