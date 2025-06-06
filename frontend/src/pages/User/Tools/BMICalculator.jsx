import { useState } from "react";
import { useNavigate } from "react-router-dom";
import UserNav from "../../../components/UserNav";
import NormalButton from "../../../components/NormalButton";
import InputField from "../../../components/InputField";

function BMICalculator() {
  const [height, setHeight] = useState('');
  const [weight, setWeight] = useState('');
  const [bmi, setBmi] = useState(null);
  const [error, setError] = useState('');

  const navigate = useNavigate();

  const calculateBMI = () => {
    const heightValue = parseFloat(height);
    const weightValue = parseFloat(weight);

    // Validation
    if (isNaN(heightValue) || isNaN(weightValue)) {
      setError("Please enter valid numeric values for height and weight.");
      setBmi(null);
      return;
    }

    if (heightValue <= 0 || weightValue <= 0) {
      setError("Height and weight must be positive numbers.");
      setBmi(null);
      return;
    }

    // Clear previous error
    setError('');

    const heightInMeters = heightValue / 100;
    const bmiValue = weightValue / (heightInMeters * heightInMeters);
    setBmi(bmiValue.toFixed(2));
  };

  return (
    <div className="w-screen min-h-screen bg-[#0F0505]">
      <UserNav />
      <div className="mt-20 pt-30 px-10 text-white">
        <div className="text-sm text-[#D90A14] mb-4 space-x-1">
          <span
            className="cursor-pointer"
            onClick={() => navigate("/dashboard")}
          >
            FitForge
          </span>
          <span>/</span>
          <span
            className="cursor-pointer"
            onClick={() => navigate("/tools")}
          >
            Tools
          </span>
          <span>/</span>
          <span className="text-white">BMICalculator</span>
        </div>
        <h2 className="text-4xl font-bold text-center mb-2">BMI Calculator</h2>
        <p className="text-center text-sm text-gray-400 uppercase mb-6">Calculate Your Body Mass Index</p>

        <div className="bg-[#1a1a1a] p-6 rounded-xl shadow-md transition-transform duration-300 flex flex-col lg:flex-row justify-between items-center gap-10 w-1/2 mx-auto">
          {/* Input Form */}
          <div className="w-full lg:w-1/2 space-y-4">
            <p>Height in cm</p>
            <InputField
              placeholder="Height in cm"
              value={height}
              onChange={(e) => setHeight(e.target.value)}
            />
            <p>Weight in kg</p>
            <InputField
              placeholder="Weight in kg"
              value={weight}
              onChange={(e) => setWeight(e.target.value)}
            />
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
                onClick={calculateBMI}
              />
            </div>
          </div>

          {/* Result Display */}
          <div className="text-center">
            <h3 className="text-xl font-semibold mb-2">Your BMI is</h3>
            <p className="text-3xl font-bold text-[#D90A14]">
              {bmi !== null ? bmi : "--"}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BMICalculator;