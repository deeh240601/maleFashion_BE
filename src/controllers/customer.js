import CustomerService from '../services/customer.js';
import ResponseModel from '../models/response/ResponseModel.js';

const CustomerController = {

    async getAll(req, res, next) {
        try {
            const result = await CustomerService.getAll();
            res.json(new ResponseModel(200, [], result));
        } catch (e) {
            res.status(500).json(new ResponseModel(500, ['Lỗi lấy thông tin khách hàng'], null));
        }
    },

    async getById(req, res, next) {
        try {
            const result = await CustomerService.getById(req.params.id);
            res.json(new ResponseModel(200, [], result));
        } catch (e) {
            res.status(500).json(new ResponseModel(500, ['Lỗi lấy thông tin khách hàng'], null));
        }
    },

    async create(req, res, next) {
        try {
            const result = await CustomerService.createCustomer(req.body);
            return res.json(new ResponseModel(200, [], result));
        } catch (e) {
            return res.status(500).json(new ResponseModel(500, ['Lỗi thêm thông tin khách hàng'], null));
        }
    },

    async update(req, res, next) {
        try {
            const result = await CustomerService.updateCustomer(req.body);
            return res.json(new ResponseModel(200, ['Cập nhật thông tin thành công'], result));
        } catch (e) {
            return res.status(500).json(new ResponseModel(500, ['Lỗi cập nhật thông tin khách hàng'], null));
        }
    },

    async delete(req, res, next) {
        const customerId = req.params.id;
        try {
            const result = await CustomerService.deleteCustomer(customerId);
            return res.json(new ResponseModel(200, [], result));
        } catch (e) {
            return res.status(500).json(new ResponseModel(500, ['Lỗi xóa khách hàng'], null));
        }
    },

    async deleteAll(req, res, next) {
        const customerIds = req.body.customerIds;
        try {
            const result = await CustomerService.deleteAllCustomer(customerIds);
            return res.status(200).json(new ResponseModel(200, ['Xóa thành công'], result));
        } catch (e) {
            return res.status(500).json(new ResponseModel(500, ['Lỗi xóa Khách hàng'], null));
        }
    },
};

export default CustomerController;
