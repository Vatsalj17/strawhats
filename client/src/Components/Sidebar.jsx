import React from "react";

const SidebarCard = ({ title, info, onClick, icon }) => (
  <div
    onClick={onClick}
    className="bg-white/20 backdrop-blur-md rounded-2xl p-5 shadow-lg 
    border border-pink-200/30 hover:shadow-xl hover:bg-white/30 
    hover:scale-[1.02] transition-all duration-300 cursor-pointer 
    flex items-start gap-4 group"
  >
    {/* Icon Section */}
    {icon && (
      <div className="text-fuchsia-700 bg-white/40 backdrop-blur-sm rounded-xl p-2 
      group-hover:bg-white/60 transition-all duration-300">
        {icon}
      </div>
    )}

    {/* Text Section */}
    <div className="flex-1">
      <h3 className="text-fuchsia-800 font-bold text-lg mb-1 
      group-hover:text-fuchsia-900 transition-colors duration-300">
        {title}
      </h3>
      <p className="text-fuchsia-700/80 text-sm leading-relaxed">{info}</p>
    </div>
  </div>
);

const Sidebar = ({ logo, title, cards }) => {
  return (
    <aside className="fixed left-0 top-0 h-screen w-80 
    bg-pink-100/25 backdrop-blur-xl shadow-2xl 
    border-r border-pink-200/40 flex flex-col z-50">
      
      {/* Header Section */}
      <div className="flex items-center space-x-4 p-6 
      border-b border-pink-200/30 bg-white/10 backdrop-blur-md">
        {logo && (
          <img
            src={logo}
            alt="logo"
            className="h-14 w-14 rounded-full bg-white/70 backdrop-blur-sm 
            p-2 shadow-lg border border-pink-200/50"
          />
        )}
        <span className="text-2xl font-bold text-fuchsia-800 tracking-wide">
          {title}
        </span>
      </div>

      {/* Cards Section */}
      <div className="flex-1 overflow-y-auto p-6 space-y-5 
      scrollbar-thin scrollbar-thumb-pink-300/50 scrollbar-track-transparent">
        {cards &&
          cards.map((card, idx) => (
            <SidebarCard
              key={idx}
              title={card.title}
              info={card.info}
              icon={card.icon}
              onClick={card.onClick}
            />
          ))}
      </div>
    </aside>
  );
};

export default Sidebar;