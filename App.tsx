import React, { useState } from 'react';
import HeartBackground from './components/HeartBackground';
import ValentineQuestion from './components/ValentineQuestion';
import GiftView from './components/Gifts/GiftView';
import { AppStage, GiftType } from './types';
import { Heart, Gift, Music, Sparkles, Lock } from 'lucide-react';

// СЕКРЕТНОЕ СЛОВО (измените его на свое, например 'любовь' или дату знакомства)
const SECRET_CODE = "Старина"; 

const App: React.FC = () => {
  const [isLocked, setIsLocked] = useState(true);
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  
  const [stage, setStage] = useState<AppStage>('question');
  const [selectedGift, setSelectedGift] = useState<GiftType | null>(null);

  const handleUnlock = (e: React.FormEvent) => {
    e.preventDefault();
    if (password.toLowerCase().trim() === SECRET_CODE.toLowerCase()) {
      setIsLocked(false);
    } else {
      setError(true);
      setTimeout(() => setError(false), 500);
    }
  };

  const handleAccept = () => {
    setStage('gift-selection');
  };

  const handleGiftSelect = (type: GiftType) => {
    setSelectedGift(type);
    setStage('view-gift');
  };

  if (isLocked) {
    return (
      <div className="min-h-screen bg-[#fff5f5] flex items-center justify-center p-6 relative overflow-hidden">
        <HeartBackground />
        <form 
          onSubmit={handleUnlock}
          className={`bg-white/80 backdrop-blur-xl p-10 rounded-[2.5rem] shadow-2xl z-10 w-full max-w-md text-center border-2 border-white transition-transform ${error ? 'animate-shake' : ''}`}
        >
          <div className="w-20 h-20 bg-red-100 text-red-500 rounded-full flex items-center justify-center mx-auto mb-8 shadow-inner">
            <Lock size={32} />
          </div>
          <h1 className="text-2xl font-cursive text-red-600 mb-6">Это только для твоих глаз...</h1>
          <p className="text-gray-500 text-sm mb-8">Выше нос "..."</p>
          
          <input 
            type="password" 
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Секретное слово"
            className="w-full px-6 py-4 rounded-2xl border-2 border-red-100 focus:border-red-400 focus:outline-none text-center text-xl tracking-widest text-red-600 mb-6 bg-white/50"
            autoFocus
          />
          
          <button 
            type="submit"
            className="w-full bg-red-500 hover:bg-red-600 text-white font-bold py-4 rounded-2xl shadow-lg transition-all active:scale-95"
          >
            Открыть сердце
          </button>
          
          {error && <p className="text-red-400 text-sm mt-4 animate-pulse">Неверный код, попробуй еще раз ❤️</p>}
        </form>
        
        <style>{`
          @keyframes shake {
            0%, 100% { transform: translateX(0); }
            25% { transform: translateX(-10px); }
            75% { transform: translateX(10px); }
          }
          .animate-shake { animation: shake 0.4s ease-in-out; }
        `}</style>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#fff5f5] text-gray-900 relative overflow-hidden flex flex-col">
      <HeartBackground />
      
      {/* Header */}
      <header className="p-6 flex justify-between items-center z-20">
        <div className="flex items-center gap-2 text-red-500 font-cursive text-2xl hover:scale-105 transition-transform cursor-default">
          <Heart className="animate-pulse" fill="currentColor" size={28} />
          <span>С Любовью</span>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex flex-col items-center justify-center p-4 z-10">
        {stage === 'question' && (
          <ValentineQuestion onAccept={handleAccept} />
        )}

        {stage === 'gift-selection' && (
          <div className="max-w-5xl w-full text-center animate-screen-entry">
            <h2 className="text-4xl md:text-5xl font-cursive text-red-600 mb-4 px-4">
              Ты сделала меня самым счастливым!
            </h2>
            <p className="text-lg text-gray-600 mb-12 px-4">Выбери один из трех подарков, который я приготовил для тебя:</p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 px-4">
              <button 
                onClick={() => handleGiftSelect(GiftType.ART)}
                className="group bg-white/70 backdrop-blur-sm p-8 rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-3 border-2 border-transparent hover:border-red-200 float-card"
                style={{ animationDelay: '0s' }}
              >
                <div className="w-20 h-20 bg-red-100 text-red-500 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 group-hover:rotate-6 transition-all duration-500">
                  <Gift size={40} />
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-2">Творческое Послание</h3>
                <p className="text-sm text-gray-500">Особенные слова только для тебя</p>
              </button>

              <button 
                onClick={() => handleGiftSelect(GiftType.PLAYER)}
                className="group bg-white/70 backdrop-blur-sm p-8 rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-3 border-2 border-transparent hover:border-red-200 float-card"
                style={{ animationDelay: '0.2s' }}
              >
                <div className="w-20 h-20 bg-pink-100 text-pink-500 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 group-hover:-rotate-6 transition-all duration-500">
                  <Music size={40} />
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-2">Ритм Сердца</h3>
                <p className="text-sm text-gray-500">Мелодия, звучащая в такт нашей любви</p>
              </button>

              <button 
                onClick={() => handleGiftSelect(GiftType.DREAMS)}
                className="group bg-white/70 backdrop-blur-sm p-8 rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-3 border-2 border-transparent hover:border-red-200 float-card"
                style={{ animationDelay: '0.4s' }}
              >
                <div className="w-20 h-20 bg-orange-100 text-orange-500 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 group-hover:rotate-12 transition-all duration-500">
                  <Sparkles size={40} />
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-2">Наши Мечты</h3>
                <p className="text-sm text-gray-500">Путешествие в наше общее завтра</p>
              </button>
            </div>
          </div>
        )}

        {stage === 'view-gift' && selectedGift && (
          <div className="w-full animate-screen-entry">
            <GiftView 
              type={selectedGift} 
              onBack={() => setStage('gift-selection')} 
            />
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="p-8 text-center text-gray-400 text-xs md:text-sm z-20">
        <p className="opacity-70">© 2026 Твой навеки ❤️ Создано специально для самой прекрасной</p>
      </footer>
    </div>
  );
};

export default App;
