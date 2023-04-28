import mongoose from 'mongoose';

mongoose.Promise = global.Promise;

const sizeSchema = new mongoose.Schema({
        _id: mongoose.Schema.Types.ObjectId,
        name: { type: String, required: true, trim: true, unique: true },
    },
    {
        timestamps: true,
        versionKey: false,
    },
);

export default mongoose.model('Size', sizeSchema);
