import { useState } from 'react';
import './App.css';
import IntroAnimation from './components/IntroAnimation';
import ComingSoonContent from './components/ComingSoonContent';
import HeroBackground from './components/HeroBackground';

function App() {
  // Initialize state from session storage
  const [introComplete, setIntroComplete] = useState(() => {
    return !!sessionStorage.getItem('visibo_intro_shown');
  });

  const [moveLogoToHeader, setMoveLogoToHeader] = useState(() => {
    return !!sessionStorage.getItem('visibo_content_shown');
  });

  return (
    <>
      <HeroBackground />

      <IntroAnimation
        onComplete={() => setIntroComplete(true)}
        moveToHeader={moveLogoToHeader}
      />

      {introComplete && (
        <ComingSoonContent
          onSplashComplete={() => setMoveLogoToHeader(true)}
        />
      )}
    </>
  );
}

export default App;
