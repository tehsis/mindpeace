import React from 'react';
import styled, { keyframes }  from 'styled-components';

const scaleOut = keyframes`
  from {
      transform: scale(0)
  }

  to {
      transform: scale(1)
  };
`

const Circle =styled.div`
    position: absolute;
    top: 50vh;
    width: 20rem;
    height: 20rem;
    background-color: ${({color}) => color};
    border-radius: 100%;
    transform: scale(0);
`;

const GoingCircle = styled(Circle)`
    animation: ${scaleOut} ${({duration}) => duration}ms linear;
`;

const CompletedCircle = styled(Circle)`
  transform: scale(1);
`;

const CircleComponent = ({phases, current, colors}) =>  {
    return <>
        <CompletedCircle color="#83bcff" />
        {phases.map((phase, index) => {
         if (current === index) {
             return <GoingCircle key={index} duration={phase} color={colors[index]} /> 
         }

         if (current > index) {
            return <CompletedCircle key={index} color={colors[index] } />
         }
    
         return null
 
   })}
    </> 
}
export default CircleComponent;     