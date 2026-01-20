import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import Tasks from './pages/Tasks';
import Analytics from './pages/Analytics';
import Settings from './pages/Settings';
import NotFound from './pages/NotFound';
import Layout from './components/Layout';
import { TaskProvider } from './context/TaskContext';

import Onboarding from './pages/Onboarding';
import Roadmap from './pages/Roadmap';
import WorkRoom from './pages/WorkRoom';

function App() {
  return (
    <TaskProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/onboarding" element={<Onboarding />} />
          <Route path="/workroom" element={<WorkRoom />} />

          {/* Dashboard Routes */}
          <Route path="/app" element={<Layout><Dashboard /></Layout>} />
          <Route path="/app/tasks" element={<Layout><Tasks /></Layout>} />
          <Route path="/app/roadmap" element={<Layout><Roadmap /></Layout>} />
          <Route path="/app/analytics" element={<Layout><Analytics /></Layout>} />
          <Route path="/app/settings" element={<Layout><Settings /></Layout>} />

          {/* Fallback */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </TaskProvider>
  );
}

export default App;
