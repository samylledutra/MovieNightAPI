import axios from 'axios';

const apiKey = import.meta.env.VITE_TMDB_API_KEY;

const apiClient = axios.create({
  baseURL: 'https://api.themoviedb.org/3',
  params: {
    api_key: apiKey,
    language: 'pt-BR',
  },
});

/**
 * Busca a lista oficial de gêneros de filmes do TMDb.
 */
export const fetchGenres = () => {
  return apiClient.get('/genre/movie/list');
};

/**
 * Pesquisa filmes por um termo (query).
 */
export const searchMovies = (query, page = 1) => {
  return apiClient.get('/search/movie', {
    params: {
      query: query,
      page: page,
      include_adult: false,
    },
  });
};

/**
 * Descobre filmes com base em filtros como provedor de streaming e gênero.
 */
export const discoverMovies = (providerId, genreId, page = 1) => {
  const params = {
    watch_region: 'BR',
    sort_by: 'popularity.desc',
    page: page,
    with_watch_providers: providerId,
    with_watch_monetization_types: 'flatrate',
  };

  // Adiciona o filtro de gênero apenas se um gênero for selecionado
  if (genreId) {
    params.with_genres = genreId;
  }

  return apiClient.get('/discover/movie', { params });
};


export const getImageUrl = (path) => {
  // Retorna uma imagem placeholder se o caminho não existir
  if (!path) {
    return 'https://via.placeholder.com/500x750.png?text=No+Image';
  }
  return `https://image.tmdb.org/t/p/w500${path}`;
};