import React from 'react';

const Filters = ({
  searchTerm,
  onSearchChange,
  onSearchSubmit,
  genres,
  selectedGenre,
  onGenreChange,
}) => {
  return (
    <div className="filters-container">
      <form onSubmit={onSearchSubmit} className="search-form">
        <input
          type="search"
          placeholder="Buscar por nome do filme..."
          value={searchTerm}
          onChange={onSearchChange}
        />
        <button type="submit">Buscar</button>
      </form>

      <div className="genre-filter">
        <select value={selectedGenre} onChange={onGenreChange}>
          <option value="">Todos os Gêneros</option>
          {genres.map((genre) => (
            <option key={genre.id} value={genre.id}>
              {genre.name}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default Filters;