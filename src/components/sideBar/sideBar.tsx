import React from "react";
import styles from "./sideBar.module.css";
import { FaTimes } from "react-icons/fa";
import { FaFilm, FaTv, FaEnvelope, FaSignInAlt, FaHome } from "react-icons/fa";
import Link from "next/link";
import { SignInButton, SignedIn, SignedOut } from "@clerk/nextjs";

export default function SideBar({ onClose }: { onClose?: () => void }) {
  return (
    <div className={`${styles.sideBar} bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 shadow-2xl`}>
      <div className="flex text-white justify-between items-center p-5 border-b border-gray-700">
        <h1 className="text-xl font-bold bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent">
          MovieScout
        </h1>
        <FaTimes
          size={24}
          className="text-gray-400 hover:text-white cursor-pointer transition-colors duration-200"
          onClick={onClose}
        />
      </div>
      <section className="py-6 px-3">
        <nav className="flex flex-col gap-2">
          <SignedOut>
            <SignInButton mode="modal">
              <Link
                href="#"
                className="mt-4 flex items-center gap-3 p-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-lg transition-all duration-200">
                <FaSignInAlt size={18} />
                <span className="font-medium">Login</span>
              </Link>
            </SignInButton>
          </SignedOut>
          <SignedIn>
            <Link
              href="/dashboard"
              onClick={onClose}
              className="mt-4 flex items-center gap-3 p-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-lg transition-all duration-200">
              <FaSignInAlt size={18} />
              <span className="font-medium">Dashboard</span>
            </Link>
          </SignedIn>
          <Link
            href="/"
            onClick={onClose}
            className="flex items-center gap-3 text-gray-300 hover:text-white p-3 rounded-lg hover:bg-gray-700/50 transition-all duration-200">
            <span className="bg-gradient-to-br from-blue-500 to-purple-600 p-2 rounded-md">
              <FaHome size={18} className="text-white" />
            </span>
            <span className="font-medium">Home</span>
          </Link>

          <Link
            href="/movies"
            onClick={onClose}
            className="flex items-center gap-3 text-gray-300 hover:text-white p-3 rounded-lg hover:bg-gray-700/50 transition-all duration-200">
            <span className="bg-gradient-to-br from-red-500 to-orange-600 p-2 rounded-md">
              <FaFilm size={18} className="text-white" />
            </span>
            <span className="font-medium">Movies</span>
          </Link>

          <Link
            href="/movies"
            onClick={onClose}
            className="flex items-center gap-3 text-gray-300 hover:text-white p-3 rounded-lg hover:bg-gray-700/50 transition-all duration-200">
            <span className="bg-gradient-to-br from-green-500 to-emerald-600 p-2 rounded-md">
              <FaTv size={18} className="text-white" />
            </span>
            <span className="font-medium">TV Shows</span>
          </Link>

          <Link
            href="/contactPage"
            onClick={onClose}
            className="flex items-center gap-3 text-gray-300 hover:text-white p-3 rounded-lg hover:bg-gray-700/50 transition-all duration-200">
            <span className="bg-gradient-to-br from-yellow-500 to-amber-600 p-2 rounded-md">
              <FaEnvelope size={18} className="text-white" />
            </span>
            <span className="font-medium">Contact</span>
          </Link>
        </nav>
      </section>
    </div>
  );
}
