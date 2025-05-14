import mongoose from "mongoose";

const citySchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  state_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "state",
    required: true,
  },
  address: { type: String, required: true },
});

const citiesModel = mongoose.model("cities", citySchema);

export default citiesModel;
