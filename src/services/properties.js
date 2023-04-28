import Size from '../models/base/Size.js';
import Color from '../models/base/Color.js';
import Supplier from '../models/base/Supplier.js';
import Category from '../models/base/Category.js';

const PropertiesService = {
    async getAll() {
        const sizes = await Size.find();
        const colors = await Color.find();
        const suppliers = await Supplier.find();
        const categories = await Category.find();
        return { sizes, colors, suppliers, categories };
    },

};

export default PropertiesService;
