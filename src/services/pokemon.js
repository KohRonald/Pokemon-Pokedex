export async function getAllPokemon(url) {

  return new Promise((resolve, reject) => {

    //fetch data, get result in json format, then get data from api and resolve the data
    fetch(url)
      .then(res => res.json())
      .then(data => {
        resolve(data)
      });
  });
}

export async function getPokemon(url) {
  
  return new Promise((resolve, reject) => {
    fetch(url)
      .then(res => res.json())
      .then(data => {
        resolve(data);
      });
  });
}