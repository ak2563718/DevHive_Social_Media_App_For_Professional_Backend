import { asyncHandler } from "../utils/asyncHandler.js";
import { AppError } from "../utils/AppError.js";
import { prisma } from "../src/db.js";


// 1. Create a post in a community
export const createPost = asyncHandler(async(req, res, next)=>{
    const communityId = req.params.communityId;
    const userId = req.headers.userid;
    console.log("this is header",userId)
    const { title, content, imageUrl} = req.body;
    if(!title || !content || !imageUrl) {
        return next(new AppError('Please filled all important field', 400))
    }
    const post = await prisma.post.create({
        data:{
            title,
            content,
            imageUrl,

            author:{
                connect:{
                    id:userId
                }
            },
            community:{
                connect:{
                    id:communityId
                }
            }

        },
        include:{
            community:true,
            author:true,
        }
    })
    res.status(200).json({
        success:true,
        message:"Post created successfully",
        data:post
    })
})


// 2. Get all posts in a community
export const getAllPosts = asyncHandler(async(req, res, next)=>{
    const posts = await prisma.post.findMany({
        include:{
            community:true,
            author:true,
        }
    })
    if(!posts){
        return next(new AppError('No posts found', 400))
    }
    res.status(200).json({
        success:true,
        message:"Posts found",
        data:posts
    })
})


// 3. Get a post by id
export const getSinglePost = asyncHandler(async(req, res, next)=>{
    const id = req. params.id;
    const post =await prisma.post.findFirst({
        where:{
            id
        },
        include:{
            community:true,
            author:{
                select:{
                    name:true,
                    email:true,
                }
            }
        }
    })
    if(!post){
        return next(new AppError('No post found', 400))
    }
    res.status(200).json({
        success:true,
        message:'Post found',
        data:post,
    })
})


// 4. Get a post by user
export const getPostbyUser = asyncHandler(async(req, res, next)=>{
    const {userId} = req.body;
    const post = await prisma.post.findMany({
        where:{
            authorId:userId
        },
        include:{
            author:{
                select:{
                    name:true,
                    email:true,
                }
            },
            community:true
        }
    })
    if(!post){
        return next(new AppError('No post found',400))
    }
    res.status(200).json({
        success:true,
        message:'Post found',
        data:post
    })
})


// 5. Delete Post 
export const deletePost = asyncHandler(async(req, res, next)=>{
    const id = req.params.id;
    const post = await prisma.post.delete({
        where:{
            id
        }
    })
    if(!post){
        return next(new AppError('No post found', 400))
    }
    res.status(200).json({
        success:true,
        message:'Post Deleted Successfully'
    })
})