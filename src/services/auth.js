import User from '../models/base/User.js';
import bcrypt from 'bcrypt';
import ResponseModel from '../models/response/ResponseModel.js';
import jwt from 'jsonwebtoken';
import { REFRESH_KEY, SECRECT_KEY } from '../config/index.js';
import { TIME_TOKEN } from '../common/constant/time-token.js';
import { ROLE } from './../common/constant/role.js';
import CustomerService from './customer.js';
import StaffService from './staff.js';

const AuthService = {
    async checkLogin(body, res) {
        const { email, password } = body;
        const user = await User.findOne({ email: email });
        if (user) {
            const isValidAccount = await bcrypt.compare(password, user.password);
            const ava = user.avatar;
            user.avatar = '';
            if (isValidAccount) {
                let refId = '';
                if (user.role == ROLE.CUSTOMER) {
                    const cusCreated = await CustomerService.getCustomerByUserId(user._id);
                    refId = cusCreated._id.toString();
                } else {
                    const staffCreated = await StaffService.getStaffByUserId(user._id);
                    refId = staffCreated._id.toString();
                }
                const accessToken = AuthService.generateToken(user, SECRECT_KEY, TIME_TOKEN.ACCESS);
                const refreshToken = AuthService.generateToken(
                    user,
                    REFRESH_KEY,
                    TIME_TOKEN.REFRESH,
                );
                user.avatar = ava;

                return new ResponseModel(200, [], {
                    user,
                    accessToken,
                    refreshToken,
                    refId,
                });
            }
            return false;
        }

        return user;
    }
    ,
    async refreshToken(req, res) {
        let newAccessToken = '';
        let newRefreshToken = '';
        const refreshToken = req.cookies.refreshTokenMaleFashionShop;

        if (!refreshToken) {
            return res.status(401).json(new ResponseModel(401, ['Hết phiên bản, vui lòng đăng nhập lại'], null));
        }
        ;

        jwt.verify(refreshToken, REFRESH_KEY, (err, { user }) => {
            if (err) {
                console.log('err', err);
            }
            newAccessToken = AuthService.generateToken(user, SECRECT_KEY, TIME_TOKEN.ACCESS);
            newRefreshToken = AuthService.generateToken(user, REFRESH_KEY, TIME_TOKEN.REFRESH);
        });

        return {
            newAccessToken,
            newRefreshToken,
        };
    }
    ,
    async logout(req, res) {
        res.clearCookie('refreshTokenMaleFashionShop');
        return new ResponseModel(200, ['logout success']);
    },

    generateToken(data, key, timeString) {
        return jwt.sign(
            {
                user: data,
            },
            key,
            {
                expiresIn: timeString,
            },
        );
    },
};
export default AuthService;
