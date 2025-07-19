import Image from "next/image";
import { FaStar } from "react-icons/fa6";
import GetTabMovies from "./tabsApi";
interface kType {
  kategory: string;
}
export default function Content({ kategory }: kType) {
  const movies = GetTabMovies({ category: kategory });
  console.log("data-----------", movies);
  return (
    <section>
      <div className="flex overflow-x-auto snap-x snap-mandatory sm:grid md:grid-cols-2 lg:grid-cols-3 gap-6 sm:mx-20 scrollbar-hide sm:p-3 px-10 py-1">
        <div className="relative w-80 flex-shrink-0 snap-center mr-4 sm:w-fit sm:mr-0 cursor-pointer hover:scale-102 transition-all duration-200">
          <Image
            className="rounded-2xl h-full w-full"
            src="/movieImages/dummamig4.jpg"
            alt="Movie Image Not Found!"
            unoptimized
            width={900}
            height={900}
          />
          <h1 className="absolute bottom-3 left-3 font-bold text-white sm:text-2xl font-sans select-none">
            Karate Kid: Legends
          </h1>
          <div className="flex absolute gap-1 bottom-4 right-4 select-none">
            <FaStar className="text-yellow-500 text-2xl" />
            <p className="text-white text-lg font-semibold">7.5</p>
          </div>
        </div>
      </div>
    </section>
  );
}
