
import React, { useState } from 'react';
import { Speaker } from '../types';
import { useLanguage } from '../contexts/LanguageContext';

const speakersData: Speaker[] = [
  {
    nameZh: 'Prof. Thomas Hummel',
    nameEn: 'Prof. Thomas Hummel',
    titleZh: '教授/主任',
    titleEn: 'Professor / Director',
    affiliationZh: '德國德勒斯登大學 耳鼻喉科部\n嗅味覺中心',
    affiliationEn: 'Smell & Taste Clinic\nDept. of Otorhinolaryngology\nUniversity of Technology, Germany',
    imageUrl: 'https://meee.com.tw/lNXtFZm.jpg',
  },
  {
    nameZh: 'Prof. Eri Mori',
    nameEn: 'Prof. Eri Mori',
    titleZh: '副教授',
    titleEn: 'Associate Professor',
    affiliationZh: '日本東京慈惠醫學大學\n耳鼻喉科',
    affiliationEn: 'Dept. of Otorhinolaryngology\nJikei University of Medicine, Japan',
    imageUrl: 'https://meee.com.tw/g4TyYoP.jpg',
  },
  {
    nameZh: 'Dr. Xinni Xu',
    nameEn: 'Dr. Xinni Xu',
    titleZh: '科主任',
    titleEn: 'Director in Rhinology',
    affiliationZh: '新加坡國立大學附設醫院\n耳鼻喉科',
    affiliationEn: 'Dept. of Otolaryngology\nNational University Hospital, Singapore',
    imageUrl: 'https://meee.com.tw/6iEiSjW.jpg',
  },
  {
    nameZh: '趙勻廷 教授',
    nameEn: 'Prof. Yun-Ting Chao',
    titleZh: 'SWORD-2026\n大會會長\n科主任 / 主治醫師',
    titleEn: 'SWORD-2026\nConference Chair\nDirector in Rhinology / Physician',
    affiliationZh: '臺北榮民總醫院\n耳鼻喉頭頸醫學部 鼻頭頸科',
    affiliationEn: 'Div. of Rhinology\nDept. of Otorhinolaryngology\nTaipei Veterans General Hospital, Taipei, Taiwan',
    imageUrl: 'https://meee.com.tw/qJfO68E.jpg',
  },
  {
    nameZh: '江榮山 教授',
    nameEn: 'Prof. Rong-Shan Jiang',
    titleZh: '副院長',
    titleEn: 'Vice President',
    affiliationZh: '台中童綜合醫院\n研發創新中心',
    affiliationEn: "Research & Innovation Center\nTungs' Taichung Metroharbor Hospital\nTaichung, Taiwan",
    imageUrl: 'https://meee.com.tw/O5l75pm.jpg',
  },
  {
    nameZh: '沈炳宏 教授',
    nameEn: 'Prof. Bing-Hung Shen',
    titleZh: '科主任',
    titleEn: 'Director in Rhinology',
    affiliationZh: '台中光田綜合醫院\n耳鼻喉部 鼻頭頸科',
    affiliationEn: 'Div. of Rhinology\nDept. of Otorhinolaryngology\nKuang Tien General Hospital, Taichung, Taiwan',
    imageUrl: 'https://meee.com.tw/DJ2Adhb.jpg',
  },
  {
    nameZh: '藍敏瑛 教授',
    nameEn: 'Prof. Ming-Ying Lan',
    titleZh: 'SWORD-2026\n榮譽會長\n主治醫師',
    titleEn: 'SWORD-2026\nHonorary Chair\nPhysician',
    affiliationZh: '臺北榮民總醫院\n耳鼻喉頭頸醫學部 鼻頭頸科',
    affiliationEn: 'Div. of Rhinology\nDept. of Otorhinolaryngology\nTaipei Veterans General Hospital, Taipei, Taiwan',
    imageUrl: 'https://meee.com.tw/XvmEusJ.jpg',
  },
  {
    nameZh: '葉建甫 醫師',
    nameEn: 'Dr. Chien-Fu Yeh',
    titleZh: '主治醫師',
    titleEn: 'Physician',
    affiliationZh: '臺北榮民總醫院\n耳鼻喉頭頸醫學部 鼻頭頸科',
    affiliationEn: 'Div. of Rhinology\nDept. of Otorhinolaryngology\nTaipei Veterans General Hospital, Taipei, Taiwan',
    imageUrl: 'https://meee.com.tw/eBILrmF.jpg',
  },
  {
    nameZh: '洪莉婷 醫師',
    nameEn: 'Dr. Li-Ting Hong',
    titleZh: '主治醫師',
    titleEn: 'Physician',
    affiliationZh: '臺北榮民總醫院\n耳鼻喉頭頸醫學部 鼻頭頸科',
    affiliationEn: 'Div. of Rhinology\nDept. of Otorhinolaryngology\nTaipei Veterans General Hospital, Taipei, Taiwan',
    imageUrl: 'https://meee.com.tw/8MxndVQ.jpg',
  },
  {
    nameZh: '王勁傑 醫師',
    nameEn: 'Dr. Jing-Jie Wang',
    titleZh: '主治醫師',
    titleEn: 'Physician',
    affiliationZh: '臺中榮民總醫院\n耳鼻喉部 鼻頭頸科',
    affiliationEn: 'Div. of Rhinology\nDept. of Otorhinolaryngology\nTaichung Veterans General Hospital, Taichung, Taiwan',
    imageUrl: 'https://meee.com.tw/jBeA4F3.jpg',
  },
  {
    nameZh: '林高宗 醫師',
    nameEn: 'Dr. Kao-Tsung Li',
    titleZh: '主治醫師',
    titleEn: 'Physician',
    affiliationZh: '國立臺灣大學附設醫院\n雲林分院 耳鼻喉科',
    affiliationEn: 'Div. of Rhinology\nDept. of Otorhinolaryngology\nNational Taiwan University Hospital Yunlin Branch, Yunlin, Taiwan',
    imageUrl: 'https://meee.com.tw/o8opkdo.jpg',
  },
  {
    nameZh: '劉秀月 副教授',
    nameEn: 'Prof. Hsiu-Yueh Liu',
    titleZh: '副教授',
    titleEn: 'Associate Professor',
    affiliationZh: '高雄醫學大學\n口腔衛生科學研究所',
    affiliationEn: 'Graduate Institute of Oral Health Sciences\nKaohsiung Medical University, Kaohsiung, Taiwan',
    imageUrl: 'https://meee.com.tw/ZbnlCnt.jpg',
  },
];

const SpeakerCard: React.FC<{ speaker: Speaker }> = ({ speaker }) => {
  const { t, language } = useLanguage();
  
  const nameFontSize = language === 'en' ? 'text-xl md:text-2xl' : 'text-2xl md:text-3xl';
  const titleFontSize = language === 'zh' ? 'text-2xl md:text-3xl' : 'text-xl md:text-2xl';
  const affiliationFontSize = language === 'zh' ? 'text-xl md:text-2xl' : 'text-lg md:text-xl';

  return (
    <div className="flex flex-col h-full bg-white/80 backdrop-blur-md p-7 rounded-[3rem] shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 text-center border border-gray-200 group">
      <div className="flex-shrink-0">
          <img
              className="w-40 h-40 rounded-full mx-auto mb-6 shadow-md border-4 border-white group-hover:border-blue-100 transition-all duration-500 object-cover object-top"
              src={speaker.imageUrl}
              alt={t(speaker.nameZh, speaker.nameEn)}
          />
      </div>
      <div className="flex-grow flex flex-col">
          <h3 className={`${nameFontSize} font-black text-gray-900 mb-3 tracking-tight group-hover:text-blue-700 transition-colors min-h-[3.5rem] flex items-center justify-center leading-tight`}>
            {t(speaker.nameZh, speaker.nameEn)}
          </h3>
          <p className={`${titleFontSize} text-blue-800 font-bold mb-5 min-h-[5em] bg-blue-50/50 py-3 rounded-[2rem] border border-blue-100 flex items-center justify-center px-6 whitespace-pre-line leading-tight`}>
            {t(speaker.titleZh, speaker.titleEn)}
          </p>
          <div className="border-t border-gray-100 pt-5 mt-auto">
              <p className={`${affiliationFontSize} text-gray-600 font-bold leading-relaxed whitespace-pre-line min-h-[5.5em] flex items-center justify-center`}>
                {t(speaker.affiliationZh, speaker.affiliationEn)}
              </p>
          </div>
      </div>
    </div>
  );
};

const Speakers: React.FC = () => {
  const { t, language } = useLanguage();
  const bgImg = "https://meee.com.tw/3DYB4ho.jpg";

  return (
    <section id="speakers" className="relative py-20 overflow-hidden bg-[#f5f5f7]">
      <div className="absolute inset-0 z-0">
        <img 
          src={bgImg} 
          alt="Background" 
          className="w-full h-full object-cover opacity-[0.08] grayscale brightness-110" 
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#f5f5f7] via-transparent to-[#f5f5f7]"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(255,255,255,0.8)_0%,_transparent_70%)]"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className={`${language === 'zh' ? 'text-4xl sm:text-5xl' : 'text-3xl sm:text-4xl'} font-black text-gray-900 tracking-tighter`}>
            {t('研討會講師', 'Conference Speakers')}
          </h2>
          <p className="text-xl md:text-2xl font-black text-gray-400 mt-3 uppercase tracking-[0.2em]">
            {t('專業講師陣容', 'Expert Faculty')}
          </p>
          <div className="w-20 h-1.5 bg-blue-600/30 mx-auto mt-6 rounded-full"></div>
          
          <div className="mt-8 max-w-4xl mx-auto space-y-3">
            <p className="text-xl md:text-2xl text-gray-700 font-bold leading-relaxed">
              {t('集結國內外頂尖專家，分享嗅覺領域的前沿知識與臨床實務經驗', 'Featuring top national and international experts sharing frontier insights and clinical experiences in olfactory science and practice.')}
            </p>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {speakersData.map((speaker, index) => (
            <SpeakerCard key={index} speaker={speaker} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Speakers;
