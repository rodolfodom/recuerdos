import express from "express"
import morgan from "morgan"
import db from "./config/db.js"


const app = express()
const port = 3000

app.use(morgan("combined"))



app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, async () => {
    try{
        await db.authenticate()
        await db.sync({force: true})
        console.log('base de datos lista')
    }catch(error){
        console.log('error de base de datos')
        console.log(error)
    }finally{
        console.log(`Example app listening on port ${port}`)
    }
})

