"use client";
import React from "react";
import MovieSlider from "../UI/MovieSlider";
import { getTopTeen } from "./topTeenApi";
import { useQuery } from "@tanstack/react-query";

export default function TopTeen() {
  const {
    data: movieData,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["topTeen"],
    queryFn: getTopTeen,
  });

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading movies</div>;

  return (
    <div className="m-10">
      <h1 className="text-xl sm:text-2xl text-white font-bold pl-4 pb-1">Top Movies to Watch</h1>
      <MovieSlider movies={movieData || []} />
    </div>
  );
}
