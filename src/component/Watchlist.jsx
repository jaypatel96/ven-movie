import React, { Component } from 'react';

class Watchlist extends Component {
  constructor(props) {
    super(props);
    // Initialize state with the watchlist from localStorage
    this.state = {
      watchlist: JSON.parse(localStorage.getItem('watchlist')) || [],
    };
  }

  // Remove a movie from the watchlist
  handleRemoveFromWatchlist = (id) => {
    let watchlist = JSON.parse(localStorage.getItem('watchlist')) || [];
    // Filter out the movie to be removed
    watchlist = watchlist.filter(movie => movie.id !== id);
    // Update localStorage and state
    localStorage.setItem('watchlist', JSON.stringify(watchlist));
    this.setState({ watchlist });
  };

  render() {
    return (
      <div className="container my-5">
        <h1>My Watchlist</h1>
        <div className="row">
          {this.state.watchlist.length > 0 ? (
            this.state.watchlist.map(movie => (
              <div className="col-md-3 mt-4 mb-4" key={movie.id}>
                <div className="card" style={{ width: "18rem" }}>
                  <img src={movie.poster} className="card-img-top" alt={movie.title} />
                  <div className="card-body">
                    <h5 className="card-title">{movie.title}</h5>
                    <p className="card-text">{movie.date}</p>
                    <button
                      className="btn btn-danger"
                      onClick={() => this.handleRemoveFromWatchlist(movie.id)}
                    >
                      Remove from Watchlist
                    </button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="container my-5 text-center">
              <h2>Your watchlist is empty</h2>
            </div>
          )}
        </div>
      </div>
    );
  }
}

export default Watchlist;
