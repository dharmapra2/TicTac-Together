import mongoose from "mongoose";

mongoose.set("debug", true);
mongoose.set("strictQuery", true);

export default async function connectMongodb() {
  console.log(`cred ${process.env.MONGODB_CRIDIENTIA}`);
  await mongoose
    .connect(`${process.env.MONGODB_CRIDIENTIAL}`, {
      autoCreate: true,
      autoIndex: true,
      dbName: "bus-app",
    })
    .then(() => {
      console.log("MongoDb is connected succesfully");
    })
    .catch((err) => console.error("connection error", err));
}
