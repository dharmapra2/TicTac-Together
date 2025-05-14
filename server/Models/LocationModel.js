import mongoose from "mongoose";

const locationSchema = new mongoose.Schema({
  placeTime: { type: String, required: true },
  city_is: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "cities",
    required: true,
  },
  address: { type: String, required: true },
  pincode: { type: Number, required: true },
  landMark: { type: String, required: true },
  latlong: { type: String, required: true },
});

const LocationModel = mongoose.model("locations", locationSchema);

export default LocationModel;
