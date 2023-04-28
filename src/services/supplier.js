import Supplier from '../models/base/Supplier.js';
import mongoose from 'mongoose';

const SupplierService = {
    async getAll() {
        const suppliers = await Supplier.find();
        return suppliers;
    }
    ,
    async getById(id) {
        const supplier = await Supplier.findOne({ _id: id });
        return supplier;
    }
    ,
    async createSupplier(supplier) {
        const sortName = supplier.lastName + (supplier.firstName == '' ? '' : ` - ${supplier.firstName}`);
        const supplierSchema = new Supplier({
            _id: new mongoose.Types.ObjectId(),
            sortName,
            ...supplier,
        });

        const result = await supplierSchema.save();
        return result;
    }
    ,
    async updateSupplier(supplier) {
        const sortName = supplier.lastName + (supplier.firstName == '' ? '' : ` - ${supplier.firstName}`);
        const result = await Supplier.findByIdAndUpdate(supplier._id, { ...supplier, sortName });
        return result;
    }

    ,
    async deleteSupplier(supplierId) {
        const result = await Supplier.findByIdAndDelete(supplierId);
        return result;
    },

    async deleteAllSupplier(supplierIds) {
        console.log(supplierIds);
        const result = await Supplier.deleteMany({ _id: { $in: supplierIds } });
        return result;
    },


};

export default SupplierService;
