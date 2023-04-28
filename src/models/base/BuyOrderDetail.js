import mongoose from 'mongoose';

mongoose.Promise = global.Promise;

const BuyOrderDetailSchema = new mongoose.Schema({
        _id: mongoose.Schema.Types.ObjectId,
        buyOrder: { type: mongoose.Schema.Types.ObjectId, ref: 'BuyOrder' },
        quantity: { type: Number, required: true },
        amount: { type: Number, required: true },
        price: { type: Number, required: true },
        productDetail: { type: mongoose.Schema.Types.ObjectId, ref: 'ProductDetail' },
    },
    {
        versionKey: false,
    },
);

export default mongoose.model('BuyOrderDetail', BuyOrderDetailSchema);
