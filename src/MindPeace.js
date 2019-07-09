import React from 'react';
import { meditate } from './Model/session';
import { useState, useEffect } from 'react';

import Circle from './Components/Circle';
import { Wrapper, StartButton, GlobalStyle, Footer } from './Components/UI';

const phases = [
    10,
    20,
    60,
    10
  ];

const defaultTime = 10;

const session = meditate({phases, minutes: defaultTime});


const MindPeace = () => {
  const [musicPlayer, setMusicPlayer] = useState(null);
  const [current, setCurrent] = useState(null);
  const [isMeditating, setIsMeditating] = useState(false);

  const onMeditationButtonClick = () => {
    if (isMeditating) {
      musicPlayer.pause();
    } else {
      musicPlayer.play();
    }
  };

  const onMusicPlayerStarted = () => setIsMeditating(true);
  const onMusicPlayerStoped = () => setIsMeditating(false);

  useEffect(() => {
    if (isMeditating) {
      session.start();
    } else {
      session.stop();
    }
  }, [isMeditating])

  useEffect(() => {
    session.onMeditationStarted(() => { 
      setCurrent(0);
    });
  
    session.onMeditationFinished(() => { 
      try {
        musicPlayer.pause();
      } catch (e) {}

      setCurrent(null);
    });
  
    session.onPhaseFinished(() => {
      setCurrent(current+1);
    });
  }, [musicPlayer, current]);

  return <> 
      <GlobalStyle />

    <Wrapper>
      <Circle onClick={onMeditationButtonClick} colors={[ 
        "#a4ceff",
        "#b0d4ff",
        "#bbdaff",
      "#c6e0ff",
      ]} phases={session.phases} current={current} started={isMeditating} />

     <StartButton hide={isMeditating} onClick={onMeditationButtonClick}>start</StartButton>
      <audio onPlaying={onMusicPlayerStarted} onPause={onMusicPlayerStoped} ref={setMusicPlayer} src="/static/10MinSession.mp3" />
    
      <Footer>by <a href="https://github.com/tehsis">Tehsis</a></Footer>
    </Wrapper>
  </>
} 

export default MindPeace;