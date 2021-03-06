import { useState } from 'react';
import {useEffect} from 'react';
import './App.css';

function App() {

  let [movieInfo, setMovieInfo]=useState(null);
  let [title, setTitle]=useState("the suicide squad");

  useEffect(()=>{
    getMovieData();
  },[])

  function readTitle(value) {
    setTitle(value);
  }

  function getMovieData() {
    let url=`https://omdbapi.com/?t=${title}&apikey=d530b780`;
    fetch(url)
    .then((response)=>response.json())
    .then((movie)=>{
      console.log(movie);
      setMovieInfo(movie);
    })
    .catch((err)=>{
      console.log(err);
    })
  }


  return (
    <div className="App">
      <div className="container">
        <div className="padding">
          <h1>Movie Search</h1>
          <div className="input-group">
            <input type="text" placeholder="Enter movie name" onChange={(event)=>{readTitle(event.target.value)}} className="search-field"/>
            <button className="btn" onClick={getMovieData}>Get Movie</button>
          </div>
          {
            movieInfo?.Error===undefined?(
            <div className="movie">
            <div className="poster">
              <img src={movieInfo?.Poster} alt="Poster" className="img-poster"/>
            </div>
            <div className="details">
              <div className="padding">
                <h1>{movieInfo?.Title}</h1>
                <p><strong>Genre:</strong> {movieInfo?.Genre}</p>
                <p><strong>Director:</strong> {movieInfo?.Director}</p>
                <p><strong>Plot:</strong> {movieInfo?.Plot}</p>
                <p><strong>Cast:</strong> {movieInfo?.Actors}</p>
                <p><strong>Box Office Collection:</strong> {movieInfo?.BoxOffice}</p>
                <p><strong>Language:</strong> {movieInfo?.Language}</p>
                <p><strong>Release Date:</strong> {movieInfo?.Released}</p>
                <p><strong>Runtime:</strong> {movieInfo?.Runtime}</p>

                <div className="ratings">
                  {
                    movieInfo?.Ratings.map((rating,index)=>(
                      <div key={index}>
                        <p>
                        <strong>{rating.Source}</strong>
                        <h3>{rating.Value}</h3>
                        </p>
                      </div>
                    ))
                  }
                </div>
              </div>
            </div>
          </div>
          ):
          (
            <h1>Movie not found</h1>
          )
          }        
        </div>
      </div>
    </div>
  );
}

export default App;
