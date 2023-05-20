import * as model from '../models/itemsModel';
//ParameterizedContext is needed to access params property of a Koa ctx object in TypeScript
import { Context, Next, ParameterizedContext } from 'koa';
import { IItem } from '../interfaces/itemInterface';
import cloudinary from '../cloudinary';

const addItem = async (ctx: Context, next: Next): Promise<void> => {
  try {
    // console.log('ITEMINFO:', ctx.request.body);
    // console.log('userId:', ctx.state.user._id);
    const requestBody = ctx.request.body as IItem;
    //upload image to cloudinary
    //const uploadedResponse = await cloudinary.uploader.upload(requestBody.img);
    //set returned cloudinary url to overwrite the base64 image string
    //requestBody.img = uploadedResponse.secure_url;
    const result = await model.addItemToUser(
      requestBody,
      ctx.state.user._id
    );
    // console.log('result:', result);
    ctx.status = 201;
    ctx.body = result;
    await next();
  } catch (error) {
    throw error;
  }
};

const editItem = async (ctx: ParameterizedContext, next: Next): Promise<void> => {
  try {
    // console.log(ctx.request.body);
    const updatedItem = ctx.request.body as IItem;
    const { id: itemId } = ctx.params;
    const result = await model.editItem(itemId, updatedItem);
    ctx.status = 200;
    ctx.body = result;
    await next();
  } catch (error) {
    throw error;
  }
};
const deleteItem = async (ctx: ParameterizedContext, next: Next) => {
  try {
    const result = await model.deleteItem(ctx.params.id);
    ctx.status = 201;
    ctx.body = result;
    await next();
  } catch (error) {
    throw error;
  }
};
const getAllItems = async (ctx: Context, next: Next) => {
  try {
    const result = await model.getAll();
    ctx.status = 200;
    ctx.body = result;
    await next();
  } catch (error) {
    throw error;
  }
};

const getUserItems = async (ctx: ParameterizedContext, next: Next) => {
  try {
    // console.log(ctx.request.params);
    //const requestParams = ctx.request.params as { id: string };
    const result = await model.getItemsByUserId(ctx.params.id);
    ctx.status = 200;
    ctx.body = result;
    await next();
  } catch (error) {
    throw error;
  }
};

export { addItem, editItem, deleteItem, getAllItems, getUserItems };
