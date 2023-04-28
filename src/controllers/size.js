import SizeService from '../services/size.js';
import ResponseModel from '../models/response/ResponseModel.js';

const SizeController = {

    async getAll(req, res, next) {
        try {
            const result = await SizeService.getAll();
            return res.status(200).json(new ResponseModel(200, [], result));
        } catch (e) {
            res.status(500).json(new ResponseModel(500, ['Lỗi lấy thông tin size'], null));
        }
    },

    async getById(req, res, next) {
        try {
            const result = await SizeService.getById(req.params.id);
            return res.status(200).json(new ResponseModel(200, [], result));
        } catch (e) {
            res.status(500).json(new ResponseModel(500, ['Lỗi lấy thông tin size'], null));
        }
    },

    async create(req, res, next) {
        try {
            const result = await SizeService.createSize(req.body);
            return res.status(200).json(new ResponseModel(200, ['Thêm size thành công'], result));
        } catch (e) {
            return res.status(500).json(new ResponseModel(500, ['Lỗi thêm thông tin size'], null));
        }
    },

    async update(req, res, next) {
        try {
            const result = await SizeService.updateSize(req.body);
            return res.status(200).json(new ResponseModel(200, ['Sửa size thành công'], result));
        } catch (e) {
            console.log(e);
            return res.status(500).json(new ResponseModel(500, ['Lỗi cập nhật thông tin size'], null));
        }
    },

    async delete(req, res, next) {
        const sizeId = req.params.sizeId;
        try {
            const result = await SizeService.deleteSize(sizeId);
            return res.status(200).json(new ResponseModel(200, ['Xóa thành công'], result));
        } catch (e) {
            return res.status(500).json(new ResponseModel(500, ['Lỗi xóa size'], null));
        }
    },

    async deleteAll(req, res, next) {
        const sizeIds = req.body.sizeIds;
        try {
            const result = await SizeService.deleteAllSize(sizeIds);
            return res.status(200).json(new ResponseModel(200, ['Xóa thành công'], result));
        } catch (e) {
            return res.status(500).json(new ResponseModel(500, ['Lỗi xóa size'], null));
        }
    },
};

export default SizeController;
