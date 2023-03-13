import { useNavigate } from 'react-router-dom';

import * as S from './style';

export default function SuccessPage({ isLoading, order }) {
  const navigate = useNavigate();

  function formatCpf(v) {
    v = v.replace(/\D/g, '');
    v = v.replace(/(\d{3})(\d)/, '$1.$2');
    v = v.replace(/(\d{3})(\d)/, '$1.$2');
    v = v.replace(/(\d{3})(\d{1,2})$/, '$1-$2');
    return v;
  }

  function goHome() {
    navigate('/');
  }

  return (
    <>
      {!isLoading && (
        <S.PageContainer>
          <h1>
            Pedido feito <br /> com sucesso!
          </h1>

          <S.TextContainer data-test="movie-info">
            <strong>
              <p>Filme e sessão</p>
            </strong>
            <p>{order.movie}</p>
            <p>
              {order.date} - {order.hour}
            </p>
          </S.TextContainer>

          <S.TextContainer data-test="seats-info">
            <strong>
              <p>Ingressos</p>
            </strong>

            {order?.ids.map(id => (
              <p key={id}>Assento {id}</p>
            ))}
          </S.TextContainer>

          <S.BuyersContainer data-test="client-info">
            {order?.buyers.map(item => (
              <S.TextContainer key={item.seatNumber}>
                <strong>
                  <p>Comprador - Poltrona {item.seatNumber}</p>
                </strong>
                <p>Nome: {item.name}</p>
                <p>CPF: {formatCpf(item.cpf)}</p>
              </S.TextContainer>
            ))}
          </S.BuyersContainer>

          <button data-test="go-home-btn" onClick={goHome}>
            Voltar para Home
          </button>
        </S.PageContainer>
      )}
    </>
  );
}
