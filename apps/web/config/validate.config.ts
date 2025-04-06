import jwt from 'jsonwebtoken'
import { MESSAGES } from '../utils/messages';

export const JWT_SECRET= "supersecretstring123"

export function checkToken(token: string){

    const verifiedUser = jwt.verify(token, JWT_SECRET ?? "");
    console.log('jwt secret:' , process.env.JWT_SECRET)
    if(!verifiedUser){
        return MESSAGES.USER.NOT_FOUND
    }
    return verifiedUser
}