'use client'
import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'
import Navbar from '../navbar'

export default function AdminPanel() {
  const [members, setMembers] = useState<any[]>([])
  const [searchTerm, setSearchTerm] = useState('')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchMembers() {
      // 1. "View All" Logic: Fetches the entire table
      const { data, error } = await supabase
        .from('members')
        .select('*')
        .order('joined_at', { ascending: false })
      
      if (data) setMembers(data)
      setLoading(false)
    }
    fetchMembers()
  }, [])

  // 2. "Search" Logic: Filters the 'members' array live
  // If search is empty, 'filteredMembers' equals the full 'members' list
  const filteredMembers = members.filter(m => 
    m.full_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    m.student_id.includes(searchTerm)
  )

  return (
    <main className="min-h-screen bg-black text-white pt-32 pb-20 px-6 font-sans">
      <Navbar />
      
      <div className="max-w-5xl mx-auto">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-end justify-between border-b border-gray-800 pb-8 mb-10 gap-6">
          <div>
            <h1 className="text-4xl font-black italic tracking-tighter uppercase text-red-600">Admin Control</h1>
            <p className="text-gray-500 text-xs tracking-[0.3em] mt-2 uppercase font-bold">Membership Database</p>
          </div>
          
          <div className="bg-gray-900 border border-gray-800 px-8 py-4 rounded-2xl text-center shadow-xl">
            <p className="text-[10px] font-bold uppercase tracking-widest text-green-500 mb-1">Total Verified</p>
            {/* 3. Live Count: Shows total number of members in the database */}
            <p className="text-3xl font-black">{members.length}</p>
          </div>
        </div>

        {/* Search Bar */}
        <div className="mb-8 relative">
          <input 
            type="text"
            placeholder="Search by name or ID..."
            className="w-full h-14 bg-gray-950 border border-gray-800 rounded-xl px-6 focus:border-green-600 outline-none transition-all text-sm italic"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          {searchTerm && (
            <button 
              onClick={() => setSearchTerm('')}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-[10px] text-gray-500 hover:text-white"
            >
              CLEAR
            </button>
          )}
        </div>

        {/* Members List - This will list everyone by default */}
        <div className="grid gap-4">
          {loading ? (
            <p className="text-center py-20 text-gray-700 animate-pulse uppercase tracking-widest text-xs">Accessing Society Records...</p>
          ) : (
            filteredMembers.map((m) => (
              <div key={m.student_id} className="group bg-gray-950 border border-gray-900 hover:border-red-900/50 p-6 rounded-2xl flex flex-col md:flex-row md:items-center justify-between transition-all">
                <div className="flex flex-col gap-1">
                  <h3 className="text-lg font-bold group-hover:text-red-500 transition-colors uppercase tracking-tight">
                    {m.full_name}
                  </h3>
                  <div className="flex items-center gap-3 text-xs text-gray-500 font-mono">
                    <span>ID: {m.student_id}</span>
                    <span className="text-gray-800">|</span>
                    <span>{m.email}</span>
                  </div>
                </div>

                <div className="mt-4 md:mt-0 flex items-center gap-4">
                  <div className="px-4 py-2 bg-white/5 border border-white/10 rounded-full">
                    <p className="text-[10px] font-black text-green-500 uppercase italic tracking-widest">
                      {m.department}
                    </p>
                  </div>
                  <p className="text-[10px] text-gray-700 font-mono">
                    {new Date(m.joined_at).toLocaleDateString()}
                  </p>
                </div>
              </div>
            ))
          )}

          {/* 4. Empty State: Only shows if the search finds zero results */}
          {!loading && filteredMembers.length === 0 && (
            <div className="text-center py-20 border border-dashed border-gray-900 rounded-3xl">
               <p className="text-gray-800 italic uppercase text-xs tracking-widest">No members found matching "{searchTerm}"</p>
            </div>
          )}
        </div>
      </div>
    </main>
  )
}