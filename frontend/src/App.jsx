import { useState } from "react";
import loginimage from "./assets/loginpage.jpg";
import { useNavigate } from "react-router-dom";

function App() {
  const [count, setCount] = useState(0);

  const navigate = useNavigate();

  return (
    <div className="max-w-5xl mx-auto p-8 text-center">
      <div>
        <img
          src={loginimage}
          className="h-24 p-6 transition duration-300 hover:drop-shadow-[0_0_8px_#646cffaa]"
          alt="Fitness App Home"
        />
      </div>
      <h1 className="text-3xl font-bold text-black">Fitness App Test Page</h1>
      <div className="p-8">
        <div className="flex flex-col gap-4 items-center">
          <button
            onClick={() => setCount((count) => count + 1)}
            className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition"
          >
            Count is {count}
          </button>
          <button
            onClick={() => navigate("/login")}
            className="bg-green-500 text-white px-6 py-2 rounded-lg hover:bg-green-600 transition"
          >
            Login
          </button>
          <button
            onClick={() => navigate("/signup")}
            className="bg-pink-500 text-white px-6 py-2 rounded-lg hover:bg-pink-600 transition"
          >
            SignUp
          </button>
        </div>
      </div>
      <p className="text-gray-500 mt-4">Just a simple testing page</p>
    </div>
  );
}

export default App;
