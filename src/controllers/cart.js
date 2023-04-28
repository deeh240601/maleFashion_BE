import ResponseModel from '../models/response/ResponseModel.js';
import CartService from '../services/cart.js';

const CartController = {

    async getAll(req, res, next) {
        // try {
        const result = await CartService.getAll(req.user);
        return res.status(200).json(new ResponseModel(200, [], result));
        // } catch (e) {
        //     res.status(500).json(new ResponseModel(500, ['Lỗi lấy thông tin giỏ hàng'], null));
        // }
    },

    async getById(req, res, next) {
        try {
            const result = await CartService.getById(req.params.id);
            return res.status(200).json(new ResponseModel(200, [], result));
        } catch (e) {
            res.status(500).json(new ResponseModel(500, ['Lỗi lấy thông tin giỏ hàng'], null));
        }
    },

    async create(req, res, next) {
        // try {
        const result = await CartService.createItemCart(req.body);
        return res.status(200).json(new ResponseModel(200, [], result));
        // } catch (e) {
        //     return res.status(500).json(new ResponseModel(500, ['Lỗi thêm thông tin giỏ hàng'], null));
        // }
    },

    async update(req, res, next) {
        try {
            const result = await CartService.updateCart(req.body);
            // return res.status(200).json(new ResponseModel(200, ['Sửa giỏ hàng thành công'], result));
            return res.status(200).json(new ResponseModel(200, [], result));
        } catch (e) {
            console.log(e);
            return res.status(500).json(new ResponseModel(500, ['Lỗi cập nhật thông tin giỏ hàng'], null));
        }
    },

    async delete(req, res, next) {
        const cartId = req.params.cartId;
        try {
            const result = await CartService.deleteCart(cartId);
            return res.status(200).json(new ResponseModel(200, ['Xóa thành công'], result));
        } catch (e) {
            return res.status(500).json(new ResponseModel(500, ['Lỗi xóa giỏ hàng'], null));
        }
    },

    async deleteAll(req, res, next) {
        const cartIds = req.body.cartIds;
        try {
            const result = await CartService.deleteAllCart(cartIds);
            return res.status(200).json(new ResponseModel(200, ['Xóa thành công'], result));
        } catch (e) {
            return res.status(500).json(new ResponseModel(500, ['Lỗi xóa giỏ hàng'], null));
        }
    },
};

export default CartController;
