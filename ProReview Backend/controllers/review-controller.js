import mongoose from "mongoose";
import Review from "../model/Review";
import User from "../model/User";

export const getAllReviews = async(req, res, next) => {
    let reviews;
    try {
        reviews = await Review.find();
    } catch (err) {
        return console.log(err);
    }
    if(!reviews) {
        return res.status(404).json({message : "No Reviews Found"});
    }
    return res.status(200).json({reviews});
}

export const addReview = async(req, res, next) => {
    const {title, description, image, user} = req.body;

    let existingUser;
    try {
        existingUser = await User.findById(user);
    } catch (err) {
        return console.log(err);
    }
    if(!existingUser) {
        return res.status(400).json({message : "User Not Found"});
    }
    const review = new Review({
        title,
        description,
        image,
        user,
    });
    try {
        const session = await mongoose.startSession();
        session.startTransaction();
        await review.save({session});
        existingUser.reviews.push(review);
        await existingUser.save({session});
        await session.commitTransaction();
    } catch (err) {
        console.log(err);
        return res.status(500).json({message: err});
    }
    return res.status(200).json({review});
}

export const updateReview = async(req, res, next) => {
    const reviewId = req.params.id;
    const {title, description, image} = req.body;

    let review;
    try {
        review = await Review.findByIdAndUpdate(reviewId, {
            title,
            description,
            image
        })
    } catch (err) {
        return console.log(err);
    }
    if (!review) {
        return res.status(500).json({message : "Unable To Update The Review"});
    }

    return res.status(200).json({review});
}

export const getById = async(req, res, next) => {
    const id = req.params.id;


    let review;
    try {
        review = await Review.findById(id);
    } catch (err) {
        return console.log(err);
    }
    if(!review) {
        return res.status(404).json({message : "Review Does Not Exist"});
    }

    return res.status(200).json({review});
}

export const deleteReview = async (req, res, next) => {
    const id = req.params.id;

    let existingReview;
    try {
        existingReview = await Review.findById(id);
    } catch (err) {
        return console.log(err);
    }
    if(!existingReview) {
        return res.status(400).json({message : "Review Not Found"});
    }

    let review;
    try {
        review = await Review.findByIdAndDelete(id).populate("user");
        await review.user.reviews.pull(review);
        await review.user.save();
    } catch (err) {
        return console.log(err);
    }
    if(!review) {
        return res.status(500).json({message : "Unable to Delete"});
    }

    return res.status(200).json({message : "Successfully Deleted"});
}

export const getByUserId = async (req, res, next) => {
    const userId = req.params.id;
    let userReviews;
    try {
        userReviews = await User.findById(userId).populate("reviews");
    } catch (err) {
        return console.log(err);
    }
    if(!userReviews) {
        return res.status(404).json({message : "No Review Found"});
    }

    return res.status(200).json({reviews: userReviews});
}