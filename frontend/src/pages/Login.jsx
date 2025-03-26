import { useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-[#26040B] text-white">
      <h1 className="text-4xl font-bold">Welcome</h1>
      <h4 className="text-lg mt-2">Login with email</h4>

      <form className="w-80 bg-gray-800 p-6 rounded-lg shadow-lg mt-4">
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

        <button
          type="submit"
          className="w-full bg-pink-600 hover:bg-pink-700 py-2 rounded-lg font-semibold mt-2 transition duration-300"
        >
          Login
        </button>
      </form>

      <p className="mt-4 text-sm">
        Don't have an account?{" "}
        <span
          className="text-pink-400 cursor-pointer hover:text-pink-500"
          onClick={() => navigate("/signup")}
        >
          Sign Up
        </span>
      </p>
    </div>
  );
}

export default Login;
