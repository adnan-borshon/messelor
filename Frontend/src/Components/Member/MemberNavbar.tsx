import React from 'react'
import { Button } from '../ui/button'
import { Link } from 'react-router-dom'

export default function MemberNavbar() {
  return (
     <div className="flex items-center justify-evenly bg-white shadow-lg">
      
     
      <div className="logo">
        <Link to="/">
        <img
          className="h-16 w-40 object-contain"
          src="/messelor_logo.png"
          alt="Messelor Logo"
          />
          </Link>
      </div>

      <div className="flex space-x-7">
        <Link to="/dashboard" className="text-gray-600 hover:text-gray-900 font-medium ">
          Dashboard
        </Link>
         <Link to="log-meal" className="text-gray-600 hover:text-gray-900 font-medium ">
          Log Meal
        </Link>
         <Link to="billing" className="text-gray-600 hover:text-gray-900 font-medium ">
          Billing
        </Link>
         <Link to="ai-insights" className="text-gray-600 hover:text-gray-900 font-medium ">
          Ai Insights
        </Link>
         <Link to="community" className="text-gray-600 hover:text-gray-900 font-medium ">
          Community
        </Link>
        <Link to="about" className="text-gray-600 hover:text-gray-900 font-medium ">
          About Us
        </Link>
        <Link to="/contact" className="text-gray-600 hover:text-gray-900 font-medium ">
          Contact
        </Link>
      </div>

      {/* <div className="flex space-x-4">
    <Link to="/login">
          <Button variant="outline" className="cursor-pointer border-2">
            Login
          </Button>
        </Link>
        <Link to="/signup">
        <Button className="cursor-pointer" >Signup</Button>
        </Link>
      </div> */}
    </div>
  )
}
