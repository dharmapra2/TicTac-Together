import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  user_name: { type: String, required: true },
  first_name: { type: String, required: true },
  last_name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  status: { type: String, enum: [1, 2], default: 1 }, // active=1, inactive=2
  role: { type: Number, enum: [1, 2], default: 2 }, // admin=1, bus_owner=2
});

const UserModel = mongoose.model("users", userSchema);

// Export the model for use in other files
export default UserModel;
