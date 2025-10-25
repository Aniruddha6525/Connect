import React from 'react';
import { Navigate } from 'react-router-dom';
import LoadingImg from '../assets/Loading.png';

const HomePage = ({ userRole, user }) => {
  // This check is mostly handled by your ProtectedRoute, but it's good for safety.
  if (!user) {
    return <Navigate to="/" />;
  }

  // If the user's role hasn't been determined yet, show a loading message
  // instead of redirecting immediately.
  if (!userRole) {
    return (
      <div className="flex justify-center items-center h-screen">
        <img src={LoadingImg} alt="Loading dashboard" className="w-28 sm:w-36 md:w-48 lg:w-56 object-contain" />
      </div>
    );
  }

  // Once the role is confirmed, redirect to the correct page.
  if (userRole === 'mentor') {
    return <Navigate to="/mentees" />;
  }

  // By default, redirect to the mentee dashboard.
  return <Navigate to="/mentors" />;
};

export default HomePage;