import BuyOrderService from '../services/buyOrder.js';
import ResponseModel from '../models/response/ResponseModel.js';
import BuyOrderDetail from '../models/base/BuyOrderDetail.js';
import SaleOrderDetail from '../models/base/SaleOrderDetail.js';
const BuyOrderController = {

    async getAll(req, res, next) {
        try {
            const result = await BuyOrderService.getAll();
            return res.status(200).json(new ResponseModel(200, [], result));
        } catch (e) {
            res.status(500).json(new ResponseModel(500, ['Lỗi lấy thông tin phiếu nhập'], null));
        }
    },

    async getById(req, res, next) {
        try {
            const result = await BuyOrderService.getById(req.params.id);
            return res.status(200).json(new ResponseModel(200, [], result));
        } catch (e) {
            res.status(500).json(new ResponseModel(500, ['Lỗi lấy thông tin phiếu nhập'], null));
        }
    },

    async create(req, res, next) {
        // try {
            const result = await BuyOrderService.createBuyOrder(req.body);
            return res.status(200).json(new ResponseModel(200, ['Thêm phiếu nhập thành công'], result));
        // } catch (e) {
        //     return res.status(500).json(new ResponseModel(500, ['Lỗi thêm thông tin phiếu nhập'], null));
        // }
    },

    async update(req, res, next) {
        try {
            const result = await BuyOrderService.updateBuyOrder(req.body);
            return res.status(200).json(new ResponseModel(200, ['Sửa phiếu nhập thành công'], result));
        } catch (e) {
            console.log(e);
            return res.status(500).json(new ResponseModel(500, ['Lỗi cập nhật thông tin phiếu nhập'], null));
        }
    },

    async delete(req, res, next) {
        const buyOrderId = req.params.buyOrderId;
        try {
            const result = await BuyOrderService.deleteBuyOrder(buyOrderId);
            return res.status(200).json(new ResponseModel(200, ['Xóa thành công'], result));
        } catch (e) {
            return res.status(500).json(new ResponseModel(500, ['Lỗi xóa phiếu nhập'], null));
        }
    },

    async deleteAll(req, res, next) {
        const buyOrderIds = req.body.buyOrderIds;
        try {
            const result = await BuyOrderService.deleteAllBuyOrder(buyOrderIds);
            return res.status(200).json(new ResponseModel(200, ['Xóa thành công'], result));
        } catch (e) {
            return res.status(500).json(new ResponseModel(500, ['Lỗi xóa phiếu nhập'], null));
        }
    },
     async getTotalOrder(req, res, next){
        let sumAmount = 0;
       const listDetails = await SaleOrderDetail.find({});
       listDetails.forEach(detail => sumAmount +=(detail.quantity * detail.price));
       return res.status(200).json(new ResponseModel(200, [], sumAmount));
     },
     async getTotalBuyOrder(req, res, next){
        let sumAmount = 0;
       const listDetails = await BuyOrderDetail.find({});
       listDetails.forEach(detail => sumAmount += (detail.quantity * detail.price));
       return res.status(200).json(new ResponseModel(200, [], sumAmount));
     }
};

export default BuyOrderController;
