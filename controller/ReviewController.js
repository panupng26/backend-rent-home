const reviewService = require('../services/ReviewService');

exports.createReview = async (req, res) => {
    const estate_id = req.params.id
    const { rate_score, description } = req.body
    try {
        const review = await reviewService.createReview(req.user.user_id, estate_id, rate_score, description)
        return res.status(201).json({ status: true, message: "Review created successfully", review})
    } catch (error) {
        return res.status(500).json({ status: false, error: error.message })
    }
}

exports.getReviewByEstateId = async (req, res) => {
    const estate_id = req.params.id
    try {
        const review = await reviewService.ReviewByEstateId(estate_id)
        const reviewItems = review;
        const totalRateScore = reviewItems.reduce((sum, item) => sum + item.rate_score, 0);
        const averageRateScore = totalRateScore / reviewItems.length;
        let roundedAverageRateScore = Math.floor(averageRateScore);
        if (averageRateScore % 1 >= 0.5) {
            roundedAverageRateScore += 1;
        }
        return res.status(201).json({ status: true, message: "Review created successfully", review, average_rate: roundedAverageRateScore, float_average_rate: averageRateScore })
    } catch (error) {
        return res.status(500).json({ status: false, error: error.message })
    }
}