import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import UserNav from '../../components/UserNav';
import CountUp from 'react-countup';
import { motion, AnimatePresence } from 'framer-motion';
import Footer from "../../components/Footer";

function Dashboard() {
  const navigate = useNavigate();
  const [quoteIndex, setQuoteIndex] = useState(0);
  const [timeOfDay, setTimeOfDay] = useState('Hello');

  const user = { name: 'Athlete' };
  const workoutStats = {
    weekly_count: 3,
    recipes_tried: 2,
    calories_burned: 1200,
    workout_goal: 5,
    calorie_goal: 2000,
  };
  const recommendations = { workout: 'HIIT Express', recipe: 'Chicken Salad' };
  const localQuotes = [
    'Discipline is the bridge between goals and accomplishment.',
    'Push yourself, because no one else is going to do it for you.',
    'The body achieves what the mind believes.',
    'Wake up. Work out. Crush it.',
    'Success starts with self-discipline.',
  ];
  const upcomingWorkouts = ['Leg Day • Tomorrow', 'Yoga Recovery • Thursday'];
  const badges = [
    { name: '7-Day Streak', emoji: '🥇', progress: 100 },
    { name: '5000 Calories Burned', emoji: '🥈', progress: 80 },
    { name: '10 Workouts Completed', emoji: '🥉', progress: 60 },
  ];
  const leaderboard = [
    { name: 'Alex', score: 12 },
    { name: 'You', score: 10 },
    { name: 'Sam', score: 9 },
  ];

  useEffect(() => {
    const hour = new Date().getHours();
    if (hour < 12) setTimeOfDay('Good morning');
    else if (hour < 18) setTimeOfDay('Good afternoon');
    else setTimeOfDay('Good evening');

    const interval = setInterval(() => {
      setQuoteIndex((prev) => (prev + 1) % localQuotes.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const getPercentage = (current, goal) => Math.min((current / goal) * 100, 100);

  return (
    <div className="bg-gradient-to-br from-black via-gray-900 to-black min-h-screen text-white">
      <UserNav />
      <div className="p-6 max-w-7xl mx-auto mt-20 pt-30 px-10">
        <motion.h1
          className="text-5xl font-extrabold mb-6 text-center bg-gradient-to-r from-red-500 via-pink-500 to-yellow-500 bg-clip-text text-transparent"
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
        >
          {timeOfDay}, {user.name}! 🌟
        </motion.h1>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
          {[
            { icon: '🔥', value: workoutStats.weekly_count, label: 'Workouts', goal: workoutStats.workout_goal },
            { icon: '🍽', value: workoutStats.recipes_tried, label: 'Recipes', goal: 5 },
            { icon: '⚡', value: workoutStats.calories_burned, label: 'Calories', goal: workoutStats.calorie_goal },
            { icon: '⏰', value: 2, label: 'Upcoming', goal: 3 },
          ].map((stat, index) => (
            <motion.div
              key={index}
              className="bg-white/10 backdrop-blur-xl rounded-2xl p-6 text-center shadow-xl hover:shadow-red-500/50 transform transition hover:-translate-y-1"
              whileHover={{ scale: 1.08 }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.2 }}
            >
              <motion.div animate={{ rotate: [0, 20, -20, 0] }} transition={{ repeat: Infinity, duration: 2 }}>
                <span className="text-4xl">{stat.icon}</span>
              </motion.div>
              <h2 className="text-3xl my-2">
                <CountUp end={stat.value} duration={2} />
              </h2>
              <p className="text-md mb-2">{stat.label}</p>
              <div className="w-full bg-gray-700 rounded-full h-2 mb-2">
                <div
                  className="bg-gradient-to-r from-red-500 to-yellow-400 h-2 rounded-full"
                  style={{ width: `${getPercentage(stat.value, stat.goal)}%` }}
                />
              </div>
              <p className="text-xs text-gray-300">{getPercentage(stat.value, stat.goal).toFixed(0)}% goal</p>
            </motion.div>
          ))}
        </div>

        {/* Quote carousel */}
        <AnimatePresence mode="wait">
          <motion.div
            key={quoteIndex}
            className="text-center mb-12 text-lg italic text-pink-300"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            “{localQuotes[quoteIndex]}”
          </motion.div>
        </AnimatePresence>

        {/* Achievements */}
        <div className="mb-12">
          <h2 className="text-2xl mb-4 text-center text-green-400 font-bold">🏅 Achievements</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {badges.map((badge, idx) => (
              <div key={idx} className="bg-white/10 p-4 rounded-xl text-center backdrop-blur-lg shadow hover:scale-105 transition">
                <span className="text-3xl">{badge.emoji}</span>
                <h3 className="font-semibold mt-2">{badge.name}</h3>
                <div className="w-full bg-gray-700 rounded-full h-2 mt-2">
                  <div
                    className="bg-gradient-to-r from-green-400 to-yellow-300 h-2 rounded-full"
                    style={{ width: `${badge.progress}%` }}
                  />
                </div>
                <p className="text-xs mt-1 text-gray-300">{badge.progress}% completed</p>
              </div>
            ))}
          </div>
        </div>

        {/* Leaderboard */}
        <div className="mb-12">
          <h2 className="text-2xl mb-4 text-center text-purple-400 font-bold">🏆 Leaderboard</h2>
          <ul className="flex flex-col items-center space-y-2">
            {leaderboard.map((player, idx) => (
              <li key={idx} className="bg-white/10 p-2 rounded-full w-2/3 md:w-1/3 text-center shadow hover:bg-purple-500/20 transition">
                <span className="mr-2 bg-purple-500 text-white rounded-full px-3 py-1 text-sm">{player.name[0]}</span>
                {player.name} — {player.score} workouts
              </li>
            ))}
          </ul>
        </div>

        {/* Upcoming Workouts */}
        <div className="mb-12">
          <h2 className="text-2xl mb-4 text-center text-yellow-300 font-bold">📅 Upcoming Workouts</h2>
          <ul className="flex flex-col items-center space-y-1">
            {upcomingWorkouts.map((item, idx) => (
              <li key={idx} className="text-gray-300">⏳ {item}</li>
            ))}
          </ul>
        </div>

        {/* Buttons */}
        <div className="flex flex-col md:flex-row justify-center gap-6">
          <button
            onClick={() => navigate('/exercises')}
            className="px-6 py-3 bg-gradient-to-r from-pink-500 to-red-500 rounded-full text-white text-lg font-semibold shadow-lg hover:shadow-red-500/70 transition transform hover:scale-105"
          >
            💥 Start Workout
          </button>
          <button
            onClick={() => navigate('/recipes')}
            className="px-6 py-3 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full text-white text-lg font-semibold shadow-lg hover:shadow-yellow-400/70 transition transform hover:scale-105"
          >
            🍴 Explore Recipes
          </button>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Dashboard;