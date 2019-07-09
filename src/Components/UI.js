import styled, { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`
  body {
    background-color: #f3eef2;
  }
`

export const Wrapper = styled.div`
`
export const StartButton = styled.button`
  position: absolute;
  display: block;
  top: 50%;
  transform: translateY(-50%);
  visibility: ${({hide}) => hide ? 'hidden' : 'visible'};
  background-color: transparent;
  border: none;
  font-weight: bold;
  border-radius: 0.5rem;
  color: #4d76a5;
  font-size: 3rem;
  cursor: pointer;
  width: 100%;
  height: 5rem;
  letter-spacing: 0.2rem;
  &:hover {
    color: #f3eef2;
  }
`;


export const Footer = styled.div`
  position: fixed;
  bottom: 1.5rem;
  width: 100%;
  text-align: center;
`
