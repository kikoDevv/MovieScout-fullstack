import React from "react";
import Image from "next/image";
import RatingStars from "../ratings/ratingStars";

export default function HeaderMovies() {
  return (
    <section className="mb-100">
      <div className="relative">
        {/*--------- main image ----------*/}
        <Image
          className="max-h-[90vh]"
          src={"/karate.webp"}
          alt="Train movie poster"
          unoptimized
          priority
          quality={100}
          height={1000}
          width={2800}
        />
        <section className="flex absolute bottom-1 left-1/2 transform -translate-x-1/2 w-full justify-center gap-10">
          {/*--------- cast and crew ----------*/}
          <div className="grid h-fit place-self-end">
            <div className="h-fit justify-items-end">
              <p className="text-white font-bold font-mono text-lg">Christopher Murphey</p>
              <p className="text-gray-500 ">Christopher Murphey</p>
            </div>
            <div className="h-fit justify-items-end">
              <p className="text-white font-bold font-mono text-lg">Christopher Murphey</p>
              <p className="text-gray-500 ">Christopher Murphey</p>
            </div>
            <div className="h-fit justify-items-end">
              <p className="text-white font-bold font-mono text-lg">Christopher Murphey</p>
              <p className="text-gray-500 ">Christopher Murphey</p>
            </div>
          </div>
          {/*--------- logo ----------*/}
          <div className="max-w-170">
            <Image
              className="w-fit h-fit"
              src={"/l1.webp"}
              alt="Train movie poster"
              unoptimized
              priority
              quality={100}
              height={1000}
              width={1800}
            />
          </div>
          {/*--------- rating ----------*/}
          <RatingStars rating={7.2} showValue showIMDB size="lg" />
        </section>
      </div>
    </section>
  );
}
