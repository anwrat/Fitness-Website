import { useState, useEffect } from "react";
import UserNav from "../../components/UserNav";
import Home from "../../components/Landingpage/Home";  // Adjusted path
import Programs from "../../components/Landingpage/Programs";  // Adjusted path
import Coaching from "../../components/Landingpage/Coaching";  // Adjusted path
import AboutUs from "../../components/Landingpage/AboutUs";  // Adjusted path

function Dashboard() {
  return (
    <div className="w-screen bg-[#0F0505]">
      <div className="w-screen min-h-screen mx-auto p-8 text-center">
        <UserNav />
        <section id="home">
          <Home />
        </section>
        <section id="programs">
          <Programs />
        </section>
        <section id="coaching">
          <Coaching />
        </section>
      </div>
      <section id="about us">
        <AboutUs />
      </section>
    </div>
  );
}

export default Dashboard;
