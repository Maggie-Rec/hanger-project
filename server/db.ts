import mongoose from "mongoose";

main().catch((err) => console.log(err));

async function main() {
  try {
    await mongoose.connect(
      "mongodb+srv://test_user:N3MZjiiY1ZcKLFxc@cluster0.9xe7zsw.mongodb.net/?retryWrites=true&w=majority"
    );
    console.log("connected to mongoDB");
  } catch (error) {
    console.error(`Error connecting to MongoDB:`, error);
  }
}

export { mongoose };
