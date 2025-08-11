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
    className="w-10 h-10 bg-gradient-to-br from-slate-800/90 to-slate-900/90 backdrop-blur-sm border border-slate-600/30 text-white rounded-full hover:scale-105 cursor-pointer transition-all duration-300 ease-out opacity-80 hover:opacity-100 shadow-lg z-10 group">
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
    className="w-10 h-10 bg-gradient-to-br from-slate-800/90 to-slate-900/90 backdrop-blur-sm border border-slate-600/30 text-white rounded-full hover:scale-105 cursor-pointer transition-all duration-300 ease-out opacity-80 hover:opacity-100 shadow-lg z-10 group">
    <div className="flex items-center justify-center w-full h-full group-hover:text-purple-300 transition-colors duration-300">
      <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" className="mr-0.5">
        <path d="M15.41 16.59L10.83 12L15.41 7.41L14 6l-6 6 6 6l1.41-1.41z" />
      </svg>
    </div>
  </button>
);

interface CastMember {
  id: number;
  name: string;
  character: string;
  profile_path: string | null;
}

interface CastSliderProps {
  cast: CastMember[];
}

const CastSlider: React.FC<CastSliderProps> = ({ cast }) => {
  const sliderRef = useRef<Slider>(null);

  const settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 8,
    slidesToScroll: 4,
    arrows: false,
    dotsClass: "slick-dots custom-dots",
    appendDots: (dots: React.ReactNode) => (
      <div className="mt-8 flex justify-center">
        <div className="flex items-center gap-6 bg-black/30 backdrop-blur-sm px-1 py-1 rounded-full border border-white/10 w-fit place-self-center hidden sm:flex">
          <PrevArrow onClick={() => sliderRef.current?.slickPrev()} />
          <div className="flex gap-3">{dots}</div>
          <NextArrow onClick={() => sliderRef.current?.slickNext()} />
        </div>
      </div>
    ),
    customPaging: (index: number) => (
      <div
        className="w-2 h-2 bg-white/40 rounded-full transition-all duration-300 hover:bg-white/70 cursor-pointer transform hover:scale-125"
        data-index={index}
      />
    ),
    responsive: [
      { breakpoint: 1440, settings: { slidesToShow: 6, slidesToScroll: 3 } },
      { breakpoint: 1024, settings: { slidesToShow: 4, slidesToScroll: 2 } },
      { breakpoint: 768, settings: { slidesToShow: 3, slidesToScroll: 2 } },
      { breakpoint: 480, settings: { slidesToShow: 2, slidesToScroll: 1 } },
    ],
  };

  return (
    <div className="relative">
      <Slider ref={sliderRef} {...settings}>
        {cast.map((actor) => (
          <div key={actor.id} className="p-2 overflow-hidden">
            <div className="text-center group cursor-pointer bg-gray-900/30 rounded-3xl px-4 pt-3 pb-6 hover:bg-gray-800/50 transition-all duration-300 hover:scale-102">
              <div className="relative w-25 h-25 mx-auto mb-4 rounded-full overflow-hidden bg-gray-800 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                {actor.profile_path ? (
                  <Image
                    src={`https://image.tmdb.org/t/p/w200${actor.profile_path}`}
                    alt={actor.name}
                    fill
                    className="object-cover"
                  />
                ) : (
                  <div className="w-full h-full bg-gradient-to-br from-purple-600 to-pink-600 flex items-center justify-center text-white font-bold text-xl">
                    {actor.name.charAt(0)}
                  </div>
                )}
              </div>
              <div className="space-y-1">
                <h4 className="font-semibold text-sm text-white truncate px-1">{actor.name}</h4>
                <p className="text-gray-400 text-xs truncate px-1">{actor.character}</p>
              </div>
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
          outline: none !important;
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

        .custom-dots li {
          position: relative !important;
        }

        .custom-dots li.slick-active {
          z-index: 1 !important;
        }
      `}</style>
    </div>
  );
};

export default CastSlider;
