import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Navbar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      query: '',
      suggestions: [],
    };
  }

  handleInputChange = async (e) => {
    const query = e.target.value;
    this.setState({ query });

    if (query.length > 2) { // Fetch suggestions only if the query length is more than 2 characters
      const API_KEY = '9eecb68957bd0ba8e337e0fdd7ce91f0';
      const url = `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&language=en-US&query=${query}&page=1&include_adult=false`;

      try {
        const response = await fetch(url);
        const data = await response.json();
        this.setState({ suggestions: data.results.slice(0, 5) }); // Get top 5 suggestions
      } catch (error) {
        console.error('Error fetching movie suggestions:', error);
      }
    } else {
      this.setState({ suggestions: [] });
    }
  };

  handleSuggestionClick = () => {
    this.setState({ query: '', suggestions: [] });
  };

  render() {
    const { query, suggestions } = this.state;

    return (
      <>
        <nav className="navbar navbar-expand-lg bg-body-tertiary">
          <div className="container-fluid">
            <Link className="navbar-brand" to="/">
              <img src="/log.png" alt="img" style={{ width: '50px', height: '50px' }} />
              <b>VEN-MOVIES</b>
            </Link>

            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
              <span className="navbar-toggler-icon"></span>
            </button>

            <div className="collapse navbar-collapse" id="navbarSupportedContent">
              <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                <li className="nav-item">
                  <Link className="nav-link" to="/upcoming">Upcoming</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/top-rated">Top-Rated</Link>
                </li>
                <li className="nav-item">
                <Link className="nav-link" to="/watchlist">My Watchlist</Link>
              </li>
              </ul>
              <form className="d-flex position-relative" role="search">
                <input
                  className="form-control me-2"
                  type="search"
                  placeholder="Search Movie"
                  aria-label="Search"
                  value={query}
                  onChange={this.handleInputChange}
                />
                {suggestions.length > 0 && (
                  <ul className="list-group position-absolute" style={{ width: '100%', top: '40px', zIndex: '1000' }}>
                    {suggestions.map((movie) => (
                      <li key={movie.id} className="list-group-item">
                        <Link
                          to={`/movie/${movie.id}`}
                          onClick={this.handleSuggestionClick}
                          className="text-decoration-none"
                        >
                          {movie.title}
                        </Link>
                      </li>
                    ))}
                  </ul>
                )}
              </form>
            </div>
          </div>
        </nav>
      </>
    );
  }
}

export default Navbar;
