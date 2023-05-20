import { mongoose } from '../db';
import { IUserAddress } from '../interfaces/addressInterface';

const userAddress = new mongoose.Schema({
  houseNo: { type: Number, required: true },
  streetName: { type: String, required: true },
  postCode: { type: String, required: true },
  city: { type: String, required: true },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'userData',
    unique: true,
    sparse: true,
  },
});

const UserAddress = mongoose.model<IUserAddress>('address', userAddress);
//name before was updateAddress, changed it to addUserAddress, because the operation below is a 'create' operation, and not a 'find and update' operation for mongoose backend
const getAddressByUserId = async (userId: string) => {
  const data = await UserAddress.find({ user: userId });
  return data;
};
const addUserAddress = async (data: IUserAddress, userId: string) => {
  const newUser = new UserAddress({ ...data, user: userId });
  return newUser.save();
};

const updateAddress = (addressId: string, updatedAddress: IUserAddress) => {
  const options = { new: true };
  //editing user _id
  return UserAddress.findOneAndUpdate(
    { _id: addressId },
    { $set: updatedAddress },
    options
  );
};

const deleteAddress = async (addressId: string) => {
  const result = UserAddress.findOneAndDelete({ _id: addressId });
  return result;
};

export { getAddressByUserId, addUserAddress, updateAddress, deleteAddress };
