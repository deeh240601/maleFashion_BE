import Customer from '../models/base/Customer.js';
import mongoose from 'mongoose';
import Cart from '../models/base/Cart.js';
import Product from '../models/base/Product.js';

const CartService = {
    async getAll(user) {
        const customer = await Customer.findOne({ user: mongoose.Types.ObjectId(user._id) });
        const carts = await Cart.find({ customer: mongoose.Types.ObjectId(customer._id) }).populate('productDetail');
        const productIds = [];
        carts.forEach((itemCart) => {
            productIds.push(itemCart.productDetail.product);
        });
        const products = await Product.find({ _id: { $in: productIds } });
        carts.forEach((itemCart) => {
            const product = products.find((item) => item._id == itemCart.productDetail.product.toString());
            itemCart.set('name', product.name, { strict: false });
        });
        return carts;
    }
    ,
    async getById(id) {
        const cart = await Cart.findOne({ _id: id });
        return cart;
    }
    ,
    async createItemCart(cart) {
        const cartOld = await Cart.findOne({
            productDetail: mongoose.Types.ObjectId(cart.productDetail),
            customer: mongoose.Types.ObjectId(cart.customer),
        });

        if (cartOld) {
            cartOld.quantity += Number(cart.quantity);
            const result = await Cart.findByIdAndUpdate(cartOld._id, cartOld);
            return result;
        }

        const cartSchema = new Cart({
            _id: new mongoose.Types.ObjectId(),
            ...cart,
        });

        const result = await cartSchema.save();
        return result;
    }
    ,
    async updateCart(cart) {
        const result = await Cart.findByIdAndUpdate(cart._id, cart);
        return result;
    }

    ,
    async deleteCart(cartId) {
        const result = await Cart.findByIdAndDelete(cartId);
        return result;
    },

    async deleteAllCart(cartIds) {
        const result = await Cart.deleteMany({ _id: { $in: cartIds } });
        return result;
    },


};

export default CartService;
