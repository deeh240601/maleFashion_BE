import { Router } from 'express';
import { AuthMiddleware } from '../middlewares/auth.js';
import { ROLE } from '../common/constant/role.js';
import CartController from '../controllers/cart.js';

const route = Router();

route.post('/create', AuthMiddleware.authorize(ROLE.CUSTOMER), CartController.create);

route.patch('/update', CartController.update);

route.get('/delete/:cartId', CartController.delete);

route.post('/delete-all', CartController.deleteAll);

route.get('/get-all', AuthMiddleware.authorize(ROLE.CUSTOMER), CartController.getAll);

route.get('/get/:id', CartController.getById);

export default route;
