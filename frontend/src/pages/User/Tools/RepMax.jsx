import { useState } from "react";
import { useNavigate } from "react-router-dom";
import UserNav from "../../../components/UserNav";
import NormalButton from "../../../components/NormalButton";
import InputField from "../../../components/InputField";

function RepMax() {
  const [weight, setWeight] = useState('');
  const [reps, setReps] = useState('');
  const [oneRepMax, setOneRepMax] = useState(null);
  const [error, setError] = useState('');

  const navigate = useNavigate();

  const calculateOneRepMax = () => {
    const w = parseFloat(weight);
    const r = parseFloat(reps);

    if (isNaN(w) || isNaN(r)) {
      setError("Please enter valid numeric values for weight and reps.");
      setOneRepMax(null);
      return;
    }

    if (w <= 0 || r <= 0) {
      setError("Both weight and reps must be positive numbers.");
      setOneRepMax(null);
      return;
    }

    setError('');

    // Epley Formula
    const result = w * (1 + r / 30);
    setOneRepMax(result.toFixed(2));
  };

  return (
    <div className="w-screen min-h-screen bg-[#0F0505]">
      <UserNav />
      <div className="mt-20 pt-30 px-10 text-white">
        <div className="text-sm text-[#D90A14] mb-4 space-x-1">
          <span className="cursor-pointer" onClick={() => navigate("/dashboard")}>
            FitForge
          </span>
          <span>/</span>
          <span className="cursor-pointer" onClick={() => navigate("/tools")}>
            Tools
          </span>
          <span>/</span>
          <span className="text-white">OneRepMaxCalculator</span>
        </div>

        <h2 className="text-4xl font-bold text-center mb-2">One-Rep Max Calculator</h2>
        <p className="text-center text-sm text-gray-400 uppercase mb-6">Estimate Your Maximum Lifting Capacity</p>

        <div className="bg-[#1a1a1a] p-6 rounded-xl shadow-md transition-transform duration-300 flex flex-col lg:flex-row justify-between items-center gap-10 w-1/2 mx-auto">
          {/* Input Form */}
          <div className="w-full lg:w-1/2 space-y-4">
            <p>Weight Lifted (kg)</p>
            <InputField placeholder="Enter weight" value={weight} onChange={(e) => setWeight(e.target.value)} />
            <p>Repetitions Performed</p>
            <InputField placeholder="Enter reps" value={reps} onChange={(e) => setReps(e.target.value)} />

            {error && <p className="text-red-500 text-sm">{error}</p>}
            <div className="pt-2">
              <NormalButton
                text="Calculate Now"
                bgColor="#D90A14"
                textColor="white"
                hoverBorder="#D90A14"
                hoverBg="#0F0505"
                hoverText="#D90A14"
                bColor="#D90A14"
                onClick={calculateOneRepMax}
              />
            </div>
          </div>

          {/* Result Display */}
          <div className="text-center">
            <h3 className="text-xl font-semibold mb-2">Estimated One-Rep Max</h3>
            <p className="text-3xl font-bold text-[#D90A14]">
              {oneRepMax !== null ? `${oneRepMax} kg` : "--"}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RepMax;