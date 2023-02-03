const ReportEstate = require('../models/reportestate');

class ReportService {
     async createReport(estate_id, user_id, description){
        try {
            const report = await ReportEstate.create({ estate_id, user_id, description });
            return report;
        } catch (error) {
            throw new Error(error.message);
        }
    };
}

module.exports = new ReportService();