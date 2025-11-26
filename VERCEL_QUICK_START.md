# ⚡ Quick Vercel Deployment Checklist

## 🔬 5-Minute Deployment

### Step 1: Deploy to Vercel (2 minutes)

1. Go to https://vercel.com/new
2. Import your GitHub repository
3. Set **Root Directory**: `frontend`
4. Click **Deploy**

### Step 2: Add Environment Variable (1 minute)

In Vercel dashboard:
1. Go to **Settings** → **Environment Variables**
2. Add:
   - **Name**: `NEXT_PUBLIC_API_URL`
   - **Value**: `https://your-backend.onrender.com` (your Render URL)
3. Click **Save**
4. **Redeploy** (Vercel will prompt you)

### Step 3: Update Backend CORS (2 minutes)

On Render dashboard:
1. Go to your backend service
2. **Environment** tab
3. Add variable:
   - **Key**: `FRONTEND_URL`
   - **Value**: `https://your-project.vercel.app` (from Step 1)
4. Save and wait for redeploy

### Step 4: Test! (30 seconds)

1. Visit your Vercel URL
2. Try analyzing some code
3. Try stitching code blocks

## ⚡ Done!

Your GhostPatch is now alive on the web!

---

## 🧟 Troubleshooting

**Can't connect to backend?**
- Check browser console for errors
- Verify `NEXT_PUBLIC_API_URL` in Vercel settings
- Test backend directly: `https://your-backend.onrender.com/api/health`

**CORS errors?**
- Update backend CORS (see BACKEND_CORS_UPDATE.md)
- Redeploy backend on Render
- Clear browser cache

**Build failed?**
- Check Vercel build logs
- Verify all dependencies in `frontend/package.json`
- Try: `cd frontend && npm install && npm run build` locally

---

**🔩 Need detailed instructions?** See `VERCEL_DEPLOYMENT.md`
