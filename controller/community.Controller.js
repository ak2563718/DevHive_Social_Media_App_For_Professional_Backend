import { AppError } from "../utils/AppError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { prisma } from "../src/db.js";


export const createCommunity = asyncHandler(async( req, res, next)=>{
    const { name, slug, type, description } = req.body;
    if(!name || !slug || !type || !description){
        return next(new AppError('Please Provide all required data', 400))
    }
    const communities = await prisma.community.create({
        data:{
            name,
            slug,
            type,
            description,
        }
    })
    res.status(200).json({
        success:true,
        messsage:'Community Created Successfully',
        data:communities
    })
})


export const getAllCommunity = asyncHandler(async(req, res, next)=>{
    const allcommunity = await prisma.community.findMany({})
    if(!allcommunity){
        return next(new AppError('No community Found ', 400))
    }
    res.status(200).json({
        success:true,
        messsage:'All community found Successfully',
        data:allcommunity
    })
})


export const getSingleCommunity = asyncHandler(async(req, res, next)=>{
    const id = req.params.id;
    const communities = await prisma.community.findUnique({
        where:{
            id
        },
        include:{
            members:true,
            posts:true,
        }
    })
    if(!communities){
        return next(new AppError('Community not found', 400))
    }
    res.status(200).json({
        success:true,
        message:'Community found',
        data:communities
    })
})

// 4. User can join a community
export const joinCommunity = asyncHandler(async(req, res, next)=>{
    const { communityId} = req.params;
    const {userId} = req.body;

     const community = await prisma.community.update({
      where:{
         id:communityId
      },

      data:{
         members:{
            connect:{
               id:userId
            }
         }
      }
   })
   res.status(200).json(community)
})


export const removeCommunity = asyncHandler(async(req, res, next)=>{
    const { communityId } = req.params;
    const { userId } = req.body;

    const communities = await prisma.community.update({
        where:{
            id:communityId
        },
        data:{
            members:{
                disconnect:{
                    id:userId
                }
            }
        },
        include:{
            members:true
        }
    })

    res.status(200).json({
        success:true,
        message:"User removed successfully",
        data:communities,
    })
})