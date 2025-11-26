# 🧟 GhostPatch Live Deployment Guide

⚡ **Bring your creature to life on the web!**

## 🔬 Prerequisites

- GitHub repository pushed (✅ You have this!)
- Vercel account (free): https://vercel.com/signup
- Render account (free): https://render.com/register

---

## ⚡ Part 1: Deploy Backend to Render

### Step 1: Create New Web Service

1. Go to https://dashboard.render.com/
2. Click **"New +"** → **"Web Service"**
3. Connect your GitHub repository
4. Select your `ghostpatch` repository

### Step 2: Configure Service

Fill in these settings:

- **Name**: `ghostpatch-backend` (or your preferred name)
- **Region**: Choose closest to you
- **Branch**: `main` (or your default branch)
- **Root Directory**: `backend`
- **Runtime**: `Node`
- **Build Command**: `npm install`
- **Start Command**: `npm start`
- **Instance Type**: `Free`

### Step 3: Environment Variables

Click **"Advanced"** and add these environment variables:

```
NODE_ENV=production
PORT=10000
CORS_ORIGIN=*
```

### Step 4: Deploy

1. Click **"Create Web Service"**
2. Wait for deployment (takes 2-5 minutes)
3. **Copy your backend URL** - it will look like:
   ```
   https://ghostpatch-backend-xxxx.onrender.com
   ```
4. ⚠️ **SAVE THIS URL** - you'll need it for Vercel!

---

## 🧵 Part 2: Deploy Frontend to Vercel

### Step 1: Import Project

1. Go to https://vercel.com/new
2. Click **"Import Git Repository"**
3. Select your `ghostpatch` repository
4. Click **"Import"**

### Step 2: Configure Project

Vercel will auto-detect Next.js. Configure these settings:

- **Framework Preset**: `Next.js`
- **Root Directory**: `frontend`
- **Build Command**: `npm run build` (auto-detected)
- **Output Directory**: `.next` (auto-detected)
- **Install Command**: `npm install` (auto-detected)

### Step 3: Environment Variables

Click **"Environment Variables"** and add:

```
NEXT_PUBLIC_API_URL=https://ghostpatch-backend-xxxx.onrender.com
```

⚠️ **Replace `xxxx` with your actual Render backend URL from Part 1!**

### Step 4: Deploy

1. Click **"Deploy"**
2. Wait for deployment (takes 1-3 minutes)
3. You'll get a live URL like:
   ```
   https://ghostpatch-xxxx.vercel.app
   ```

---

## 🔩 Part 3: Test Your Live Site

### Quick Test

1. Visit your Vercel URL
2. Try stitching some code:
   - Select two languages
   - Paste sample code
   - Click "Stitch Code"
3. Check if the backend responds

### Troubleshooting

**If you see CORS errors:**
- Check that `CORS_ORIGIN=*` is set in Render
- Restart your Render service

**If backend doesn't respond:**
- Check Render logs: Dashboard → Your Service → Logs
- Verify the backend URL in Vercel environment variables

**If frontend doesn't load:**
- Check Vercel deployment logs
- Verify `frontend` is set as root directory

---

## 🧪 Part 4: Update Environment Variables (If Needed)

### Update Vercel Environment Variables

1. Go to your project on Vercel
2. Click **Settings** → **Environment Variables**
3. Edit `NEXT_PUBLIC_API_URL` if needed
4. Click **Save**
5. Go to **Deployments** → Click **"Redeploy"** on latest deployment

### Update Render Environment Variables

1. Go to your service on Render
2. Click **Environment** tab
3. Edit variables
4. Service will auto-redeploy

---

## ⚰️ Part 5: Custom Domain (Optional)

### Vercel Custom Domain

1. Go to your project → **Settings** → **Domains**
2. Add your domain
3. Follow DNS configuration instructions

### Render Custom Domain

1. Go to your service → **Settings** → **Custom Domain**
2. Add your domain
3. Follow DNS configuration instructions

---

## 🎃 Quick Reference

### Your URLs

After deployment, save these:

```
Frontend (Vercel): https://ghostpatch-xxxx.vercel.app
Backend (Render):  https://ghostpatch-backend-xxxx.onrender.com
```

### Important Notes

- **Render Free Tier**: Spins down after 15 minutes of inactivity
  - First request after sleep takes ~30 seconds
  - Consider upgrading for production use
  
- **Vercel Free Tier**: Always on, no sleep
  - Perfect for frontend hosting
  
- **Environment Variables**: Must start with `NEXT_PUBLIC_` to be accessible in browser

---

## 🔬 Monitoring

### Vercel Analytics

- Go to your project → **Analytics**
- View traffic, performance, and errors

### Render Logs

- Go to your service → **Logs**
- Monitor backend requests and errors

---

## ⚡ The Creature Lives!

Once deployed, share your creation:

```
🧟 GhostPatch is ALIVE!
🔗 Try it: https://ghostpatch-xxxx.vercel.app
⚡ Stitch code from multiple languages into one Frankenstein creation!
```

---

## 🆘 Need Help?

**Common Issues:**

1. **"Failed to fetch"** → Backend URL wrong or backend is sleeping
2. **"CORS error"** → Check CORS_ORIGIN in Render
3. **"Build failed"** → Check build logs in Vercel/Render
4. **"Module not found"** → Ensure all dependencies in package.json

**Still stuck?** Check:
- Vercel deployment logs
- Render service logs
- Browser console (F12)

---

⚡ **The lightning has struck! Your code is alive!** ⚡
