
import React, { useState } from 'react';
import { Speaker } from '../types';
import { useLanguage } from '../contexts/LanguageContext';

const speakersData: Speaker[] = [
  {
    name: 'Prof. Thomas Hummel',
    title: 'Professor, Smell & Taste Clinic',
    affiliation: 'Dept. of Otorhinolaryngology, University of Technology, Germany\n德國德勒斯登大學 嗅味覺中心',
    imageUrl: 'https://meee.com.tw/lNXtFZm.jpg',
  },
  {
    name: 'Dr. Bing-Hong Shen\n沈炳宏 醫師',
    title: 'Chief in Rhinology',
    affiliation: 'Dept. of Otorhinolaryngology\nKuang Tien General Hospital, Taichung, Taiwan\n光田醫院 耳鼻喉部鼻科主任',
    imageUrl: 'https://meee.com.tw/DJ2Adhb.jpg',
  },
  {
    name: 'Xinni Xu',
    title: 'Chief in Rhinology',
    affiliation: 'Dept. of Otolaryngology, National University Hospital, Singapore\n新加坡國立大學',
    imageUrl: 'https://meee.com.tw/6iEiSjW.jpg',
  },
  {
    name: 'Dr. Rong-Shan Jiang\n江榮山 醫師',
    title: 'Vice President for Research and Development',
    affiliation: 'Tungs\' Taichung Metroharbor Hospital, Taichung, Taiwan\n童綜合醫院 研發副院長',
    imageUrl: 'https://meee.com.tw/O5l75pm.jpg',
  },
  {
    name: 'Eri Mori',
    title: 'Associate Professor',
    affiliation: 'Dept. of Otorhinolaryngology, Jikei University of Medicine, Japan\n日本東京慈惠會醫學大學',
    imageUrl: 'https://meee.com.tw/g4TyYoP.jpg',
  },
  {
    name: 'Dr. Yun-Ting Chao\n趙勻廷 醫師',
    title: 'Chief in Rhinology',
    affiliation: 'Dep. of Otorhinolaryngology\nTaipei Veterans General Hospital, Taipei, Taiwan\n臺北榮民總醫院 耳鼻喉部鼻科主任',
    imageUrl: 'https://meee.com.tw/qJfO68E.jpg',
  },
  {
    name: 'Dr. Ming-Ying Lan\n藍敏瑛 醫師',
    title: 'Professor and Attending Physician',
    affiliation: 'Dep. of Otorhinolaryngology\nTaipei Veterans General Hospital, Taipei, Taiwan\n臺北榮民總醫院 耳鼻喉頭頸醫學部 教授/主治醫師',
    imageUrl: 'https://meee.com.tw/XvmEusJ.jpg',
  },
  {
    name: 'Dr. Chien-Fu Yeh\n葉建甫 醫師',
    title: 'Attending Physician in Rhinology',
    affiliation: 'Dep. of Otorhinolaryngology\nTaipei Veterans General Hospital, Taipei, Taiwan\n臺北榮民總醫院 耳鼻喉頭頸醫學部 主治醫師',
    imageUrl: 'https://meee.com.tw/eBILrmF.jpg',
  },
  {
    name: 'Dr. Li-Ting Hong\n洪莉婷 醫師',
    title: 'Attending Physician in Rhinology',
    affiliation: 'Dep. of Otorhinolaryngology\nTaipei Veterans General Hospital, Taipei, Taiwan\n臺北榮民總醫院 耳鼻喉頭頸醫學部 主治醫師',
    imageUrl: 'https://meee.com.tw/8MxndVQ.jpg',
  },
];

const SpeakerImage: React.FC<{ src: string; alt: string; className?: string }> = ({ src, alt, className }) => {
  const [error, setError] = useState(false);

  if (error) {
    return (
      <div className={`${className} bg-gray-200 flex flex-col items-center justify-center border-2 border-dashed border-gray-300 p-2 overflow-hidden`}>
        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-gray-400 mb-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
        </svg>
      </div>
    );
  }

  return (
    <img
      className={className}
      src={src}
      alt={alt}
      onError={() => setError(true)}
    />
  );
};

const SpeakerCard: React.FC<{ speaker: Speaker }> = ({ speaker }) => (
  <div className="flex flex-col h-full bg-white/80 backdrop-blur-md p-8 rounded-[2rem] shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 text-center border border-gray-200 group">
    <div className="flex-shrink-0">
        <SpeakerImage
            className="w-36 h-36 rounded-full mx-auto mb-6 object-cover object-top ring-4 ring-gray-100 group-hover:ring-blue-100 transition-all duration-500 shadow-md"
            src={speaker.imageUrl}
            alt={speaker.name}
        />
    </div>
    <div className="flex-grow flex flex-col">
        <h3 className="text-2xl font-black text-gray-900 whitespace-pre-line mb-3 tracking-tight group-hover:text-blue-700 transition-colors min-h-[3rem] flex items-center justify-center">{speaker.name}</h3>
        <p className="text-lg text-blue-800 font-bold mb-4 min-h-[1.5em] bg-blue-50/50 py-1 rounded-full border border-blue-100 flex items-center justify-center px-4">
          {speaker.title}
        </p>
        <div className="border-t border-gray-100 pt-4 mt-2">
            <p className="text-md text-gray-600 font-bold whitespace-pre-line leading-relaxed">{speaker.affiliation}</p>
        </div>
    </div>
  </div>
);

const Speakers: React.FC = () => {
  const { t } = useLanguage();
  const bgImg = "https://meee.com.tw/3DYB4ho";

  return (
    <section id="speakers" className="relative py-24 overflow-hidden bg-[#f5f5f7]">
      {/* Background Image Layer with Grey-White Tint */}
      <div className="absolute inset-0 z-0">
        <img 
          src={bgImg} 
          alt="Background" 
          className="w-full h-full object-cover opacity-[0.08] grayscale brightness-110" 
        />
        {/* Soft Grey Gradients for smooth blending */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#f5f5f7] via-transparent to-[#f5f5f7]"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(255,255,255,0.8)_0%,_transparent_70%)]"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-black text-gray-900 sm:text-5xl tracking-tighter">
            {t('研討會講師', 'Conference Speakers')}
          </h2>
          <p className="text-xl md:text-2xl font-black text-gray-400 mt-2 uppercase tracking-[0.2em]">
            Conference Speakers
          </p>
          <div className="w-16 h-1 bg-blue-600/30 mx-auto mt-6 rounded-full"></div>
          
          <div className="mt-8 max-w-2xl mx-auto space-y-4">
            <p className="text-xl text-gray-700 font-black leading-relaxed">
              集結國內外頂尖專家，分享嗅覺領域的前沿知識與臨床實務經驗
            </p>
            <p className="text-lg text-gray-400 font-bold leading-relaxed italic">
              {t(
                '', 
                'Gathering leading national and international experts to present recent advances and clinical practices in olfactory research.'
              )}
            </p>
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
          {speakersData.map((speaker, index) => (
            <SpeakerCard key={index} speaker={speaker} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Speakers;
