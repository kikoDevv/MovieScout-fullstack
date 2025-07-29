"use client";
import React from "react";
import Slider from "react-slick";
import Image from "next/image";
import { FcNext, FcPrevious } from "react-icons/fc";

const NextArrow = ({ currentSlide, slideCount, ...buttonProps }: any) => (
  <button
    {...buttonProps}
    className="absolute right-[-25] top-1/2 transform -translate-y-1/2 bg-white text-blue-500 px-3 py-5 rounded-full hover:scale-107 cursor-pointer transition-all duration-200 opacity-55 hover:opacity-100">
    <FcNext />
  </button>
);

const PrevArrow = ({ currentSlide, slideCount, ...buttonProps }: any) => (
  <button
    {...buttonProps}
    className="absolute left-[-20] top-1/2 transform -translate-y-1/2  bg-white text-blue-500 px-3 py-5 rounded-full hover:scale-107 cursor-pointer transition-all duration-200 opacity-55 hover:opacity-100 z-1">
    <FcPrevious />
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
        {movies.map((movie, idx) => (
          <div key={movie.id} className="p-2">
            <div className="relative bg-gray-800 text-white rounded-2xl overflow-hidden shadow">
              <Image
                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                alt={movie.title}
                width={300}
                height={450}
                className="w-full object-cover"
              />
              <p className="absolute bottom-2 right-5 text-5xl sm:text-6xl md:text-7xl font-extrabold tracking-wide uppercase bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 via-purple-500 to-pink-500 drop-shadow-xl antialiased subpixel-antialiased">
                {idx + 1}
              </p>
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
