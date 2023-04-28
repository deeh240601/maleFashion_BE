import { Router } from 'express';
import CustomerController from '../controllers/customer.js';

const route = Router();

route.post('/create', CustomerController.create);

route.patch('/update', CustomerController.update);

route.delete('/delete', CustomerController.delete);

route.post('/delete-all', CustomerController.deleteAll);

route.get('/get-all', CustomerController.getAll);

route.get('/get/:id', CustomerController.getById);

export default route;
