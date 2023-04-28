import ProductService from '../services/product.js';
import ResponseModel from '../models/response/ResponseModel.js';

const ProductController = {

    async getAll(req, res, next) {
        try {
            const result = await ProductService.getAll();
            return res.status(200).json(new ResponseModel(200, [], result));
        } catch (e) {
            res.status(500).json(new ResponseModel(500, ['Lỗi lấy thông tin sản phẩm'], null));
        }
    },
    async getProductsPagination(req, res, next) {
        try {
            const page = req.params.page;
            const result = await ProductService.getProductsPagination(page);
            return res.status(200).json(new ResponseModel(200, [], result));
        } catch (e) {
            res.status(500).json(new ResponseModel(500, ['Lỗi lấy thông tin sản phẩm'], null));
        }
    },
    async getFilter(req, res, next) {
        try {
            // const page = req.params.page;
            const result = await ProductService.getFilter(req.body);
            return res.status(200).json(new ResponseModel(200, [], result));
        } catch (e) {
            res.status(500).json(new ResponseModel(500, ['Lỗi lấy thông tin sản phẩm'], null));
        }
    },
    async getLikeCode(req, res, next) {
        try {
            // const page = req.params.page;
            const result = await ProductService.getProductLikeCode(req.params.code);
            return res.status(200).json(new ResponseModel(200, [], result));
        } catch (e) {
            res.status(500).json(new ResponseModel(500, ['Lỗi lấy thông tin sản phẩm'], null));
        }
    },
    async getByCode(req, res, next) {
        // try {
            // const page = req.params.page;
            const result = await ProductService.getProductByCode(req.params.code);
            return res.status(200).json(new ResponseModel(200, [], result));
        // } catch (e) {
        //     res.status(500).json(new ResponseModel(500, ['Lỗi lấy thông tin sản phẩm'], null));
        // }
    },
    async getFeature(req, res, next) {
        try {
            const result = await ProductService.getFeature();
            return res.status(200).json(new ResponseModel(200, [], result));
        } catch (e) {
            res.status(500).json(new ResponseModel(500, ['Lỗi lấy thông tin sản phẩm'], null));
        }
    },
    async getRelatedProducts(req, res, next) {
        try {
            const result = await ProductService.getRelatedProducts(req.params.id);

            return res.status(200).json(new ResponseModel(200, [], result));
        } catch (e) {
            res.status(500).json(new ResponseModel(500, ['Lỗi lấy thông tin sản phẩm'], null));
        }
    },

    async getById(req, res, next) {
        try {
            const result = await ProductService.getById(req.params.id);
            return res.status(200).json(new ResponseModel(200, [], result));
        } catch (e) {
            res.status(500).json(new ResponseModel(500, ['Lỗi lấy thông tin sản phẩm'], null));
        }
    },

    async create(req, res, next) {
        try {
            const result = await ProductService.createProduct(req.body);
            return res.status(200).json(new ResponseModel(200, ['Thêm sản phẩm thành công'], result));
        } catch (e) {
            console.log(e);
            return res.status(500).json(new ResponseModel(500, ['Lỗi thêm thông tin sản phẩm'], null));
        }
    },

    async update(req, res, next) {
        try {
            const result = await ProductService.updateProduct(req.body);
            return res.status(200).json(new ResponseModel(200, ['Sửa sản phẩm thành công'], result));
        } catch (e) {
            console.log(e);
            return res.status(500).json(new ResponseModel(500, ['Lỗi cập nhật thông tin sản phẩm'], null));
        }
    },

    async delete(req, res, next) {
        const productId = req.params.productId;
        try {
            const result = await ProductService.deleteProduct(productId);
            return res.status(200).json(new ResponseModel(200, ['Xóa thành công'], result));
        } catch (e) {
            return res.status(500).json(new ResponseModel(500, ['Lỗi xóa sản phẩm'], null));
        }
    },

    async deleteAll(req, res, next) {
        const productIds = req.body.productIds;
        try {
            const result = await ProductService.deleteAllProduct(productIds);
            return res.status(200).json(new ResponseModel(200, ['Xóa thành công'], result));
        } catch (e) {
            return res.status(500).json(new ResponseModel(500, ['Lỗi xóa sản phẩm'], null));
        }
    },
};

export default ProductController;
