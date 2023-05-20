import { mongoose } from '../db';
import { IItem } from '../interfaces/itemInterface';

const itemData = new mongoose.Schema<IItem>({
  timestamp: { type: Date, default: Date.now },
  title: { type: String, required: true },
  desc: { type: String, required: true },
  category: { type: String, required: true },
  condition: { type: String, required: true },
  price: { type: Number, required: true },
  size: { type: String, required: true },
  img: { type: String, required: true },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'userData',
  },
});

const Item = mongoose.model<IItem>('itemData', itemData);

const getAll = async () => {
  const allItems = await Item.find();
  return allItems;
};

const getItemsByUserId = async (userId: string) => {
  const data = await Item.find({ user: userId });
  return data;
};

//(itemInfo, userId, next) next is declared but never used so I removed it
const addItemToUser = async (itemInfo: IItem, userId: string) => {
  const newItem = new Item({ ...itemInfo, user: userId });
  return await newItem.save();
};

const editItem = (itemId: string, updatedItemData: IItem) => {
  const options = { new: true };
  //editing user _id
  return Item.findOneAndUpdate(
    { _id: itemId },
    { $set: updatedItemData },
    options
  );
};

const deleteItem = (itemId: string) => {
  return Item.findByIdAndDelete(itemId);
};

export {
  getAll,
  getItemsByUserId,
  addItemToUser,
  editItem,
  deleteItem,
};
