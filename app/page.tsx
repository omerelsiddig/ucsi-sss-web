'use client'

import { useEffect, useState } from 'react'
import { supabase } from '../lib/supabase'
import Navbar from './navbar'

export default function Home() {
  const [events, setEvents] = useState<any[]>([])
  // CHANGED: activePoster now stores the whole event object, not just a string
  const [activeEvent, setActiveEvent] = useState<any | null>(null)

  useEffect(() => {
    const fetchEvents = async () => {
      // Add the .eq('is_past', false) to ONLY show upcoming events
      const { data } = await supabase
        .from('events')
        .select('*')
        .eq('is_past', false) // This is the magic line!
        .order('date', { ascending: true })

      if (data) setEvents(data)
    }
    fetchEvents()
  }, [])

  // CHANGED: We now pass the whole event to the opener
  const handleOpen = (event: any) => {
    setActiveEvent(event)
  }

  const handleClose = () => {
    setActiveEvent(null)
  }

  return (
    <main className="relative min-h-screen text-gray-200">
      <Navbar />

      {/* --- 1. THE BACKGROUND PHOTO --- */}
      <div 
        className="fixed inset-0 -z-10"
        style={{
          backgroundImage: 'url("/society-photo.jpg")', 
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="absolute inset-0 bg-black/60 backdrop-blur-[3px]"></div>
      </div>

      {/* --- 2. THE HERO & ANIMATED FLAG --- */}
      <section className="pt-48 pb-20 px-8 flex flex-col items-center justify-center text-center relative overflow-hidden bg-transparent">
        <div className="absolute top-20 -left-40 w-96 h-96 bg-green-900/20 rounded-full blur-[150px]"></div>
        <div className="absolute top-40 -right-40 w-80 h-80 bg-red-900/20 rounded-full blur-[150px]"></div>

        <div className="relative z-10 w-full max-w-7xl flex flex-col items-center">
          <h1 className="text-6xl sm:text-7xl md:text-8xl lg:text-[10rem] font-black leading-none tracking-tighter uppercase 
            bg-clip-text text-transparent animate-flag
            bg-gradient-to-r from-red-600 via-white via-black to-green-600">
            Sudanese
          </h1>
          <span className="text-3xl sm:text-4xl md:text-5xl font-light tracking-[0.3em] uppercase text-gray-100 mt-4 drop-shadow-lg">
            Student Society
          </span>
        </div>

        <div className="relative z-10 w-full max-w-4xl mt-16">
          <p className="text-xl md:text-2xl text-gray-300 font-light max-w-3xl mx-auto leading-relaxed drop-shadow-md">
            Uniting Sudanese youth through culture, social connection, and academic excellence. 
            Our university's home for the Sudanese diaspora.
          </p>
        </div>
      </section>

      {/* --- 4. EVENTS SECTION --- */}
      <section className="py-20 px-8 max-w-6xl mx-auto z-10 relative">
        <h2 className="text-4xl font-bold mb-10 text-white flex items-center gap-4">
          <span className="w-1 h-10 bg-green-700 rounded-full"></span> Upcoming Events
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {events.map((event) => (
            <div key={event.id} className="flex flex-col gap-4">
              <div 
                onClick={() => handleOpen(event)} // Pass the whole event object here
                className="group cursor-pointer rounded-2xl border border-gray-800/50 bg-gray-950/60 backdrop-blur-sm overflow-hidden hover:border-green-500 transition-all flex-grow shadow-2xl"
              >
                <div className="h-56 overflow-hidden">
                  <img src={event.image_url} className="w-full h-full object-cover group-hover:scale-105 transition-transform" alt={event.title} />
                </div>
                <div className="p-6">
                  <h3 className="text-2xl font-bold text-white mb-2">{event.title}</h3>
                  <p className="text-gray-400 text-sm leading-relaxed line-clamp-3">
                    {event.description}
                  </p>
                  <div className="mt-4 text-xs font-bold text-green-500 uppercase tracking-widest">
                    Click to view poster & listen 🎵
                  </div>
                </div>
              </div>

              <a 
                href={event.form_url} 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-full py-4 bg-green-700 hover:bg-green-600 text-white text-center rounded-xl font-bold transition-all shadow-lg active:scale-95"
              >
                Register Now ✍️
              </a>
            </div>
          ))}
        </div>
      </section>

      {/* --- POSTER POPUP (MODAL) --- */}
      {activeEvent && (
        <div 
          className="fixed inset-0 z-[100] bg-black/95 flex items-center justify-center p-4 overflow-y-auto animate-in fade-in duration-300" 
          onClick={handleClose}
        >
          <button className="absolute top-10 right-10 text-white text-4xl hover:text-red-500 transition-colors z-[110]">&times;</button>
          
          <div className="flex flex-col items-center gap-6 max-w-2xl w-full" onClick={(e) => e.stopPropagation()}>
            {/* The Poster Image */}
            <img 
              src={activeEvent.image_url} 
              className="max-h-[65vh] rounded-lg shadow-2xl animate-in zoom-in-95 duration-300" 
              alt="Event Poster"
            />
            
            {/* The SoundCloud Player */}
            {activeEvent.audio_url && (
              <div className="w-full rounded-xl overflow-hidden shadow-lg border border-gray-800 bg-black/40">
                <iframe 
                  width="100%" 
                  height="166" 
                  scrolling="no" 
                  frameBorder="no" 
                  allow="autoplay" 
                  src={`https://w.soundcloud.com/player/?url=${encodeURIComponent(activeEvent.audio_url)}&color=%23006400&auto_play=true&hide_related=true&show_comments=false&show_user=true&show_reposts=false&show_teaser=false`}
                ></iframe>
              </div>
            )}
            
            <p className="text-gray-500 text-xs uppercase tracking-widest animate-pulse">
              Playing Event Theme... Click outside to close
            </p>
          </div>
        </div>
      )}
    </main>
  )
}