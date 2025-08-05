import React from 'react';
import { getImageUrl } from '../api/tmdb';

const MovieCard = ({ movie }) => {
  return (
    <div className="movie-card">
      <img 
        src={getImageUrl(movie.poster_path)} 
        alt={`Pôster do filme ${movie.title}`} 
      />
      <div className="movie-info">
        <h3>{movie.title}</h3>
        <p>Avaliação: {movie.vote_average.toFixed(1)} ⭐</p>
        <div className="movie-overview">
          <h4>Sinopse:</h4>
          <p>{movie.overview || "Sinopse não disponível."}</p>
        </div>
      </div>
    </div>
  );
};

export default MovieCard;