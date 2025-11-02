import React from 'react';

const TestimonialCard = ({ quote, name, role, initials }) => (
  <div className="bg-white p-8 rounded-xl shadow-lg relative overflow-hidden">
    {/* Decorative Quote Icon */}
    <svg className="absolute top-4 right-4 w-24 h-24 text-gray-100 opacity-80 z-0 transform -rotate-12" fill="currentColor" viewBox="0 0 24 24">
      <path d="M6 17h3l2-4V7H5v6h3l-2 4zm8 0h3l2-4V7h-6v6h3l-2 4z" />
    </svg>
    
    {/* Card Content */}
    <div className="relative z-10">
      <p className="text-lg text-gray-700 italic mb-6">"{quote}"</p>
      <div className="flex items-center">
        {/* Avatar */}
        <span className="h-12 w-12 rounded-full bg-teal-100 flex items-center justify-center text-teal-700 font-semibold text-xl">
          {initials}
        </span>
        {/* Details */}
        <div className="ml-4">
          <p className="font-semibold text-gray-900">{name}</p>
          <p className="text-sm text-orange-600 font-medium">{role}</p>
        </div>
      </div>
    </div>
  </div>
);

export default TestimonialCard;