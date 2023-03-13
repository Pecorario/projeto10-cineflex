import { useNavigate, useLocation } from 'react-router-dom';

import * as S from './style';

import arrowLeft from '../../assets/arrowLeft.svg';

export default function Header() {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <S.NavContainer>
      <div>
        {location.pathname !== '/' && (
          <button onClick={() => navigate(-1)} data-test="go-home-header-btn">
            <img src={arrowLeft} alt="Voltar" />
          </button>
        )}
        <p>CINEFLEX</p>
      </div>
    </S.NavContainer>
  );
}
