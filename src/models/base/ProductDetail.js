import mongoose from 'mongoose';

mongoose.Promise = global.Promise;

const productDetailSchema = new mongoose.Schema({
        _id: mongoose.Schema.Types.ObjectId,
        product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', require: true },
        color: { type: mongoose.Schema.Types.ObjectId, ref: 'Color' },
        size: { type: mongoose.Schema.Types.ObjectId, ref: 'Size' },
        stock: { type: Number },
        importPrice: { type: Number },
        exportPrice: { type: Number },
        salePrice: { type: Number },
        code: { type: String, trim: true, unique: true },
        image: { type: String, trim: true },
    },
    {
        versionKey: false,
    },
);

export default mongoose.model('ProductDetail', productDetailSchema);
