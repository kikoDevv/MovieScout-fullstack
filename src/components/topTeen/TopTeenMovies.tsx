import React from "react";
import MovieSlider from "../UI/MovieSlider";

export default function TopTeenMovies() {
  const movies = [
    { id: 1, title: "Oppenheimer", poster: "/movieImages/1.jpeg" },
    { id: 2, title: "Barbie", poster: "/movieImages/2.jpeg" },
    { id: 3, title: "Dune", poster: "/movieImages/3.jpeg" },
    { id: 4, title: "John Wick 4", poster: "/movieImages/4.jpeg" },
    { id: 5, title: "Avatar 2", poster: "/movieImages/5.jpeg" },
    { id: 6, title: "Avatar 3", poster: "/movieImages/6.jpeg" },
    { id: 7, title: "Avatar 4", poster: "/movieImages/7.jpeg" },
  ];
  return (
    <div>
      <MovieSlider movies={movies} />
    </div>
  );
}
