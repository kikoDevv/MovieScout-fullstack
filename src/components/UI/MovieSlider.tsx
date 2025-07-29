"use client";
import React, { useRef } from "react";
import Slider from "react-slick";
import Image from "next/image";

interface ArrowProps {
  onClick?: () => void;
}

const NextArrow = ({ onClick }: ArrowProps) => (
  <button
    onClick={onClick}
    className="w-10 h-10 bg-gradient-to-br from-slate-800/90 to-slate-900/90 backdrop-blur-sm border border-slate-600/30 text-white rounded-full hover:scale-110 hover:rotate-3 cursor-pointer transition-all duration-300 ease-out opacity-80 hover:opacity-100 shadow-lg hover:shadow-xl hover:shadow-purple-500/20 z-10 group">
    <div className="flex items-center justify-center w-full h-full group-hover:text-purple-300 transition-colors duration-300">
      <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" className="ml-0.5">
        <path d="M8.59 16.59L13.17 12L8.59 7.41L10 6l6 6-6 6l-1.41-1.41z" />
      </svg>
    </div>
  </button>
);

const PrevArrow = ({ onClick }: ArrowProps) => (
  <button
    onClick={onClick}
    className="w-10 h-10 bg-gradient-to-br from-slate-800/90 to-slate-900/90 backdrop-blur-sm border border-slate-600/30 text-white rounded-full hover:scale-110 hover:-rotate-3 cursor-pointer transition-all duration-300 ease-out opacity-80 hover:opacity-100 shadow-lg hover:shadow-xl hover:shadow-purple-500/20 z-10 group">
    <div className="flex items-center justify-center w-full h-full group-hover:text-purple-300 transition-colors duration-300">
      <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" className="mr-0.5">
        <path d="M15.41 16.59L10.83 12L15.41 7.41L14 6l-6 6 6 6l1.41-1.41z" />
      </svg>
    </div>
  </button>
);

interface MovieType {
  id: string | number;
  poster: string;
  poster_path: string;
  title: string;
}

interface MovieSliderProps {
  movies: MovieType[];
}

const MovieSlider: React.FC<MovieSliderProps> = ({ movies }) => {
  const sliderRef = useRef<Slider>(null);

  const settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 7,
    slidesToScroll: 4,
    arrows: false,
    appendDots: (dots: React.ReactNode) => (
      <div className="mt-8 flex justify-center">
        <div className="flex items-center gap-6 bg-black/30 backdrop-blur-sm px-1 py-1 rounded-full border border-white/10 w-fit place-self-center">
          <PrevArrow onClick={() => sliderRef.current?.slickPrev()} />
          <div className="flex gap-3">{dots}</div>
          <NextArrow onClick={() => sliderRef.current?.slickNext()} />
        </div>
      </div>
    ),
    customPaging: () => (
      <div className="w-2 h-2 bg-white/40 rounded-full transition-all duration-300 hover:bg-white/70 cursor-pointer transform hover:scale-125" />
    ),
    responsive: [
      { breakpoint: 1024, settings: { slidesToShow: 3, slidesToScroll: 3 } },
      { breakpoint: 768, settings: { slidesToShow: 2, slidesToScroll: 2 } },
      { breakpoint: 480, settings: { slidesToShow: 1, slidesToScroll: 1 } },
    ],
  };

  return (
    <div className="relative">
      <Slider ref={sliderRef} {...settings}>
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
        .slick-dots {
          position: relative !important;
          bottom: auto !important;
          margin-top: 0 !important;
        }

        .slick-dots li {
          margin: 0 4px !important;
          width: auto !important;
          height: auto !important;
        }

        .slick-dots li button {
          width: auto !important;
          height: auto !important;
          padding: 0 !important;
          background: transparent !important;
          border: none !important;
        }

        .slick-dots li button:before {
          display: none !important;
        }

        .slick-dots li.slick-active div {
          background: linear-gradient(135deg, #8b5cf6, #a855f7) !important;
          transform: scale(1.4) !important;
          box-shadow: 0 0 12px rgba(168, 85, 247, 0.6) !important;
        }

        .slick-dots li div {
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1) !important;
        }

        .slick-dots li:hover div {
          transform: scale(1.2) !important;
          background: rgba(255, 255, 255, 0.8) !important;
        }

        .slick-dots li.slick-active:hover div {
          transform: scale(1.5) !important;
        }

        .slick-prev:before,
        .slick-next:before {
          display: none !important;
        }

        .slick-track {
          transition: transform 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94) !important;
        }
      `}</style>
    </div>
  );
};

export default MovieSlider;
