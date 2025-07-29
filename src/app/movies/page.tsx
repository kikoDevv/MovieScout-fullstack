import React from "react";
import HeaderMovies from "@/components/headMovies/headerMovies";
import TopTeenMovies from "@/components/topTeen/TopTeenMovies";
import Upcoming from "@/components/upcoming/upcomingMovies";

export default function page() {
  return (
    <div>
      <section>
        <HeaderMovies />
      </section>
      {/*--------- Top 10 movies section ----------*/}
      <section>
        <TopTeenMovies />
      </section>
      {/*--------- Upcoming Movies Section ----------*/}
      <section className="mb-100">
        <Upcoming />
      </section>
    </div>
  );
}
