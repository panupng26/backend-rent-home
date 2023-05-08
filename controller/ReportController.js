const reportService = require('../services/ReportService');

exports.reportEstate = async (req, res) => {
    const { description } = req.body;
    const estate_id = req.params.id;
    if (!description) {
        return res.status(400).json({ status: false, error: 'description is required' });
    }
    
    try {
        const report = await reportService.createReport(estate_id, req.user.user_id, description);
        return res.status(201).json({ status: true, message: 'Report created successfully', report });
    } catch (error) {
        return res.status(500).json({ status: false, error: error.message });
    }
};
exports.reportAll = async (req, res) => {
    try {
        const { currentPage } = req.body
        const report = await reportService.getAllReport(currentPage);
        return res.status(201).json({ status: true, report });
    } catch (error) {
        return res.status(500).json({ status: false, error: error.message });
    }
}
