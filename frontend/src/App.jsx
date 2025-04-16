import Nav1 from "./components/Nav1";
import Home from "./components/Landingpage/Home";
import Programs from "./components/Landingpage/Programs";
import Coaching from "./components/Landingpage/Coaching";
import AboutUs from "./components/Landingpage/AboutUs";


function App() {
  return (
    <div className="w-screen min-h-screen mx-auto bg-[#0F0505] p-8 text-center">
      <Nav1 />
      <section id = "home">
        <Home />
      </section>
      <section id = "programs">
        <Programs />
      </section>
      <section id = "coaching">
        <Coaching />
      </section>
      <section id = "about us">
        <AboutUs />
      </section>
    </div>
  );
}

export default App;
