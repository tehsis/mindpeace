import React from 'react';
import { meditate } from './Model/session';
import { useState, useEffect } from 'react';

import Circle from './Components/Circle';
import {Wrapper, StartButton, TimeInput, Title} from './Components/UI';

const phases = [
    10,
    20,
    60,
    10
  ];

const defaultTime = 10;

const MindPeace = () => {

  const [musicPlayer, setMusicPlayer] = useState(null);
  const [gongPlayer, setGongPlayer] = useState(null);

  const [session, setSession] = useState(meditate({phases, minutes: defaultTime}));
  const [current, setCurrent] = useState(null);
  const [isMeditating, setIsMeditating] = useState(false);

  const onTimeChanged = ({target}) => setSession(meditate({ phases, minutes: target.value }));

  const onMeditationButtonClick = () => setIsMeditating(!isMeditating);

  useEffect(() => {
    if (isMeditating) {
      session.start();
    } else {
      session.stop();
    }
  }, [isMeditating, session])

  useEffect(() => {
    session.onMeditationStarted(() => {  
      try {
        musicPlayer.load();
        musicPlayer.play();
      } catch(e) {
        // iOS and maybe other browsers won't allow to play sounds without a user interaction.
      }
      setCurrent(0);
    });
  
    session.onMeditationFinished(() => { 
      try {
        musicPlayer.pause();
      } catch (e) {}

      setCurrent(null);
    });
  
    session.onPhaseFinished(() => {
      try {
        gongPlayer.play();
      } catch(e) {}
      setCurrent(current+1);
    });
  }, [gongPlayer, musicPlayer, session, current]);

  return <Wrapper>
    <Title hide={isMeditating}>Mind Peace</Title>
    <Circle onClick={onMeditationButtonClick} colors={[ 
      "#a4ceff",
      "#b0d4ff",
      "#bbdaff",
     "#c6e0ff",
    ]} phases={session.phases} current={current} started={isMeditating} />

    <TimeInput hide={isMeditating} type="number" onInput={onTimeChanged} defaultValue={defaultTime} step="5" max="30" min="10" />

    <StartButton hide={isMeditating} onClick={onMeditationButtonClick}>start</StartButton>
    <audio loop ref={setMusicPlayer} src="/static/rain.wav" />
    <audio ref={setGongPlayer} src="/static/gong.wav" />
  </Wrapper>
} 

export default MindPeace;