import mongoose from 'mongoose';

mongoose.Promise = global.Promise;

const BuyOrderSchema = new mongoose.Schema({
        _id: mongoose.Schema.Types.ObjectId,
        code: { type: String, required: true, trim: true },
        description: { type: String, required: true, trim: true },
        supplier: { type: mongoose.Schema.Types.ObjectId, ref: 'Supplier' },
        createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    },
    {
        timestamps: true,
        versionKey: false,
    },
);

export default mongoose.model('BuyOrder', BuyOrderSchema);
