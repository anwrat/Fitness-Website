import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import UserNav from '../../components/UserNav';
import Footer from '../../components/Footer';

function Dashboard() {
  const navigate = useNavigate();
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [timeOfDay, setTimeOfDay] = useState('Hello');
  const [quoteIndex, setQuoteIndex] = useState(0);

  const quotes = [
    "The only bad workout is the one that didn’t happen.",
    "Push yourself, because no one else is going to do it for you.",
    "Fitness is not about being better than someone else. It’s about being better than you used to be.",
    "Take care of your body. It’s the only place you have to live.",
    "Don’t limit your challenges. Challenge your limits.",
    "It never gets easier. You just get stronger.",
    "Exercise not only changes your body, it changes your mind, your attitude and your mood.",
  ];

  const getUserIdFromToken = (token) => {
    try {
      const payload = token.split(".")[1];
      const base64 = payload.replace(/-/g, "+").replace(/_/g, "/");
      const jsonPayload = decodeURIComponent(
        atob(base64)
          .split("")
          .map((c) => "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2))
          .join("")
      );
      const data = JSON.parse(jsonPayload);
      return data.user_id || data.id;
    } catch {
      return null;
    }
  };

  useEffect(() => {
    const hour = new Date().getHours();
    if (hour < 12) setTimeOfDay('Good morning');
    else if (hour < 18) setTimeOfDay('Good afternoon');
    else setTimeOfDay('Good evening');

    const fetchUserData = async () => {
      const token = localStorage.getItem("token");
      const userId = getUserIdFromToken(token);
      if (!token || !userId) {
        setError("Please login first.");
        setLoading(false);
        return;
      }

      try {
        const response = await axios.get(`http://localhost:8000/details/admin/${userId}/`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUserData(response.data);
      } catch (err) {
        setError("Failed to load user data.");
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();

    // Quote changer every 15 seconds
    const interval = setInterval(() => {
      setQuoteIndex(prev => (prev + 1) % quotes.length);
    }, 15000);

    return () => clearInterval(interval);
  }, []);

  if (loading) return <div className="text-white text-center mt-10">Loading...</div>;
  if (error) return <div className="text-red-600 text-center mt-10">{error}</div>;
  if (!userData) return null;

  const { user, details } = userData;

  const getAge = (dob) => {
    const birthDate = new Date(dob);
    const age = new Date().getFullYear() - birthDate.getFullYear();
    return age;
  };

  const calculateBMI = (weight, height) => {
    const hInMeters = height / 100;
    return weight && height ? (weight / (hInMeters * hInMeters)).toFixed(1) : null;
  };

  const getBMICategory = (bmi) => {
    if (bmi < 18.5) return 'Underweight';
    if (bmi < 24.9) return 'Normal';
    if (bmi < 29.9) return 'Overweight';
    return 'Obese';
  };

  const calculateBMR = () => {
    if (!details.gender || !details.height || !details.weight || !details.date_of_birth) return null;
    const age = getAge(details.date_of_birth);
    const { gender, weight, height } = details;
    return gender.toLowerCase() === 'male'
      ? Math.round(10 * weight + 6.25 * height - 5 * age + 5)
      : Math.round(10 * weight + 6.25 * height - 5 * age - 161);
  };

  const bmi = calculateBMI(details.weight, details.height);
  const bmiCategory = getBMICategory(bmi);
  const bmr = calculateBMR();
  const age = getAge(details.date_of_birth);

  return (
    <div className="bg-gradient-to-br from-black via-gray-900 to-black min-h-screen text-white">
      <UserNav />
      <div className="max-w-5xl mx-auto mt-20 pt-30 px-10 mb-10">
        <div className="text-center mb-6">
          <h1 className="text-4xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-red-500 via-pink-500 to-yellow-400">
            {timeOfDay}, {user.username}!
          </h1>
          <p className="text-lg italic text-gray-300 max-w-2xl mx-auto">
            "{quotes[quoteIndex]}"
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 mt-4">
          <div className="bg-white/10 p-6 rounded-xl shadow-md">
            <h2 className="text-2xl font-semibold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-red-500 via-pink-500 to-yellow-400">Your Stats</h2>
            <p><strong>Full Name:</strong> {details.first_name} {details.last_name}</p>
            <p><strong>Gender:</strong> {details.gender}</p>
            <p><strong>Age:</strong> {age} years</p>
            <p><strong>Height:</strong> {details.height} cm</p>
            <p><strong>Weight:</strong> {details.weight} kg</p>
            <p><strong>BMI:</strong> {bmi} ({bmiCategory})</p>
            <p><strong>BMR:</strong> {bmr} kcal/day</p>
          </div>

          <div className="bg-white/10 p-6 rounded-xl shadow-md">
            <h2 className="text-2xl font-semibold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-red-500 via-pink-500 to-yellow-400">Health Insights</h2>
            {bmi && (
              <>
                <p className="mb-2">
                  Based on your BMI, you are categorized as <strong className='text-[#D90A14]'>{bmiCategory}</strong>.
                </p>
                {bmiCategory === 'Underweight' && <p>You may need to consume more calories and focus on strength training.</p>}
                {bmiCategory === 'Normal' && <p>You're doing well! Maintain your current fitness routine.</p>}
                {bmiCategory === 'Overweight' && <p>Consider cardio and calorie control to manage your weight.</p>}
                {bmiCategory === 'Obese' && <p>A structured diet and workout plan is advised. Consult a nutritionist.</p>}
              </>
            )}
            {bmr && (
              <p className="mt-4">
                Your estimated maintenance calories are <strong className='text-[#D90A14]'>{bmr} kcal/day</strong>. Adjust intake based on fitness goals.
              </p>
            )}
          </div>
        </div>

        <div className="mt-10 text-center">
          <button
            onClick={() => navigate('/editProfile/' + user.id)}
            className="px-6 py-3 bg-gradient-to-r from-pink-500 to-red-500 rounded-full text-white font-semibold shadow-lg hover:shadow-red-500/70 transition hover:scale-105"
          >
            Update Profile Info
          </button>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Dashboard;