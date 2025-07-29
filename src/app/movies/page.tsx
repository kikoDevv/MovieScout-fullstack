import React from "react";
import HeaderMovies from "@/components/headMovies/headerMovies";
import TopTeen from "@/components/topTeen/topTeenMovies";

export default function page() {
  return (
    <div>
      <section>
        <HeaderMovies />
      </section>
      {/*--------- Top 10 movies section ----------*/}
      <section className="mb-100">
        <TopTeen />
      </section>
    </div>
  );
}
