import { Router } from 'express';
import ProductController from '../controllers/product.js';

const route = Router();

route.post('/create', ProductController.create);

route.patch('/update', ProductController.update);

route.delete('/delete', ProductController.delete);

route.post('/delete-all', ProductController.deleteAll);

route.get('/get-all', ProductController.getAll);

route.get('/get-feature', ProductController.getFeature);

route.get('/get-related/:id', ProductController.getRelatedProducts);

route.get('/get/:id', ProductController.getById);

route.get('/page/:page', ProductController.getProductsPagination);

route.post('/get-filter', ProductController.getFilter);

route.get('/get-like-code/:code', ProductController.getLikeCode);
route.get('/get-by-code/:code', ProductController.getByCode);


export default route;
