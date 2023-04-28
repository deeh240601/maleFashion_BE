import User from '../models/base/User.js';
import { hashPassword } from '../utils/hashPassword.js';
import mongoose from 'mongoose';

const UserService = {
    async getAll() {
        const users = await User.find();
        return users;
    }
    ,
    async getById(id) {
        const user = await User.findOne({ _id: id });
        return user;
    }
    ,
    async createUser(user) {
        user.password = await hashPassword(user.password);
        const userSchema = new User({
            _id: new mongoose.Types.ObjectId(),
            ...user,
        });
        const result = await userSchema.save();
        return result;
    }
    ,
    async updateUser(user) {
        if (user.password){
            user.password = await hashPassword(user.password);
        }
        const result = await User.findByIdAndUpdate(user._id, user);

        return result;
    }

    ,
    async deleteUser(userId) {

        const result = await User.findByIdAndDelete(userId);
        return result;
    },


};

export default UserService;
