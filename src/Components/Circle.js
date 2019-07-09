import React from 'react';
import styled, { keyframes }  from 'styled-components';

const scaleOut = keyframes`
  from {
      transform: translate(-50%, -50%) scale(0)
  }

  to {
      transform: translate(-50%, -50%) scale(1)
  };
`

const Circle = styled.div`
    position: absolute;
    cursor: pointer;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 20rem;
    height: 20rem;
    background-color: ${({color}) => color};
    border-radius: 100%;
`;

const GoingCircle = styled(Circle)`
    animation: ${scaleOut} ${({duration}) => duration}ms linear;
`;

const CompletedCircle = styled(Circle)`
  transform:  translate(-50%, -50%); scale(1);
`;

const CircleComponent = ({phases, current, colors, onClick}) =>  {
    return <>
        <CompletedCircle onClick={onClick} color="#83bcff" />
        {phases.map((phase, index) => {
         if (current === index) {
             return <GoingCircle  onClick={onClick} key={index} duration={phase} color={colors[index]} /> 
         }

         if (current > index) {
            return <CompletedCircle  onClick={onClick} key={index} color={colors[index] } />
         }
    
         return null
 
   })}
    </> 
}
export default CircleComponent;     