"use client";
import React from "react";
import Image from "next/image";
import { SignInButton, SignUpButton, SignedIn, SignedOut } from "@clerk/nextjs";

export default function SubscriptionBox() {
  return (
    <section className="mt-100 mb-100 md:mx-40 text-white select-none">
      {/*--------- the actual subsciption car ----------*/}
      <div className="lg:flex bg-neutral-700 p-10 rounded-3xl items-center justify-between">
        {/*--------- container left ----------*/}
        <div className="w-full max-w-3xl mb-10">
          <h1 className="text-4xl lg:text-4xl font-bold leading-tight">Unlock</h1>
          <h1 className="bg-gradient-to-r from-purple-400 via-pink-500 to-blue-400 bg-clip-text text-transparent text-4xl lg:text-4xl font-bold leading-tight">
            Your Login benifit
          </h1>
          <div className="flex gap-2 select-none group">
            <div className="flex w-12 h-12 bg-gradient-to-r from-purple-500 to-blue-500 rounded-xl items-center justify-center group-hover:scale-105 transition-all duration-200">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
                />
              </svg>
            </div>
            <div className="grid text-white">
              <h3 className="text-lg font-semibold">Add movies</h3>
              <p className="text-gray-400">Share movies and TV-shows to ur watch list</p>
            </div>
          </div>

          <div className="flex gap-2 select-none group">
            <div className="flex w-12 h-12 bg-gradient-to-r from-pink-500 to-purple-500 rounded-xl items-center justify-center group-hover:scale-105 transition-all duration-200">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
                />
              </svg>
            </div>
            <div className="grid text-white">
              <h3 className="text-lg font-semibold">Add movies</h3>
              <p className="text-gray-400">Share movies and TV-shows to ur watch list</p>
            </div>
          </div>

          <div className="flex gap-2 select-none group">
            <div className="flex w-12 h-12 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-xl items-center justify-center group-hover:scale-105 transition-all duration-200">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"
                />
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              </svg>
            </div>
            <div className="grid text-white">
              <h3 className="text-lg font-semibold">Add movies</h3>
              <p className="text-gray-400">Share movies and TV-shows to ur watch list</p>
            </div>
          </div>
        </div>
        {/*--------- container right ----------*/}
        <div className="relative bg-black/85 rounded-3xl p-5 w-full max-w-100">
          <div className="grid text-white gap-5">
            <div className="flex items-center mb-5 justify-between">
              <h3>My watchlist</h3>
              <div className="flex gap-1">
                <div className="w-3 h-3 bg-green-400 rounded-full"></div>
                <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
                <div className="w-3 h-3 bg-red-400 rounded-full"></div>
              </div>
            </div>
            <div className="flex gap-3">
              <div className="w-16 h-24 bg-gradient-to-br from-purple-500 to-pink-600 rounded-lg"></div>
              <div className="grid">
                <p>Smile 2</p>
                <p>Horror • 2024</p>
                <div className="flex items-center gap-1">
                  <span className="text-yellow-400">★★★★☆</span>
                  <span className="text-gray-500 text-xs">8.5/10</span>
                </div>
              </div>
            </div>

            <div className="flex gap-3">
              <div className="w-16 h-24 bg-gradient-to-br from-purple-500 to-pink-600 rounded-lg"></div>
              <div className="grid">
                <p>Smile 2</p>
                <p>Horror • 2024</p>
                <div className="flex items-center gap-1">
                  <span className="text-yellow-400">★★★★☆</span>
                  <span className="text-gray-500 text-xs">8.5/10</span>
                </div>
              </div>
            </div>

            <div className="flex gap-3 mb-10">
              <div className="w-16 h-24 bg-gradient-to-br from-purple-500 to-pink-600 rounded-lg"></div>
              <div className="grid">
                <p>Smile 2</p>
                <p>Horror • 2024</p>
                <div className="flex items-center gap-1">
                  <span className="text-yellow-400">★★★★☆</span>
                  <span className="text-gray-500 text-xs">8.5/10</span>
                </div>
              </div>
            </div>
          </div>
          <a
            href="/dashboard"
            className="w-full block py-3 border-2 border-dashed border-purple-500/30 text-purple-400 rounded-xl hover:border-purple-400 hover:text-purple-300 hover:bg-purple-600/5 transition-colors duration-200 font-medium text-center will-change-auto">
            + Add new movies
          </a>
          {/* <div className="absolute left-0 top-0 bg-black/85 rounded-3xl w-100 h-130 rotate-4"></div> */}

          <div className="absolute top-0 left-0 rotate-6 bg-black rounded-3xl p-5 w-full max-w-100">
            <div className="grid text-white gap-5">
              <div className="flex items-center mb-5 justify-between">
                <h3>My watchlist</h3>
                <div className="flex gap-1">
                  <div className="w-3 h-3 bg-green-400 rounded-full"></div>
                  <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
                  <div className="w-3 h-3 bg-red-400 rounded-full"></div>
                </div>
              </div>
              <div className="flex gap-3">
                <div className="w-16 h-24 bg-gradient-to-br from-purple-500 to-pink-600 rounded-lg"></div>
                <div className="grid">
                  <p>Smile 2</p>
                  <p>Horror • 2024</p>
                  <div className="flex items-center gap-1">
                    <span className="text-yellow-400">★★★★☆</span>
                    <span className="text-gray-500 text-xs">8.5/10</span>
                  </div>
                </div>
              </div>

              <div className="flex gap-3">
                <div className="w-16 h-24 bg-gradient-to-br from-purple-500 to-pink-600 rounded-lg"></div>
                <div className="grid">
                  <p>Smile 2</p>
                  <p>Horror • 2024</p>
                  <div className="flex items-center gap-1">
                    <span className="text-yellow-400">★★★★☆</span>
                    <span className="text-gray-500 text-xs">8.5/10</span>
                  </div>
                </div>
              </div>

              <div className="flex gap-3 mb-10">
                <div className="w-16 h-24 bg-gradient-to-br from-purple-500 to-pink-600 rounded-lg"></div>
                <div className="grid">
                  <p>Smile 2</p>
                  <p>Horror • 2024</p>
                  <div className="flex items-center gap-1">
                    <span className="text-yellow-400">★★★★☆</span>
                    <span className="text-gray-500 text-xs">8.5/10</span>
                  </div>
                </div>
              </div>
            </div>
            <a
              href="/dashboard"
              className="w-full block py-3 border-2 border-dashed border-purple-500/30 text-purple-400 rounded-xl hover:border-purple-400 hover:text-purple-300 hover:bg-purple-600/5 transition-colors duration-200 font-medium text-center will-change-auto">
              + Add new movies
            </a>
            {/* <div className="absolute left-0 top-0 bg-black/85 rounded-3xl w-100 h-130 rotate-4"></div> */}
          </div>
        </div>
      </div>
    </section>
  );
}
