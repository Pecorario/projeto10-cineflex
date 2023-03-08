import { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';

import axios from 'axios';

import styled from 'styled-components';

import HomePage from './pages/HomePage/HomePage';
import SeatsPage from './pages/SeatsPage/SeatsPage';
import SessionsPage from './pages/SessionsPage/SessionsPage';
import SuccessPage from './pages/SuccessPage/SuccessPage';

export default function App() {
  const [isLoading, setIsLoading] = useState(false);
  const [movies, setMovies] = useState([]);

  async function handleLoadMovies() {
    try {
      setIsLoading(true);

      const { data } = await axios.get(
        'https://mock-api.driven.com.br/api/v8/cineflex/movies'
      );

      setMovies(data);
    } catch (error) {
      console.log('error: ', error.response.data);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    handleLoadMovies();
  }, []);

  return (
    <>
      <NavContainer>CINEFLEX</NavContainer>

      <Routes>
        <Route path="/" element={<HomePage movies={movies} />} />
        <Route path="/sessoes/:idFilme" element={<SessionsPage />} />
        <Route path="/assentos/:idSessao" element={<SeatsPage />} />
        <Route path="/sucesso" element={<SuccessPage />} />
      </Routes>
    </>
  );
}

const NavContainer = styled.div`
  width: 100%;
  height: 70px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #c3cfd9;
  color: #e8833a;
  font-family: 'Roboto', sans-serif;
  font-size: 34px;
  position: fixed;
  top: 0;
  a {
    text-decoration: none;
    color: #e8833a;
  }
`;
