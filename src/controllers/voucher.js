import VoucherService from '../services/voucher.js';
import ResponseModel from '../models/response/ResponseModel.js';

const VoucherController = {

    async getAll(req, res, next) {
        try {
            const result = await VoucherService.getAll();
            return res.status(200).json(new ResponseModel(200, [], result));
        } catch (e) {
            res.status(500).json(new ResponseModel(500, ['Lỗi lấy thông tin khuyến mãi'], null));
        }
    },

    async getById(req, res, next) {
        try {
            const result = await VoucherService.getById(req.params.id);
            return res.status(200).json(new ResponseModel(200, [], result));
        } catch (e) {
            res.status(500).json(new ResponseModel(500, ['Lỗi lấy thông tin khuyến mãi'], null));
        }
    },

    async create(req, res, next) {
        // try {

        const result = await VoucherService.createVoucher(req.body);
        return res.status(200).json(new ResponseModel(200, ['Thêm voucher thành công'], result));
        // } catch (e) {
        //     return res.status(500).json(new ResponseModel(500, ['Lỗi thêm thông tin khuyến mãi'], null));
        // }
    },

    async update(req, res, next) {
        try {
            const result = await VoucherService.updateVoucher(req.body);
            return res.status(200).json(new ResponseModel(200, ['Sửa voucher thành công'], result));
        } catch (e) {
            console.log(e);
            return res.status(500).json(new ResponseModel(500, ['Lỗi cập nhật thông tin khuyến mãi'], null));
        }
    },

    async delete(req, res, next) {
        const voucherId = req.params.voucherId;
        try {
            const result = await VoucherService.deleteVoucher(voucherId);
            return res.status(200).json(new ResponseModel(200, ['Xóa thành công'], result));
        } catch (e) {
            return res.status(500).json(new ResponseModel(500, ['Lỗi xóa khuyến mãi'], null));
        }
    },

    async deleteAll(req, res, next) {
        const voucherIds = req.body.voucherIds;
        try {
            const result = await VoucherService.deleteAllVoucher(voucherIds);
            return res.status(200).json(new ResponseModel(200, ['Xóa thành công'], result));
        } catch (e) {
            return res.status(500).json(new ResponseModel(500, ['Lỗi xóa khuyến mãi'], null));
        }
    },
};

export default VoucherController;
