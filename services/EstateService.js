const Estate = require('../models/estate');

class EstateService {
    async createEstate(inputReq) {
        try {
          const estate = await Estate.create({
            estate_name: inputReq.estate_name,
            estate_type: inputReq.estate_type,
            estate_location: inputReq.estate_location,
            estate_price: inputReq.estate_price,
            estate_area: inputReq.estate_area,
            estate_bedrooms: inputReq.estate_bedrooms,
            estate_bathrooms: inputReq.estate_bathrooms,
            estate_garage: inputReq.estate_garage,
            estate_description: inputReq.estate_description,
            estate_image: inputReq.estate_image,
            estate_status: inputReq.estate_status,
            estate_user_id: inputReq.estate_user_id,
            gps_latitude: inputReq.gps_latitude,
            gps_longitude: inputReq.gps_longitude,
            province_id: inputReq.province_id,
            geographies_id: inputReq.geographies_id,
            amphures_id: inputReq.amphures_id,
            districts_id: inputReq.districts_id
          });
          return estate;
        } catch (error) {
          throw new Error(error.message);
        }
    }
    async updateEstate(estateId, estateData) {
        try {
          const estate = await Estate.findByPk(estateId);
          if (!estate) {
            throw new Error('Estate not found');
          }
          const updatedEstate = await estate.update(estateData);
          return updatedEstate;
        } catch (error) {
          throw new Error(error.message);
        }
    }
    async getEstateById(id) {
        try {
          const estate = await Estate.findOne({ where: { estate_id: id } });
          return estate;
        } catch (error) {
          throw new Error(error.message);
        }
    }
}

module.exports = new EstateService();