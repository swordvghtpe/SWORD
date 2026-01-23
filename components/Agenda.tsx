
import React from 'react';
import { AgendaItem } from '../types';
import { useLanguage } from '../contexts/LanguageContext';

// --- English Data ---
const amAgendaEn: AgendaItem[] = [
  { time: '08:30-08:40', title: 'Opening remarks', speaker: 'Prof. Yun-Ting Chao' },
  { time: '08:40-09:20', title: 'Why olfaction is important', speaker: 'Prof. Thomas Hummel' },
  { time: '09:20-09:40', title: 'Parosmia', speaker: 'Dr. Xinni Xu', moderator: 'Prof. Yun-Ting Chao' },
  { time: '09:40-10:00', title: 'Olfactory loss and neurodegenerative diseases', speaker: 'Dr. Kao-Tsung Li', moderator: 'Prof. Yun-Ting Chao' },
  { time: '10:00-10:10', title: 'Discussion' },
  { time: '10:10-10:30', title: 'Coffee break', isBreak: true },
  { time: '10:30-10:50', title: 'Update on treatment for olfactory dysfunction', speaker: 'Prof. Rong-Shan Jiang', moderator: 'Prof. Ming-Ying Lan' },
  { time: '10:50-11:10', title: 'Neuroplasticity and olfactory training', speaker: 'Prof. Yun-Ting Chao', moderator: 'Prof. Ming-Ying Lan' },
  { time: '11:10-11:30', title: 'Olfactory preservation in sinus and skull base surgery', speaker: 'Prof. Ping-Hung Shen', moderator: 'Prof. Ming-Ying Lan' },
  { time: '11:30-11:50', title: 'Surgical treatment for olfactory cleft disease', speaker: 'Prof. Eri Mori', moderator: 'Prof. Ming-Ying Lan' },
  { time: '11:50-12:00', title: 'Discussion' },
];

const pmAgendaEn: AgendaItem[] = [
  { time: '12:40-13:20', title: 'Lunch symposium', speaker: 'Dr. Chien-Fu Yeh', isSpecial: true },
  { time: '13:30-14:10', title: 'How to set up a smell and taste clinic?', speaker: 'Prof. Thomas Hummel' },
  { time: '14:10-14:20', title: 'Discussion and orientation', speaker: 'Prof. Yun-Ting Chao' },
  { time: '14:20-14:30', title: 'Prepare', isSpecial: true },
  { time: '14:30-14:55', title: 'Workshop Rotation', description: ['(A) Sniffin\' Sticks', '(B) TIBSIT, open essence', '(C) Subjective assessment (QoL), Trigeminal', '(D) Taste, Retronasal olfaction', '(E) Olfactory bulb, Animal/Cell', '(F) PRP, OT, automated testing'] },
  { time: '14:55-15:20', title: 'Workshop Rotation', description: ['Topics A - F'] },
  { time: '15:20-15:45', title: 'Workshop Rotation', description: ['Topics A - F'] },
  { time: '15:40-16:15', title: 'Coffee break', isBreak: true },
  { time: '16:15-16:40', title: 'Workshop Rotation', description: ['Topics A - F'] },
  { time: '16:40-17:05', title: 'Workshop Rotation', description: ['Topics A - F'] },
  { time: '17:05-17:30', title: 'Workshop Rotation', description: ['Topics A - F'] },
];

const workshopDataEn = [
  { topic: "(A) Sniffin' Sticks", faculty: "Xinni Xu, Kao-Tsung Li, Hsiu-Yun Fu" },
  { topic: "(B) TIBSIT, open essence", faculty: "Ping-Hung Shen, Eri Mori" },
  { topic: "(C) Subjective assessment (QoL), Trigeminal", faculty: "Ming-Ying Lan, Wen-Ya Lee, Yi-Tien Li" },
  { topic: "(D) Taste, Retronasal olfaction", faculty: "Jing-Jie Wang, Hsiu-Yueh Liu" },
  { topic: "(E) Olfactory bulb measurement, Animal/Cell Study", faculty: "Chien-Fu Yeh, Li-Ting Hong" },
  { topic: "(F) PRP, OT, automated testing", faculty: "Yun-Ting Chao, Yin-Chun Liao" }
];

// --- Chinese Data ---
const amAgendaZh: AgendaItem[] = [
  { time: '08:30-08:40', title: 'Opening remarks', speaker: '趙勻廷 教授' },
  { time: '08:40-09:20', title: 'Why olfaction is important', speaker: 'Thomas Hummel' },
  { time: '09:20-09:40', title: 'Parosmia', speaker: 'Dr. Xinni Xu', moderator: '趙勻廷 教授' },
  { time: '09:40-10:00', title: 'Olfactory loss and neurodegenerative diseases', speaker: '林高宗 醫師', moderator: '趙勻廷 教授' },
  { time: '10:00-10:10', title: 'Discussion' },
  { time: '10:10-10:30', title: 'Coffee break', isBreak: true },
  { time: '10:30-10:50', title: 'Update on treatment for olfactory dysfunction', speaker: '江榮山 教授', moderator: '藍敏瑛 教授' },
  { time: '10:50-11:10', title: 'Neuroplasticity and olfactory training', speaker: '趙勻廷 教授', moderator: '藍敏瑛 教授' },
  { time: '11:10-11:30', title: 'Olfactory preservation in sinus and skull base surgery', speaker: '沈炳宏 教授', moderator: '藍敏瑛 教授' },
  { time: '11:30-11:50', title: 'Surgical treatment for olfactory cleft disease', speaker: 'Prof. Eri Mori', moderator: '藍敏瑛 教授' },
  { time: '11:50-12:00', title: 'Discussion' },
];

const pmAgendaZh: AgendaItem[] = [
  { time: '12:40-13:20', title: 'Lunch symposium', speaker: '葉建甫 醫師', isSpecial: true },
  { time: '13:30-14:10', title: 'How to set up a smell and taste clinic?', speaker: 'Thomas Hummel' },
  { time: '14:10-14:20', title: 'Discussion and orientation', speaker: '趙勻廷 教授' },
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
  { topic: "(A) Sniffin' Sticks", faculty: "Dr. Xinni Xu, 林高宗 醫師, 傅秀雲 技師" },
  { topic: "(B) TIBSIT, open essence", faculty: "沈炳宏 教授, Prof. Eri Mori" },
  { topic: "(C) Subjective assessment (QoL), Trigeminal", faculty: "藍敏瑛 教授, 李文雅 醫師, 李依恬 技術員" },
  { topic: "(D) Taste, Retronasal olfaction", faculty: "王勁傑 醫師, 劉秀月 副教授" },
  { topic: "(E) Olfactory bulb, Animal/Cell", faculty: "葉建甫 醫師, 洪莉婷 醫師" },
  { topic: "(F) PRP, OT, automated testing", faculty: "趙勻廷 教授, 廖尹君 腦科學博士" }
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
        <span className={`inline-block px-2 py-1 rounded text-sm font-bold ${item.isBreak ? 'bg-gray-200 text-gray-600' : `${isYellow ? 'bg-amber-100' : 'bg-green-100'} ${timeClass}`}`}>
          {item.time}
        </span>
      </div>

      <div className="flex-grow sm:pl-4">
        <div className="flex flex-col md:flex-row md:items-start md:justify-between">
            <div>
                <h4 className={`text-lg font-semibold ${titleClass}`}>{item.title}</h4>
                {item.description && (
                   <ul className="mt-2 grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-1 text-sm text-gray-600">
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
                <div className="mt-2 md:mt-0 md:text-right flex-shrink-0 md:ml-4">
                    {item.speaker && (
                        <div className="text-gray-800 font-medium">
                            <span className="text-xs text-gray-500 uppercase tracking-wider block mb-1">
                                {lang === 'zh' ? '講師' : 'Speaker'}
                            </span>
                            <span className="block">{item.speaker}</span>
                        </div>
                    )}
                    {item.moderator && (
                        <div className="text-gray-600 text-sm mt-3">
                            <span className="text-xs text-gray-400 uppercase tracking-wider block mb-1">
                                {lang === 'zh' ? '座長' : 'Moderator'}
                            </span>
                            <span className="block">{item.moderator}</span>
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
    <section id="agenda" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-black text-gray-900 sm:text-5xl tracking-tighter">
            {t('會議議程', 'Agenda')}
          </h2>
          <p className="mt-4 text-xl text-gray-500 font-bold uppercase tracking-widest">
            {t('2026 / 06 / 27 (週六)', 'June 27, 2026 (Saturday)')}
          </p>
          <div className="w-20 h-1.5 bg-blue-600/30 mx-auto mt-6 rounded-full"></div>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
            <div className="bg-white rounded-[2.5rem] shadow-lg overflow-hidden border border-amber-200">
                <div className="bg-amber-400 py-5 px-8">
                    <h3 className="text-2xl font-black text-white flex items-center tracking-tight">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                        </svg>
                        {t('上午場 研討會講座', 'AM Session: Symposium')}
                    </h3>
                </div>
                <div className="p-2">
                    {amData.map((item, index) => (
                        <AgendaRow key={`am-${index}`} item={item} theme="yellow" lang={lang} />
                    ))}
                </div>
            </div>

            <div className="bg-white rounded-[2.5rem] shadow-lg overflow-hidden border border-green-200">
                <div className="bg-green-600 py-5 px-8">
                    <h3 className="text-2xl font-black text-white flex items-center tracking-tight">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                        </svg>
                        {t('下午場 工作坊', 'PM Session: Workshop')}
                    </h3>
                </div>
                <div className="p-2">
                    {pmData.map((item, index) => (
                        <AgendaRow key={`pm-${index}`} item={item} theme="green" lang={lang} />
                    ))}
                </div>
            </div>
        </div>

        <div className="mt-12 bg-white rounded-[3rem] shadow-2xl overflow-hidden border border-blue-200">
            <div className="bg-blue-600 py-6 px-10">
                <h3 className="text-3xl font-black text-white flex items-center tracking-tight">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 mr-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                    </svg>
                    {t('工作坊主題和講師', 'Workshop Topics & Faculty')}
                </h3>
            </div>
            <div className="p-8 md:p-12">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {workshopItems.map((item, index) => (
                        <div key={index} className="bg-blue-50/50 p-8 rounded-[2rem] border border-blue-100 hover:border-blue-300 hover:bg-blue-50 transition-all duration-300 group shadow-sm">
                            <h4 className="text-xl font-black text-blue-900 mb-4 group-hover:text-blue-600 transition-colors leading-tight">
                                {item.topic}
                            </h4>
                            <div className="flex items-start">
                                <span className="text-sm font-black uppercase tracking-widest text-blue-400 mt-1 mr-4 flex-shrink-0">
                                    {t('講師:', 'Faculty:')}
                                </span>
                                <p className="text-gray-800 font-bold text-lg leading-relaxed">
                                    {item.faculty}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>

        <div className="mt-10 text-center">
            <p className="text-gray-500 text-lg font-bold italic bg-white inline-block px-8 py-3 rounded-full shadow-sm border border-gray-100">
                {t('※ 工作坊採小組輪站方式進行，各站皆有專業師資指導實作', '※ The workshop is conducted in group rotations with specialized instructors at each station.')}
            </p>
        </div>
      </div>
    </section>
  );
};

export default Agenda;
