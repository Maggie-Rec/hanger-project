import Router from 'koa-router';
import { Context, DefaultState } from 'koa';
import * as controller from '../controllers/userController';

const router = new Router<DefaultState, Context>();

router.post('/register', controller.registerUser);

router.post('/login', controller.loginUser);

export default router;
