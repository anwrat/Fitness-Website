import { useState } from "react";
import { useNavigate } from "react-router-dom";
import UserNav from "../../../components/UserNav";
import NormalButton from "../../../components/NormalButton";
import InputField from "../../../components/InputField";

function WaterIntake() {
  const [weight, setWeight] = useState('');
  const [age, setAge] = useState('');
  const [gender, setGender] = useState('male');
  const [waterIntake, setWaterIntake] = useState(null);
  const [error, setError] = useState('');

  const navigate = useNavigate();

  const calculateWaterIntake = () => {
    const w = parseFloat(weight);
    const a = parseFloat(age);

    if (isNaN(w) || isNaN(a)) {
      setError("Please enter valid numeric values for weight and age.");
      setWaterIntake(null);
      return;
    }

    if (w <= 0 || a <= 0) {
      setError("All inputs must be positive numbers.");
      setWaterIntake(null);
      return;
    }

    setError('');

    // General recommendation: 0.033 liters per kg
    const intake = w * 0.033;
    setWaterIntake(intake.toFixed(2));
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
          <span className="text-white">WaterIntakeCalculator</span>
        </div>

        <h2 className="text-4xl font-bold text-center mb-2">Water Intake Calculator</h2>
        <p className="text-center text-sm text-gray-400 uppercase mb-6">Estimate Your Daily Water Needs</p>

        <div className="bg-[#1a1a1a] p-6 rounded-xl shadow-md transition-transform duration-300 flex flex-col lg:flex-row justify-between items-center gap-10 w-1/2 mx-auto">
          {/* Input Form */}
          <div className="w-full lg:w-1/2 space-y-4">
            <p>Weight in kg</p>
            <InputField placeholder="Weight in kg" value={weight} onChange={(e) => setWeight(e.target.value)} />
            <p>Age</p>
            <InputField placeholder="Age in years" value={age} onChange={(e) => setAge(e.target.value)} />

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
                onClick={calculateWaterIntake}
              />
            </div>
          </div>

          {/* Result Display */}
          <div className="text-center">
            <h3 className="text-xl font-semibold mb-2">Your Daily Water Intake</h3>
            <p className="text-3xl font-bold text-[#D90A14]">
              {waterIntake !== null ? `${waterIntake} L` : "--"}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default WaterIntake;