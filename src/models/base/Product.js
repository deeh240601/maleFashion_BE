import mongoose from 'mongoose';

mongoose.Promise = global.Promise;

const productSchema = new mongoose.Schema({
        _id: mongoose.Schema.Types.ObjectId,
        name: { type: String, required: true, trim: true, unique: true },
        code: { type: String, required: true, trim: true },
        badge: { type: String, trim: true },
        star: { type: Number },
        exportPrice: { type: Number },
        salePrice: { type: Number },
        description: { type: String, trim: true },
        supplier: { type: mongoose.Schema.Types.ObjectId, ref: 'Supplier' },
        category: { type: mongoose.Schema.Types.ObjectId, ref: 'Category' },
        image: { type: String, trim: true },
    },
    {
        timestamps: true,
        versionKey: false,
    },
);

export default mongoose.model('Product', productSchema);
