import { Router } from 'express';
import UserController from '../controllers/user.js';
import { AuthMiddleware } from '../middlewares/auth.js';
import { ROLE } from '../common/constant/role.js';

const route = Router();

route.post('/create', UserController.create);

route.patch('/update', UserController.update);

route.delete('/delete', AuthMiddleware.authorize(ROLE.ADMIN), UserController.delete);

route.get('/get-all', AuthMiddleware.authorize(ROLE.ADMIN), UserController.getAll);

route.get('/get-all-2', AuthMiddleware.authorize(ROLE.CUSTOMER), UserController.getAll);

route.get('/get/:id', AuthMiddleware.authorize(ROLE.ADMIN), UserController.getById);

route.get('/get-current/', AuthMiddleware.authorize(ROLE.CUSTOMER), UserController.getCurrentUser);

export default route;
