import { Router } from 'express';
import PropertiesController from '../controllers/properties.js';

const route = Router();

route.get('/get-all', PropertiesController.getAll);

export default route;
