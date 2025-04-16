import { InstagramIcon } from "lucide-react";

function AboutUs() {
  return (
    <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
      {/* Logo and Contact Section */}
      <div>
        <img src="/logo.png" alt="Herald College Logo" className="h-12 mb-4" />
        <p className="mb-2">Naxal Bhagawati Marga, Kathmandu, Nepal</p>
        <p>+977 9801022637</p>
        <p>+977 01-5970120</p>
        <p>+977 9801000078</p>
        <p className="mt-2">info@heraldcollege.edu.np</p>
        <button className="mt-4 bg-green-500 text-white py-2 px-4 rounded">CONTACT US</button>
      </div>

      {/* Links Section */}
      <div className="grid grid-cols-1 gap-2 text-sm">
        <p className="font-bold">SCHOLARSHIP OPPORTUNITY</p>
        <p>OUR COURSES</p>
        <p>UNIVERSITY OF WOLVERHAMPTON</p>
        <p>ABOUT HCK</p>
        <p>LATEST EVENTS</p>
        <p>INTERNATIONAL EXPOSURE</p>
        <p>OUR COMMUNITY</p>
      </div>

      {/* Notice and Social Media */}
      <div className="grid grid-cols-1 gap-2 text-sm">
        <p className="font-bold">NOTICE</p>
        <p>OUR INFRASTRUCTURE</p>
        <div className="flex space-x-4 mt-4 text-lg">
          <InstagramIcon />
        </div>
      </div>
    </div>
  );
}

export default AboutUs;