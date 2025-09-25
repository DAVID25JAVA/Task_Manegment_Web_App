import mongoose from "mongoose";

const connectDB = async () => {
  try {
    mongoose.connection.on("connected", () => {
      console.log("database conntected");
    });
    const connection = await mongoose.connect(
      `${process.env.MONGODB_URI}/Task-Manegment`
    );
    // console.log(connection);

} catch (error) {
      console.log("database error : ", error?.message);
    process.exit(1);
  }
};

export default connectDB;
