import mongoose from "mongoose";

/**
 * 0 = disconnected
 * 1 = connected
 * 2 = connecting
 * 3 = disconnecting
 */

const mongoConnect = {
  isConnect: 0,
};

export async function connect() {
  try {
    mongoose.connect(process.env.MONGO_URL || "");
    const connection = mongoose.connection;

    connection.on("connected", () => {
      console.info("MongoDB connected sucessfully");
    });

    connection.on("error", (err) => {
      console.error("MongoDB connection error", err);
      process.exit();
    });

    if (mongoose.connections.length > 0) {
      mongoConnect.isConnect = mongoose.connections[0].readyState;

      if (mongoConnect.isConnect === 1) {
        console.log("Using last connection");
        return;
      }
    }

    mongoConnect.isConnect = 1;
  } catch (err) {
    console.log("Error to connection with database");
    console.error(err);
  }
}

export const disconnect = async () => {
  if (process.env.NODE_ENV === "development") return;
  if (mongoConnect.isConnect === 0) return;

  await mongoose.disconnect();
  mongoConnect.isConnect = 0;
  console.log("Disconnected from DB");
};
