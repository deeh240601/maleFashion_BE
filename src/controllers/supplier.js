import SupplierService from '../services/supplier.js';
import ResponseModel from '../models/response/ResponseModel.js';

const SupplierController = {

    async getAll(req, res, next) {
        try {
            const result = await SupplierService.getAll();
            return res.status(200).json(new ResponseModel(200, [], result));
        } catch (e) {
            res.status(500).json(new ResponseModel(500, ['Lỗi lấy thông tin nhà cung cấp'], null));
        }
    },

    async getById(req, res, next) {
        try {
            const result = await SupplierService.getById(req.params.id);
            return res.status(200).json(new ResponseModel(200, [], result));
        } catch (e) {
            res.status(500).json(new ResponseModel(500, ['Lỗi lấy thông tin nhà cung cấp'], null));
        }
    },

    async create(req, res, next) {
        // try {
        const result = await SupplierService.createSupplier(req.body);
        return res.status(200).json(new ResponseModel(200, ['Thêm supplier thành công'], result));
        // } catch (e) {
        //     return res.status(500).json(new ResponseModel(500, ['Lỗi thêm thông tin nhà cung cấp'], null));
        // }
    },

    async update(req, res, next) {
        try {
            const result = await SupplierService.updateSupplier(req.body);
            return res.status(200).json(new ResponseModel(200, ['Sửa supplier thành công'], result));
        } catch (e) {
            console.log(e);
            return res.status(500).json(new ResponseModel(500, ['Lỗi cập nhật thông tin nhà cung cấp'], null));
        }
    },

    async delete(req, res, next) {
        const supplierId = req.params.supplierId;
        try {
            const result = await SupplierService.deleteSupplier(supplierId);
            return res.status(200).json(new ResponseModel(200, ['Xóa thành công'], result));
        } catch (e) {
            return res.status(500).json(new ResponseModel(500, ['Lỗi xóa nhà cung cấp'], null));
        }
    },

    async deleteAll(req, res, next) {
        const supplierIds = req.body.supplierIds;
        try {
            const result = await SupplierService.deleteAllSupplier(supplierIds);
            return res.status(200).json(new ResponseModel(200, ['Xóa thành công'], result));
        } catch (e) {
            return res.status(500).json(new ResponseModel(500, ['Lỗi xóa nhà cung cấp'], null));
        }
    },
};

export default SupplierController;
