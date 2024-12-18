import { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles/App.css';
import SearchBar from '../components/SearchBar';
import MovieModal from '../components/MovieModal';

const Home = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selectedMovie, setSelectedMovie] = useState(null);

  const API_URL = 'https://www.omdbapi.com/';
  const API_KEY = '3da249cb';

  useEffect(() => {
    fetchDefaultMovies();
  }, []);

  const fetchDefaultMovies = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get(`${API_URL}?s=popular&apikey=${API_KEY}`);
      if (response.data.Response === 'True') {
        setMovies(response.data.Search.slice(0, 9));
      } else {
        setError(response.data.Error);
      }
    } catch {
      setError('Failed to fetch movies. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleMovieClick = (movie) => {
    setSelectedMovie(movie);
  };

  const closeModal = () => {
    setSelectedMovie(null);
  };

  const goBackToHome = () => {
    fetchDefaultMovies();
    setSelectedMovie(null);
  };

  return (
    <div className="movie-container">
     <div className="header-container">
  <SearchBar onSearch={(results) => setMovies(results)} />
  <div className="header-buttons">
    <button onClick={goBackToHome} className="back-to-home-button">Back to Home</button>
  </div>
</div>

      <h1>Popular Movie List</h1>
      {loading && <p>Loading movies...</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <div className="movie-grid">
        {movies.map((movie) => (
          <div key={movie.imdbID} className="movie-card" onClick={() => handleMovieClick(movie)}>
            <img src={movie.Poster} alt={movie.Title} className="movie-poster" />
            <h3 className="movie-title">{movie.Title}</h3>
            <p className="movie-year">{movie.Year}</p>
          </div>
        ))}
      </div>
      {selectedMovie && <MovieModal movie={selectedMovie} onClose={closeModal} />}
    </div>
  );
};

export default Home;
