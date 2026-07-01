export const extractBreedFromUrl = (url: string) => {
  // shape of url: "https://images.dog.ceo/breeds/gaddi-indian/Gaddi.jpg"

  const splitUrl = url.split('/');
  const breedString = splitUrl[4] ?? '';

  if (breedString === '') return 'Breed name not found';

  const formattedBreed = breedString.split('-').reverse().join(' ');

  return formattedBreed;
}