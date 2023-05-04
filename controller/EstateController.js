const estateService = require('../services/EstateService');

const selfPerpage = 8
exports.createEstate = async (req, res) => {
    const inputReq = req.body;
    inputValidate = validateCreateEstate(inputReq)
    if (inputValidate.status === false) {
        return res.status(400).json({ status: false, error: inputValidate.error });
    }
    try {
        const estate = await estateService.createEstate(inputReq, req.user.user_id);
        return res.status(201).json({ status: true, estate });
    } catch (error) {
        return res.status(500).json({ status: false, error: error.message });
    }
}
exports.updateEstate = async (req, res) => {
    const estateId = req.params.id;
    const estateData = req.body;
  
    try {
      const estate = await estateService.updateEstate(estateId, estateData);
      return res.status(200).json({ status: true, message: 'Estate updated successfully', estate });
    } catch (error) {
      return res.status(500).json({ status: false, error: error.message });
    }
}
exports.getEstateById = async (req, res) => {
    try {
      const { id } = req.params;
      const estate = await estateService.getEstateById(id);
      if (!estate) {
        return res.status(404).json({ status: false, error: 'Estate not found' });
      }
      return res.status(200).json({ status: true, estate});
    } catch (error) {
      return res.status(500).json({ status: false, error: error.message });
    }
};
exports.getListEstateUser = async (req, res) => {
    try {
        const { page, filter_text } = req.body
        const estate = await estateService.getListEstateByUser(req.user.user_id, page, selfPerpage, filter_text);
        return res.status(200).json({ status: true, estate});
    } catch (error) {
        return res.status(500).json({ status: false, error: error.message });
    }
}

function validateCreateEstate(input) {
    if (!input.estate_name) {
        return {
            status: false,
            error: 'estate_name is required'
        }
    } else if (!input.estate_type) {
        return {
            status: false,
            error: 'estate_type is required'
        }
    } else if (!input.estate_price) {
        return {
            status: false,
            error: 'estate_price is required'
        }
    } else if (!input.estate_area) {
        return {
            status: false,
            error: 'estate_area is required'
        }
    } else if (!input.estate_bedrooms) {
        return {
            status: false,
            error: 'estate_bedrooms is required'
        }
    } else if (!input.estate_bathrooms) {
        return {
            status: false,
            error: 'estate_bathrooms is required'
        }
    } else if (!input.estate_garage) {
        return {
            status: false,
            error: 'estate_garage is required'
        }
    } else if (!input.estate_description) {
        return {
            status: false,
            error: 'estate_description is required'
        }
    } else if (!input.province) {
        return {
            status: false,
            error: 'province is required'
        }
    } else if (!input.state) {
        return {
            status: false,
            error: 'state is required'
        }
    } else if (!input.districts) {
        return {
            status: false,
            error: 'districts is required'
        }
    } else if (!input.postcode) {
        return {
            status: false,
            error: 'postcode is required'
        }
    } else {
        return {
            status: true,
        }
    }
}