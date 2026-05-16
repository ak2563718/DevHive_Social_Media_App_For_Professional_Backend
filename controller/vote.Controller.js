import { AppError } from '../utils/AppError.js';
import { asyncHandler } from '../utils/asyncHandler.js';
import { prisma } from '../src/db.js';


export const manageVotes = asyncHandler(async (req, res, next) => {
    const { vote, userId } = req.body;
    const postId = req.params.postId;

    if (!vote) {
        return next(new AppError('No vote to update', 400));
    }

    const found = await prisma.vote.findFirst({
        where: {
            userId,
            postId,
        }
    });

    // CREATE NEW VOTE
    if (!found) {
        await prisma.vote.create({
            data: {
                type: vote,
                userId,
                postId,
            }
        });

        return res.status(200).json({
            success: true,
            message: "Vote added successfully"
        });
    }

    // REMOVE LIKE
    if (found.type === 'Like' && vote === 'Like') {
        await prisma.vote.delete({
            where: {
                id: found.id
            }
        });
    }

    // REMOVE DISLIKE
    else if (found.type === 'Dislike' && vote === 'Dislike') {
        await prisma.vote.delete({
            where: {
                id: found.id
            }
        });
    }

    // SWITCH VOTE
    else {
        await prisma.vote.update({
            where: {
                id: found.id
            },
            data: {
                type: vote
            }
        });
    }

    res.status(200).json({
        success: true,
        message: "Vote managed successfully",
       
    });
});


// 2. Get all counts of likes and dislikes on post 
export const getPostVotes = asyncHandler(async (req, res, next) => {
    const postId = req.params.postId;

    const voteStats = await prisma.vote.groupBy({
        by: ["type"],
        where: {
            postId
        },
        _count: {
            type: true
        }
    });

    let likes = 0;
    let dislikes = 0;

    voteStats.forEach((item) => {
        if (item.type === "Like") {
            likes = item._count.type;
        }

        if (item.type === "Dislike") {
            dislikes = item._count.type;
        }
    });

    res.status(200).json({
        success: true,
        data: {
            likes,
            dislikes,
            totalVotes: likes + dislikes
        }
    });
});