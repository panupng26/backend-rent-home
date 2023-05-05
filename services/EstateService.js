const Estate = require('../models/estate');
const { Op } = require('sequelize');

class EstateService {
    async createEstate(inputReq, userid) {
        try {
          const estate = await Estate.create({
            estate_name: inputReq.estate_name,
            estate_type: inputReq.estate_type,
            estate_price: inputReq.estate_price,
            estate_area: inputReq.estate_area,
            estate_bedrooms: inputReq.estate_bedrooms,
            estate_bathrooms: inputReq.estate_bathrooms,
            estate_garage: inputReq.estate_garage,
            estate_description: inputReq.estate_description,
            estate_image: JSON.stringify(inputReq.estate_image),
            estate_verify: inputReq.estate_verify,
            estate_user_id: userid,
            lat: inputReq.lat,
            lng: inputReq.lng,
            province: inputReq.province,
            state: inputReq.state,
            districts: inputReq.districts,
            postcode: inputReq.postcode,
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
          const estate = await Estate.findByPk(estateId);
          return estate;
        } catch (error) {
          throw new Error(error.message);
        }
    }
    async getListEstateByUser(estate_user_id, currentPage = 1, pageSize = 25, filter_text = '') {
      try {
        const offset = (currentPage - 1) * pageSize;
        const where = {
          estate_user_id,
          [Op.or]: [
            { estate_name: { [Op.like]: `%${filter_text}%` } },
            { estate_type: { [Op.like]: `%${filter_text}%` } },
            { estate_price: { [Op.like]: `%${filter_text}%` } },
            { province: { [Op.like]: `%${filter_text}%` } },
            { state: { [Op.like]: `%${filter_text}%` } },
            { districts: { [Op.like]: `%${filter_text}%` } },
          ],
        };
        const { count, rows } = await Estate.findAndCountAll({
          where,
          limit: pageSize,
          offset,
        });
        const totalPages = Math.ceil(count / pageSize);
        return { totalItems: count, totalPages, currentPage, estates: rows };
      } catch (error) {
        throw new Error(error.message);
      }
    }
    async getListEstateByAdmin(currentPage = 1, pageSize = 25, filter_text = '') {
      try {
        const offset = (currentPage - 1) * pageSize;
        const where = {
          [Op.or]: [
            { estate_name: { [Op.like]: `%${filter_text}%` } },
            { estate_type: { [Op.like]: `%${filter_text}%` } },
            { estate_price: { [Op.like]: `%${filter_text}%` } },
            { province: { [Op.like]: `%${filter_text}%` } },
            { state: { [Op.like]: `%${filter_text}%` } },
            { districts: { [Op.like]: `%${filter_text}%` } },
          ],
        };
        const { count, rows } = await Estate.findAndCountAll({
          where,
          limit: pageSize,
          offset,
        });
        const totalPages = Math.ceil(count / pageSize);
        return { totalItems: count, totalPages, currentPage, estates: rows };
      } catch (error) {
        throw new Error(error.message);
      }
    }
}

module.exports = new EstateService();