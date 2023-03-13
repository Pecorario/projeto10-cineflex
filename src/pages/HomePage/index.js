import { useNavigate } from 'react-router-dom';

import Movie from '../../components/Movie';

import * as S from './style';

export default function HomePage({ movies }) {
  const navigate = useNavigate();

  function handleSelectMovie(id) {
    navigate(`/sessoes/${id}`);
  }

  return (
    <S.PageContainer>
      Selecione o filme
      <S.ListContainer>
        {movies.map(movie => (
          <Movie
            key={movie.id}
            item={movie}
            handleSelectMovie={() => handleSelectMovie(movie.id)}
          />
        ))}
      </S.ListContainer>
    </S.PageContainer>
  );
}
