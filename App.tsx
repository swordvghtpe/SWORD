
import React from 'react';
import Navbar from './components/Navbar';
import Header from './components/Header';
import WelcomeMessage from './components/WelcomeMessage';
import Speakers from './components/Speakers';
import Agenda from './components/Agenda';
import Registration from './components/Registration';
import Venue from './components/Venue';
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
          <Registration />
          <Venue />
        </main>
        <Footer />
      </div>
    </LanguageProvider>
  );
};

export default App;
