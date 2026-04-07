'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '../../lib/supabase'
import Navbar from '../navbar'

export default function JoinPage() {
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [isDuplicate, setIsDuplicate] = useState(false) // New state
  const router = useRouter()

  async function handleSubmit(e: any) {
    e.preventDefault()
    setLoading(true)
    setIsDuplicate(false) // Reset state on new try

    const formData = new FormData(e.target)
    const memberData = {
      full_name: formData.get('full_name'),
      student_id: (formData.get('student_id') as string).trim(),
      email: formData.get('email'),
      department: formData.get('department'),
    }

    const { error } = await supabase.from('members').insert([memberData])

    if (error) {
      if (error.code === '23505') {
        // This is the "Primary Key already exists" error
        setIsDuplicate(true)
      } else {
        alert("Error: " + error.message)
      }
      setLoading(false)
    } else {
      setSuccess(true)
      setLoading(false)
      setTimeout(() => { router.push('/') }, 3000)
    }
  }

  return (
    <main className="min-h-screen bg-black text-white pt-32 px-8 font-sans">
      <Navbar />
      <div className="max-w-2xl mx-auto border border-gray-800 p-8 rounded-3xl bg-gray-950/50 shadow-2xl">
        
        {/* SUCCESS SCREEN */}
        {success && (
          <div className="p-10 border-2 border-green-600 bg-green-900/20 rounded-3xl text-center">
            <h2 className="text-3xl font-black text-green-500 italic uppercase italic tracking-tighter">Welcome Aboard! 🇸🇩</h2>
            <p className="mt-4 text-gray-300 font-medium tracking-wide">Your application is saved. Redirecting you home...</p>
          </div>
        )}

        {/* DUPLICATE MEMBER SCREEN */}
        {isDuplicate && (
          <div className="p-10 border-2 border-red-600 bg-red-900/20 rounded-3xl text-center">
            <h2 className="text-3xl font-black text-red-500 italic uppercase tracking-tighter">Already a Member</h2>
            <p className="mt-4 text-gray-300 font-medium tracking-wide leading-relaxed">
              This Student ID is already registered in our committee. <br/>
              You don't need to sign up again!
            </p>
            <button 
              onClick={() => setIsDuplicate(false)} 
              className="mt-8 text-xs uppercase tracking-widest text-gray-400 hover:text-white border-b border-gray-700 pb-1 transition-all"
            >
              Try with a different ID
            </button>
          </div>
        )}

        {/* REGULAR FORM (Only shows if not success and not duplicate) */}
        {!success && !isDuplicate && (
          <>
            <h1 className="text-4xl font-black mb-2 italic tracking-tighter uppercase text-white">Join the Family</h1>
            <p className="text-gray-500 mb-10 text-lg font-light italic uppercase tracking-widest">Membership Registration</p>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-xs uppercase tracking-widest text-gray-500 mb-2 ml-1 font-bold">Full Name</label>
                <input name="full_name" required className="w-full h-14 bg-black border border-gray-800 px-4 rounded-xl focus:border-red-600 outline-none transition-all text-white text-base" />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs uppercase tracking-widest text-gray-500 mb-2 ml-1 font-bold">Student ID</label>
                  <input name="student_id" required className="w-full h-14 bg-black border border-gray-800 px-4 rounded-xl focus:border-red-600 outline-none transition-all text-white text-base" />
                </div>
                <div>
                  <label className="block text-xs uppercase tracking-widest text-gray-500 mb-2 ml-1 font-bold">University Email</label>
                  <input name="email" type="email" required className="w-full h-14 bg-black border border-gray-800 px-4 rounded-xl focus:border-red-600 outline-none transition-all text-white text-base" />
                </div>
              </div>

              <div>
                <label className="block text-xs uppercase tracking-widest text-gray-500 mb-2 ml-1 font-bold">Preferred Department</label>
                <select name="department" required defaultValue="" className="w-full h-14 bg-black border border-gray-800 px-4 rounded-xl focus:border-red-600 outline-none transition-all text-white text-base">
                  <option value="" disabled>Select a department...</option>
                  <option value="Logistics">Logistics</option>
                  <option value="Events & Planning">Events & Planning</option>
                  <option value="Media & Marketing">Media & Marketing</option>
                  <option value="Public Relations">Public Relations</option>
                  <option value="Student Affairs">Student Affairs</option>
                  <option value="Sports">Sports</option>
                  <option value="Treasury">Treasury</option>
                  <option value="Secretary Team">Secretary Team</option>
                </select>
              </div>

              <button disabled={loading} className="w-full bg-white text-black py-5 rounded-xl font-black uppercase tracking-tighter hover:bg-green-600 hover:text-white transition-all shadow-lg active:scale-95">
                {loading ? 'Verifying...' : 'Register as Member'}
              </button>
            </form>
          </>
        )}
      </div>
    </main>
  )
}