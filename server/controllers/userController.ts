import bcrypt from 'bcrypt';
import { sign } from 'jsonwebtoken';
import * as model from '../models/userModel';
import { Context, Next } from 'koa';
import { IUser } from '../interfaces/userInterface';

const SECRET_KEY = process.env.SECRET_KEY || 'dawgy this aint safe at aawwwll';

const loginUser = async (ctx: Context, next: Next): Promise<void> => {
  try {
    const requestBody = ctx.request.body as IUser;
    const user = await model.getUserByEmail(requestBody.email);

    if (user && (await bcrypt.compare(requestBody.password, user.password))) {
      const token = sign({ _id: user._id }, SECRET_KEY, {
        expiresIn: '24h',
      });
      ctx.status = 200;
      ctx.body = {
        success: true,
        token,
        user: {
          _id: user._id,
          name: user.name,
          email: user.email,
        },
      };
    } else {
      ctx.status = 400;
      ctx.body = {
        success: false,
        error: 'Login failed',
      };
      await next();
    }
  } catch (error) {
    throw error;
  }
};

const registerUser = async (ctx: Context, next: Next): Promise<void> => {
  try {
    const requestBody = ctx.request.body as IUser;
    const existingEmail = await model.emailExists(requestBody.email);

    if (existingEmail) {
      ctx.status = 400;
      ctx.body = { message: 'Email already in use' };
    } else {
      const createNewUser = await model.createUser(requestBody);
      ctx.status = 201;
      ctx.body = createNewUser;
      await next();
    }
  } catch (error) {
    throw error;
  }
};

export { loginUser, registerUser };
