import Router from 'koa-router';
import { Context, DefaultState } from 'koa';
import {
  registerAddress,
  updateAddress,
  getUserAddress,
} from '../controllers/addressController';

import authenticationMiddleware from '../middleware/authenticationMiddleware';

const router = new Router<DefaultState, Context>();

router.get('/user-address/:id', authenticationMiddleware, getUserAddress);

router.post('/add-address', authenticationMiddleware, registerAddress);

router.put('/update-address/:id', authenticationMiddleware, updateAddress);

export default router;
