import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import axios from 'axios';

import Footer from '../../components/Footer';
import Session from '../../components/Session';

import * as S from './style';

export default function SessionsPage({ isLoading, setIsLoading }) {
  const [selectedMovie, setSelectedMovie] = useState(undefined);

  const { idFilme } = useParams();

  async function handleLoadSessions() {
    try {
      setIsLoading(true);
      const { data } = await axios.get(
        `https://mock-api.driven.com.br/api/v8/cineflex/movies/${idFilme}/showtimes`
      );

      setSelectedMovie(data);
    } catch (error) {
      console.log('error: ', error.response.data);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    handleLoadSessions();
  }, []);

  return (
    <S.PageContainer>
      Selecione o horário
      {!isLoading && selectedMovie !== undefined && (
        <>
          <div>
            {selectedMovie?.days.map(session => (
              <Session key={session.id} session={session} />
            ))}
          </div>
          <Footer movie={selectedMovie} />
        </>
      )}
    </S.PageContainer>
  );
}
