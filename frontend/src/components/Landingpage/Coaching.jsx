import { useNavigate } from "react-router-dom";

const Coaching = () => {
  const coachingData = [
    {
      title: "One-on-One Coaching",
      desc: "Dedicated support from expert trainers to fast-track your fitness journey."
    },
    {
      title: "Nutrition Guidance",
      desc: "Personalized meal planning to fuel your workouts and recovery."
    },
    {
      title: "Personalized Workouts",
      desc: "Tailored routines based on your body type, goals, and preferences."
    },
    {
      title: "Progress Tracking",
      desc: "Monitor improvements with real-time progress tools and insights."
    }
  ];

  const navigate = useNavigate();

  return (
    <div className="mt-20 px-6 text-white cursor-pointer" id="coaching" onClick={()=>navigate('/register')}>
      <h2 className="text-4xl font-bold text-center mb-2">Coaching</h2>
      <p className="text-center text-sm text-gray-400 uppercase mb-10">Achieve more with expert guidance</p>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
        {coachingData.map((item, index) => (
          <div key={index} className="bg-[#1a1a1a] p-6 rounded-xl shadow-md hover:scale-105 transition-transform duration-300">
            <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
            <p className="text-gray-300 text-sm">{item.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Coaching;