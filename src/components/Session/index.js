import { useNavigate } from 'react-router-dom';

import * as S from './style';

export default function Session({ session }) {
  const navigate = useNavigate();

  function handleSelectSession(id) {
    navigate(`/assentos/${id}`);
  }

  return (
    <S.SessionContainer data-test="movie-day">
      {session.weekday} - {session.date}
      <S.ButtonsContainer>
        {session.showtimes.map(showtime => (
          <button
            key={showtime.id}
            data-test="showtime"
            onClick={() => handleSelectSession(showtime.id)}
          >
            {showtime.name}
          </button>
        ))}
      </S.ButtonsContainer>
    </S.SessionContainer>
  );
}
