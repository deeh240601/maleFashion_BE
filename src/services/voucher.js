import Voucher from '../models/base/Voucher.js';
import mongoose from 'mongoose';

const VoucherService = {
    async getAll() {
        const vouchers = await Voucher.find();
        return vouchers;
    }
    ,
    async getById(id) {
        const voucher = await Voucher.findOne({ _id: id }).populate('createdBy');
        return voucher;
    }
    ,
    async createVoucher(voucher) {

        const voucherSchema = new Voucher({
            _id: new mongoose.Types.ObjectId(),
            ...voucher,
        });

        const result = await voucherSchema.save();
        return result;
    }
    ,
    async updateVoucher(voucher) {
        const result = await Voucher.findByIdAndUpdate(voucher._id, voucher);
        return result;
    }

    ,
    async deleteVoucher(voucherId) {
        const result = await Voucher.findByIdAndDelete(voucherId);
        return result;
    },

    async deleteAllVoucher(voucherIds) {
        console.log(voucherIds);
        const result = await Voucher.deleteMany({ _id: { $in: voucherIds } });
        return result;
    },


};

export default VoucherService;
