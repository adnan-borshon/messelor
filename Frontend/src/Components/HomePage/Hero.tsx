import React from 'react'
import { Button } from '../ui/button'
import { Link } from 'react-router-dom'

function Hero() {
  return (
    <section className="hero mx-auto flex flex-col md:flex-row bg-gray-200 py-12 px-4 md:px-12 gap-8">
      {/* left */}
      <div className="w-full md:w-1/2 lg:pl-60 flex flex-col justify-center space-y-6">
        <div className="space-y-2">
          <h1 className="text-3xl md:text-4xl font-bold">Smart, Fair & AI-Powered</h1>
          <h1 className="text-3xl md:text-4xl text-blue-500 font-bold">Mess Management</h1>
        </div>
        <p className="text-base md:text-lg text-gray-800">
          Automating meals, expenses and billing with intelligent insights
        </p>
        <Link to="/login"> 
          <Button className="w-full md:w-40 py-4 cursor-pointer">Get Started</Button>
        </Link>
      </div>

      {/* right */}
      <div className="w-full md:w-1/2 flex items-center justify-center">
        <img
          className="max-h-72 md:max-h-96 object-contain rounded-2xl w-full md:w-auto"
          src="hero_page.jpg"
          alt="Hero"
        />
      </div>
    </section>
  )
}

export default Hero
