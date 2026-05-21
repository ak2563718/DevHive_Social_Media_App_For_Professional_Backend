import { asyncHandler } from "../utils/asyncHandler.js";
import { AppError } from "../utils/AppError.js";
import { prisma } from "../src/db.js";


// 1. Create a post only 
export const createPost = asyncHandler(async(req, res, next)=>{
    const userId = req.user?.id;
    console.log(userId)
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
        },
        include:{
            author:{
                select:{
                    name:true,
                    email:true,
                    username:true,
                }
            },
        }
    })
    res.status(200).json({
        success:true,
        message:"Post created successfully",
        data:post
    })
})


// 2. Get all posts in a community
export const getAllPosts = asyncHandler(async (req, res, next) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;

  const skip = (page - 1) * limit;

  const [posts, totalPosts] = await Promise.all([
    prisma.post.findMany({
      skip,
      take: limit,

      where:{
        communityId:null,
      },

      orderBy: {
        createdAt: "desc",
      },

      include: {
        _count:{
            select:{
                comments:true,
                votes:true,
            }
        },
        author: {
            select:{
                name:true,
                email:true,
            }
        },
      },
    }),

    prisma.post.count(),
  ]);

  const totalPages = Math.ceil(totalPosts / limit);

  res.status(200).json({
    success: true,
    message: "Posts fetched successfully",

    pagination: {
      currentPage: page,
      totalPages,
      totalPosts,
      limit,
      hasNextPage: page < totalPages,
      hasPrevPage: page > 1,
    },

    data: posts,
  });
});

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


export const postinsideCommunity = asyncHandler(async(req, res, next)=>{
    const {communityId} = req.params;
    const userId = req.user.id;
    let { title , content, imageUrl } = req.body;
    if(!title || !content){
        return next(new AppError("title and content are the required field" , 400))
    }
   const data = await prisma.post.create({
    data: {
        title,
        content,
        imageUrl,

        author: {
            connect: {
                id: userId,
            }
        },

        community: {
            connect: {
                id: communityId,
            }
        }
    },

    include: {
        author: {
            select: {
                name: true,
                email: true,
                username: true,
            }
        },

        community: true,
    }
})
    res.status(201).json({
        message:"Post created Successfully",
        data,
        success:true,
    })
})