
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
import VenueLocation from './components/VenueLocation';
import Footer from './components/Footer';
import { LanguageProvider } from './contexts/LanguageContext';

const App: React.FC = () => {
  return (
    <LanguageProvider>
      <div className="font-sans text-gray-800">
        <Navbar />
        <Header />
        <main>
          <WelcomeMessage />
          <Speakers />
          <Agenda />
          <Workshop2024 />
          <Registration />
          <Venue />
          <VenueLocation />
          <FloorMap />
          <Sponsors />
        </main>
        <Footer />
      </div>
    </LanguageProvider>
  );
};

export default App;
