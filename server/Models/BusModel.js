import mongoose from "mongoose";

const busSchema = new mongoose.Schema({
  name: { type: String, required: true },
  bus_number: { type: String, required: true, unique: true },
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
    required: true,
  },
  capacity: { type: Number, required: true },
  amenities: [
    {
      amities_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "aminities",
        required: true,
      },
    },
  ],
  faresList: [Number],
  source_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "locations",
    required: true,
  },
  destination_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "locations",
    required: true,
  },
  Child_fare: { type: Number },
  lowerTotalRows: { type: Number },
  upperTotalRows: { type: Number },
  isAcSeat: { type: Boolean },
  travelerAgentName: { type: String, required: true },
  busTypeName: { type: String, required: true },
  cancellationsPolicy: [
    {
      cc: { type: String },
      rp: { type: String },
      tl: { type: String },
      con: { type: String },
    },
  ],
  insuranceTypes: [
    {
      insuranceID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "locations",
        required: true,
      },
    },
  ],
});

const BusModel = mongoose.model("buses", busSchema);

export default BusModel;
