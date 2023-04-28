import { Router } from 'express';
import SizeController from '../controllers/size.js';

const route = Router();

route.post('/create', SizeController.create);

route.patch('/update', SizeController.update);

route.delete('/delete', SizeController.delete);

route.post('/delete-all', SizeController.deleteAll);

route.get('/get-all', SizeController.getAll);

route.get('/get/:id', SizeController.getById);

export default route;
