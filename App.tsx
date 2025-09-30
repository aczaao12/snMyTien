import React, { useState } from 'react';
import Greeting from './components/Greeting';
import Message from './components/Message';
import FunFacts from './components/FunFacts';
import NameGenerator from './components/NameGenerator';
import Wishes from './components/Wishes';
import Lanterns from './components/Lanterns';
import MusicPlayer from './components/MusicPlayer';
import IntroScroll from './components/IntroScroll';
import ZodiacQuiz from './components/ZodiacQuiz';

const App: React.FC = () => {
  const [introVisible, setIntroVisible] = useState(true);

  const handleIntroEnd = () => {
    setIntroVisible(false);
  };

  return (
    <div className="relative min-h-screen bg-animated-gradient text-slate-800 antialiased overflow-x-hidden">
      {introVisible && <IntroScroll onEnd={handleIntroEnd} />}
      <div className={`transition-opacity duration-1000 ${introVisible ? 'opacity-0' : 'opacity-100'}`}>
        <Lanterns />
        <main>
          <Greeting />
          <div className="relative z-10 space-y-12 pb-24">
            <Message />
            <FunFacts />
            <ZodiacQuiz />
            <NameGenerator />
            <Wishes />
          </div>
        </main>
        <MusicPlayer />
      </div>
    </div>
  );
};

export default App;