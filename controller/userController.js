import { prisma } from "../src/db.js";


export const createUser = async(req, res)=>{
    try {
        const { name, email, password} = req.body;
        const user = await prisma.user.create({
            data:{name, email, password}
        })
        res.status(201).json(user);
    } catch (error) {
        console.log(error.message);
        res.status(500).json({message:"Internal server error"})
    }
}