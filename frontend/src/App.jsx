import { useState } from 'react';
import { Link } from 'react-router-dom'; // Import Link for navigation

function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="flex h-screen justify-center items-center bg-gray-900">
      <div className="p-8 bg-gray-800 rounded-lg shadow-md w-96">
        <h1 className="text-2xl font-bold text-white text-center mb-6">Welcome to Vite + React</h1>
        
        <div className="mb-4">
          <button onClick={() => setCount((count) => count + 1)} className="w-full bg-blue-600 p-2 rounded text-white">
            Count is {count}
          </button>
        </div>

        <p className="text-white mt-4 text-center">
          <Link to="/login" className="text-blue-400 hover:underline">Login</Link> | 
          <Link to="/signup" className="text-blue-400 hover:underline"> Sign Up</Link>
        </p>

        <p className="text-white text-center mt-4">Click on the links to navigate</p>
      </div>
    </div>
  );
}

export default App;
