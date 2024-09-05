import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import './index.css';

const Dashboard = lazy(() => import('./components/Dashboard'));
const PatientManagement = lazy(() => import('./components/PatientManagement'));
const AppointmentManagement = lazy(() => import('./components/AppointmentManagement'));
const PatientPortal = lazy(() => import('./components/PatientPortal'));
const RecordReconciliation = lazy(() => import('./components/RecordReconciliation'));

const App = () => {
  return (
    <Router>
      <Navbar />
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/patients" element={<PatientManagement />} />
          <Route path="/appointments" element={<AppointmentManagement />} />
          <Route path="/portal" element={<PatientPortal />} />
          <Route path="/reconciliation" element={<RecordReconciliation />} />
        </Routes>
      </Suspense>
    </Router>
  );
};

export default App;
