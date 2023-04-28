import { Router } from 'express';
import user from './user.js';
import auth from './auth.js';
import customer from './customer.js';
import staff from './staff.js';
import color from './color.js';
import category from './category.js';
import voucher from './voucher.js';
import size from './size.js';
import supplier from './supplier.js';
import product from './product.js';
import properties from './properties.js';
import buyOrder from './buyOrder.js';
import wishlist from './wishlist.js';
import cart from './cart.js';
import saleOrder from './saleOrder.js';

const routes = Router();

routes.use('/auth', auth);
routes.use('/user', user);
routes.use('/customer', customer);
routes.use('/staff', staff);
routes.use('/color', color);
routes.use('/category', category);
routes.use('/voucher', voucher);
routes.use('/size', size);
routes.use('/supplier', supplier);
routes.use('/product', product);
routes.use('/properties', properties);
routes.use('/buy-order', buyOrder);
routes.use('/wishlist', wishlist);
routes.use('/cart', cart);
routes.use('/saleOrder', saleOrder)
routes.get('/', (req, res) => {
    res.send('Home');
});

export default routes;
