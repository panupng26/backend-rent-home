const Review = require('../models/review');
const User = require('../models/user');
const Estate = require('../models/estate');

class ReviewService {
    async createReview(user_id, estate_id, rate_score, description) {
        try {
            const review = await Review.create({ user_id, estate_id, rate_score, description })
            return review
        } catch (err) {
            throw new Error(err.message)
        }
    }
    async ReviewByEstateId(estate_id) {
        try {
            const reviews = await Review.findAll({
                where: { estate_id: estate_id },
                order: [['created_at', 'DESC']],
                include: [{ model: User, as: 'user', attributes: { exclude: ['password'] }}
            ],attributes: { exclude: ['user_id'] }
            });
            return reviews
        } catch (err) {
            throw new Error(err.message)
        }
    }
}

module.exports = new ReviewService();