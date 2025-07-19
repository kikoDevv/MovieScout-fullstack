"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import "./tabMenu.css";
import Content from "./content";
import Link from "next/link";

interface TabItem {
  id: string;
  label: string;
  icon?: string;
}

export default function TabBar() {
  const [activeTab, setActiveTab] = useState("popular");
  console.log("selected tabs---", activeTab);
  const tabs: TabItem[] = [
    { id: "popular", label: "Popular", icon: "🎬" },
    { id: "kids", label: "Children", icon: "🧒🏻" },
    { id: "TV-shows", label: "TV Shows", icon: "📺" },
    { id: "upcoming", label: "Upcoming", icon: "🍿" },
    { id: "top_rated", label: "Top Rated", icon: "🚀" },
  ];

  return (
    <div>
      <div className="overflow-x-auto scrollbar-hide tab-backdrop inset-0 bg-black/30 backdrop-blur-md mx-2 rounded-full sm:w-fit sm:place-self-center">
        <div className="flex justify-center w-fit">
          <div className="max-w-4xl w-fit backdrop-blur-md">
            <div className="relative w-fit">
              <div className="flex items-center justify-center relative p-1">
                <div className="flex space-x-1 sm:space-x-3 relative z-10">
                  {tabs.map((tab) => (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`
										group relative px-4 py-2.5 rounded-full transition-all duration-200
										flex items-center justify-center whitespace-nowrap hover:cursor-pointer
										${activeTab === tab.id ? "text-white" : "text-gray-300"}
									`}>
                      {activeTab === tab.id && (
                        <motion.div
                          layoutId="tab-indicator"
                          className="absolute inset-0 bg-gradient-to-br from-purple-600 to-blue-500 rounded-full"
                          transition={{
                            type: "spring",
                            bounce: 0.15,
                            duration: 0.5,
                          }}>
                          <div className="absolute inset-0 rounded-full opacity-20 blur-sm bg-purple-400"></div>
                        </motion.div>
                      )}

                      <span
                        className={`
										relative z-10 font-medium tracking-wide flex items-center text-sm sm:text-base
										transition-all duration-200 ease-out
										${activeTab === tab.id ? "transform translate-y-0" : "transform sm:group-hover:translate-y-[-2px]"}
									`}>
                        {tab.icon && (
                          <span
                            className={`
												mr-1.5 text-xs sm:text-sm
												${activeTab !== tab.id && "opacity-70 group-hover:opacity-100"}
											`}>
                            {tab.icon}
                          </span>
                        )}
                        {tab.label}
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              <div className="tab-glow"></div>
            </div>
          </div>
        </div>
      </div>
      {/*--------- tabs content ----------*/}
      <div className="mt-8">
        <Content
        kategory={activeTab}
        />
      </div>
      {/*--------- button under the tabs movies ----------*/}
      <div className="flex justify-center mt-8 mb-4">
        <Link href="/moviesPage">
          <button className="group relative px-4 py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white font-bold text-base rounded-full overflow-hidden transition-all duration-300 text-center hover:cursor-pointer hover:scale-[1.02] will-change-transform shadow-xl hover:shadow-2xl">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 opacity-0 group-hover:opacity-100 transition-opacity duration-200"></div>
            <span className="relative flex items-center justify-center space-x-2">
              <span>Dive into thousands more</span>
              <svg
                className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-200"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </span>
          </button>
        </Link>
      </div>
    </div>
  );
}
