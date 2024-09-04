import React, { Component } from 'react';
import Moviesitem from './Moviesitem';

export class Movie extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      page: 1,
      totalPages: 0,
    };
  }

  async componentDidMount() {
    this.fetchMovies(this.state.page);
  }

  async componentDidUpdate(prevProps) {
    if (prevProps.type !== this.props.type) {
      this.setState({ page: 1 }, () => {
        this.fetchMovies(1);
      });
    }
  }

  fetchMovies = async (pageNumber) => {
    const { type } = this.props;
    const API_KEY = '9eecb68957bd0ba8e337e0fdd7ce91f0';
    const url = `https://api.themoviedb.org/3/movie/${type}?api_key=${API_KEY}&language=en-US&page=${pageNumber}`;
    try {
      const response = await fetch(url);
      const responseData = await response.json();
      this.setState({
        data: responseData.results,
        page: responseData.page,
        totalPages: responseData.total_pages,
      });
    } catch (error) {
      console.error('Error fetching movies:', error);
    }
  };


  preavclick = () => {
    if (this.state.page > 1) {
      this.fetchMovies(this.state.page - 1);
    }
  };

  nextclick = () => {
    if (this.state.page < this.state.totalPages) {
      this.fetchMovies(this.state.page + 1);
    }
  };

  truncateText = (text, maxLength = 23) => {
    if (text.length > maxLength) {
      return text.substring(0, maxLength) + "...";
    }
    return text;
  };

  render() {
    return (
      <>
        <div className='container my-3 mt-5'>
        <h1>LENMOVIES - {this.props.type.replace('_', ' ').toUpperCase()} Movies</h1>
          <div className='row'>
            {this.state.data.map((element) => (
              <div className='col-md-3  mt-4 mb-4' key={element.id}>
                <div className="d-flex justify-content-center">
                  <Moviesitem
                    id={element.id}
                    title={this.truncateText(element.title)}
                    date={element.release_date}
                    poster={`https://image.tmdb.org/t/p/w200${element.poster_path}`}
                    overview={element.overview}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="d-flex justify-content-around mb-5">
          <button
            disabled={this.state.page <= 1}
            onClick={this.preavclick}
            type="button"
            className="btn btn-primary"
          >
            &#8701; Previous
          </button>
          <button
            disabled={this.state.page >= this.state.totalPages}
            onClick={this.nextclick}
            type="button"
            className="btn btn-primary"
          >
            &#8702; Next
          </button>
        </div>
      </>
    );
  }
}

export default Movie;
