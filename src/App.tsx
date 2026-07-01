import { useState, useEffect } from 'react';
import { getRandomDogImages, type RandomDogImageData } from './api';
import './App.css';

function App() {
  const [currentDog, setCurrentDog] = useState<RandomDogImageData | null>(null);
  const [dogs, setDogs] = useState<RandomDogImageData[]>([]);
  const [favorites, setFavorites] = useState<RandomDogImageData[]>([]);

  const canFavoriteDog = !favorites.some(
    (fav) => fav.breed === currentDog?.breed,
  );

  useEffect(() => {
    const fetchData = async () => {
      const dogData = await getRandomDogImages(1);
      const dogsList = await getRandomDogImages(10);
      setCurrentDog(dogData[0] ?? null);
      setDogs(dogsList);
    };
    fetchData();
  }, []);

  const handleImageClick = (data: RandomDogImageData) => {
    setCurrentDog(data);
  };

  const handleAddToFav = () => {
    if (!currentDog) return;
    setFavorites((prevData) => [...prevData, currentDog]);
  };

  const handleFavRemove = (dogToRemove: RandomDogImageData) => {
    const copy = [...favorites];
    const filtered = copy.filter(
      (dogData) => dogData.breed !== dogToRemove.breed,
    );
    setFavorites(filtered);
  };

  return (
    <div id='container'>
      <div id='main'>
        <div>
          <h1>Dog Viewer</h1>
          {currentDog ? (
            <div className='dog-card'>
              <img src={currentDog.url} alt={currentDog.breed} />
              <h3>{currentDog.breed}</h3>
              <button onClick={handleAddToFav} disabled={!canFavoriteDog}>
                Add to favorites ♥️
              </button>
            </div>
          ) : (
            <h4>Calling a dog for you...</h4>
          )}
        </div>

        <div>
          <h2>Other dogs for you:</h2>
          {dogs.length ? (
            <div className='dog-grid'>
              {dogs.map((data, ndx) => (
                <button onClick={() => handleImageClick(data)} key={`${data.breed}-${ndx}`}>
                  <img
                    src={data.url}
                    alt={data.breed}
                  />
                </button>
              ))}
            </div>
          ) : (
            <h4>Fetching a new lot...</h4>
          )}
        </div>
      </div>

      <div id='side-bar'>
        <h5>Click to view a fav</h5>
        <div className='favs-list'>
          {favorites.map((data) => (
            <div key={`${data.breed}-listItem`} className='dog-fav'>
              <button
                className='select-fav'
                onClick={() => handleImageClick(data)}
              >
                {data.breed}
              </button>
              <button
                className='remove-fav'
                onClick={() => handleFavRemove(data)}
              >
                Remove
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
