import { useState, useEffect, useRef } from 'react'

// ==================== GAME PAGE ====================
export default function GamePage() {
  const [gameState, setGameState] = useState('menu')
  const [score, setScore] = useState(0)
  const [kills, setKills] = useState(0)
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
    setKills(0)
    setGameState('playing')
  }

  const endGame = (finalScore, finalKills) => {
    setScore(finalScore)
    setKills(finalKills)
    setGameState('gameover')
  }

  return (
    <div className="py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-6">
          <h1 className="text-4xl md:text-5xl font-black mb-1">
            <span className="text-red-600" style={{textShadow: '2px 2px 0 #000'}}>RESIDENT</span>{' '}
            <span className="text-gray-200" style={{textShadow: '2px 2px 0 #000'}}>EVIL</span>
          </h1>
          <h2 className="text-2xl md:text-3xl font-black text-green-500">JOE'S ESCAPE</h2>
        </div>

        <div className="relative bg-black border-4 border-red-700 rounded-lg overflow-hidden" 
             style={{ height: 'min(500px, 60vh)' }}>
          {gameState === 'menu' && <GameMenu onStart={startGame} highScore={highScore} />}
          {gameState === 'playing' && <GameCanvas onGameOver={endGame} />}
          {gameState === 'gameover' && <GameOver score={score} kills={kills} highScore={highScore} onRestart={startGame} />}
        </div>

        <div className="mt-4 bg-gray-900 border-2 border-gray-700 p-4 rounded">
          <h3 className="font-black text-yellow-400 mb-3 text-sm">🎮 CONTROLS</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-xs">
            <div className="flex items-center gap-2">
              <kbd className="bg-gray-800 px-2 py-1 rounded font-mono">SPACE</kbd>
              <span className="text-gray-400">Jump</span>
            </div>
            <div className="flex items-center gap-2">
              <kbd className="bg-gray-800 px-2 py-1 rounded font-mono">↓</kbd>
              <span className="text-gray-400">Duck</span>
            </div>
            <div className="flex items-center gap-2">
              <kbd className="bg-red-700 px-2 py-1 rounded font-mono">X</kbd>
              <span className="text-red-400">Swing Bat!</span>
            </div>
            <div className="flex items-center gap-2">
              <kbd className="bg-gray-800 px-2 py-1 rounded font-mono">TAP</kbd>
              <span className="text-gray-400">Mobile</span>
            </div>
          </div>
        </div>

        <div className="mt-4 text-center">
          <span className="inline-block bg-yellow-500/20 border border-yellow-500/50 px-4 py-2 rounded text-yellow-400 font-bold text-sm">
            🏆 HIGH SCORE: {highScore}
          </span>
        </div>
      </div>
    </div>
  )
}

function GameMenu({ onStart, highScore }) {
  useEffect(() => {
    const handler = (e) => { if (e.code === 'Space') { e.preventDefault(); onStart() } }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [onStart])

  return (
    <div className="absolute inset-0 flex flex-col items-center justify-center cursor-pointer"
         style={{background: 'linear-gradient(to bottom, #1a0a0a, #000, #0a0505)'}}
         onClick={onStart}>
      <div className="absolute inset-0 overflow-hidden opacity-20">
        {[...Array(8)].map((_, i) => (
          <div key={i} className="absolute text-6xl" style={{
            left: `${10 + i * 12}%`, top: `${20 + (i % 3) * 25}%`,
            animation: 'pulse 3s infinite', animationDelay: `${i * 0.3}s`
          }}>🧟</div>
        ))}
      </div>
      
      <div className="relative z-10 text-center">
        <div className="w-28 h-28 mx-auto mb-4 rounded-full overflow-hidden border-4 border-red-600 shadow-lg shadow-red-600/50">
          <img src="/joey.jpg" alt="Joe" className="w-full h-full object-cover" />
        </div>
        
        <h2 className="text-3xl font-black text-red-500 mb-1" style={{textShadow: '0 0 20px #dc2626'}}>
          JOE'S ESCAPE
        </h2>
        <p className="text-gray-400 text-sm mb-1">Escape the mansion!</p>
        <p className="text-green-400 text-xs mb-6">🏏 Press X to swing your bat!</p>
        
        <div className="px-10 py-3 bg-red-600 font-black text-xl rounded border-b-4 border-red-800 hover:bg-red-500 transition-colors">
          ▶ START
        </div>
        
        {highScore > 0 && <p className="mt-4 text-yellow-400 text-sm">🏆 Best: {highScore}</p>}
        <p className="mt-6 text-gray-600 text-xs">SPACE or TAP to start</p>
      </div>
    </div>
  )
}

function GameOver({ score, kills, highScore, onRestart }) {
  const isRecord = score >= highScore && score > 0
  
  useEffect(() => {
    const handler = (e) => { if (e.code === 'Space') { e.preventDefault(); onRestart() } }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [onRestart])

  return (
    <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/95 cursor-pointer" onClick={onRestart}>
      <div className="text-6xl mb-3">💀</div>
      <h2 className="text-4xl font-black text-red-500 mb-4" style={{textShadow: '0 0 30px #dc2626'}}>GAME OVER</h2>
      
      {isRecord && (
        <div className="mb-4 px-6 py-2 bg-yellow-500 text-black font-black text-lg animate-bounce rounded">
          🎉 NEW RECORD! 🎉
        </div>
      )}
      
      <div className="flex gap-8 mb-6">
        <div className="text-center">
          <div className="text-4xl font-black">{score}</div>
          <div className="text-gray-500 text-xs">SCORE</div>
        </div>
        <div className="text-center">
          <div className="text-4xl font-black text-red-400">{kills}</div>
          <div className="text-gray-500 text-xs">KILLS</div>
        </div>
      </div>
      
      <div className="px-10 py-3 bg-green-600 font-black text-lg rounded border-b-4 border-green-800">
        🔄 RETRY
      </div>
    </div>
  )
}

function GameCanvas({ onGameOver }) {
  const canvasRef = useRef(null)
  
  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    let animationId
    
    // Resize canvas
    const resize = () => {
      canvas.width = canvas.parentElement.clientWidth
      canvas.height = canvas.parentElement.clientHeight
    }
    resize()
    window.addEventListener('resize', resize)

    // Game state
    const G = {
      running: true,
      score: 0,
      kills: 0,
      speed: 6,
      maxSpeed: 20,
      groundY: canvas.height - 50,
      time: 0,
      shake: 0,
      
      joe: {
        x: 80,
        y: canvas.height - 50 - 70,
        w: 45, h: 70,
        vy: 0,
        jumping: false,
        ducking: false,
        swinging: false,
        swingTime: 0,
        runFrame: 0
      },
      
      enemies: [],
      spawnTimer: 0,
      spawnRate: 90,
      
      particles: [],
      bgX: 0,
      flashes: []
    }

    // Input
    const keys = {}
    const keyDown = (e) => {
      keys[e.code] = true
      if (e.code === 'Space' || e.code === 'ArrowUp') { e.preventDefault(); jump() }
      if (e.code === 'ArrowDown') { e.preventDefault(); G.joe.ducking = true; if(G.joe.jumping) G.joe.vy = 20 }
      if (e.code === 'KeyX' || e.code === 'KeyZ') { e.preventDefault(); swing() }
    }
    const keyUp = (e) => {
      keys[e.code] = false
      if (e.code === 'ArrowDown') G.joe.ducking = false
    }
    
    const touchStart = (e) => {
      e.preventDefault()
      const x = e.touches[0].clientX - canvas.getBoundingClientRect().left
      if (x < canvas.width * 0.5) jump()
      else swing()
    }
    
    const click = (e) => {
      const x = e.clientX - canvas.getBoundingClientRect().left
      if (x < canvas.width * 0.5) jump()
      else swing()
    }

    const jump = () => {
      if (!G.joe.jumping && !G.joe.ducking) {
        G.joe.vy = -17
        G.joe.jumping = true
        dust(G.joe.x + 20, G.groundY)
      }
    }
    
    const swing = () => {
      if (!G.joe.swinging) {
        G.joe.swinging = true
        G.joe.swingTime = 0
        
        // Hit detection
        G.enemies.forEach(e => {
          if (!e.dead && e.hittable !== false) {
            const batX = G.joe.x + G.joe.w
            const batW = 60
            if (e.x < batX + batW && e.x + e.w > batX - 10 &&
                e.y < G.joe.y + G.joe.h && e.y + e.h > G.joe.y) {
              e.dead = true
              G.kills++
              G.score += 100
              G.shake = 10
              explode(e.x + e.w/2, e.y + e.h/2)
              blood(e.x + e.w/2, e.y + e.h/2)
            }
          }
        })
      }
    }

    window.addEventListener('keydown', keyDown)
    window.addEventListener('keyup', keyUp)
    canvas.addEventListener('touchstart', touchStart, {passive: false})
    canvas.addEventListener('click', click)

    // Particles
    const dust = (x, y) => {
      for (let i = 0; i < 6; i++) {
        G.particles.push({
          x, y, vx: (Math.random()-0.5)*5, vy: -Math.random()*3-1,
          size: Math.random()*5+3, life: 1, color: '#8B7355', grav: 0.15
        })
      }
    }
    
    const explode = (x, y) => {
      const colors = ['#ff4400', '#ff8800', '#ffcc00', '#fff']
      for (let i = 0; i < 25; i++) {
        const a = (Math.PI*2/25)*i
        const s = Math.random()*10+5
        G.particles.push({
          x, y, vx: Math.cos(a)*s, vy: Math.sin(a)*s - 3,
          size: Math.random()*10+5, life: 1, 
          color: colors[Math.floor(Math.random()*colors.length)], grav: 0.2
        })
      }
      G.flashes.push({x, y, size: 60, life: 1})
    }
    
    const blood = (x, y) => {
      for (let i = 0; i < 15; i++) {
        G.particles.push({
          x, y, vx: (Math.random()-0.5)*12, vy: -Math.random()*10-2,
          size: Math.random()*6+3, life: 1, color: '#8B0000', grav: 0.3
        })
      }
    }

    // Spawn enemies
    const spawn = () => {
      const r = Math.random()
      let enemy
      
      if (r < 0.4) {
        // Zombie
        enemy = { type: 'zombie', x: canvas.width + 20, y: G.groundY - 65, w: 40, h: 65, hittable: true }
      } else if (r < 0.6) {
        // Zombie Dog
        enemy = { type: 'dog', x: canvas.width + 20, y: G.groundY - 35, w: 55, h: 35, hittable: true }
      } else if (r < 0.75) {
        // Crawler
        enemy = { type: 'crawler', x: canvas.width + 20, y: G.groundY - 30, w: 50, h: 30, hittable: true }
      } else if (r < 0.85) {
        // Flying bat creature
        enemy = { type: 'bat', x: canvas.width + 20, y: G.groundY - 120 - Math.random()*40, w: 45, h: 30, hittable: true }
      } else {
        // Barrel (jump over, can't hit)
        enemy = { type: 'barrel', x: canvas.width + 20, y: G.groundY - 45, w: 35, h: 45, hittable: false }
      }
      
      enemy.frame = 0
      enemy.dead = false
      G.enemies.push(enemy)
    }

    // Draw zombie
    const drawZombie = (ctx, e) => {
      const x = e.x, y = e.y
      ctx.save()
      
      // Body - tattered clothes
      ctx.fillStyle = '#4a5568'
      ctx.fillRect(x + 12, y + 20, 18, 28)
      
      // Legs
      const legAnim = Math.sin(G.time * 0.15 + e.frame) * 5
      ctx.fillStyle = '#2d3748'
      ctx.fillRect(x + 12, y + 45, 7, 20 + legAnim)
      ctx.fillRect(x + 23, y + 45, 7, 20 - legAnim)
      
      // Arms - reaching forward
      ctx.fillStyle = '#9cb'
      ctx.save()
      ctx.translate(x + 30, y + 25)
      ctx.rotate(Math.sin(G.time * 0.1) * 0.3 - 0.5)
      ctx.fillRect(0, 0, 20, 6)
      ctx.restore()
      ctx.save()
      ctx.translate(x + 30, y + 33)
      ctx.rotate(Math.sin(G.time * 0.1 + 1) * 0.3 - 0.3)
      ctx.fillRect(0, 0, 18, 6)
      ctx.restore()
      
      // Head
      ctx.fillStyle = '#9ca'
      ctx.beginPath()
      ctx.arc(x + 20, y + 12, 11, 0, Math.PI * 2)
      ctx.fill()
      
      // Blood stains
      ctx.fillStyle = '#8B0000'
      ctx.fillRect(x + 14, y + 25, 4, 8)
      ctx.fillRect(x + 22, y + 30, 5, 6)
      ctx.beginPath()
      ctx.arc(x + 18, y + 8, 3, 0, Math.PI * 2)
      ctx.fill()
      
      // Eyes - white/dead
      ctx.fillStyle = '#fff'
      ctx.beginPath()
      ctx.arc(x + 16, y + 11, 3, 0, Math.PI * 2)
      ctx.arc(x + 24, y + 11, 3, 0, Math.PI * 2)
      ctx.fill()
      
      // Mouth
      ctx.fillStyle = '#400'
      ctx.fillRect(x + 15, y + 17, 10, 3)
      
      ctx.restore()
    }

    // Draw zombie dog
    const drawDog = (ctx, e) => {
      const x = e.x, y = e.y
      ctx.save()
      
      // Body
      ctx.fillStyle = '#654'
      ctx.fillRect(x + 5, y + 8, 40, 18)
      
      // Legs
      const anim = Math.sin(G.time * 0.2) * 6
      ctx.fillRect(x + 8, y + 22, 5, 13 + anim)
      ctx.fillRect(x + 18, y + 22, 5, 13 - anim)
      ctx.fillRect(x + 32, y + 22, 5, 13 + anim)
      ctx.fillRect(x + 42, y + 22, 5, 13 - anim)
      
      // Head
      ctx.fillStyle = '#765'
      ctx.beginPath()
      ctx.ellipse(x + 50, y + 12, 10, 8, 0, 0, Math.PI * 2)
      ctx.fill()
      
      // Snout
      ctx.fillRect(x + 52, y + 10, 12, 6)
      
      // Eye
      ctx.fillStyle = '#f00'
      ctx.beginPath()
      ctx.arc(x + 52, y + 9, 2, 0, Math.PI * 2)
      ctx.fill()
      
      // Blood/wounds
      ctx.fillStyle = '#800'
      ctx.fillRect(x + 20, y + 10, 8, 4)
      ctx.fillRect(x + 35, y + 14, 6, 5)
      
      ctx.restore()
    }

    // Draw crawler
    const drawCrawler = (ctx, e) => {
      const x = e.x, y = e.y
      ctx.save()
      
      // Body - low to ground
      ctx.fillStyle = '#8a9'
      ctx.fillRect(x + 5, y + 10, 40, 15)
      
      // Head
      ctx.beginPath()
      ctx.arc(x + 48, y + 15, 10, 0, Math.PI * 2)
      ctx.fill()
      
      // Arms dragging
      const drag = Math.sin(G.time * 0.15) * 4
      ctx.fillRect(x + 40 + drag, y + 18, 15, 5)
      ctx.fillRect(x + 38 - drag, y + 22, 15, 5)
      
      // Blood trail effect
      ctx.fillStyle = '#600'
      ctx.globalAlpha = 0.5
      ctx.fillRect(x - 10, y + 25, 20, 3)
      ctx.globalAlpha = 1
      
      // Eyes
      ctx.fillStyle = '#ff0'
      ctx.beginPath()
      ctx.arc(x + 46, y + 13, 2, 0, Math.PI * 2)
      ctx.arc(x + 52, y + 13, 2, 0, Math.PI * 2)
      ctx.fill()
      
      ctx.restore()
    }

    // Draw bat
    const drawBat = (ctx, e) => {
      const x = e.x, y = e.y + Math.sin(G.time * 0.2 + e.frame) * 8
      ctx.save()
      
      // Wings
      ctx.fillStyle = '#432'
      const wing = Math.sin(G.time * 0.3) * 15
      ctx.beginPath()
      ctx.moveTo(x + 22, y + 15)
      ctx.lineTo(x - 5, y + 5 + wing)
      ctx.lineTo(x + 5, y + 20)
      ctx.fill()
      ctx.beginPath()
      ctx.moveTo(x + 22, y + 15)
      ctx.lineTo(x + 50, y + 5 - wing)
      ctx.lineTo(x + 40, y + 20)
      ctx.fill()
      
      // Body
      ctx.fillStyle = '#321'
      ctx.beginPath()
      ctx.ellipse(x + 22, y + 15, 10, 8, 0, 0, Math.PI * 2)
      ctx.fill()
      
      // Eyes
      ctx.fillStyle = '#f00'
      ctx.beginPath()
      ctx.arc(x + 18, y + 13, 2, 0, Math.PI * 2)
      ctx.arc(x + 26, y + 13, 2, 0, Math.PI * 2)
      ctx.fill()
      
      ctx.restore()
      e.y = y // update for collision
    }

    // Draw barrel
    const drawBarrel = (ctx, e) => {
      ctx.save()
      ctx.fillStyle = '#654'
      ctx.fillRect(e.x + 5, e.y, e.w - 10, e.h)
      ctx.fillStyle = '#876'
      ctx.fillRect(e.x + 8, e.y + 5, e.w - 16, 4)
      ctx.fillRect(e.x + 8, e.y + e.h - 10, e.w - 16, 4)
      ctx.fillStyle = '#ff0'
      ctx.font = 'bold 14px Arial'
      ctx.fillText('☣', e.x + 10, e.y + 30)
      ctx.restore()
    }

    // Draw Joe
    const drawJoe = (ctx, joe) => {
      const x = joe.x, y = joe.y
      ctx.save()
      
      const ducking = joe.ducking
      const h = ducking ? 40 : 70
      
      // TRACKSUIT - Green like in photo!
      const trackColor = '#2d5a47'
      const trackLight = '#3d7a5f'
      
      if (ducking) {
        // Ducking pose
        ctx.fillStyle = trackColor
        ctx.fillRect(x + 5, y + 25, 35, 20)
        
        // Head (forward)
        ctx.fillStyle = '#e8d0b8'
        ctx.beginPath()
        ctx.arc(x + 38, y + 25, 12, 0, Math.PI * 2)
        ctx.fill()
        
        // Cap
        ctx.fillStyle = '#c9a868'
        ctx.beginPath()
        ctx.arc(x + 38, y + 22, 11, Math.PI, 0)
        ctx.fill()
        ctx.fillRect(x + 38, y + 18, 15, 6)
        
      } else {
        // Running animation
        const run = Math.sin(joe.runFrame * 0.4) 
        
        // Torso
        ctx.fillStyle = trackColor
        ctx.fillRect(x + 10, y + 20, 25, 32)
        
        // Zipper line
        ctx.fillStyle = '#222'
        ctx.fillRect(x + 21, y + 20, 3, 32)
        
        // Legs
        ctx.fillStyle = trackColor
        const legL = joe.jumping ? -5 : run * 12
        const legR = joe.jumping ? 5 : -run * 12
        
        ctx.save()
        ctx.translate(x + 14, y + 50)
        ctx.rotate(legL * 0.05)
        ctx.fillRect(-4, 0, 9, 22)
        ctx.restore()
        
        ctx.save()
        ctx.translate(x + 28, y + 50)
        ctx.rotate(legR * 0.05)
        ctx.fillRect(-4, 0, 9, 22)
        ctx.restore()
        
        // Shoes - white New Balance style
        ctx.fillStyle = '#f5f5f5'
        ctx.fillRect(x + 8 + legL, y + 65, 12, 6)
        ctx.fillRect(x + 22 + legR, y + 65, 12, 6)
        ctx.fillStyle = '#333'
        ctx.font = '6px Arial'
        ctx.fillText('N', x + 11 + legL, y + 70)
        ctx.fillText('N', x + 25 + legR, y + 70)
        
        // Arms
        ctx.fillStyle = trackColor
        const armSwing = joe.jumping ? 0 : run * 10
        
        // Bat arm (right) - or swinging
        if (joe.swinging) {
          const swingAngle = Math.min(joe.swingTime * 0.4, Math.PI * 0.7)
          ctx.save()
          ctx.translate(x + 35, y + 28)
          ctx.rotate(-Math.PI/4 + swingAngle)
          // Arm
          ctx.fillStyle = trackColor
          ctx.fillRect(0, -4, 18, 8)
          // Bat
          ctx.fillStyle = '#8B4513'
          ctx.fillRect(16, -6, 35, 10)
          ctx.fillStyle = '#654321'
          ctx.fillRect(16, -6, 8, 10)
          ctx.restore()
        } else {
          // Normal arm with bat
          ctx.save()
          ctx.translate(x + 35, y + 28)
          ctx.rotate(-0.3 + armSwing * 0.02)
          ctx.fillRect(0, -4, 15, 8)
          // Bat on shoulder
          ctx.fillStyle = '#8B4513'
          ctx.fillRect(10, -15, 6, 25)
          ctx.restore()
        }
        
        // Left arm
        ctx.save()
        ctx.fillStyle = trackColor
        ctx.translate(x + 10, y + 28)
        ctx.rotate(armSwing * 0.05)
        ctx.fillRect(-12, -4, 14, 8)
        ctx.restore()
        
        // Head
        ctx.fillStyle = '#e8d0b8'
        ctx.beginPath()
        ctx.arc(x + 22, y + 12, 13, 0, Math.PI * 2)
        ctx.fill()
        
        // Beard - grey
        ctx.fillStyle = '#888'
        ctx.beginPath()
        ctx.arc(x + 22, y + 18, 10, 0.2, Math.PI - 0.2)
        ctx.fill()
        ctx.fillRect(x + 14, y + 14, 16, 8)
        
        // Cap - tan
        ctx.fillStyle = '#c9a868'
        ctx.beginPath()
        ctx.arc(x + 22, y + 8, 12, Math.PI, 0)
        ctx.fill()
        // Brim
        ctx.fillRect(x + 20, y + 4, 18, 5)
        
        // Eyes
        ctx.fillStyle = '#444'
        ctx.beginPath()
        ctx.arc(x + 18, y + 10, 2, 0, Math.PI * 2)
        ctx.arc(x + 26, y + 10, 2, 0, Math.PI * 2)
        ctx.fill()
      }
      
      ctx.restore()
    }

    // Main loop
    const loop = () => {
      if (!G.running) return
      
      G.time++
      G.bgX += G.speed
      
      // Speed up over time
      if (G.time % 300 === 0 && G.speed < G.maxSpeed) {
        G.speed += 0.5
        G.spawnRate = Math.max(40, G.spawnRate - 3)
      }
      
      // Update Joe
      const joe = G.joe
      joe.vy += 0.8
      joe.y += joe.vy
      
      const groundLevel = G.groundY - (joe.ducking ? 40 : 70)
      if (joe.y >= groundLevel) {
        joe.y = groundLevel
        joe.vy = 0
        joe.jumping = false
      }
      
      if (!joe.jumping && !joe.ducking) joe.runFrame++
      
      if (joe.swinging) {
        joe.swingTime++
        if (joe.swingTime > 15) joe.swinging = false
      }
      
      // Spawn
      G.spawnTimer++
      if (G.spawnTimer >= G.spawnRate) {
        spawn()
        G.spawnTimer = 0
      }
      
      // Update enemies
      for (let i = G.enemies.length - 1; i >= 0; i--) {
        const e = G.enemies[i]
        e.x -= G.speed
        e.frame++
        
        if (e.dead) {
          e.deadTime = (e.deadTime || 0) + 1
          if (e.deadTime > 20) G.enemies.splice(i, 1)
          continue
        }
        
        // Collision with Joe
        const jh = joe.ducking ? 40 : 70
        if (e.x < joe.x + joe.w - 10 && e.x + e.w > joe.x + 10 &&
            e.y < joe.y + jh - 5 && e.y + e.h > joe.y + 5) {
          G.running = false
          explode(joe.x + joe.w/2, joe.y + jh/2)
          setTimeout(() => onGameOver(G.score, G.kills), 800)
        }
        
        // Off screen
        if (e.x < -100) {
          G.enemies.splice(i, 1)
          G.score += 10
        }
      }
      
      // Update particles
      for (let i = G.particles.length - 1; i >= 0; i--) {
        const p = G.particles[i]
        p.x += p.vx
        p.y += p.vy
        p.vy += p.grav || 0.2
        p.life -= 0.025
        if (p.life <= 0) G.particles.splice(i, 1)
      }
      
      // Update flashes
      for (let i = G.flashes.length - 1; i >= 0; i--) {
        G.flashes[i].life -= 0.1
        if (G.flashes[i].life <= 0) G.flashes.splice(i, 1)
      }
      
      // Screen shake
      if (G.shake > 0) G.shake--
      
      // === DRAW ===
      ctx.save()
      if (G.shake > 0) {
        ctx.translate((Math.random()-0.5)*G.shake, (Math.random()-0.5)*G.shake)
      }
      
      // Sky gradient
      const sky = ctx.createLinearGradient(0, 0, 0, canvas.height)
      sky.addColorStop(0, '#0a0808')
      sky.addColorStop(0.4, '#1a0a0a')
      sky.addColorStop(1, '#2a0a05')
      ctx.fillStyle = sky
      ctx.fillRect(0, 0, canvas.width, canvas.height)
      
      // Moon
      ctx.fillStyle = '#ffeecc'
      ctx.globalAlpha = 0.8
      ctx.beginPath()
      ctx.arc(canvas.width - 70, 50, 30, 0, Math.PI * 2)
      ctx.fill()
      ctx.globalAlpha = 1
      
      // Mansion silhouette
      ctx.fillStyle = '#0a0505'
      const mx = ((canvas.width - G.bgX * 0.05) % (canvas.width + 400)) - 100
      ctx.fillRect(mx, G.groundY - 150, 180, 150)
      ctx.fillRect(mx + 50, G.groundY - 200, 50, 50)
      ctx.beginPath()
      ctx.moveTo(mx - 10, G.groundY - 150)
      ctx.lineTo(mx + 90, G.groundY - 180)
      ctx.lineTo(mx + 190, G.groundY - 150)
      ctx.fill()
      
      // Fire glow on mansion
      ctx.fillStyle = 'rgba(255,100,0,0.3)'
      ctx.beginPath()
      ctx.arc(mx + 90, G.groundY - 120, 40 + Math.sin(G.time*0.1)*10, 0, Math.PI * 2)
      ctx.fill()
      
      // Trees
      ctx.fillStyle = '#050303'
      for (let i = 0; i < 6; i++) {
        const tx = ((i * 180 - G.bgX * 0.3) % (canvas.width + 200)) - 50
        ctx.beginPath()
        ctx.moveTo(tx, G.groundY)
        ctx.lineTo(tx + 12, G.groundY - 60)
        ctx.lineTo(tx + 24, G.groundY)
        ctx.fill()
      }
      
      // Ground
      ctx.fillStyle = '#1a0f0a'
      ctx.fillRect(0, G.groundY, canvas.width, 60)
      ctx.fillStyle = '#0f0805'
      for (let i = 0; i < canvas.width + 30; i += 30) {
        ctx.fillRect(i - (G.bgX % 30), G.groundY, 2, 60)
      }
      
      // Enemies
      G.enemies.forEach(e => {
        if (e.dead) {
          ctx.globalAlpha = 0.5
        }
        if (e.type === 'zombie') drawZombie(ctx, e)
        else if (e.type === 'dog') drawDog(ctx, e)
        else if (e.type === 'crawler') drawCrawler(ctx, e)
        else if (e.type === 'bat') drawBat(ctx, e)
        else if (e.type === 'barrel') drawBarrel(ctx, e)
        ctx.globalAlpha = 1
      })
      
      // Joe
      drawJoe(ctx, joe)
      
      // Particles
      G.particles.forEach(p => {
        ctx.globalAlpha = p.life
        ctx.fillStyle = p.color
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.size * p.life, 0, Math.PI * 2)
        ctx.fill()
      })
      ctx.globalAlpha = 1
      
      // Flashes
      G.flashes.forEach(f => {
        const grad = ctx.createRadialGradient(f.x, f.y, 0, f.x, f.y, f.size * f.life)
        grad.addColorStop(0, `rgba(255,255,200,${f.life})`)
        grad.addColorStop(1, 'rgba(255,100,0,0)')
        ctx.fillStyle = grad
        ctx.beginPath()
        ctx.arc(f.x, f.y, f.size * f.life, 0, Math.PI * 2)
        ctx.fill()
      })
      
      // UI
      ctx.fillStyle = '#fff'
      ctx.font = 'bold 20px Arial'
      ctx.fillText(`SCORE: ${G.score}`, 15, 30)
      ctx.fillStyle = '#f44'
      ctx.fillText(`KILLS: ${G.kills}`, 15, 55)
      ctx.fillStyle = '#ff0'
      ctx.font = '14px Arial'
      ctx.fillText(`SPEED: ${G.speed.toFixed(1)}x`, 15, 75)
      
      ctx.restore()
      
      animationId = requestAnimationFrame(loop)
    }
    
    loop()
    
    return () => {
      G.running = false
      cancelAnimationFrame(animationId)
      window.removeEventListener('resize', resize)
      window.removeEventListener('keydown', keyDown)
      window.removeEventListener('keyup', keyUp)
      canvas.removeEventListener('touchstart', touchStart)
      canvas.removeEventListener('click', click)
    }
  }, [onGameOver])

  return <canvas ref={canvasRef} className="w-full h-full" style={{touchAction: 'none'}} />
}
