import StaffService from '../services/staff.js';
import ResponseModel from '../models/response/ResponseModel.js';

const StaffController = {

    async getAll(req, res, next) {
        try {
            const result = await StaffService.getAll();
            res.json(new ResponseModel(200, [], result));
        } catch (e) {
            res.status(500).json(new ResponseModel(500, ['Lỗi lấy thông tin nhân viên'], null));
        }
    },

    async getById(req, res, next) {
        try {
            const result = await StaffService.getById(req.params.id);
            return res.json(new ResponseModel(200, [], result));
        } catch (e) {
            res.status(500).json(new ResponseModel(500, ['Lỗi lấy thông tin nhân viên'], null));
        }
    },

    async create(req, res, next) {
        try {
            const result = await StaffService.createStaff(req.body);
            return res.json(new ResponseModel(200, ['Thêm nhân viên thành công'], result));
        } catch (e) {
            return res.status(500).json(new ResponseModel(500, ['Lỗi thêm thông tin nhân viên'], null));
        }
    },

    async update(req, res, next) {
        try {
            const result = await StaffService.updateStaff(req.body);
            return res.json(new ResponseModel(200, ['Cập nhật nhân viên thành công'], result));
        } catch (e) {
            return res.status(500).json(new ResponseModel(500, ['Lỗi cập nhật thông tin nhân viên'], null));
        }
    },

    async delete(req, res, next) {
        const staffId = req.params.id;
        try {
            const result = await StaffService.deleteStaff(staffId);
            return res.json(new ResponseModel(200, ['Xóa nhân viên thành công'], result));
        } catch (e) {
            return res.status(500).json(new ResponseModel(500, ['Lỗi xóa nhân viên'], null));
        }
    },

    async deleteAll(req, res, next) {
        const staffIds = req.body.staffIds;
        try {
            const result = await StaffService.deleteAllStaff(staffIds);
            return res.status(200).json(new ResponseModel(200, ['Xóa thành công'], result));
        } catch (e) {
            return res.status(500).json(new ResponseModel(500, ['Lỗi xóa nhân viên'], null));
        }
    },
};

export default StaffController;
