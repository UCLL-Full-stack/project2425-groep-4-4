const getAllFilms = async () => {
    const response = await fetch(process.env.NEXT_PUBLIC_API_URL + '/films', {
      method: 'GET',
      headers: {
          'Content-Type': 'application/json',
      }
    });
    return response;
  };
  
  const filmService = {
    getAllFilms,
  };
  
  export default filmService;
  