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
    { id: 8, title: "Avatar 4", poster: "/movieImages/8.jpeg" },
    { id: 9, title: "Avatar 4", poster: "/movieImages/4.jpeg" },
    { id: 10, title: "Avatar 4", poster: "/movieImages/7.jpeg" },
    { id: 11, title: "Avatar 4", poster: "/movieImages/8.jpeg" },
    { id: 12, title: "Avatar 4", poster: "/movieImages/2.jpeg" },
    { id: 13, title: "Avatar 4", poster: "/movieImages/3.jpeg" },
    { id: 14, title: "Avatar 4", poster: "/movieImages/4.jpeg" },
    { id: 15, title: "Avatar 4", poster: "/movieImages/5.jpeg" },
    { id: 16, title: "Avatar 4", poster: "/movieImages/6.jpeg" },
    { id: 17, title: "Avatar 4", poster: "/movieImages/7.jpeg" },
    { id: 18, title: "Avatar 4", poster: "/movieImages/8.jpeg" },
    { id: 19, title: "Avatar 4", poster: "/movieImages/8.jpeg" },
    { id: 10, title: "Avatar 4", poster: "/movieImages/8.jpeg" },
  ];
  return (
    <div className="m-10">
      <h1 className='text-3xl text-white font-bold pl-4 pb-1'>Top 20 Movies to Watch</h1>
      <MovieSlider movies={movies} />
    </div>
  );
}
