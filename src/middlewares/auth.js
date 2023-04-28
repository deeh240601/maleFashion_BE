import jwt from 'jsonwebtoken';
import { SECRECT_KEY } from '../config/index.js';
import ResponseModel from '../models/response/ResponseModel.js';
import { ROLE } from '../common/constant/role.js';

export const AuthMiddleware = {
    verifyToken(req, res, next) {
        const token = req.headers.authorization;
        if (token) {
            const accessToken = token.split(' ')[1];
            jwt.verify(accessToken, SECRECT_KEY, (err, objectGenarate) => {
                if (err || !objectGenarate) {
                    return res.status(403).json(new ResponseModel(403, ['Phiên bản hết hạn vui lòng đăng nhập lại'], err));
                } else {
                    req.user = objectGenarate.user;
                    next();
                }
            });
        } else {
            return res.status(401).json(new ResponseModel(401, ['Vui lòng đăng nhập '], ''));
        }
    },

    authorize(permission) {
        return (req, res, next) => {
            AuthMiddleware.verifyToken(req, res, () => {
                if (req.user.role === permission || req.user.role === ROLE.ADMIN) {
                    next();
                } else {
                    return res.status(403).json(new ResponseModel(403, ['Không có quyền thực hiện tác vụ này'], ''));
                }
            });
        };

    },
};
