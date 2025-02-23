import  { useState } from "react";
import { User, Mail, Calendar, GraduationCap, BookOpen, Lock, Eye, EyeOff } from "lucide-react";
import { Link,useNavigate } from 'react-router-dom'
import axios from "axios";
import { toast } from 'react-toastify'

//import {useRouter} from 'next/navigation'
const Signup = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    dateOfBirth: "",
    enrollmentNumber: "",
    department: "",
    year: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  //const route = useRouter();
  const navigate = useNavigate();
  const departments = ["Computer Science", "Electrical", "Mechanical", "Civil", "Electronics"];
  const years = ["1st Year", "2nd Year", "3rd Year", "4th Year"];

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:8080/api/signup", formData);
      console.log(response)
      //alert(response.data.message);
      toast.success('🎉 Signup successful!', {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        onClose: () => navigate("/login")
      });
  // ✅ Redirect to Login after signup
    } catch (error) {
      console.log(error.response.data.message)
      toast.error(`❌ ${error.response?.data?.message || 'Error signing up'}`, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      //alert(error.response?.data?.message || "Error signing up");
    }
  };
    
    //console.log(e.target.value);
    //route.push('/Dashboard')
  

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-gray-800 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="bg-gray-900 bg-opacity-80 backdrop-blur-lg rounded-3xl p-8 shadow-xl border border-gray-700 transform hover:scale-[1.02] transition-transform duration-300">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-white mb-2">Student Signup</h1>
            <p className="text-gray-400">Create your student account</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Name Input */}
            <div className="relative">
              <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Full Name"
                className="w-full bg-gray-800 text-white placeholder-gray-500 border border-gray-700 rounded-lg py-3 pl-12 pr-4 focus:outline-none focus:ring-2 focus:ring-gray-500 transition-all duration-200"
                required
              />
            </div>

            {/* Email Input */}
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="College Email"
                className="w-full bg-gray-800 text-white placeholder-gray-500 border border-gray-700 rounded-lg py-3 pl-12 pr-4 focus:outline-none focus:ring-2 focus:ring-gray-500 transition-all duration-200"
                required
              />
            </div>

            {/* Date of Birth */}
            <div className="relative">
              <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="date"
                name="dateOfBirth"
                value={formData.dateOfBirth}
                onChange={handleChange}
                className="w-full bg-gray-800 text-white border border-gray-700 rounded-lg py-3 pl-12 pr-4 focus:outline-none focus:ring-2 focus:ring-gray-500 transition-all duration-200"
                required
              />
            </div>

            {/* Enrollment Number */}
            <div className="relative">
              <GraduationCap className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                name="enrollmentNumber"
                value={formData.enrollmentNumber}
                onChange={handleChange}
                placeholder="Enrollment Number"
                className="w-full bg-gray-800 text-white placeholder-gray-500 border border-gray-700 rounded-lg py-3 pl-12 pr-4 focus:outline-none focus:ring-2 focus:ring-gray-500 transition-all duration-200"
                required
              />
            </div>

            {/* Department Selection */}
            <div className="relative">
              <BookOpen className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <select
                name="department"
                value={formData.department}
                onChange={handleChange}
                className="w-full bg-gray-800 text-white border border-gray-700 rounded-lg py-3 pl-12 pr-4 focus:outline-none focus:ring-2 focus:ring-gray-500 transition-all duration-200"
                required
              >
                <option value="">Select Department</option>
                {departments.map((dept) => (
                  <option key={dept} value={dept}>
                    {dept}
                  </option>
                ))}
              </select>
            </div>

            {/* Year Selection */}
            <div className="relative">
              <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <select
                name="year"
                value={formData.year}
                onChange={handleChange}
                className="w-full bg-gray-800 text-white border border-gray-700 rounded-lg py-3 pl-12 pr-4 focus:outline-none focus:ring-2 focus:ring-gray-500 transition-all duration-200"
                required
              >
                <option value="">Select Year</option>
                {years.map((year) => (
                  <option key={year} value={year}>
                    {year}
                  </option>
                ))}
              </select>
            </div>

            {/* Password Input */}
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Password"
                className="w-full bg-gray-800 text-white placeholder-gray-500 border border-gray-700 rounded-lg py-3 pl-12 pr-12 focus:outline-none focus:ring-2 focus:ring-gray-500 transition-all duration-200"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white transition-opacity duration-200"
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>

            {/* Sign Up Button */}
            <button
              type="submit"
              className="w-full bg-white text-gray-900 font-semibold rounded-lg py-3 px-4 hover:bg-gray-200 transform hover:scale-[1.02] transition-all duration-200"
            >
              Create Account
            </button>

            {/* Login Link */}
            <p className="text-center text-gray-400">
              Already have an account?{" "}
              <a href="#" className="text-white font-semibold hover:text-gray-200 transition-colors duration-200">
                <Link to = '/login'>Login</Link>
                <br/>
                <Link to = '/'>Home</Link>
              </a>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Signup;
