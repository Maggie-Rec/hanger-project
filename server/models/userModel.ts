import { mongoose } from '../db';
import bcrypt from 'bcrypt';
import { IUser } from '../interfaces/userInterface';

const userData = new mongoose.Schema<IUser>({
  name: { type: String, required: true },
  email: { type: String, required: true },
  userName: { type: String, required: true },
  password: { type: String, required: true },
});

const User = mongoose.model<IUser>('userData', userData);

//could be registration operation
const createUser = async (user: IUser): Promise<IUser> => {
  const hashedPassword = await bcrypt.hash(user.password, 10);
  const newUser = new User({ ...user, password: hashedPassword });
  return newUser.save();
};

const getUserByEmail = async (email: string): Promise<IUser | null> => {
  return User.findOne({ email });
};

//Need to explicitly cast the result of  User.exists({ email }) to a boolean type
/* This ensures that the function always returns a boolean value, regardless of the actual value returned by User.exists.
The Boolean() function converts any truthy value to true and any falsy value (including null and undefined) to false. */
const emailExists = async (email: string) => {
  const result = User.exists({ email });
  return result;
};

const getUserById = async (userId: string) => {
  const result = User.findOne({ _id: userId });
  return result;
};

export { createUser, getUserByEmail, emailExists, getUserById };
