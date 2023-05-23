import mongoose from 'mongoose';

main().catch((err) => console.log(err));

async function main() {
  try {
    await mongoose.connect('mongodb://127.0.0.1:27017/HangerDB');
    console.log('connected to mongoDB');
  } catch (error) {
    console.error(`Error connecting to MongoDB:`, error);
  }
}

export { mongoose };
