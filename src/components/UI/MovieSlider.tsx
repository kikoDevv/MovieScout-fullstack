"use client";
import React from "react";
import Slider from "react-slick";
import Image from "next/image";

const NextArrow = (props: any) => (
  <button
    {...props}
    className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-75 z-10">
    ▶
  </button>
);

const PrevArrow = (props: any) => (
  <button
    {...props}
    className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-75 z-10">
    ◀
  </button>
);

interface MovieType {
  id: string | number;
  poster: string;
  title: string;
}

interface MovieSliderProps {
  movies: MovieType[];
}

const MovieSlider: React.FC<MovieSliderProps> = ({ movies }) => {
  const settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 7,
    slidesToScroll: 4,
    arrows: true,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    appendDots: (dots) => (
      <div className="mt-4">
        <ul className="flex justify-center gap-2">{dots}</ul>
      </div>
    ),
    customPaging: (i) => <div className="w-3 h-3 bg-gray-500 rounded-full" />,
    responsive: [
      { breakpoint: 1024, settings: { slidesToShow: 3, slidesToScroll: 3 } },
      { breakpoint: 768, settings: { slidesToShow: 2, slidesToScroll: 2 } },
      { breakpoint: 480, settings: { slidesToShow: 1, slidesToScroll: 1 } },
    ],
  };

  return (
    <div className="relative">
      <Slider {...settings}>
        {movies.map((movie) => (
          <div key={movie.id} className="p-2">
            <div className="bg-gray-800 text-white rounded overflow-hidden shadow">
              <Image src={movie.poster} alt={movie.title} width={300} height={450} className="w-full object-cover" />
              <div className="p-3">
                <h3 className="text-lg font-semibold">{movie.title}</h3>
              </div>
            </div>
          </div>
        ))}
      </Slider>
      <style jsx global>{`
        .slick-dots li.slick-active div {
          background-color: white !important;
          transform: scale(1.3);
        }
      `}</style>
    </div>
  );
};

export default MovieSlider;
