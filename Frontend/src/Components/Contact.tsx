import React, { useState, type FormEvent } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Button } from "./ui/button";

const Contact: React.FC = () => {
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [message, setMessage] = useState<string>("");

  const navigate = useNavigate();
  const location = useLocation();

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

 
    if (location.pathname === "/contact") {
      navigate(
        `/contact?name=${encodeURIComponent(
          name
        )}&email=${encodeURIComponent(email)}&message=${encodeURIComponent(
          message
        )}`
      );
    }


    setName("");
    setEmail("");
    setMessage("");


  };

  return (
    <>
      {/* Heading */}
      <div className="contact-header w-full flex flex-col justify-center items-center text-center mt-10">
        <h1 className="text-3xl font-extrabold  text-blue-500 mb-4">
          Contact Us
        </h1>
        <p className="p1 mx-5 lg:w-[40%] text-gray-800">
          Have questions, suggestions, or need assistance? Fill out the form
          below and our team will get back to you shortly.
        </p>
      </div>

      <section
        id="contact"
        className="max-w-3xl mx-auto py-6 px-4 sm:px-6 lg:px-8"
      >
        {/* Form */}
        <form className="space-y-6" onSubmit={handleSubmit}>
          {/* Name field */}
          <div>
            <label htmlFor="name" className="block text-black">
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              placeholder="Your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="mt-1 block w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-gray-800 placeholder-gray-400 focus:border-primary focus:ring-primary focus:outline-none focus:ring-2"
            />
          </div>

          {/* Email field */}
          <div>
            <label htmlFor="email" className="block text-black">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 block w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-gray-800 placeholder-gray-400 focus:border-primary focus:ring-primary focus:outline-none focus:ring-2"
            />
          </div>

          {/* Message field */}
          <div>
            <label htmlFor="message" className="block text-black">
              Message
            </label>
            <textarea
              id="message"
              name="message"
              rows={4}
              placeholder="How can we help you?"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="mt-1 block w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-gray-800 placeholder-gray-400 focus:border-primary focus:ring-primary focus:outline-none focus:ring-2"
            ></textarea>
          </div>

          {/* Submit button */}
          <div className="">
       <Button className="w-full cursor-pointer">Send Message</Button>
          </div>
        </form>
      </section>
    </>
  );
};

export default Contact;
