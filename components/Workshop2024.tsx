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
            {t('影片介紹', 'Video')}
          </h2>
          <div id="workshop2024-divider" className="w-12 h-1 bg-blue-600/30 mx-auto mt-3 rounded-full"></div>
          <p id="workshop2024-subtitle" className="mt-3 text-xs md:text-base text-gray-500 font-bold max-w-2xl mx-auto">
            {t('歡迎觀看歷年工作坊之精彩影片與課程紀錄', 'Watch the highlights and recorded lectures from our workshops.')}
          </p>
        </div>

        <div className="space-y-16">
          {/* 2026 Video Container */}
          <div id="workshop2026-video-container" className="max-w-4xl mx-auto px-2 md:px-0">
            <div className="mb-6 text-center">
              <h3 className="text-sm md:text-xl font-black text-blue-600 tracking-tight bg-blue-50 inline-block px-4 py-2 rounded-xl border border-blue-100 shadow-sm">
                {t('20260627 工作坊之精采影片與課程紀錄', 'SWORD-2026 conference and workshop')}
              </h3>
            </div>
            <div id="workshop2026-video-aspect" className="relative aspect-video rounded-[1.5rem] md:rounded-[2rem] overflow-hidden shadow-2xl border-4 md:border-8 border-white bg-black transition-transform duration-500 hover:scale-[1.01]">
              <iframe
                id="workshop2026-video-iframe"
                className="absolute inset-0 w-full h-full"
                src="https://www.youtube.com/embed/VJ4rqwWcCjY"
                title="SWORD-2026 Video"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
              ></iframe>
            </div>
          </div>

          {/* 2024 Video Container */}
          <div id="workshop2024-video-container" className="max-w-4xl mx-auto px-2 md:px-0">
            <div className="mb-6 text-center">
              <h3 className="text-sm md:text-xl font-black text-gray-500 tracking-tight bg-gray-100 inline-block px-4 py-2 rounded-xl border border-gray-200 shadow-sm">
                {t('2024 年工作坊之精彩影片與課程紀錄', '2024 TRS pre-congress olfactory workshop')}
              </h3>
            </div>
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
      </div>
    </section>
  );
};

export default Workshop2024;
