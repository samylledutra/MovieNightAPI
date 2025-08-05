import React, { useState, useEffect } from 'react';
import { discoverMovies, fetchGenres, searchMovies } from './api/tmdb';
import MovieList from './components/MovieList';
import Pagination from './components/Pagination';
import Filters from './components/Filters';
import './App.css';

const STREAMING_PROVIDERS = {
  'Netflix': 8,
  'Prime Video': 119,
  'Max': 1899,
};

function App() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // ESTADOS DOS FILTROS
  const [selectedProvider, setSelectedProvider] = useState('Netflix');
  const [searchTerm, setSearchTerm] = useState('');
  const [activeSearchTerm, setActiveSearchTerm] = useState(''); // Termo usado para a busca efetiva
  const [genres, setGenres] = useState([]);
  const [selectedGenre, setSelectedGenre] = useState('');

  // ESTADOS DA PAGINAÇÃO
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  // BUSCA A LISTA DE GÊNEROS UMA VEZ QUANDO A APLICAÇÃO CARREGA
  useEffect(() => {
    const loadGenres = async () => {
      try {
        const response = await fetchGenres();
        setGenres(response.data.genres);
      } catch (err) {
        console.error("Falha ao buscar gêneros", err);
      }
    };
    loadGenres();
  }, []);

  // LÓGICA PRINCIPAL PARA BUSCAR FILMES (BUSCA OU DESCOBERTA)
  useEffect(() => {
    window.scrollTo(0, 0);
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);
        let response;

        if (activeSearchTerm) {
          // MODO DE BUSCA
          response = await searchMovies(activeSearchTerm, currentPage);
        } else {
          // MODO DE DESCOBERTA (FILTROS)
          const providerId = STREAMING_PROVIDERS[selectedProvider];
          response = await discoverMovies(providerId, selectedGenre, currentPage);
        }

        setMovies(response.data.results);
        setTotalPages(response.data.total_pages);
      } catch (err) {
        setError('Falha ao buscar os filmes. Tente novamente mais tarde.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [selectedProvider, currentPage, selectedGenre, activeSearchTerm]);

  const handleProviderChange = (providerName) => {
    setSelectedProvider(providerName);
    setCurrentPage(1);
    setActiveSearchTerm(''); // Limpa a busca ao trocar de provedor
  };

  const handleGenreChange = (e) => {
    setSelectedGenre(e.target.value);
    setCurrentPage(1);
    setActiveSearchTerm(''); // Limpa a busca ao trocar de gênero
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };
  
  const handleSearchSubmit = (e) => {
    e.preventDefault();
    setActiveSearchTerm(searchTerm);
    setCurrentPage(1);
  };

  return (
    <section className="App">
      <header>
        <nav>
          {Object.keys(STREAMING_PROVIDERS).map((providerName) => (
            <button
              key={providerName}
              onClick={() => handleProviderChange(providerName)}
              className={selectedProvider === providerName && !activeSearchTerm ? 'active' : ''}
              disabled={!!activeSearchTerm} // Desabilita enquanto busca
            >
              {providerName}
            </button>
          ))}
        </nav>
      </header>
      
      <Filters
        searchTerm={searchTerm}
        onSearchChange={handleSearchChange}
        onSearchSubmit={handleSearchSubmit}
        genres={genres}
        selectedGenre={selectedGenre}
        onGenreChange={handleGenreChange}
      />

      <main>
        {loading && <p>Carregando filmes...</p>}
        {error && <p className="error">{error}</p>}
        {!loading && !error && movies.length > 0 && (
          <>
            <MovieList movies={movies} />
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={setCurrentPage}
            />
          </>
        )}
        {!loading && !error && movies.length === 0 && (
          <p>Nenhum filme encontrado com os critérios selecionados.</p>
        )}
      </main>

        <footer className="app-footer">
        <p>
          This product uses the TMDb API but is not endorsed or certified by TMDb.
        </p>
      </footer>

    </section>
  );
}

export default App;