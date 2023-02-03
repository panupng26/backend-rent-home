const reportService = require('../services/ReportService');

exports.reportEstate = async (req, res) => {
    const { user_id, description } = req.body;
    const estate_id = req.params.id;
    if (!user_id) {
        return res.status(400).json({ error: 'user_id is required' });
    }
    if (!description) {
        return res.status(400).json({ error: 'description is required' });
    }
    
    try {
        const report = await reportService.createReport(estate_id, user_id, description);
        return res.status(201).json({ message: 'Report created successfully', report });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};
