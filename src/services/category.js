import Category from '../models/base/Category.js';
import mongoose from 'mongoose';

const CategoryService = {
    async getAll() {
        const categorys = await Category.find();
        return categorys;
    }
    ,
    async getById(id) {
        const category = await Category.findOne({ _id: id });
        return category;
    }
    ,
    async createCategory(category) {
        const categorySchema = new Category({
            _id: new mongoose.Types.ObjectId(),
            ...category,
        });

        const result = await categorySchema.save();
        return result;
    }
    ,
    async updateCategory(category) {
        const result = await Category.findByIdAndUpdate(category._id, category);
        return result;
    }

    ,
    async deleteCategory(categoryId) {
        const result = await Category.findByIdAndDelete(categoryId);
        return result;
    },

    async deleteAllCategory(categoryIds) {
        const result = await Category.deleteMany({ _id: { $in: categoryIds } });
        return result;
    },


};

export default CategoryService;
