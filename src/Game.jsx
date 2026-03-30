import { useState, useEffect, useRef } from 'react'

export default function GamePage() {
  const [gameState, setGameState] = useState('menu')
  const [finalStats, setFinalStats] = useState({ score: 0, kills: 0, wave: 1 })
  const [highScore, setHighScore] = useState(() => parseInt(localStorage.getItem('joe_highscore') || '0'))

  const endGame = (stats) => {
    if (stats.score > highScore) {
      setHighScore(stats.score)
      localStorage.setItem('joe_highscore', stats.score.toString())
    }
    setFinalStats(stats)
    setGameState('gameover')
  }

  return (
    <div className="py-4 px-4">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-4">
          <h1 className="text-3xl md:text-5xl font-black tracking-wider" style={{
            background: 'linear-gradient(180deg, #ffd700 0%, #ff8c00 50%, #8B0000 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          }}>
            ⚔️ JOE WHYTE: ZOMBIE SLAYER ⚔️
          </h1>
          <p className="text-amber-500/80 text-sm mt-1 tracking-widest">MANSION OF THE DAMNED</p>
        </div>

        <div className="relative rounded-lg overflow-hidden border-4 border-amber-900/50 shadow-2xl shadow-orange-900/30"
             style={{ height: 'min(550px, 65vh)', background: '#0a0a0a' }}>
          {gameState === 'menu' && <MainMenu onStart={() => setGameState('playing')} highScore={highScore} />}
          {gameState === 'playing' && <GameArena onGameOver={endGame} />}
          {gameState === 'gameover' && <GameOver stats={finalStats} highScore={highScore} onRestart={() => setGameState('playing')} />}
        </div>

        <div className="mt-4 bg-gradient-to-b from-gray-900 to-black border border-amber-900/30 rounded p-4">
          <div className="flex flex-wrap justify-center gap-4 text-xs">
            <div className="flex items-center gap-2"><kbd className="bg-gray-800 border border-gray-600 px-2 py-1 rounded font-mono">A/D</kbd><span className="text-gray-400">Move</span></div>
            <div className="flex items-center gap-2"><kbd className="bg-gray-800 border border-gray-600 px-2 py-1 rounded font-mono">SPACE</kbd><span className="text-gray-400">Jump</span></div>
            <div className="flex items-center gap-2"><kbd className="bg-red-900/50 border border-red-700/50 px-2 py-1 rounded font-mono text-red-400">CLICK</kbd><span className="text-red-400">Attack</span></div>
            <div className="flex items-center gap-2"><kbd className="bg-orange-900/50 border border-orange-700/50 px-2 py-1 rounded font-mono text-orange-400">RIGHT CLICK</kbd><span className="text-orange-400">Power Attack</span></div>
            <div className="flex items-center gap-2"><kbd className="bg-blue-900/50 border border-blue-700/50 px-2 py-1 rounded font-mono text-blue-400">SHIFT</kbd><span className="text-blue-400">Dodge</span></div>
          </div>
        </div>
      </div>
    </div>
  )
}

function MainMenu({ onStart, highScore }) {
  useEffect(() => {
    const handler = (e) => { if (e.code === 'Space' || e.code === 'Enter') { e.preventDefault(); onStart() }}
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [onStart])

  return (
    <div className="absolute inset-0 flex flex-col items-center justify-center cursor-pointer overflow-hidden"
         style={{ background: 'radial-gradient(ellipse at center, #1a0a00 0%, #000 70%)' }}
         onClick={onStart}>
      <div className="absolute inset-0 overflow-hidden opacity-30">
        {[...Array(15)].map((_, i) => (
          <div key={i} className="absolute w-2 h-2 bg-orange-500 rounded-full animate-ping"
               style={{ left: `${Math.random()*100}%`, top: `${60+Math.random()*40}%`, animationDelay: `${i*0.15}s`, animationDuration: '2s' }} />
        ))}
      </div>

      <div className="relative mb-6">
        <div className="absolute inset-0 bg-gradient-to-b from-amber-500/50 to-red-900/50 rounded-full blur-2xl scale-150" />
        <div className="relative w-40 h-40 rounded-full overflow-hidden border-4 border-amber-600 shadow-lg shadow-amber-600/50">
          <img src="/joey.jpg" alt="Joe Whyte" className="w-full h-full object-cover" />
        </div>
        <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 bg-gradient-to-b from-amber-500 to-amber-700 px-4 py-1 rounded-full border-2 border-amber-400 text-black font-black text-sm">
          LVL 60 HERO
        </div>
      </div>

      <h2 className="text-4xl font-black text-amber-500 mb-2 tracking-wider" style={{ textShadow: '0 0 30px rgba(255,140,0,0.8)' }}>
        JOE WHYTE
      </h2>
      <p className="text-red-500 text-lg mb-1 font-bold">ZOMBIE SLAYER</p>
      <p className="text-gray-500 text-sm mb-8">Survive the endless horde</p>

      <button className="relative group">
        <div className="absolute inset-0 bg-gradient-to-r from-amber-600 to-red-600 rounded-lg blur group-hover:blur-md transition-all" />
        <div className="relative px-12 py-4 bg-gradient-to-b from-amber-600 to-amber-800 rounded-lg border-2 border-amber-500 font-black text-xl tracking-wider hover:from-amber-500 hover:to-amber-700 transition-all">
          ⚔️ ENTER BATTLE ⚔️
        </div>
      </button>

      {highScore > 0 && <p className="mt-6 text-amber-400">🏆 Best: {highScore.toLocaleString()}</p>}
      <p className="mt-8 text-gray-600 text-sm">Press SPACE to begin</p>
    </div>
  )
}

function GameOver({ stats, highScore, onRestart }) {
  const isRecord = stats.score >= highScore

  useEffect(() => {
    const handler = (e) => { if (e.code === 'Space') { e.preventDefault(); onRestart() }}
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [onRestart])

  return (
    <div className="absolute inset-0 flex flex-col items-center justify-center cursor-pointer"
         style={{ background: 'radial-gradient(ellipse at center, #200000 0%, #000 70%)' }}
         onClick={onRestart}>
      
      <div className="text-7xl mb-4">💀</div>
      <h2 className="text-5xl font-black text-red-600 mb-6" style={{ textShadow: '0 0 40px rgba(220,38,38,0.8)' }}>
        FALLEN IN BATTLE
      </h2>

      {isRecord && (
        <div className="mb-6 px-8 py-3 bg-gradient-to-r from-amber-600 to-yellow-500 text-black font-black text-xl rounded-lg animate-pulse">
          ⭐ NEW HIGH SCORE! ⭐
        </div>
      )}

      <div className="flex gap-12 mb-8">
        <div className="text-center"><div className="text-4xl font-black text-amber-400">{stats.score}</div><div className="text-gray-500 text-sm">SCORE</div></div>
        <div className="text-center"><div className="text-4xl font-black text-red-400">{stats.kills}</div><div className="text-gray-500 text-sm">KILLS</div></div>
        <div className="text-center"><div className="text-4xl font-black text-blue-400">{stats.wave}</div><div className="text-gray-500 text-sm">WAVE</div></div>
      </div>

      <button className="px-12 py-4 bg-gradient-to-b from-green-600 to-green-800 rounded-lg border-2 border-green-500 font-black text-xl hover:from-green-500 hover:to-green-700">
        🔄 RISE AGAIN
      </button>
    </div>
  )
}

function GameArena({ onGameOver }) {
  const canvasRef = useRef(null)
  const joeImgRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    let animId

    const joeImg = new Image()
    joeImg.src = '/joey.jpg'
    joeImgRef.current = joeImg

    const resize = () => {
      canvas.width = canvas.parentElement.clientWidth
      canvas.height = canvas.parentElement.clientHeight
    }
    resize()
    window.addEventListener('resize', resize)

    // Game state
    const G = {
      running: true,
      time: 0,
      score: 0,
      kills: 0,
      wave: 1,
      waveTimer: 0,
      shake: 0,
      
      joe: {
        x: 200, y: 0,
        w: 90, h: 140,
        vx: 0, vy: 0,
        facing: 1,
        hp: 100, maxHp: 100,
        energy: 100, maxEnergy: 100,
        grounded: false,
        attacking: false, attackTime: 0, attackType: 'normal',
        rolling: false, rollTime: 0,
        invincible: 0, hitFlash: 0,
        runFrame: 0
      },

      groundY: 0,
      arenaLeft: 40,
      arenaRight: 0,
      enemies: [],
      spawnTimer: 0,
      particles: [],
      damageNums: [],
      slashEffects: []
    }

    G.groundY = canvas.height - 70
    G.arenaRight = canvas.width - 40
    G.joe.y = G.groundY - G.joe.h

    // Input
    const keys = {}
    const mouse = { x: 0, y: 0 }

    const keyDown = (e) => {
      keys[e.code] = true
      if (e.code === 'Space') { e.preventDefault(); jump() }
      if (e.code === 'ShiftLeft' || e.code === 'ShiftRight') { e.preventDefault(); roll() }
    }
    const keyUp = (e) => { keys[e.code] = false }
    
    const mouseDown = (e) => {
      e.preventDefault()
      if (e.button === 0) attack('normal')
      if (e.button === 2) attack('power')
    }
    const mouseMove = (e) => {
      const rect = canvas.getBoundingClientRect()
      mouse.x = e.clientX - rect.left
      mouse.y = e.clientY - rect.top
    }
    const contextMenu = (e) => e.preventDefault()

    window.addEventListener('keydown', keyDown)
    window.addEventListener('keyup', keyUp)
    canvas.addEventListener('mousedown', mouseDown)
    canvas.addEventListener('mousemove', mouseMove)
    canvas.addEventListener('contextmenu', contextMenu)

    const jump = () => {
      if (G.joe.grounded && !G.joe.rolling) {
        G.joe.vy = -20
        G.joe.grounded = false
        addDust(G.joe.x + G.joe.w/2, G.groundY, 10)
      }
    }

    const roll = () => {
      if (!G.joe.rolling && G.joe.energy >= 25) {
        G.joe.rolling = true
        G.joe.rollTime = 0
        G.joe.invincible = 30
        G.joe.energy -= 25
        G.joe.vx = G.joe.facing * 18
        addDust(G.joe.x + G.joe.w/2, G.groundY, 8)
      }
    }

    const attack = (type) => {
      if (G.joe.attacking || G.joe.rolling) return
      const cost = type === 'power' ? 35 : 12
      if (G.joe.energy < cost) return

      G.joe.attacking = true
      G.joe.attackTime = 0
      G.joe.attackType = type
      G.joe.energy -= cost
      G.joe.facing = mouse.x > G.joe.x + G.joe.w/2 ? 1 : -1

      // Slash visual
      const slashX = G.joe.x + (G.joe.facing > 0 ? G.joe.w : 0)
      G.slashEffects.push({ x: slashX, y: G.joe.y + G.joe.h/2 - 30, facing: G.joe.facing, life: 1, type })

      // Damage enemies in range
      const range = type === 'power' ? 160 : 110
      const damage = type === 'power' ? 50 : 25
      
      G.enemies.forEach(e => {
        if (e.dead) return
        const ex = e.x + e.w/2
        const jx = G.joe.x + G.joe.w/2
        const dist = G.joe.facing > 0 ? ex - jx : jx - ex
        
        if (dist > -20 && dist < range && Math.abs(e.y - G.joe.y) < 100) {
          e.hp -= damage
          e.hitFlash = 12
          e.knockback = G.joe.facing * (type === 'power' ? 18 : 10)
          G.shake = type === 'power' ? 10 : 5
          addDamageNum(e.x + e.w/2, e.y, damage, type === 'power')
          addBlood(e.x + e.w/2, e.y + e.h/2)

          if (e.hp <= 0) {
            e.dead = true
            e.deathTime = 0
            G.kills++
            G.score += e.points
            addExplosion(e.x + e.w/2, e.y + e.h/2)
          }
        }
      })
    }

    // Particles
    const addDust = (x, y, n) => {
      for (let i = 0; i < n; i++) {
        G.particles.push({ x, y, vx: (Math.random()-0.5)*8, vy: -Math.random()*4, size: Math.random()*8+4, life: 1, color: '#8B7355', grav: 0.2 })
      }
    }

    const addExplosion = (x, y) => {
      const colors = ['#ff4400', '#ff8800', '#ffcc00', '#fff', '#ff2200']
      for (let i = 0; i < 40; i++) {
        const a = Math.random() * Math.PI * 2
        const s = Math.random() * 14 + 5
        G.particles.push({ x, y, vx: Math.cos(a)*s, vy: Math.sin(a)*s - 4, size: Math.random()*14+5, life: 1, color: colors[Math.floor(Math.random()*5)], grav: 0.25 })
      }
    }

    const addBlood = (x, y) => {
      for (let i = 0; i < 12; i++) {
        G.particles.push({ x, y, vx: (Math.random()-0.5)*14, vy: -Math.random()*10, size: Math.random()*8+3, life: 1, color: '#8B0000', grav: 0.35 })
      }
    }

    const addDamageNum = (x, y, dmg, crit) => {
      G.damageNums.push({ x, y, dmg, crit, life: 1, vy: -4 })
    }

    // Spawn
    const spawnEnemy = () => {
      const side = Math.random() > 0.5 ? 1 : -1
      const types = ['zombie', 'zombie', 'brute', 'crawler', 'runner']
      const type = types[Math.floor(Math.random() * Math.min(types.length, 2 + Math.floor(G.wave/2)))]
      
      let e
      const spawnX = side > 0 ? G.arenaRight + 80 : G.arenaLeft - 120

      if (type === 'zombie') {
        e = { type, x: spawnX, y: G.groundY - 110, w: 70, h: 110, hp: 40 + G.wave * 8, maxHp: 40 + G.wave * 8, speed: 1.8 + G.wave * 0.12, damage: 12, points: 50 }
      } else if (type === 'brute') {
        e = { type, x: spawnX, y: G.groundY - 160, w: 110, h: 160, hp: 150 + G.wave * 25, maxHp: 150 + G.wave * 25, speed: 0.9, damage: 30, points: 200 }
      } else if (type === 'crawler') {
        e = { type, x: spawnX, y: G.groundY - 50, w: 85, h: 50, hp: 25 + G.wave * 4, maxHp: 25 + G.wave * 4, speed: 3 + G.wave * 0.18, damage: 10, points: 35 }
      } else if (type === 'runner') {
        e = { type, x: spawnX, y: G.groundY - 100, w: 60, h: 100, hp: 20 + G.wave * 3, maxHp: 20 + G.wave * 3, speed: 5 + G.wave * 0.25, damage: 15, points: 45 }
      }

      e.facing = -side
      e.frame = Math.random() * 100
      e.dead = false
      e.hitFlash = 0
      e.knockback = 0
      G.enemies.push(e)
    }

    // Draw Joe with his actual face
    const drawJoe = () => {
      const j = G.joe
      ctx.save()
      
      if (j.hitFlash > 0) ctx.globalAlpha = 0.5 + Math.sin(j.hitFlash * 0.5) * 0.5
      if (j.invincible > 0 && Math.floor(G.time / 3) % 2 === 0) ctx.globalAlpha = 0.4

      const cx = j.x + j.w/2
      ctx.translate(cx, 0)
      ctx.scale(j.facing, 1)
      ctx.translate(-cx, 0)

      if (j.rolling) {
        ctx.translate(cx, j.y + j.h/2)
        ctx.rotate(j.rollTime * 0.4)
        ctx.translate(-cx, -(j.y + j.h/2))
      }

      // Colors - green tracksuit
      const trackGreen = '#2d5a47'
      const trackDark = '#1d3a2f'

      // Legs with animation
      const legAnim = j.grounded && Math.abs(j.vx) > 0.5 ? Math.sin(j.runFrame * 0.35) * 18 : 0
      ctx.fillStyle = trackGreen
      
      ctx.save()
      ctx.translate(cx - 18, j.y + j.h - 55)
      ctx.rotate(legAnim * 0.025)
      ctx.fillRect(-10, 0, 20, 50)
      ctx.fillStyle = '#f5f5f5'
      ctx.fillRect(-10, 45, 22, 10)
      ctx.restore()
      
      ctx.save()
      ctx.fillStyle = trackGreen
      ctx.translate(cx + 18, j.y + j.h - 55)
      ctx.rotate(-legAnim * 0.025)
      ctx.fillRect(-10, 0, 20, 50)
      ctx.fillStyle = '#f5f5f5'
      ctx.fillRect(-12, 45, 22, 10)
      ctx.restore()

      // Torso
      ctx.fillStyle = trackGreen
      ctx.fillRect(cx - 30, j.y + 45, 60, 50)
      ctx.fillStyle = '#222'
      ctx.fillRect(cx - 3, j.y + 45, 6, 50)
      ctx.fillStyle = trackDark
      ctx.fillRect(cx - 25, j.y + 40, 50, 10)

      // Arms + weapon
      const armSwing = j.grounded ? Math.sin(j.runFrame * 0.35) * 12 : 0

      if (j.attacking) {
        const swing = Math.min(j.attackTime * 0.25, 1)
        ctx.save()
        ctx.fillStyle = trackGreen
        ctx.translate(cx + 30, j.y + 60)
        ctx.rotate(-Math.PI/3 + swing * Math.PI * 0.85)
        ctx.fillRect(0, -8, 40, 18)
        // Big baseball bat
        ctx.fillStyle = '#8B4513'
        ctx.fillRect(35, -12, 65, 24)
        ctx.fillStyle = '#654321'
        ctx.fillRect(35, -12, 15, 24)
        ctx.fillStyle = '#444'
        ctx.fillRect(35, -12, 5, 24)
        ctx.restore()

        ctx.save()
        ctx.fillStyle = trackGreen
        ctx.translate(cx - 30, j.y + 60)
        ctx.fillRect(-35, -7, 35, 16)
        ctx.restore()
      } else {
        ctx.save()
        ctx.fillStyle = trackGreen
        ctx.translate(cx + 30, j.y + 55)
        ctx.rotate(-0.35 + armSwing * 0.015)
        ctx.fillRect(0, -7, 35, 16)
        ctx.fillStyle = '#8B4513'
        ctx.fillRect(25, -35, 10, 50)
        ctx.restore()

        ctx.save()
        ctx.fillStyle = trackGreen
        ctx.translate(cx - 30, j.y + 55)
        ctx.rotate(0.35 - armSwing * 0.015)
        ctx.fillRect(-35, -7, 35, 16)
        ctx.restore()
      }

      // HEAD with Joe's actual face
      const headY = j.y + 22
      const headR = 38

      if (joeImgRef.current && joeImgRef.current.complete) {
        ctx.save()
        ctx.beginPath()
        ctx.arc(cx, headY, headR, 0, Math.PI * 2)
        ctx.clip()
        ctx.drawImage(joeImgRef.current, cx - headR, headY - headR, headR * 2, headR * 2.3)
        ctx.restore()
        
        ctx.strokeStyle = '#c9a868'
        ctx.lineWidth = 4
        ctx.beginPath()
        ctx.arc(cx, headY, headR, 0, Math.PI * 2)
        ctx.stroke()
      } else {
        ctx.fillStyle = '#e8d0b8'
        ctx.beginPath()
        ctx.arc(cx, headY, headR, 0, Math.PI * 2)
        ctx.fill()
      }

      ctx.restore()
    }

    // Draw enemies - bigger and more detailed
    const drawEnemy = (e) => {
      ctx.save()
      
      if (e.hitFlash > 0) ctx.filter = 'brightness(3)'
      if (e.dead) ctx.globalAlpha = 1 - e.deathTime / 35

      const cx = e.x + e.w/2
      ctx.translate(cx, 0)
      ctx.scale(e.facing, 1)
      ctx.translate(-cx, 0)

      const x = e.x, y = e.y
      const anim = Math.sin(G.time * 0.12 + e.frame) * 6

      if (e.type === 'zombie') {
        // Body
        ctx.fillStyle = '#4a5568'
        ctx.fillRect(x + 18, y + 35, 35, 48)
        // Legs
        ctx.fillStyle = '#374151'
        ctx.fillRect(x + 18, y + 78, 14, 32 + anim)
        ctx.fillRect(x + 38, y + 78, 14, 32 - anim)
        // Arms reaching
        ctx.fillStyle = '#9ca3af'
        ctx.save()
        ctx.translate(x + 52, y + 45)
        ctx.rotate(Math.sin(G.time * 0.1) * 0.35 - 0.6)
        ctx.fillRect(0, -6, 35, 14)
        ctx.restore()
        ctx.save()
        ctx.translate(x + 52, y + 62)
        ctx.rotate(Math.sin(G.time * 0.1 + 1) * 0.25 - 0.4)
        ctx.fillRect(0, -6, 30, 14)
        ctx.restore()
        // Head
        ctx.fillStyle = '#9ca396'
        ctx.beginPath()
        ctx.arc(x + 35, y + 22, 22, 0, Math.PI * 2)
        ctx.fill()
        // Blood
        ctx.fillStyle = '#700'
        ctx.fillRect(x + 25, y + 40, 6, 20)
        ctx.beginPath()
        ctx.arc(x + 30, y + 15, 6, 0, Math.PI * 2)
        ctx.fill()
        // Eyes
        ctx.fillStyle = '#fff'
        ctx.beginPath()
        ctx.arc(x + 28, y + 20, 5, 0, Math.PI * 2)
        ctx.arc(x + 42, y + 20, 5, 0, Math.PI * 2)
        ctx.fill()
        // Mouth
        ctx.fillStyle = '#400'
        ctx.fillRect(x + 25, y + 32, 20, 5)
      } else if (e.type === 'brute') {
        // Massive body
        ctx.fillStyle = '#3d4a3d'
        ctx.fillRect(x + 15, y + 45, 80, 75)
        // Legs
        ctx.fillStyle = '#2d3a2d'
        ctx.fillRect(x + 25, y + 115, 25, 45)
        ctx.fillRect(x + 60, y + 115, 25, 45)
        // Huge arms
        ctx.fillStyle = '#5a6a5a'
        ctx.fillRect(x + 90, y + 50, 30, 65)
        ctx.fillRect(x - 15, y + 50, 30, 65)
        // Small head
        ctx.fillStyle = '#7a8a7a'
        ctx.beginPath()
        ctx.arc(x + 55, y + 28, 25, 0, Math.PI * 2)
        ctx.fill()
        // Angry red eyes
        ctx.fillStyle = '#f00'
        ctx.beginPath()
        ctx.arc(x + 45, y + 25, 7, 0, Math.PI * 2)
        ctx.arc(x + 65, y + 25, 7, 0, Math.PI * 2)
        ctx.fill()
      } else if (e.type === 'crawler') {
        const drag = Math.sin(G.time * 0.18) * 10
        ctx.fillStyle = '#7a8a6a'
        ctx.fillRect(x + 10, y + 18, 60, 28)
        ctx.beginPath()
        ctx.arc(x + 72, y + 25, 18, 0, Math.PI * 2)
        ctx.fill()
        ctx.fillRect(x + 65 + drag, y + 35, 25, 10)
        ctx.fillRect(x + 58 - drag, y + 40, 25, 10)
        ctx.fillStyle = 'rgba(100,0,0,0.4)'
        ctx.fillRect(x - 25, y + 42, 40, 6)
        ctx.fillStyle = '#ff0'
        ctx.beginPath()
        ctx.arc(x + 68, y + 22, 4, 0, Math.PI * 2)
        ctx.arc(x + 78, y + 22, 4, 0, Math.PI * 2)
        ctx.fill()
      } else if (e.type === 'runner') {
        const run = Math.sin(G.time * 0.35) * 14
        ctx.fillStyle = '#5a5a6a'
        ctx.fillRect(x + 18, y + 28, 25, 45)
        ctx.fillRect(x + 18, y + 68, 10, 32 + run)
        ctx.fillRect(x + 32, y + 68, 10, 32 - run)
        ctx.save()
        ctx.translate(x + 42, y + 40)
        ctx.rotate(-0.9)
        ctx.fillRect(0, -5, 30, 10)
        ctx.restore()
        ctx.fillStyle = '#8a8a9a'
        ctx.beginPath()
        ctx.arc(x + 30, y + 18, 18, 0, Math.PI * 2)
        ctx.fill()
        ctx.fillStyle = '#f44'
        ctx.beginPath()
        ctx.arc(x + 24, y + 15, 5, 0, Math.PI * 2)
        ctx.arc(x + 36, y + 15, 5, 0, Math.PI * 2)
        ctx.fill()
      }

      ctx.filter = 'none'
      ctx.restore()

      // Health bar
      if (!e.dead && e.hp < e.maxHp) {
        ctx.fillStyle = '#300'
        ctx.fillRect(e.x, e.y - 18, e.w, 8)
        ctx.fillStyle = e.type === 'brute' ? '#f80' : '#f00'
        ctx.fillRect(e.x, e.y - 18, e.w * (e.hp / e.maxHp), 8)
        ctx.strokeStyle = '#000'
        ctx.lineWidth = 1
        ctx.strokeRect(e.x, e.y - 18, e.w, 8)
      }
    }

    // Main loop
    const loop = () => {
      if (!G.running) return
      G.time++

      // Update Joe
      const j = G.joe
      if (!j.rolling) {
        if (keys['KeyA'] || keys['ArrowLeft']) { j.vx = -7; j.facing = -1 }
        else if (keys['KeyD'] || keys['ArrowRight']) { j.vx = 7; j.facing = 1 }
        else j.vx *= 0.75
      }

      j.vy += 1.0
      j.x += j.vx
      j.y += j.vy

      if (j.y >= G.groundY - j.h) {
        j.y = G.groundY - j.h
        j.vy = 0
        j.grounded = true
      } else j.grounded = false

      j.x = Math.max(G.arenaLeft, Math.min(G.arenaRight - j.w, j.x))

      if (j.grounded && Math.abs(j.vx) > 0.5) j.runFrame++
      if (j.attacking) { j.attackTime++; if (j.attackTime > 22) j.attacking = false }
      if (j.rolling) { j.rollTime++; if (j.rollTime > 22) { j.rolling = false; j.vx = 0 } }
      if (j.invincible > 0) j.invincible--
      if (j.hitFlash > 0) j.hitFlash--
      if (j.energy < j.maxEnergy) j.energy += 0.35

      // Waves
      G.waveTimer++
      const spawnRate = Math.max(25, 80 - G.wave * 6)
      if (G.waveTimer % spawnRate === 0) spawnEnemy()
      if (G.waveTimer >= 300 + G.wave * 40) {
        G.wave++
        G.waveTimer = 0
        G.score += G.wave * 150
      }

      // Update enemies
      for (let i = G.enemies.length - 1; i >= 0; i--) {
        const e = G.enemies[i]
        e.frame++
        if (e.hitFlash > 0) e.hitFlash--

        if (e.dead) {
          e.deathTime++
          if (e.deathTime > 35) G.enemies.splice(i, 1)
          continue
        }

        if (e.knockback) {
          e.x += e.knockback
          e.knockback *= 0.82
          if (Math.abs(e.knockback) < 0.5) e.knockback = 0
        }

        if (!e.knockback) {
          const dir = j.x > e.x ? 1 : -1
          e.x += dir * e.speed
          e.facing = dir
        }

        // Collision
        if (j.invincible <= 0 && !j.rolling) {
          if (e.x < j.x + j.w - 20 && e.x + e.w > j.x + 20 && e.y < j.y + j.h && e.y + e.h > j.y + 15) {
            j.hp -= e.damage
            j.hitFlash = 18
            j.invincible = 50
            G.shake = 12
            addBlood(j.x + j.w/2, j.y + j.h/2)
            
            if (j.hp <= 0) {
              G.running = false
              addExplosion(j.x + j.w/2, j.y + j.h/2)
              setTimeout(() => onGameOver({ score: G.score, kills: G.kills, wave: G.wave }), 1200)
            }
          }
        }

        if (e.x < -250 || e.x > canvas.width + 250) G.enemies.splice(i, 1)
      }

      // Update particles
      for (let i = G.particles.length - 1; i >= 0; i--) {
        const p = G.particles[i]
        p.x += p.vx; p.y += p.vy; p.vy += p.grav
        p.life -= 0.022
        if (p.life <= 0) G.particles.splice(i, 1)
      }

      for (let i = G.damageNums.length - 1; i >= 0; i--) {
        const d = G.damageNums[i]
        d.y += d.vy; d.vy += 0.12; d.life -= 0.018
        if (d.life <= 0) G.damageNums.splice(i, 1)
      }

      for (let i = G.slashEffects.length - 1; i >= 0; i--) {
        G.slashEffects[i].life -= 0.12
        if (G.slashEffects[i].life <= 0) G.slashEffects.splice(i, 1)
      }

      if (G.shake > 0) G.shake--

      // === DRAW ===
      ctx.save()
      if (G.shake > 0) ctx.translate((Math.random()-0.5)*G.shake*2.5, (Math.random()-0.5)*G.shake*2.5)

      // Background
      const bg = ctx.createLinearGradient(0, 0, 0, canvas.height)
      bg.addColorStop(0, '#080505')
      bg.addColorStop(0.5, '#120808')
      bg.addColorStop(1, '#1a0a06')
      ctx.fillStyle = bg
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      // Moon
      ctx.fillStyle = 'rgba(255,235,200,0.5)'
      ctx.beginPath()
      ctx.arc(canvas.width - 90, 70, 50, 0, Math.PI * 2)
      ctx.fill()

      // Ground
      ctx.fillStyle = '#1a0f0a'
      ctx.fillRect(0, G.groundY, canvas.width, 80)
      ctx.fillStyle = '#0f0805'
      for (let i = 0; i < canvas.width; i += 50) ctx.fillRect(i, G.groundY, 3, 80)

      // Enemies
      G.enemies.forEach(drawEnemy)

      // Joe
      drawJoe()

      // Slash effects
      G.slashEffects.forEach(s => {
        ctx.save()
        ctx.globalAlpha = s.life
        ctx.translate(s.x, s.y)
        ctx.scale(s.facing, 1)
        const grad = ctx.createLinearGradient(0, 0, s.type === 'power' ? 140 : 100, 0)
        grad.addColorStop(0, s.type === 'power' ? 'rgba(255,200,50,0.9)' : 'rgba(255,255,255,0.9)')
        grad.addColorStop(1, 'rgba(255,100,0,0)')
        ctx.fillStyle = grad
        ctx.beginPath()
        ctx.moveTo(0, -40)
        ctx.quadraticCurveTo(s.type === 'power' ? 100 : 65, 0, 0, 40)
        ctx.fill()
        ctx.restore()
      })

      // Particles
      G.particles.forEach(p => {
        ctx.globalAlpha = p.life
        ctx.fillStyle = p.color
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.size * p.life, 0, Math.PI * 2)
        ctx.fill()
      })
      ctx.globalAlpha = 1

      // Damage numbers
      G.damageNums.forEach(d => {
        ctx.globalAlpha = d.life
        ctx.font = `bold ${d.crit ? 36 : 26}px Arial`
        ctx.fillStyle = d.crit ? '#ffcc00' : '#fff'
        ctx.strokeStyle = '#000'
        ctx.lineWidth = 4
        ctx.strokeText(d.dmg, d.x - 20, d.y)
        ctx.fillText(d.dmg, d.x - 20, d.y)
      })
      ctx.globalAlpha = 1

      // UI
      ctx.fillStyle = '#400'
      ctx.fillRect(20, 20, 220, 24)
      ctx.fillStyle = j.hp > 30 ? '#0c0' : '#f00'
      ctx.fillRect(20, 20, 220 * (j.hp / j.maxHp), 24)
      ctx.strokeStyle = '#000'
      ctx.lineWidth = 3
      ctx.strokeRect(20, 20, 220, 24)
      ctx.fillStyle = '#fff'
      ctx.font = 'bold 16px Arial'
      ctx.fillText(`HP: ${Math.ceil(j.hp)}/${j.maxHp}`, 28, 38)

      ctx.fillStyle = '#004'
      ctx.fillRect(20, 50, 160, 14)
      ctx.fillStyle = '#08f'
      ctx.fillRect(20, 50, 160 * (j.energy / j.maxEnergy), 14)
      ctx.strokeRect(20, 50, 160, 14)

      ctx.fillStyle = '#ffd700'
      ctx.font = 'bold 28px Arial'
      ctx.fillText(`SCORE: ${G.score}`, canvas.width - 220, 38)
      ctx.fillStyle = '#f44'
      ctx.font = 'bold 24px Arial'
      ctx.fillText(`WAVE ${G.wave}`, canvas.width - 220, 68)
      ctx.fillStyle = '#aaa'
      ctx.font = '18px Arial'
      ctx.fillText(`Kills: ${G.kills}`, canvas.width - 220, 92)

      ctx.restore()

      animId = requestAnimationFrame(loop)
    }

    loop()

    return () => {
      G.running = false
      cancelAnimationFrame(animId)
      window.removeEventListener('resize', resize)
      window.removeEventListener('keydown', keyDown)
      window.removeEventListener('keyup', keyUp)
      canvas.removeEventListener('mousedown', mouseDown)
      canvas.removeEventListener('mousemove', mouseMove)
      canvas.removeEventListener('contextmenu', contextMenu)
    }
  }, [onGameOver])

  return <canvas ref={canvasRef} className="w-full h-full cursor-crosshair" style={{ touchAction: 'none' }} />
}
