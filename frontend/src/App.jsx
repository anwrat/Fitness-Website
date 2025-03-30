import muscleman from "./assets/muscleman.png";
import { useNavigate } from "react-router-dom";
import Nav1 from "./components/Nav1";


function App() {

  const navigate = useNavigate();

  return (
    <div className="w-screen h-screen mx-auto bg-[#0F0505] p-8 text-center">
      <Nav1 />
      <div className="w-full h-auto flex flex-col md:flex-row items-center justify-center px-6">
      {/* Left Side: Text */}
      <div className="w-full md:w-1/2 text-center md:text-left p-6">
        <h1 className="text-2xl md:text-4xl font-bold text-white">
          Achieve Your
        </h1>
        <h1 className="text-2xl md:text-4xl font-bold text-[#CC4E17]">FITNESS GOALS</h1>
        <h1 className="text-2xl md:text-4xl font-bold text-white">With FitMaker</h1>
        <div className="mt-12 flex gap-4">
          <button className="bg-[#D90A14] text-white px-6 py-2 rounded-4xl hover:bg-[#0F0505] hover:border border-[#D90A14] transition cursor-pointer font-semibold"
            >
                Start Your Journey
          </button>
          <button className="bg-black text-[#CD4E17] px-6 py-2 rounded-4xl hover:bg-[#CD4E17] hover:text-white transition border border-[#CD4E17] cursor-pointer font-semibold"
          >
             Explore Programs
          </button>
        </div>
      </div>

      {/* Right Side: Image */}
      <div className="w-full md:w-1/2 flex justify-center">
        <img
          src={muscleman}
          className="w-3/4 md:w-full max-w-xs md:max-w-md h-auto rounded-full drop-shadow-[0_0_10px_#CD4E17]"
          alt="Fitness App Home"
        />
      </div>
    </div>
    </div>
  );
}

export default App;
