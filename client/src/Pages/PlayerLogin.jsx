import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import assets from "../assets/assets";
import Navbar from "../Components/Navbar";
import { useContext } from "react";
import { useCurrentUser } from "../Context/CurrentUserContext";

const PlayerLogin = () => {
  const [isLogin, setIsLogin] = useState(true);

  // Common fields
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
const {setCurrentUser} = useCurrentUser()
  // Signup-only fields
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [pincode, setPincode] = useState("");
  const [local, setLocal] = useState("");
  const [sportsInput, setSportsInput] = useState("");
  const [image, setImage] = useState(null);
  const [state, setState] = useState("");
  const [district, setDistrict] = useState("");
  const [gender, setGender] = useState('')
  const [message, setMessage] = useState("");

  const navigate = useNavigate();

  // Fetch state & district from backend on pincode blur
  const handlePincodeBlur = async () => {
    if (pincode.length === 6) {
      try {
        const res = await axios.get(`http://localhost:5000/api/pincode/${pincode}`);
        const data = res.data[0];
        if (data.Status === "Success") {
          setState(data.PostOffice[0].State);
          setDistrict(data.PostOffice[0].District);
        }
      } catch (error) {
        setMessage("Error fetching location data, invalid pincode");
      }
    }
  };

  // Login handler
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:5000/api/player/login", { email, password });

      // Redirect to OTP if not verified
      if (res.data.redirect === 'otp' && res.data.playerId) {
        navigate("/otp-player", { state: { playerId: res.data.playerId } });
        return;
      }

      alert(res.data.message || "Login successful");
      setCurrentUser(res.data.player)

      setEmail("");
      setPassword("");
        setTimeout(() => navigate("/playerDashboard"), 1500);
    } catch (error) {
      alert(error.response?.data?.message || "Login failed");
    }
  };

  // Signup handler
  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("email", email);
      formData.append("phone", phone);
      formData.append("pincode", pincode);
      formData.append("local", local);
      formData.append("password", password);
      formData.append("gender", gender);
      formData.append("sports", sportsInput); // comma-separated string
      if (image) formData.append("image", image);

      const res = await axios.post("http://localhost:5000/api/player/signup", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      alert(res.data.message);
      navigate("/otp-player", { state: { playerId: res.data.id } });
    } catch (error) {
      alert(error.response?.data?.message || "Signup failed");
    }
  };

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Background Image with Overlay - Made more visible */}
      <div 
        className="fixed inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url(${assets.s2})`,
          filter: 'brightness(0.6) contrast(1.2)'
        }}
      />
      
      {/* Floating Decorative Elements */}
      <div className="fixed top-10 left-10 w-32 h-32 bg-gradient-to-r from-pink-500/30 to-purple-600/30 rounded-full blur-3xl animate-pulse"></div>
      <div className="fixed bottom-20 right-10 w-40 h-40 bg-gradient-to-r from-fuchsia-500/20 to-pink-600/20 rounded-full blur-3xl animate-bounce"></div>
      <div className="fixed top-1/3 left-1/2 w-24 h-24 bg-gradient-to-r from-purple-500/25 to-fuchsia-600/25 rounded-full blur-2xl animate-ping"></div>
      <div className="fixed bottom-1/3 left-10 w-20 h-20 bg-gradient-to-r from-pink-400/30 to-purple-500/30 rounded-full blur-xl animate-bounce"></div>
      <div className="fixed top-20 right-1/4 w-28 h-28 bg-gradient-to-r from-fuchsia-400/20 to-pink-500/20 rounded-full blur-2xl animate-pulse"></div>

      {/* Custom Navbar */}
      <Navbar 
        logo={assets.clogo} 
        buttonName={'Home'} 
        title={isLogin ? "Player Login" : "Player Signup"} 
        onButtonClick={() => navigate('/')} 
      />
      <div className="relative z-10 px-4 pb-8 mt-24"></div>

      {/* Main Content Container - Positioned below navbar */}
      <div className="relative z-10 px-4 pt-24 pb-8">
        <div className="max-w-2xl mx-auto">
          {/* Error/Success Message */}
          {message && (
            <div className={`mb-8 p-4 backdrop-blur-2xl border rounded-2xl text-center animate-pulse shadow-2xl transition-all duration-500 ${
              message.includes('successful') || message.includes('Redirecting') || message.includes('fetched')
                ? 'bg-green-500/20 border-green-400/30 text-green-200' 
                : 'bg-red-500/20 border-red-400/30 text-red-200'
            }`}>
              <p className="font-medium text-lg">{message}</p>
            </div>
          )}

          {/* Main Glass Card */}
          <div className="backdrop-blur-2xl bg-white/10 p-10 rounded-3xl shadow-2xl border border-white/20 hover:bg-white/15 transition-all duration-700 transform hover:scale-[1.02] hover:shadow-pink-500/25">
            
            {/* Header Section */}
            <div className="text-center mb-10">
              <h1 className="text-5xl font-bold bg-gradient-to-r from-pink-400 via-fuchsia-400 to-purple-400 bg-clip-text text-transparent mb-4">
                {isLogin ? "Welcome Back" : "Join the Champions"}
              </h1>
              <p className="text-pink-200/90 text-xl font-light">
                {isLogin ? "Access your player portal" : "Create your athlete profile"}
              </p>
              <div className="mt-4 w-24 h-1 bg-gradient-to-r from-pink-500 to-purple-500 mx-auto rounded-full"></div>
            </div>

            {/* Toggle Button */}
            <div className="flex justify-center mb-10">
              <button
                onClick={() => setIsLogin(!isLogin)}
                className="group px-12 py-4 bg-gradient-to-r from-pink-600 via-fuchsia-600 to-purple-600 hover:from-pink-500 hover:via-fuchsia-500 hover:to-purple-500 rounded-full text-white font-bold text-lg transition-all duration-500 transform hover:scale-110 hover:shadow-2xl shadow-pink-500/50 active:scale-95 relative overflow-hidden"
              >
                <span className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                <span className="relative z-10 flex items-center space-x-2">
                  <span>{isLogin ? "Switch to Signup" : "Switch to Login"}</span>
                  <svg className="w-5 h-5 transform group-hover:rotate-180 transition-transform duration-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
                  </svg>
                </span>
              </button>
            </div>

            {isLogin ? (
              // Login Form
              <div className="space-y-8">
                <div onSubmit={handleLogin} className="space-y-6">
                  <div className="relative group">
                    <label className="block text-pink-200 text-sm font-medium mb-2 bg-gradient-to-r from-pink-300 to-purple-300 bg-clip-text text-transparent">
                      Email Address
                    </label>
                    <input
                      type="email"
                      placeholder="Enter your email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full px-6 py-4 bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl text-white placeholder-pink-200/70 focus:outline-none focus:border-pink-400/60 focus:bg-white/15 focus:shadow-lg focus:shadow-pink-500/25 transition-all duration-300 hover:bg-white/12 group-hover:border-pink-300/40 text-lg"
                    />
                    <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-pink-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10 blur-xl"></div>
                  </div>

                  <div className="relative group">
                    <label className="block text-pink-200 text-sm font-medium mb-2 bg-gradient-to-r from-pink-300 to-purple-300 bg-clip-text text-transparent">
                      Password
                    </label>
                    <input
                      type="password"
                      placeholder="Enter your password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full px-6 py-4 bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl text-white placeholder-pink-200/70 focus:outline-none focus:border-pink-400/60 focus:bg-white/15 focus:shadow-lg focus:shadow-pink-500/25 transition-all duration-300 hover:bg-white/12 group-hover:border-pink-300/40 text-lg"
                    />
                    <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-pink-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10 blur-xl"></div>
                  </div>

                  <button
                    type="submit"
                    onClick={handleLogin}
                    className="group w-full py-5 bg-gradient-to-r from-fuchsia-600 via-pink-600 to-purple-600 hover:from-fuchsia-500 hover:via-pink-500 hover:to-purple-500 rounded-2xl text-white font-bold text-xl transition-all duration-500 transform hover:scale-105 hover:shadow-2xl shadow-fuchsia-500/50 active:scale-95 relative overflow-hidden"
                  >
                    <span className="absolute inset-0 bg-gradient-to-r from-white/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                    <span className="relative z-10 flex items-center justify-center space-x-2">
                      <span>Sign Into Portal</span>
                      <svg className="w-6 h-6 transform group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                      </svg>
                    </span>
                  </button>
                </div>
              </div>
            ) : (
              // Signup Form
              <div className="space-y-6">
                <div onSubmit={handleSignup}>
                  <div className="max-h-[600px] overflow-y-auto pr-4 space-y-5">
                    
                    {/* Row 1: Name & Email */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="relative group">
                        <label className="block text-pink-200 text-sm font-medium mb-2 bg-gradient-to-r from-pink-300 to-purple-300 bg-clip-text text-transparent">
                          Full Name *
                        </label>
                        <input
                          type="text"
                          placeholder="Enter your full name"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          className="w-full px-4 py-3 bg-white/10 backdrop-blur-xl border border-white/20 rounded-xl text-white placeholder-pink-200/70 focus:outline-none focus:border-pink-400/60 focus:bg-white/15 focus:shadow-lg focus:shadow-pink-500/25 transition-all duration-300 hover:bg-white/12 text-sm"
                        />
                        <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-pink-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10 blur-lg"></div>
                      </div>

                      <div className="relative group">
                        <label className="block text-pink-200 text-sm font-medium mb-2 bg-gradient-to-r from-pink-300 to-purple-300 bg-clip-text text-transparent">
                          Email Address *
                        </label>
                        <input
                          type="email"
                          placeholder="Enter email address"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          className="w-full px-4 py-3 bg-white/10 backdrop-blur-xl border border-white/20 rounded-xl text-white placeholder-pink-200/70 focus:outline-none focus:border-pink-400/60 focus:bg-white/15 focus:shadow-lg focus:shadow-pink-500/25 transition-all duration-300 hover:bg-white/12 text-sm"
                        />
                        <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-pink-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10 blur-lg"></div>
                      </div>
                    </div>

                    {/* Row 2: Phone & Gender */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="relative group">
                        <label className="block text-pink-200 text-sm font-medium mb-2 bg-gradient-to-r from-pink-300 to-purple-300 bg-clip-text text-transparent">
                          Phone Number *
                        </label>
                        <input
                          type="text"
                          placeholder="Enter phone number"
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                          className="w-full px-4 py-3 bg-white/10 backdrop-blur-xl border border-white/20 rounded-xl text-white placeholder-pink-200/70 focus:outline-none focus:border-pink-400/60 focus:bg-white/15 focus:shadow-lg focus:shadow-pink-500/25 transition-all duration-300 hover:bg-white/12 text-sm"
                        />
                        <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-pink-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10 blur-lg"></div>
                      </div>

                      <div className="relative group">
                        <label className="block text-pink-200 text-sm font-medium mb-2 bg-gradient-to-r from-pink-300 to-purple-300 bg-clip-text text-transparent">
                          Gender *
                        </label>
                        <select 
                          name="gender" 
                          value={gender} 
                          onChange={(e) => setGender(e.target.value)}
                          className="w-full px-4 py-3 bg-white/10 backdrop-blur-xl border border-white/20 rounded-xl text-white focus:outline-none focus:border-pink-400/60 focus:bg-white/15 focus:shadow-lg focus:shadow-pink-500/25 transition-all duration-300 hover:bg-white/12 text-sm cursor-pointer"
                          style={{ colorScheme: 'dark' }}
                        >
                          <option value="" className="bg-purple-900 text-white">---Select Gender---</option>
                          <option value="Female" className="bg-purple-900 text-white">Female</option>
                          <option value="Male" className="bg-purple-900 text-white">Male</option>
                          <option value="Other" className="bg-purple-900 text-white">Other</option>
                        </select>
                        <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-pink-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10 blur-lg"></div>
                      </div>
                    </div>

                    {/* Sports */}
                    <div className="relative group">
                      <label className="block text-pink-200 text-sm font-medium mb-2 bg-gradient-to-r from-pink-300 to-purple-300 bg-clip-text text-transparent">
                        Sports (comma separated)
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. Cricket, Football"
                        value={sportsInput}
                        onChange={(e) => setSportsInput(e.target.value)}
                        className="w-full px-4 py-3 bg-white/10 backdrop-blur-xl border border-white/20 rounded-xl text-white placeholder-pink-200/70 focus:outline-none focus:border-pink-400/60 focus:bg-white/15 focus:shadow-lg focus:shadow-pink-500/25 transition-all duration-300 hover:bg-white/12 text-sm"
                      />
                      <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-pink-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10 blur-lg"></div>
                    </div>

                    {/* Pincode */}
                    <div className="relative group">
                      <label className="block text-pink-200 text-sm font-medium mb-2 bg-gradient-to-r from-pink-300 to-purple-300 bg-clip-text text-transparent">
                        Pincode
                      </label>
                      <input
                        type="text"
                        placeholder="Enter 6-digit pincode"
                        value={pincode}
                        onChange={(e) => setPincode(e.target.value)}
                        onBlur={handlePincodeBlur}
                        className="w-full px-4 py-3 bg-white/10 backdrop-blur-xl border border-white/20 rounded-xl text-white placeholder-pink-200/70 focus:outline-none focus:border-pink-400/60 focus:bg-white/15 focus:shadow-lg focus:shadow-pink-500/25 transition-all duration-300 hover:bg-white/12 text-sm"
                      />
                      <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-pink-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10 blur-lg"></div>
                    </div>

                    {/* State & District */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="relative">
                        <label className="block text-pink-200 text-sm font-medium mb-2 bg-gradient-to-r from-pink-300 to-purple-300 bg-clip-text text-transparent">
                          State (Auto-filled)
                        </label>
                        <input 
                          type="text" 
                          placeholder="State" 
                          value={state} 
                          readOnly 
                          className="w-full px-4 py-3 bg-white/5 backdrop-blur-xl border border-white/10 rounded-xl text-pink-200/80 placeholder-pink-200/50 cursor-not-allowed text-sm"
                        />
                      </div>
                      <div className="relative">
                        <label className="block text-pink-200 text-sm font-medium mb-2 bg-gradient-to-r from-pink-300 to-purple-300 bg-clip-text text-transparent">
                          District (Auto-filled)
                        </label>
                        <input 
                          type="text" 
                          placeholder="District" 
                          value={district} 
                          readOnly 
                          className="w-full px-4 py-3 bg-white/5 backdrop-blur-xl border border-white/10 rounded-xl text-pink-200/80 placeholder-pink-200/50 cursor-not-allowed text-sm"
                        />
                      </div>
                    </div>

                    {/* Local Area & Password */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="relative group">
                        <label className="block text-pink-200 text-sm font-medium mb-2 bg-gradient-to-r from-pink-300 to-purple-300 bg-clip-text text-transparent">
                          Local Area
                        </label>
                        <input
                          type="text"
                          placeholder="Enter local area/locality"
                          value={local}
                          onChange={(e) => setLocal(e.target.value)}
                          className="w-full px-4 py-3 bg-white/10 backdrop-blur-xl border border-white/20 rounded-xl text-white placeholder-pink-200/70 focus:outline-none focus:border-pink-400/60 focus:bg-white/15 focus:shadow-lg focus:shadow-pink-500/25 transition-all duration-300 hover:bg-white/12 text-sm"
                        />
                        <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-pink-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10 blur-lg"></div>
                      </div>

                      <div className="relative group">
                        <label className="block text-pink-200 text-sm font-medium mb-2 bg-gradient-to-r from-pink-300 to-purple-300 bg-clip-text text-transparent">
                          Password *
                        </label>
                        <input
                          type="password"
                          placeholder="Create strong password"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          className="w-full px-4 py-3 bg-white/10 backdrop-blur-xl border border-white/20 rounded-xl text-white placeholder-pink-200/70 focus:outline-none focus:border-pink-400/60 focus:bg-white/15 focus:shadow-lg focus:shadow-pink-500/25 transition-all duration-300 hover:bg-white/12 text-sm"
                        />
                        <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-pink-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10 blur-lg"></div>
                      </div>
                    </div>

                    {/* Profile Image Upload */}
                    <div className="bg-white/5 p-6 rounded-2xl border border-white/10">
                      <h3 className="text-lg font-semibold text-pink-200 mb-4 bg-gradient-to-r from-pink-300 to-purple-300 bg-clip-text text-transparent">
                        Profile Image
                      </h3>
                      <div className="relative group">
                        <label className="block text-pink-200 text-sm font-medium mb-1">Upload Profile Picture</label>
                        <input 
                          type="file" 
                          onChange={(e) => setImage(e.target.files[0])} 
                          className="w-full px-4 py-3 bg-white/10 backdrop-blur-xl border border-white/20 rounded-xl text-white file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:bg-gradient-to-r file:from-pink-600 file:to-purple-600 file:text-white hover:file:from-pink-500 hover:file:to-purple-500 file:cursor-pointer cursor-pointer text-sm transition-all duration-300"
                        />
                      </div>
                    </div>
                  </div>

                  <button
                    type="submit"
                    onClick={handleSignup}
                    className="group w-full py-5 bg-gradient-to-r from-fuchsia-600 via-pink-600 to-purple-600 hover:from-fuchsia-500 hover:via-pink-500 hover:to-purple-500 rounded-2xl text-white font-bold text-xl transition-all duration-500 transform hover:scale-105 hover:shadow-2xl shadow-fuchsia-500/50 active:scale-95 relative overflow-hidden mt-6"
                  >
                    <span className="absolute inset-0 bg-gradient-to-r from-white/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                    <span className="relative z-10 flex items-center justify-center space-x-2">
                      <span>Create Player Account</span>
                      <svg className="w-6 h-6 transform group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                      </svg>
                    </span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlayerLogin;