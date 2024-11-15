import '../styles/App.css'; 

const MovieModal = ({ movie, onClose }) => {
  if (!movie) return null; 
  console.log(movie)

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <button className="close-button" onClick={onClose}>X</button>
        <h2>{movie.Title} ({movie.Year})</h2>
        <div className="movie-details">
          <img
            src={movie.Poster}
            alt={movie.Title}
            className="modal-poster"
          />
          <div className="movie-info">
            <p><strong>Type:</strong> {movie.Type}</p>
            <p><strong>Year:</strong> {movie.Year}</p>
            <p><strong>Ratings:</strong> {movie.imdbID} / 10</p>
         
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieModal;
