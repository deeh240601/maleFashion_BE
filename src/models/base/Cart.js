import mongoose from 'mongoose';

mongoose.Promise = global.Promise;

const cartSchema = new mongoose.Schema({
        _id: mongoose.Schema.Types.ObjectId,
        customer: { type: mongoose.Schema.Types.ObjectId, ref: 'Customer' },
        quantity: { type: Number, required: true },
        productDetail: { type: mongoose.Schema.Types.ObjectId, ref: 'ProductDetail' },
    },
    {
        versionKey: false,
    },
);

export default mongoose.model('Cart', cartSchema);
