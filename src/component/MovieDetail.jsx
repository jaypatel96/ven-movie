import React, { Component } from 'react';
import { useParams, Link } from 'react-router-dom';

class MovieDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      movie: null,
      loading: true,
      error: null,
    };
  }

  componentDidMount() {
    this.fetchMovieDetails();
  }

  fetchMovieDetails = async () => {
    const { id } = this.props.params;
    const API_KEY = '9eecb68957bd0ba8e337e0fdd7ce91f0';
    const url = `https://api.themoviedb.org/3/movie/${id}?api_key=${API_KEY}&language=en-US`;

    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error('Failed to fetch movie details');
      }
      const data = await response.json();
      this.setState({ movie: data, loading: false });
    } catch (error) {
      this.setState({ error: error.message, loading: false });
    }
  };

  render() {
    const { movie, loading, error } = this.state;

    if (loading) {
      return <div className="container my-5 text-center"><h2>Loading...</h2></div>;
    }

    if (error) {
      return <div className="container my-5 text-center"><h2>{error}</h2></div>;
    }

    return (
      <div className="container my-5">
        <Link to="/" className="btn btn-secondary mb-4">← Back to Movies</Link>
        <div className="card mb-3" style={{ maxWidth: "100%" }}>
          <div className="row g-0">
            <div className="col-md-4">
              <img
                src={`https://image.tmdb.org/t/p/w500${movie.backdrop_path}`}
                className="img-fluid rounded-start"
                alt={movie.title}
              />
            </div>
            <div className="col-md-8">
              <div className="card-body">
                <h2 className="card-title">{movie.title}</h2>
                <p className="card-text"><strong>Release Date:</strong> {movie.release_date}</p>
                <p className="card-text"><strong>Overview:</strong> {movie.overview}</p>
                <p className="card-text"><strong>Rating:</strong> {movie.vote_average} / 10</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
//----hoc and parm 
function withRouter(Component) {
  function ComponentWithRouterProp(props) {
    let params = useParams();
    return <Component {...props} params={params} />;
  }
  return ComponentWithRouterProp;
}

export default withRouter(MovieDetail);
