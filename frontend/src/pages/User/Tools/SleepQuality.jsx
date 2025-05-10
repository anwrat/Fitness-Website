import { useState } from "react";
import { useNavigate } from "react-router-dom";
import UserNav from "../../../components/UserNav";
import NormalButton from "../../../components/NormalButton";
import InputField from "../../../components/InputField";

function SleepQuality() {
  const [sleepHours, setSleepHours] = useState('');
  const [wakeUps, setWakeUps] = useState('');
  const [sleepRating, setSleepRating] = useState('3');
  const [score, setScore] = useState(null);
  const [error, setError] = useState('');

  const navigate = useNavigate();

  const calculateSleepQuality = () => {
    const hours = parseFloat(sleepHours);
    const wakes = parseInt(wakeUps);
    const rating = parseInt(sleepRating);

    if (isNaN(hours) || isNaN(wakes) || isNaN(rating)) {
      setError("Please enter valid values.");
      setScore(null);
      return;
    }

    if (hours <= 0 || wakes < 0 || rating < 1 || rating > 5) {
      setError("Invalid input values.");
      setScore(null);
      return;
    }

    setError('');

    let quality = 50;

    // Add or subtract based on sleep duration
    if (hours >= 7 && hours <= 9) quality += 25;
    else if (hours < 6) quality -= 15;
    else if (hours > 9) quality -= 10;

    // Adjust based on wakeups
    quality -= wakes * 5;

    // Subjective rating boost
    quality += (rating - 3) * 5;

    // Clamp between 0 and 100
    const finalScore = Math.max(0, Math.min(100, quality));
    setScore(finalScore.toFixed(1));
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
          <span className="text-white">SleepQualityCalculator</span>
        </div>

        <h2 className="text-4xl font-bold text-center mb-2">Sleep Quality Calculator</h2>
        <p className="text-center text-sm text-gray-400 uppercase mb-6">Estimate Your Sleep Health</p>

        <div className="bg-[#1a1a1a] p-6 rounded-xl shadow-md transition-transform duration-300 flex flex-col lg:flex-row justify-between items-center gap-10 w-1/2 mx-auto">
          {/* Input Form */}
          <div className="w-full lg:w-1/2 space-y-4">
            <p>Sleep Duration (hours)</p>
            <InputField placeholder="e.g. 7.5" value={sleepHours} onChange={(e) => setSleepHours(e.target.value)} />

            <p>Number of Night Awakenings</p>
            <InputField placeholder="e.g. 1" value={wakeUps} onChange={(e) => setWakeUps(e.target.value)} />

            <p>How rested do you feel? (1-5)</p>
            <select
              value={sleepRating}
              onChange={(e) => setSleepRating(e.target.value)}
              className="w-full p-2 rounded-md bg-[#2a2a2a] text-white"
            >
              <option value="1">1 - Very Poor</option>
              <option value="2">2 - Poor</option>
              <option value="3">3 - Average</option>
              <option value="4">4 - Good</option>
              <option value="5">5 - Very Good</option>
            </select>

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
                onClick={calculateSleepQuality}
              />
            </div>
          </div>

          {/* Result Display */}
          <div className="text-center">
            <h3 className="text-xl font-semibold mb-2">Your Sleep Quality Score</h3>
            <p className="text-3xl font-bold text-[#D90A14]">
              {score !== null ? `${score} / 100` : "--"}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SleepQuality;