import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export class Moviesitem extends Component {

  constructor(props) {
    super(props);
    // Initialize state to track if the movie is in the watchlist
    const isInWatchlist = this.isMovieInWatchlist(this.props.id);
    this.state = { isInWatchlist };
  }

  // Check if the movie is already in the watchlist
  isMovieInWatchlist = (id) => {
    const watchlist = JSON.parse(localStorage.getItem('watchlist')) || [];
    return watchlist.some(movie => movie.id === id);
  };

  handleToggleWatchlist = (e) => {
    e.preventDefault(); 
    const { id, title, date, poster, overview } = this.props;
    let watchlist = JSON.parse(localStorage.getItem('watchlist')) || [];

    if (this.state.isInWatchlist) {
      // Remove the movie if it's already in the watchlist
      watchlist = watchlist.filter(movie => movie.id !== id);
    } else {
      // Add the movie if it's not in the watchlist
      watchlist.push({ id, title, date, poster, overview });
    }

    // Update the watchlist in local storage
    localStorage.setItem('watchlist', JSON.stringify(watchlist));
    // Toggle the button's state
    this.setState({ isInWatchlist: !this.state.isInWatchlist });
  };

  truncateText = (text, maxLength = 23) => {
    if (text.length > maxLength) {
      return text.substring(0, maxLength) + "...";
    }
    return text;
  };

  render() {
    const { title, date, poster, id } = this.props;
    const { isInWatchlist } = this.state;

    return (
      <div className="card" style={{ width: "18rem", cursor: "pointer" }}>
        <Link to={`/movie/${id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
          <img src={poster} className="card-img-top" alt={title} />
          <div className="card-body">
            <h5 className="card-title">{this.truncateText(title)}</h5>
            <p className="card-text">{date}</p>
          </div>
        </Link>
        <button
          className={`btn ${isInWatchlist ? 'btn-danger' : 'btn-primary'}`}
          onClick={this.handleToggleWatchlist}
        >
          {isInWatchlist ? 'Remove from Watchlist' : 'Add to Watchlist'}
        </button>
      </div>
    );
  }
}

export default Moviesitem;
