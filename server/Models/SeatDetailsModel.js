import mongoose from "mongoose";

const seatDetailsSchema = new mongoose.Schema({
  bus_id: { type: mongoose.Schema.Types.ObjectId, ref: "buses", required: true },
  seat_type: { type: String, required: true },
  seat_fare: { type: Number, required: true },
  seat_row: { type: Number, required: true },
  gst_amount: { type: Number },
  service_fee: { type: Number },
  seat_flip: { type: Number },
  Child_fare: { type: Number },
});

const SeatDetailsModel = mongoose.model("seat_details", seatDetailsSchema);

export default SeatDetailsModel;
