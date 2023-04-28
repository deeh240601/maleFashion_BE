import mongoose from 'mongoose';

mongoose.Promise = global.Promise;

const SaleOrderSchema = new mongoose.Schema({
        _id: mongoose.Schema.Types.ObjectId,
        customer: { type: mongoose.Schema.Types.ObjectId, ref: 'Customer' },
        firstName: { type: String },
        lastName: { type: String },
        phone: { type: String },
        email: { type: String },
        code: { type: String, required: true, trim: true },
        description: { type: String, trim: true },
        note: { type: String },
        address: { type: String, required: true, trim: true },
        voucher: { type: mongoose.Schema.Types.ObjectId, ref: 'Voucher' },
        paymentMethod: { type: String, required: true, trim: true },
        status: { type: String, required: true, trim: true },
    },
    {
        timestamps: true,
        versionKey: false,
    },
);

export default mongoose.model('SaleOrder', SaleOrderSchema);
