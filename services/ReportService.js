const ReportEstate = require('../models/reportestate');
const Estate = require('../models/estate');
const User = require('../models/user');

class ReportService {
     async createReport(estate_id, user_id, description){
        try {
            const report = await ReportEstate.create({ estate_id, user_id, description });
            return report;
        } catch (error) {
            throw new Error(error.message);
        }
    };
    async getAllReport(currentPage = 1, pageSize = 8) {
        try {
            const offset = (currentPage - 1) * pageSize;
            const reports = await ReportEstate.findAndCountAll({
                include: [
                    { model: User, as: 'user', attributes: { exclude: ['password'] } },
                    { model: Estate, as: 'estate', include: [{ model: User, as: 'user', attributes: { exclude: ['password'] }  }] }
                ],
                attributes: { exclude: ['estate_id', 'user_id', 'deleted_at', 'updated_at'] },
                limit: pageSize,
                offset: offset,
                order: [['created_at', 'DESC']]
            });
            const totalPages = Math.ceil(reports.count / pageSize);
            return { totalItems: reports.count, totalPages, currentPage, reports: reports.rows }
        } catch (error) {
            throw new Error(error.message);
        }
    }
    
}

module.exports = new ReportService();