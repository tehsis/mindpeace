import React from 'react';
import { meditate } from '../Model/session';
import { useState, useEffect } from 'react';
import Circle from './Circle';

import styled from 'styled-components';

const phases = [
    10,
    20,
    60,
    10
  ];

const defaultTime = 10;

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #f3eef2;
`

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
      musicPlayer.load();
      musicPlayer.play();
      setCurrent(0);
    });
  
    session.onMeditationFinished(() => { 
      musicPlayer.pause();
    });
  
    session.onPhaseFinished(() => {
      gongPlayer.play();
      setCurrent(current+1);
    });
  }, [gongPlayer, musicPlayer, session, current]);

  return <Wrapper>
    <Circle colors={[ 
      "#a4ceff",
      "#b0d4ff",
      "#bbdaff",
     "#c6e0ff",
    ]} phases={session.phases} current={current} started={isMeditating} />
   
    <button onClick={onMeditationButtonClick}>
      {
        isMeditating 
          ? 'stop'
          : 'start'
      }
    </button>
    <input disabled={isMeditating} type="number" onInput={onTimeChanged} defaultValue={defaultTime} step="5" />
    <audio loop ref={setMusicPlayer} src="/static/rain.wav" />
    <audio ref={setGongPlayer} src="/static/gong.wav" />
  </Wrapper>
} 

export default MindPeace;