import Product from '../models/base/Product.js';
import ProductDetail from '../models/base/ProductDetail.js';
import mongoose from 'mongoose';

const ProductService = {
    async getAll() {
        const products = await Product.find();
        return products;
    }
    ,
    async getProductsPagination(page) {
        const limit = 9;
        const products = await Product.find().skip((page * limit) - limit).limit(limit);
        return products;
    }
    ,
    async getProductLikeCode(code){
        const products = Product.find({
            code:{ $regex: '.*' + code + '.*' }
        })
        return products;
    }
    ,

    async getProductByCode(code){
        const product = await Product.findOne({ code}).populate('supplier');
        const detls = await ProductDetail.find({ product: mongoose.Types.ObjectId(product._id) }).populate('size').populate('color');
        product.set('listDetails', detls, { strict: false });
        return product;
    },
    async getFilter(filterModel) {
        const { searchText, priceTo, cate, supplier, size, page } = filterModel;
        const limit = 9;
        const totalItem = await Product.count();
        let objectFilter = {};
        if (supplier !== '') {
            objectFilter.supplier = supplier;
        }
        if (cate !== '') {
            objectFilter.category = cate;
        }
        const products = await Product.find(
            {
                ...objectFilter,
                name: { $regex: '.*' + searchText + '.*' },
                exportPrice: Number(priceTo) === 0 ? { $gt: Number(priceTo) }: { $lt: Number(priceTo) }
            }
        ).skip((page * limit) - limit).limit(limit);
        return { ...filterModel, totalItem, products, limit };
    }
    ,
    async getFeature() {
        const products = await Product.find().limit(4);
        return products;
    }
    ,
    async getRelatedProducts(id) {
        const product = await Product.findOne({ _id: id });
        const products = await Product.find({ supplier: mongoose.Types.ObjectId(product.supplier) });
        return products;
    }
    ,

    async getById(id) {
        const product = await Product.findOne({ _id: id }).populate('supplier');
        const detls = await ProductDetail.find({ product: mongoose.Types.ObjectId(id) }).populate('size').populate('color');
        product.set('listDetails', detls, { strict: false });
        return product;
    }

    ,
    async createProduct(productFull) {
        const listDetails = productFull.listDetails;
        const productDetail = [];
        const productSchema = new Product({
            _id: new mongoose.Types.ObjectId(),
            ...productFull,
        });
        const productResult = await productSchema.save();
        listDetails.forEach(detail => {
            detail.product = productResult;
            delete detail.id;
            productDetail.push(new ProductDetail({
                _id: new mongoose.Types.ObjectId(),
                ...detail,
                code: `${productResult.code} - ${detail.color.name} - ${detail.size.name}`,
            }));
        });
        await ProductDetail.insertMany(productDetail);
        return productResult;
    }
    ,
    async updateProduct(product) {
        const listDetails = productFull.listDetails;
        const result = await Product.findByIdAndUpdate(product._id, product);
        return result;
    }

    ,
    async deleteProduct(productId) {
        const result = await Product.findByIdAndDelete(productId);
        return result;
    },

    async deleteAllProduct(productIds) {
        const result = await Product.deleteMany({ _id: { $in: productIds } });
        const productIdObject = productIds.map((id) => {
            return mongoose.Types.ObjectId(id);
        });
        const detls = await ProductDetail.deleteMany({ product: { $in: productIdObject } });
        return true;
    },


};

export default ProductService;
