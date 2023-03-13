import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

import axios from 'axios';

import Footer from '../../components/Footer';
import Seat from '../../components/Seat';
import Form from '../../components/Form';

import * as S from './style';

export default function SeatsPage({ isLoading, setIsLoading, setOrder }) {
  const [selectedSession, setSelectedSession] = useState(undefined);
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [infos, setInfos] = useState([]);

  const navigate = useNavigate();
  const { idSessao } = useParams();

  function resetData() {
    setInfos([]);
    setSelectedSeats([]);
  }

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
      const newInfo = {
        idAssento: id,
        nome: '',
        cpf: ''
      };

      setSelectedSeats(prevState => [...prevState, id]);
      setInfos(prevState => [...prevState, newInfo]);
    } else if (!isAvailable) {
      alert('Esse assento não está disponível');
    } else {
      if (
        window.confirm(
          'Você gostaria, realmente, de remover este assento e apagar os dados salvos?'
        )
      ) {
        const newSeats = selectedSeats.filter(item => item !== id);
        const newInfos = infos.filter(item => item.idAssento !== id);
        setSelectedSeats(newSeats);
        setInfos(newInfos);
      }
    }
  }

  async function handleSubmit() {
    try {
      setIsLoading(true);

      await axios.post(
        'https://mock-api.driven.com.br/api/v8/cineflex/seats/book-many',
        {
          ids: selectedSeats,
          compradores: infos
        }
      );

      const seatsNumber = selectedSession?.seats
        .filter(item => selectedSeats.includes(item.id))
        .map(item => item.name);

      const newInfos = infos?.map((info, idx) => {
        return {
          seatNumber: seatsNumber[idx],
          cpf: info.cpf,
          name: info.nome
        };
      });

      const order = {
        movie: selectedSession.movie.title,
        hour: selectedSession.name,
        date: selectedSession.day.date,
        ids: seatsNumber,
        buyers: newInfos
      };

      setOrder(order);
      navigate('/sucesso');
    } catch (error) {
      console.log(error.response.data);
    } finally {
      setIsLoading(false);
      resetData();
    }
  }

  useEffect(() => {
    handleLoadSession();
  }, []);

  return (
    <S.PageContainer>
      {!isLoading && selectedSession !== undefined && (
        <>
          Selecione o(s) assento(s)
          <S.SeatsContainer>
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
          </S.SeatsContainer>
          <S.CaptionContainer>
            <S.CaptionItem>
              <S.CaptionCircle isSelected />
              Selecionado
            </S.CaptionItem>
            <S.CaptionItem>
              <S.CaptionCircle isAvailable />
              Disponível
            </S.CaptionItem>
            <S.CaptionItem>
              <S.CaptionCircle />
              Indisponível
            </S.CaptionItem>
          </S.CaptionContainer>
          <Form
            seats={selectedSession?.seats}
            infos={infos}
            setInfos={setInfos}
            handleSubmit={handleSubmit}
          />
          <Footer selectedSession={selectedSession} />
        </>
      )}
    </S.PageContainer>
  );
}
