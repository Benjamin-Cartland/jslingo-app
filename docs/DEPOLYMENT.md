# JSLingo Deployment Guide

## Overview
This guide covers deploying JSLingo to a Mac mini for self-hosting with remote access via Tailscale.

## Prerequisites

### System Requirements
- Mac mini (any recent model)
- macOS 12+ (Monterey or later)
- Homebrew installed
- Node.js 18+ and npm
- Internet connection
- Tailscale account (free tier sufficient)

### Check Existing Software
```bash
# Check if Homebrew is installed
brew --version

# Install Homebrew if needed
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"

# Check Node.js version
node --version  # Should be 18+
npm --version

# Install Node.js if needed
brew install node
```

## Step 1: Build the Application

### Clone or Copy Project
```bash
# If using git
git clone <your-repo-url> jslingo-app
cd jslingo-app

# Or if copying files manually
mkdir jslingo-app
cd jslingo-app
# Copy all project files here
```

### Install Dependencies
```bash
# Install all required packages
npm install

# Verify installation
npm list
```

### Build for Production
```bash
# Create optimized production build
npm run build

# Output will be in dist/ folder
ls -la dist/
```

Expected output:
```
dist/
├── assets/
│   ├── index-[hash].css
│   └── index-[hash].js
└── index.html
```

### Test Build Locally
```bash
# Preview the production build
npm run preview

# Visit http://localhost:4173 to test
```

Verify:
- All levels work
- Progress saves
- UI is responsive
- No console errors

## Step 2: Choose Hosting Method

### Option A: Using `serve` (Recommended)

**Advantages:**
- Simple setup
- Easy to configure
- Good for permanent hosting

**Installation:**
```bash
# Install globally
npm install -g serve

# Verify installation
serve --version
```

**Run the server:**
```bash
# From project root
serve -s dist -l 3000

# Server will start on port 3000
# Visit http://localhost:3000
```

**Configuration file (optional):**
Create `serve.json` in project root:
```json
{
  "public": "dist",
  "rewrites": [
    { "source": "/**", "destination": "/index.html" }
  ],
  "headers": [
    {
      "source": "**/*.@(js|css)",
      "headers": [
        {
          "key": "Cache-Control",
          "value": "public, max-age=31536000"
        }
      ]
    }
  ]
}
```

### Option B: Using Python HTTP Server

**Advantages:**
- No installation needed (Python comes with macOS)
- Very simple

**Run the server:**
```bash
cd dist
python3 -m http.server 3000
```

**Limitations:**
- No automatic restart on crash
- Basic features only
- Less performant

### Option C: Using Nginx (Advanced)

**Advantages:**
- Professional-grade
- High performance
- Advanced features

**Installation:**
```bash
brew install nginx
```

**Configuration:**
Edit `/usr/local/etc/nginx/nginx.conf`:
```nginx
http {
    server {
        listen 3000;
        server_name localhost;
        
        root /Users/YOUR_USERNAME/jslingo-app/dist;
        index index.html;
        
        location / {
            try_files $uri $uri/ /index.html;
        }
        
        # Cache static assets
        location ~* \.(js|css|png|jpg|jpeg|gif|ico)$ {
            expires 1y;
            add_header Cache-Control "public, immutable";
        }
    }
}
```

**Start Nginx:**
```bash
brew services start nginx
```

## Step 3: Configure Auto-Start

### Using macOS LaunchAgent

**Create the plist file:**
```bash
# Create directory if it doesn't exist
mkdir -p ~/Library/LaunchAgents

# Create the plist file
nano ~/Library/LaunchAgents/com.jslingo.app.plist
```

**For `serve` method:**
```xml
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0">
<dict>
    <key>Label</key>
    <string>com.jslingo.app</string>
    
    <key>ProgramArguments</key>
    <array>
        <string>/usr/local/bin/serve</string>
        <string>-s</string>
        <string>/Users/YOUR_USERNAME/jslingo-app/dist</string>
        <string>-l</string>
        <string>3000</string>
    </array>
    
    <key>RunAtLoad</key>
    <true/>
    
    <key>KeepAlive</key>
    <true/>
    
    <key>StandardOutPath</key>
    <string>/tmp/jslingo.log</string>
    
    <key>StandardErrorPath</key>
    <string>/tmp/jslingo.error.log</string>
    
    <key>WorkingDirectory</key>
    <string>/Users/YOUR_USERNAME/jslingo-app</string>
    
    <key>EnvironmentVariables</key>
    <dict>
        <key>PATH</key>
        <string>/usr/local/bin:/usr/bin:/bin:/usr/sbin:/sbin</string>
    </dict>
</dict>
</plist>
```

**Important:** Replace `YOUR_USERNAME` with your actual macOS username.

**Find your username:**
```bash
whoami
```

**Find serve path (if different):**
```bash
which serve
```

**Load the LaunchAgent:**
```bash
# Load the service
launchctl load ~/Library/LaunchAgents/com.jslingo.app.plist

# Verify it's loaded
launchctl list | grep jslingo
```

**Manage the service:**
```bash
# Stop the service
launchctl unload ~/Library/LaunchAgents/com.jslingo.app.plist

# Start the service
launchctl load ~/Library/LaunchAgents/com.jslingo.app.plist

# Reload after changes
launchctl unload ~/Library/LaunchAgents/com.jslingo.app.plist
launchctl load ~/Library/LaunchAgents/com.jslingo.app.plist
```

## Step 4: Install & Configure Tailscale

### Install Tailscale
```bash
# Via Homebrew
brew install tailscale

# Or download from https://tailscale.com/download/mac
```

### Start Tailscale
```bash
# Start and authenticate
sudo tailscale up

# You'll get a URL to authenticate in browser
# Log in with your Tailscale account
```

### Get Your Tailscale IP
```bash
# Get your Tailscale IPv4 address
tailscale ip -4

# Example output: 100.101.102.103
```

### Enable MagicDNS (Optional)
1. Go to https://login.tailscale.com/admin/dns
2. Enable MagicDNS
3. Your Mac mini will get a hostname like: `macmini.tail-scale.ts.net`

### Configure Tailscale Settings

**Disable key expiry (recommended):**
1. Go to https://login.tailscale.com/admin/machines
2. Find your Mac mini
3. Click "..." menu
4. Select "Disable key expiry"

**Set machine name (optional):**
```bash
sudo tailscale set --hostname jslingo-server
```

## Step 5: Access Remotely

### From Another Device on Tailscale

**Install Tailscale on client device:**
- macOS/Linux: `brew install tailscale && sudo tailscale up`
- Windows: Download from tailscale.com
- iOS/Android: Install from App Store/Play Store

**Access the app:**

**Option 1: Using IP address**
```
http://100.101.102.103:3000
```
(Use your actual Tailscale IP)

**Option 2: Using MagicDNS hostname**
```
http://macmini.tail-scale.ts.net:3000
```
or
```
http://jslingo-server.tail-scale.ts.net:3000
```

### Bookmark for Easy Access
Add to browser bookmarks:
- Name: "JSLingo"
- URL: `http://YOUR_TAILSCALE_IP:3000`

## Step 6: Verification & Testing

### Local Testing
```bash
# Test on Mac mini itself
curl http://localhost:3000

# Should return HTML content

# Check if port is listening
lsof -i :3000

# Should show serve or nginx process
```

### Remote Testing
```bash
# From another device on Tailscale
curl http://100.101.102.103:3000

# Should return HTML content
```

### Browser Testing
1. Open browser on remote device
2. Navigate to Tailscale URL
3. Verify app loads
4. Test all functionality:
   - Level progression
   - Code execution
   - Progress saving
   - Reset button
   - All 15 levels

### Check Logs
```bash
# View application logs
cat /tmp/jslingo.log

# View error logs
cat /tmp/jslingo.error.log

# Tail logs in real-time
tail -f /tmp/jslingo.log
```

## Troubleshooting

### Server Won't Start

**Check if port is already in use:**
```bash
lsof -i :3000
```

**Kill the process if needed:**
```bash
kill -9 <PID>
```

**Check serve is installed:**
```bash
which serve
serve --version
```

### LaunchAgent Issues

**Check if loaded:**
```bash
launchctl list | grep jslingo
```

**Check logs:**
```bash
cat /tmp/jslingo.error.log
```

**Reload service:**
```bash
launchctl unload ~/Library/LaunchAgents/com.jslingo.app.plist
launchctl load ~/Library/LaunchAgents/com.jslingo.app.plist
```

**Verify plist syntax:**
```bash
plutil -lint ~/Library/LaunchAgents/com.jslingo.app.plist
```

### Tailscale Connection Issues

**Check Tailscale status:**
```bash
tailscale status
```

**Restart Tailscale:**
```bash
sudo tailscale down
sudo tailscale up
```

**Check firewall (if enabled):**
```bash
# Disable macOS firewall temporarily to test
sudo /usr/libexec/ApplicationFirewall/socketfilterfw --setglobalstate off

# Re-enable after testing
sudo /usr/libexec/ApplicationFirewall/socketfilterfw --setglobalstate on
```

### Can't Access from Remote Device

**Verify Tailscale is running on both devices:**
```bash
tailscale status
```

**Ping the Mac mini from remote device:**
```bash
ping 100.101.102.103
```

**Check if server is listening:**
```bash
# On Mac mini
lsof -i :3000
```

**Try local access first:**
```bash
# On Mac mini
curl http://localhost:3000
```

### Progress Not Saving

**Check browser localStorage:**
Open browser console (F12) on the app:
```javascript
localStorage.getItem('jslingo-progress')
```

**Clear and retry:**
```javascript
localStorage.removeItem('jslingo-progress')
// Then refresh and test again
```

## Maintenance

### Update Application

**Pull latest changes:**
```bash
cd ~/jslingo-app
git pull  # or copy new files manually
```

**Rebuild:**
```bash
npm install  # if dependencies changed
npm run build
```

**Restart service:**
```bash
launchctl unload ~/Library/LaunchAgents/com.jslingo.app.plist
launchctl load ~/Library/LaunchAgents/com.jslingo.app.plist
```

### Update Dependencies

**Check for updates:**
```bash
npm outdated
```

**Update packages:**
```bash
npm update
npm audit fix
```

**Rebuild and test:**
```bash
npm run build
npm run preview
```

### Monitor Resource Usage

**Check CPU/Memory:**
```bash
top -pid $(pgrep -f serve)
```

**Check disk space:**
```bash
df -h
```

**Check logs size:**
```bash
du -h /tmp/jslingo*.log
```

**Rotate logs if needed:**
```bash
# Clear old logs
> /tmp/jslingo.log
> /tmp/jslingo.error.log
```

## Backup & Recovery

### Backup Progress Data
Users' progress is in browser localStorage (client-side).
No server-side backup needed for current version.

### Backup Application
```bash
# Backup entire project
tar -czf jslingo-backup-$(date +%Y%m%d).tar.gz ~/jslingo-app

# Store in safe location
mv jslingo-backup-*.tar.gz ~/Backups/
```

### Restore from Backup
```bash
# Extract backup
tar -xzf jslingo-backup-20251111.tar.gz -C ~/

# Rebuild
cd ~/jslingo-app
npm install
npm run build

# Restart service
launchctl unload ~/Library/LaunchAgents/com.jslingo.app.plist
launchctl load ~/Library/LaunchAgents/com.jslingo.app.plist
```

## Security Considerations

### Tailscale Security
- ✅ Encrypted tunnel (WireGuard)
- ✅ No open ports to internet
- ✅ Device authentication required
- ✅ Access control via Tailscale admin

### Local Security
- ✅ App runs on localhost + Tailscale only
- ✅ No external database to secure
- ✅ No authentication system to maintain
- ✅ User data stays in their browser

### Best Practices
1. Keep Tailscale updated
2. Don't disable key expiry for production
3. Use Tailscale ACLs if sharing with others
4. Regularly update dependencies
5. Monitor logs for issues

## Performance Optimization

### Nginx Caching (if using nginx)
Already configured in nginx.conf above with:
- 1-year cache for static assets
- Proper headers for immutability

### Build Optimization
```bash
# Already optimized by Vite:
# - Code splitting
# - Minification
# - Tree shaking
# - Asset optimization
```

### Mac mini Performance
- App is lightweight (< 500KB)
- Single-page application
- No server-side processing
- Should handle 50+ concurrent users easily

## Alternative Deployments

### Deploy to Vercel/Netlify (Future)
If you want public hosting:
1. Push code to GitHub
2. Connect to Vercel/Netlify
3. Auto-deploy on push
4. Free tier sufficient

### Docker Container (Advanced)
```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build
RUN npm install -g serve
EXPOSE 3000
CMD ["serve", "-s", "dist", "-l", "3000"]
```

## Support & Resources

### Official Documentation
- React: https://react.dev
- Vite: https://vitejs.dev
- Tailwind: https://tailwindcss.com
- Tailscale: https://tailscale.com/kb

### Troubleshooting Help
1. Check logs first: `/tmp/jslingo*.log`
2. Test locally: `curl http://localhost:3000`
3. Verify Tailscale: `tailscale status`
4. Check this guide's troubleshooting section

### Getting Help
- Review REQUIREMENTS.md for specifications
- Review ARCHITECTURE.md for technical details
- Check GitHub issues (if using GitHub)
- Tailscale support: https://tailscale.com/contact/support