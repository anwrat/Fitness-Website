//First need to install lucide-react
//npm install lucide-react
import { useState } from "react";
import { Eye, EyeOff } from "lucide-react"; 

function PasswordInput() {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="relative w-full">
      <input
        type={showPassword ? "text" : "password"}
        name="password"
        placeholder="Enter your password"
        required
        className="w-full px-3 py-2 mt-1 bg-[#0F0505] border-2 border-gray-700 rounded focus:outline-none focus:ring-2 focus:ring-[#D90A14] pr-10"
      />
      {/* Eye icon button */}
      <button
        type="button"
        onClick={() => setShowPassword(!showPassword)}
        className="absolute top-1/2 right-3 transform -translate-y-1/2 text-gray-400 hover:text-gray-200"
      >
        {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
      </button>
    </div>
  );
}

export default PasswordInput;
