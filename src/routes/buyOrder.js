import { Router } from 'express';
import BuyOrderController from '../controllers/buyOrder.js';

const route = Router();

route.post('/create', BuyOrderController.create);

route.patch('/update', BuyOrderController.update);

route.delete('/delete', BuyOrderController.delete);

route.post('/delete-all', BuyOrderController.deleteAll);

route.get('/get-all', BuyOrderController.getAll);

route.get('/get/:id', BuyOrderController.getById);

route.get('/get-total-order', BuyOrderController.getTotalOrder);
route.get('/get-total-buy-order', BuyOrderController.getTotalBuyOrder);

export default route;
