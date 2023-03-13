import { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';

import axios from 'axios';

import HomePage from './pages/HomePage';
import SeatsPage from './pages/SeatsPage';
import SessionsPage from './pages/SessionsPage';
import SuccessPage from './pages/SuccessPage';

import Loading from './components/Loading';
import Header from './components/Header';

export default function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [movies, setMovies] = useState([]);
  const [order, setOrder] = useState({});

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
      <Header />

      {isLoading && <Loading />}

      <Routes>
        <Route path="/" element={<HomePage movies={movies} />} />
        <Route
          path="/sessoes/:idFilme"
          element={
            <SessionsPage isLoading={isLoading} setIsLoading={setIsLoading} />
          }
        />
        <Route
          path="/assentos/:idSessao"
          element={
            <SeatsPage
              isLoading={isLoading}
              setIsLoading={setIsLoading}
              setOrder={setOrder}
            />
          }
        />
        <Route
          path="/sucesso"
          element={
            <SuccessPage
              isLoading={isLoading}
              setIsLoading={setIsLoading}
              order={order}
            />
          }
        />
      </Routes>
    </>
  );
}
