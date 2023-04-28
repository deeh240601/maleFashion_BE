import { Router } from 'express';
import StaffController from '../controllers/staff.js';

const route = Router();

route.post('/create', StaffController.create);

route.patch('/update', StaffController.update);

route.delete('/delete', StaffController.delete);

route.post('/delete-all', StaffController.deleteAll);

route.get('/get-all', StaffController.getAll);

route.get('/get/:id', StaffController.getById);

export default route;
