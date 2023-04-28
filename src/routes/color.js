import { Router } from 'express';
import ColorController from '../controllers/color.js';

const route = Router();

route.post('/create', ColorController.create);

route.patch('/update', ColorController.update);

route.delete('/delete', ColorController.delete);

route.post('/delete-all', ColorController.deleteAll);

route.get('/get-all', ColorController.getAll);

route.get('/get/:id', ColorController.getById);

export default route;
