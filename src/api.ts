import { extractBreedFromUrl } from "./utils";

const RANDOM_IMAGE_ENDPOINT = 'https://dog.ceo/api/breeds/image/random';

type DogImagesResponse = {
  message: string[];
  status: string;
}
export type RandomDogImageData = {
  breed: string;
  url: string;
}

export const getRandomDogImages = async (num = 1): Promise<RandomDogImageData[]> => {
  try {
    const res = await fetch(`${RANDOM_IMAGE_ENDPOINT}/${num}`);
    const data: DogImagesResponse = await res.json();
    const dogsArr = data.message.map((dogData) => ({
      breed: extractBreedFromUrl(dogData),
      url: dogData
    }))
    return dogsArr;
  } catch (error) {
    console.error('Error fetching random dogs list', error)
    return [];
  }
}