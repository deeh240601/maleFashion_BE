import Customer from '../models/base/Customer.js';
import SaleOrder from '../models/base/SaleOrder.js';
import mongoose from 'mongoose';
import SaleOrderDetail from '../models/base/SaleOrderDetail.js';
import Cart from '../models/base/Cart.js';
import CartService from './cart.js';
import BuyOrder from '../models/base/BuyOrder.js';
import Product from '../models/base/Product.js';
import User from '../models/base/User.js';
import ProductDetail from '../models/base/ProductDetail.js';
import { SALE_ORDER_STATUS } from '../common/constant/sale-order-status.js';

const SaleOrderService = {
    async getAll(user) {
        const customer = await Customer.findOne({ user: mongoose.Types.ObjectId(user._id) });
        const saleOrders = await SaleOrder.find({ customer: mongoose.Types.ObjectId(customer._id) });
        return saleOrders;
    }
    ,
    async getAllAdmin() {
        const saleOrders = await SaleOrder.find();
        return saleOrders;
    }
    ,
    async getById(id) {
        const saleOrder = await SaleOrder.findOne({ _id: id });
        return saleOrder;
    }
    ,
    async getFullById(id) {
        const saleOrder = await SaleOrder.findOne({ _id: id }).populate('voucher');
        const customer = await Customer.findOne({_id: saleOrder.customer}).populate('user')
        const listDetails = await SaleOrderDetail.find({saleOrder: mongoose.Types.ObjectId(id)}).populate('productDetail');
        const productIds = [];
        listDetails.forEach((detail) => {
            productIds.push(detail.productDetail.product.toString())
        })
        const products = await Product.find({ _id: { $in: productIds } })
        listDetails.forEach((e) => {
            const product = products.find(productCreated =>{return  productCreated._id.toString() == e.productDetail.product.toString()})
            e.set('product',product, { strict: false })
        })
        saleOrder.set('listDetails',listDetails, { strict: false })
        saleOrder.set('user',customer.user, { strict: false })
        return saleOrder;
    }
    ,
    async createSaleOrder(saleOrder) {
        const listDetails = saleOrder.listDetails;
        const saleOrderDetails = [];
        const saleOrderSchema = new SaleOrder({
            _id: new mongoose.Types.ObjectId(),
            ...saleOrder,
        });
        const result = await saleOrderSchema.save();
        if(result){
            listDetails.forEach((detail) => {
                detail.saleOrder = result;
                saleOrderDetails.push(detail);
            })
            const resultDetail = await SaleOrderDetail.insertMany(saleOrderDetails);
            if(resultDetail){
                const carts = await Cart.find({ customer: mongoose.Types.ObjectId(saleOrder.customer)}) || [];
                const cartIds = [];
                carts.forEach((cart) => {
                    cartIds.push(cart._id);
                });
                await CartService.deleteAllCart(cartIds);
            }

        }
        return result;
    }
    ,
    async updateStatus(dataUpdate) {
       const {id,canceled,activeStep } = dataUpdate;
       let status = '';
       if (canceled){
           status = SALE_ORDER_STATUS.CANCELED;
       }else{
           status = SALE_ORDER_STATUS.getByNumber(activeStep)
       }

       if(status == SALE_ORDER_STATUS.DELIVERING){
        const listDetails = await SaleOrderDetail.find({saleOrder: mongoose.Types.ObjectId(id)}).populate('productDetail');
        const productDetailIds = listDetails.map(detail => detail.productDetail._id);
        // productDetailIds.forEach(productDetail => {
        //     const pd = await ProductDetail.findOne({_id: productDetail});
        //     pd.stock = pd.stock - 1;
        //     pd.save();
        // })

        for (const productDetail of productDetailIds) {
            const pd = await ProductDetail.findOne({_id: productDetail});
            pd.stock = pd.stock - 1;
            pd.save();
        }

       }
       const result = await SaleOrder.findOneAndUpdate({_id : id},{status});
        return result;
    }
    ,
    async updateSaleOrder(saleOrder) {
        const result = await SaleOrder.findByIdAndUpdate(saleOrder._id, saleOrder);
        return result;
    }

    ,
    async deleteSaleOrder(saleOrderId) {
        const result = await SaleOrder.findByIdAndDelete(saleOrderId);
        return result;
    },

    async deleteAllSaleOrder(saleOrderIds) {
        const result = await SaleOrder.deleteMany({ _id: { $in: saleOrderIds } });
        return result;
    },


};

export default SaleOrderService;
