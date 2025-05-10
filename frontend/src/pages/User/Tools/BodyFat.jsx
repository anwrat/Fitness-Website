import { useState } from "react";
import { useNavigate } from "react-router-dom";
import UserNav from "../../../components/UserNav";
import NormalButton from "../../../components/NormalButton";
import InputField from "../../../components/InputField";

function BodyFat() {
  const [height, setHeight] = useState('');
  const [neck, setNeck] = useState('');
  const [waist, setWaist] = useState('');
  const [hip, setHip] = useState('');
  const [gender, setGender] = useState('male');
  const [bodyFat, setBodyFat] = useState(null);
  const [error, setError] = useState('');

  const navigate = useNavigate();

  const calculateBodyFat = () => {
    const h = parseFloat(height);
    const n = parseFloat(neck);
    const w = parseFloat(waist);
    const hp = parseFloat(hip);

    if (isNaN(h) || isNaN(n) || isNaN(w) || (gender === 'female' && isNaN(hp))) {
      setError("Please enter all required numeric values.");
      setBodyFat(null);
      return;
    }

    if (h <= 0 || n <= 0 || w <= 0 || (gender === 'female' && hp <= 0)) {
      setError("All inputs must be positive numbers.");
      setBodyFat(null);
      return;
    }

    setError('');

    let bfPercent = 0;

    if (gender === 'male') {
      bfPercent =
        495 /
          (1.0324 -
            0.19077 * Math.log10(w - n) +
            0.15456 * Math.log10(h)) -
        450;
    } else {
      bfPercent =
        495 /
          (1.29579 -
            0.35004 * Math.log10(w + hp - n) +
            0.22100 * Math.log10(h)) -
        450;
    }

    setBodyFat(bfPercent.toFixed(2));
  };

  return (
    <div className="w-screen min-h-screen bg-[#0F0505]">
      <UserNav />
      <div className="mt-20 pt-30 px-10 text-white">
        <div className="text-sm text-[#D90A14] mb-4 space-x-1">
          <span className="cursor-pointer" onClick={() => navigate("/dashboard")}>FitForge</span>
          <span>/</span>
          <span className="cursor-pointer" onClick={() => navigate("/tools")}>Tools</span>
          <span>/</span>
          <span className="text-white">BodyFatCalculator</span>
        </div>

        <h2 className="text-4xl font-bold text-center mb-2">Body Fat Calculator</h2>
        <p className="text-center text-sm text-gray-400 uppercase mb-6">Estimate Your Body Fat Percentage</p>

        <div className="bg-[#1a1a1a] p-6 rounded-xl shadow-md transition-transform duration-300 flex flex-col lg:flex-row justify-between items-center gap-10 w-1/2 mx-auto">
          {/* Input Form */}
          <div className="w-full lg:w-1/2 space-y-4">
            <p>Height in cm</p>
            <InputField placeholder="Height in cm" value={height} onChange={(e) => setHeight(e.target.value)} />
            <p>Neck circumference in cm</p>
            <InputField placeholder="Neck circumference in cm" value={neck} onChange={(e) => setNeck(e.target.value)} />
            <p>Waist curcumference in cm</p>
            <InputField placeholder="Waist circumference in cm" value={waist} onChange={(e) => setWaist(e.target.value)} />
            {gender === 'female' && (
              <InputField placeholder="Hip circumference in cm" value={hip} onChange={(e) => setHip(e.target.value)} />
            )}

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
                onClick={calculateBodyFat}
              />
            </div>
          </div>

          {/* Result Display */}
          <div className="text-center">
            <h3 className="text-xl font-semibold mb-2">Your Body Fat %</h3>
            <p className="text-3xl font-bold text-[#D90A14]">
              {bodyFat !== null ? `${bodyFat} %` : "--"}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BodyFat;