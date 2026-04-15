# Omer Counting Game 🌾

A collaborative web-based game for tracking daily Omer counting during the 49 days between Pesach and Shavuot.

**Live Demo:** [https://tomerhacohen.github.io/omer-counting-game/](https://tomerhacohen.github.io/omer-counting-game/)

## Features ✨

- 📅 **Daily Check-ins** - Count the Omer each day with Hebrew blessings
- 👨‍👩‍👧‍👦 **Multiplayer** - See your family's progress in real-time
- 🌾 **Wheat Collection** - Collect wheat emojis (7 wheats = 1 sheaf)
- 🎯 **Catch-up System** - Special catch-up windows for Shabbat and the 7th day of Pesach
- 📱 **Mobile Friendly** - Responsive design for all devices
- 🔄 **Auto-Sync** - Data syncs to Google Sheets every 60 seconds
- 🎨 **Visual Themes** - Calendar changes from Egypt (Pesach) to Torah (Shavuot)

## Quick Start (For Users) 🎮

### Using an Existing Deployment

If someone shared a game link with you:

1. **Click the link** they provided (should include `?deployId=...`)
2. **Register** with your name, gender, and emoji
3. **Start counting!** Click the check-in button each day

### Using the Public Deployment

1. **Get a Deployment ID:**
   - Create your own Google Sheet ([see below](#deployment-for-groups))
   - Deploy the Apps Script
   - Copy your Deployment ID

2. **Open the game with your ID:**
   ```
   https://tomerhacohen.github.io/omer-counting-game/?deployId=YOUR_DEPLOYMENT_ID
   ```

3. **Share with your group** - Everyone uses the same link!

---

## Deployment (For Groups) 🚀

Want to set up the game for your own family/group? **No coding or website hosting needed!**

### Step 1: Create Your Google Sheet

1. Go to [Google Sheets](https://sheets.google.com)
2. Create a new blank spreadsheet
3. Name it: "Omer Counting Game 2026"

### Step 2: Deploy Apps Script

1. In your Google Sheet: **Extensions → Apps Script**
2. Copy the code from [`omer-game-apps-script.js`](omer-game-apps-script.js)
3. Paste it into the Apps Script editor (replace existing code)
4. **Update the Sheet ID** (line ~25):
   ```javascript
   const SHEET_ID = 'YOUR_SHEET_ID_HERE';
   ```
   - Get your Sheet ID from your Google Sheet URL:
   - `https://docs.google.com/spreadsheets/d/[THIS_IS_YOUR_SHEET_ID]/edit`

5. Click **Save** (💾)

6. **Deploy as Web App:**
   - Click **Deploy → New deployment**
   - Click ⚙️ → Select **Web app**
   - Settings:
     - **Execute as:** Me
     - **Who has access:** Anyone
   - Click **Deploy**
   - Click **Authorize access** (you may see a warning - click "Advanced" → "Go to project")

7. **Copy the Deployment ID:**
   - You'll get a URL like: `https://script.google.com/macros/s/AKfycby.../exec`
   - **Copy just the ID part** (between `/s/` and `/exec`): `AKfycby...`

### Step 3: Share with Your Group

Share this link with everyone:
```
https://tomerhacohen.github.io/omer-counting-game/?deployId=YOUR_DEPLOYMENT_ID
```

**That's it!** Everyone uses the same link, and all data saves to your private Google Sheet.

---

## How It Works 🔄

```
User Opens Game
     ↓
Checks for Deployment ID
     ↓
   Found?
   ├─ Yes → Load game, sync to Google Sheet
   └─ No  → Show setup modal with instructions
```

### Deployment ID Priority

The game checks for a Deployment ID in this order:

1. **URL Parameter** (`?deployId=ABC123`) - Highest priority
2. **Settings** (saved in localStorage via ⚙️ button)
3. **None** → Show setup modal

### Privacy & Security 🔒

- ✅ No hardcoded deployment ID (your Google Sheet is private)
- ✅ Each group must provide their own Deployment ID
- ✅ Data stored only in your Google Sheet (you control it)
- ✅ No external servers or tracking
- ✅ Family-friendly, no authentication needed

---

## Advanced: Deploy Your Own Website

Want to customize the code or host it yourself? See the [Full Deployment Guide](DEPLOYMENT-GUIDE.md).

### Quick Deploy to GitHub Pages

1. Fork this repository
2. Edit `index.html` if you want to hardcode a deployment ID (optional)
3. Enable GitHub Pages in Settings → Pages → Source: `main` branch
4. Your game: `https://YOUR-USERNAME.github.io/omer-counting-game/`

### Deploy to Netlify

1. Create account at [Netlify](https://netlify.com)
2. Drag and drop `index.html` to [Netlify Drop](https://app.netlify.com/drop)
3. Instant deployment!

---

## File Structure 📁

```
omer-counting-game/
├── index.html                   # Main game file (standalone, works offline)
├── omer-counting-game.html      # Backup copy of game
├── omer-game-apps-script.js     # Google Apps Script backend
├── DEPLOYMENT-GUIDE.md          # Detailed deployment instructions
├── OMER-GAME-SETUP.md           # Game features and setup guide
├── QUICK-START.md               # Quick reference guide
├── CONFIG.md                    # Personal deployment config (not in git)
└── README.md                    # This file
```

---

## Documentation 📚

- **[DEPLOYMENT-GUIDE.md](DEPLOYMENT-GUIDE.md)** - Complete deployment walkthrough
- **[OMER-GAME-SETUP.md](OMER-GAME-SETUP.md)** - Game features and usage guide
- **[QUICK-START.md](QUICK-START.md)** - Quick reference

---

## Technical Details 🔧

- **Single HTML File** - No dependencies, works offline
- **Size:** ~115KB (pure HTML/CSS/JavaScript)
- **Browser Support:** Chrome 90+, Safari 14+, Firefox 88+
- **Mobile:** iOS 14+, Android 10+
- **Storage:** localStorage + Google Sheets
- **Sync:** Every 60 seconds (configurable)

---

## Game Rules 📖

### Daily Check-in

1. Click **בירכתי!** (I blessed!) button
2. See the blessing text with correct Omer count
3. Click **אישור - בירכתי!** (Confirm)
4. Your emoji appears on the calendar 🎉
5. Collect wheat emojis!

### Wheat Collection System 🌾

- **1 check-in** = 1 wheat emoji 🌾
- **7 wheats** = 1 sheaf (larger 🌾)
- **Example:** 24 check-ins = 3 sheaves + 3 wheats

Displayed below your name in the top-right corner.

### Catch-up Windows

**Shabbat Catch-up:**
- Available: Saturday after tzeit → Monday before tzeit
- Catch up on missed Shabbat day

**7th Day of Pesach Catch-up:**
- Available: Anytime after day 6
- Shows until you respond
- Message: "בשביעי של פסח היה 6 ימים לעומר"

### Calendar

- **49 days** = 7 weeks (7×7 grid)
- **Start:** Bottom-right (day 1)
- **Progress:** Right-to-left, bottom-to-top
- **Current day:** Gold border
- **Future days:** Show wheat emoji 🌾

---

## Important Dates 📅

- **Omer Start:** April 3, 2026 (16 Nisan 5786)
- **Omer End:** May 21, 2026 (5 Sivan 5786)
- **Duration:** 49 days (7 weeks)

---

## Troubleshooting 🔧

### "Setup Modal Appears"

You need to provide a Deployment ID:

**Option 1 (Recommended):** Add to URL
```
?deployId=YOUR_DEPLOYMENT_ID
```

**Option 2:** Click ⚙️ Settings and enter the Deployment ID

### "Players Not Syncing"

1. Check that all family members use the **same** Deployment ID
2. Verify Google Sheet has proper permissions ("Anyone" access)
3. Wait 60 seconds (auto-sync interval)
4. Refresh the page

---

## Contributing 🤝

This is a family project, but suggestions and bug reports are welcome!

1. Open an issue for bugs or feature requests
2. Fork and submit pull requests
3. Share your deployment experience

---

## License 📄

Created for family Omer counting with love 💙

Free to use and modify for personal, family, and community use.

---

## Credits 👏

- Original concept and development
- Built with ❤️ for Pesach to Shavuot counting
- Powered by Google Sheets for data sync
- Enhanced with Claude Code

---

**Chag Pesach Sameach! חג פסח שמח** 🌾✨

---

## Support 💬

If you encounter issues:

1. Check [DEPLOYMENT-GUIDE.md](DEPLOYMENT-GUIDE.md) for detailed instructions
2. Review [OMER-GAME-SETUP.md](OMER-GAME-SETUP.md) for game features
3. Open an issue on GitHub
4. Check browser console (F12) for error messages

---

**Quick Links:**
- 🎮 [Live Demo](https://tomerhacohen.github.io/omer-counting-game/)
- 📖 [Deployment Guide](DEPLOYMENT-GUIDE.md)
- 🚀 [Quick Start](QUICK-START.md)
- ⚙️ [Setup Guide](OMER-GAME-SETUP.md)
