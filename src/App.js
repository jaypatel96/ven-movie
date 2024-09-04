import React, { Component } from 'react';
import { Route, Routes } from 'react-router-dom';
import Navbar from './component/navbar.jsx';
import Movie from './component/Movie';
import MovieDetail from './component/MovieDetail.jsx';
import Watchlist from './component/Watchlist.jsx';

class App extends Component {
  render() {
    return (
      <>
        <Navbar />
        <Routes>
          <Route path="/" element={<Movie type="popular" />} />
          <Route path="/upcoming" element={<Movie type="upcoming" />} />
          <Route path="/top-rated" element={<Movie type="top_rated" />} />
          <Route path="/movie/:id" element={<MovieDetail />} />
          <Route path="/watchlist" element={<Watchlist />} />
        </Routes>
      </>
    );
  }
}

export default App;
