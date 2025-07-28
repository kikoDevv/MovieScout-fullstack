import React from 'react'
import HeaderMovies from '@/components/headMovies/headerMovies'
import TopTeenMovies from '@/components/topTeen/TopTeenMovies';


export default function page() {
  return (
    <div>
      <section>
        {/* <HeaderMovies /> */}
      </section>
      {/*--------- Top 10 movies section ----------*/}
      <section>
        <TopTeenMovies />
      </section>
    </div>
  )
}
