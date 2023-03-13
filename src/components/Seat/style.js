import styled, { css } from 'styled-components';

export const SeatItem = styled.div`
  height: 25px;
  width: 25px;
  border-radius: 25px;
  font-family: 'Roboto';
  font-size: 11px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 5px 3px;

  ${({ isAvailable }) =>
    isAvailable &&
    css`
      border: 1px solid #808f9d;
      background-color: #c3cfd9;

      :hover {
        cursor: pointer;
        filter: brightness(0.95);
      }
    `}

  ${({ isAvailable }) =>
    !isAvailable &&
    css`
      border: 1px solid #f7c52b;
      background-color: #fbe192;

      :hover {
        cursor: not-allowed;
      }
    `}

  ${({ isSelected }) =>
    isSelected &&
    css`
      border: 1px solid #0e7d71;
      background-color: #1aae9e;
    `}
`;
