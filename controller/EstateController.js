const estateService = require('../services/EstateService');

exports.createEstate = async (req, res) => {
    const inputReq = req.body;
    if (inputReq.status === false) {
        return res.status(400).json({ error: inputReq.error });
    }
    try {
        const estate = await estateService.createEstate(inputReq);
        return res.status(201).json({ message: 'Estate created successfully', estate });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
}
exports.updateEstate = async (req, res) => {
    const estateId = req.params.id;
    const estateData = req.body;
  
    try {
      const estate = await estateService.updateEstate(estateId, estateData);
      return res.status(200).json({ message: 'Estate updated successfully', estate });
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
}
exports.getEstateById = async (req, res) => {
    try {
      const { id } = req.params;
      const estate = await estateService.getEstateById(id);
      if (!estate) {
        return res.status(404).json({ error: 'Estate not found' });
      }
      return res.status(200).json(estate);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
};

function validateCreateEstate(input) {
    let objectReturn = {};
    if (!input.estate_name) {
        return objectReturn = {
            status: false,
            error: 'estate_name is required'
        }
    } else if (!input.estate_type) {
        return objectReturn = {
            status: false,
            error: 'estate_type is required'
        }
    } else if (!input.estate_location) {
        return objectReturn = {
            status: false,
            error: 'estate_location is required'
        }
    } else if (!input.estate_price) {
        return objectReturn = {
            status: false,
            error: 'estate_price is required'
        }
    } else if (!input.estate_area) {
        return objectReturn = {
            status: false,
            error: 'estate_area is required'
        }
    } else if (!input.estate_bedrooms) {
        return objectReturn = {
            status: false,
            error: 'estate_bedrooms is required'
        }
    } else if (!input.estate_bathrooms) {
        return objectReturn = {
            status: false,
            error: 'estate_bathrooms is required'
        }
    } else if (!input.estate_garage) {
        return objectReturn = {
            status: false,
            error: 'estate_garage is required'
        }
    } else if (!input.estate_description) {
        return objectReturn = {
            status: false,
            error: 'estate_description is required'
        }
    } else if (!input.estate_image) {
        return objectReturn = {
            status: false,
            error: 'estate_image is required'
        }
    } else if (!input.estate_image) {
        return objectReturn = {
            status: false,
            error: 'estate_image is required'
        }
    } else if (!input.estate_status) {
        return objectReturn = {
            status: false,
            error: 'estate_status is required'
        }
    } else if (!input.estate_user_id) {
        return objectReturn = {
            status: false,
            error: 'estate_user_id is required'
        }
    } else if (!input.gps_latitude) {
        return objectReturn = {
            status: false,
            error: 'gps_latitude is required'
        }
    } else if (!input.gps_longtitude) {
        return objectReturn = {
            status: false,
            error: 'gps_latitude is required'
        }
    } else if (!input.province_id) {
        return objectReturn = {
            status: false,
            error: 'province_id is required'
        }
    } else if (!input.geographies_id) {
        return objectReturn = {
            status: false,
            error: 'geographies_id is required'
        }
    } else if (!input.amphures_id) {
        return objectReturn = {
            status: false,
            error: 'amphures_id is required'
        }
    } else if (!input.districts_id) {
        return objectReturn = {
            status: false,
            error: 'districts_id is required'
        }
    }else {
        return objectReturn = {
            status: true,
        }
    }
}