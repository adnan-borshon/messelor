import React from "react";
import { Button } from "../ui/button";

import Contact from "./Contact.tsx";
import Hero from "./Hero";
import Feature from "./Feature";
import AIBenefits from "./AIBenefits";
import Testimonials from "./Testimonials";

const Home: React.FC = () => {
  return (
    <>
      <section className="mx-auto">
        {/* hero section */}
        <Hero />
        {/* feature section */}
        <Feature />
        {/* AI benefits section */}
        <AIBenefits />
        {/* Testimonials section */}
        <Testimonials />

        {/* about section */}
        <section className="about w-full flex flex-col md:flex-row bg-gray-200 py-12 px-4 md:px-12 gap-8">
          {/* left side */}
          <div className="w-full md:w-1/2 flex flex-col justify-center lg:pl-50 space-y-6">
            <div className="space-y-2">
              <h1 className="text-3xl md:text-4xl text-blue-500 font-bold">
                About Messelor
              </h1>
            </div>
            <p className="text-base md:text-lg text-gray-800">
              Messelor was built to remove disputes and bring fairness in shared
              living spaces by combining automation with AI-driven insights. Our
              mission is to make mess management transparent, efficient, and
              stress-free for everyone involved.
            </p>
            <p className="text-base md:text-lg text-gray-800">
              Whether you're a student in a hostel or managing a shared kitchen,
              Messelor ensures that everyone pays their fair share while
              maintaining complete transparency in all transactions.
            </p>
          </div>

          {/* right side */}
          <div className="w-full md:w-1/2 flex items-center justify-center">
            <img
              className="max-h-72 md:max-h-96 object-contain rounded-2xl w-full md:w-auto"
              src="hero_page.jpg"
              alt="Hero"
            />
          </div>
        </section>

        {/* contact section */}
        <section className="contactUs px-4 md:px-12">
          <Contact />
        </section>
      </section>
    </>
  );
};

export default Home;
