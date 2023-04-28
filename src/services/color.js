import Color from '../models/base/Color.js';
import mongoose from 'mongoose';

const ColorService = {
    async getAll() {
        const colors = await Color.find();
        return colors;
    }
    ,
    async getById(id) {
        const color = await Color.findOne({ _id: id });
        return color;
    }
    ,
    async createColor(color) {
        const colorSchema = new Color({
            _id: new mongoose.Types.ObjectId(),
            ...color,
        });

        const result = await colorSchema.save();
        return result;
    }
    ,
    async updateColor(color) {
        const result = await Color.findByIdAndUpdate(color._id, color);
        return result;
    }

    ,
    async deleteColor(colorId) {
        const result = await Color.findByIdAndDelete(colorId);
        return result;
    },

    async deleteAllColor(colorIds) {
        console.log(colorIds);
        const result = await Color.deleteMany({ _id: { $in: colorIds } });
        return result;
    },


};

export default ColorService;
