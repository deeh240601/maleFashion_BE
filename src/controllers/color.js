import ColorService from '../services/color.js';
import ResponseModel from '../models/response/ResponseModel.js';

const ColorController = {

    async getAll(req, res, next) {
        try {
            const result = await ColorService.getAll();
            return res.status(200).json(new ResponseModel(200, [], result));
        } catch (e) {
            res.status(500).json(new ResponseModel(500, ['Lỗi lấy thông tin màu'], null));
        }
    },

    async getById(req, res, next) {
        try {
            const result = await ColorService.getById(req.params.id);
            return res.status(200).json(new ResponseModel(200, [], result));
        } catch (e) {
            res.status(500).json(new ResponseModel(500, ['Lỗi lấy thông tin màu'], null));
        }
    },

    async create(req, res, next) {
        try {
            const result = await ColorService.createColor(req.body);
            return res.status(200).json(new ResponseModel(200, ['Thêm màu thành công'], result));
        } catch (e) {
            return res.status(500).json(new ResponseModel(500, ['Lỗi thêm thông tin màu'], null));
        }
    },

    async update(req, res, next) {
        try {
            const result = await ColorService.updateColor(req.body);
            return res.status(200).json(new ResponseModel(200, ['Sửa màu thành công'], result));
        } catch (e) {
            console.log(e);
            return res.status(500).json(new ResponseModel(500, ['Lỗi cập nhật thông tin màu'], null));
        }
    },

    async delete(req, res, next) {
        const colorId = req.params.colorId;
        try {
            const result = await ColorService.deleteColor(colorId);
            return res.status(200).json(new ResponseModel(200, ['Xóa thành công'], result));
        } catch (e) {
            return res.status(500).json(new ResponseModel(500, ['Lỗi xóa màu'], null));
        }
    },

    async deleteAll(req, res, next) {
        const colorIds = req.body.colorIds;
        try {
            const result = await ColorService.deleteAllColor(colorIds);
            return res.status(200).json(new ResponseModel(200, ['Xóa thành công'], result));
        } catch (e) {
            return res.status(500).json(new ResponseModel(500, ['Lỗi xóa màu'], null));
        }
    },
};

export default ColorController;
