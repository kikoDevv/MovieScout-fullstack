import React from "react";
import HeaderMovies from "@/components/headMovies/headerMovies";
import TopTeenMovies from "@/components/topTeen/TopTeenMovies";
import Upcoming from "@/components/upcoming/upcomingMovies";
import TopRated from "@/components/topRated/topRatedMovies";

export default function page() {
  return (
    <div>
      {/*--------- Movie galery hilight ----------*/}
      <section>
        <HeaderMovies />
      </section>
      {/*--------- Top 10 movies section ----------*/}
      <section>
        <TopTeenMovies />
      </section>
      {/*--------- Upcoming Movies Section ----------*/}
      <section>
        <Upcoming />
      </section>
      {/*--------- Top Rated Movies section ----------*/}
      <section className="mb-100">
        <TopRated />
      </section>
    </div>
  );
}
