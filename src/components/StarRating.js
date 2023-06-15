import React, { useState } from "react";
import Star from "./Star";

const containerStyle = {
  display: "flex",
  gap: "16px",
  alignItems: "center",
};

const starContainerStyle = {
  display: "flex",
};

function StarRating({ maxRating, color = "#fcc419", size = 48, onSetRating }) {
  const [rating, setRating] = useState(0);
  const [tempRating, setTempRating] = useState(0);

  const handleStarRating = (index) => {
    setRating(index + 1);
  };

  const textStyle = {
    lineHeight: "0",
    margin: "0",
    color,
    fontSize: `${size / 1.5}px`,
  };

  return (
    <div style={containerStyle}>
      <div style={starContainerStyle}>
        {Array.from({ length: maxRating }, (_, i) => {
          return (
            <Star
              userRating={onSetRating}
              color={color}
              size={size}
              handleStar={handleStarRating}
              index={i}
              key={i}
              full={tempRating ? tempRating >= i + 1 : rating >= i + 1}
              onHoverIn={() => setTempRating(i + 1)}
              onHoverOut={() => setTempRating(0)}
            />
          );
        })}
      </div>
      <div style={textStyle}>{tempRating || rating || ""}</div>
    </div>
  );
}

export default StarRating;
