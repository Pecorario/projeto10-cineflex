import { useNavigate } from 'react-router-dom';

import styled from 'styled-components';

import Movie from '../../components/Movie';

export default function HomePage({ movies }) {
  const navigate = useNavigate();

  function handleSelectMovie(id) {
    navigate(`/sessoes/${id}`);
  }

  return (
    <PageContainer>
      Selecione o filme
      <ListContainer>
        {movies.map(movie => (
          <Movie
            key={movie.id}
            item={movie}
            handleSelectMovie={() => handleSelectMovie(movie.id)}
          />
        ))}
      </ListContainer>
    </PageContainer>
  );
}

const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  font-family: 'Roboto';
  font-size: 24px;
  text-align: center;
  color: #293845;
  margin-top: 30px;
  padding-top: 70px;
`;
const ListContainer = styled.div`
  width: 330px;
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
  padding: 10px;
`;
