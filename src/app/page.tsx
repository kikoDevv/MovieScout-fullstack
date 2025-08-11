import Image from "next/image";
import SearchBar from "@/components/mainSearchBar/SearchBar";
import AnimatedImage from "@/components/UI/spidermanImage";
import Companys from "@/components/companysLogo/Companys";
import MovieHighlight from "@/components/movieHighlight/MovieHighlight";
import TabMenu from "@/components/tabBar/tabMenu";
import SubscriptionBox from "@/components/subscriptionBox/subscrib";
import SmoothScrolling from "@/components/UI/smothScroll";

export default function Home() {
  return (
    <main>
      {/*---------------Seat section-------------*/}
      <div className="relative w-full">
        <Image src="/cinema.jpg" alt="Seat image" width={300} height={300} unoptimized className="w-full" />
        <div className="absolute w-full text-center" style={{ top: "10%" }}>
          <div className="px-6 py-4">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-wide uppercase bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 via-purple-500 to-pink-500 drop-shadow-xl antialiased subpixel-antialiased text-shadow-lg">
              <span className="block">Immerse Yourself</span>
              <span className="block">in the Cinematic Universe</span>
            </h1>
          </div>
        </div>
        {/*------------Search bar section-----------*/}
        <SearchBar />
      </div>
      {/*------------Spiderman poster section----------*/}
      <SmoothScrolling>
        <section className="relative">
          {/*--------Background image with fade effect-------*/}
          <div className="relative hidden sm:block">
            <Image
              src="/spidermanBackground.png"
              alt="Spiderman background not found!"
              width={300}
              height={300}
              unoptimized
              className="w-full"
            />
            {/* Fade overlay */}
            <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-black to-transparent"></div>
          </div>
          {/*-----------Spider------------*/}
          <div className="absolute transform -translate-x-60 sm:bottom-[2rem] left-[60%] z-2 hidden sm:block">
            <AnimatedImage
              src="/spiderman.png"
              alt="Spiderman logo not found"
              width={600}
              height={1200}
              className="w-3/5 md:w-2/5 lg:w-1/3"
              animationIntensity={1}
            />
          </div>
          {/*---------company logos---------------*/}
          <div className="relative w-full sm:absolute sm:bottom-40">
            <div className="py-2 sm:bg-transparent">
              <Companys direction="left" />
            </div>
          </div>
        </section>
      </SmoothScrolling>
      {/*-----------movie highlight-------------*/}
      <div className="relative w-full sm:my-12">
        <div className="sm:absolute top-[-150] max-w-full">
          <MovieHighlight direction="right" />
        </div>
      </div>
      {/*--------- text section ----------*/}
      <section className="sm:py-10 relative overflow-hidden sm:mt-20">
        <div className="container mx-auto relative z-10">
          <h1 className="sm:text-5xl text-2xl font-extrabold text-center text-white uppercase tracking-wide sm:mb-5 mt-15 font-sans">
            Featured Categories
          </h1>
          <p className="text-center text-white sm:mb-30 mb-5 font-mono">
            Explore top blockbuster categories and dive into thousands more movie adventures.
          </p>
        </div>
      </section>
      {/*--------- tabs bar ----------*/}
      <TabMenu />
      {/*--------- subscription box ----------*/}
      <div className="container mx-auto px-4 my-16">
        <SubscriptionBox />
      </div>
    </main>
  );
}
