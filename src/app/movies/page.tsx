import React from "react";
import HeaderMovies from "@/components/headMovies/headerMovies";
import TopTeenMovies from "@/components/topTeen/TopTeenMovies";
import Upcoming from "@/components/upcoming/upcomingMovies";
import TopRated from "@/components/topRated/topRatedMovies";
import SmoothScrolling from "@/components/UI/smothScroll";
import SearchMovies from "@/components/search/searchMovies";

export default function Page() {
  return (
    <div>
      {/*--------- Movie galery hilight ----------*/}
      <SmoothScrolling>
        <section className="hidden sm:block">
          <HeaderMovies />
        </section>
      </SmoothScrolling>

      <section>
        <SearchMovies>
          <section>
            <TopTeenMovies />
          </section>
          {/*--------- Upcoming Movies Section ----------*/}
          <section>
            <Upcoming />
          </section>
          {/*--------- Top Rated Movies section ----------*/}
          <section>
            <TopRated />
          </section>
        </SearchMovies>
      </section>
    </div>
  );
}
