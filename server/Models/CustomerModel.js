import mongoose from "mongoose";

const customerSchema = new mongoose.Schema({
  user_name: { type: String, required: true, unique: true },
  display_name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  profileImageURL: { type: String },
  status: { type: String, enum: [1, 2], default: 1 }, // active=1, inactive=2
  salt: {
    type: String,
    required: true,
  },
});

const CustomerModel = mongoose.model("customers", customerSchema);

export default CustomerModel;
