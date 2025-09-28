import mongoose from "mongoose";

const dbConnection = async () => {
  const connection = await mongoose.connect(process.env.MONGO_URL);
  console.log("Mongo Connected", `${connection?.connection?.host}`);
};

export default dbConnection;
