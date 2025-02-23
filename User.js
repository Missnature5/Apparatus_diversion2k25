import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Name is required"],
    trim: true,
  },
  email: {
    type: String,
    required: [true, "Email is required"],
    unique: true,
    trim: true,
    lowercase: true,
    match: [
      /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
      "Please enter a valid email",
    ],
  },
  dateOfBirth: {
    type: Date,
    required: [true, "Date of birth is required"],
  },
  enrollmentNumber: {
    type: String,
    required: [true, "Enrollment number is required"],
    unique: true,
    trim: true,
  },
  department: {
    type: String,
    required: [true, "Department is required"],
    enum: [
      "Computer Science",
      "Electrical",
      "Mechanical",
      "Civil",
      "Electronics",
    ],
  },
  year: {
    type: String,
    required: [true, "Year is required"],
    enum: ["1st Year", "2nd Year", "3rd Year", "4th Year"],
  },
  password: {
    type: String,
    required: [true, "Password is required"],
    minlength: [8, "Password must be at least 8 characters long"],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const User = mongoose.model("User", userSchema);
export default User;
