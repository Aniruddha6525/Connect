import React from 'react';
import { Link } from 'react-router-dom';
const privacyImg = '/images/PrivacyPolicy.png';

const PrivacyPage = () => {
  const lastUpdated = 'October 25, 2025';
  return (
    <div className="bg-gray-50 min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto bg-white p-8 sm:p-12 rounded-lg shadow-md">
        <div className="text-center mb-12">
          <img src={privacyImg} alt="Privacy" className="h-36 sm:h-48 mx-auto" />
          <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mt-4">Privacy Policy</h1>
          <p className="mt-2 text-sm text-gray-500">Last Updated: {lastUpdated}</p>
        </div>

        <section className="mb-8 prose prose-indigo max-w-none">
          <h2>Overview</h2>
          <p>
            We collect and process personal data to provide and improve our services. This policy explains what data we collect, why we collect it, and how you can manage it.
          </p>
        </section>

        <section className="mb-8 prose prose-indigo max-w-none">
          <h2>Data We Collect</h2>
          <p>
            Information you provide during registration, usage data, and cookies are used to operate and personalize the service.
          </p>
        </section>

        <div className="mt-12 text-center">
          <Link to="/" className="text-orange-600 hover:text-orange-500 font-medium">&larr; Back to Home</Link>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPage;
