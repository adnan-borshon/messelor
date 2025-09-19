import React from 'react'
import { FaChartLine, FaExclamationTriangle, FaBell, FaChartPie } from "react-icons/fa"

function AIBenefits() {
  const aiBenefitsData = [
    { icon: FaChartLine, title: "Cost Forecasting", desc: "Predict monthly expenses with trend analysis" },
    { icon: FaExclamationTriangle, title: "Anomaly Detection", desc: "Smart alerts for unusual expense patterns" },
    { icon: FaBell, title: "Smart Reminders", desc: "Never forget to log meals with AI reminders" },
    { icon: FaChartPie, title: "Nutrition Dashboard", desc: "Track nutritional intake and health metrics" },
  ]

  return (
    <section className="ai-benefits py-16 px-4 bg-gradient-to-r from-[#6a11cb] to-[#2575fc] text-white">
      <div className="container mx-auto flex flex-col items-center text-center">
        <div className="mb-12">
          <h1 className="text-3xl font-bold">AI-Powered Benefits</h1>
          <p className="text-lg text-gray-200 mt-2">
            Intelligent insights for smarter mess management
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 max-w-6xl w-full">
          {aiBenefitsData.map((benefit, index) => {
            const Icon = benefit.icon
            return (
              <div key={index} className="flex flex-col items-center text-center p-6">
                <div className="flex items-center justify-center w-16 h-16 rounded-full bg-white/20 mb-4">
                  <Icon className="text-3xl text-white" />
                </div>
                <h2 className="text-lg font-semibold">{benefit.title}</h2>
                <p className="text-gray-200 mt-2 text-sm">{benefit.desc}</p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

export default AIBenefits
