import mongoose from 'mongoose';
import { hashPassword } from '../utils/hashPassword.js';
import ResponseModel from '../models/response/ResponseModel.js';
import { MessageVN } from '../common/constant/message-vn.js';
import AuthService from '../services/auth.js';
import User from '../models/base/User.js';
import { ROLE } from '../common/constant/role.js';
import Customer from '../models/base/Customer.js';

const AuthController = {

    async login(req, res, next) {
        // try {
        const response = await AuthService.checkLogin(req.body, res);
        if (response) {
            res.cookie('refreshTokenMaleFashionShop', response.result.refreshToken, {
                httpOnly: true,
                secure: false,
                path: '/',
                sameSite: 'strict',
            });
            delete response.result.refreshToken;
            res.json(response);
        } else {
            res.status(403).json(new ResponseModel(500, ['Email hoặc mật khẩu không đúng !!'], null));
        }
        // } catch (e) {
        //     res.status(500).json(new ResponseModel(500, [MessageVN.ERROR_500], null));
        // }
    },

    async logout(req, res, next) {
        try {
            const result = await AuthService.logout(req, res);
            res.json(result);
        } catch (e) {
            res.status(500).json(new ResponseModel(500, [MessageVN.ERROR_500], null));
        }
    },

    async refreshToken(req, res, next) {
        try {
            const response = await AuthService.refreshToken(req, res);
            if (response) {
                res.cookie('refreshTokenMaleFashionShop', response.newRefreshToken, {
                    httpOnly: true,
                    secure: false,
                    path: '/',
                    sameSite: 'strict',
                });
                delete response.newRefreshToken;
                res.json(new ResponseModel(200, ['get token success'], response));
            } else {
                res.json(new ResponseModel(500, ['Vui lòng đăng nhập'], null));
            }
        } catch (e) {
            return res.status(500).json(new ResponseModel(500, [MessageVN.ERROR_500], null));
        }
    },

    async register(req, res, next) {
        req.body.password = await hashPassword(req.body.password);
        const user = new User({
            _id: new mongoose.Types.ObjectId(),
            ...req.body,
            role: ROLE.CUSTOMER,
        });
        const userCreacted = await user.save();
        const customer = new Customer({
            _id: new mongoose.Types.ObjectId(),
            user: userCreacted._id,
        });
        const customerCreated = await customer.save();
        const result = await Customer.findById(customerCreated.id).populate('user');
        return res.status(201).json({ result });

    },
};

export default AuthController;
