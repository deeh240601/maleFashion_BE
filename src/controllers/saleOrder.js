import ResponseModel from '../models/response/ResponseModel.js';
import SaleOrderService from '../services/saleOrder.js';

const SaleOrderController = {

    async getAll(req, res, next) {
        try {
            const result = await SaleOrderService.getAll(req.user);
            return res.status(200).json(new ResponseModel(200, [], result));
        } catch (e) {
            res.status(500).json(new ResponseModel(500, ['Lỗi lấy thông tin hóa đơn'], null));
        }
    },
    async getAllForce(req, res, next) {
        try {
            const result = await SaleOrderService.getAllAdmin();
            return res.status(200).json(new ResponseModel(200, [], result));
        } catch (e) {
            res.status(500).json(new ResponseModel(500, ['Lỗi lấy thông tin hóa đơn'], null));
        }
    },

    async getById(req, res, next) {
        try {
            const result = await SaleOrderService.getById(req.params.id);
            return res.status(200).json(new ResponseModel(200, [], result));
        } catch (e) {
            res.status(500).json(new ResponseModel(500, ['Lỗi lấy thông tin hóa đơn'], null));
        }
    },
    async getFullById(req, res, next) {
        // try {
        const result = await SaleOrderService.getFullById(req.params.id);
        return res.status(200).json(new ResponseModel(200, [], result));
        // } catch (e) {
        //     res.status(500).json(new ResponseModel(500, ['Lỗi lấy thông tin hóa đơn'], null));
        // }
    },

    async create(req, res, next) {
        try {
            const result = await SaleOrderService.createSaleOrder(req.body);
            return res.status(200).json(new ResponseModel(200, ['Thêm hóa đơn thành công'], result));
        } catch (e) {
            return res.status(500).json(new ResponseModel(500, ['Lỗi thêm thông tin hóa đơn'], null));
        }
    },
    async updateStatus(req, res, next) {
        // try {
            const result = await SaleOrderService.updateStatus(req.body);
            return res.status(200).json(new ResponseModel(200, ['Cập nhật trạng thái thành công'], result));
        // } ca/tch (e) {
            // return res.status(500).json(new ResponseModel(500, ['Lỗi cập nhật trạng thái đơn hàng'], null));
        // }
    },

    async update(req, res, next) {
        try {
            const result = await SaleOrderService.updateSaleOrder(req.body);
            return res.status(200).json(new ResponseModel(200, ['Sửa hóa đơn thành công'], result));
        } catch (e) {
            console.log(e);
            return res.status(500).json(new ResponseModel(500, ['Lỗi cập nhật thông tin hóa đơn'], null));
        }
    },

    async delete(req, res, next) {
        const wishlistId = req.params.wishlistId;
        try {
            const result = await SaleOrderService.deleteSaleOrder(wishlistId);
            return res.status(200).json(new ResponseModel(200, ['Xóa thành công'], result));
        } catch (e) {
            return res.status(500).json(new ResponseModel(500, ['Lỗi xóa hóa đơn'], null));
        }
    },

    async deleteAll(req, res, next) {
        const wishlistIds = req.body.wishlistIds;
        try {
            const result = await SaleOrderService.deleteAllSaleOrder(wishlistIds);
            return res.status(200).json(new ResponseModel(200, ['Xóa thành công'], result));
        } catch (e) {
            return res.status(500).json(new ResponseModel(500, ['Lỗi xóa hóa đơn'], null));
        }
    },
};

export default SaleOrderController;
