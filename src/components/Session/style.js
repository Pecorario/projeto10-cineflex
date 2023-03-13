import styled from 'styled-components';

export const SessionContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  font-family: 'Roboto';
  font-size: 20px;
  color: #293845;
  padding: 0 20px;

  :last-child {
    margin-bottom: 20px;
  }
`;

export const ButtonsContainer = styled.div`
  display: flex;
  flex-direction: row;
  margin-top: 20px;
  gap: 20px;

  button:hover {
    cursor: pointer;
    filter: brightness(0.95);
  }
`;
