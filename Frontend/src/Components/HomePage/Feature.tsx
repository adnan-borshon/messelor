import React from 'react'
import { FaUtensils, FaMoneyBillWave, FaFileInvoiceDollar, FaChartLine } from "react-icons/fa"

function Feature() {
  const featuresData = [
    { icon: FaUtensils, title: "Daily Meal Logging", desc: "Simple and fast meal entry with smart tracking" },
    { icon: FaMoneyBillWave, title: "Smart Bazar Tracking", desc: "Record expenses transparently with receipt scanning" },
    { icon: FaFileInvoiceDollar, title: "Automated Billing", desc: "Accurate and fair monthly bills generated automatically" },
    { icon: FaChartLine, title: "AI Insights", desc: "Cost forecasting, reminders and nutrition analysis" },
  ]

  return (
    <section className="features py-16 px-4">
      <div className="container mx-auto flex flex-col items-center text-center">
        <div className="mb-10">
          <h1 className="text-3xl font-bold text-blue-500">Powerful Features</h1>
          <p className="text-gray-600">Everything you need for efficient mess management</p>
        </div>

        <div className="featureList grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 w-full max-w-6xl">
          {featuresData.map((feature, index) => {
            const Icon = feature.icon
            return (
              <div
                key={index}
                className="featureCard flex flex-col items-center p-6 rounded-xl shadow-md hover:shadow-lg transition bg-white"
              >
                <Icon className="text-[#2b7fff] w-12 h-12 mb-4" />
                <h2 className="text-xl font-semibold mb-2">{feature.title}</h2>
                <p className="text-gray-500">{feature.desc}</p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

export default Feature
