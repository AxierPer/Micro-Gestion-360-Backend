import express from "express"
import { config } from "./utils/config.utils.js"
import authRotes from "./Autentication/auth.routes.js"
import login from "./Autentication/Login/login.auth.routes.js"

const app = express()

app.use(express.json())

app.use('/users', authRotes)
app.use('/login', login)

app.listen(config.server.port, ()=>{
    console.log(`Server listen in port http://localhost:${config.server.port}/`)
})

export default app