import { AppError } from "../utils/AppError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { prisma } from "../src/db.js";


export const createCommunity = asyncHandler(async( req, res, next)=>{
    const { name, type, description } = req.body;
    if(!name  || !type || !description){
        return next(new AppError('Please Provide all required data', 400))
    }
    let slug = name.toLowerCase().replace(/\s+/g,"_")
    const communities = await prisma.community.create({
        data:{
            name,
            slug:slug,
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
    const allcommunity = await prisma.community.findMany({
        include:{
            _count:{
                select:{
                    members:true,
                    posts:true,
                }
            }
        }
    })
    if(!allcommunity){
        return next(new AppError('No community Found ', 400))
    }
    res.status(200).json({
        success:true,
        messsage:'All community found Successfully',
        data:allcommunity
    })
})


export const getSingleCommunity = asyncHandler(
  async (req, res, next) => {

    const id = req.params.id;
    console.log("community id is ",id)
    // logged in user id
    const userId = req.user.id;
    console.log('userId is ',userId)
    const communities = await prisma.community.findUnique({
      where: {
        id,
      },

      include: {
        members: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },

        posts: {
          include: {
            author: {
              select: {
                name: true,
                username: true,
                email: true,
              },
            },
          },
        },
      },
    });

    if (!communities) {
      return next(
        new AppError("Community not found", 400)
      );
    }

    // check joined or not

    const isJoined = communities.members.some(
      (member) => member.id === userId
    );

    res.status(200).json({
      success: true,
      message: "Community found",

      data: {
        ...communities,
        isJoined,
      },
    });
  }
);

// 4. User can join a community
export const joinCommunity = asyncHandler(async(req, res, next)=>{
    const { communityId} = req.params;
    const userId = req.user?.id;
     console.log(userId)
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
      },
      include:{
        members:true
      }
   })
   res.status(200).json(community)
})


export const removeCommunity = asyncHandler(async(req, res, next)=>{
    const { communityId } = req.params;
    const  userId  = req.user.id;

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
           _count:{
            members:true
           }
        }
    })

    res.status(200).json({
        success:true,
        message:"User removed successfully",
        data:communities,
    })
})


export const checkjoined = asyncHandler(asyncHandler())