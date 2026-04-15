# Omer Counting Game - Deployment Guide 🚀

## For Most Users: Use the Existing Deployment 🎯

**No coding or website deployment needed!** Use the official game deployment with your own Google Sheet:

### Quick Setup (2 Steps)

1. **Create Your Google Sheet & Deploy Apps Script** (see Step 1 below)
2. **Share this link with your group:**
   ```
   https://tomerhacohen.github.io/omer-counting-game/?deployId=YOUR_DEPLOYMENT_ID
   ```
   Replace `YOUR_DEPLOYMENT_ID` with your Apps Script Deployment ID from Step 1

**That's it!** Everyone in your group uses the same link, and all data goes to your private Google Sheet.

---

## For Advanced Users: Deploy Your Own Copy 🔧

Only needed if you want to customize the code or host it yourself.

### Full Setup (3 Steps)

### Step 1: Create & Configure Google Sheet ⚙️

1. **Create a new Google Sheet**
   - Go to https://sheets.google.com
   - Click "Blank" to create a new spreadsheet
   - Name it: "Omer Counting Game 2026" (or any name you prefer)

2. **Open Apps Script**
   - Go to Extensions → Apps Script

3. **Paste the code**
   - Copy all code from `omer-game-apps-script.js`
   - Paste into the Apps Script editor (replace any existing code)
   - Click Save (💾)

4. **Update the Sheet ID**
   - In the Apps Script code, find line ~25:
     ```javascript
     const SHEET_ID = 'YOUR_SHEET_ID_HERE';
     ```
   - Get your Sheet ID from the URL of your Google Sheet:
     `https://docs.google.com/spreadsheets/d/[THIS_IS_YOUR_SHEET_ID]/edit`
   - Replace `'YOUR_SHEET_ID_HERE'` with your actual Sheet ID
   - Click Save (💾)

5. **Initialize the sheet headers** (optional but recommended)
   - In Apps Script, find the `initializeSheet()` function
   - Click Run (▶️) to execute it
   - This creates headers: Name, Gender, Emoji, Day 1, Day 2, ..., Day 49
   - Or you can let the game create them automatically on first player registration

4. **Deploy as Web App**
   - Click Deploy → New deployment
   - Click ⚙️ next to "Select type" → Choose "Web app"
   - Settings:
     - **Description**: "Omer Game API"
     - **Execute as**: Me
     - **Who has access**: Anyone
   - Click "Deploy"
   - Click "Authorize access" (you may see a warning - click "Advanced" → "Go to project")

5. **Copy the Deployment ID**
   - You'll get a URL like: `https://script.google.com/macros/s/AKfycby.../exec`
   - **Copy just the ID part** (between `/s/` and `/exec`): `AKfycby...`
   - This is your **Deployment ID** - you'll need it in Step 2!

---

### Step 2: Choose Your Configuration Method 📝

You have **two options** for connecting your game to Google Sheets:

#### **Option A: URL Parameter** (⭐ Easiest - No code editing!)

Simply add your Deployment ID to the game URL:

```
https://your-game.com/?deployId=YOUR_DEPLOYMENT_ID
```

**Example:**
```
https://username.github.io/omer-game/?deployId=AKfycby...
```

**Pros:**
- ✅ No need to edit HTML files
- ✅ Can use the same deployment for multiple groups
- ✅ Easy to share custom links
- ✅ Quick testing with different sheets

**Cons:**
- ❌ URL looks a bit technical
- ❌ Users need to construct the URL

**Perfect for:** Friends who want their own group without deploying their own HTML

---

#### **Option B: Hardcode in HTML File**

Edit the HTML file to set a default Deployment ID:

1. **Open the game file**
   - Open `omer-counting-game.html` in a text editor

2. **Find the configuration section** (around line 1096)
   ```javascript
   // ============================================
   // CONFIGURATION - Set your Google Apps Script URL here
   // ============================================
   const GOOGLE_APPS_SCRIPT_URL = 'YOUR_APPS_SCRIPT_URL_HERE';
   ```

3. **Paste your URL**
   Replace `'YOUR_APPS_SCRIPT_URL_HERE'` with your actual URL:
   ```javascript
   const GOOGLE_APPS_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycby.../exec';
   ```

4. **Save the file**

**Pros:**
- ✅ Clean URLs without parameters
- ✅ Works automatically for all users

**Cons:**
- ❌ Requires editing HTML
- ❌ Each group needs their own HTML deployment

**Perfect for:** Your own family/group deployment

---

### Step 3: Deploy Online 🌐

#### Option A: GitHub Pages (Recommended)

1. **Rename the file**
   ```bash
   cp omer-counting-game.html index.html
   ```

2. **Create GitHub repository**
   - Go to https://github.com/new
   - Name: `omer-game`
   - Public
   - Create repository

3. **Upload the file**
   - Click "uploading an existing file"
   - Upload `index.html`
   - Commit

4. **Enable Pages**
   - Settings → Pages
   - Source: Deploy from branch
   - Branch: main → / (root) → Save

5. **Get your URL**
   - Your game: `https://YOUR-USERNAME.github.io/omer-game/`

#### Option B: Netlify Drop (Fastest)

1. **Rename the file**
   ```bash
   cp omer-counting-game.html index.html
   ```

2. **Go to Netlify Drop**
   - https://app.netlify.com/drop

3. **Drag and drop**
   - Drag `index.html` into the browser

4. **Get your URL**
   - Instant: `https://random-name.netlify.app`
   - Can customize the name

---

## Sharing with Family 👨‍👩‍👧‍👦

### What to Share

#### If You Used Option A (URL Parameter):
Share the game URL **with your Deployment ID**:
```
https://your-username.github.io/omer-game/?deployId=YOUR_DEPLOYMENT_ID
```

**Example:**
```
https://username.github.io/omer-game/?deployId=AKfycby...
```

#### If You Used Option B (Hardcoded):
Just share **ONE LINK** - the game URL:
- GitHub Pages: `https://your-username.github.io/omer-game/`
- Netlify: `https://your-site.netlify.app`

### For Each Family Member

1. **Open the game link** (with or without `?deployId=...`)
2. **Register** with name, gender, and emoji
3. **That's it!** ✅

### Everyone Shares the Same:
- ✅ Game URL (your deployed website)
- ✅ Google Sheet (automatically connected)
- ✅ Player data (syncs automatically)

---

## Multiple Groups on One Deployment 🎯

**Advanced:** One person can deploy the HTML once, and multiple groups can use it with different Deployment IDs:

- **Your family:** `https://game.com/?deployId=ABC123`
- **Friend's group:** `https://game.com/?deployId=XYZ789`
- **Another group:** `https://game.com/?deployId=DEF456`

Each group has their own:
- ✅ Google Sheet
- ✅ Apps Script deployment
- ✅ Deployment ID
- ✅ Isolated player data

---

## How It Works 🔄

```
Player Opens Game
     ↓
Registers (name, emoji)
     ↓
Game uses hardcoded Apps Script URL
     ↓
Syncs to your Google Sheet
     ↓
All players see each other! 🎉
```

---

## Advanced: Optional Settings ⚙️

Players can still override the Apps Script URL if needed:
1. Click ⚙️ (Settings button)
2. Change the URL (only if using a different sheet)
3. Save

But normally, this isn't needed since the URL is hardcoded!

---

## Updating the Game 🔄

### To Update the Game

1. **Edit the HTML file** locally
2. **Re-upload to your hosting**:
   - **GitHub**: Upload new `index.html` (replace old one)
   - **Netlify**: Drag new file to Netlify dashboard

### To Update Apps Script

1. **Edit code** in Apps Script editor
2. **Deploy → Manage deployments**
3. **Edit** the existing deployment → Version: New version → Deploy
4. URL stays the same - no need to update the game!

---

## Troubleshooting 🔧

### "No Apps Script URL configured"

Check that you:
- ✅ Pasted the correct URL in the HTML file
- ✅ The URL ends with `/exec`
- ✅ Saved the file after editing
- ✅ Re-uploaded the file if already deployed

### Players not syncing

1. **Check the Google Sheet** - do you see rows being added?
2. **Open browser console** (F12) - any errors?
3. **Verify Apps Script deployment**:
   - Must be deployed as "Web app"
   - "Who has access" must be "Anyone"
4. **Wait 60 seconds** - auto-sync runs every minute

### Apps Script permission errors

When deploying, you might see:
> "Google hasn't verified this app"

This is normal! Click:
1. Advanced
2. Go to [Your Project Name] (unsafe)
3. Allow

This only happens once during deployment.

---

## File Structure 📁

After setup, you'll have:

```
/
├── index.html                          # Your game (with hardcoded URL)
├── omer-game-apps-script.js            # Apps Script code (deployed to Google)
└── Google Sheet (online)               # Data storage
```

---

## Security Notes 🔒

- ✅ Apps Script URL is safe to hardcode (read/write only to your sheet)
- ✅ No authentication needed - family-friendly setup
- ✅ Data stored in your Google Sheet (you control it)
- ✅ No external servers or tracking

**Note**: Anyone with the game URL can play, but:
- They can only add their own check-ins
- They can't delete others' data
- All data is in your Google Sheet (you have full control)

If you want stricter access, you can:
1. Set Apps Script to "Anyone with the link" instead of "Anyone"
2. Share both the game URL and Apps Script URL separately (more steps for users)

---

## Checklist ✅

Before sharing with family:

- [ ] Google Apps Script deployed
- [ ] Apps Script URL copied
- [ ] URL pasted in HTML file (line ~735)
- [ ] HTML file saved
- [ ] Game deployed online (GitHub/Netlify)
- [ ] Tested: Can register and check in
- [ ] Tested: Data appears in Google Sheet
- [ ] Game URL ready to share

---

## Ready to Play! 🎉

Once deployed:
1. Share the game URL with family
2. Everyone registers with their name and emoji
3. Daily check-ins start April 3, 2026
4. Track progress together for 49 days!

**Chag Pesach Sameach! 🌾**
