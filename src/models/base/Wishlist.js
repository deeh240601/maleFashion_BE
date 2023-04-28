import mongoose from 'mongoose';

mongoose.Promise = global.Promise;

const WishlistSchema = new mongoose.Schema({
        _id: mongoose.Schema.Types.ObjectId,
        customer: { type: mongoose.Schema.Types.ObjectId, ref: 'Customer' },
        product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
    },
    {
        versionKey: false,
    },
);

export default mongoose.model('Wishlist', WishlistSchema);
