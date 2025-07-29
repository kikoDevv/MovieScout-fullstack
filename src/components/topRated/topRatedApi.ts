import axios from "axios";

export const getTopRated = async () => {
  try {
    const getImages = await axios.get("https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1", {
      headers: {
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_TMDB_API_KEY}`,
        accept: "application/json",
      },
    });

    console.log("Top Rated data----------", getImages.data);
    return getImages.data.results;
  } catch (error) {
    console.error("Error fetching top teen movies:", error);
    return [];
  }
};
