import { Router } from 'express';
import { AuthMiddleware } from '../middlewares/auth.js';
import { ROLE } from '../common/constant/role.js';
import SaleOrderController from '../controllers/saleOrder.js';

const route = Router();

route.post('/create', AuthMiddleware.authorize(ROLE.CUSTOMER), SaleOrderController.create);

route.patch('/update', SaleOrderController.update);

route.get('/delete/:saleOrderId', SaleOrderController.delete);

route.post('/delete-all', SaleOrderController.deleteAll);

route.get('/get-all', AuthMiddleware.authorize(ROLE.CUSTOMER), SaleOrderController.getAll);
route.get('/get-all-force',  SaleOrderController.getAllForce);

route.get('/get/:id', SaleOrderController.getById);

route.get('/get-full/:id', SaleOrderController.getFullById);
route.post('/update-status', SaleOrderController.updateStatus);

export default route;
