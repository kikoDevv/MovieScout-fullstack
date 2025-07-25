import axios from "axios"

export const getMovieInfo = async (movieID: number) => {
  const headers = {
        accept: "application/json",
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_TMDB_API_KEY}`,
      }
  try {
    /*------------------- get movie data -------------------*/
    const movieData = await axios.get(`https://api.themoviedb.org/3/movie/${movieID}?language=en-US`, {
      headers: headers
    })
    console.log("MovieData---------->", movieData.data)
    /*------------------- get movie logo -------------------*/
    const logo = await axios.get(`https://api.themoviedb.org/3/movie/${movieID}/images`, {
      headers: headers
    })
    console.log("logo----------",logo.data.logos[0].file_path)
    /*------------------- get cast  -------------------*/
    const cast = await axios.get(`https://api.themoviedb.org/3/movie/${movieID}/credits?language=en-US`, {
      headers: headers
    })
    console.log("cast---------", cast.data.cast)


    return {
      movieData: movieData.data,
      movieLogo: logo.data.logos[0].file_path,
      cast: cast.data.cast,
    }
  } catch (error) {
    console.error('Error fetching movie info:', error)
    throw error
  }
};