import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import WizardPage from './pages/WizardPage';
import MerchantDashboard from './pages/MerchantDashboard';
import PublicBookingPage from './pages/PublicBookingPage';
import BookingTrackerPage from './pages/BookingTrackerPage';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* SaaS Landing Page */}
        <Route path="/" element={<LandingPage />} />

        {/* Wizard Store Builder */}
        <Route path="/build" element={<WizardPage />} />

        {/* Merchant Dashboard Portal */}
        <Route path="/merchant/:slug" element={<MerchantDashboard />} />

        {/* Public Client Booking Website */}
        <Route path="/b/:slug" element={<PublicBookingPage />} />
        <Route path="/booking/:slug" element={<PublicBookingPage />} />

        {/* Client Booking Status Tracker */}
        <Route path="/track" element={<BookingTrackerPage />} />
      </Routes>
    </BrowserRouter>
  );
}
