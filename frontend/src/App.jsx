import muscleman from "./assets/muscleman.png";
import { useNavigate } from "react-router-dom";
import Nav1 from "./components/Nav1";

function App() {

  const navigate = useNavigate();

  return (
    <div className="w-screen h-screen mx-auto bg-[#0F0505] p-8 text-center">
      <Nav1 />
      <div>
        <img
          src={muscleman}
          className="h-24 p-6 transition duration-300 hover:drop-shadow-[0_0_8px_#646cffaa]"
          alt="Fitness App Home"
        />
      </div>
      <h1 className="text-3xl font-bold text-white">Achieve Your FITNESS GOALS With FitMaker</h1>
    </div>
  );
}

export default App;
