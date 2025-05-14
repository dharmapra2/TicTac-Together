import mongoose from "mongoose";

const stateSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  country_code: { type: String, required: true },
  country_name: { type: String, required: true },
  state_code: { type: String, required: true },
  type: { type: String },
  latitude: { type: String },
  longitude: { type: String },
});

const StateModel = mongoose.model("state", stateSchema);

export default StateModel;
