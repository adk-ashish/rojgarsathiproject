import React from "react";

const GridWithBackground = () => {
  return (
    <div className="fixed inset-0 flex flex-wrap z-[-1]">
      {Array.from({ length: 100 }, (_, index) => (
        <div key={index} className="w-10v h-10v relative">
          <img
            src="/logo.png" // Path to your logo image in the public directory
            alt="Logo"
            className="w-full h-full object-cover opacity-10"
          />
        </div>
      ))}
    </div>
  );
};

export default GridWithBackground;
