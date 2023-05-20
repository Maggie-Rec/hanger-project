import Router from 'koa-router';
import { stripeTransaction } from '../controllers/stripeController';

const stripeRoutes = new Router();

stripeRoutes.post('/create-payment-intent', stripeTransaction);

export default stripeRoutes;
