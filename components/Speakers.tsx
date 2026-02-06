import React, { useState } from 'react';
import { Speaker } from '../types';
import { useLanguage } from '../contexts/LanguageContext';

const speakersData: Speaker[] = [
  {
    nameZh: 'Prof. Thomas Hummel',
    nameEn: 'Prof. Thomas Hummel',
    titleZh: '',
    titleEn: '',
    affiliationZh: '德國德勒斯登大學 耳鼻喉科部\n嗅味覺中心',
    affiliationEn: 'Technology University of Dresden, Germany',
    imageUrl: 'https://meee.com.tw/lNXtFZm.jpg',
  },
  {
    nameZh: 'Prof. Eri Mori',
    nameEn: 'Prof. Eri Mori',
    titleZh: '',
    titleEn: '',
    affiliationZh: '日本東京慈惠會醫科大學\n耳鼻喉科',
    affiliationEn: 'The Jikei University School of Medicine, Japan',
    imageUrl: 'https://meee.com.tw/g4TyYoP.jpg',
  },
  {
    nameZh: 'Dr. Xinni Xu',
    nameEn: 'Dr. Xinni Xu',
    titleZh: '',
    titleEn: '',
    affiliationZh: '新加坡國立大學醫院\n耳鼻喉科',
    affiliationEn: 'National University Hospital, Singapore',
    imageUrl: 'https://meee.com.tw/6iEiSjW.jpg',
  },
  {
    nameZh: '趙勻廷 主任',
    nameEn: 'Dr. Yun-Ting Chao',
    titleZh: '',
    titleEn: '',
    affiliationZh: '臺北榮民總醫院\n鼻頭頸科',
    affiliationEn: 'Taipei Veterans General Hospital, Taiwan',
    imageUrl: 'https://meee.com.tw/qJfO68E.jpg',
  },
  {
    nameZh: '江榮山 教授',
    nameEn: 'Prof. Rong-Shan Jiang',
    titleZh: '',
    titleEn: '',
    affiliationZh: '台中童綜合醫院\n研發創新中心',
    affiliationEn: "Tungs' Metroharbor Hospital, Taiwan",
    imageUrl: 'https://meee.com.tw/O5l75pm.jpg',
  },
  {
    nameZh: '沈炳宏 主任',
    nameEn: 'Dr. Ping-Hung Shen',
    titleZh: '',
    titleEn: '',
    affiliationZh: '台中光田綜合醫院\n鼻頭頸科',
    affiliationEn: 'Kuang Tien General Hospital, Taiwan',
    imageUrl: 'https://meee.com.tw/DJ2Adhb.jpg',
  },
  {
    nameZh: '藍敏瑛 教授',
    nameEn: 'Prof. Ming-Ying Lan',
    titleZh: '',
    titleEn: '',
    affiliationZh: '臺北榮民總醫院\n鼻頭頸科',
    affiliationEn: 'Taipei Veterans General Hospital, Taiwan',
    imageUrl: 'https://meee.com.tw/XvmEusJ.jpg',
  },
  {
    nameZh: '葉建甫 醫師',
    nameEn: 'Dr. Chien-Fu Yeh',
    titleZh: '',
    titleEn: '',
    affiliationZh: '臺北榮民總醫院\n鼻頭頸科',
    affiliationEn: 'Taipei Veterans General Hospital, Taiwan',
    imageUrl: 'https://meee.com.tw/eBILrmF.jpg',
  },
  {
    nameZh: '洪莉婷 醫師',
    nameEn: 'Dr. Li-Ting Hung',
    titleZh: '',
    titleEn: '',
    affiliationZh: '臺北榮民總醫院\n鼻頭頸科',
    affiliationEn: 'Taipei Veterans General Hospital, Taiwan',
    imageUrl: 'https://meee.com.tw/8MxndVQ.jpg',
  },
  {
    nameZh: '王勁傑 醫師',
    nameEn: 'Dr. Jing-Jie Wang',
    titleZh: '',
    titleEn: '',
    affiliationZh: '臺中榮民總醫院\n鼻頭頸科',
    affiliationEn: 'Taichung Veterans General Hospital, Taiwan',
    imageUrl: 'https://meee.com.tw/jBeA4F3.jpg',
  },
  {
    nameZh: '林高宗 醫師',
    nameEn: 'Dr. Kao-Tsung Lin',
    titleZh: '',
    titleEn: '',
    affiliationZh: '台大雲林分院\n耳鼻喉科',
    affiliationEn: 'NTU Hospital Yunlin Branch, Taiwan',
    imageUrl: 'https://meee.com.tw/o8opkdo.jpg',
  },
  {
    nameZh: '劉秀月 教授',
    nameEn: 'Prof. Hsiu-Yueh Liu',
    titleZh: '',
    titleEn: '',
    affiliationZh: '高雄醫學大學\n口腔衛生科學研究所',
    affiliationEn: 'Kaohsiung Medical University, Taiwan',
    imageUrl: 'https://meee.com.tw/ZbnlCnt.jpg',
  },
];

const SpeakerCard: React.FC<{ speaker: Speaker }> = ({ speaker }) => {
  const { t } = useLanguage();
  return (
    <div className="flex flex-col h-full bg-white/80 p-4 md:p-5 rounded-[1.5rem] shadow-sm border border-gray-100 group text-center">
      <div className="flex-shrink-0">
          <img
              className="w-24 h-24 md:w-28 md:h-28 rounded-full mx-auto mb-3 shadow-sm border-2 border-white object-cover object-top"
              src={speaker.imageUrl}
              alt={speaker.nameZh}
          />
      </div>
      <div className="flex-grow flex flex-col justify-center">
          <h3 className="text-base md:text-xl font-black text-gray-900 mb-2 leading-tight">
            {t(speaker.nameZh, speaker.nameEn)}
          </h3>
          <div className="border-t border-gray-100 pt-3">
              <p className="text-[11px] md:text-sm text-gray-500 font-bold whitespace-pre-line leading-tight">
                {t(speaker.affiliationZh, speaker.affiliationEn)}
              </p>
          </div>
      </div>
    </div>
  );
};

const Speakers: React.FC = () => {
  const { t } = useLanguage();
  return (
    <section id="speakers" className="relative py-12 md:py-16 bg-[#f5f5f7]">
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <h2 className="text-xl md:text-3xl font-black text-gray-900 tracking-tighter whitespace-nowrap">
            {t('研討會講師', 'Conference Speakers')}
          </h2>
          <div className="w-12 h-1 bg-blue-600/30 mx-auto mt-3 rounded-full"></div>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-8">
          {speakersData.map((speaker, index) => (
            <SpeakerCard key={index} speaker={speaker} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Speakers;