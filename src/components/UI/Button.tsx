import React from "react";

interface ButtonProps {
  text: string | number;
  icon?: React.ReactNode;
}

export default function Button({ text, icon }: ButtonProps) {
  return (
    <div className="flex">
      <button className="relative overflow-hidden bg-gradient-to-r from-blue-600 to-purple-600 py-2 px-4 rounded-full cursor-pointer group hover:scale-105 transition-all duration-200">
        <div className="absolute inset-0 bg-gradient-to-l from-blue-600 via-pink-100 to-purple-500 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
        <span className="relative flex items-center gap-2 text-white font-mono">
          {icon}
          {text}
        </span>
      </button>
    </div>
  );
}
