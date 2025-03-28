import { useNavigate } from "react-router-dom";
import loginimage from "../assets/loginpage.jpg";

function Login() {
  const navigate = useNavigate();

  return (
    <div className="flex items-center justify-center h-screen w-screen bg-[#26040B] text-white">
      <div className="w-full h-1/2 flex flex-col md:flex-row items-center justify-center bg-[#590505] p-8 rounded-lg shadow-lg">
        {/* Left Side: Image */}
        <div className="hidden md:block w-1/2 h-full relative">
          <img
            src={loginimage}
            alt="Login Illustration"
            className="w-full h-full object-cover rounded-lg"
          />
            {/* Overlay Text */}
          <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center">
            <h1 className="text-white text-3xl font-bold">FitForge</h1>
          </div>
        </div>

        {/* Right Side: Form and Welcome Text */}
        <div className="w-full md:w-1/2 flex flex-col items-center">
          <h1 className="text-4xl font-bold">Welcome</h1>
          <h4 className="text-lg mt-2">Login with email</h4>

          <form className="w-full max-w-sm p-6 rounded-lg shadow-lg mt-4">
            <div className="mb-4">
              <label className="block text-sm font-medium">Email or Username</label>
              <input
                type="text"
                name="email"
                placeholder="Enter your email"
                required
                className="w-full px-3 py-2 mt-1 bg-gray-700 rounded focus:outline-none focus:ring-2 focus:ring-pink-500"
              />
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium">Password</label>
              <input
                type="password"
                name="password"
                placeholder="Enter your password"
                required
                className="w-full px-3 py-2 mt-1 bg-gray-700 rounded focus:outline-none focus:ring-2 focus:ring-pink-500"
              />
            </div>
            <p className="cursor-pointer">Forgot your password?</p>
            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 py-2 rounded-lg font-semibold mt-2 transition duration-300"
            >
              Login
            </button>
          </form>

          <p className="mt-4 text-sm">
            Don't have an account?{" "}
            <span
              className="text-blue-500 cursor-pointer hover:text-blue-700 font-bold"
              onClick={() => navigate("/signup")}
            >
              Sign Up
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;
