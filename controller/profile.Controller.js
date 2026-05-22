import { asyncHandler } from "../utils/asyncHandler.js"
import { prisma } from "../src/db.js"
import { AppError } from "../utils/AppError.js"
import cloudinary from "../config/cloudinary.js";


export const updateProfile = asyncHandler(
  async (req, res, next) => {
    const id = req.params.id;

    const { profession, imageUrl, public_id } = req.body;

    if (!profession && !imageUrl) {
      return next(
        new AppError(
          "Please provide something to update",
          400
        )
      );
    }
    const data = {};

    // Update image
    if (imageUrl) {
      const profile = await prisma.profile.findFirst({
        where: {
          id,
        },
      });

      // Delete old image
      if (profile?.public_id) {
        await cloudinary.uploader.destroy(
          profile.public_id
        );
      }

      data.imageUrl = imageUrl;
      data.public_id = public_id;
    }

    // Update profession
    if (profession) {
      data.profession = profession;
    }

    // Update profile
    const updatedProfile =
      await prisma.profile.update({
        where: {
          id,
        },

        data,
      });

    res.status(200).json({
      success: true,
      message: "Profile updated successfully",
      profile: updatedProfile,
    });
  }
);

export const getProfile = asyncHandler(async(req, res, next)=>{
    const userId = req.user.id;
    const profile = await prisma.profile.findFirst({
        where:{
            userId,
        }
    })
    if(!profile){
        return next(new AppError('Profile not registered', 400))
    }
    res.status(200).json({
        success:true,
        message:"Profile found",
        profile
    })
})