exports.validateIdReport = (req, res, next) => {
    if (!req.params.id) {
      return res.status(400).json({ error: 'id is required' });
    }
    if (isNaN(req.params.id)) {
      return res.status(400).json({ error: 'id must be a number' });
    }
    next();
};