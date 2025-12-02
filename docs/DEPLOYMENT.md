# JSLingo Deployment Guide

## Overview

JSLingo is deployed to **Cloudflare Pages** with automatic deployments from GitHub. No self-hosting or server configuration required.

## Cloudflare Pages Setup

### Prerequisites
- GitHub account with the repository
- Cloudflare account (free tier is sufficient)

### Initial Setup

1. **Go to Cloudflare Pages**
   - Navigate to https://dash.cloudflare.com
   - Select "Workers & Pages" from the sidebar
   - Click "Create application" → "Pages"

2. **Connect to GitHub**
   - Click "Connect to Git"
   - Authorize Cloudflare to access your GitHub account
   - Select the `jslingo-app` repository

3. **Configure Build Settings**
   ```
   Project name: jslingo
   Production branch: main
   Build command: npm run build
   Build output directory: dist
   ```

4. **Environment Variables** (if needed)
   - No environment variables required for basic deployment
   - The app runs entirely client-side

5. **Deploy**
   - Click "Save and Deploy"
   - Wait for the build to complete (~1-2 minutes)

### Your App URL

After deployment, your app will be available at:
- `https://jslingo.pages.dev` (or your chosen project name)
- Custom domain can be added in Cloudflare settings

## Automatic Deployments

Once connected, Cloudflare Pages automatically:
- Deploys on every push to `main` branch
- Creates preview deployments for pull requests
- Provides instant rollback capability

### Deployment Workflow

```
git push origin main
    ↓
GitHub triggers Cloudflare webhook
    ↓
Cloudflare Pages runs: npm run build
    ↓
Build output (dist/) deployed to edge network
    ↓
Live at https://jslingo.pages.dev
```

## Build Requirements

### Node.js Version
Cloudflare Pages uses Node.js 18 by default. To ensure compatibility with Vite 7+:

1. Create a `.nvmrc` file in project root:
   ```
   20
   ```

2. Or set in Cloudflare Pages settings:
   - Go to Settings → Environment Variables
   - Add: `NODE_VERSION` = `20`

### Build Command
```bash
npm run build
```

### Output Directory
```
dist/
```

## Custom Domain Setup

### Add Custom Domain

1. Go to your Pages project in Cloudflare dashboard
2. Click "Custom domains" tab
3. Click "Set up a custom domain"
4. Enter your domain (e.g., `jslingo.com`)
5. Follow DNS configuration instructions

### DNS Configuration

If your domain is on Cloudflare:
- Automatic configuration

If your domain is elsewhere:
- Add a CNAME record pointing to `jslingo.pages.dev`

## Monitoring & Analytics

### Built-in Analytics
Cloudflare Pages provides:
- Request counts
- Bandwidth usage
- Geographic distribution
- Error rates

Access via: Dashboard → Workers & Pages → jslingo → Analytics

### Web Analytics (Optional)
Enable Cloudflare Web Analytics for visitor insights:
1. Go to Analytics → Web Analytics
2. Add your site
3. No code changes required (automatic injection)

## Troubleshooting

### Build Failures

**Check build logs:**
1. Go to Cloudflare Pages dashboard
2. Click on the failed deployment
3. View "Build log" for errors

**Common issues:**

| Error | Solution |
|-------|----------|
| Node version mismatch | Add `NODE_VERSION=20` env variable |
| Missing dependencies | Ensure `package-lock.json` is committed |
| Build timeout | Check for infinite loops in build scripts |

### Deployment Not Updating

1. Verify push reached GitHub
2. Check Cloudflare Pages for pending deployments
3. Try manual redeploy: Dashboard → Deployments → Retry deployment

### 404 Errors on Refresh

Single-page apps need redirect rules. Create `public/_redirects`:
```
/*    /index.html   200
```

Or the redirect is handled automatically by Vite's build output.

## Performance

### Cloudflare Edge Network
- Content served from 300+ locations worldwide
- Automatic SSL/TLS encryption
- DDoS protection included
- HTTP/3 support

### Caching
Static assets are automatically cached with optimal headers:
- JavaScript/CSS: Long-term caching with content hashing
- HTML: Short-term caching for instant updates

## Costs

### Free Tier Includes
- 500 builds per month
- Unlimited requests
- Unlimited bandwidth
- 1 concurrent build

### When You Might Need Pro
- More than 500 builds/month
- Concurrent builds (faster CI)
- Advanced analytics

For JSLingo's scale, the free tier is more than sufficient.

## Security

### Automatic HTTPS
- All traffic encrypted by default
- Automatic certificate management
- No configuration needed

### Headers
Cloudflare adds security headers automatically. Custom headers can be added via `_headers` file:

```
/*
  X-Frame-Options: DENY
  X-Content-Type-Options: nosniff
  Referrer-Policy: strict-origin-when-cross-origin
```

## Rollback

To rollback to a previous deployment:

1. Go to Cloudflare Pages dashboard
2. Click "Deployments" tab
3. Find the previous working deployment
4. Click "..." menu → "Rollback to this deployment"

Instant rollback with zero downtime.

## Summary

| Aspect | Detail |
|--------|--------|
| Hosting | Cloudflare Pages |
| Deploy trigger | Push to `main` branch |
| Build command | `npm run build` |
| Output directory | `dist/` |
| URL | `https://jslingo.pages.dev` |
| SSL | Automatic |
| CDN | Global edge network |
| Cost | Free |
