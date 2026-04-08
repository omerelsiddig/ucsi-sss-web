import { supabase } from '../lib/supabase'
import Navbar from './navbar'

export default async function Home() {
  // Fetch events from your real Supabase table
  const { data: events } = await supabase.from('events').select('*')

  return (
    <main className="relative min-h-screen text-gray-200">
      <Navbar />

      {/* --- STEP 1: FIXED BACKGROUND IMAGE --- */}
      {/* --- STEP 1: FIXED BACKGROUND IMAGE --- */}
      <div 
        className="fixed inset-0 -z-10 bg-red-900" // Added bg-red-900 here
        style={{
          backgroundImage: 'url("/society-photo.jpg")', 
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        {/* Dark Overlay + Blur */}
        <div className="absolute inset-0 bg-black/50 backdrop-blur-sm"></div>
      </div>

      {/* --- Section 1: The Hero --- */}
      {/* Changed bg-black to bg-transparent so we see the photo */}
      <section className="pt-48 pb-20 px-8 flex flex-col items-center justify-center text-center relative overflow-hidden bg-transparent">
        
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
          <span className="text-3xl sm:text-4xl md:text-5xl font-light tracking-[0.3em] uppercase text-gray-100 mt-4 drop-shadow-lg">
            Student Society
          </span>
        </div>

        {/* Hero Tagline */}
        <div className="relative z-10 w-full max-w-4xl mt-16">
          <p className="text-xl md:text-2xl text-gray-300 font-light max-w-3xl mx-auto leading-relaxed drop-shadow-md">
            Uniting Sudanese youth through culture, social connection, and academic excellence. 
            Our university's home for the Sudanese diaspora.
          </p>
        </div>
      </section>

      {/* --- Section 2: Upcoming Events --- */}
      <section className="py-20 px-8 max-w-6xl mx-auto relative z-10">
        <h2 className="text-4xl font-bold mb-10 text-white flex items-center gap-4">
          <span className="w-1 h-10 bg-green-700 rounded-full"></span> Upcoming Events
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {events && events.length > 0 ? (
            events.map((event) => (
              /* Added bg-gray-950/60 for a glass-morphism look on the cards */
              <div key={event.id} className="group p-8 border border-gray-800/50 rounded-2xl hover:border-green-700/60 transition-all bg-gray-950/60 backdrop-blur-sm relative overflow-hidden shadow-xl hover:shadow-green-950/30">
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
            <div className="col-span-full p-20 text-center border-2 border-dashed border-gray-800/50 rounded-2xl bg-gray-950/40 backdrop-blur-sm">
              <p className="text-gray-400 font-medium">No events currently scheduled. We are planning something great!</p>
            </div>
          )}
        </div>
      </section>
    </main>
  )
}