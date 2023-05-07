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
    async getAllReport() {
        try {
            const reports = await ReportEstate.findAll({
                include: [{ model: Estate, as: 'estate' }, 
                { model: User, as: 'user', attributes: { exclude: ['password'] } } ],
                attributes: { exclude: ['estate_id', 'user_id', 'deleted_at', 'updated_at'] }
            });
            return reports
        } catch (error) {
            throw new Error(error.message);
        }
    }
}

module.exports = new ReportService();