import mongoose from "mongoose";

const aminitySchema = new mongoose.Schema({
  title: { type: String, required: true },
});

const AminityModel = mongoose.model("aminities", aminitySchema);

export default AminityModel;
