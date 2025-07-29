"use client";
import React from "react";
import MovieSlider from "../UI/MovieSlider";
import { getUpcoming } from "./upcomingApi";
import { useQuery } from "@tanstack/react-query";

export default function Upcoming() {
  const {
    data: movieData,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["upcoming"],
    queryFn: getUpcoming,
  });

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading movies</div>;

  return (
    <div className="m-10">
      <h1 className="text-3xl text-white font-bold pl-4 pb-1">Upcoming Movies</h1>
      <MovieSlider movies={movieData || []} showIndex = {false}/>
    </div>
  );
}
