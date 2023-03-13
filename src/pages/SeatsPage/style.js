import styled, { css } from 'styled-components';

export const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  font-family: 'Roboto';
  font-size: 24px;
  text-align: center;
  color: #293845;
  margin-top: 30px;
  padding-bottom: 120px;
  padding-top: 70px;
`;

export const SeatsContainer = styled.div`
  width: 330px;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  margin-top: 20px;
`;

export const CaptionContainer = styled.div`
  display: flex;
  flex-direction: row;
  width: 300px;
  justify-content: space-between;
  margin: 20px;
`;

export const CaptionCircle = styled.div`
  height: 25px;
  width: 25px;
  border-radius: 25px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 5px 3px;

  ${({ isAvailable }) =>
    isAvailable
      ? css`
          border: 1px solid #808f9d;
          background-color: #c3cfd9;
        `
      : css`
          border: 1px solid #f7c52b;
          background-color: #fbe192;
        `}

  ${({ isSelected }) =>
    isSelected &&
    css`
      border: 1px solid #0e7d71;
      background-color: #1aae9e;
    `}
`;

export const CaptionItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  font-size: 12px;
`;
