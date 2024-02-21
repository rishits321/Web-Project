import express from 'express';
import { getAllReviews, addReview, updateReview, getById, deleteReview, getByUserId } from "../controllers/review-controller";
const reviewRouter = express.Router();

reviewRouter.get("/", getAllReviews);
reviewRouter.post("/add", addReview);
reviewRouter.put("/update/:id", updateReview);
reviewRouter.get("/:id", getById);
reviewRouter.delete("/delete/:id", deleteReview);
reviewRouter.get('/user/:id', getByUserId);

export default reviewRouter;