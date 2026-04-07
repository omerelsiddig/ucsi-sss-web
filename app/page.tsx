import { supabase } from '../lib/supabase'
import Navbar from './navbar'

export default async function Home() {
  // Fetch events from your real Supabase table
  const { data: events } = await supabase.from('events').select('*')

  return (
    <main className="min-h-screen bg-black text-gray-200">
      <Navbar />
      {/* --- Section 1: The Hero --- */}
      <section className="pt-48 pb-20 px-8 flex flex-col items-center justify-center text-center relative overflow-hidden bg-black">
        
        {/* Subtle Dark Mode Glow effects */}
        <div className="absolute top-20 -left-40 w-96 h-96 bg-green-900/20 rounded-full blur-[150px]"></div>
        <div className="absolute top-40 -right-40 w-80 h-80 bg-red-900/20 rounded-full blur-[150px]"></div>

        {/* --- The Animated Flag Title --- */}
        <div className="relative z-10 w-full max-w-7xl flex flex-col items-center">
          <h1 className="text-6xl sm:text-7xl md:text-8xl lg:text-[10rem] font-black leading-none tracking-tighter uppercase 
            bg-clip-text text-transparent animate-flag
            bg-gradient-to-r from-red-600 via-white via-black to-green-600">
            Sudanese
          </h1>
          <span className="text-3xl sm:text-4xl md:text-5xl font-light tracking-[0.3em] uppercase text-gray-500 mt-4">
            Student Society
          </span>
        </div>

        {/* Hero Tagline */}
        <div className="relative z-10 w-full max-w-4xl mt-16">
          <p className="text-xl md:text-2xl text-gray-400 font-light max-w-3xl mx-auto leading-relaxed">
            Uniting Sudanese youth through culture, social connection, and academic excellence. 
            Our university's home for the Sudanese diaspora.
          </p>
          {/* Hero Tagline */}
        <div className="relative z-10 w-full max-w-4xl mt-16">
          <p className="text-xl md:text-2xl text-gray-400 font-light max-w-3xl mx-auto leading-relaxed">
            Uniting Sudanese youth through culture, social connection, and academic excellence. 
            Our university's home for the Sudanese diaspora.
          </p>
          <div className="mt-12 flex gap-4 justify-center">
            {/* THIS IS THE FIX: Changed from <button> to <a> */}
            <a href="/join" className="bg-green-700 text-white px-10 py-4 rounded-xl font-bold hover:bg-green-800 transition shadow-lg shadow-green-950/40">
              Join the Society
            </a>
            <button className="bg-gray-900/60 border border-gray-700 text-gray-200 px-10 py-4 rounded-xl font-bold hover:bg-gray-900 transition hover:border-green-600">
              Our Departments &rarr;
            </button>
          </div>
        </div>
        </div>
      </section>

      {/* --- Section 2: Upcoming Events (Dark Cards) --- */}
      <section className="py-20 px-8 max-w-6xl mx-auto">
        <h2 className="text-4xl font-bold mb-10 text-white flex items-center gap-4">
          <span className="w-1 h-10 bg-green-700 rounded-full"></span> Upcoming Events
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {events && events.length > 0 ? (
            events.map((event) => (
              <div key={event.id} className="group p-8 border border-gray-800 rounded-2xl hover:border-green-700/60 transition-all bg-gray-950/40 relative overflow-hidden shadow-sm hover:shadow-green-950/30">
                {/* Subtle colored glow on hover */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-green-900/10 rounded-full blur-[70px] group-hover:bg-red-900/10"></div>
                
                <h3 className="text-2xl font-bold text-white tracking-tight">{event.title}</h3>
                <p className="text-gray-400 mt-4 text-sm leading-relaxed min-h-[60px]">{event.description}</p>
                <div className="mt-6 pt-6 border-t border-gray-800 flex flex-col gap-2 text-sm text-gray-300 font-semibold">
                  <div className="flex items-center gap-3">📍 {event.location}</div>
                  <div className="flex items-center gap-3 font-mono text-green-500">📅 {new Date(event.date).toLocaleDateString()}</div>
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-full p-20 text-center border-2 border-dashed border-gray-800 rounded-2xl bg-gray-950/20">
              <p className="text-gray-500 font-medium">No events currently scheduled. We are planning something great!</p>
            </div>
          )}
        </div>
      </section>
    </main>
  )
}