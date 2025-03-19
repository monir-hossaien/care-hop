
// post review
import {fetchReviewsService, saveReviewService} from "../services/reviewService.js";

export const postReview = async (req, res) => {
    const result = await saveReviewService(req)
    return res.status(result.statusCode).json(result)
}

// fetch review list
export const fetchReviews = async (req, res) => {
    const result = await fetchReviewsService(req)
    return res.status(result.statusCode).json(result)
}

