import Wishlist from '../models/base/Wishlist.js';
import Customer from '../models/base/Customer.js';
import mongoose from 'mongoose';

const WishlistService = {
    async getAll(user) {
        const customer = await Customer.findOne({ user: mongoose.Types.ObjectId(user._id) });
        const wishlists = await Wishlist.find({ customer: mongoose.Types.ObjectId(customer._id) }).populate('product');
        return wishlists;
    }
    ,
    async getById(id) {
        const wishlist = await Wishlist.findOne({ _id: id });
        return wishlist;
    }
    ,
    async createWishlist(wishlist) {
        const wishListOld = await Wishlist.findOne({
            product: mongoose.Types.ObjectId(wishlist.product),
            customer: mongoose.Types.ObjectId(wishlist.customer),
        });

        if (wishListOld) {
            return wishlist;
        }

        const wishlistSchema = new Wishlist({
            _id: new mongoose.Types.ObjectId(),
            ...wishlist,
        });

        const result = await wishlistSchema.save();
        return result;
    }
    ,
    async updateWishlist(wishlist) {
        const result = await Wishlist.findByIdAndUpdate(wishlist._id, wishlist);
        return result;
    }

    ,
    async deleteWishlist(wishlistId) {
        const result = await Wishlist.findByIdAndDelete(wishlistId);
        return result;
    },

    async deleteAllWishlist(wishlistIds) {
        const result = await Wishlist.deleteMany({ _id: { $in: wishlistIds } });
        return result;
    },


};

export default WishlistService;
