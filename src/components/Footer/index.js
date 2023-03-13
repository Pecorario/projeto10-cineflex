import * as S from './style';

export default function Footer({
  movie = undefined,
  selectedSession = undefined
}) {
  return (
    <S.FooterContainer data-test="footer">
      <div>
        <img
          src={movie ? movie.posterURL : selectedSession.movie.posterURL}
          alt="poster"
        />
      </div>
      <div>
        <p>{movie ? movie.title : selectedSession.movie.title}</p>

        {selectedSession && (
          <p>
            {selectedSession.day.weekday} - {selectedSession.day.date}
          </p>
        )}
      </div>
    </S.FooterContainer>
  );
}
