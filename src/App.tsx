import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navigation from './components/Navigation';
import Home from './pages/Home';
import PlayerPage from './pages/PlayerPage';
import VideosPage from './pages/VideosPage';
import GameRecap from './pages/GameRecap';
import NotFound from './pages/NotFound';
import PrivacyPolicy from './pages/PrivacyPolicy';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <Navigation />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/player/caitlin-clark" element={<PlayerPage />} />
          <Route path="/videos" element={<VideosPage />} />
          <Route path="/recap/:gameId" element={<GameRecap />} />
          <Route path="/privacy" element={<PrivacyPolicy />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;