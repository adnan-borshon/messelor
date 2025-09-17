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
    {/*hero section*/}
  <Hero/>
{/*feature section*/}
<Feature/>

{/*AI benefits section*/}
   <AIBenefits/>
{/*Testimonials section*/}
     <Testimonials/>
{/*about section*/}
  <section className="about w-full flex bg-gray-200 py-12">
 
      <div className="w-1/2 flex flex-col justify-center pl-30 space-y-6">
        <div className="space-y-2">
          <h1 className="text-4xl text-blue-500 font-bold">About Messelor</h1>
        </div>
        <p className="text-lg text-gray-800">
         Messelor was built to remove disputes and bring fairness in shared living spaces by combining automation with Al-driven insights. Our mission is to make mess management transparent, efficient, and stress-free for everyone involved
        </p>
      <p className="text-lg text-gray-800">
        Whether you're a student in a hostel or managing a shared kitchen, Messelor ensures that everyone pays their fair share while maintaining complete transparency in all transactions.
      </p>
      </div>

     
      <div className="w-1/2 flex items-center justify-center">
        <img
          className="max-h-96 object-contain rounded-2xl"
          src="hero_page.jpg"
          alt="Hero"
        />
      </div>
    </section>
    {/*contact section*/}
    <section className="contactUs">
        <Contact/>
    </section>
     </>
  );
};

export default Home;
