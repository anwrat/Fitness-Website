import { useNavigate } from "react-router-dom";
import UserNav from "../../components/UserNav";
import NormalButton from "../../components/NormalButton";
import Footer from "../../components/Footer";

const Tools = () => {
  const navigate = useNavigate();

  const coachingData = [
    {
      title: "BMI Calculator",
      desc: "Calculate Body Mass Index",
      path: "/tools/bmi"
    },
    {
      title: "Calorie Calculator",
      desc: "Estimate the number of calories you need to maintain, lose, or gain weight",
      path: "/tools/calorie"
    },
    {
      title: "Muscle Mass Calculator",
      desc: "Calculate your muscle mass",
      path: "/tools/muscle-mass"
    },
    {
      title: "Body Fat Calculator",
      desc: "Estimate your body fat percentage based on measurements",
      path: "/tools/body-fat"
    },
    {
      title: "Sleep Quality Calculator",
      desc: "Assess the quality of your sleep",
      path: "/tools/sleep-quality"
    },
    {
      title: "Protein Intake Calculator",
      desc: "Determine your daily protein requirements",
      path: "/tools/protein-intake"
    },
    {
      title: "Water Intake Calculator",
      desc: "Calculate your daily water intake needs",
      path: "/tools/water-intake"
    },
    {
      title: "1 Rep Max Calculator",
      desc: "Calculate your 1 repetition maximum for various exercises",
      path: "/tools/rep-max"
    }
  ];

  return (
    <div className="w-screen min-h-screen bg-[#0F0505]">
      <UserNav />
      <div className="mt-20 pt-30 px-10 text-white">
        <h2 className="text-4xl font-bold text-center mb-10">Tools</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
          {coachingData.map((item, index) => (
            <div key={index} className="bg-[#1a1a1a] p-6 rounded-xl shadow-md hover:scale-105 transition-transform duration-300 flex flex-col">
              <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
              <p className="text-gray-300 text-sm flex-1">{item.desc}</p>
              <div className="pt-4">
                <NormalButton 
                  text="Calculate Now"
                  bgColor="#D90A14"
                  textColor="white"
                  hoverBorder="#D90A14"
                  hoverBg="#0F0505"
                  hoverText="#D90A14"
                  bColor="#D90A14"
                  onClick={() => navigate(item.path)}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Tools;