import React from 'react';
import { AgendaItem } from '../types';
import { useLanguage } from '../contexts/LanguageContext';

// --- English Data ---
const amAgendaEn: AgendaItem[] = [
  { time: '08:30-08:40', title: 'Opening remarks', speaker: 'Dr. Yun-Ting Chao' },
  { time: '08:40-09:20', title: 'Why olfaction is important', speaker: 'Prof. Thomas Hummel', moderator: 'Dr. Yun-Ting Chao' },
  { time: '09:20-09:40', title: 'Parosmia', speaker: 'Dr. Xinni Xu', moderator: 'Dr. Yun-Ting Chao' },
  { time: '09:40-10:00', title: 'Olfactory loss and neurodegenerative diseases', speaker: 'Dr. Kao-Tsung Lin', moderator: 'Dr. Yun-Ting Chao' },
  { time: '10:00-10:10', title: 'Discussion' },
  { time: '10:10-10:30', title: 'Coffee break', isBreak: true },
  { time: '10:30-10:50', title: 'Update on treatment for olfactory dysfunction', speaker: 'Prof. Rong-Shan Jiang', moderator: 'Prof. Ming-Ying Lan' },
  { time: '10:50-11:10', title: 'Neuroplasticity and olfactory training', speaker: 'Dr. Yun-Ting Chao', moderator: 'Prof. Ming-Ying Lan' },
  { time: '11:10-11:30', title: 'Olfactory preservation in sinus and skull base surgery', speaker: 'Dr. Ping-Hung Shen', moderator: 'Prof. Ming-Ying Lan' },
  { time: '11:30-11:50', title: 'Surgical treatment for olfactory cleft disease', speaker: 'Prof. Eri Mori', moderator: 'Prof. Ming-Ying Lan' },
  { time: '11:50-12:00', title: 'Discussion' },
];

const pmAgendaEn: AgendaItem[] = [
  { time: '12:40-13:20', title: 'Lunch symposium', speaker: 'Dr. Chien-Fu Yeh', isSpecial: true },
  { time: '13:30-14:10', title: 'How to set up a smell and taste clinic?', speaker: 'Prof. Thomas Hummel' },
  { time: '14:10-14:20', title: 'Discussion and orientation', speaker: 'Dr. Yun-Ting Chao' },
  { time: '14:20-14:30', title: 'Prepare', isSpecial: true },
  { time: '14:30-14:55', title: 'Workshop Rotation', description: ['(A) Sniffin\' Sticks', '(B) TIBSIT, open essence', '(C) Subjective assessment (QoL), Trigeminal', '(D) Taste, Retronasal olfaction', '(E) Olfactory bulb, Animal/Cell', '(F) PRP, OT, automated testing'] },
  { time: '14:55-15:20', title: 'Workshop Rotation', description: ['Topics A - f'] },
  { time: '15:20-15:45', title: 'Workshop Rotation', description: ['Topics A - F'] },
  { time: '15:40-16:15', title: 'Coffee break', isBreak: true },
  { time: '16:15-16:40', title: 'Workshop Rotation', description: ['Topics A - F'] },
  { time: '16:40-17:05', title: 'Workshop Rotation', description: ['Topics A - F'] },
  { time: '17:05-17:30', title: 'Workshop Rotation', description: ['Topics A - F'] },
];

const workshopDataEn = [
  { topic: "(A) Sniffin' Sticks", faculty: ["Xinni Xu", "Kao-Tsung Lin", "Hsiu-Yun Fu"] },
  { topic: "(B) TIBSIT, open essence", faculty: ["Ping-Hung Shen", "Eri Mori"] },
  { topic: "(C) Subjective assessment (QoL), Trigeminal", faculty: ["Ming-Ying Lan", "Wen-Ya Lee", "Yi-Tien Li"] },
  { topic: "(D) Taste, Retronasal olfaction", faculty: ["Jing-Jie Wang", "Prof. Hsiu-Yueh Liu"] },
  { topic: "(E) Olfactory bulb measurement, Animal/Cell Study", faculty: ["Chien-Fu Yeh", "Li-Ting Hong"] },
  { topic: "(F) PRP, OT, automated testing", faculty: ["Yun-Ting Chao", "Yin-Chun Liao"] }
];

// --- Chinese Data ---
const amAgendaZh: AgendaItem[] = [
  { time: '08:30-08:40', title: 'Opening remarks', speaker: '趙勻廷 主任' },
  { time: '08:40-09:20', title: 'Why olfaction is important', speaker: 'Prof. Thomas Hummel', moderator: '趙勻廷 主任' },
  { time: '09:20-09:40', title: 'Parosmia', speaker: 'Dr. Xinni Xu', moderator: '趙勻廷 主任' },
  { time: '09:40-10:00', title: 'Olfactory loss and neurodegenerative diseases', speaker: '林高宗 醫師', moderator: '趙勻廷 主任' },
  { time: '10:00-10:10', title: 'Discussion' },
  { time: '10:10-10:30', title: 'Coffee break', isBreak: true },
  { time: '10:30-10:50', title: 'Update on treatment for olfactory dysfunction', speaker: '江榮山 教授', moderator: '藍敏瑛 教授' },
  { time: '10:50-11:10', title: 'Neuroplasticity and olfactory training', speaker: '趙勻廷 主任', moderator: '藍敏瑛 教授' },
  { time: '11:10-11:30', title: 'Olfactory preservation in sinus and skull base surgery', speaker: '沈炳宏 主任', moderator: '藍敏瑛 教授' },
  { time: '11:30-11:50', title: 'Surgical treatment for olfactory cleft disease', speaker: 'Prof. Eri Mori', moderator: '藍敏瑛 教授' },
  { time: '11:50-12:00', title: 'Discussion' },
];

const pmAgendaZh: AgendaItem[] = [
  { time: '12:40-13:20', title: 'Lunch symposium', speaker: '葉建甫 醫師', isSpecial: true },
  { time: '13:30-14:10', title: 'How to set up a smell and taste clinic?', speaker: 'Prof. Thomas Hummel' },
  { time: '14:10-14:20', title: 'Discussion and orientation', speaker: '趙勻廷 主任' },
  { time: '14:20-14:30', title: 'Prepare', isSpecial: true },
  { time: '14:30-14:55', title: 'Workshop Rotation', description: ['(A) Sniffin\' Sticks', '(B) TIBSIT, open essence', '(C) Subjective assessment (QoL), Trigeminal', '(D) Taste, Retronasal olfaction', '(E) Olfactory bulb, Animal/Cell', '(F) PRP, OT, automated testing'] },
  { time: '14:55-15:20', title: 'Workshop Rotation', description: ['Topics A - F'] },
  { time: '15:20-15:45', title: 'Workshop Rotation', description: ['Topics A - F'] },
  { time: '15:40-16:15', title: 'Coffee break', isBreak: true },
  { time: '16:15-16:40', title: 'Workshop Rotation', description: ['Topics A - F'] },
  { time: '16:40-17:05', title: 'Workshop Rotation', description: ['Topics A - F'] },
  { time: '17:05-17:30', title: 'Workshop Rotation', description: ['Topics A - F'] },
];

const workshopDataZh = [
  { topic: "(A) Sniffin' Sticks", faculty: ["Dr. Xinni Xu", "林高宗 醫師", "傅秀雲 技師"] },
  { topic: "(B) TIBSIT, open essence", faculty: ["沈炳宏 主任", "Prof. Eri Mori"] },
  { topic: "(C) Subjective assessment (QoL), Trigeminal", faculty: ["藍敏瑛 教授", "李文雅 醫師", "李依恬 技術員"] },
  { topic: "(D) Taste, Retronasal olfaction", faculty: ["王勁傑 醫師", "劉秀月 教授"] },
  { topic: "(E) Olfactory bulb, Animal/Cell", faculty: ["葉建甫 醫師", "洪莉婷 醫師"] },
  { topic: "(F) PRP, OT, automated testing", faculty: ["趙勻廷 主任", "廖尹君 腦科學博士"] }
];

const AgendaRow: React.FC<{ item: AgendaItem; theme: 'yellow' | 'green'; lang: 'zh' | 'en' }> = ({ item, theme, lang }) => {
  const isYellow = theme === 'yellow';
  
  let bgClass = 'bg-white';
  let borderClass = isYellow ? 'border-amber-100' : 'border-green-100';
  let timeClass = isYellow ? 'text-amber-700' : 'text-green-700';
  let titleClass = 'text-gray-900';

  if (item.isBreak) {
    bgClass = isYellow ? 'bg-amber-50' : 'bg-green-50';
    titleClass = 'text-gray-600 italic';
  } else if (item.isSpecial) {
    bgClass = isYellow ? 'bg-amber-50/50' : 'bg-green-50/50';
    titleClass = isYellow ? 'text-amber-900 font-bold' : 'text-green-900 font-bold';
  }

  return (
    <div className={`flex flex-col sm:flex-row py-4 px-4 ${bgClass} border-b ${borderClass} last:border-0 hover:bg-opacity-80 transition-colors`}>
      <div className="sm:w-32 md:w-40 flex-shrink-0 mb-2 sm:mb-0">
        <span className={`inline-block px-2 py-1 rounded text-[10px] md:text-sm font-bold ${item.isBreak ? 'bg-gray-200 text-gray-600' : `${isYellow ? 'bg-amber-100' : 'bg-green-100'} ${timeClass}`}`}>
          {item.time}
        </span>
      </div>

      <div className="flex-grow sm:pl-4">
        <div className="flex flex-col md:flex-row md:items-start md:justify-between">
            <div className="w-full">
                <h4 className={`text-xs md:text-lg font-semibold ${titleClass}`}>
                  {item.title}
                </h4>
                {item.description && (
                   <ul className="mt-2 grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-1 text-[10px] md:text-sm text-gray-600">
                     {item.description.map((desc, i) => (
                       <li key={i} className="flex items-start">
                         {item.description!.length > 1 && <span className="mr-2">•</span>}
                         {desc}
                       </li>
                     ))}
                   </ul>
                )}
            </div>

            {(item.speaker || item.moderator) && (
                <div className="mt-2 md:mt-0 md:text-right flex-shrink-0 md:ml-4 space-y-2">
                    {item.speaker && (
                        <div className="text-gray-800 font-medium">
                            <span className="text-[9px] text-gray-500 uppercase tracking-wider block">
                                {lang === 'zh' ? '講師' : 'Speaker'}
                            </span>
                            <span className="block text-xs md:text-base">{item.speaker}</span>
                        </div>
                    )}
                    {item.moderator && (
                        <div className="text-blue-800 font-medium">
                            <span className="text-[9px] text-blue-400 uppercase tracking-wider block">
                                {lang === 'zh' ? '座長' : 'Moderator'}
                            </span>
                            <span className="block text-xs md:text-base">{item.moderator}</span>
                        </div>
                    )}
                </div>
            )}
        </div>
      </div>
    </div>
  );
};

const Agenda: React.FC = () => {
  const { language: lang, t } = useLanguage();

  const amData = lang === 'zh' ? amAgendaZh : amAgendaEn;
  const pmData = lang === 'zh' ? pmAgendaZh : pmAgendaEn;
  const workshopItems = lang === 'zh' ? workshopDataZh : workshopDataEn;

  return (
    <section id="agenda" className="py-12 md:py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <h2 className="text-xl md:text-3xl font-black text-gray-900 tracking-tighter whitespace-nowrap">
            {t('會議議程', 'Agenda')}
          </h2>
          <p className="mt-2 text-[10px] md:text-base text-gray-500 font-bold uppercase tracking-widest whitespace-nowrap">
            {t('2026 / 06 / 27 (週六)', 'June 27, 2026 (Saturday)')}
          </p>
          <div className="w-12 h-1 bg-blue-600/30 mx-auto mt-4 rounded-full"></div>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
            <div className="bg-white rounded-[2rem] shadow-lg overflow-hidden border border-amber-200">
                <div className="bg-amber-400 py-4 px-6">
                    <h3 className="text-base md:text-xl font-black text-white flex items-center tracking-tight whitespace-nowrap">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                        </svg>
                        {t('上午場 研討會', 'AM Session')}
                    </h3>
                </div>
                <div className="p-1">
                    {amData.map((item, index) => (
                        <AgendaRow key={`am-${index}`} item={item} theme="yellow" lang={lang} />
                    ))}
                </div>
            </div>

            <div className="bg-white rounded-[2rem] shadow-lg overflow-hidden border border-green-200">
                <div className="bg-green-600 py-4 px-6">
                    <h3 className="text-base md:text-xl font-black text-white flex items-center tracking-tight whitespace-nowrap">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                        </svg>
                        {t('下午場 工作坊', 'PM Session')}
                    </h3>
                </div>
                <div className="p-1">
                    {pmData.map((item, index) => (
                        <AgendaRow key={`pm-${index}`} item={item} theme="green" lang={lang} />
                    ))}
                </div>
            </div>
        </div>

        <div className="mt-10 bg-white rounded-[2rem] shadow-xl overflow-hidden border border-blue-200">
            <div className="bg-blue-600 py-5 px-8">
                <h3 className="text-base md:text-2xl font-black text-white flex items-center tracking-tight whitespace-nowrap">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                    </svg>
                    {t('工作坊主題', 'Workshop Topics')}
                </h3>
            </div>
            <div className="p-6 md:p-10">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {workshopItems.map((item, index) => (
                        <div key={index} className="bg-blue-50/50 p-6 rounded-[1.5rem] border border-blue-100 group shadow-sm">
                            <h4 className="text-sm md:text-lg font-black text-blue-900 mb-4 leading-tight">
                                {item.topic}
                            </h4>
                            <div className="block border-t border-blue-100/50 pt-3">
                                <span className="text-[9px] font-black uppercase tracking-widest text-blue-400 block mb-1">
                                    {t('講師', 'Faculty')}
                                </span>
                                <div className="text-gray-800 font-bold text-xs md:text-base flex flex-wrap gap-x-2 gap-y-1">
                                    {item.faculty.map((name, i) => (
                                      <span key={i} className="whitespace-nowrap text-blue-800">
                                        {name}{i < item.faculty.length - 1 ? (lang === 'zh' ? '、' : ', ') : ''}
                                      </span>
                                    ))}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>

        <div className="mt-8 text-center">
            <p className="text-gray-400 text-[9px] md:text-sm font-bold italic">
                {t('※ 工作坊採小組輪站方式進行', '※ The workshop is conducted in group rotations.')}
            </p>
        </div>
      </div>
    </section>
  );
};

export default Agenda;