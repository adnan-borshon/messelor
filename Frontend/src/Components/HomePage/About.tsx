import React from "react";
import { Card, CardContent } from "@/Components/ui/card";
import { Users, Lightbulb, ShieldCheck, Rocket } from "lucide-react";
import { Link } from "react-router-dom";

const About: React.FC = () => {
  const values = [
    {
      icon: Users,
      title: "Community First",
      desc: "We believe shared living should be transparent, fair, and stress-free.",
    },
    {
      icon: Lightbulb,
      title: "Smart Automation",
      desc: "Our AI-driven tools simplify daily tasks and reduce conflicts.",
    },
    {
      icon: ShieldCheck,
      title: "Transparency",
      desc: "Every transaction is visible and fair for all members.",
    },
    {
      icon: Rocket,
      title: "Innovation",
      desc: "We constantly improve with modern technology to serve you better.",
    },
  ];

  return (
    <section className="w-full min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-r from-blue-500 to-indigo-400 text-white py-16 px-6 md:px-20">
        <div className="max-w-5xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold">About Messelor</h1>
          <p className="mt-4 text-lg md:text-xl text-blue-100">
            Fair, transparent, and AI-powered mess management for everyone.
          </p>
        </div>
      </div>

      {/* Mission Section */}
      <div className="max-w-6xl mx-auto px-6 md:px-12 py-16 grid md:grid-cols-2 gap-10 items-center">
        <div>
          <h2 className="text-3xl font-bold text-blue-600 mb-4">Our Mission</h2>
          <p className="text-gray-700 text-lg leading-relaxed">
            Messelor was built to remove disputes and bring fairness in shared
            living spaces. By combining automation with AI insights, we make mess
            management transparent, efficient, and stress-free.
          </p>
          <p className="text-gray-700 text-lg mt-4 leading-relaxed">
            Whether you are a student in a hostel or managing a shared kitchen,
            Messelor ensures that everyone pays their fair share while
            maintaining complete transparency in all transactions.
          </p>
        </div>
        <div className="flex justify-center">
          <img
            src="hero_page.jpg"
            alt="About Messelor"
            className="rounded-2xl shadow-lg w-full md:w-96 object-cover"
          />
        </div>
      </div>

      {/* Core Values */}
      <div className="bg-white py-16 px-6 md:px-12">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-blue-600 mb-6">
            Our Core Values
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto mb-12">
            We stand on strong principles to ensure that shared living is fair
            and stress-free for everyone.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((val, idx) => {
              const Icon = val.icon;
              return (
                <Card
                  key={idx}
                  className="shadow-md hover:shadow-lg transition rounded-2xl"
                >
                  <CardContent className="p-6 flex flex-col items-center text-center">
                    <div className="w-14 h-14 flex items-center justify-center rounded-full bg-blue-100 text-blue-600 mb-4">
                      <Icon className="w-7 h-7" />
                    </div>
                    <h3 className="text-xl font-semibold">{val.title}</h3>
                    <p className="text-gray-600 mt-2">{val.desc}</p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </div>

      {/* Call To Action */}
      <div className="py-16 px-6 md:px-12 bg-gradient-to-r from-blue-500 to-indigo-400 text-white text-center">
        <h2 className="text-3xl font-bold">Join The Future of Mess Management</h2>
        <p className="mt-4 text-lg text-blue-100 max-w-2xl mx-auto">
          Be part of a smarter and fairer way to manage meals, expenses, and
          shared living.
        </p>
        <Link to="">
        <button className="cursor-pointer mt-6 px-8 py-3 bg-white text-blue-600 rounded-xl font-semibold hover:bg-blue-50 transition">
          Get Started
        </button>
        </Link>
      </div>
    </section>
  );
};

export default About;
