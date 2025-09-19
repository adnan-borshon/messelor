import React from "react";
import { Link } from "react-router-dom";

const PrivacyPolicy: React.FC = () => {
  return (
    <section className="w-full min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-r from-blue-500 to-indigo-400 text-white py-16 px-6 md:px-20">
        <div className="max-w-5xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold">Privacy Policy</h1>
          <p className="mt-4 text-lg md:text-xl text-blue-100">
            Last Updated: September 19, 2025
          </p>
        </div>
      </div>

      {/* Policy Content */}
      <div className="max-w-5xl mx-auto px-6 md:px-12 py-16 space-y-8 text-gray-700">
        <div>
          <h2 className="text-2xl font-bold text-blue-600 mb-2">
            1. Information We Collect
          </h2>
          <ul className="list-disc pl-6 space-y-2">
            <li>
              <strong>Personal Data:</strong> Names, emails, and roles
              (Admin/Manager/Member) during registration.
            </li>
            <li>
              <strong>Usage Data:</strong> Meal logs, expense entries, and
              AI-generated insights (e.g., nutritional analysis).
            </li>
            <li>
              <strong>Technical Data:</strong> IP addresses and browser types
              for security purposes.
            </li>
          </ul>
        </div>

        <div>
          <h2 className="text-2xl font-bold text-blue-600 mb-2">
            2. How We Use Information
          </h2>
          <ul className="list-disc pl-6 space-y-2">
            <li>
              To provide core features (meal logging, billing) and AI-driven
              insights (cost forecasting, anomaly detection).
            </li>
            <li>
              To send reminders and notifications via web/mobile interfaces.
            </li>
            <li>
              To improve Service functionality and user experience.
            </li>
          </ul>
        </div>

        <div>
          <h2 className="text-2xl font-bold text-blue-600 mb-2">
            3. Data Sharing and Disclosure
          </h2>
          <p>
            Data is shared only within the same mess group for transparency
            (e.g., meal counts in public stats).
          </p>
          <ul className="list-disc pl-6 space-y-2 mt-2">
            <li>
              <strong>Third-Party Services:</strong> We use cloud providers for
              hosting and AI processing, ensuring compliance with data
              protection laws.
            </li>
            <li>
              <strong>Legal Compliance:</strong> Data may be disclosed if
              required by law.
            </li>
          </ul>
        </div>

        <div>
          <h2 className="text-2xl font-bold text-blue-600 mb-2">
            4. Data Security
          </h2>
          <p>
            Encryption and access controls protect user data. Regular security
            audits are conducted to prevent breaches.
          </p>
        </div>

        <div>
          <h2 className="text-2xl font-bold text-blue-600 mb-2">5. User Rights</h2>
          <p>
            Users can access, correct, or delete their data via dashboards.
            Requests to export data (PDF/CSV) are supported.
          </p>
        </div>

        <div>
          <h2 className="text-2xl font-bold text-blue-600 mb-2">
            6. AI and Automated Processing
          </h2>
          <p>
            AI modules process data for forecasting and nutrition analysis.
            Users can opt out of non-essential AI features.
          </p>
        </div>

        <div>
          <h2 className="text-2xl font-bold text-blue-600 mb-2">
            7. Cookies and Tracking
          </h2>
          <p>
            Cookies are used for authentication and session management. Users
            can disable cookies but may lose functionality.
          </p>
        </div>

        <div>
          <h2 className="text-2xl font-bold text-blue-600 mb-2">
            8. Children’s Privacy
          </h2>
          <p>
            The Service is not intended for users under 13. If discovered, such
            accounts will be deleted.
          </p>
        </div>

        <div>
          <h2 className="text-2xl font-bold text-blue-600 mb-2">
            9. Changes to This Policy
          </h2>
          <p>
            Updates will be notified via email or in-app alerts. Continued use
            implies acceptance.
          </p>
        </div>

        <div>
          <h2 className="text-2xl font-bold text-blue-600 mb-2">
            10. Contact Information
          </h2>
          <p>
            For questions, contact:{" "}
            <a
              href="mailto:pingpong@hackathon.therapbd.com"
              className="text-blue-600 underline"
            >
              pingpong@hackathon.therapbd.com
            </a>
          </p>
        </div>
      </div>

      {/* CTA Section */}
      <div className="py-16 px-6 md:px-12 bg-gradient-to-r from-blue-500 to-indigo-400 text-white text-center">
        <h2 className="text-3xl font-bold">Your Privacy Matters</h2>
        <p className="mt-4 text-lg text-blue-100 max-w-2xl mx-auto">
          We are committed to protecting your data and ensuring transparency in
          every step of mess management.
        </p>
        <Link to="/">
        <button className="mt-6 cursor-pointer px-8 py-3 bg-white text-blue-600 rounded-xl font-semibold hover:bg-blue-50 transition">
          Back to Home
        </button>
        </Link>
      </div>
    </section>
  );
};

export default PrivacyPolicy;
