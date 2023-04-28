import Staff from '../models/base/Staff.js';
import User from '../models/base/User.js';
import mongoose from 'mongoose';
import UserService from './user.js';
import { ROLE } from '../common/constant/role.js';

const StaffService = {
    async getAll() {
        const staffs = await User.find({ role: ROLE.STAFF });
        return staffs;
    },
    async getById(id) {
        const staff = await User.findById(id);
        return staff;
    },
    async getStaffByUserId(id) {
        const staff = await Staff.findOne({ user: mongoose.Types.ObjectId(id) });
        return staff;
    },
    async createStaff(user) {
        user.role = ROLE.STAFF;
        const userCreacted = await UserService.createUser(user);
        const staffTmp = new Staff({
            _id: new mongoose.Types.ObjectId(),
            user: userCreacted._id,
        });
        await staffTmp.save();
        return userCreacted;
    },
    async updateStaff(user) {
        user.role = ROLE.STAFF;
        const result = await UserService.updateUser(user);
        return result;
    },
    async deleteStaff(staffId) {
        const staff = await Staff.findById(staffId);
        await Staff.findByIdAndDelete(staffId);
        await User.findByIdAndDelete(staff.user);
        return true;
    },
    async deleteAllStaff(staffIds) {
        const result = await User.deleteMany({ _id: { $in: staffIds } });
        const staffIdObject = staffIds.map((id) => {
            return mongoose.Types.ObjectId(id);
        });
        const detls = await Staff.deleteMany({ staff: { $in: staffIdObject } });
        return result;
    },

};

export default StaffService;
