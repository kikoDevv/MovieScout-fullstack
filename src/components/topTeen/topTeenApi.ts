import axios from "axios";

export const getTopTeen = async () => {
  try {
    const getImages = await axios.get("https://api.themoviedb.org/3/movie/popular?language=en-US&page=1", {
      headers: {
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_TMDB_API_KEY}`,
        accept: "application/json",
      },
    });

    console.log("Top Teen data----------", getImages.data);
    return getImages.data.results;
  } catch (error) {
    console.error("Error fetching top teen movies:", error);
    return [];
  }
};
