
import React from 'react';
import Navbar from './components/Navbar';
import Header from './components/Header';
import WelcomeMessage from './components/WelcomeMessage';
import Workshop2024 from './components/Workshop2024';
import Speakers from './components/Speakers';
import Agenda from './components/Agenda';
import FloorMap from './components/FloorMap';
import Sponsors from './components/Sponsors';
import Registration from './components/Registration';
import Venue from './components/Venue';
import TrafficInfo from './components/TrafficInfo';
import VenueLocation from './components/VenueLocation';
import EarlyBirdBadge from './components/EarlyBirdBadge';
import Footer from './components/Footer';
import { LanguageProvider } from './contexts/LanguageContext';

const App: React.FC = () => {
  return (
    <LanguageProvider>
      <div className="font-sans text-gray-800">
        <Navbar />
        <Header />
        <main>
          <Workshop2024 />
          <WelcomeMessage />
          <Speakers />
          <Agenda />
          <Registration />
          <Venue />
          <TrafficInfo />
          <VenueLocation />
          <FloorMap />
          <Sponsors />
        </main>
        <EarlyBirdBadge />
        <Footer />
      </div>
    </LanguageProvider>
  );
};

export default App;
