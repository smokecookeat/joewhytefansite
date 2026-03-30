import { useState, useEffect, useRef } from 'react'

// ==================== CONFIG ====================
const JOE_EMAIL = "joe@whytenoise.com"
const ADMIN_USER = import.meta.env.VITE_ADMIN_USER || "admin"
const ADMIN_PASS = import.meta.env.VITE_ADMIN_PASS || "joewhyte2026"

// Social Links
const SOCIAL_LINKS = {
  instagram: "https://www.instagram.com/joewhyte",
  facebook: "https://www.facebook.com/joewhyte",
  youtube: "https://www.youtube.com/@joewhyte",
  imdb: "https://www.imdb.com/name/nm0926679/",
  website: "https://www.whytenoise.com/"
}

// Local storage keys
const PENDING_MESSAGES_KEY = 'joewhyte_pending_messages'
const DELETED_MESSAGES_KEY = 'joewhyte_deleted_messages'
const ADMIN_REPLIES_KEY = 'joewhyte_admin_replies'
const BANNED_USERS_KEY = 'joewhyte_banned_users'

// ==================== MAIN APP ====================
export default function App() {
  const [currentPage, setCurrentPage] = useState('home')
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [isAdmin, setIsAdmin] = useState(false)
  const [showLoginModal, setShowLoginModal] = useState(false)

  const pages = {
    home: <HomePage setCurrentPage={setCurrentPage} />,
    achievements: <AchievementsPage />,
    gallery: <GalleryPage />,
    game: <GamePage />,
    messageboard: <MessageBoardPage isAdmin={isAdmin} />,
    social: <SocialPage />,
    about: <AboutPage />,
    admin: <AdminPage isAdmin={isAdmin} />,
  }

  return (
    <div className="min-h-screen bg-black text-white overflow-x-hidden">
      {/* Marvel-style Background */}
      <div className="fixed inset-0 pointer-events-none">
        {/* Halftone Pattern */}
        <div className="absolute inset-0 opacity-5" style={{
          backgroundImage: `radial-gradient(circle, #fff 1px, transparent 1px)`,
          backgroundSize: '20px 20px'
        }} />
        {/* Dynamic Gradients */}
        <div className="absolute top-0 left-0 w-full h-full">
          <div className="absolute top-0 right-0 w-1/2 h-1/2 bg-red-600/10 blur-3xl animate-pulse" />
          <div className="absolute bottom-0 left-0 w-1/2 h-1/2 bg-blue-600/10 blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
          <div className="absolute top-1/2 left-1/2 w-1/3 h-1/3 bg-yellow-500/10 blur-3xl animate-pulse" style={{ animationDelay: '2s' }} />
        </div>
        {/* Comic Lines */}
        <div className="absolute inset-0 opacity-[0.02]" style={{
          backgroundImage: `repeating-linear-gradient(45deg, #fff 0, #fff 1px, transparent 0, transparent 50%)`,
          backgroundSize: '10px 10px'
        }} />
      </div>

      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-black/95 backdrop-blur-lg border-b-4 border-red-600">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <button 
              onClick={() => setCurrentPage('home')}
              className="group flex items-center gap-2"
            >
              <div className="w-10 h-10 bg-red-600 rounded-sm flex items-center justify-center font-black text-xl transform -skew-x-6 group-hover:scale-110 transition-transform">
                JW
              </div>
              <span className="hidden sm:block text-xl font-black tracking-tight">
                <span className="text-red-500">JOE</span> <span className="text-white">WHYTE</span>
              </span>
            </button>
            
            {/* Desktop Nav */}
            <div className="hidden lg:flex items-center gap-1">
              {[
                { id: 'home', label: 'HOME' },
                { id: 'achievements', label: 'CREDITS' },
                { id: 'gallery', label: 'ART' },
                { id: 'game', label: '🎮 PLAY' },
                { id: 'social', label: 'SOCIAL' },
                { id: 'messageboard', label: 'FAN ZONE' },
                { id: 'about', label: 'ABOUT' },
              ].map(item => (
                <button
                  key={item.id}
                  onClick={() => setCurrentPage(item.id)}
                  className={`px-4 py-2 font-bold text-sm tracking-wider transition-all transform hover:-skew-x-3 ${
                    currentPage === item.id
                      ? 'bg-red-600 text-white skew-x-0'
                      : 'text-gray-300 hover:text-white hover:bg-white/10'
                  }`}
                >
                  {item.label}
                </button>
              ))}
              
              {isAdmin ? (
                <button
                  onClick={() => setCurrentPage('admin')}
                  className={`px-4 py-2 font-bold text-sm tracking-wider ${
                    currentPage === 'admin' ? 'bg-yellow-500 text-black' : 'bg-yellow-500/20 text-yellow-400'
                  }`}
                >
                  ⚙️ ADMIN
                </button>
              ) : (
                <button onClick={() => setShowLoginModal(true)} className="px-3 py-2 text-gray-600 hover:text-gray-300">
                  🔐
                </button>
              )}
            </div>

            <button className="lg:hidden p-2 text-2xl" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
              {mobileMenuOpen ? '✕' : '☰'}
            </button>
          </div>

          {/* Mobile Nav */}
          {mobileMenuOpen && (
            <div className="lg:hidden pb-4 space-y-1 border-t border-red-600/50 pt-4">
              {['home', 'achievements', 'gallery', 'game', 'social', 'messageboard', 'about'].map(id => (
                <button
                  key={id}
                  onClick={() => { setCurrentPage(id); setMobileMenuOpen(false); }}
                  className={`block w-full text-left px-4 py-3 font-bold tracking-wider ${
                    currentPage === id ? 'bg-red-600' : 'bg-white/5'
                  }`}
                >
                  {id.toUpperCase().replace('MESSAGEBOARD', 'FAN ZONE')}
                </button>
              ))}
              {isAdmin && (
                <button onClick={() => { setCurrentPage('admin'); setMobileMenuOpen(false); }} className="block w-full text-left px-4 py-3 font-bold bg-yellow-500/20 text-yellow-400">
                  ⚙️ ADMIN
                </button>
              )}
            </div>
          )}
        </div>
      </nav>

      {showLoginModal && (
        <LoginModal onClose={() => setShowLoginModal(false)} onLogin={() => { setIsAdmin(true); setShowLoginModal(false); setCurrentPage('admin'); }} />
      )}

      <main className="relative z-10">{pages[currentPage]}</main>

      {/* Footer */}
      <footer className="relative z-10 bg-black border-t-4 border-red-600 mt-16">
        <div className="max-w-7xl mx-auto px-4 py-12">
          <div className="grid md:grid-cols-3 gap-8 mb-8">
            {/* Logo */}
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-red-600 rounded-sm flex items-center justify-center font-black text-2xl transform -skew-x-6">JW</div>
                <div>
                  <div className="font-black text-xl"><span className="text-red-500">JOE</span> WHYTE</div>
                  <div className="text-xs text-gray-500">Voice Actor • Animator • Legend</div>
                </div>
              </div>
              <p className="text-gray-400 text-sm">35+ years of entertainment excellence.</p>
            </div>
            
            {/* Quick Links */}
            <div>
              <h4 className="font-bold text-red-500 mb-4 tracking-wider">QUICK LINKS</h4>
              <div className="space-y-2 text-sm">
                <a href={SOCIAL_LINKS.imdb} target="_blank" rel="noreferrer" className="block text-gray-400 hover:text-white">📽️ IMDb Profile</a>
                <a href={SOCIAL_LINKS.website} target="_blank" rel="noreferrer" className="block text-gray-400 hover:text-white">🎨 WhyteNoise.com</a>
                <a href="https://en.wikipedia.org/wiki/Joe_Whyte" target="_blank" rel="noreferrer" className="block text-gray-400 hover:text-white">📚 Wikipedia</a>
              </div>
            </div>
            
            {/* Social */}
            <div>
              <h4 className="font-bold text-red-500 mb-4 tracking-wider">FOLLOW JOE</h4>
              <div className="flex gap-3">
                <a href={SOCIAL_LINKS.instagram} target="_blank" rel="noreferrer" className="w-10 h-10 bg-gradient-to-br from-purple-600 to-pink-500 rounded-lg flex items-center justify-center hover:scale-110 transition-transform">📷</a>
                <a href={SOCIAL_LINKS.facebook} target="_blank" rel="noreferrer" className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center hover:scale-110 transition-transform">👤</a>
                <a href={SOCIAL_LINKS.youtube} target="_blank" rel="noreferrer" className="w-10 h-10 bg-red-600 rounded-lg flex items-center justify-center hover:scale-110 transition-transform">▶️</a>
              </div>
            </div>
          </div>
          
          <div className="border-t border-gray-800 pt-8 flex flex-wrap items-center justify-between gap-4">
            <p className="text-gray-500 text-sm">© {new Date().getFullYear()} Joe Whyte Fan Zone. Made with 💖</p>
            {isAdmin ? (
              <button onClick={() => { setIsAdmin(false); setCurrentPage('home'); }} className="text-red-400 text-sm">Logout</button>
            ) : (
              <button onClick={() => setShowLoginModal(true)} className="text-gray-600 text-sm">Admin</button>
            )}
          </div>
        </div>
      </footer>
    </div>
  )
}

// ==================== LOGIN MODAL ====================
function LoginModal({ onClose, onLogin }) {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState(false)

  const handleLogin = () => {
    if (username === ADMIN_USER && password === ADMIN_PASS) {
      onLogin()
    } else {
      setError(true)
      setTimeout(() => setError(false), 2000)
    }
  }

  return (
    <div className="fixed inset-0 bg-black/90 flex items-center justify-center z-50 p-4" onClick={onClose}>
      <div className="bg-gray-900 rounded-none border-4 border-red-600 p-8 max-w-md w-full transform -skew-x-1" onClick={e => e.stopPropagation()}>
        <h2 className="text-2xl font-black mb-6 text-red-500 tracking-wider">🔐 ADMIN ACCESS</h2>
        <div className="space-y-4">
          <input type="text" value={username} onChange={e => setUsername(e.target.value)} onKeyDown={e => e.key === 'Enter' && handleLogin()} placeholder="Username" className={`w-full bg-black border-2 ${error ? 'border-red-500' : 'border-gray-700'} px-4 py-3 font-bold focus:border-red-500 focus:outline-none`} autoFocus />
          <input type="password" value={password} onChange={e => setPassword(e.target.value)} onKeyDown={e => e.key === 'Enter' && handleLogin()} placeholder="Password" className={`w-full bg-black border-2 ${error ? 'border-red-500' : 'border-gray-700'} px-4 py-3 font-bold focus:border-red-500 focus:outline-none`} />
        </div>
        {error && <p className="text-red-400 text-sm mt-4 font-bold">ACCESS DENIED</p>}
        <div className="flex gap-3 mt-6">
          <button onClick={onClose} className="flex-1 px-4 py-3 bg-gray-800 font-bold hover:bg-gray-700">CANCEL</button>
          <button onClick={handleLogin} className="flex-1 px-4 py-3 bg-red-600 font-bold hover:bg-red-500">LOGIN</button>
        </div>
      </div>
    </div>
  )
}

// ==================== HOME PAGE ====================
function HomePage({ setCurrentPage }) {
  const [events, setEvents] = useState([])
  const [loading, setLoading] = useState(true)
  const [email, setEmail] = useState('')
  const [name, setName] = useState('')

  useEffect(() => { loadEvents() }, [])

  const loadEvents = async () => {
    try {
      const response = await fetch('/data/events.json')
      const data = await response.json()
      const upcoming = data.events.filter(e => new Date(e.date) >= new Date()).sort((a, b) => new Date(a.date) - new Date(b.date))
      setEvents(upcoming)
    } catch (e) { console.error('Error:', e) }
    setLoading(false)
  }

  const handleSubscribe = () => {
    if (!email.includes('@')) { alert('Enter a valid email!'); return }
    const subject = encodeURIComponent('New Fan Subscriber!')
    const body = encodeURIComponent(`New subscriber!\n\nName: ${name || 'Fan'}\nEmail: ${email}\nDate: ${new Date().toLocaleString()}`)
    window.location.href = `mailto:${JOE_EMAIL}?subject=${subject}&body=${body}`
    alert('Thanks! Your email app will open.')
    setEmail(''); setName('')
  }

  const formatDate = (dateStr) => {
    const date = new Date(dateStr)
    return { month: date.toLocaleDateString('en-US', { month: 'short' }).toUpperCase(), day: date.getDate() }
  }

  const eventEmoji = { convention: '🎪', comedy: '🎤', signing: '✍️', panel: '🎬', appearance: '⭐', other: '📅' }

  return (
    <div>
      {/* HERO SECTION - Marvel Style */}
      <section className="relative min-h-[80vh] flex items-center overflow-hidden">
        {/* Dynamic Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-red-900/50 via-black to-blue-900/30" />
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.03'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }} />
        
        {/* Diagonal Accent */}
        <div className="absolute top-0 right-0 w-1/3 h-full bg-red-600/20 transform skew-x-12 translate-x-20" />
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 py-20">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              {/* Comic-style badge */}
              <div className="inline-block mb-6">
                <div className="bg-yellow-400 text-black px-4 py-2 font-black text-sm transform -rotate-2 border-4 border-black">
                  ⭐ VOICE ACTING LEGEND ⭐
                </div>
              </div>
              
              <h1 className="text-6xl md:text-8xl font-black leading-none mb-6">
                <span className="text-red-500 block" style={{ textShadow: '4px 4px 0 #000, -2px -2px 0 #7f1d1d' }}>JOE</span>
                <span className="text-white block" style={{ textShadow: '4px 4px 0 #000' }}>WHYTE</span>
              </h1>
              
              <p className="text-xl md:text-2xl text-gray-300 mb-8 font-bold">
                Disney Animator • Gaming Icon • Comedy King
              </p>
              
              {/* Action Buttons */}
              <div className="flex flex-wrap gap-4">
                <button onClick={() => setCurrentPage('achievements')} className="px-8 py-4 bg-red-600 font-black text-lg hover:bg-red-500 transform hover:-skew-x-3 transition-all border-b-4 border-red-800">
                  VIEW CREDITS →
                </button>
                <button onClick={() => setCurrentPage('gallery')} className="px-8 py-4 bg-white/10 font-black text-lg hover:bg-white/20 transform hover:-skew-x-3 transition-all border-b-4 border-white/20">
                  SEE ARTWORK
                </button>
              </div>
            </div>
            
            {/* Stats Panel */}
            <div className="grid grid-cols-2 gap-4">
              {[
                { num: '35+', label: 'YEARS', color: 'red' },
                { num: '50+', label: 'CREDITS', color: 'blue' },
                { num: '15+', label: 'DISNEY FILMS', color: 'yellow' },
                { num: '∞', label: 'LEGEND STATUS', color: 'green' },
              ].map((stat, i) => (
                <div key={i} className={`bg-black/50 border-l-4 border-${stat.color}-500 p-6 transform hover:scale-105 transition-transform`}>
                  <div className="text-4xl md:text-5xl font-black">{stat.num}</div>
                  <div className="text-xs font-bold text-gray-400 tracking-wider">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ICONIC ROLES - Comic Panel Style */}
      <section className="py-20 px-4 bg-gradient-to-b from-black to-gray-900">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-black mb-4">
              <span className="text-red-500">ICONIC</span> ROLES
            </h2>
            <div className="w-24 h-1 bg-red-600 mx-auto" />
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { emoji: '🧟', title: 'CHRIS REDFIELD', subtitle: 'Resident Evil', desc: 'The voice of S.T.A.R.S. finest!', color: 'green' },
              { emoji: '🦸', title: 'MERMAID MAN', subtitle: 'SpongeBob Games', desc: 'EVIIIIL! Underwater hero!', color: 'blue' },
              { emoji: '🦀', title: 'MR. KRABS', subtitle: 'SpongeBob Games', desc: 'Money money money!', color: 'red' },
              { emoji: '🎬', title: 'DISNEY LEGEND', subtitle: '15+ Films', desc: 'Voice & 3D modeling', color: 'yellow' },
            ].map((role, i) => (
              <div key={i} className={`group relative bg-gray-900 border-4 border-gray-800 hover:border-${role.color}-500 p-6 transform hover:-translate-y-2 hover:rotate-1 transition-all duration-300`}>
                {/* Corner accent */}
                <div className={`absolute top-0 right-0 w-8 h-8 bg-${role.color}-500 transform translate-x-2 -translate-y-2`} />
                
                <div className="text-5xl mb-4 group-hover:scale-125 transition-transform">{role.emoji}</div>
                <h3 className={`text-xl font-black text-${role.color}-400 mb-1`}>{role.title}</h3>
                <p className="text-sm text-gray-400 font-bold mb-2">{role.subtitle}</p>
                <p className="text-gray-500 text-sm">{role.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* EVENTS SECTION */}
      <section className="py-20 px-4 bg-black relative overflow-hidden">
        {/* Diagonal stripes */}
        <div className="absolute inset-0 opacity-5" style={{
          backgroundImage: `repeating-linear-gradient(-45deg, #fff 0, #fff 2px, transparent 0, transparent 20px)`
        }} />
        
        <div className="max-w-5xl mx-auto relative z-10">
          <div className="flex items-center justify-between mb-12">
            <div>
              <h2 className="text-4xl md:text-5xl font-black">
                <span className="text-yellow-400">SEE JOE</span> LIVE
              </h2>
              <p className="text-gray-400 font-bold mt-2">Conventions • Comedy • Signings</p>
            </div>
          </div>

          {loading ? (
            <div className="text-center py-12"><div className="text-4xl animate-bounce">🎭</div></div>
          ) : events.length === 0 ? (
            <div className="text-center py-12 border-4 border-dashed border-gray-800">
              <p className="text-gray-500 font-bold">No upcoming events. Stay tuned!</p>
            </div>
          ) : (
            <div className="space-y-4">
              {events.slice(0, 4).map((event, i) => {
                const d = formatDate(event.date)
                return (
                  <div key={event.id} className="flex items-stretch bg-gray-900 border-l-4 border-red-600 hover:border-yellow-400 transition-colors group">
                    {/* Date */}
                    <div className="w-24 bg-red-600 group-hover:bg-yellow-400 group-hover:text-black transition-colors flex flex-col items-center justify-center py-4">
                      <div className="text-xs font-bold">{d.month}</div>
                      <div className="text-3xl font-black">{d.day}</div>
                    </div>
                    
                    {/* Details */}
                    <div className="flex-1 p-4 flex items-center justify-between gap-4">
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-xl">{eventEmoji[event.type] || '📅'}</span>
                          <h3 className="font-black text-lg">{event.name}</h3>
                        </div>
                        <p className="text-gray-400 text-sm">📍 {event.venue}, {event.city}</p>
                        {event.time && <p className="text-gray-500 text-sm">🕐 {event.time}</p>}
                      </div>
                      
                      {event.ticketUrl && (
                        <a href={event.ticketUrl} target="_blank" rel="noreferrer" className="px-6 py-2 bg-yellow-400 text-black font-black text-sm hover:bg-yellow-300 flex-shrink-0">
                          TICKETS →
                        </a>
                      )}
                    </div>
                  </div>
                )
              })}
            </div>
          )}

          {/* Email Signup */}
          <div className="mt-12 bg-gradient-to-r from-red-900/50 to-blue-900/50 border-4 border-gray-800 p-8">
            <div className="text-center mb-6">
              <h3 className="text-2xl font-black mb-2">🔔 NEVER MISS AN APPEARANCE</h3>
              <p className="text-gray-400">Get notified about new events!</p>
            </div>
            <div className="flex flex-col md:flex-row gap-4 max-w-2xl mx-auto">
              <input type="text" value={name} onChange={e => setName(e.target.value)} placeholder="Your name" className="flex-1 bg-black border-2 border-gray-700 px-4 py-3 font-bold focus:border-red-500 focus:outline-none" />
              <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="Your email" className="flex-1 bg-black border-2 border-gray-700 px-4 py-3 font-bold focus:border-red-500 focus:outline-none" />
              <button onClick={handleSubscribe} className="px-8 py-3 bg-red-600 font-black hover:bg-red-500 whitespace-nowrap">NOTIFY ME</button>
            </div>
          </div>
        </div>
      </section>

      {/* QUICK LINKS */}
      <section className="py-20 px-4 bg-gray-900">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          <button onClick={() => setCurrentPage('gallery')} className="group bg-black border-4 border-gray-800 hover:border-red-500 p-8 text-left transition-all">
            <div className="text-4xl mb-4 group-hover:scale-125 transition-transform">🎨</div>
            <h3 className="text-xl font-black text-red-400 mb-2">ART GALLERY</h3>
            <p className="text-gray-500 text-sm">Explore Joe's CG modeling work</p>
          </button>
          
          <button onClick={() => setCurrentPage('game')} className="group bg-black border-4 border-gray-800 hover:border-green-500 p-8 text-left transition-all relative overflow-hidden">
            <div className="absolute top-2 right-2 bg-green-500 text-black text-xs font-black px-2 py-1">NEW!</div>
            <div className="text-4xl mb-4 group-hover:scale-125 transition-transform">🎮</div>
            <h3 className="text-xl font-black text-green-400 mb-2">PLAY GAME</h3>
            <p className="text-gray-500 text-sm">Joe's RE Escape - endless runner!</p>
          </button>
          
          <button onClick={() => setCurrentPage('social')} className="group bg-black border-4 border-gray-800 hover:border-blue-500 p-8 text-left transition-all">
            <div className="text-4xl mb-4 group-hover:scale-125 transition-transform">📱</div>
            <h3 className="text-xl font-black text-blue-400 mb-2">SOCIAL FEEDS</h3>
            <p className="text-gray-500 text-sm">Follow Joe on social media</p>
          </button>
          
          <button onClick={() => setCurrentPage('messageboard')} className="group bg-black border-4 border-gray-800 hover:border-yellow-500 p-8 text-left transition-all">
            <div className="text-4xl mb-4 group-hover:scale-125 transition-transform">💬</div>
            <h3 className="text-xl font-black text-yellow-400 mb-2">FAN ZONE</h3>
            <p className="text-gray-500 text-sm">Leave a message for Joe!</p>
          </button>
        </div>
      </section>
    </div>
  )
}

// ==================== GALLERY PAGE ====================
function GalleryPage() {
  const [activeCategory, setActiveCategory] = useState('all')
  
  const artworks = [
    { id: 1, title: 'Tarzan Character Models', year: '1999', category: 'disney', desc: '3D character modeling for Disney\'s Tarzan' },
    { id: 2, title: 'Treasure Planet Ships', year: '2002', category: 'disney', desc: 'Spaceship and environment modeling' },
    { id: 3, title: 'Chicken Little Assets', year: '2005', category: 'disney', desc: 'Character and prop modeling' },
    { id: 4, title: 'Bolt Senior Modeling', year: '2008', category: 'disney', desc: 'Lead modeling work on Bolt' },
    { id: 5, title: 'Strange Magic Pre-Viz', year: '2015', category: 'lucasfilm', desc: 'Senior pre-visualization at Lucasfilm' },
    { id: 6, title: 'The Emoji Movie', year: '2017', category: 'sony', desc: 'Character modeling at Sony' },
    { id: 7, title: 'Hotel Transylvania 3', year: '2018', category: 'sony', desc: 'Character assets and animation' },
    { id: 8, title: 'Blue Eye Samurai', year: '2023', category: 'netflix', desc: 'CG modeling for Netflix series' },
  ]

  const categories = [
    { id: 'all', label: 'ALL WORK' },
    { id: 'disney', label: 'DISNEY' },
    { id: 'sony', label: 'SONY' },
    { id: 'lucasfilm', label: 'LUCASFILM' },
    { id: 'netflix', label: 'NETFLIX' },
  ]

  const filtered = activeCategory === 'all' ? artworks : artworks.filter(a => a.category === activeCategory)

  return (
    <div className="py-12 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl md:text-6xl font-black mb-4">
            <span className="text-red-500">ART</span> GALLERY
          </h1>
          <p className="text-gray-400 font-bold">35+ years of CG modeling and animation</p>
          <div className="w-24 h-1 bg-red-600 mx-auto mt-4" />
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {categories.map(cat => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-6 py-2 font-bold text-sm tracking-wider transition-all ${
                activeCategory === cat.id
                  ? 'bg-red-600 text-white'
                  : 'bg-gray-900 text-gray-400 hover:bg-gray-800'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Gallery Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((art, i) => (
            <div key={art.id} className="group relative bg-gray-900 border-4 border-gray-800 hover:border-red-500 overflow-hidden transition-all">
              {/* Placeholder Image */}
              <div className="aspect-video bg-gradient-to-br from-gray-800 to-gray-900 flex items-center justify-center">
                <div className="text-6xl opacity-30">🎨</div>
              </div>
              
              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-6">
                <div>
                  <span className="text-red-400 text-sm font-bold">{art.year}</span>
                  <h3 className="text-xl font-black text-white">{art.title}</h3>
                  <p className="text-gray-400 text-sm">{art.desc}</p>
                </div>
              </div>
              
              {/* Always visible info */}
              <div className="p-4 border-t-4 border-gray-800 group-hover:border-red-500 transition-colors">
                <span className="text-xs font-bold text-red-400 uppercase">{art.category}</span>
                <h3 className="font-black">{art.title}</h3>
                <p className="text-gray-500 text-sm">{art.year}</p>
              </div>
            </div>
          ))}
        </div>

        {/* WhyteNoise Link */}
        <div className="text-center mt-16">
          <div className="inline-block bg-gray-900 border-4 border-gray-800 p-8">
            <h3 className="text-2xl font-black mb-4">🎨 WANT TO SEE MORE?</h3>
            <p className="text-gray-400 mb-6">Visit Joe's official portfolio site</p>
            <a href={SOCIAL_LINKS.website} target="_blank" rel="noreferrer" className="inline-block px-8 py-4 bg-red-600 font-black hover:bg-red-500 transition-colors">
              VISIT WHYTENOISE.COM →
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}

// ==================== SOCIAL PAGE ====================
function SocialPage() {
  return (
    <div className="py-12 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl md:text-6xl font-black mb-4">
            <span className="text-blue-400">SOCIAL</span> FEEDS
          </h1>
          <p className="text-gray-400 font-bold">Follow Joe across the internet</p>
          <div className="w-24 h-1 bg-blue-500 mx-auto mt-4" />
        </div>

        {/* Social Grid */}
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Instagram */}
          <div className="bg-gray-900 border-4 border-gray-800">
            <div className="bg-gradient-to-r from-purple-600 to-pink-500 p-4 flex items-center gap-3">
              <span className="text-2xl">📷</span>
              <span className="font-black">INSTAGRAM</span>
            </div>
            <div className="p-6">
              <p className="text-gray-400 mb-4">Behind the scenes, art, and daily life.</p>
              <a href={SOCIAL_LINKS.instagram} target="_blank" rel="noreferrer" className="block w-full py-3 bg-gradient-to-r from-purple-600 to-pink-500 text-center font-black hover:opacity-90">
                FOLLOW @JOEWHYTE
              </a>
              {/* Placeholder posts */}
              <div className="grid grid-cols-3 gap-2 mt-4">
                {[1,2,3,4,5,6].map(i => (
                  <div key={i} className="aspect-square bg-gray-800 flex items-center justify-center text-2xl opacity-50">📷</div>
                ))}
              </div>
            </div>
          </div>

          {/* YouTube */}
          <div className="bg-gray-900 border-4 border-gray-800">
            <div className="bg-red-600 p-4 flex items-center gap-3">
              <span className="text-2xl">▶️</span>
              <span className="font-black">YOUTUBE</span>
            </div>
            <div className="p-6">
              <p className="text-gray-400 mb-4">Interviews, demos, and voice acting tips.</p>
              <a href={SOCIAL_LINKS.youtube} target="_blank" rel="noreferrer" className="block w-full py-3 bg-red-600 text-center font-black hover:bg-red-500">
                SUBSCRIBE
              </a>
              {/* Placeholder videos */}
              <div className="space-y-3 mt-4">
                {['Voice Acting Tips', 'RE Remake Stories', 'Disney Days'].map((title, i) => (
                  <div key={i} className="flex gap-3 items-center p-2 bg-gray-800 hover:bg-gray-700">
                    <div className="w-20 h-12 bg-gray-700 flex items-center justify-center">▶️</div>
                    <div>
                      <div className="font-bold text-sm">{title}</div>
                      <div className="text-xs text-gray-500">Video</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Facebook */}
          <div className="bg-gray-900 border-4 border-gray-800">
            <div className="bg-blue-600 p-4 flex items-center gap-3">
              <span className="text-2xl">👤</span>
              <span className="font-black">FACEBOOK</span>
            </div>
            <div className="p-6">
              <p className="text-gray-400 mb-4">Event updates and fan community.</p>
              <a href={SOCIAL_LINKS.facebook} target="_blank" rel="noreferrer" className="block w-full py-3 bg-blue-600 text-center font-black hover:bg-blue-500">
                LIKE PAGE
              </a>
              {/* Placeholder posts */}
              <div className="space-y-3 mt-4">
                {['Convention Announcement', 'New Project Teaser', 'Fan Meetup Photos'].map((title, i) => (
                  <div key={i} className="p-3 bg-gray-800 hover:bg-gray-700">
                    <div className="font-bold text-sm">{title}</div>
                    <div className="text-xs text-gray-500 mt-1">2 days ago</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* All Socials */}
        <div className="mt-16 text-center">
          <h3 className="text-2xl font-black mb-8">ALL PLATFORMS</h3>
          <div className="flex flex-wrap justify-center gap-4">
            <a href={SOCIAL_LINKS.instagram} target="_blank" rel="noreferrer" className="px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-500 font-black hover:opacity-90">📷 Instagram</a>
            <a href={SOCIAL_LINKS.youtube} target="_blank" rel="noreferrer" className="px-6 py-3 bg-red-600 font-black hover:bg-red-500">▶️ YouTube</a>
            <a href={SOCIAL_LINKS.facebook} target="_blank" rel="noreferrer" className="px-6 py-3 bg-blue-600 font-black hover:bg-blue-500">👤 Facebook</a>
            <a href={SOCIAL_LINKS.imdb} target="_blank" rel="noreferrer" className="px-6 py-3 bg-yellow-500 text-black font-black hover:bg-yellow-400">📽️ IMDb</a>
            <a href={SOCIAL_LINKS.website} target="_blank" rel="noreferrer" className="px-6 py-3 bg-gray-700 font-black hover:bg-gray-600">🎨 WhyteNoise</a>
          </div>
        </div>
      </div>
    </div>
  )
}

// ==================== MESSAGE BOARD PAGE ====================
function MessageBoardPage({ isAdmin }) {
  const [messages, setMessages] = useState([])
  const [loading, setLoading] = useState(true)
  const [newMessage, setNewMessage] = useState({ name: '', message: '' })
  const [submitting, setSubmitting] = useState(false)
  const [showReplyModal, setShowReplyModal] = useState(null)
  const [replyText, setReplyText] = useState('')
  const [deletedIds, setDeletedIds] = useState([])
  const [adminReplies, setAdminReplies] = useState({})
  const [bannedUsers, setBannedUsers] = useState([])
  const [pendingMessages, setPendingMessages] = useState([])

  useEffect(() => { loadMessages(); loadLocalData() }, [])

  const loadLocalData = () => {
    try {
      setDeletedIds(JSON.parse(localStorage.getItem(DELETED_MESSAGES_KEY) || '[]'))
      setAdminReplies(JSON.parse(localStorage.getItem(ADMIN_REPLIES_KEY) || '{}'))
      setBannedUsers(JSON.parse(localStorage.getItem(BANNED_USERS_KEY) || '[]'))
      setPendingMessages(JSON.parse(localStorage.getItem(PENDING_MESSAGES_KEY) || '[]'))
    } catch (e) { console.error(e) }
  }

  const loadMessages = async () => {
    try {
      const response = await fetch('/data/messages.json')
      const data = await response.json()
      setMessages(data.messages || [])
    } catch (e) { console.error(e) }
    setLoading(false)
  }

  const handleSubmit = () => {
    if (!newMessage.name.trim() || !newMessage.message.trim()) { alert('Fill in all fields!'); return }
    if (bannedUsers.includes(newMessage.name.toLowerCase())) { alert('Username banned.'); return }
    setSubmitting(true)
    const pendingMsg = { id: Date.now(), name: newMessage.name.trim(), message: newMessage.message.trim(), date: new Date().toISOString().split('T')[0], pending: true }
    const updated = [...pendingMessages, pendingMsg]
    setPendingMessages(updated)
    localStorage.setItem(PENDING_MESSAGES_KEY, JSON.stringify(updated))
    const subject = encodeURIComponent('New Fan Message!')
    const body = encodeURIComponent(`From: ${pendingMsg.name}\n\n${pendingMsg.message}`)
    window.open(`mailto:${JOE_EMAIL}?subject=${subject}&body=${body}`, '_blank')
    alert('Message sent! Joe will review it.')
    setNewMessage({ name: '', message: '' })
    setSubmitting(false)
  }

  const handleDelete = (id, isPending = false) => {
    if (!confirm('Delete?')) return
    if (isPending) {
      const updated = pendingMessages.filter(m => m.id !== id)
      setPendingMessages(updated)
      localStorage.setItem(PENDING_MESSAGES_KEY, JSON.stringify(updated))
    } else {
      const updated = [...deletedIds, id]
      setDeletedIds(updated)
      localStorage.setItem(DELETED_MESSAGES_KEY, JSON.stringify(updated))
    }
  }

  const handleBan = (username) => {
    if (!confirm(`Ban "${username}"?`)) return
    const updated = [...bannedUsers, username.toLowerCase()]
    setBannedUsers(updated)
    localStorage.setItem(BANNED_USERS_KEY, JSON.stringify(updated))
  }

  const handleReply = (messageId) => {
    if (!replyText.trim()) return
    const updated = { ...adminReplies, [messageId]: { text: replyText, date: new Date().toISOString().split('T')[0] } }
    setAdminReplies(updated)
    localStorage.setItem(ADMIN_REPLIES_KEY, JSON.stringify(updated))
    setShowReplyModal(null)
    setReplyText('')
  }

  const allMessages = [...messages.filter(m => !deletedIds.includes(m.id)), ...pendingMessages].sort((a, b) => new Date(b.date) - new Date(a.date))

  return (
    <div className="py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-5xl md:text-6xl font-black mb-4">
            <span className="text-yellow-400">FAN</span> ZONE
          </h1>
          <p className="text-gray-400 font-bold">Leave a message for Joe!</p>
          <div className="w-24 h-1 bg-yellow-500 mx-auto mt-4" />
        </div>

        {isAdmin && (
          <div className="bg-yellow-500/20 border-4 border-yellow-500/50 p-4 mb-6">
            <p className="text-yellow-400 font-bold text-sm">⚡ ADMIN MODE: You can reply, delete, and ban users.</p>
          </div>
        )}

        {/* New Message Form */}
        <div className="bg-gray-900 border-4 border-gray-800 p-6 mb-8">
          <h3 className="font-black text-xl mb-4 text-yellow-400">✍️ LEAVE A MESSAGE</h3>
          <div className="space-y-4">
            <input type="text" value={newMessage.name} onChange={e => setNewMessage({...newMessage, name: e.target.value})} placeholder="Your name" className="w-full bg-black border-2 border-gray-700 px-4 py-3 font-bold focus:border-yellow-500 focus:outline-none" />
            <textarea value={newMessage.message} onChange={e => setNewMessage({...newMessage, message: e.target.value})} placeholder="Your message to Joe..." rows={4} className="w-full bg-black border-2 border-gray-700 px-4 py-3 font-bold focus:border-yellow-500 focus:outline-none resize-none" />
            <button onClick={handleSubmit} disabled={submitting} className="w-full py-3 bg-yellow-500 text-black font-black hover:bg-yellow-400 disabled:opacity-50">
              {submitting ? 'SENDING...' : 'SEND MESSAGE →'}
            </button>
          </div>
        </div>

        {/* Messages */}
        {loading ? (
          <div className="text-center py-12"><div className="text-4xl animate-bounce">💬</div></div>
        ) : allMessages.length === 0 ? (
          <div className="text-center py-12 border-4 border-dashed border-gray-800">
            <p className="text-gray-500 font-bold">No messages yet. Be the first!</p>
          </div>
        ) : (
          <div className="space-y-4">
            {allMessages.map(msg => (
              <div key={msg.id} className={`bg-gray-900 border-4 ${msg.pending ? 'border-yellow-500/50' : 'border-gray-800'} p-6`}>
                {msg.pending && <div className="inline-block bg-yellow-500/20 text-yellow-400 text-xs px-2 py-1 font-bold mb-3">⏳ PENDING</div>}
                <div className="flex items-start justify-between gap-4 mb-3">
                  <div>
                    <span className="font-black text-red-400">{msg.name}</span>
                    <span className="text-gray-500 text-sm ml-2">{msg.date}</span>
                  </div>
                  {isAdmin && (
                    <div className="flex gap-2">
                      {!msg.pending && !msg.adminReply && !adminReplies[msg.id] && (
                        <button onClick={() => setShowReplyModal(msg.id)} className="text-xs px-3 py-1 bg-green-500/20 text-green-400 font-bold hover:bg-green-500/30">REPLY</button>
                      )}
                      <button onClick={() => handleBan(msg.name)} className="text-xs px-3 py-1 bg-orange-500/20 text-orange-400 font-bold hover:bg-orange-500/30">BAN</button>
                      <button onClick={() => handleDelete(msg.id, msg.pending)} className="text-xs px-3 py-1 bg-red-500/20 text-red-400 font-bold hover:bg-red-500/30">DELETE</button>
                    </div>
                  )}
                </div>
                <p className="text-gray-200">{msg.message}</p>
                {(msg.adminReply || adminReplies[msg.id]) && (
                  <div className="mt-4 pl-4 border-l-4 border-red-500 bg-red-500/10 p-4">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-red-400 font-black text-sm">🎤 JOE WHYTE</span>
                      <span className="text-gray-500 text-xs">{msg.replyDate || adminReplies[msg.id]?.date}</span>
                    </div>
                    <p className="text-gray-300">{msg.adminReply || adminReplies[msg.id]?.text}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        {/* Reply Modal */}
        {showReplyModal && (
          <div className="fixed inset-0 bg-black/90 flex items-center justify-center z-50 p-4" onClick={() => setShowReplyModal(null)}>
            <div className="bg-gray-900 border-4 border-green-500 p-6 max-w-lg w-full" onClick={e => e.stopPropagation()}>
              <h3 className="text-xl font-black text-green-400 mb-4">💬 REPLY AS JOE</h3>
              <textarea value={replyText} onChange={e => setReplyText(e.target.value)} placeholder="Write reply..." rows={4} className="w-full bg-black border-2 border-gray-700 px-4 py-3 mb-4 font-bold focus:border-green-500 focus:outline-none resize-none" autoFocus />
              <div className="flex gap-3">
                <button onClick={() => setShowReplyModal(null)} className="flex-1 py-2 bg-gray-800 font-bold">CANCEL</button>
                <button onClick={() => handleReply(showReplyModal)} className="flex-1 py-2 bg-green-500 text-black font-black">POST</button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

// ==================== ACHIEVEMENTS PAGE ====================
function AchievementsPage() {
  const [activeTab, setActiveTab] = useState('disney')

  const achievements = {
    disney: { title: '🏰 DISNEY', items: [
      { year: '1997', title: 'Hercules', role: 'Production / Scratch Voice' },
      { year: '1999', title: 'Tarzan', role: '3D Modeler' },
      { year: '2000', title: "Emperor's New Groove", role: 'Voice Actor' },
      { year: '2002', title: 'Treasure Planet', role: '3D Modeler' },
      { year: '2004', title: 'Home on the Range', role: 'Voice & Modeler' },
      { year: '2005', title: 'Chicken Little', role: 'Voice & CG Modeler' },
      { year: '2007', title: 'Meet the Robinsons', role: 'Voice & Modeler' },
      { year: '2008', title: 'Bolt', role: 'Senior Modeler' },
      { year: '2009', title: 'Princess and the Frog', role: 'Voice Actor' },
      { year: '2009', title: 'Prep & Landing', role: 'Voice & Modeler' },
    ]},
    gaming: { title: '🎮 GAMING', items: [
      { year: '2001', title: 'SpongeBob SuperSponge', role: 'Mr. Krabs' },
      { year: '2002', title: 'Resident Evil (GC)', role: 'Chris Redfield & Richard Aiken' },
      { year: '2002', title: 'Employee of the Month', role: 'Mermaid Man' },
      { year: '2003', title: 'Battle for Bikini Bottom', role: 'Mr. Krabs & Mermaid Man' },
      { year: '2020', title: 'BFBB Rehydrated', role: 'Original Voice' },
    ]},
    other: { title: '🎬 OTHER', items: [
      { year: '2015', title: 'Strange Magic', role: 'Senior Pre-Viz (Lucasfilm)' },
      { year: '2017', title: 'The Star', role: 'Voice & Modeler (Sony)' },
      { year: '2018', title: 'Hotel Transylvania 3', role: 'Voice Actor' },
      { year: '2023', title: 'Blue Eye Samurai', role: 'CG Modeler (Netflix)' },
    ]},
    comedy: { title: '🎭 COMEDY', items: [
      { year: '1990s', title: 'ComedySportz LA', role: 'Improv Performer' },
      { year: '2000', title: 'The Newtonics', role: 'w/ Jeff Bryan Davis' },
      { year: 'NOW', title: 'Stand-Up Comedy', role: 'Los Angeles Venues' },
    ]}
  }

  return (
    <div className="py-12 px-4">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-5xl md:text-6xl font-black mb-4">
            <span className="text-red-500">CAREER</span> CREDITS
          </h1>
          <p className="text-gray-400 font-bold">35+ years of entertainment</p>
          <div className="w-24 h-1 bg-red-600 mx-auto mt-4" />
        </div>

        {/* Tabs */}
        <div className="flex flex-wrap justify-center gap-2 mb-8">
          {Object.keys(achievements).map(key => (
            <button key={key} onClick={() => setActiveTab(key)}
              className={`px-6 py-3 font-black tracking-wider transition-all ${activeTab === key ? 'bg-red-600' : 'bg-gray-900 hover:bg-gray-800'}`}>
              {achievements[key].title}
            </button>
          ))}
        </div>

        {/* List */}
        <div className="bg-gray-900 border-4 border-gray-800">
          {achievements[activeTab].items.map((item, i) => (
            <div key={i} className="flex items-center gap-4 p-4 border-b border-gray-800 last:border-0 hover:bg-gray-800/50 transition-colors">
              <span className="text-red-400 font-black w-16">{item.year}</span>
              <div className="flex-1">
                <span className="font-bold">{item.title}</span>
                <span className="text-gray-500 text-sm ml-2">— {item.role}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

// ==================== ABOUT PAGE ====================
function AboutPage() {
  return (
    <div className="py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-5xl md:text-6xl font-black mb-4">
            <span className="text-red-500">ABOUT</span> JOE
          </h1>
          <div className="w-24 h-1 bg-red-600 mx-auto" />
        </div>

        <div className="bg-gray-900 border-4 border-gray-800 p-8 mb-8">
          <p className="text-gray-300 leading-relaxed mb-4"><strong className="text-white">Joseph Walter Whyte</strong> (born April 18, 1961) is an American actor, voice actor, 3D modeler, and comedian with over 35 years in entertainment.</p>
          <p className="text-gray-300 leading-relaxed mb-4">From 1995-2010, Joe worked at <strong className="text-red-400">Walt Disney Animation Studios</strong> as both modeler and voice actor on films like Tarzan, Bolt, and The Princess and the Frog.</p>
          <p className="text-gray-300 leading-relaxed">He's best known as the voice of <strong className="text-green-400">Chris Redfield</strong> in Resident Evil (2002), an iconic gaming performance.</p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-gray-900 border-4 border-red-500/30 p-6">
            <h3 className="font-black text-red-400 mb-4">🎭 COMEDY</h3>
            <p className="text-gray-400 text-sm">Performed with ComedySportz LA, The Impromptones, and The Newtonics (with Jeff Bryan Davis). Still does stand-up in LA!</p>
          </div>
          <div className="bg-gray-900 border-4 border-blue-500/30 p-6">
            <h3 className="font-black text-blue-400 mb-4">💑 PERSONAL</h3>
            <p className="text-gray-400 text-sm">Married to Kate Savage since 2005. Cal State Northridge theater grad. Still creating amazing work!</p>
          </div>
        </div>
      </div>
    </div>
  )
}

// ==================== ADMIN PAGE ====================
function AdminPage({ isAdmin }) {
  if (!isAdmin) return (
    <div className="py-24 text-center">
      <div className="text-6xl mb-4">🔐</div>
      <h1 className="text-2xl font-black text-gray-400">ACCESS DENIED</h1>
    </div>
  )

  return (
    <div className="py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="bg-green-500/20 border-4 border-green-500/50 p-4 mb-8 text-center">
          <p className="text-green-400 font-black">✅ ADMIN ACCESS GRANTED</p>
        </div>

        <h1 className="text-4xl font-black text-center mb-8 text-yellow-400">⚙️ ADMIN DASHBOARD</h1>

        <div className="space-y-6">
          <div className="bg-gray-900 border-4 border-purple-500/30 p-6">
            <h2 className="font-black text-purple-400 mb-4">💬 FAN ZONE</h2>
            <p className="text-gray-400 mb-2">Go to <strong>FAN ZONE</strong> to reply, delete, and ban users.</p>
          </div>

          <div className="bg-gray-900 border-4 border-yellow-500/30 p-6">
            <h2 className="font-black text-yellow-400 mb-4">📅 EVENTS</h2>
            <p className="text-gray-400 mb-2">Edit <code className="bg-black px-2">public/data/events.json</code> on GitHub.</p>
          </div>

          <div className="bg-gray-900 border-4 border-green-500/30 p-6">
            <h2 className="font-black text-green-400 mb-4">✉️ EMAILS</h2>
            <p className="text-gray-400">Subscribers send to: <span className="text-red-400">{JOE_EMAIL}</span></p>
          </div>

          <div className="bg-gray-900 border-4 border-red-500/30 p-6">
            <h2 className="font-black text-red-400 mb-4">🔐 CREDENTIALS</h2>
            <p className="text-gray-400 mb-2">Set in Vercel Environment Variables:</p>
            <code className="block bg-black p-2 text-sm">VITE_ADMIN_USER / VITE_ADMIN_PASS</code>
          </div>
        </div>
      </div>
    </div>
  )
}

// ==================== GAME PAGE ====================
function GamePage() {
  const [gameState, setGameState] = useState('menu') // menu, playing, gameover
  const [score, setScore] = useState(0)
  const [highScore, setHighScore] = useState(() => {
    return parseInt(localStorage.getItem('joewhyte_highscore') || '0')
  })

  useEffect(() => {
    if (score > highScore) {
      setHighScore(score)
      localStorage.setItem('joewhyte_highscore', score.toString())
    }
  }, [score, highScore])

  const startGame = () => {
    setScore(0)
    setGameState('playing')
  }

  const endGame = (finalScore) => {
    setScore(finalScore)
    setGameState('gameover')
  }

  return (
    <div className="py-8 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-6xl font-black mb-2">
            <span className="text-red-500">RESIDENT</span> <span className="text-green-500">EVIL</span>
          </h1>
          <h2 className="text-2xl md:text-3xl font-black text-yellow-400">JOE'S ESCAPE</h2>
          <p className="text-gray-400 mt-2">Help Joe escape the zombie-infested mansion!</p>
        </div>

        {/* Game Container */}
        <div className="relative bg-black border-4 border-red-600 rounded-lg overflow-hidden" style={{ aspectRatio: '16/9', maxHeight: '500px' }}>
          {gameState === 'menu' && (
            <GameMenu onStart={startGame} highScore={highScore} />
          )}
          
          {gameState === 'playing' && (
            <GameCanvas onGameOver={endGame} />
          )}
          
          {gameState === 'gameover' && (
            <GameOver score={score} highScore={highScore} onRestart={startGame} />
          )}
        </div>

        {/* Controls */}
        <div className="mt-6 bg-gray-900 border-4 border-gray-800 p-6">
          <h3 className="font-black text-yellow-400 mb-4">🎮 CONTROLS</h3>
          <div className="grid md:grid-cols-2 gap-4 text-sm">
            <div className="flex items-center gap-3">
              <span className="bg-gray-800 px-3 py-2 font-mono font-bold">SPACE</span>
              <span className="text-gray-400">Jump</span>
            </div>
            <div className="flex items-center gap-3">
              <span className="bg-gray-800 px-3 py-2 font-mono font-bold">↑</span>
              <span className="text-gray-400">Jump</span>
            </div>
            <div className="flex items-center gap-3">
              <span className="bg-gray-800 px-3 py-2 font-mono font-bold">↓</span>
              <span className="text-gray-400">Duck / Fast Fall</span>
            </div>
            <div className="flex items-center gap-3">
              <span className="bg-gray-800 px-3 py-2 font-mono font-bold">TAP</span>
              <span className="text-gray-400">Jump (Mobile)</span>
            </div>
          </div>
        </div>

        {/* Leaderboard teaser */}
        <div className="mt-6 text-center">
          <div className="inline-block bg-gradient-to-r from-yellow-500/20 to-red-500/20 border-2 border-yellow-500/50 px-6 py-4">
            <p className="text-yellow-400 font-bold">🏆 YOUR HIGH SCORE: {highScore.toLocaleString()}</p>
          </div>
        </div>
      </div>
    </div>
  )
}

// Game Menu Screen
function GameMenu({ onStart, highScore }) {
  return (
    <div className="absolute inset-0 flex flex-col items-center justify-center bg-gradient-to-b from-gray-900 via-black to-red-900/50">
      {/* Animated background */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute text-4xl animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 2}s`,
              opacity: 0.1
            }}
          >
            🧟
          </div>
        ))}
      </div>
      
      <div className="relative z-10 text-center">
        {/* Joe Character */}
        <div className="text-8xl mb-6 animate-bounce">🏃</div>
        
        <h2 className="text-3xl font-black text-red-500 mb-2" style={{ textShadow: '0 0 20px rgba(220,38,38,0.5)' }}>
          JOE'S ESCAPE
        </h2>
        <p className="text-gray-400 mb-8">Survive the zombie horde!</p>
        
        <button
          onClick={onStart}
          className="px-12 py-4 bg-red-600 hover:bg-red-500 font-black text-2xl tracking-wider transform hover:scale-110 transition-all border-b-4 border-red-800 hover:border-red-600"
        >
          ▶ START
        </button>
        
        {highScore > 0 && (
          <p className="mt-6 text-yellow-400 font-bold">🏆 Best: {highScore.toLocaleString()}</p>
        )}
        
        <p className="mt-8 text-gray-500 text-sm">Press SPACE or TAP to start</p>
      </div>
    </div>
  )
}

// Game Over Screen
function GameOver({ score, highScore, onRestart }) {
  const isNewRecord = score >= highScore && score > 0
  
  return (
    <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/90">
      {/* Blood splatter effect */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-0 left-1/4 w-32 h-32 bg-red-600 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/3 w-24 h-24 bg-red-600 rounded-full blur-2xl" />
      </div>
      
      <div className="relative z-10 text-center">
        <div className="text-6xl mb-4">💀</div>
        
        <h2 className="text-4xl font-black text-red-500 mb-4" style={{ textShadow: '0 0 20px rgba(220,38,38,0.8)' }}>
          GAME OVER
        </h2>
        
        {isNewRecord && (
          <div className="mb-4 px-6 py-2 bg-yellow-500 text-black font-black text-xl animate-pulse">
            🎉 NEW HIGH SCORE! 🎉
          </div>
        )}
        
        <div className="mb-8">
          <p className="text-5xl font-black text-white mb-2">{score.toLocaleString()}</p>
          <p className="text-gray-400">ZOMBIES ESCAPED</p>
        </div>
        
        <button
          onClick={onRestart}
          className="px-12 py-4 bg-green-600 hover:bg-green-500 font-black text-xl tracking-wider transform hover:scale-110 transition-all border-b-4 border-green-800"
        >
          🔄 TRY AGAIN
        </button>
        
        <p className="mt-6 text-gray-500 text-sm">Press SPACE to restart</p>
      </div>
    </div>
  )
}

// Main Game Canvas
function GameCanvas({ onGameOver }) {
  const canvasRef = useRef(null)
  const gameRef = useRef(null)
  
  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    
    // Set canvas size
    const resize = () => {
      const container = canvas.parentElement
      canvas.width = container.clientWidth
      canvas.height = container.clientHeight
    }
    resize()
    window.addEventListener('resize', resize)
    
    // Game state
    const game = {
      running: true,
      score: 0,
      speed: 6,
      gravity: 0.6,
      groundY: canvas.height - 60,
      
      // Player
      player: {
        x: 80,
        y: canvas.height - 60 - 60,
        width: 40,
        height: 60,
        velocityY: 0,
        jumping: false,
        ducking: false,
        frame: 0,
        frameTimer: 0
      },
      
      // Obstacles
      obstacles: [],
      obstacleTimer: 0,
      
      // Particles (explosions, dust)
      particles: [],
      
      // Background layers
      bgOffset: 0,
      clouds: [],
      fires: []
    }
    
    gameRef.current = game
    
    // Initialize clouds
    for (let i = 0; i < 5; i++) {
      game.clouds.push({
        x: Math.random() * canvas.width,
        y: Math.random() * 150 + 20,
        size: Math.random() * 40 + 20,
        speed: Math.random() * 0.5 + 0.2
      })
    }
    
    // Initialize fires
    for (let i = 0; i < 8; i++) {
      game.fires.push({
        x: Math.random() * canvas.width,
        y: Math.random() * 100 + 50,
        size: Math.random() * 30 + 10,
        flicker: 0
      })
    }
    
    // Input handling
    const handleKeyDown = (e) => {
      if (e.code === 'Space' || e.code === 'ArrowUp') {
        e.preventDefault()
        jump()
      }
      if (e.code === 'ArrowDown') {
        e.preventDefault()
        game.player.ducking = true
        if (game.player.jumping) {
          game.player.velocityY = 15 // Fast fall
        }
      }
    }
    
    const handleKeyUp = (e) => {
      if (e.code === 'ArrowDown') {
        game.player.ducking = false
      }
    }
    
    const handleTouch = (e) => {
      e.preventDefault()
      jump()
    }
    
    const jump = () => {
      if (!game.player.jumping) {
        game.player.velocityY = -14
        game.player.jumping = true
        addDustParticles(game.player.x + 20, game.groundY)
      }
    }
    
    window.addEventListener('keydown', handleKeyDown)
    window.addEventListener('keyup', handleKeyUp)
    canvas.addEventListener('touchstart', handleTouch)
    canvas.addEventListener('click', jump)
    
    // Add particles
    const addDustParticles = (x, y) => {
      for (let i = 0; i < 5; i++) {
        game.particles.push({
          x, y,
          vx: (Math.random() - 0.5) * 4,
          vy: -Math.random() * 3,
          size: Math.random() * 8 + 4,
          life: 1,
          color: '#8B4513'
        })
      }
    }
    
    const addExplosion = (x, y) => {
      const colors = ['#ff4400', '#ff8800', '#ffcc00', '#ff0000']
      for (let i = 0; i < 20; i++) {
        const angle = (Math.PI * 2 / 20) * i
        const speed = Math.random() * 8 + 4
        game.particles.push({
          x, y,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          size: Math.random() * 12 + 6,
          life: 1,
          color: colors[Math.floor(Math.random() * colors.length)]
        })
      }
    }
    
    // Spawn obstacle
    const spawnObstacle = () => {
      const types = [
        { type: 'zombie', emoji: '🧟', width: 40, height: 60, ground: true },
        { type: 'dog', emoji: '🐕', width: 50, height: 35, ground: true },
        { type: 'barrel', emoji: '🛢️', width: 35, height: 45, ground: true },
        { type: 'bat', emoji: '🦇', width: 35, height: 25, ground: false, y: game.groundY - 100 },
        { type: 'crate', emoji: '📦', width: 40, height: 40, ground: true },
      ]
      
      const type = types[Math.floor(Math.random() * types.length)]
      
      game.obstacles.push({
        ...type,
        x: canvas.width + 50,
        y: type.ground ? game.groundY - type.height : type.y,
        passed: false
      })
    }
    
    // Game loop
    const gameLoop = () => {
      if (!game.running) return
      
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      
      // Draw background
      drawBackground(ctx, canvas, game)
      
      // Update and draw player
      updatePlayer(game, canvas)
      drawPlayer(ctx, game)
      
      // Update and draw obstacles
      game.obstacleTimer++
      const spawnRate = Math.max(60, 120 - Math.floor(game.score / 10))
      if (game.obstacleTimer > spawnRate) {
        spawnObstacle()
        game.obstacleTimer = 0
      }
      
      for (let i = game.obstacles.length - 1; i >= 0; i--) {
        const obs = game.obstacles[i]
        obs.x -= game.speed
        
        // Draw obstacle
        ctx.font = `${obs.height}px Arial`
        ctx.fillText(obs.emoji, obs.x, obs.y + obs.height - 5)
        
        // Check collision
        const p = game.player
        const hitboxShrink = 10
        if (
          p.x + hitboxShrink < obs.x + obs.width &&
          p.x + p.width - hitboxShrink > obs.x &&
          p.y + hitboxShrink < obs.y + obs.height &&
          p.y + p.height - hitboxShrink > obs.y
        ) {
          addExplosion(p.x + p.width / 2, p.y + p.height / 2)
          game.running = false
          setTimeout(() => onGameOver(game.score), 500)
        }
        
        // Score point when passed
        if (!obs.passed && obs.x + obs.width < p.x) {
          obs.passed = true
          game.score++
          // Speed up
          if (game.score % 10 === 0) {
            game.speed = Math.min(15, game.speed + 0.5)
          }
        }
        
        // Remove off-screen
        if (obs.x < -100) {
          game.obstacles.splice(i, 1)
        }
      }
      
      // Update and draw particles
      for (let i = game.particles.length - 1; i >= 0; i--) {
        const p = game.particles[i]
        p.x += p.vx
        p.y += p.vy
        p.vy += 0.2
        p.life -= 0.03
        
        if (p.life <= 0) {
          game.particles.splice(i, 1)
        } else {
          ctx.globalAlpha = p.life
          ctx.fillStyle = p.color
          ctx.beginPath()
          ctx.arc(p.x, p.y, p.size * p.life, 0, Math.PI * 2)
          ctx.fill()
          ctx.globalAlpha = 1
        }
      }
      
      // Draw ground
      ctx.fillStyle = '#2d1b0e'
      ctx.fillRect(0, game.groundY, canvas.width, 60)
      ctx.fillStyle = '#1a0f08'
      for (let i = 0; i < canvas.width; i += 30) {
        ctx.fillRect(i - (game.bgOffset % 30), game.groundY, 2, 60)
      }
      
      // Draw score
      ctx.fillStyle = '#fff'
      ctx.font = 'bold 24px Arial'
      ctx.fillText(`SCORE: ${game.score}`, 20, 40)
      
      // Draw speed indicator
      ctx.fillStyle = '#ff4444'
      ctx.font = '14px Arial'
      ctx.fillText(`SPEED: ${game.speed.toFixed(1)}x`, 20, 65)
      
      game.bgOffset += game.speed
      
      requestAnimationFrame(gameLoop)
    }
    
    const updatePlayer = (game, canvas) => {
      const p = game.player
      
      // Apply gravity
      p.velocityY += game.gravity
      p.y += p.velocityY
      
      // Ground collision
      const groundLevel = game.groundY - (p.ducking ? 30 : 60)
      if (p.y >= groundLevel) {
        p.y = groundLevel
        p.velocityY = 0
        p.jumping = false
      }
      
      // Update height when ducking
      p.height = p.ducking ? 30 : 60
      
      // Animation frame
      p.frameTimer++
      if (p.frameTimer > 8) {
        p.frame = (p.frame + 1) % 2
        p.frameTimer = 0
      }
    }
    
    const drawPlayer = (ctx, game) => {
      const p = game.player
      
      // Draw Joe
      ctx.save()
      
      // Body
      const bodyColor = '#1e40af' // Blue outfit
      const skinColor = '#f4c7a0'
      
      if (p.ducking) {
        // Ducking pose - crouched
        ctx.fillStyle = bodyColor
        ctx.fillRect(p.x, p.y + 10, 40, 20)
        ctx.fillStyle = skinColor
        ctx.beginPath()
        ctx.arc(p.x + 30, p.y + 10, 12, 0, Math.PI * 2)
        ctx.fill()
      } else {
        // Running pose
        ctx.fillStyle = bodyColor
        ctx.fillRect(p.x + 10, p.y + 20, 20, 30)
        
        // Legs (animated)
        const legOffset = p.jumping ? 0 : Math.sin(p.frame * Math.PI) * 10
        ctx.fillRect(p.x + 10, p.y + 45, 8, 15 + legOffset)
        ctx.fillRect(p.x + 22, p.y + 45, 8, 15 - legOffset)
        
        // Head
        ctx.fillStyle = skinColor
        ctx.beginPath()
        ctx.arc(p.x + 20, p.y + 12, 12, 0, Math.PI * 2)
        ctx.fill()
        
        // Hair
        ctx.fillStyle = '#3d2314'
        ctx.beginPath()
        ctx.arc(p.x + 20, p.y + 8, 10, Math.PI, Math.PI * 2)
        ctx.fill()
        
        // Arms
        ctx.fillStyle = skinColor
        if (p.jumping) {
          ctx.fillRect(p.x, p.y + 22, 12, 6)
          ctx.fillRect(p.x + 28, p.y + 22, 12, 6)
        } else {
          const armSwing = Math.sin(p.frame * Math.PI) * 8
          ctx.save()
          ctx.translate(p.x + 8, p.y + 25)
          ctx.rotate(armSwing * 0.1)
          ctx.fillRect(-4, 0, 6, 15)
          ctx.restore()
          ctx.save()
          ctx.translate(p.x + 32, p.y + 25)
          ctx.rotate(-armSwing * 0.1)
          ctx.fillRect(-2, 0, 6, 15)
          ctx.restore()
        }
      }
      
      ctx.restore()
    }
    
    const drawBackground = (ctx, canvas, game) => {
      // Night sky gradient
      const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height)
      gradient.addColorStop(0, '#0a0a15')
      gradient.addColorStop(0.5, '#1a0505')
      gradient.addColorStop(1, '#2d0a0a')
      ctx.fillStyle = gradient
      ctx.fillRect(0, 0, canvas.width, canvas.height)
      
      // Moon
      ctx.fillStyle = '#fff8e7'
      ctx.globalAlpha = 0.8
      ctx.beginPath()
      ctx.arc(canvas.width - 80, 60, 35, 0, Math.PI * 2)
      ctx.fill()
      ctx.globalAlpha = 1
      
      // Clouds (smoke)
      ctx.fillStyle = '#333'
      game.clouds.forEach(cloud => {
        cloud.x -= cloud.speed
        if (cloud.x < -50) cloud.x = canvas.width + 50
        
        ctx.globalAlpha = 0.3
        ctx.beginPath()
        ctx.arc(cloud.x, cloud.y, cloud.size, 0, Math.PI * 2)
        ctx.arc(cloud.x + cloud.size * 0.6, cloud.y - 5, cloud.size * 0.7, 0, Math.PI * 2)
        ctx.arc(cloud.x - cloud.size * 0.4, cloud.y + 5, cloud.size * 0.5, 0, Math.PI * 2)
        ctx.fill()
        ctx.globalAlpha = 1
      })
      
      // Burning mansion silhouette
      ctx.fillStyle = '#0a0505'
      // Main building
      ctx.fillRect(canvas.width - 350 - (game.bgOffset * 0.1) % 100, game.groundY - 180, 200, 180)
      // Tower
      ctx.fillRect(canvas.width - 300 - (game.bgOffset * 0.1) % 100, game.groundY - 250, 60, 70)
      // Roof
      ctx.beginPath()
      ctx.moveTo(canvas.width - 360 - (game.bgOffset * 0.1) % 100, game.groundY - 180)
      ctx.lineTo(canvas.width - 250 - (game.bgOffset * 0.1) % 100, game.groundY - 220)
      ctx.lineTo(canvas.width - 140 - (game.bgOffset * 0.1) % 100, game.groundY - 180)
      ctx.fill()
      
      // Fires on building
      game.fires.forEach(fire => {
        fire.flicker += 0.2
        const flicker = Math.sin(fire.flicker) * 5
        
        const fireGradient = ctx.createRadialGradient(
          fire.x - (game.bgOffset * 0.1) % 200, game.groundY - fire.y,
          0,
          fire.x - (game.bgOffset * 0.1) % 200, game.groundY - fire.y,
          fire.size + flicker
        )
        fireGradient.addColorStop(0, 'rgba(255, 200, 50, 0.8)')
        fireGradient.addColorStop(0.5, 'rgba(255, 100, 0, 0.5)')
        fireGradient.addColorStop(1, 'rgba(255, 0, 0, 0)')
        
        ctx.fillStyle = fireGradient
        ctx.beginPath()
        ctx.arc(fire.x - (game.bgOffset * 0.1) % 200, game.groundY - fire.y, fire.size + flicker, 0, Math.PI * 2)
        ctx.fill()
      })
      
      // Trees silhouette
      for (let i = 0; i < 5; i++) {
        const tx = (i * 200 - (game.bgOffset * 0.3) % 200) % (canvas.width + 100) - 50
        ctx.fillStyle = '#050505'
        ctx.beginPath()
        ctx.moveTo(tx, game.groundY)
        ctx.lineTo(tx + 15, game.groundY - 80)
        ctx.lineTo(tx + 30, game.groundY)
        ctx.fill()
        ctx.fillRect(tx + 12, game.groundY - 20, 6, 20)
      }
    }
    
    gameLoop()
    
    return () => {
      game.running = false
      window.removeEventListener('resize', resize)
      window.removeEventListener('keydown', handleKeyDown)
      window.removeEventListener('keyup', handleKeyUp)
      canvas.removeEventListener('touchstart', handleTouch)
      canvas.removeEventListener('click', jump)
    }
  }, [onGameOver])
  
  return (
    <canvas 
      ref={canvasRef} 
      className="w-full h-full cursor-pointer"
      style={{ touchAction: 'none' }}
    />
  )
}
