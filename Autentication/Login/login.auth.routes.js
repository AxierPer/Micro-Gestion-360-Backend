import { config } from "../../utils/config.utils.js";
import express from "express"
import jwt from "jsonwebtoken";
import { getUserByMail } from "../../firebase/queries/User/user.query.js";
import { db } from "../../firebase/firebase.config.js";
import { matchPassword } from "../../utils/hash.utils.js";

const router = express.Router()

router.post('/', async (req, res)=>{
    const user = req.body
    const userExist = await getUserByMail(db, user.email)
    if(!userExist){
        res.status(404).json({message:"El usuario no existe"})
    }
    const validate = await matchPassword(user.password, userExist.password)
    
    if(validate){
        const token = jwt.sign(user, config.jwt.jwtKey, {expiresIn: "1h"})
        res.json({token})
    }else{
        res.status(401).json({ message: 'Contraseña incorrecta' });
    }
})

export default router