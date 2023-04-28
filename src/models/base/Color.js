import mongoose from 'mongoose';

mongoose.Promise = global.Promise;

const courseSchema = new mongoose.Schema({
        _id: mongoose.Schema.Types.ObjectId,
        name: { type: String, required: true, trim: true, unique: true },
        code: { type: String, required: true, trim: true },
    },
    {
        timestamps: true,
        versionKey: false,
    },
);

export default mongoose.model('Color', courseSchema);
