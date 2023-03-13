import * as S from './style';

export default function Movie({ item, handleSelectMovie }) {
  return (
    <S.MovieContainer data-test="movie">
      <img src={item.posterURL} alt={item.title} onClick={handleSelectMovie} />
    </S.MovieContainer>
  );
}
