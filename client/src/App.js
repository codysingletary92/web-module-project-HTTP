import React, { useEffect, useState } from "react";

import { Route, Switch, Redirect, useParams } from "react-router-dom";
import MovieList from './components/MovieList';
import Movie from './components/Movie';

import MovieHeader from './components/MovieHeader';

import EditMovieForm from './components/EditMovieForm';
import FavoriteMovieList from './components/FavoriteMovieList';
import DeleteMovieModal from './components/DeleteMovieModal';

import axios from 'axios';
import AddMovieForm from "./components/AddMovieForm";

const App = (props) => {
  const [movies, setMovies] = useState([]);
  const [favoriteMovies, setFavoriteMovies] = useState([]);
  
  

  const axiosCall = () => {
    console.log('called')
    axios.get('http://localhost:5000/api/movies')
    .then(res => {
      setMovies(res.data);
    })
    .catch(err => {
      console.log(err);
    });
  }

  useEffect(()=>{
    axiosCall();
  }, []);

  const deleteMovie = (id)=> {
    console.log(id)
    axios.delete(`http://localhost:5000/api/movies/${id}`)
    .then( res => {console.log(res);axiosCall()})
    .catch( res => console.log(res))
    axiosCall();
  }

  const addToFavorites = (movie) => {
    
  }

  return (
    <div>
      <nav className="navbar navbar-dark bg-dark">
        <span className="navbar-brand" ><img width="40px" alt="" src="./Lambda-Logo-Red.png"/> HTTP / CRUD Module Project</span>
      </nav>

      <div className="container">
        <MovieHeader/>
        <div className="row ">
          <FavoriteMovieList favoriteMovies={favoriteMovies}/>
        
          <Switch>
            <Route path="/movies/edit/:id">
              <EditMovieForm movies={movies} setMovies={setMovies}/>
            </Route>
            <Route path="/movies/add">
              <AddMovieForm movies={movies} setMovies={setMovies} axiosCall={axiosCall}/>
            </Route>

            <Route path="/movies/:id">
              <Movie deleteMovie={deleteMovie}/>
            </Route>

            <Route path="/movies">
              <MovieList movies={movies}/>
            </Route>

            <Route path="/">
              <Redirect to="/movies"/>
            </Route>
          </Switch>
        </div>
      </div>
    </div>
  );
};


export default App;

