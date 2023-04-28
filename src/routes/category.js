import { Router } from 'express';
import CategoryController from '../controllers/category.js';

const route = Router();

route.post('/create', CategoryController.create);

route.patch('/update', CategoryController.update);

route.delete('/delete', CategoryController.delete);

route.post('/delete-all', CategoryController.deleteAll);

route.get('/get-all', CategoryController.getAll);

route.get('/get/:id', CategoryController.getById);

export default route;
