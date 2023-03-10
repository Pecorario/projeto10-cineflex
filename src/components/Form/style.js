import styled from 'styled-components';

export const FormContainer = styled.form`
  width: calc(100vw - 40px);
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin: 20px 0;
  font-size: 18px;

  button {
    align-self: center;
  }
  input {
    width: calc(100vw - 60px);
  }

  button:hover {
    cursor: pointer;
    filter: brightness(0.95);
  }
`;
