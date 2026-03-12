import { useState, useEffect } from 'react'

// ==================== CONFIG ====================
const JOE_EMAIL = "joe@whytenoise.com"
const ADMIN_USER = import.meta.env.VITE_ADMIN_USER || "admin"
const ADMIN_PASS = import.meta.env.VITE_ADMIN_PASS || "joewhyte2026"

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
    home: <HomePage />,
    achievements: <AchievementsPage />,
    messageboard: <MessageBoardPage isAdmin={isAdmin} />,
    about: <AboutPage />,
    admin: <AdminPage isAdmin={isAdmin} />,
  }

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      {/* Animated Background */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-pink-500/20 rounded-full blur-3xl animate-pulse-glow" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-cyan-500/20 rounded-full blur-3xl animate-pulse-glow" style={{ animationDelay: '2s' }} />
      </div>

      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-slate-950/90 backdrop-blur-lg border-b border-pink-500/30">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <button 
              onClick={() => setCurrentPage('home')}
              className="text-xl font-black bg-gradient-to-r from-pink-500 to-cyan-400 bg-clip-text text-transparent hover:scale-105 transition-transform"
            >
              JOE WHYTE FAN ZONE
            </button>
            
            {/* Desktop Nav */}
            <div className="hidden md:flex items-center gap-1">
              {[
                { id: 'home', label: '🏠 Home' },
                { id: 'achievements', label: '🏆 Achievements' },
                { id: 'messageboard', label: '💬 Fan Board' },
                { id: 'about', label: '👤 About' },
              ].map(item => (
                <button
                  key={item.id}
                  onClick={() => setCurrentPage(item.id)}
                  className={`px-4 py-2 rounded-full text-sm font-semibold transition-all ${
                    currentPage === item.id
                      ? 'bg-gradient-to-r from-pink-500 to-cyan-500 text-white shadow-lg'
                      : 'text-gray-300 hover:text-white hover:bg-white/10'
                  }`}
                >
                  {item.label}
                </button>
              ))}
              
              {/* Admin Button */}
              {isAdmin ? (
                <button
                  onClick={() => setCurrentPage('admin')}
                  className={`px-4 py-2 rounded-full text-sm font-semibold transition-all ${
                    currentPage === 'admin'
                      ? 'bg-gradient-to-r from-yellow-500 to-orange-500 text-black'
                      : 'bg-yellow-500/20 text-yellow-400 hover:bg-yellow-500/30'
                  }`}
                >
                  ⚙️ Admin
                </button>
              ) : (
                <button
                  onClick={() => setShowLoginModal(true)}
                  className="px-3 py-2 text-gray-500 hover:text-gray-300 text-sm"
                  title="Admin Login"
                >
                  🔐
                </button>
              )}
            </div>

            {/* Mobile Menu Button */}
            <button 
              className="md:hidden p-2 text-2xl"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? '✕' : '☰'}
            </button>
          </div>

          {/* Mobile Nav */}
          {mobileMenuOpen && (
            <div className="md:hidden pb-4 space-y-2">
              {[
                { id: 'home', label: '🏠 Home' },
                { id: 'achievements', label: '🏆 Achievements' },
                { id: 'messageboard', label: '💬 Fan Board' },
                { id: 'about', label: '👤 About' },
              ].map(item => (
                <button
                  key={item.id}
                  onClick={() => { setCurrentPage(item.id); setMobileMenuOpen(false); }}
                  className={`block w-full text-left px-4 py-3 rounded-lg font-semibold ${
                    currentPage === item.id ? 'bg-gradient-to-r from-pink-500 to-cyan-500' : 'bg-white/5'
                  }`}
                >
                  {item.label}
                </button>
              ))}
              {isAdmin && (
                <button
                  onClick={() => { setCurrentPage('admin'); setMobileMenuOpen(false); }}
                  className="block w-full text-left px-4 py-3 rounded-lg font-semibold bg-yellow-500/20 text-yellow-400"
                >
                  ⚙️ Admin Dashboard
                </button>
              )}
              {!isAdmin && (
                <button
                  onClick={() => { setShowLoginModal(true); setMobileMenuOpen(false); }}
                  className="block w-full text-left px-4 py-3 rounded-lg font-semibold bg-white/5 text-gray-400"
                >
                  🔐 Admin Login
                </button>
              )}
            </div>
          )}
        </div>
      </nav>

      {/* Admin Login Modal */}
      {showLoginModal && (
        <LoginModal 
          onClose={() => setShowLoginModal(false)}
          onLogin={() => {
            setIsAdmin(true)
            setShowLoginModal(false)
            setCurrentPage('admin')
          }}
        />
      )}

      {/* Page Content */}
      <main className="relative z-10">
        {pages[currentPage]}
      </main>

      {/* Footer */}
      <footer className="relative z-10 border-t border-pink-500/30 mt-16 py-8 text-center">
        <p className="text-xl mb-4">Made with 💖 by proud fans!</p>
        <div className="flex justify-center gap-4 flex-wrap px-4">
          <a href="https://www.imdb.com/name/nm0926679/" target="_blank" rel="noreferrer" className="px-4 py-2 bg-yellow-500/20 border border-yellow-500 rounded-full hover:bg-yellow-500/40 transition-all text-sm">📽️ IMDb</a>
          <a href="https://en.wikipedia.org/wiki/Joe_Whyte" target="_blank" rel="noreferrer" className="px-4 py-2 bg-blue-500/20 border border-blue-500 rounded-full hover:bg-blue-500/40 transition-all text-sm">📚 Wikipedia</a>
          <a href="https://www.whytenoise.com/" target="_blank" rel="noreferrer" className="px-4 py-2 bg-green-500/20 border border-green-500 rounded-full hover:bg-green-500/40 transition-all text-sm">🎨 WhyteNoise</a>
        </div>
        <p className="text-gray-500 text-sm mt-6">© {new Date().getFullYear()} Joe Whyte Fan Club</p>
        {isAdmin ? (
          <button 
            onClick={() => { setIsAdmin(false); setCurrentPage('home'); }}
            className="text-red-400 hover:text-red-300 text-xs mt-2"
          >
            Logout
          </button>
        ) : (
          <button 
            onClick={() => setShowLoginModal(true)}
            className="text-gray-600 hover:text-gray-400 text-xs mt-2"
          >
            Admin Login
          </button>
        )}
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
    <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4" onClick={onClose}>
      <div 
        className="bg-slate-900 rounded-2xl p-8 max-w-md w-full border border-yellow-500/30" 
        onClick={e => e.stopPropagation()}
      >
        <h2 className="text-2xl font-bold mb-6 text-yellow-400">🔐 Admin Login</h2>
        
        <div className="space-y-4">
          <div>
            <label className="block text-sm text-gray-400 mb-1">Username</label>
            <input
              type="text"
              value={username}
              onChange={e => setUsername(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && handleLogin()}
              placeholder="Enter username"
              className={`w-full bg-slate-800 border rounded-lg px-4 py-3 focus:outline-none ${
                error ? 'border-red-500' : 'border-slate-700 focus:border-yellow-500'
              }`}
              autoFocus
            />
          </div>
          
          <div>
            <label className="block text-sm text-gray-400 mb-1">Password</label>
            <input
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && handleLogin()}
              placeholder="Enter password"
              className={`w-full bg-slate-800 border rounded-lg px-4 py-3 focus:outline-none ${
                error ? 'border-red-500' : 'border-slate-700 focus:border-yellow-500'
              }`}
            />
          </div>
        </div>

        {error && <p className="text-red-400 text-sm mt-4">Invalid username or password</p>}
        
        <div className="flex gap-3 mt-6">
          <button 
            onClick={onClose} 
            className="flex-1 px-4 py-3 bg-slate-700 rounded-lg hover:bg-slate-600 transition-colors"
          >
            Cancel
          </button>
          <button 
            onClick={handleLogin} 
            className="flex-1 px-4 py-3 bg-yellow-500 text-black font-bold rounded-lg hover:bg-yellow-400 transition-colors"
          >
            Login
          </button>
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

  useEffect(() => {
    loadMessages()
    loadLocalData()
  }, [])

  const loadLocalData = () => {
    try {
      const deleted = JSON.parse(localStorage.getItem(DELETED_MESSAGES_KEY) || '[]')
      const replies = JSON.parse(localStorage.getItem(ADMIN_REPLIES_KEY) || '{}')
      const banned = JSON.parse(localStorage.getItem(BANNED_USERS_KEY) || '[]')
      const pending = JSON.parse(localStorage.getItem(PENDING_MESSAGES_KEY) || '[]')
      setDeletedIds(deleted)
      setAdminReplies(replies)
      setBannedUsers(banned)
      setPendingMessages(pending)
    } catch (e) {
      console.error('Error loading local data:', e)
    }
  }

  const loadMessages = async () => {
    try {
      const response = await fetch('/data/messages.json')
      const data = await response.json()
      setMessages(data.messages || [])
    } catch (e) {
      console.error('Error loading messages:', e)
    }
    setLoading(false)
  }

  const handleSubmit = () => {
    if (!newMessage.name.trim() || !newMessage.message.trim()) {
      alert('Please enter your name and message!')
      return
    }

    if (bannedUsers.includes(newMessage.name.toLowerCase())) {
      alert('This username has been banned from posting.')
      return
    }

    setSubmitting(true)

    const pendingMsg = {
      id: Date.now(),
      name: newMessage.name.trim(),
      message: newMessage.message.trim(),
      date: new Date().toISOString().split('T')[0],
      pending: true
    }

    // Save to pending messages
    const updatedPending = [...pendingMessages, pendingMsg]
    setPendingMessages(updatedPending)
    localStorage.setItem(PENDING_MESSAGES_KEY, JSON.stringify(updatedPending))

    // Email notification to Joe
    const subject = encodeURIComponent('New Fan Message on Joe Whyte Fan Zone!')
    const body = encodeURIComponent(
      `New message from a fan!\n\nFrom: ${pendingMsg.name}\nDate: ${pendingMsg.date}\n\nMessage:\n${pendingMsg.message}\n\n---\nTo approve this message, add it to public/data/messages.json in your GitHub repo.`
    )
    
    window.open(`mailto:${JOE_EMAIL}?subject=${subject}&body=${body}`, '_blank')

    alert('Message submitted! Joe will review it soon. Your email app should open to notify him.')
    setNewMessage({ name: '', message: '' })
    setSubmitting(false)
  }

  const handleDelete = (id, isPending = false) => {
    if (!confirm('Delete this message?')) return

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
    if (!confirm(`Ban user "${username}" from posting?`)) return
    
    const updated = [...bannedUsers, username.toLowerCase()]
    setBannedUsers(updated)
    localStorage.setItem(BANNED_USERS_KEY, JSON.stringify(updated))
    alert(`${username} has been banned.`)
  }

  const handleUnban = (username) => {
    const updated = bannedUsers.filter(u => u !== username.toLowerCase())
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
    alert('Reply added! Remember to also update messages.json on GitHub for permanent storage.')
  }

  // Combine and filter messages
  const allMessages = [
    ...messages.filter(m => !deletedIds.includes(m.id)),
    ...pendingMessages
  ].sort((a, b) => new Date(b.date) - new Date(a.date))

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <h1 className="text-4xl md:text-5xl font-black text-center mb-4 bg-gradient-to-r from-cyan-400 to-pink-500 bg-clip-text text-transparent">
        💬 Fan Message Board
      </h1>
      <p className="text-center text-gray-400 mb-8">Share your love for Joe with fellow fans!</p>

      {/* Admin Notice */}
      {isAdmin && (
        <div className="bg-yellow-500/20 border border-yellow-500/50 rounded-lg p-4 mb-6">
          <p className="text-yellow-400 text-sm">
            <strong>Admin Mode:</strong> You can reply to, delete, or ban users. Local changes are stored in your browser. 
            For permanent changes, update <code className="bg-slate-800 px-1 rounded">messages.json</code> on GitHub.
          </p>
        </div>
      )}

      {/* Banned Users (Admin Only) */}
      {isAdmin && bannedUsers.length > 0 && (
        <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-4 mb-6">
          <h3 className="text-red-400 font-semibold mb-2">🚫 Banned Users</h3>
          <div className="flex flex-wrap gap-2">
            {bannedUsers.map(user => (
              <span key={user} className="flex items-center gap-2 bg-red-500/20 px-3 py-1 rounded-full text-sm">
                {user}
                <button onClick={() => handleUnban(user)} className="text-red-400 hover:text-red-300">✕</button>
              </span>
            ))}
          </div>
        </div>
      )}

      {/* New Message Form */}
      <div className="bg-slate-900 rounded-xl p-6 border border-pink-500/30 mb-8">
        <h3 className="text-lg font-bold text-pink-400 mb-4">✍️ Leave a Message for Joe</h3>
        
        <div className="space-y-4">
          <input
            type="text"
            value={newMessage.name}
            onChange={e => setNewMessage({ ...newMessage, name: e.target.value })}
            placeholder="Your name or nickname"
            className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-3 focus:border-pink-500 focus:outline-none"
          />
          <textarea
            value={newMessage.message}
            onChange={e => setNewMessage({ ...newMessage, message: e.target.value })}
            placeholder="Write your message to Joe..."
            rows={4}
            className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-3 focus:border-pink-500 focus:outline-none resize-none"
          />
          <button
            onClick={handleSubmit}
            disabled={submitting}
            className="w-full py-3 bg-gradient-to-r from-pink-500 to-cyan-500 rounded-lg font-bold hover:opacity-90 transition-opacity disabled:opacity-50"
          >
            {submitting ? 'Submitting...' : 'Send Message 🚀'}
          </button>
        </div>
        <p className="text-gray-500 text-xs mt-3 text-center">
          Messages are reviewed before posting. Be respectful and have fun!
        </p>
      </div>

      {/* Messages List */}
      {loading ? (
        <div className="text-center py-12">
          <div className="text-4xl animate-pulse">💬</div>
          <p className="text-gray-400 mt-2">Loading messages...</p>
        </div>
      ) : allMessages.length === 0 ? (
        <div className="text-center py-12 bg-slate-900/50 rounded-xl">
          <p className="text-gray-400">No messages yet. Be the first to leave one!</p>
        </div>
      ) : (
        <div className="space-y-6">
          {allMessages.map(msg => (
            <div 
              key={msg.id} 
              className={`bg-slate-900 rounded-xl p-6 border ${msg.pending ? 'border-yellow-500/50' : 'border-slate-700'}`}
            >
              {/* Pending Badge */}
              {msg.pending && (
                <div className="inline-block bg-yellow-500/20 text-yellow-400 text-xs px-2 py-1 rounded mb-3">
                  ⏳ Pending Review
                </div>
              )}

              {/* Message Header */}
              <div className="flex items-start justify-between gap-4 mb-3">
                <div>
                  <span className="font-bold text-cyan-400">{msg.name}</span>
                  <span className="text-gray-500 text-sm ml-2">{msg.date}</span>
                </div>
                
                {/* Admin Actions */}
                {isAdmin && (
                  <div className="flex gap-2 flex-shrink-0">
                    {!msg.pending && !msg.adminReply && !adminReplies[msg.id] && (
                      <button
                        onClick={() => setShowReplyModal(msg.id)}
                        className="text-xs px-3 py-1 bg-green-500/20 text-green-400 rounded-full hover:bg-green-500/30"
                      >
                        Reply
                      </button>
                    )}
                    <button
                      onClick={() => handleBan(msg.name)}
                      className="text-xs px-3 py-1 bg-orange-500/20 text-orange-400 rounded-full hover:bg-orange-500/30"
                    >
                      Ban
                    </button>
                    <button
                      onClick={() => handleDelete(msg.id, msg.pending)}
                      className="text-xs px-3 py-1 bg-red-500/20 text-red-400 rounded-full hover:bg-red-500/30"
                    >
                      Delete
                    </button>
                  </div>
                )}
              </div>

              {/* Message Content */}
              <p className="text-gray-200 leading-relaxed">{msg.message}</p>

              {/* Admin Reply (from JSON) */}
              {msg.adminReply && (
                <div className="mt-4 pl-4 border-l-2 border-pink-500">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-pink-400 font-bold text-sm">🎤 Joe Whyte</span>
                    <span className="text-gray-500 text-xs">{msg.replyDate}</span>
                  </div>
                  <p className="text-gray-300 text-sm">{msg.adminReply}</p>
                </div>
              )}

              {/* Admin Reply (from localStorage) */}
              {adminReplies[msg.id] && !msg.adminReply && (
                <div className="mt-4 pl-4 border-l-2 border-yellow-500">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-yellow-400 font-bold text-sm">🎤 Joe Whyte</span>
                    <span className="text-gray-500 text-xs">{adminReplies[msg.id].date}</span>
                    <span className="text-yellow-500 text-xs">(Local - add to JSON)</span>
                  </div>
                  <p className="text-gray-300 text-sm">{adminReplies[msg.id].text}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Reply Modal */}
      {showReplyModal && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4" onClick={() => setShowReplyModal(null)}>
          <div className="bg-slate-900 rounded-xl p-6 max-w-lg w-full border border-green-500/30" onClick={e => e.stopPropagation()}>
            <h3 className="text-xl font-bold text-green-400 mb-4">💬 Reply as Joe</h3>
            <textarea
              value={replyText}
              onChange={e => setReplyText(e.target.value)}
              placeholder="Write your reply..."
              rows={4}
              className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-3 mb-4 focus:border-green-500 focus:outline-none resize-none"
              autoFocus
            />
            <div className="flex gap-3">
              <button
                onClick={() => setShowReplyModal(null)}
                className="flex-1 px-4 py-2 bg-slate-700 rounded-lg hover:bg-slate-600"
              >
                Cancel
              </button>
              <button
                onClick={() => handleReply(showReplyModal)}
                className="flex-1 px-4 py-2 bg-green-500 text-black font-bold rounded-lg hover:bg-green-400"
              >
                Post Reply
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

// ==================== HOME PAGE ====================
function HomePage() {
  const [events, setEvents] = useState([])
  const [loading, setLoading] = useState(true)
  const [email, setEmail] = useState('')
  const [name, setName] = useState('')

  useEffect(() => {
    loadEvents()
  }, [])

  const loadEvents = async () => {
    try {
      const response = await fetch('/data/events.json')
      const data = await response.json()
      const upcoming = data.events
        .filter(e => new Date(e.date) >= new Date())
        .sort((a, b) => new Date(a.date) - new Date(b.date))
      setEvents(upcoming)
    } catch (e) {
      console.error('Error loading events:', e)
    }
    setLoading(false)
  }

  const handleSubscribe = () => {
    if (!email.trim() || !email.includes('@')) {
      alert('Please enter a valid email!')
      return
    }

    const subject = encodeURIComponent('New Fan Site Subscriber!')
    const body = encodeURIComponent(
      `New subscriber from the fan site!\n\nName: ${name || 'Not provided'}\nEmail: ${email}\n\nSubscribed on: ${new Date().toLocaleString()}`
    )
    
    window.location.href = `mailto:${JOE_EMAIL}?subject=${subject}&body=${body}`
    
    alert('Thanks for subscribing! Your email app should open to send the subscription.')
    setEmail('')
    setName('')
  }

  const formatDate = (dateStr) => {
    const date = new Date(dateStr)
    return {
      month: date.toLocaleDateString('en-US', { month: 'short' }).toUpperCase(),
      day: date.getDate(),
      weekday: date.toLocaleDateString('en-US', { weekday: 'short' })
    }
  }

  const eventTypeEmoji = {
    convention: '🎪', comedy: '🎤', signing: '✍️',
    panel: '🎬', appearance: '⭐', other: '📅'
  }

  return (
    <div>
      {/* Events Section */}
      <section className="bg-gradient-to-b from-pink-900/30 via-slate-950 to-slate-950 pt-8 pb-16">
        <div className="max-w-5xl mx-auto px-4">
          <div className="text-center mb-8">
            <h1 className="text-4xl md:text-6xl font-black mb-2">
              <span className="bg-gradient-to-r from-pink-400 via-yellow-300 to-cyan-400 bg-clip-text text-transparent">
                SEE JOE LIVE
              </span>
            </h1>
            <p className="text-gray-400 text-lg">Conventions • Comedy Shows • Signings • Panels</p>
          </div>

          <div className="mb-10">
            {loading ? (
              <div className="text-center py-8">
                <div className="text-3xl animate-pulse">🎭</div>
              </div>
            ) : events.length === 0 ? (
              <div className="text-center py-8 bg-slate-900/50 rounded-2xl border border-dashed border-gray-700">
                <p className="text-gray-400">No upcoming events scheduled yet.</p>
                <p className="text-gray-500 text-sm mt-1">Sign up below to be the first to know!</p>
              </div>
            ) : (
              <div className="space-y-4">
                {events.map(event => {
                  const d = formatDate(event.date)
                  return (
                    <div key={event.id} className="bg-slate-900/80 rounded-xl p-4 md:p-6 border border-slate-800 hover:border-pink-500/50 transition-all flex flex-col md:flex-row gap-4 md:items-center">
                      <div className="flex md:flex-col items-center md:items-center gap-3 md:gap-0 md:w-20 md:text-center flex-shrink-0">
                        <div className="bg-pink-500 text-white text-xs font-bold px-2 py-1 rounded md:w-full">{d.month}</div>
                        <div className="text-3xl md:text-4xl font-black text-white">{d.day}</div>
                        <div className="text-gray-500 text-sm">{d.weekday}</div>
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1 flex-wrap">
                          <span className="text-xl">{eventTypeEmoji[event.type] || '📅'}</span>
                          <h3 className="text-lg md:text-xl font-bold text-white">{event.name}</h3>
                        </div>
                        <p className="text-gray-400 text-sm md:text-base">📍 {event.venue}{event.city ? `, ${event.city}` : ''}</p>
                        {event.time && <p className="text-gray-500 text-sm">🕐 {event.time}</p>}
                        {event.description && <p className="text-gray-400 text-sm mt-2">{event.description}</p>}
                      </div>
                      {event.ticketUrl && (
                        <a href={event.ticketUrl} target="_blank" rel="noreferrer" className="inline-block px-6 py-2 bg-gradient-to-r from-pink-500 to-cyan-500 rounded-full font-bold text-sm hover:opacity-90 transition-opacity text-center flex-shrink-0">
                          Get Tickets →
                        </a>
                      )}
                    </div>
                  )
                })}
              </div>
            )}
          </div>

          {/* Email Signup */}
          <div className="bg-gradient-to-r from-pink-500/10 to-cyan-500/10 rounded-2xl p-6 md:p-8 border border-pink-500/30">
            <div className="text-center mb-6">
              <h3 className="text-2xl font-bold mb-2">🔔 Never Miss an Appearance</h3>
              <p className="text-gray-400">Get notified when Joe announces conventions, comedy shows, and signings.</p>
            </div>
            <div className="flex flex-col md:flex-row gap-3 max-w-2xl mx-auto">
              <input type="text" value={name} onChange={e => setName(e.target.value)} placeholder="Your name" className="flex-1 bg-slate-800 border border-slate-700 rounded-lg px-4 py-3 focus:border-pink-500 focus:outline-none" />
              <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="Your email" className="flex-1 bg-slate-800 border border-slate-700 rounded-lg px-4 py-3 focus:border-pink-500 focus:outline-none" />
              <button onClick={handleSubscribe} className="px-8 py-3 bg-gradient-to-r from-pink-500 to-cyan-500 rounded-lg font-bold hover:opacity-90 transition-opacity whitespace-nowrap">Notify Me 🚀</button>
            </div>
            <p className="text-center text-gray-500 text-xs mt-4">We respect your privacy. Unsubscribe anytime.</p>
          </div>
        </div>
      </section>

      {/* Hero Section */}
      <section className="py-16 px-4">
        <div className="max-w-5xl mx-auto text-center">
          <div className="inline-block px-4 py-1 bg-gradient-to-r from-pink-500 to-cyan-500 rounded-full text-sm font-bold mb-6">✨ Official Fan Site ✨</div>
          <h2 className="text-5xl md:text-7xl font-black mb-4">
            <span className="bg-gradient-to-r from-pink-500 via-yellow-400 to-cyan-400 bg-clip-text text-transparent">JOE WHYTE</span>
          </h2>
          <p className="text-xl md:text-2xl text-cyan-300 mb-8">Voice Acting Legend • Disney Animator • Gaming Icon • Comedy King</p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto mt-12">
            {[
              { num: '35+', label: 'Years in Entertainment' },
              { num: '50+', label: 'Voice Credits' },
              { num: '15+', label: 'Disney Films' },
              { num: '∞', label: 'Coolness Level' },
            ].map((stat, i) => (
              <div key={i} className="bg-slate-900/80 border-2 border-slate-700 rounded-2xl p-4 hover:scale-105 transition-transform hover:border-pink-500/50">
                <div className="text-3xl font-black">{stat.num}</div>
                <div className="text-xs text-gray-400 mt-1">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Roles */}
      <section className="max-w-5xl mx-auto px-4 py-12">
        <h2 className="text-3xl font-black text-center mb-8 bg-gradient-to-r from-pink-500 to-cyan-400 bg-clip-text text-transparent">🌟 Iconic Roles 🌟</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { emoji: '🧟', title: 'Chris Redfield', project: 'Resident Evil Remake', desc: 'THE iconic voice of S.T.A.R.S. finest!' },
            { emoji: '🦸', title: 'Mermaid Man', project: 'SpongeBob Games', desc: 'EVIIIIL! Underwater hero!' },
            { emoji: '🦀', title: 'Mr. Krabs', project: 'SpongeBob Games', desc: 'Money money money!' },
            { emoji: '🎬', title: 'Disney Legend', project: '15+ Films', desc: 'Voice & modeling wizard!' },
          ].map((role, i) => (
            <div key={i} className="bg-slate-900/80 rounded-xl p-5 border border-slate-800 hover:border-pink-500 hover:-translate-y-1 transition-all">
              <div className="text-4xl mb-3">{role.emoji}</div>
              <h3 className="text-lg font-bold text-yellow-400">{role.title}</h3>
              <p className="text-cyan-400 text-sm mb-1">{role.project}</p>
              <p className="text-gray-400 text-sm">{role.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Quick Facts */}
      <section className="max-w-4xl mx-auto px-4 py-12">
        <div className="bg-gradient-to-br from-pink-500/10 to-cyan-500/10 rounded-2xl p-6 border border-slate-800">
          <h2 className="text-2xl font-bold text-center mb-6">🤯 Quick Facts</h2>
          <div className="grid md:grid-cols-2 gap-3">
            {[
              '🎭 Performed improv with Jeff Bryan Davis (Whose Line!)',
              '🏢 Disney Animation Studios for 15 years (1995-2010)',
              '🎤 Still performs stand-up comedy in Los Angeles',
              '💑 Married to fellow creative Kate Savage since 2005',
              '🎓 Studied theater at Cal State Northridge',
              '🎮 Voiced Chris Redfield AND Richard Aiken in RE Remake',
            ].map((fact, i) => (
              <div key={i} className="p-3 bg-slate-900/50 rounded-lg text-sm text-gray-300">{fact}</div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}

// ==================== ACHIEVEMENTS PAGE ====================
function AchievementsPage() {
  const [activeTab, setActiveTab] = useState('disney')

  const achievements = {
    disney: {
      title: '🏰 Disney Animation',
      items: [
        { year: '1997', title: 'Hercules', role: 'Production Assistant / Scratch Voice' },
        { year: '1999', title: 'Tarzan', role: '3D Modeler' },
        { year: '2000', title: "The Emperor's New Groove", role: 'Voice Actor' },
        { year: '2002', title: 'Treasure Planet', role: '3D Modeler' },
        { year: '2004', title: 'Home on the Range', role: 'Voice & Modeler' },
        { year: '2005', title: 'Chicken Little', role: 'Voice & CG Modeler' },
        { year: '2007', title: 'Meet the Robinsons', role: 'Voice & Modeler' },
        { year: '2008', title: 'Bolt', role: 'Senior Modeler' },
        { year: '2009', title: 'The Princess and the Frog', role: 'Voice Actor' },
        { year: '2009', title: 'Prep & Landing', role: 'Voice & Modeler' },
        { year: '2017', title: "Olaf's Frozen Adventure", role: 'Voice Actor' },
      ]
    },
    gaming: {
      title: '🎮 Video Games',
      items: [
        { year: '2001', title: 'SpongeBob SuperSponge', role: 'Mr. Krabs' },
        { year: '2001', title: 'Operation Krabby Patty', role: 'Mr. Krabs' },
        { year: '2002', title: 'Resident Evil (GameCube)', role: 'Chris Redfield & Richard Aiken' },
        { year: '2002', title: 'Employee of the Month', role: 'Mermaid Man' },
        { year: '2003', title: 'Battle for Bikini Bottom', role: 'Mr. Krabs & Mermaid Man' },
        { year: '2020', title: 'Battle for Bikini Bottom: Rehydrated', role: 'Original Voice (Preserved)' },
      ]
    },
    animation: {
      title: '🎬 Other Animation',
      items: [
        { year: '2015', title: 'Strange Magic', role: 'Senior Pre-Viz Artist (Lucasfilm)' },
        { year: '2017', title: 'The Star', role: 'Voice Actor & Character Modeler (Sony)' },
        { year: '2017', title: 'The Emoji Movie', role: 'Character Modeler (Sony)' },
        { year: '2018', title: 'Hotel Transylvania 3', role: 'Voice Actor' },
        { year: '2018', title: 'Mary Poppins Returns', role: 'Animation Modeler (Duncan Studio)' },
        { year: '2019', title: 'The Addams Family', role: 'Visual Development (Cinesite)' },
        { year: '2023', title: 'Blue Eye Samurai', role: 'CG Modeler (Netflix)' },
      ]
    },
    tv: {
      title: '📺 Television',
      items: [
        { year: '1995', title: 'The Drew Carey Show', role: 'Guest Appearance' },
        { year: '1998', title: 'Sports Night', role: 'Guest Appearance' },
        { year: '1998', title: 'General Hospital', role: 'Guest Appearance' },
        { year: '2003', title: 'Miss Match', role: 'Guest Appearance' },
        { year: '2004', title: 'Rodney', role: 'Guest Appearance' },
      ]
    },
    comedy: {
      title: '🎭 Comedy & Improv',
      items: [
        { year: '1990s', title: 'ComedySportz Los Angeles', role: 'Improv Performer' },
        { year: '1990s', title: 'The Impromptones', role: 'Musical Improv Group' },
        { year: '2000', title: 'The Newtonics', role: 'Music/Comedy (with Jeff Bryan Davis)' },
        { year: 'Present', title: 'Stand-Up Comedy', role: 'Los Angeles Venues' },
      ]
    }
  }

  return (
    <div className="max-w-5xl mx-auto px-4 py-12">
      <h1 className="text-4xl md:text-5xl font-black text-center mb-4 bg-gradient-to-r from-yellow-400 to-pink-500 bg-clip-text text-transparent">🏆 Career Achievements</h1>
      <p className="text-center text-gray-400 mb-8">35+ years of entertainment excellence</p>

      <div className="flex flex-wrap justify-center gap-2 mb-8">
        {Object.keys(achievements).map(key => (
          <button
            key={key}
            onClick={() => setActiveTab(key)}
            className={`px-4 py-2 rounded-full text-sm font-semibold transition-all ${
              activeTab === key ? 'bg-gradient-to-r from-pink-500 to-cyan-500 text-white shadow-lg' : 'bg-slate-800 text-gray-300 hover:bg-slate-700'
            }`}
          >
            {achievements[key].title}
          </button>
        ))}
      </div>

      <div className="bg-slate-900/80 rounded-2xl p-6 border border-slate-700">
        <h2 className="text-xl font-bold mb-6 text-cyan-400">{achievements[activeTab].title}</h2>
        <div className="space-y-2">
          {achievements[activeTab].items.map((item, i) => (
            <div key={i} className="flex items-center gap-4 p-4 bg-slate-800/50 rounded-lg hover:bg-slate-800 transition-colors group">
              <span className="text-pink-400 font-bold w-16 flex-shrink-0">{item.year}</span>
              <div className="flex-1 min-w-0">
                <span className="font-semibold text-white">{item.title}</span>
                <span className="text-gray-400 text-sm ml-2">— {item.role}</span>
              </div>
              <span className="text-xl opacity-0 group-hover:opacity-100 transition-opacity">⭐</span>
            </div>
          ))}
        </div>
      </div>

      {/* Career Timeline */}
      <div className="mt-16">
        <h2 className="text-2xl font-black text-center mb-8">📅 Career Timeline</h2>
        <div className="relative max-w-2xl mx-auto">
          <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-pink-500 via-cyan-500 to-yellow-500" />
          {[
            { year: '1982', event: 'Began professional acting career' },
            { year: '1987', event: 'Film debut in "Night Visitors"' },
            { year: '1995', event: 'Joined Walt Disney Animation Studios' },
            { year: '2002', event: 'Voiced Chris Redfield in Resident Evil' },
            { year: '2008', event: 'Promoted to Senior Modeler on Bolt' },
            { year: '2010', event: 'Left Disney after 15 amazing years' },
            { year: '2015', event: 'Senior Pre-Viz at Lucasfilm' },
            { year: '2023', event: 'CG work on Blue Eye Samurai (Netflix)' },
          ].map((item, i) => (
            <div key={i} className="relative pl-12 md:pl-0 mb-8">
              <div className={`md:w-5/12 ${i % 2 === 0 ? 'md:ml-auto md:pl-8' : 'md:mr-auto md:pr-8 md:text-right'}`}>
                <div className="bg-slate-900 p-4 rounded-xl border border-cyan-500/30">
                  <span className="text-cyan-400 font-bold">{item.year}</span>
                  <p className="text-gray-200 mt-1 text-sm">{item.event}</p>
                </div>
              </div>
              <div className="absolute left-2 md:left-1/2 top-4 w-4 h-4 bg-pink-500 rounded-full border-4 border-slate-950 transform md:-translate-x-1/2" />
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
    <div className="max-w-4xl mx-auto px-4 py-12">
      <h1 className="text-4xl md:text-5xl font-black text-center mb-8 bg-gradient-to-r from-cyan-400 to-pink-500 bg-clip-text text-transparent">👤 About Joe Whyte</h1>

      <div className="bg-slate-900/80 rounded-2xl p-6 md:p-8 border border-slate-700 mb-8">
        <p className="text-gray-300 leading-relaxed mb-4">
          <strong className="text-white">Joseph Walter Whyte</strong> (born April 18, 1961) is an American actor, voice actor, 3D modeler, and comedian with over 35 years in the entertainment industry.
        </p>
        <p className="text-gray-300 leading-relaxed mb-4">
          Joe studied theater at <strong className="text-cyan-400">California State University, Northridge</strong>, where he developed his passion for performance. He began his professional acting career in 1982 and has been entertaining audiences ever since.
        </p>
        <p className="text-gray-300 leading-relaxed mb-4">
          From 1995 to 2010, Joe worked at <strong className="text-pink-400">Walt Disney Animation Studios</strong> as both a 3D modeler and voice actor. He contributed to beloved films including Tarzan, Chicken Little, Meet the Robinsons, Bolt, and The Princess and the Frog.
        </p>
        <p className="text-gray-300 leading-relaxed">
          He is perhaps best known to gamers as the voice of <strong className="text-green-400">Chris Redfield</strong> in the 2002 GameCube remake of Resident Evil, a performance that remains iconic in the gaming community.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-6 mb-8">
        <div className="bg-slate-900/80 rounded-xl p-6 border border-pink-500/30">
          <h3 className="text-xl font-bold text-pink-400 mb-4">🎭 Comedy Background</h3>
          <p className="text-gray-300 text-sm leading-relaxed">
            Joe honed his comedic skills through years of improv performance, including work with ComedySportz Los Angeles, The Impromptones, and The Newtonics (alongside Jeff Bryan Davis of Whose Line Is It Anyway?). He continues to perform stand-up comedy in the Los Angeles area.
          </p>
        </div>
        <div className="bg-slate-900/80 rounded-xl p-6 border border-cyan-500/30">
          <h3 className="text-xl font-bold text-cyan-400 mb-4">💑 Personal Life</h3>
          <p className="text-gray-300 text-sm leading-relaxed">
            Joe has been happily married to fellow creative Kate Savage since 2005. Together they continue to work in the entertainment industry, bringing creativity and passion to everything they do.
          </p>
        </div>
      </div>

      <div className="text-center">
        <h3 className="text-xl font-bold mb-4">🔗 Official Links</h3>
        <div className="flex justify-center gap-4 flex-wrap">
          <a href="https://www.imdb.com/name/nm0926679/" target="_blank" rel="noreferrer" className="px-6 py-3 bg-yellow-500 text-black font-bold rounded-lg hover:bg-yellow-400 transition-colors">IMDb Profile</a>
          <a href="https://www.whytenoise.com/" target="_blank" rel="noreferrer" className="px-6 py-3 bg-cyan-500 text-black font-bold rounded-lg hover:bg-cyan-400 transition-colors">WhyteNoise.com</a>
        </div>
      </div>
    </div>
  )
}

// ==================== ADMIN PAGE ====================
function AdminPage({ isAdmin }) {
  if (!isAdmin) {
    return (
      <div className="max-w-md mx-auto px-4 py-24 text-center">
        <div className="text-6xl mb-4">🔐</div>
        <h1 className="text-2xl font-bold text-gray-400 mb-4">Admin Access Required</h1>
        <p className="text-gray-500">Please log in to view this page.</p>
      </div>
    )
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <div className="bg-green-500/20 border border-green-500/50 rounded-lg p-4 mb-8 text-center">
        <p className="text-green-400 font-semibold">✅ Logged in as Admin</p>
      </div>

      <h1 className="text-4xl font-black text-center mb-4 text-yellow-400">⚙️ Admin Dashboard</h1>
      <p className="text-center text-gray-400 mb-8">Manage your fan site</p>

      <div className="space-y-6">
        {/* Message Board Management */}
        <div className="bg-slate-900 rounded-xl p-6 border border-purple-500/30">
          <h2 className="text-xl font-bold text-purple-400 mb-4">💬 Message Board Management</h2>
          <p className="text-gray-300 mb-4">Go to the <strong className="text-cyan-400">Fan Board</strong> page to:</p>
          <ul className="list-disc list-inside space-y-2 text-gray-300 text-sm">
            <li><strong className="text-green-400">Reply</strong> to fan messages as Joe</li>
            <li><strong className="text-red-400">Delete</strong> inappropriate messages</li>
            <li><strong className="text-orange-400">Ban</strong> users from posting</li>
            <li>View <strong className="text-yellow-400">pending messages</strong> awaiting approval</li>
          </ul>
          <p className="text-gray-400 text-sm mt-4">
            <strong>Note:</strong> Local changes are stored in your browser. For permanent changes, update <code className="bg-slate-800 px-2 py-1 rounded">messages.json</code> on GitHub.
          </p>
        </div>

        {/* Events Management */}
        <div className="bg-slate-900 rounded-xl p-6 border border-yellow-500/30">
          <h2 className="text-xl font-bold text-yellow-400 mb-4">📅 Managing Events</h2>
          <p className="text-gray-300 mb-4">Events are stored in <code className="bg-slate-800 px-2 py-1 rounded text-cyan-400">/public/data/events.json</code></p>
          <ol className="list-decimal list-inside space-y-2 text-gray-300 text-sm">
            <li>Go to your GitHub repository</li>
            <li>Navigate to <code className="bg-slate-800 px-2 py-1 rounded">public/data/events.json</code></li>
            <li>Click the pencil icon to edit</li>
            <li>Add or modify events</li>
            <li>Commit changes - Vercel auto-deploys!</li>
          </ol>
          <div className="mt-4 bg-slate-800 rounded-lg p-4">
            <p className="text-gray-400 text-sm mb-2">Event format:</p>
            <pre className="text-xs text-green-400 overflow-x-auto">{`{
  "id": 4,
  "name": "Event Name",
  "type": "convention",
  "date": "2026-06-15",
  "time": "2:00 PM",
  "venue": "Venue Name",
  "city": "City, State",
  "description": "Description",
  "ticketUrl": "https://..."
}`}</pre>
          </div>
        </div>

        {/* Email Subscribers */}
        <div className="bg-slate-900 rounded-xl p-6 border border-green-500/30">
          <h2 className="text-xl font-bold text-green-400 mb-4">✉️ Email Subscribers</h2>
          <p className="text-gray-300 mb-4">When fans subscribe, they'll send an email to:</p>
          <p className="text-xl text-cyan-400 font-mono mb-4">{JOE_EMAIL}</p>
          <p className="text-gray-300 text-sm">Collect these in a spreadsheet for your email marketing!</p>
        </div>

        {/* Admin Credentials */}
        <div className="bg-slate-900 rounded-xl p-6 border border-red-500/30">
          <h2 className="text-xl font-bold text-red-400 mb-4">🔐 Admin Login Setup</h2>
          <p className="text-gray-300 mb-4">Set up secure credentials in Vercel:</p>
          <ol className="list-decimal list-inside space-y-2 text-gray-300 text-sm">
            <li>Go to Vercel → <strong>Settings</strong> → <strong>Environment Variables</strong></li>
            <li>Add: <code className="bg-slate-800 px-2 py-1 rounded text-yellow-400">VITE_ADMIN_USER</code></li>
            <li>Add: <code className="bg-slate-800 px-2 py-1 rounded text-yellow-400">VITE_ADMIN_PASS</code></li>
            <li>Redeploy for changes to take effect</li>
          </ol>
          <p className="text-orange-400 text-sm mt-4">⚠️ Default: admin / joewhyte2026</p>
        </div>

        {/* File Structure */}
        <div className="bg-slate-900 rounded-xl p-6 border border-pink-500/30">
          <h2 className="text-xl font-bold text-pink-400 mb-4">📁 File Structure</h2>
          <pre className="text-xs text-gray-300 overflow-x-auto">{`public/data/
├── events.json     ← Your events
└── messages.json   ← Approved fan messages

src/
└── App.jsx         ← Main site (email config at top)`}</pre>
        </div>
      </div>
    </div>
  )
}
