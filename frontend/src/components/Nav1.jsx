import { useNavigate } from "react-router-dom";

function Nav1(){
    const navigate = useNavigate();

    return(
        <nav className="w-full flex items-center justify-between bg-[#0F0505] p-4">
        {/* Left Side - Logo or Branding */}
        <div className="text-white text-base font-bold">
            <p>FitForge</p>
            <p>Transform your body</p>
        </div>
        {/* Middle - Navigation Links */}
        <div className="hidden md:flex gap-6 text-white text-lg">
        <a className="relative group text-white hover:text-[#D90A14] cursor-pointer">Home</a>
        <a className="relative group text-white hover:text-[#D90A14] cursor-pointer">Programs</a>
        <a className="relative group text-white hover:text-[#D90A14] cursor-pointer">Coaching</a>
        <a className="relative group text-white hover:text-[#D90A14] cursor-pointer">Membership</a>
        <a className="relative group text-white hover:text-[#D90A14] cursor-pointer">About Us</a>
        </div>

        {/* Right Side - Buttons */}
        <div className="flex gap-4">
        <button
            onClick={() => navigate("/login")}
            className="bg-black text-white px-6 py-2 rounded-lg hover:bg-[#CD4E17] transition border border-[#CD4E17] cursor-pointer"
        >
            Login
        </button>
        <button
            onClick={() => navigate("/signup")}
            className="bg-[#D90A14] text-white px-6 py-2 rounded-lg hover:bg-[#0F0505] transition cursor-pointer"
        >
            SignUp
        </button>
        </div>
    </nav>
    );
}

export default Nav1;