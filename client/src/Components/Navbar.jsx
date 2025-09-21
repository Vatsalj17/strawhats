import React from "react";

const Navbar = ({ logo, title, onButtonClick, buttonName }) => {
  return (
    <nav
      className="absolute top-4 sm:top-6 md:top-8 
      left-1/2 -translate-x-1/2 
      w-[90%] sm:w-[75%] md:w-[65%] lg:w-[55%] 
      bg-pink-100/30 backdrop-blur-md 
      rounded-2xl sm:rounded-3xl 
      shadow-lg border border-pink-200/40 
      px-4 sm:px-6 md:px-8 py-3 sm:py-4 
      flex items-center justify-between
      z-50" // ⬅️ make sure navbar is above background
    >
      {/* Left Section: Logo + Title */}
      <div className="flex items-center space-x-2 sm:space-x-3 md:space-x-4">
        {logo && (
          <img
            src={logo}
            alt="logo"
            className="h-8 w-8 sm:h-10 sm:w-10 md:h-12 md:w-12 
            rounded-full bg-white/80 backdrop-blur-sm 
            p-1.5 sm:p-2 shadow-lg border border-pink-200/50"
          />
        )}
        <span className="text-lg sm:text-xl md:text-2xl font-bold text-pink-900 tracking-wide">
          {title}
        </span>
      </div>

      {/* Right Section: Clickable Button */}
      <button
        onClick={onButtonClick}
        className="px-4 py-2 sm:px-5 sm:py-2.5 md:px-6 md:py-3 
        rounded-xl sm:rounded-2xl 
        bg-gradient-to-br from-pink-200/35 via-fuchsia-200/30 to-pink-200/25
        backdrop-blur-xl backdrop-saturate-150
        text-pink-900 font-bold text-sm sm:text-base tracking-wider
        border-2 border-pink-300/70 
        shadow-[0_8px_25px_-3px_rgba(236,72,153,0.4),0_3px_10px_-2px_rgba(236,72,153,0.3)] 
        hover:shadow-[0_12px_35px_-3px_rgba(236,72,153,0.6),0_5px_15px_-2px_rgba(236,72,153,0.4)]
        hover:from-pink-300/45 hover:via-fuchsia-300/40 hover:to-pink-300/35
        hover:border-pink-400/80
        hover:scale-105 hover:-translate-y-1
        active:scale-95 active:translate-y-0
        transition-all duration-300 ease-out
        cursor-pointer"
      >
        {buttonName}
      </button>
    </nav>
  );
};

export default Navbar;
