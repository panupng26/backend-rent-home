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
    inputValidate = validateCreateEstate(estateData)
    if (inputValidate.status === false) {
        return res.status(400).json({ status: false, error: inputValidate.error });
    }
    try {
      const estate = await estateService.updateEstate(estateId,req.user.user_id,estateData);
      return res.status(200).json({ status: true, message: 'Estate updated successfully', estate });
    } catch (error) {
      return res.status(500).json({ status: false, error: error.message });
    }
}
exports.updateStatusByEstateId = async (req, res) => {
    const estateId = req.params.id;
    const { estate_status } = req.body;
    if(!estate_status) {
        return res.status(400).json({ status: false, message: 'Required estate_status' });
    }
    try {
        const estate = await estateService.updateStatusEstate(estateId, estate_status, req.user.user_id)
        return res.status(200).json({ status: true, message: 'Estate updated successfully', estate });
    } catch (error) {
        return res.status(500).json({ status: false, error: error.message });
    }
}
exports.getEstateById = async (req, res) => {
    try {
      const { id } = req.params;
      const estate = await estateService.getEstateById(parseInt(id));
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
exports.getListNotSuspended = async (req, res) => {
    try {
        const { page, filter_text } = req.body
        const estate = await estateService.ListNotSuspended(page, selfPerpage, filter_text);
        return res.status(200).json({ status: true, estate});
    } catch (error) {
        return res.status(500).json({ status: false, error: error.message });
    }
}
exports.getListALLEstate = async (req, res) => {
    try {
        const { page, filter_text } = req.body
        const estate = await estateService.getListEstateByAdmin(page, selfPerpage, filter_text);
        return res.status(200).json({ status: true, estate});
    } catch (error) {
          return res.status(500).json({ status: false, error: error.message });
    }
}
exports.deleteEstateById = async (req, res) => {
    try {
        const id = req.params.id;
        const result = await estateService.deleteEstateById(id);
        return res.status(200).json({
            status: true,
            message: 'Estate deleted successfully',
            data: result
        });
    } catch (error) {
        return res.status(500).json({ status: false, error: error.message });
    }
}
exports.filterAllEstate = async (req, res) => {
    try {
        const filterAll = req.body
        const estate = await estateService.getListEstateAll(filterAll.page, 9, filterAll);
        return res.status(200).json({ status: true, estate});
    } catch (error) {
          return res.status(500).json({ status: false, error: error.message });
    }
}
exports.suspendedEstateById = async (req, res) => {
    try {
        const estateId = req.params.id;
        const estate = await estateService.updateSuspendedEstate(estateId);
        return res.status(200).json({ status: true, estate });
    } catch (error) {
        return res.status(500).json({ status: false, error: error.message });
    }
}
exports.getOnlySuspendedList = async (req, res) => {
    try {
        const { page, filter_text } = req.body
        const estate = await estateService.ListOnlySuspended(page, selfPerpage, filter_text);
        return res.status(200).json({ status: true, estate});
    } catch (error) {
        return res.status(500).json({ status: false, error: error.message });
    }
}
exports.cancelSuspendedById = async (req, res) => {
    try {
        const estateId = req.params.id;
        const estate = await estateService.updateCancelSuspended(estateId);
        return res.status(200).json({ status: true, estate });
    } catch (error) {
        return res.status(500).json({ status: false, error: error.message });
    }
}
exports.getCondoCarousel = async (req, res) => {
    try {
        const estate = await estateService.getRandomEstateTypeCondo();
        return res.status(200).json({ status: true, estate });
    } catch (error) {
        return res.status(500).json({ status: false, error: error.message });
    }
}
exports.getTownHouseCarousel = async (req, res) => {
    try {
        const estate = await estateService.getRandomEstateTypeTownHouse();
        return res.status(200).json({ status: true, estate });
    } catch (error) {
        return res.status(500).json({ status: false, error: error.message });
    }
}
exports.getHomeCarousel = async (req, res) => {
    try {
        const estate = await estateService.getRandomEstateTypeHome();
        return res.status(200).json({ status: true, estate });
    } catch (error) {
        return res.status(500).json({ status: false, error: error.message });
    }
}
exports.getAllStatusEstate = async (req, res) => {
    try {
        const estate = await estateService.getEstateStatusUser();
        return res.status(200).json({ status: true, estate });
    } catch (error) {
        return res.status(500).json({ status: false, error: error.message });
    }
}
exports.getIdStatusEstate = async (req, res) => {
    try {
        const estate = await estateService.getEstateStatusById(req.user.user_id);
        return res.status(200).json({ status: true, estate });
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
    } else if(!input.address) {
        return {
            status: false,
            error: 'address is required'
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