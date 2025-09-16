import React, { useState, type FormEvent } from "react";
import { Link } from "react-router-dom";
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from "react-icons/fa";
import { Button } from "@/Components/ui/button";

const Footer: React.FC = () => {
  const [email, setEmail] = useState<string>("");

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setEmail("");
    alert("Subscribed");
  };

  return (
    <section className="overflow-hidden bg-gray-900 mt-10 border-b-2 border-gray-600">
      <div className="container shrink grid lg:grid-cols-4 gap-3 p-4 border-t-2">
        {/* About */}
        <div className="flex flex-col gap-2">
          <h2 className="h2 text-white font-bold">About Messelor </h2>
          <p className="text-gray-300">
            Modern living for messes
          </p>
          {/* social icons */}
          <div className="social-links flex justify-start gap-10 mt-2 text-gray-300">
            <a href="https://www.facebook.com/messelor/" target="_blank" rel="noopener noreferrer" className="hover-effect-normal h-5 w-5">
              <FaFacebookF size={20} />
            </a>
            <a href="https://twitter.com/messelor/" target="_blank" rel="noopener noreferrer" className="hover-effect-normal h-5 w-5">
              <FaTwitter size={20} />
            </a>
            <a href="https://www.instagram.com/messelor/" target="_blank" rel="noopener noreferrer" className="hover-effect-normal h-5 w-5">
              <FaInstagram size={20} />
            </a>
            <a href="https://www.linkedin.com/company/messelor/" target="_blank" rel="noopener noreferrer" className="hover-effect-normal h-5 w-5">
              <FaLinkedinIn size={20} />
            </a>
          </div>
        </div>

        {/* Quick links */}
        <div className="flex flex-col gap-2 w-max">
          <h2 className="h2 text-white font-bold">Quick Links</h2>
          <Link to="/" className="text-gray-300 hover-effect-normal">Home</Link>
          <Link to="/about" className="text-gray-300 hover-effect-normal">About</Link>
          <Link to="/contact" className="text-gray-300 hover-effect-normal">Contact</Link>
        </div>

        {/* Legal */}
        <div className="flex flex-col gap-2 w-max">
          <h2 className="h2 text-white font-bold">LEGAL</h2>
          <Link to="/privacy-policy" className="text-gray-300 hover-effect-normal">Privacy Policy</Link>
          <Link to="/terms" className="text-gray-300 hover-effect-normal">Terms of Service</Link>
        </div>

        {/* Subscribe */}
        <div className="flex flex-col gap-2">
          <h2 className="h2 text-white font-bold">Subscribe</h2>
          <p className="text-gray-300">Stay updated with the latest news and events</p>
          <form onSubmit={handleSubmit}>
            <div className="flex flex-col">
              <input
                type="email"
                placeholder="Your email address"
                value={email}
                className="inputs !text-white border-2 px-2 py-1 rounded border-white"
                onChange={(e) => setEmail(e.target.value)}
                required
              />
           <Button className="mt-3 cursor-pointer">Subscribe</Button>
            </div>
          </form>
        </div>
      </div>

      <p className="text-gray-300 flex justify-center p-4">
        © 2025 Messelor. All rights Reserved.
      </p>
    </section>
  );
};

export default Footer;
