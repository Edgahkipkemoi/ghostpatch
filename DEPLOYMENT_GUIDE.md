# 🧟 GhostPatch Deployment Guide

## ⚡ Deploy Backend to Render

### Step 1: Push to GitHub
```bash
git add .
git commit -m "⚡ Prepare for deployment"
git push origin main
```

### Step 2: Deploy on Render
1. Go to [render.com](https://render.com) and sign in
2. Click **"New +"** → **"Web Service"**
3. Connect your GitHub repository
4. Render will auto-detect the `render.yaml` file
5. Click **"Apply"** to create the service
6. Wait for deployment (takes 2-3 minutes)
7. Copy your backend URL (e.g., `https://ghostpatch-backend.onrender.com`)

### Alternative Manual Setup:
If auto-detection doesn't work:
- **Name**: ghostpatch-backend
- **Environment**: Node
- **Build Command**: `cd backend && npm install`
- **Start Command**: `cd backend && npm start`
- **Branch**: main

---

## 🔩 Deploy Frontend to Vercel

### Step 1: Update Environment Variable
Edit `frontend/.env.production` and replace with your Render backend URL:
```
NEXT_PUBLIC_API_URL=https://your-actual-backend-url.onrender.com
```

### Step 2: Deploy on Vercel
1. Go to [vercel.com](https://vercel.com) and sign in
2. Click **"Add New..."** → **"Project"**
3. Import your GitHub repository
4. Configure project:
   - **Framework Preset**: Next.js
   - **Root Directory**: `frontend`
   - **Build Command**: `npm run build`
   - **Output Directory**: `.next`
5. Add environment variable:
   - Key: `NEXT_PUBLIC_API_URL`
   - Value: `https://your-actual-backend-url.onrender.com`
6. Click **"Deploy"**
7. Wait for deployment (takes 1-2 minutes)
8. Copy your frontend URL (e.g., `https://ghostpatch.vercel.app`)

---

## 🧪 Test Your Deployment

1. Visit your Vercel URL
2. Open browser console (F12)
3. Check if API calls reach your Render backend
4. Test the code stitching functionality

---

## ⚠️ Important Notes

### CORS Configuration
The backend already has CORS enabled for all origins. If you need to restrict it:

Edit `backend/server.js`:
```javascript
app.use(cors({
  origin: 'https://your-frontend-url.vercel.app'
}));
```

### Free Tier Limitations
- **Render**: Backend may sleep after 15 minutes of inactivity (takes 30s to wake up)
- **Vercel**: 100GB bandwidth/month on free tier

### Environment Variables
If you need to update the backend URL later:
1. Go to Vercel Dashboard → Your Project → Settings → Environment Variables
2. Update `NEXT_PUBLIC_API_URL`
3. Redeploy from the Deployments tab

---

## 🔬 Quick Deploy Commands

```bash
# 1. Commit your changes
git add .
git commit -m "⚡ Ready for deployment"
git push

# 2. Deploy backend (Render will auto-deploy from GitHub)
# Just connect your repo on render.com

# 3. Deploy frontend (if using Vercel CLI)
cd frontend
npx vercel --prod
```

---

## 🧵 Troubleshooting

### Backend not responding
- Check Render logs in dashboard
- Verify the service is running
- Test health endpoint: `https://your-backend.onrender.com/api/health`

### Frontend can't reach backend
- Check browser console for CORS errors
- Verify `NEXT_PUBLIC_API_URL` is set correctly
- Make sure backend URL doesn't have trailing slash

### Build failures
- Check Node version compatibility
- Verify all dependencies are in package.json
- Check build logs in Render/Vercel dashboard

---

## 🎃 Your Live URLs

After deployment, you'll have:
- **Frontend**: `https://ghostpatch-[random].vercel.app`
- **Backend**: `https://ghostpatch-backend-[random].onrender.com`

Share the frontend URL with people to let them use GhostPatch! ⚡
