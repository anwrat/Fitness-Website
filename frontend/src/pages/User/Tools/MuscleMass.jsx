import { useState } from "react";
import { useNavigate } from "react-router-dom";
import UserNav from "../../../components/UserNav";
import NormalButton from "../../../components/NormalButton";
import InputField from "../../../components/InputField";

function MuscleMass() {
  const [height, setHeight] = useState('');
  const [weight, setWeight] = useState('');
  const [age, setAge] = useState('');
  const [gender, setGender] = useState('male');
  const [muscleMass, setMuscleMass] = useState(null);
  const [error, setError] = useState('');

  const navigate = useNavigate();

  const calculateMuscleMass = () => {
    const h = parseFloat(height);
    const w = parseFloat(weight);
    const a = parseFloat(age); // still useful if you expand formula later

    if (isNaN(h) || isNaN(w) || isNaN(a)) {
      setError("Please enter valid numeric values for height, weight, and age.");
      setMuscleMass(null);
      return;
    }

    if (h <= 0 || w <= 0 || a <= 0) {
      setError("All inputs must be positive numbers.");
      setMuscleMass(null);
      return;
    }

    setError('');

    const heightInMeters = h / 100;
    let lbm;

    if (gender === 'male') {
      lbm = (1.1 * w) - (128 * (w ** 2) / (h ** 2));
    } else {
      lbm = (1.07 * w) - (148 * (w ** 2) / (h ** 2));
    }

    setMuscleMass(lbm.toFixed(2));
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
          <span className="text-white">MuscleMassCalculator</span>
        </div>

        <h2 className="text-4xl font-bold text-center mb-2">Muscle Mass Calculator</h2>
        <p className="text-center text-sm text-gray-400 uppercase mb-6">Estimate Your Lean Body Mass</p>

        <div className="bg-[#1a1a1a] p-6 rounded-xl shadow-md transition-transform duration-300 flex flex-col lg:flex-row justify-between items-center gap-10 w-1/2 mx-auto">
          {/* Input Form */}
          <div className="w-full lg:w-1/2 space-y-4">
            <p>Height in cm</p>
            <InputField placeholder="Height in cm" value={height} onChange={(e) => setHeight(e.target.value)} />
            <p>Weight in kg</p>
            <InputField placeholder="Weight in kg" value={weight} onChange={(e) => setWeight(e.target.value)} />
            <p>Age</p>
            <InputField placeholder="Age in years" value={age} onChange={(e) => setAge(e.target.value)} />

            {/* Gender */}
            <p>Gender</p>
            <div className="flex gap-4 items-center text-sm">
              <label>
                <input type="radio" value="male" checked={gender === 'male'} onChange={() => setGender('male')} />
                <span className="ml-1">Male</span>
              </label>
              <label>
                <input type="radio" value="female" checked={gender === 'female'} onChange={() => setGender('female')} />
                <span className="ml-1">Female</span>
              </label>
            </div>

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
                onClick={calculateMuscleMass}
              />
            </div>
          </div>

          {/* Result Display */}
          <div className="text-center">
            <h3 className="text-xl font-semibold mb-2">Your Lean Body Mass</h3>
            <p className="text-3xl font-bold text-[#D90A14]">
              {muscleMass !== null ? `${muscleMass} kg` : "--"}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MuscleMass;