import mongoose from "mongoose";

const busLocationSchema = new mongoose.Schema({
  bus_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "buses",
    required: true,
  },
  location_ids: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "locations",
    required: true,
  },
  stopOrder: { type: Number, required: true },
  arrivalTime: { type: Date, required: true },
  departureTime: { type: Date, required: true },
  landMark: { type: String, require: true },
  contact_info: [
    {
      phone_info: { type: String },
    },
  ],
});

const BusLocationModel = mongoose.model("bus_locations", busLocationSchema);

export default BusLocationModel;

/**
 * Forward Trip:
 *    The stopOrder values increase as the bus progresses from the source to the destination.
 *    Arrival and departure times are set for each stop during the forward trip.
 *
 * Return Trip:
 *    The stopOrder values decrease as the bus progresses from the destination back to the source.
 *    Arrival and departure times are set for each stop during the return trip.
 *
 * When querying for bus schedules, you can filter and sort the BusLocation records based on the bus ID and the stopOrder.
 * This allows you to retrieve a sequential list of stops for a particular bus in the correct order, whether it's for the forward or return trip.
 */
