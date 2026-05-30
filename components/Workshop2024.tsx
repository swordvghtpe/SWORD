import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';

const Workshop2024: React.FC = () => {
  const { t } = useLanguage();

  return (
    <section id="workshop2024" className="py-16 md:py-24 bg-slate-50 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div id="workshop2024-header" className="text-center mb-10">
          <h2 id="workshop2024-title" className="text-xl md:text-3xl font-black text-gray-900 tracking-tighter whitespace-nowrap">
            {t('2024 TRS pre-congress olfactory workshop', '2024 TRS pre-congress olfactory workshop')}
          </h2>
          <div id="workshop2024-divider" className="w-12 h-1 bg-blue-600/30 mx-auto mt-3 rounded-full"></div>
          <p id="workshop2024-subtitle" className="mt-3 text-xs md:text-base text-gray-500 font-bold max-w-2xl mx-auto">
            {t('歡迎觀看 2024 年工作坊之精彩影片與課程紀錄', 'Watch the highlights and recorded lectures from our 2024 TRS pre-congress olfactory workshop.')}
          </p>
        </div>

        {/* Video Player Container */}
        <div id="workshop2024-video-container" className="max-w-4xl mx-auto px-2 md:px-0">
          <div id="workshop2024-video-aspect" className="relative aspect-video rounded-[1.5rem] md:rounded-[2rem] overflow-hidden shadow-2xl border-4 md:border-8 border-white bg-black transition-transform duration-500 hover:scale-[1.01]">
            <iframe
              id="workshop2024-video-iframe"
              className="absolute inset-0 w-full h-full"
              src="https://www.youtube.com/embed/LQDJwUkamtU"
              title="2024-Workshop Video"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            ></iframe>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Workshop2024;
