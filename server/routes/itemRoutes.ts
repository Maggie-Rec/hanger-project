import Router from 'koa-router';
import { Context, DefaultState } from 'koa';
import * as controller from '../controllers/itemsController';
import authenticationMiddleware from '../middleware/authenticationMiddleware';

const router = new Router<DefaultState, Context>();

router.post('/add-item', authenticationMiddleware, controller.addItem);

router.get('/get-items', controller.getAllItems);

router.get(
  '/user-items/:id',
  authenticationMiddleware,
  controller.getUserItems
);

router.put('/update-item/:id', authenticationMiddleware, controller.editItem);

router.delete(
  '/delete-item/:id',
  authenticationMiddleware,
  controller.deleteItem
);

export default router;
