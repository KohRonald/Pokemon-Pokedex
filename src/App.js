import React, { useState, useEffect} from 'react';
import './App.css';
import Navbar from './components/Navbar';
import Card from './components/Card';
import Footer from './components/Footer';

import { getAllPokemon, getPokemon } from './services/pokemon';

const App = () => {

  //-----define states-----

  //store current pokemon data
  const [pokemonData, setPokemonData] = useState([]); 

  //to store url of next/prev set of pokemon data
  const [nextUrl, setNextUrl] = useState('');
  const[prevUrl, setPrevUrl] = useState('');

  //handles loading state
  const[loading, setLoading] = useState(true);
  
  //holds api url endpoint
  const initialUrl = 'https://pokeapi.co/api/v2/pokemon/'

  //use effect takes two argument, function and dependency array
  //empty array means we dont have dependency array, useEffect run once after component mounts onto page
  //so after component mounts onto page, we will fetch data onto api which is what useEffect does
  useEffect(() => {
    async function fetchData() {
      let response = await getAllPokemon(initialUrl);
      setNextUrl(response.next);
      setPrevUrl(response.previous);
      console.log(response)
      
      //passing the result of reponse to function loadingPokemon
      await loadingPokemon(response.results);
      setLoading(false);
    }
    fetchData();
  }, [])

  //function to grab interested data in the api that is retrieved by the getAllPokemon api
  const loadingPokemon = async (data) => {

    //takes in array of promises and return that array once all promises have been resolved
    //data being passed in is the array of object
    //.map is used to reiterate through the data
    let _pokemonData = await Promise.all(data.map(async pokemon => {
      let pokemonRecord = await getPokemon(pokemon.url);
      return pokemonRecord;
    }));

    setPokemonData(_pokemonData);
  }

  
  console.log(pokemonData);

  const next = async () => {
    setLoading(true);
    let data = await getAllPokemon(nextUrl);
    await loadingPokemon(data.results);
    setNextUrl(data.next);
    setPrevUrl(data.previous);
    setLoading(false);
  }

  const prev = async () => {
    if (!prevUrl) {
      return;
    }

    setLoading(true);
    let data = await getAllPokemon(prevUrl);
    await loadingPokemon(data.results);
    setNextUrl(data.next);
    setPrevUrl(data.previous);
    setLoading(false);
  }

  return (
      <div className="App">
        { loading ? <h1>Loading...</h1> : (
          <>
            <Navbar />

            <div className="btn">
              <button onClick={prev}>Prev</button>
              <button onClick={next}>Next</button>
            </div>

            <div className="grid-container">
              {pokemonData.map((pokemon, i) => {
                return <Card key={i} pokemon={pokemon}/>
              })}
            </div>

            <div className="btn">
              <button onClick={prev}>Prev</button>
              <button onClick={next}>Next</button>
            </div>

            <Footer />

          </>
        )}
      </div>
  );
}

export default App;
