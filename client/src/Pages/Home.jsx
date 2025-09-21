import React from 'react'
import HomeNavbar from '../Components/HomeNavbar'
import assets from '../assets/assets'
import InfoCard from '../Components/InfoCard'

const Home = () => {
  return (
    <div
      className="min-h-screen bg-cover bg-center relative"
      style={{ backgroundImage: `url(${assets.s3})` }}
    >
      {/* Background Overlay for Better Readability */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-900/40 via-slate-800/30 to-slate-900/50"></div>
      
      {/* Floating Particles Animation */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-2 h-2 bg-sky-400/60 rounded-full animate-bounce" style={{ animationDelay: '0s', animationDuration: '3s' }}></div>
        <div className="absolute top-40 right-20 w-3 h-3 bg-purple-400/50 rounded-full animate-pulse" style={{ animationDelay: '1s' }}></div>
        <div className="absolute bottom-32 left-1/4 w-1.5 h-1.5 bg-pink-400/70 rounded-full animate-bounce" style={{ animationDelay: '2s', animationDuration: '4s' }}></div>
        <div className="absolute top-1/3 right-1/3 w-2.5 h-2.5 bg-indigo-400/40 rounded-full animate-pulse" style={{ animationDelay: '1.5s' }}></div>
      </div>

      <HomeNavbar />
      
      {/* Hero Section */}
      <div className="relative z-10 container mx-auto px-4 pt-16 pb-20">
        <div className="max-w-6xl mx-auto">
          
          {/* Main Hero Content */}
          <div className="text-center mb-16 animate-fade-in-up">
            <div className="inline-flex items-center gap-2 bg-white/10  border border-white/20 mb-8 shadow-lg">
            </div>
            
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-black mb-8 leading-tight">
              <span className="bg-gradient-to-r from-white via-sky-200 to-purple-200 bg-clip-text text-transparent drop-shadow-2xl">
                Your Sports Guide
              </span>
              <br />
            
            </h1>
            
            <p className="text-xl md:text-2xl text-white/80 max-w-3xl mx-auto leading-relaxed font-light">
              Empowering sports facilities in India
            </p>
          </div>

          {/* Feature Cards Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            
            {/* Students Card */}
            <div className="group relative">
              <div className="absolute -inset-1 bg-gradient-to-r from-sky-400 via-purple-400 to-pink-400 rounded-[2rem] blur opacity-25 group-hover:opacity-75 transition duration-1000"></div>
              <div className="relative bg-white/10 backdrop-blur-xl border border-white/20 rounded-[2rem] p-8 shadow-2xl hover:shadow-3xl transition-all duration-500 hover:scale-105 hover:-translate-y-2">
                {/* Icon */}
                <div className="w-16 h-16 bg-gradient-to-br from-sky-400 to-sky-600 rounded-2xl flex items-center justify-center mb-6 group-hover:rotate-12 transition-transform duration-500">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                  </svg>
                </div>
                
                <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-sky-200 transition-colors">
                  For Players
                </h3>
                <p className="text-white/70 leading-relaxed mb-6">
                  Access world-class sports, connect with peers, and build the foundation for your dream career
                </p>
                
                {/* Floating badges */}
                <div className="flex flex-wrap gap-2">
                  <span className="px-3 py-1 bg-sky-500/20 border border-sky-400/30 rounded-full text-sky-200 text-sm">Learning</span>
                  <span className="px-3 py-1 bg-purple-500/20 border border-purple-400/30 rounded-full text-purple-200 text-sm">Growth</span>
                </div>
              </div>
            </div>

            {/* Alumni Card */}
            <div className="group relative">
              <div className="absolute -inset-1 bg-gradient-to-r from-purple-400 via-pink-400 to-rose-400 rounded-[2rem] blur opacity-25 group-hover:opacity-75 transition duration-1000"></div>
              <div className="relative bg-white/10 backdrop-blur-xl border border-white/20 rounded-[2rem] p-8 shadow-2xl hover:shadow-3xl transition-all duration-500 hover:scale-105 hover:-translate-y-2">
                {/* Icon */}
                <div className="w-16 h-16 bg-gradient-to-br from-purple-400 to-purple-600 rounded-2xl flex items-center justify-center mb-6 group-hover:rotate-12 transition-transform duration-500">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                </div>
                
                <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-purple-200 transition-colors">
                  For Academies
                </h3>
                <p className="text-white/70 leading-relaxed mb-6">
                  Stay connected, mentor the next generation, and continue growing with our vibrant community
                </p>
                
                <div className="flex flex-wrap gap-2">
                  <span className="px-3 py-1 bg-purple-500/20 border border-purple-400/30 rounded-full text-purple-200 text-sm">Network</span>
                  <span className="px-3 py-1 bg-pink-500/20 border border-pink-400/30 rounded-full text-pink-200 text-sm">Mentor</span>
                </div>
              </div>
            </div>

            {/* Community Card */}
            <div className="group relative md:col-span-2 lg:col-span-1">
              <div className="absolute -inset-1 bg-gradient-to-r from-pink-400 via-rose-400 to-orange-400 rounded-[2rem] blur opacity-25 group-hover:opacity-75 transition duration-1000"></div>
              <div className="relative bg-white/10 backdrop-blur-xl border border-white/20 rounded-[2rem] p-8 shadow-2xl hover:shadow-3xl transition-all duration-500 hover:scale-105 hover:-translate-y-2">
                {/* Icon */}
                <div className="w-16 h-16 bg-gradient-to-br from-pink-400 to-rose-600 rounded-2xl flex items-center justify-center mb-6 group-hover:rotate-12 transition-transform duration-500">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </svg>
                </div>
                
                <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-pink-200 transition-colors">
                  Our Community
                </h3>
                <p className="text-white/70 leading-relaxed mb-6">
                  Join thousands of passionate learners and achievers in building a better tomorrow together
                </p>
                
                <div className="flex flex-wrap gap-2">
                  <span className="px-3 py-1 bg-pink-500/20 border border-pink-400/30 rounded-full text-pink-200 text-sm">Unity</span>
                  <span className="px-3 py-1 bg-rose-500/20 border border-rose-400/30 rounded-full text-rose-200 text-sm">Impact</span>
                </div>
              </div>
            </div>
          </div>

          {/* Call to Action */}
          <div className="text-center">
            <div className="inline-flex items-center gap-6 bg-white/5 backdrop-blur-xl border border-white/10 rounded-[2rem] p-2 shadow-2xl">
              <button className="px-8 py-4 bg-gradient-to-r from-sky-500 to-purple-600 hover:from-sky-400 hover:to-purple-500 text-white font-bold rounded-[1.5rem] shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 flex items-center gap-2">
                <span>Get Started</span>
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </button>
              <button className="px-8 py-4 text-white/90 font-bold hover:text-white hover:bg-white/10 rounded-[1.5rem] transition-all duration-300">
                Learn More
              </button>
            </div>
          </div>

        </div>
      </div>

      {/* Bottom Gradient Fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-slate-900/60 to-transparent pointer-events-none"></div>
    </div>
  )
}

export default Home