import mongoose from 'mongoose';

mongoose.Promise = global.Promise;

const VoucherSchema = new mongoose.Schema({
        _id: mongoose.Schema.Types.ObjectId,
        code: { type: String, required: true, trim: true, unique: true },
        description: { type: String, required: true, trim: true },
        condition: { type: Number, required: true, trim: true },
        quantity: { type: Number, required: true, trim: true },
        percent: { type: Number, required: true, trim: true },
        startDate: { type: Date, required: true },
        endDate: { type: Date, required: true },
        createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'Staff' },
    },
    {
        timestamps: true,
        versionKey: false,
    },
);

export default mongoose.model('Voucher', VoucherSchema);
