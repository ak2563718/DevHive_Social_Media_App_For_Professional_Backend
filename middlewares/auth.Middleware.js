
import { prisma } from "../src/db.js";
import { decodeaccessToken } from "../utils/TokenCreation.js";



export const authmiddleware = async(req, res, next)=>{
    try {
        const token = req.headers?.authorization;
        if(!token || !token.startsWith("Bearer ")){
            res.status(401).json({message:"No token found"})
        }
        const auth = token.split(' ')[1];
        const email = await decodeaccessToken(auth).email;
        if(!email){
            res.status(401).json({
                success:false,
                message:"Invalid Token"
            })
        }
        const user = await prisma.user.findUnique({
            where:{
                email:email
            }
        })
        req.user = user;
        next();
    } catch (error) {
        res.status(500).json({success:false, message:"Internal Server Error!"})
    }
}