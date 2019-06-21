import styled from 'styled-components';

const phases = [
    10,
    20,
    60,
    10
  ];

const defaultTime = 10;

export const Title = styled.h1`
  position: sticky;
  font-family: Arial, Helvetica, sans-serif;
  top: 5rem;
  font-size: 6rem;
  color: #4d76a5;
`;

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #f3eef2;
`

export const TimeInput = styled.input`
  position: relative;
  visibility: ${({hide}) => hide ? 'hidden' : 'visible'};
  background-color: transparent;
  border: none;
  margin-top: 3rem;
  font-weight: bold;
  height: 5rem;
  text-align: right;
  font-size: 3rem;
  width: 5rem;
  color: #7e8895;
`;

export const StartButton = styled.button`
position: relative;
  background-color: transparent;
  border: none;
  font-weight: bold;
  border-radius: 0.5rem;
  color: #4d76a5;
  font-size: 3rem;
  cursor: pointer;
  width: 10rem;
  height: 5rem;
  letter-spacing: 0.2rem;
  &:hover {
    background-color: #4d76a5;
    color: #f3eef2;
  }
`;