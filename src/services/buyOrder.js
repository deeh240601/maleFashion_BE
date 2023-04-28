import BuyOrder from '../models/base/BuyOrder.js';
import mongoose from 'mongoose';
import BuyOrderDetail from '../models/base/BuyOrderDetail.js';
import ProductDetail from '../models/base/ProductDetail.js';
import SaleOrderDetail from '../models/base/SaleOrderDetail.js';
import Product from '../models/base/Product.js';

const BuyOrderService = {
           async getAll() {
        const buyOrders = await BuyOrder.find();
        return buyOrders;
    }
    ,
    async getById(id) {
        const buyOrder = await BuyOrder.findOne({ _id: id }).populate('supplier').populate('createdBy');
        const listDetails = await BuyOrderDetail.find({buyOrder: mongoose.Types.ObjectId(id)}).populate('productDetail');
        const productIds = [];
        listDetails.forEach((detail) => {
            productIds.push(detail.productDetail.product.toString())
        })
        const products = await Product.find({ _id: { $in: productIds } })
        listDetails.forEach((e) => {
            const product = products.find(productCreated =>{return  productCreated._id.toString() == e.productDetail.product.toString()})
            e.set('product',product, { strict: false })
        })
        buyOrder.set('listDetails',listDetails, { strict: false })
        return buyOrder;
    }
    ,
    async createBuyOrder(buyOrder) {
        const listDetails = buyOrder.listDetails  || [];
        const buyOrderDetails =  [];
        const buyOrderSchema = new BuyOrder({
            _id: new mongoose.Types.ObjectId(),
            ...buyOrder,
        });

        const result = await buyOrderSchema.save();
        if(result){
            listDetails.forEach((detail) => {
                detail.buyOrder = result;
                buyOrderDetails.push(detail);
            })
            const resultDetail = await BuyOrderDetail.insertMany(buyOrderDetails);
            const productDetaiIds = [];
            resultDetail.forEach(e => {
                productDetaiIds.push(e.productDetail.toString());
            })
            const productDetails = await ProductDetail.find({_id: { $in: productDetaiIds } }) || [];
            const s = []
            productDetails.forEach(e => {
                const buyOrderDetail = resultDetail.find(detail => detail.productDetail.toString() === e._id.toString())
                e.stock += buyOrderDetail.quantity;
                e.importPrice = buyOrderDetail.price;
                s.push(ProductDetail.findByIdAndUpdate(e._id, e))

            })
            await Promise.all(s)

        }
        return result;
    }
    ,
    async updateBuyOrder(buyOrder) {
        const result = await BuyOrder.findByIdAndUpdate(buyOrder._id, buyOrder);
        return result;
    }

    ,
    async deleteBuyOrder(buyOrderId) {
        const result = await BuyOrder.findByIdAndDelete(buyOrderId);
        return result;
    },

    async deleteAllBuyOrder(buyOrderIds) {
        const result = await BuyOrder.deleteMany({ _id: { $in: buyOrderIds } });
        const productIdObject = buyOrderIds.map((id) => {
            return mongoose.Types.ObjectId(id);
        });
        const detls = await BuyOrderDetail.deleteMany({ buyOrder: { $in: productIdObject } });
        return result;
    },


};

export default BuyOrderService;
