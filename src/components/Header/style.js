import styled from 'styled-components';

export const NavContainer = styled.header`
  width: 100%;
  height: 70px;

  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #c3cfd9;

  position: fixed;
  top: 0;

  z-index: 100;

  div {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;

    position: relative;
  }

  p {
    color: #e8833a;
    font-size: 34px;
    font-family: 'Roboto', sans-serif;
  }

  button {
    background: transparent;
    position: absolute;
    left: 0;
  }
`;
