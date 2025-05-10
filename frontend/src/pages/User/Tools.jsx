import UserNav from "../../components/UserNav";
import NormalButton from "../../components/NormalButton";

const Tools = () => {
  const coachingData = [
    {
      title: "BMI Calculator",
      desc: "Calculate Body Mass Index"
    },
    {
      title: "Calorie Calculator",
      desc: "Estimate the number of calories you need to maintain, lose, or gain weight"
    },
    {
      title: "Muscle Mass Calculator",
      desc: "Calculate your muscle mass"
    },
    {
      title: "Body Fat Calculator",
      desc: "Estimate your body fat percentage based on measurements"
    },
    {
      title: "Sleep Quality Calculator",
      desc: "Assess the quality of your sleep"
    }
  ];

  return (
    <div className="w-screen min-h-screen bg-[#0F0505]">
        <UserNav />
        <div className="mt-20 pt-30 px-10 text-white" id="coaching">
        <h2 className="text-4xl font-bold text-center mb-2">Tools</h2>
        <p className="text-center text-sm text-gray-400 uppercase mb-10">Calculate BMR, daily calorie needs, and macros.</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {coachingData.map((item, index) => (
            <div key={index} className="bg-[#1a1a1a] p-6 rounded-xl shadow-md hover:scale-105 transition-transform duration-300">
                <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                <p className="text-gray-300 text-sm">{item.desc}</p>
                <div className="mt-auto pt-4">
                    <NormalButton text="Calculate Now" bgColor="#D90A14" textColor="white" hoverBorder="#D90A14" hoverBg="#0F0505" hoverText="#D90A14" bColor="#D90A14"/>
                </div>
            </div>
            ))}
        </div>
        </div>
    </div>
  );
};

export default Tools;