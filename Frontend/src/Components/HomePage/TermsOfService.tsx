import React from "react";
import { Link } from "react-router-dom";

const TermsOfService: React.FC = () => {
  return (
    <section className="w-full min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-r from-blue-500 to-indigo-400 text-white py-16 px-6 md:px-20">
        <div className="max-w-5xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold">Terms of Service</h1>
          <p className="mt-4 text-lg md:text-xl text-blue-100">
            Last Updated: September 19, 2025
          </p>
        </div>
      </div>

      {/* Terms Content */}
      <div className="max-w-5xl mx-auto px-6 md:px-12 py-16 space-y-8 text-gray-700">
        <div>
          <h2 className="text-2xl font-bold text-blue-600 mb-2">
            1. Acceptance of Terms
          </h2>
          <p>
            By accessing or using Messelor ("the Service"), you agree to comply
            with and be bound by these Terms of Service. The Service is designed
            for bachelor messes, hostels, and shared accommodations to automate
            meal logging, expense tracking, and billing.
          </p>
        </div>

        <div>
          <h2 className="text-2xl font-bold text-blue-600 mb-2">
            2. User Roles and Responsibilities
          </h2>
          <ul className="list-disc pl-6 space-y-2">
            <li>
              <strong>Members:</strong> Must accurately log meals and review
              personal data.
            </li>
            <li>
              <strong>Managers:</strong> Responsible for inputting expenses and
              generating bills.
            </li>
            <li>
              <strong>Admins:</strong> Oversee mess operations and user
              management.
            </li>
            <li>
              <strong>Super Admin:</strong> Has system-wide control and
              configuration access.
            </li>
          </ul>
          <p className="mt-2">
            Users must not misuse the Service or attempt to access unauthorized
            data.
          </p>
        </div>

        <div>
          <h2 className="text-2xl font-bold text-blue-600 mb-2">
            3. AI-Powered Features
          </h2>
          <p>
            The Service uses AI for cost forecasting, anomaly detection, and
            nutritional analysis. AI insights are based on historical data and
            may not be entirely accurate. Users should exercise judgment when
            relying on these features.
          </p>
        </div>

        <div>
          <h2 className="text-2xl font-bold text-blue-600 mb-2">
            4. Data Ownership and Usage
          </h2>
          <p>
            Users retain ownership of their data but grant Messelor a license to
            process it for Service functionality. Aggregated, anonymized data
            may be used for improving AI models and analytics.
          </p>
        </div>

        <div>
          <h2 className="text-2xl font-bold text-blue-600 mb-2">
            5. Termination
          </h2>
          <p>
            Accounts may be suspended for violations of these terms or
            fraudulent activity.
          </p>
        </div>

        <div>
          <h2 className="text-2xl font-bold text-blue-600 mb-2">
            6. Limitation of Liability
          </h2>
          <p>
            Messelor is not liable for disputes arising from meal logging errors
            or billing inaccuracies. Users are responsible for verifying data.
          </p>
        </div>

        <div>
          <h2 className="text-2xl font-bold text-blue-600 mb-2">
            7. Governing Law
          </h2>
          <p>
            These terms are governed by the laws of Bangladesh, where Therap BD
            Hackathon 2025 is hosted.
          </p>
        </div>
      </div>

      {/* CTA Section */}
      <div className="py-16 px-6 md:px-12 bg-gradient-to-r from-blue-500 to-indigo-400 text-white text-center">
        <h2 className="text-3xl font-bold">Need Assistance?</h2>
        <p className="mt-4 text-lg text-blue-100 max-w-2xl mx-auto">
          If you have any questions about our Terms of Service, feel free to
          contact our support team.
        </p>
        <Link to="/contact">
        <button className="mt-6 px-8 py-3 cursor-pointer bg-white text-blue-600 rounded-xl font-semibold hover:bg-blue-50 transition">
          Contact Support
        </button>
        </Link>
      </div>
    </section>
  );
};

export default TermsOfService;
