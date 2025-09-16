import React from 'react'
import { Button } from '../ui/button'

function Hero() {
  return (
    <section className="hero w-full flex bg-gray-200 py-12">
 
      <div className="w-1/2 flex flex-col justify-center pl-30 space-y-6">
        <div className="space-y-2">
          <h1 className="text-4xl font-bold">Smart, Fair & AI-Powered</h1>
          <h1 className="text-4xl text-blue-500 font-bold">Mess Management</h1>
        </div>
        <p className="text-lg text-gray-800">
          Automating meals, expenses and billing with intelligent insights
        </p>
        <Button className="w-30 py-5">Get Started</Button>
      </div>

     
      <div className="w-1/2 flex items-center justify-center">
        <img
          className="max-h-96 object-contain rounded-2xl"
          src="hero_page.jpg"
          alt="Hero"
        />
      </div>
    </section>
  )
}

export default Hero