import './App.css';
import {useState, useEffect} from 'react'

function App() {

  const [movieinfo, setmovieinfo] = useState(null)
  const [title, settitle] = useState('The Avengers')

  useEffect(() => {
    getMovieData()
  }, [])

  function readTitle(value){
    settitle(value)
  }

  function getMovieData(){
    const url = `http://www.omdbapi.com/?t=${title}&apikey=c6a69b26`
    fetch(url)
    .then((response) => response.json())
    .then((movie) => { 
      setmovieinfo(movie)
    })
    .catch((err) => {
      console.log(err)
    })
  }

  return (
    <div>
      <div className = 'container'>
        <div className = 'padd'>
          <h1>Movie Search</h1>
          <div className = 'input-group'>
            <input className = 'search-field' type="text" onChange = {(event) => {readTitle(event.target.value)}} placeholder = 'Enter Movie Name' />
            <button className = 'btn' onClick = {getMovieData}>Get Movie</button>
          </div>
          {
            movieinfo?.Error === undefined?(
                <div className = 'movie'>
                <div className = 'poster'>
                  <img className = 'img-poster' src={movieinfo?.Poster} alt="" />
                </div>
                <div className = 'details'>
                  <div className = 'padd'>
                    <h1>{movieinfo?.Title}</h1>
                    <p><strong>Genre: </strong>{movieinfo?.Genre}</p>
                    <p><strong>Directed BY: </strong>{movieinfo?.Director}</p>
                    <p><strong>Plot: </strong>{movieinfo?.Plot}</p>
                    <p><strong>Actors: </strong>{movieinfo?.Actors}</p>
                    <p><strong>Box Office: </strong>{movieinfo?.BoxOffice}</p>
                    <p><strong>Language: </strong>{movieinfo?.Language}</p>
                    <p><strong>Released Date: </strong>{movieinfo?.Released}</p>
                    <p><strong>Runtime: </strong>{movieinfo?.Runtime}</p>
                    <div className = 'ratings'>
                      {
                        movieinfo?.Ratings.map((rating, index) => (
                          <div key = {index}>
                            <strong>{rating.Source}</strong>
                            <h4>{rating.Value}</h4>
                          </div>
                        ))
                      }
                    </div>
                  </div>

                </div>
              </div>
            ):
            (
              <h1>Movie Not Found</h1>
            )
          }
        </div>
      </div>
    </div>
  );
}

export default App;
