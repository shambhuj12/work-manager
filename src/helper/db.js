import mongoose from "mongoose";
export const connectDB = async () => {
  try {
    const { connection } = await mongoose.connect(process.env.MONOG_DB_URL, {
      dbName: "work_manager",
    });

    console.log("db connected");
  } catch (error) {
    console.log("Error in connecting db");
    console.log(error);
  }
};
