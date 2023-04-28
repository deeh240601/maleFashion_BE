import ResponseModel from '../models/response/ResponseModel.js';
import WishlistService from '../services/wishlist.js';

const WishlistController = {

    async getAll(req, res, next) {
        try {
            const result = await WishlistService.getAll(req.user);
            return res.status(200).json(new ResponseModel(200, [], result));
        } catch (e) {
            res.status(500).json(new ResponseModel(500, ['Lỗi lấy thông tin sản phẩm'], null));
        }
    },

    async getById(req, res, next) {
        try {
            const result = await WishlistService.getById(req.params.id);
            return res.status(200).json(new ResponseModel(200, [], result));
        } catch (e) {
            res.status(500).json(new ResponseModel(500, ['Lỗi lấy thông tin sản phẩm'], null));
        }
    },

    async create(req, res, next) {
        // try {
        const result = await WishlistService.createWishlist(req.body);
        return res.status(200).json(new ResponseModel(200, ['Thêm sản phẩm thành công'], result));
        // } catch (e) {
        //     return res.status(500).json(new ResponseModel(500, ['Lỗi thêm thông tin sản phẩm'], null));
        // }
    },

    async update(req, res, next) {
        try {
            const result = await WishlistService.updateWishlist(req.body);
            return res.status(200).json(new ResponseModel(200, ['Sửa sản phẩm thành công'], result));
        } catch (e) {
            console.log(e);
            return res.status(500).json(new ResponseModel(500, ['Lỗi cập nhật thông tin sản phẩm'], null));
        }
    },

    async delete(req, res, next) {
        const wishlistId = req.params.wishlistId;
        try {
            const result = await WishlistService.deleteWishlist(wishlistId);
            return res.status(200).json(new ResponseModel(200, ['Xóa thành công'], result));
        } catch (e) {
            return res.status(500).json(new ResponseModel(500, ['Lỗi xóa sản phẩm'], null));
        }
    },

    async deleteAll(req, res, next) {
        const wishlistIds = req.body.wishlistIds;
        try {
            const result = await WishlistService.deleteAllWishlist(wishlistIds);
            return res.status(200).json(new ResponseModel(200, ['Xóa thành công'], result));
        } catch (e) {
            return res.status(500).json(new ResponseModel(500, ['Lỗi xóa sản phẩm'], null));
        }
    },
};

export default WishlistController;
