import ResponseModel from '../models/response/ResponseModel.js';
import PropertiesService from '../services/properties.js';

const PropertiesController = {

    async getAll(req, res, next) {
        try {
            const result = await PropertiesService.getAll();
            return res.status(200).json(new ResponseModel(200, [], result));
        } catch (e) {
            res.status(500).json(new ResponseModel(500, ['Lỗi lấy thuộc tính sản phẩm'], null));
        }
    },

};

export default PropertiesController;
