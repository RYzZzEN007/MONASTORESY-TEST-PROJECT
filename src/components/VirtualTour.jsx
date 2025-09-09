import React from "react";

export default function VirtualTour({ image }) {
  return (
    <div>
      <h3>360° View</h3>
      <img src={image} alt="360 view" style={{ width: "100%", borderRadius: 6 }} />
    </div>
  );
}
