import { useState } from "react";
import { Eye, EyeOff, Mail, Lock } from "lucide-react";
import { Link,useNavigate } from 'react-router-dom';
import axios from "axios";


const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async(e) => {
    e.preventDefault();
    // Handle login logic here
    try {
      const response =  axios.post("http://localhost:8080/api/login", { email, password });
      localStorage.setItem("user", JSON.stringify(response.data)); // ✅ Store user data
      //alert("Login Successful!");
      navigate("/dashboard")
       // ✅ Redirect to Dashboard
    } catch (error) {
      alert(error.response?.data?.message || "Login failed");
    }
  };


  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-700 to-white flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Card container with glass effect */}
        <div className="bg-white bg-opacity-20 backdrop-blur-lg rounded-3xl p-8 shadow-2xl border border-white border-opacity-20 transform hover:scale-[1.02] transition-transform duration-300">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-gray-900 mb-2">Welcome Back</h1>
            <p className="text-gray-700">Sign in to continue your journey</p>
          </div>

          {/* Login Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Email Input */}
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-900" size={20} />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email address"
                className="w-full bg-gray-200 text-gray-900 placeholder-gray-600 border border-gray-400 rounded-lg py-3 pl-12 pr-4 focus:outline-none focus:ring-2 focus:ring-gray-700 transition-all duration-200"
                required
              />
            </div>

            {/* Password Input */}
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-900" size={20} />
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                className="w-full bg-gray-200 text-gray-900 placeholder-gray-600 border border-gray-400 rounded-lg py-3 pl-12 pr-12 focus:outline-none focus:ring-2 focus:ring-gray-700 transition-all duration-200"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-900 opacity-70 hover:opacity-100 transition-opacity duration-200"
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>

            {/* Remember Me & Forgot Password */}
            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center text-gray-900 cursor-pointer">
                <input
                  type="checkbox"
                  className="rounded bg-gray-300 border-none checked:bg-black mr-2"
                />
                Remember me
              </label>
              <a href="#" className="text-gray-900 hover:text-gray-700 transition-colors duration-200">
                Forgot password?
              </a>
            </div>

            {/* Sign In Button */}
            <button
              type="submit"
              className="w-full bg-gray-900 text-white font-semibold rounded-lg py-3 px-4 hover:bg-gray-800 transform hover:scale-[1.02] transition-all duration-200"
            >
              Sign in
            </button>

            {/* Sign Up Link */}
            <p className="text-center text-gray-900">
              Don't have an account?{" "}
              <a href="#" className="text-gray-700 font-semibold hover:text-black transition-colors duration-200">
                <Link to = '/'>Sign Up </Link>
              </a>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};


export default Login;
