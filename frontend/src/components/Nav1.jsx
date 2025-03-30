import { useNavigate } from "react-router-dom";
import NormalButton from "./NormalButton";

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
        <NormalButton text="Login" textColor="#CD4E17" hoverText="white" bgColor="black" bColor="#CD4E17" hoverBg="#CD4E17" onClick={()=>navigate("/login")}/>
        <NormalButton text="SignUp" textColor="white" hoverText="#D90A14" bgColor="#D90A14" hoverBorder="#D90A14" hoverBg="#0F0505" bColor="#D90A14" onClick={()=>navigate("/signup")}/>
        </div>
    </nav>
    );
}

export default Nav1;