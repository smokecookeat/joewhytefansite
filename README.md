# Joe Whyte Fan Zone 🎤

Official fan site for Joe Whyte - Voice Actor, Disney Animator, Gaming Icon, and Comedy Legend.

## 🚀 Quick Deploy to Vercel

1. Push this code to a GitHub repository
2. Go to [vercel.com](https://vercel.com)
3. Click "Import Project" → Select your GitHub repo
4. **Add Environment Variables** (see below)
5. Vercel auto-detects Vite - click Deploy!
6. Your site is live! 🎉

## 🔐 Admin Login Setup

Set these environment variables in Vercel to secure your admin panel:

1. Go to your Vercel project → **Settings** → **Environment Variables**
2. Add:
   - `VITE_ADMIN_USER` = your_username
   - `VITE_ADMIN_PASS` = your_secure_password
3. Click **Redeploy** for changes to take effect

**Default credentials (if env vars not set):** admin / joewhyte2026

## 📁 Project Structure

```
joe-whyte-fansite/
├── public/
│   ├── data/
│   │   ├── events.json      ← Your events
│   │   └── messages.json    ← Approved fan messages
│   └── favicon.svg
├── src/
│   ├── App.jsx              ← Main site (email config at top)
│   ├── main.jsx
│   └── index.css
├── index.html
├── package.json
└── README.md
```

## 📅 Managing Events

Events are stored in `public/data/events.json`. To add/edit events:

1. Go to your GitHub repository
2. Navigate to `public/data/events.json`
3. Click the pencil icon to edit
4. Add or modify events
5. Commit changes - Vercel auto-deploys!

### Event Format

```json
{
  "id": 1,
  "name": "Event Name",
  "type": "convention",
  "date": "2026-06-15",
  "time": "2:00 PM - 4:00 PM",
  "venue": "Venue Name",
  "city": "City, State",
  "description": "Description of the event",
  "ticketUrl": "https://link-to-tickets.com"
}
```

**Event Types:** `convention`, `comedy`, `signing`, `panel`, `appearance`, `other`

## 💬 Message Board

The Fan Message Board allows fans to leave messages for Joe.

### How It Works:
1. **Fans submit messages** → Triggers email notification to Joe
2. **Messages await review** → Stored in pending state
3. **Joe approves** → Adds message to `messages.json` via GitHub
4. **Joe can reply** → Add `adminReply` field to messages

### Admin Features (when logged in):
- **Reply** to fan messages
- **Delete** inappropriate content
- **Ban** users from posting
- View pending submissions

### Message Format (in messages.json):

```json
{
  "id": 1,
  "name": "FanName",
  "message": "Fan's message here...",
  "date": "2026-03-01",
  "adminReply": "Joe's reply here...",
  "replyDate": "2026-03-02"
}
```

Set `adminReply` to `null` if no reply yet.

## ✉️ Email Signups

When fans subscribe, they're prompted to send an email to Joe directly. 

**To change the email address:**
1. Open `src/App.jsx`
2. Find `const JOE_EMAIL = "joe@whytenoise.com"` at the top
3. Change to your preferred email
4. Commit and push

## 🛠️ Local Development

```bash
# Install dependencies
npm install

# Run dev server
npm run dev

# Build for production
npm run build
```

## 🔗 External Links

- [Joe's IMDb](https://www.imdb.com/name/nm0926679/)
- [Joe's Wikipedia](https://en.wikipedia.org/wiki/Joe_Whyte)
- [WhyteNoise.com](https://www.whytenoise.com/)

## 📝 License

Made with 💖 for Uncle Joe's fans!
