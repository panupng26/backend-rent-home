const Estate = require('../models/estate');
const { Op } = require('sequelize');
const Sequelize = require('sequelize');

const selfPerpage = 8
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
            address: inputReq.address,
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
    async updateEstate(estateId, inputReq) {
        try {
          const estate = await Estate.findByPk(estateId);
          if (!estate) {
            throw new Error('Estate not found');
          }
          const updatedEstate = await estate.update({
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
            lat: inputReq.lat,
            lng: inputReq.lng,
            address: inputReq.address,
            province: inputReq.province,
            state: inputReq.state,
            districts: inputReq.districts,
            postcode: inputReq.postcode,
          });
          return updatedEstate;
        } catch (error) {
          throw new Error(error.message);
        }
    }
    async updateStatusEstate(estate_id, estate_status, estate_user_id) {
      try {
        const estate = await Estate.findOne({
          where: {
            estate_id: estate_id,
            estate_user_id: estate_user_id,
          },
        });
    
        if (!estate) {
          throw new Error('Estate not found');
        }
    
        estate.estate_status = estate_status;
        await estate.save();
    
        return estate;
      } catch (error) {
        throw new Error(error.message);
      }
    }
    async getEstateById(id) {
        try {
          const estate = await Estate.findByPk(id);
          if (estate && estate.estate_status === 'suspended') {
            throw new Error('Estate is suspended.');
          }
          return estate;
        } catch (error) {
          throw new Error(error.message);
        }
    }
    async getListEstateByUser(estate_user_id, currentPage = 1, pageSize = selfPerpage, filter_text = '') {
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
    async getListEstateByAdmin(currentPage = 1, pageSize = selfPerpage, filter_text = '') {
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
    async ListNotSuspended(currentPage = 1, pageSize = selfPerpage, filter_text = '') {
      try {
        const offset = (currentPage - 1) * pageSize;
        const where = {
          [Op.and]: [
            {
              [Op.or]: [
                { estate_name: { [Op.like]: `%${filter_text}%` } },
                { estate_type: { [Op.like]: `%${filter_text}%` } },
                { estate_price: { [Op.like]: `%${filter_text}%` } },
                { province: { [Op.like]: `%${filter_text}%` } },
                { state: { [Op.like]: `%${filter_text}%` } },
                { districts: { [Op.like]: `%${filter_text}%` } },
              ],
            },
            { estate_status: { [Op.ne]: 'suspended' } },
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
    async deleteEstateById(id) {
      try {
          const estate = await Estate.findByPk(id);
          if (!estate) {
              throw new Error('Estate not found');
          }
          await estate.destroy();
          return estate;
      } catch (error) {
          throw new Error(error.message);
      }
    }
    async getListEstateAll(currentPage = 1, pageSize = 9, filterAll) {
      try {
        const offset = (currentPage - 1) * pageSize;
        const where = {
          [Op.or]: [
            { estate_name: { [Op.like]: `%${filterAll.filter_text}%` } },
            { estate_type: { [Op.like]: `%${filterAll.filter_text}%` } },
            { province: { [Op.like]: `%${filterAll.filter_text}%` } },
            { state: { [Op.like]: `%${filterAll.filter_text}%` } },
            { districts: { [Op.like]: `%${filterAll.filter_text}%` } },
          ],
          [Op.and]: [
            filterAll.estate_area.start !== null && filterAll.estate_area.end !== null
              ? {
                  estate_area: {
                    [Op.between]: [
                      filterAll.estate_area.start,
                      filterAll.estate_area.end,
                    ],
                  },
                }
              : null,
            filterAll.estate_type ? { estate_type: filterAll.estate_type } : null,
            filterAll.province ? { province: filterAll.province } : null,
            filterAll.state ? { state: filterAll.state } : null,
            filterAll.districts ? { districts: filterAll.districts } : null,
            filterAll.estate_price.start !== null && filterAll.estate_price.end !== null
              ? {
                  estate_price: {
                    [Op.between]: [
                      filterAll.estate_price.start,
                      filterAll.estate_price.end,
                    ],
                  },
                }
              : null,
              filterAll.estate_bedrooms > 4
              ? { estate_bedrooms: { [Op.gte]: 5 } }
              : filterAll.estate_bedrooms !== null
              ? { estate_bedrooms: filterAll.estate_bedrooms }
              : null,
              filterAll.estate_bathrooms > 2
              ? { estate_bathrooms: { [Op.gte]: 3 } }
              : filterAll.estate_bathrooms !== null
              ? { estate_bathrooms: filterAll.estate_bathrooms }
              : null,
              filterAll.estate_garage > 2
              ? { estate_garage: { [Op.gte]: 3 } }
              : filterAll.estate_garage !== null
              ? { estate_garage: filterAll.estate_garage }
              : null,
          ].filter((v) => v != null),
          estate_status: { [Op.ne]: 'suspended' },
        };
        const { count, rows } = await Estate.findAndCountAll({
          where,
          limit: pageSize,
          offset,
          order: [['estate_status', 'ASC']],
        });
        const totalPages = Math.ceil(count / pageSize);
        return { totalItems: count, totalPages, currentPage, estates: rows };
      } catch (error) {
        throw new Error(error.message);
      }
    }
    async updateSuspendedEstate(estateId) {
      try {
        const estate = await Estate.findByPk(estateId);
        if (!estate) {
          throw new Error('Estate not found');
        }
        const response = await estate.update({ estate_status: 'suspended' });
        return response
      } catch (error) {
        throw new Error(error.message);
      }
    }
    async ListOnlySuspended(currentPage = 1, pageSize = selfPerpage, filter_text = '') {
      try {
        const offset = (currentPage - 1) * pageSize;
        const where = {
          [Op.and]: [
            {
              [Op.or]: [
                { estate_name: { [Op.like]: `%${filter_text}%` } },
                { estate_type: { [Op.like]: `%${filter_text}%` } },
                { estate_price: { [Op.like]: `%${filter_text}%` } },
                { province: { [Op.like]: `%${filter_text}%` } },
                { state: { [Op.like]: `%${filter_text}%` } },
                { districts: { [Op.like]: `%${filter_text}%` } },
              ],
            },
            { estate_status: { [Op.eq]: 'suspended' } },
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
    async updateCancelSuspended(estateId) {
      try {
        const estate = await Estate.findByPk(estateId);
        if (!estate) {
          throw new Error('Estate not found');
        }
        const response = await estate.update({ estate_status: 'available' });
        return response
      } catch (error) {
        throw new Error(error.message);
      }
    }
    async getRandomEstateTypeCondo() {
      try {
        
        const estates = await Estate.findAll({
          where: { estate_type: 'คอนโด', estate_status: { [Op.eq]: 'available' }},
          order: Sequelize.literal('RAND()'),
          limit: 6
        });
        return estates;
      } catch (error) {
        throw new Error(error.message);
      }
    }
    async getRandomEstateTypeTownHouse() {
      try {
        const estates = await Estate.findAll({
          where: { estate_type: 'ทาวน์เฮ้าส์', estate_status: { [Op.eq]: 'available' } },
          order: Sequelize.literal('RAND()'),
          limit: 6
        });
        return estates;
      } catch (error) {
        throw new Error(error.message);
      }
    }
    async getRandomEstateTypeHome() {
      try {
        const estates = await Estate.findAll({
          where: { estate_type: 'บ้านเดี่ยว', estate_status: { [Op.eq]: 'available' } },
          order: Sequelize.literal('RAND()'),
          limit: 6
        });
        return estates;
      } catch (error) {
        throw new Error(error.message);
      }
    }
    async getEstateStatusUser() {
      try {
        const statusCounts = await Estate.findAll({
          attributes: ['estate_status', [Sequelize.fn('COUNT', Sequelize.col('estate_status')), 'count']],
          group: ['estate_status'],
          raw: true
        });
    
        return statusCounts;
      } catch (error) {
        console.error('Error retrieving estate status counts:', error);
        throw error;
      }
    }
    async getEstateStatusById(estate_user_id) {
      try {
        const statusCounts = await Estate.findAll({
          where: { estate_user_id: estate_user_id},
          attributes: ['estate_status', [Sequelize.fn('COUNT', Sequelize.col('estate_status')), 'count']],
          group: ['estate_status'],
          raw: true
        });
    
        return statusCounts;
      } catch (error) {
        console.error('Error retrieving estate status counts:', error);
        throw error;
      }
    }
}

module.exports = new EstateService();