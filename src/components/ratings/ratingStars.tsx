import React from "react";
import { FaStar, FaStarHalfAlt, FaRegStar } from "react-icons/fa";
import { FaImdb } from "react-icons/fa";

interface RatingStarsProps {
  rating?: number;
  showValue?: boolean;
  showIMDB?: boolean;
  size?: "sm" | "md" | "lg";
  color?: string;
  className?: string;
}

export default function RatingStars({
  rating = 0,
  showValue = false,
  showIMDB = false,
  size = "md",
  color = "text-yellow-400",
  className = "",
}: RatingStarsProps) {
  /*--------- convert from 5 stars to 10 ----------*/
  const normalizedRating = rating > 5 ? rating / 2 : rating;
  /*--------- size classes ----------*/
  const sizeClasses = {
    sm: "text-sm",
    md: "text-xl",
    lg: "text-3xl",
  };

  const renderStars = () => {
    const stars = [];

    for (let i = 0; i < 5; i++) {
      if (i < Math.floor(normalizedRating)) {
        stars.push(<FaStar key={i} className={`${color} ${sizeClasses[size]}`} />);
      } else if (i === Math.floor(normalizedRating) && normalizedRating % 1 >= 0.5) {
        stars.push(<FaStarHalfAlt key={i} className={`${color} ${sizeClasses[size]}`} />);
      } else {
        stars.push(<FaRegStar key={i} className={`${color} ${sizeClasses[size]}`} />);
      }
    }

    return stars;
  };

  return (
    <div className={`flex items-center ${className}`}>
      <div className="flex items-center">{renderStars()}</div>
      {showValue && (
        <span className={`ml-2 ${color === "text-yellow-400" ? "text-white flex items-center ml-5 mr-1" : color}`}>
          {rating.toFixed(1)}
        </span>
      )}
      {showIMDB && (
        <span>
          <FaImdb className="text-yellow-400"></FaImdb>
        </span>
      )}
    </div>
  );
}
