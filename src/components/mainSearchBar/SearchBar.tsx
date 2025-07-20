"use client";
import React, { useEffect, useState, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { FaSearch } from "react-icons/fa";

export default function SearchBar() {
  const [isSticky, setIsSticky] = useState(false);
  const sentinelRef = useRef<HTMLDivElement>(null);
  const searchSectionRef = useRef<HTMLElement>(null);
  const { scrollY } = useScroll();

  {
    /*--------- Transform scroll value for border radios ----------*/
  }
  // const borderRadius = useTransform(scrollY, [10, 600], [10, 30]);
  const borderRadius = useTransform(scrollY, [10, 600], [15, 30]);

  {
    /*--------- Transform scroll value to width 480px to 320px of searchbar ----------*/
  }
  // const width = useTransform(scrollY, [0, 500], [500, 320]);
  const width = useTransform(scrollY, [0, 500], [500, 320]);

  //Intersection Observer for sticky behavior
  useEffect(() => {
    const sentinel = sentinelRef.current;
    const searchSection = searchSectionRef.current;

    if (!sentinel || !searchSection) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) {
            setIsSticky(true);
          } else {
            setIsSticky(false);
          }
        });
      },
      { threshold: 0.1 }
    );

    observer.observe(sentinel);

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <>
      {/* Sentinel element that will trigger the sticky behavior */}
      <div ref={sentinelRef} className="absolute sentinel top-73"></div>

      {/* Search section that will become sticky */}
      <motion.section
        ref={searchSectionRef}
        className={`inline-flex whitespace-nowrap z-10 ${isSticky ? "fixed top-1.5" : "absolute top-75"}`}
        style={{
          left: "50%",
          transform: "translateX(-50%)",
          width,
        }}>
        <motion.div
          className="relative w-full mx-0 overflow-hidden hidden sm:block shadow-lg ring-1 ring-white/10"
          style={{ borderRadius }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}>
          <input
            type="text"
            placeholder="Search for movies..."
            className="w-full pl-5 py-2.5 pr-12 bg-white/90 backdrop-blur-sm focus:outline-none text-gray-700 font-medium"
          />
          <motion.button
            className="absolute right-0.5 bottom-0.5 bg-gradient-to-r bg-gradient-to-r from-blue-600 to-purple-600 p-2.5 text-white opacity-80 hover:scale-104 hover:opacity-100 transition-all duration-200 cursor-pointer"
            style={{ borderRadius }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}>
            <FaSearch className="w-5 h-5 hover:text-yellow-300" />
          </motion.button>
        </motion.div>
      </motion.section>
    </>
  );
}
