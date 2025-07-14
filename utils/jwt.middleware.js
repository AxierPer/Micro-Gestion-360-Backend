import { expressjwt } from "express-jwt"
import { config } from "./config.utils.js"

const jwtMiddleware = expressjwt({
    secret: config.jwt.jwtKey,
    algorithms: ['HS256'],
    requestProperty: 'user'
})

export default jwtMiddleware