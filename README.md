# 🎬 Joe Whyte Fan Zone

Official fan site for **Joe Whyte** - Voice Actor, Disney Animator, Gaming Icon, and Comedy Legend.

Built with a Marvel-inspired design featuring bold typography, dynamic animations, and interactive elements.

## 🚀 Quick Deploy to Vercel

1. Push this code to a GitHub repository
2. Go to [vercel.com](https://vercel.com)
3. Click "Import Project" → Select your GitHub repo
4. **Add Environment Variables** (see below)
5. Vercel auto-detects Vite - click Deploy!
6. Your site is live! 🎉

## 🔐 Admin Login Setup

Set these environment variables in Vercel:

1. Go to your Vercel project → **Settings** → **Environment Variables**
2. Add:
   - `VITE_ADMIN_USER` = your_username
   - `VITE_ADMIN_PASS` = your_secure_password
3. Click **Redeploy** for changes to take effect

**Default credentials:** admin / joewhyte2026

## 📱 Features

### Pages
- **HOME** - Hero section, events, stats, quick links
- **CREDITS** - Career achievements (Disney, Gaming, Other, Comedy)
- **ART** - Gallery of Joe's CG modeling work
- **SOCIAL** - Instagram, YouTube, Facebook feeds
- **FAN ZONE** - Message board with admin moderation
- **ABOUT** - Bio and personal info
- **ADMIN** - Dashboard for site management

### Admin Features
- ✅ Reply to fan messages
- ✅ Delete inappropriate content
- ✅ Ban users from posting
- ✅ View pending submissions

## 📁 Project Structure

```
joe-whyte-fansite/
├── public/
│   ├── data/
│   │   ├── events.json      ← Your events
│   │   └── messages.json    ← Approved fan messages
│   └── favicon.svg
├── src/
│   ├── App.jsx              ← Main site
│   ├── main.jsx
│   └── index.css
├── index.html
├── package.json
├── vite.config.js
├── tailwind.config.js
└── README.md
```

## 📅 Managing Events

Edit `public/data/events.json` on GitHub:

```json
{
  "id": 1,
  "name": "Event Name",
  "type": "convention",
  "date": "2026-06-15",
  "time": "2:00 PM",
  "venue": "Venue Name",
  "city": "City, State",
  "description": "Description",
  "ticketUrl": "https://..."
}
```

**Event Types:** `convention`, `comedy`, `signing`, `panel`, `appearance`, `other`

## 💬 Message Board

Fan messages flow:
1. Fan submits message → Email notification to Joe
2. Joe approves → Adds to `messages.json` via GitHub
3. Joe can reply → Add `adminReply` field

Message format:
```json
{
  "id": 1,
  "name": "FanName",
  "message": "Message text...",
  "date": "2026-03-01",
  "adminReply": "Joe's reply...",
  "replyDate": "2026-03-02"
}
```

## 📱 Social Links

Update social links in `src/App.jsx`:

```javascript
const SOCIAL_LINKS = {
  instagram: "https://www.instagram.com/joewhyte",
  facebook: "https://www.facebook.com/joewhyte",
  youtube: "https://www.youtube.com/@joewhyte",
  imdb: "https://www.imdb.com/name/nm0926679/",
  website: "https://www.whytenoise.com/"
}
```

## 🛠️ Local Development

```bash
# Install dependencies
npm install

# Run dev server
npm run dev

# Build for production
npm run build

# Preview build
npm run preview
```

## 🎨 Design Features

- **Marvel-inspired** bold typography and colors
- **Comic-style** halftone patterns and diagonal accents
- **Dynamic animations** with hover effects
- **Skewed elements** for visual interest
- **Red/black/white** color scheme
- **Responsive** design for all devices

## 🔗 External Links

- [Joe's IMDb](https://www.imdb.com/name/nm0926679/)
- [Joe's Wikipedia](https://en.wikipedia.org/wiki/Joe_Whyte)
- [WhyteNoise.com](https://www.whytenoise.com/)

## 📝 License

Made with 💖 for Uncle Joe's fans!
