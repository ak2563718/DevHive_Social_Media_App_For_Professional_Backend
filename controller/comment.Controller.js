import { AppError } from '../utils/AppError.js';
import { asyncHandler } from '../utils/asyncHandler.js'
import { prisma } from '../src/db.js'


// 1. Create New Comment
export const createComment = asyncHandler(async(req, res, next)=>{
    const { content } = req.body;
    const userId = req.user.id;
    const postId = req.params.postId;
    const comment = await prisma.comment.create({
        data:{
            content: content,
            authorId: userId,
            postId: postId,
        }
    })
    res.status(201).json({
        success:true,
        message:"comment posted",
        data:comment,
    })
})

// 2. Get all comment on post 
export const getallcommentOnpost = asyncHandler(async(req, res, next)=>{
    const postId = req.params.postId;
    const comments = await prisma.comment.findMany({
        where:{
            postId: postId
        },
        include:{
            author:{
                select:{
                    name:true,
                    email:true,
                    username:true
                }
            }
        }
    })
    if(!comments){
        return next(new AppError('No Comments found', 404))
    }
    res.status(200).json({
        success:true,
        message:"comments fetched",
        comments: comments
    })
})


// 3. Update Comment
export const updateComment = asyncHandler(async(req, res, next)=>{
    const commentId = req.params.commentId;
    const userId = req.user.id;
    const { content} = req.body;
    if(!content){
        return  next(new AppError('Nothing to update',404))
    }
    const comment = await prisma.comment.update({
        where:{
            id:commentId,
            authorId: userId
        },
        data:{
            content: content
        },
        include:{
            author:{
                select:{
                    name:true,
                    email:true,
                    username:true,
                }
            }
        }
    })
    if(!comment){
        return next(new AppError('Comment not found', 404))
    }
    res.status(200).json({
        success:true,
        message:"comment updated",
        comment:comment
    })
})


// 4. Delete comment
export const deleteComment = asyncHandler(async(req, res, next)=>{
    const commentId = req.params.commentId;
    const userId = req.body.userId;
    const comment = await prisma.comment.delete({
        where:{
            id:commentId,
            authorId: userId,
        }
    })
    if(!comment){
        return next(new AppError('No Comment found', 400))
    }
    res.status(200).json({
        success:true,
        message:'comment Deleted',
        comment,
    })
})
