const getAllFilms = async () => {
  const response = await fetch(process.env.NEXT_PUBLIC_API_URL + '/film/getAll', {
    method: 'GET',
    headers: {
        'Content-Type': 'application/json',
    }
  });
  return response;
};

const getFilmById = async (id: number) => {
  const response = await fetch(process.env.NEXT_PUBLIC_API_URL + '/film/' + id, {
    method: 'GET',
    headers: {
        'Content-Type': 'application/json',
    }
  });
  return response;
}
  
  const filmService = {
    getAllFilms,
    getFilmById,
  };
  export default filmService;
  