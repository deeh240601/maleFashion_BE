import mongoose from 'mongoose';

mongoose.Promise = global.Promise;

const courseSchema = new mongoose.Schema({
        _id: mongoose.Schema.Types.ObjectId,
        user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    },
    {
        timestamps: true,
        versionKey: false,
    },
);

export default mongoose.model('Staff', courseSchema);
