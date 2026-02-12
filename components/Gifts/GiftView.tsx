
import React, { useState, useRef, useEffect } from 'react';
import { GiftType } from '../../types';
import { Play, Pause, SkipBack, SkipForward, Heart, ChevronLeft } from 'lucide-react';

interface Props {
  type: GiftType;
  onBack: () => void;
}

// Константы для текстов, которые пользователь заменит сам
const ART_TEXT = `Ты самая прекрасная девушка на всей земной тверди.
Я просыпаюсь с мыслями о тебе, и их же забираю с собой во сны. Все мои успехи, все провалы, все смешные и грустные моменты я хочу провести с тобой. Ты мое счастье!`;

const DREAMS_TEXT = `Я хочу провести с тобой всю жизнь. Я хочу жить с тобой в большом доме, хочу посетить все интересные уголки планеты. Когда мы состаримся, ничего не изменится, я буду жить тобой, а ты надеюсь мной! Ты мое будущее...`;

// Ссылки на изображения (заглушки)
const ART_IMAGE = "валентинка 1.png";
const PLAYER_COVER = "maxresdefault.jpg";
const DREAMS_IMAGE = "валентинка 2.png";

// Ссылка на аудио (заглушка - можно заменить на любой прямой URL mp3)
const AUDIO_SRC = "Papin_Olimpos_-_Tjomno-oranzhevyjj_zakat_64714980.mp3";

const GiftView: React.FC<Props> = ({ type, onBack }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, []);

  const togglePlay = () => {
    if (!audioRef.current) {
      audioRef.current = new Audio(AUDIO_SRC);
      audioRef.current.onended = () => setIsPlaying(false);
    }

    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play().catch(e => console.error("Audio playback error:", e));
    }
    setIsPlaying(!isPlaying);
  };

  const containerClasses = "max-w-5xl mx-auto p-6 md:p-10 bg-white/90 backdrop-blur-xl rounded-[2.5rem] shadow-2xl flex flex-col items-center gap-10 transition-all duration-700 transform";

  if (type === GiftType.ART) {
    return (
      <div className={`${containerClasses} md:flex-row opacity-100 translate-y-0`}>
        <div className="w-full md:w-1/2 flex justify-center items-center overflow-hidden rounded-3xl shadow-lg border-4 border-white bg-gray-50">
          <img 
            src={ART_IMAGE} 
            alt="Love Art" 
            className="w-full h-auto max-h-[70vh] object-contain hover:scale-105 transition-transform duration-1000" 
          />
        </div>
        <div className="w-full md:w-1/2 text-center md:text-left">
          <button onClick={onBack} className="flex items-center gap-1 text-red-400 hover:text-red-600 mb-6 transition-colors font-medium mx-auto md:mx-0">
            <ChevronLeft size={18} /> Назад к выбору
          </button>
          <h2 className="text-4xl font-cursive text-red-600 mb-6 drop-shadow-sm">Для тебя, моя муза</h2>
          <div className="whitespace-pre-line text-2xl md:text-3xl font-handwriting text-red-800 leading-relaxed italic px-4 md:px-0">
            {ART_TEXT}
          </div>
          <div className="mt-10 flex justify-center md:justify-start">
             <Heart className="text-red-500 animate-bounce" fill="currentColor" size={32} />
          </div>
        </div>
      </div>
    );
  }

  if (type === GiftType.PLAYER) {
    return (
      <div className={`${containerClasses} md:flex-row opacity-100 translate-y-0`}>
        <div className="w-full md:w-1/2 bg-gradient-to-br from-pink-400 to-red-500 rounded-3xl p-6 flex flex-col items-center justify-center text-white shadow-xl aspect-square relative overflow-hidden group">
          <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"></div>
          <div className={`w-48 h-48 rounded-full border-4 border-white/50 flex items-center justify-center mb-6 overflow-hidden transition-transform duration-[8000ms] linear infinite ${isPlaying ? 'rotate-[360deg]' : ''}`}>
            <img src={PLAYER_COVER} alt="Cover" className="w-full h-full object-cover" />
          </div>
          <h3 className="text-2xl font-bold mb-1 tracking-wide">Наша Особенная Песня</h3>
          <p className="text-white/70 mb-8 font-light italic">Музыка наших сердец</p>
          <div className="flex items-center gap-8">
            <SkipBack className="cursor-pointer hover:scale-125 transition active:scale-90" />
            <button 
              onClick={togglePlay}
              className="bg-white text-red-500 p-5 rounded-full shadow-2xl hover:scale-110 active:scale-90 transition-all duration-300"
            >
              {isPlaying ? <Pause size={28} /> : <Play size={28} fill="currentColor" />}
            </button>
            <SkipForward className="cursor-pointer hover:scale-125 transition active:scale-90" />
          </div>
          <div className="w-full mt-10 h-1.5 bg-white/20 rounded-full overflow-hidden">
            <div className={`h-full bg-white transition-all duration-[10000ms] linear ${isPlaying ? 'w-full' : 'w-0'}`} />
          </div>
        </div>
        <div className="w-full md:w-1/2 text-center md:text-left">
          <button onClick={onBack} className="flex items-center gap-1 text-red-400 hover:text-red-600 mb-6 transition-colors font-medium mx-auto md:mx-0">
            <ChevronLeft size={18} /> Назад к выбору
          </button>
          <h2 className="text-4xl font-cursive text-red-600 mb-4">Ритм нашей любви</h2>
          <p className="text-xl text-gray-700 leading-relaxed font-light px-4 md:px-0">
            Нажми на Play, чтобы услышать мелодию, которая всегда будет напоминать мне о нас. Когда я ее слышу, я всегда знаю, что мы со всем справимся.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className={`${containerClasses} opacity-100 translate-y-0`}>
       <button onClick={onBack} className="self-start flex items-center gap-1 text-red-400 hover:text-red-600 mb-2 transition-colors font-medium">
          <ChevronLeft size={18} /> Назад к выбору
       </button>
       
       <div className="w-full overflow-hidden rounded-3xl shadow-lg border-4 border-white bg-gray-50">
          <img 
            src={DREAMS_IMAGE} 
            alt="Future Dreams" 
            className="w-full h-auto max-h-[60vh] object-contain hover:scale-105 transition-transform duration-[2000ms]" 
          />
        </div>
        
        <div className="w-full text-center">
          <h2 className="text-4xl font-cursive text-red-600 mb-6 drop-shadow-sm">Наше Прекрасное Завтра</h2>
          <p className="text-2xl text-gray-800 leading-relaxed font-handwriting italic max-w-3xl mx-auto px-4">
            {DREAMS_TEXT}
          </p>
          <div className="mt-8 flex justify-center gap-4">
            <Heart className="text-red-500 animate-pulse" fill="currentColor" size={28} />
            <Heart className="text-red-400 animate-pulse delay-75" fill="currentColor" size={28} />
            <Heart className="text-red-300 animate-pulse delay-150" fill="currentColor" size={28} />
          </div>
        </div>
    </div>
  );
};

export default GiftView;
