import express from "express"
import morgan from "morgan"
import db from "./config/db.js"
import userRouter from "./routes/userRouter.js"
import {Role} from "./models/index.js"


const app = express()
const port = 3000

app.use(morgan("combined"))
app.use(express.json())

app.use('/user', userRouter)

app.listen(port, async () => {
    try{
        await db.authenticate()
        await db.sync({force: true})
        console.log('base de datos lista')
        const adminRole = Role.build({name: "administrator"})
        const generalRole = Role.build({name: "general"})

        await adminRole.save()
        await generalRole.save()
    }catch(error){
        console.log('error de base de datos')
        console.log(error)
    }finally{
        console.log(`Example app listening on port ${port}`)
    }
})

