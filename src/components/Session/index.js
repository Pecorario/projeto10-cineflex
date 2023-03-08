import { useNavigate } from 'react-router-dom';

import styled from 'styled-components';

export default function Session({ session }) {
  const navigate = useNavigate();

  function handleSelectSession(id) {
    navigate(`/assentos/${id}`);
  }

  return (
    <SessionContainer>
      {session.weekday} - {session.date}
      <ButtonsContainer>
        {session.showtimes.map(showtime => (
          <button
            key={showtime.id}
            onClick={() => handleSelectSession(showtime.id)}
          >
            {showtime.name}
          </button>
        ))}
      </ButtonsContainer>
    </SessionContainer>
  );
}

const SessionContainer = styled.div`
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

const ButtonsContainer = styled.div`
  display: flex;
  flex-direction: row;
  margin-top: 20px;
  gap: 20px;

  button:hover {
    cursor: pointer;
    filter: brightness(0.95);
  }
`;
