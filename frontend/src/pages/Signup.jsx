import { useState } from "react";
import { Link } from "react-router-dom";

const Signup = () => {
  const [formData, setFormData] = useState({ username: "", email: "", password: "" });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Signup Data:", formData);
  };

  return (
    <div className="flex h-screen justify-center items-center bg-gray-900">
      <div className="p-8 bg-gray-800 rounded-lg shadow-md w-96">
        <h2 className="text-2xl font-bold text-white text-center mb-6">Sign Up</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-white">Username</label>
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              className="w-full p-2 rounded bg-gray-700 text-white focus:outline-none"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-white">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full p-2 rounded bg-gray-700 text-white focus:outline-none"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-white">Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full p-2 rounded bg-gray-700 text-white focus:outline-none"
              required
            />
          </div>
          <button type="submit" className="w-full bg-blue-600 p-2 rounded text-white">
            Sign Up
          </button>
        </form>
        <p className="text-white mt-4 text-center">
          Already have an account?{" "}
          <Link to="/login" className="text-blue-400 hover:underline">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;
