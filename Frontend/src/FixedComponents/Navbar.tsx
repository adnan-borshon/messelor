import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/Components/ui/button"; 

export default function Navbar() {
  return (
    <div className="w-full flex items-center justify-between bg-white shadow-lg px-16 ">
      
     
      <div className="logo">
        <img
          className="h-16 w-40 object-contain"
          src="messelor_logo.png"
          alt="Messelor Logo"
        />
      </div>

      <div className="flex space-x-7">
        <Link to="/" className="text-gray-600 hover:text-gray-900 font-medium ">
          Home
        </Link>
        <Link to="/about" className="text-gray-600 hover:text-gray-900 font-medium ">
          About Us
        </Link>
        <Link to="/contact" className="text-gray-600 hover:text-gray-900 font-medium ">
          Contact
        </Link>
      </div>

      <div className="flex space-x-4">
        <Button variant="outline" className="cursor-pointer  border-2">Login</Button>
        <Button className="cursor-pointer" >Signup</Button>
      </div>
    </div>
  );
}
