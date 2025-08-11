"use client";
import React from "react";
interface ButtonProps {
  text: string | number;
  icon?: React.ReactNode;
  onClick?: () => void;
}

export default function Button({ text, icon, onClick }: ButtonProps) {
  return (
    <div className="flex">
      <button
        onClick={onClick}
        className="relative overflow-hidden bg-gradient-to-r from-purple-600 to-pink-600 py-2 px-4 rounded-full cursor-pointer group hover:scale-105 transition-all duration-200 shadow-lg">
        <div className="absolute inset-0 bg-gradient-to-l from-purple-600 via-pink-500 to-purple-500 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
        <span className="relative flex items-center gap-2 text-white font-mono font-semibold truncate">
          {text}
          {icon}
        </span>
      </button>
    </div>
  );
}
