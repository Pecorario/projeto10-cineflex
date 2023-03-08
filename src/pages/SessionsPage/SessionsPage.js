import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import axios from 'axios';
import styled from 'styled-components';

import FooterSessions from '../../components/FooterSessions';
import Session from '../../components/Session';

export default function SessionsPage() {
  const [isLoading, setIsLoading] = useState(false);
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
    <PageContainer>
      Selecione o horário
      {!isLoading && selectedMovie !== undefined && (
        <>
          <div>
            {selectedMovie?.days.map(session => (
              <Session key={session.id} session={session} />
            ))}
          </div>
          <FooterSessions movie={selectedMovie} />
        </>
      )}
    </PageContainer>
  );
}

const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  font-family: 'Roboto';
  font-size: 24px;
  text-align: center;
  color: #293845;
  margin-top: 30px;
  padding-bottom: 120px;
  padding-top: 70px;
  div {
    margin-top: 20px;
  }
`;
