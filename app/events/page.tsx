'use client'
import { useEffect, useState } from 'react'
import { supabase } from '../../lib/supabase'
import Navbar from '../navbar'

export default function EventsPage() {
  const [upcomingEvents, setUpcomingEvents] = useState<any[]>([])
  const [pastEvents, setPastEvents] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchEvents() {
      // 1. Get Upcoming Events
      const { data: upcoming } = await supabase
        .from('events')
        .select('*')
        .eq('is_past', false)
        .order('date', { ascending: true })

      // 2. Get Past Events
      const { data: past } = await supabase
        .from('events')
        .select('*')
        .eq('is_past', true)
        .order('date', { ascending: false })

      if (upcoming) setUpcomingEvents(upcoming)
      if (past) setPastEvents(past)
      setLoading(false)
    }

    fetchEvents()
  }, [])

  return (
    <main className="min-h-screen bg-black text-white pt-32 px-8 font-sans uppercase">
      <Navbar />
      <div className="max-w-5xl mx-auto">
        <h1 className="text-6xl font-black italic tracking-tighter mb-12">EVENTS</h1>

        {/* --- UPCOMING EVENTS SECTION --- */}
        <section className="mb-24">
          <h2 className="text-xs tracking-[0.4em] text-red-600 font-bold mb-8 border-l-2 border-red-600 pl-4">UPCOMING</h2>
          {upcomingEvents.length > 0 ? (
            <div className="grid gap-8">
              {upcomingEvents.map((event) => (
                <div key={event.id} className="group border border-gray-800 p-8 rounded-3xl hover:border-white transition-all flex flex-col md:flex-row gap-10 bg-gray-950/20">
                  <div className="md:w-1/3 aspect-square bg-gray-900 rounded-2xl overflow-hidden">
                    <img src={event.poster_url} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  </div>
                  <div className="md:w-2/3">
                    <p className="text-gray-500 text-sm mb-2">{new Date(event.date).toDateString()}</p>
                    <h3 className="text-3xl font-black italic tracking-tight mb-4">{event.title}</h3>
                    <p className="text-gray-400 normal-case mb-6 font-light">{event.description}</p>
                    <p className="text-xs text-gray-500">📍 {event.location}</p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-600 italic">No upcoming events scheduled yet.</p>
          )}
        </section>

        {/* --- PAST EVENTS SECTION --- */}
        <section>
          <h2 className="text-xs tracking-[0.4em] text-gray-500 font-bold mb-8 border-l-2 border-gray-800 pl-4">LAST YEAR / PAST</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {pastEvents.length > 0 ? (
              pastEvents.map((event) => (
                <div key={event.id} className="border border-gray-900 p-6 rounded-2xl bg-gray-950/10 grayscale hover:grayscale-0 transition-all opacity-60 hover:opacity-100">
                  <p className="text-[10px] text-gray-600 mb-1">{new Date(event.date).getFullYear()}</p>
                  <h4 className="text-lg font-bold tracking-tight">{event.title}</h4>
                </div>
              ))
            ) : (
              <p className="text-gray-700 italic lowercase text-xs">History is being made...</p>
            )}
          </div>
        </section>
      </div>
    </main>
  )
}