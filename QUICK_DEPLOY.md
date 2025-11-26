# ⚡ Quick Deploy Checklist

## 🔬 Prerequisites
- [ ] GitHub account
- [ ] Render account (free)
- [ ] Vercel account (free)
- [ ] Code pushed to GitHub

## 🧟 Step-by-Step (5 minutes)

### 1️⃣ Deploy Backend (Render)
```bash
# Push your code first
git add .
git commit -m "⚡ Deploy GhostPatch"
git push origin main
```

Then:
1. Go to https://render.com
2. Click "New +" → "Web Service"
3. Connect your GitHub repo
4. Click "Apply" (it will use render.yaml)
5. **COPY YOUR BACKEND URL** (e.g., `https://ghostpatch-backend-abc123.onrender.com`)

### 2️⃣ Update Frontend Config
Edit `frontend/.env.production`:
```
NEXT_PUBLIC_API_URL=https://YOUR-ACTUAL-BACKEND-URL.onrender.com
```

Commit this change:
```bash
git add frontend/.env.production
git commit -m "🔩 Update backend URL"
git push
```

### 3️⃣ Deploy Frontend (Vercel)
1. Go to https://vercel.com
2. Click "Add New..." → "Project"
3. Import your GitHub repo
4. Set **Root Directory**: `frontend`
5. Add environment variable:
   - Name: `NEXT_PUBLIC_API_URL`
   - Value: Your Render backend URL
6. Click "Deploy"
7. **COPY YOUR FRONTEND URL**

### 4️⃣ Test It!
Visit your Vercel URL and try stitching some code!

## 🎃 Done!
Share your frontend URL with people: `https://your-app.vercel.app`

## ⚠️ Common Issues

**Backend sleeping?** Free Render services sleep after 15 min. First request takes 30s to wake up.

**CORS errors?** Make sure your backend URL in `.env.production` is correct and doesn't have a trailing slash.

**Build failed?** Check the logs in Render/Vercel dashboard.
