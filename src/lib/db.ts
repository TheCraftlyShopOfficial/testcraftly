import mongoose from "mongoose";
import { MONGODB_URI } from "./env";

type connectionObject = {
  isConnectd?: number;
};

const connection: connectionObject = {};

async function dbConnect(): Promise<void> {
  if (connection.isConnectd) {
    console.log("Connection is Running...");
    return;
  }
  try {
    const db = await mongoose.connect(MONGODB_URI as string);
    connection.isConnectd = db.connections[0].readyState;
    console.log("Database Connection Successfully");
  } catch (err) {
    console.log(err, "database connection failed");
    process.exit();
  }
}

export default dbConnect;
