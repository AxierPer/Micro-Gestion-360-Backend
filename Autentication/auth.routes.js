import express from "express"
import { db } from "../firebase/firebase.config.js"
import { getUsers, addUsers } from "../firebase/queries/User/user.query.js"
import jwtMiddleware from "../utils/jwt.middleware.js";


const router = express.Router()

router.get("/", jwtMiddleware,async (req, res)=>{
    if (req.user.role !== 'admin' && req.user.role !== 'tester') {
        return res.status(403).json({ message: 'Acceso denegado: se requiere rol admin' });
    }
    const data = await getUsers(db)
    res.send(data)
})

router.post("/add", jwtMiddleware, async (req, res)=>{
    if (req.user.role !== 'admin' && req.user.role !== 'tester') {
        return res.status(403).json({ message: 'Acceso denegado: se requiere rol admin' });
    }

    const response = await addUsers(db, req.body)
    res.send(response)
})


export default router