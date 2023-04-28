import Customer from '../models/base/Customer.js';
import User from '../models/base/User.js';
import mongoose from 'mongoose';
import UserService from './user.js';
import { ROLE } from '../common/constant/role.js';

const CustomerService = {
    async getAll() {
        const customers = await User.find({ role: ROLE.CUSTOMER });
        return customers;
    },
    async getById(id) {
        const customer = await User.findById(id);
        return customer;
    },
    async getCustomerByUserId(id) {
        const customer = await Customer.findOne({ user: mongoose.Types.ObjectId(id) });
        return customer;
    },
    async createCustomer(user) {
        user.role = ROLE.CUSTOMER;
        const userCreacted = await UserService.createUser(user);
        const customerTmp = new Customer({
            _id: new mongoose.Types.ObjectId(),
            user: userCreacted._id,
        });
        await customerTmp.save();
        return userCreacted;
    },
    async updateCustomer(user) {
        user.role = ROLE.CUSTOMER;
        user.password = null;
        const result = await UserService.updateUser(user);
        return result;
    },
    async deleteCustomer(customerId) {
        const customer = await Customer.findById(customerId);
        await Customer.findByIdAndDelete(customerId);
        await User.findByIdAndDelete(customer.user);
        return true;
    },
    async deleteAllCustomer(customerIds) {
        const result = await User.deleteMany({ _id: { $in: customerIds } });
        return result;
    },

};

export default CustomerService;
