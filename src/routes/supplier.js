import { Router } from 'express';
import SupplierController from '../controllers/supplier.js';

const route = Router();

route.post('/create', SupplierController.create);

route.patch('/update', SupplierController.update);

route.delete('/delete', SupplierController.delete);

route.post('/delete-all', SupplierController.deleteAll);

route.get('/get-all', SupplierController.getAll);

route.get('/get/:id', SupplierController.getById);

export default route;
