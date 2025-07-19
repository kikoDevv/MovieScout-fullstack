import Image from "next/image";
import React from "react";
import { FaStar } from "react-icons/fa6";

export default function Content() {
  return (
    <section>
      <div className="flex overflow-x-auto snap-x snap-mandatory sm:grid md:grid-cols-2 lg:grid-cols-3 gap-6 sm:mx-20 scrollbar-hide sm:px-0 px-10">
        <div className="relative w-80 flex-shrink-0 snap-center mr-4 sm:w-fit sm:mr-0">
          <Image
            className="rounded-2xl h-full w-full"
            src="/movieImages/dummamig4.jpg"
            alt="Movie Image Not Found!"
            unoptimized
            width={500}
            height={500}
          />
          <h1 className="absolute bottom-0 font-bold text-white sm:text-2xl font-sans p-4">Karate Kid: Legends</h1>
          <div className="flex absolute gap-1 bottom-4 right-4">
            <FaStar className="text-yellow-500 text-2xl" />
            <p className="text-white text-lg font-semibold">7.5</p>
          </div>
        </div>
        <div className="relative w-80 flex-shrink-0 snap-center mr-4 sm:w-fit sm:mr-0">
          <Image
            className="rounded-2xl h-full w-full"
            src="/movieImages/mads.jpg"
            alt="Movie Image Not Found!"
            unoptimized
            width={500}
            height={500}
          />
          <h1 className="absolute bottom-0 font-bold text-white sm:text-2xl font-sans p-4">Karate Kid: Legends</h1>
          <div className="flex absolute gap-1 bottom-4 right-4">
            <FaStar className="text-yellow-500 text-2xl" />
            <p className="text-white text-lg font-semibold">7.5</p>
          </div>
        </div>
        <div className="relative w-80 flex-shrink-0 snap-center mr-4 sm:w-fit sm:mr-0">
          <Image
            className="rounded-2xl h-full w-full"
            src="/movieImages/dummamig4.jpg"
            alt="Movie Image Not Found!"
            unoptimized
            width={500}
            height={500}
          />
          <h1 className="absolute bottom-0 font-bold text-white sm:text-2xl font-sans p-4">Karate Kid: Legends</h1>
          <div className="flex absolute gap-1 bottom-4 right-4">
            <FaStar className="text-yellow-500 text-2xl" />
            <p className="text-white text-lg font-semibold">7.5</p>
          </div>
        </div>
        <div className="relative w-80 flex-shrink-0 snap-center mr-4 sm:w-fit sm:mr-0">
          <Image
            className="rounded-2xl h-full w-full"
            src="/movieImages/dummamig4.jpg"
            alt="Movie Image Not Found!"
            unoptimized
            width={500}
            height={500}
          />
          <h1 className="absolute bottom-0 font-bold text-white sm:text-2xl font-sans p-4">Karate Kid: Legends</h1>
          <div className="flex absolute gap-1 bottom-4 right-4">
            <FaStar className="text-yellow-500 text-2xl" />
            <p className="text-white text-lg font-semibold">7.5</p>
          </div>
        </div>
        <div className="relative w-80 flex-shrink-0 snap-center mr-4 sm:w-fit sm:mr-0">
          <Image
            className="rounded-2xl h-full w-full"
            src="/movieImages/dummamig4.jpg"
            alt="Movie Image Not Found!"
            unoptimized
            width={500}
            height={500}
          />
          <h1 className="absolute bottom-0 font-bold text-white sm:text-2xl font-sans p-4">Karate Kid: Legends</h1>
          <div className="flex absolute gap-1 bottom-4 right-4">
            <FaStar className="text-yellow-500 text-2xl" />
            <p className="text-white text-lg font-semibold">7.5</p>
          </div>
        </div>
      </div>
    </section>
  );
}
