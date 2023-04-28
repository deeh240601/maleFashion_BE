import { Router } from 'express';
import VoucherController from '../controllers/voucher.js';
import { AuthMiddleware } from '../middlewares/auth.js';
import { ROLE } from '../common/constant/role.js';

const route = Router();

route.post('/create', AuthMiddleware.authorize(ROLE.STAFF), VoucherController.create);

route.patch('/update', VoucherController.update);

route.delete('/delete', VoucherController.delete);

route.post('/delete-all', VoucherController.deleteAll);

route.get('/get-all', VoucherController.getAll);

route.get('/get/:id', VoucherController.getById);

export default route;
