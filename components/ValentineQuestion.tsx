
import React, { useState } from 'react';

interface Props {
  onAccept: () => void;
}

const noTexts = [
  "Нет",
  "Ты уверена?",
  "Подумай еще раз...",
  "Серьезно?",
  "Котик, ну ты чего?",
  "Я сейчас заплачу :(",
  "Это ошибка!",
  "Нажми Да!",
  "Пожалуйста-пожалуйста!",
  "У тебя нет выбора!",
  "Хи-хи, всё равно Да!"
];

const yesTexts = [
  "Да",
  "КОНЕЧНО!",
  "Я ТОЖЕ ТЕБЯ ЛЮБЛЮ!",
  "ТЫ МОЁ ВСЁ!",
  "МУР!",
  "УРАААА!",
  "СЧАСТЬЕ МОЁ!",
  "ЛЮБИМАЯ!",
  "ЦЕЛУЮ!",
  "ЛЮБЛЮ БОЛЬШЕ ВСЕХ!",
  "МОЯ ЖИЗНЬ!"
];

const ValentineQuestion: React.FC<Props> = ({ onAccept }) => {
  const [noCount, setNoCount] = useState(0);

  const handleNo = () => {
    if (noCount < 10) {
      setNoCount(prev => prev + 1);
    }
  };

  const yesScale = 1 + noCount * 0.2;
  const noScale = Math.max(0, 1 - noCount * 0.1);

  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] text-center p-6 z-10 relative animate-screen-entry">
      <h1 className="text-3xl md:text-5xl font-cursive text-red-600 mb-12 leading-relaxed drop-shadow-sm px-4">
        Я - твой, а ты - моя.<br />
        Я люблю тебя сильнее, согласна?
      </h1>

      <div className="flex flex-col md:flex-row items-center justify-center gap-12 min-h-[300px] w-full max-w-2xl">
        <div className="flex items-center justify-center min-w-[200px]">
          <button
            onClick={onAccept}
            className={`bg-red-500 hover:bg-red-600 text-white font-bold py-4 px-10 rounded-full shadow-lg transition-all duration-500 transform active:scale-95 ${noCount === 0 ? 'pulse-yes' : ''}`}
            style={{ 
              transform: `scale(${yesScale})`, 
              zIndex: 30,
              boxShadow: noCount > 5 ? '0 10px 40px rgba(239, 68, 68, 0.4)' : ''
            }}
          >
            {yesTexts[noCount] || yesTexts[yesTexts.length - 1]}
          </button>
        </div>

        {noCount < 10 && (
          <div className="flex items-center justify-center min-w-[150px]">
            <button
              onClick={handleNo}
              className="bg-white/50 border border-red-100 backdrop-blur-sm hover:bg-gray-100 text-gray-500 font-semibold py-2 px-6 rounded-full shadow-sm transition-all duration-500 transform active:scale-90 whitespace-nowrap"
              style={{ 
                transform: `scale(${noScale})`, 
                opacity: noScale, 
                pointerEvents: noScale < 0.1 ? 'none' : 'auto' 
              }}
            >
              {noTexts[noCount] || noTexts[noTexts.length - 1]}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ValentineQuestion;
