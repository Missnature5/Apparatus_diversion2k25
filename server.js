import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import User from "./User.js";
import cors from "cors";
import bcrypt from "bcryptjs";  // ✅ Allow frontend requests

dotenv.config();

const app = express();
app.use(express.json());
app.use(
    cors({
      origin: "http://localhost:5173",
      methods: ["GET", "POST"],
      credentials: true,
    })
  );  // ✅ Enable CORS

const mongoURI = "mongodb+srv://admin:admin123@cluster0.2ond3.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"; 

mongoose.connect(mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => console.log("✅ MongoDB Connected Successfully"))
.catch((err) => console.error("❌ MongoDB Connection Error:", err));

// ✅ GET Users
app.get("/api/users", async (req, res) => {
    try {
        const users = await User.find({});
        res.json(users);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// ✅ POST - Add New User
app.post("/api/signup", async (req, res) => {
    const { name, email, dateOfBirth, enrollmentNumber, department, year, password } = req.body;


    try {
        // Check if the user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "User already exists with the same email id" });
        }

        // Save new user
        const newUser = new User({ name, email, dateOfBirth, enrollmentNumber, department, year, password });
        newUser.save();
        console.log(newUser)
        res.status(201).json({ message: "User created successfully!" });
    } catch (error) {
        res.status(500).json({ message: "Error creating user", error });
    }
});

app.post("/api/login",async(req,res)=>{
    try{
        const { name, email, dateOfBirth, enrollmentNumber, department, year, password } = req.body;
        const user =  User.findOne({ email });
    if (!user) return res.status(400).json({ message: "Invalid email or password" });

    // ✅ Check password
    const isMatch =  bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: "Invalid email or password" });

    // ✅ Send user data (excluding password)
    res.json({ name: user.name, email: user.email, department: user.department, year: user.year });
  } catch (error) {
    res.status(500).json({ message: "Login error", error });
  }
});


const PORT = 8080;
app.listen(PORT, () => {
    console.log(`🚀 Server is running on port ${PORT}`);
});
