import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import axios from 'axios';
import styled, { css } from 'styled-components';
import FooterSeats from '../../components/FooterSeats';
import Seat from '../../components/Seat';

export default function SeatsPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [selectedSession, setSelectedSession] = useState(undefined);
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [name, setName] = useState('');
  const [cpf, setCpf] = useState('');

  const { idSessao } = useParams();

  async function handleLoadSession() {
    try {
      setIsLoading(true);
      const { data } = await axios.get(
        `https://mock-api.driven.com.br/api/v8/cineflex/showtimes/${idSessao}/seats`
      );

      setSelectedSession(data);
    } catch (error) {
      console.log('error: ', error.response.data);
    } finally {
      setIsLoading(false);
    }
  }

  function handleSelectedSeat(id, isAvailable) {
    if (!selectedSeats.includes(id) && isAvailable) {
      setSelectedSeats(prevState => [...prevState, id]);
    } else if (!isAvailable) {
      alert('Esse assento não está disponível');
    } else {
      const newSeats = selectedSeats.filter(item => item !== id);
      setSelectedSeats(newSeats);
    }
  }

  async function handleSubmit() {
    try {
      setIsLoading(true);

      await axios.post(
        'https://mock-api.driven.com.br/api/v8/cineflex/seats/book-many',
        {
          ids: selectedSeats,
          name,
          cpf
        }
      );

      setName('');
      setCpf('');
      setSelectedSeats([]);
      handleLoadSession();
    } catch (error) {
      console.log(error.response.data);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    handleLoadSession();
  }, []);

  return (
    <PageContainer>
      {!isLoading && selectedSession !== undefined && (
        <>
          Selecione o(s) assento(s)
          <SeatsContainer>
            {selectedSession?.seats.map(seat => (
              <Seat
                key={seat.id}
                seat={seat}
                isSelected={selectedSeats.includes(seat.id)}
                handleSelectedSeat={handleSelectedSeat}
              >
                {seat.name}
              </Seat>
            ))}
          </SeatsContainer>
          <CaptionContainer>
            <CaptionItem>
              <CaptionCircle isSelected />
              Selecionado
            </CaptionItem>
            <CaptionItem>
              <CaptionCircle isAvailable />
              Disponível
            </CaptionItem>
            <CaptionItem>
              <CaptionCircle />
              Indisponível
            </CaptionItem>
          </CaptionContainer>
          <FormContainer>
            Nome do Comprador:
            <input
              placeholder="Digite seu nome..."
              value={name}
              onChange={e => setName(e.target.value)}
            />
            CPF do Comprador:
            <input
              placeholder="Digite seu CPF..."
              value={cpf}
              onChange={e => setCpf(e.target.value)}
            />
            <button onClick={handleSubmit} disabled={!name && !cpf}>
              Reservar Assento(s)
            </button>
          </FormContainer>
          <FooterSeats selectedSession={selectedSession} />
        </>
      )}
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
  padding-bottom: 120px;
  padding-top: 70px;
`;
const SeatsContainer = styled.div`
  width: 330px;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  margin-top: 20px;
`;
const FormContainer = styled.div`
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
`;
const CaptionContainer = styled.div`
  display: flex;
  flex-direction: row;
  width: 300px;
  justify-content: space-between;
  margin: 20px;
`;
const CaptionCircle = styled.div`
  height: 25px;
  width: 25px;
  border-radius: 25px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 5px 3px;

  ${({ isAvailable }) =>
    isAvailable
      ? css`
          border: 1px solid #808f9d;
          background-color: #c3cfd9;
        `
      : css`
          border: 1px solid #f7c52b;
          background-color: #fbe192;
        `}

  ${({ isSelected }) =>
    isSelected &&
    css`
      border: 1px solid #0e7d71;
      background-color: #1aae9e;
    `}
`;
const CaptionItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  font-size: 12px;
`;
