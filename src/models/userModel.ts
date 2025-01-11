import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "username is required"],
  },
  email: {
    type: String,
    required: [true, "email address is required"],
  },
  phone: {
    type: Number,
    required: [true, "mobile Number is Required"],
    unique: true,
  },
  password: {
    type: String,
    required: [true, "password is Required"],
  },
  isAdmin: {
    type: Boolean,
    default: false,
  },
  cart: {
    type: Array,
    default: [],
  },
  orders: {
    type: Array,
    default: [],
  },
  notifications: {
    type: Array,
    default: [],
  },
  createdAt: { type: Date, default: Date.now },
});

const userModel = mongoose.models.user || mongoose.model("user", userSchema);

export default userModel;
