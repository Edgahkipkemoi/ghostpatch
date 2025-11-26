# ⚡ GhostPatch Vercel Deployment Guide

## 🔬 Prerequisites

- Vercel account (sign up at https://vercel.com)
- Your backend deployed on Render (✅ Already done!)
- GitHub repository connected to Vercel

## 🧵 Step-by-Step Deployment

### 1. Install Vercel CLI (Optional but Recommended)

```bash
npm install -g vercel
```

### 2. Deploy via Vercel Dashboard (Easiest Method)

#### A. Connect Your Repository

1. Go to https://vercel.com/new
2. Click "Import Project"
3. Select your GitHub repository
4. Vercel will auto-detect Next.js

#### B. Configure Build Settings

Vercel should auto-detect these, but verify:

- **Framework Preset**: Next.js
- **Root Directory**: `frontend`
- **Build Command**: `npm run build`
- **Output Directory**: `.next`
- **Install Command**: `npm install`

#### C. Set Environment Variables

Add this environment variable in Vercel dashboard:

```
NEXT_PUBLIC_API_URL=https://your-backend-url.onrender.com
```

**Important**: Replace `your-backend-url.onrender.com` with your actual Render backend URL!

#### D. Deploy

Click "Deploy" and watch the magic happen! ⚡

### 3. Deploy via Vercel CLI (Alternative Method)

```bash
# Login to Vercel
vercel login

# Navigate to your project
cd /path/to/ghostpatch

# Deploy
vercel --prod
```

When prompted:
- Set up and deploy? **Y**
- Which scope? Select your account
- Link to existing project? **N** (first time)
- Project name? **ghostpatch** (or your preferred name)
- Directory? **frontend**
- Override settings? **N**

Then add environment variable:
```bash
vercel env add NEXT_PUBLIC_API_URL production
# Enter: https://your-backend-url.onrender.com
```

Redeploy:
```bash
vercel --prod
```

## 🔩 Update Backend CORS

Your Render backend needs to allow requests from Vercel. Update your backend CORS configuration:

```javascript
// In backend/server.js
const cors = require('cors');

const allowedOrigins = [
  'http://localhost:3000',
  'https://your-vercel-app.vercel.app',  // Add your Vercel URL
  'https://ghostpatch.vercel.app'        // If using custom domain
];

app.use(cors({
  origin: function(origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true
}));
```

## ⚡ Vercel Configuration Files

Your project already has `vercel.json` configured. Here's what it does:

```json
{
  "version": 2,
  "buildCommand": "cd frontend && npm install && npm run build",
  "outputDirectory": "frontend/.next",
  "framework": "nextjs",
  "installCommand": "cd frontend && npm install"
}
```

## 🧪 Testing Your Deployment

1. **Check Build Logs**: Monitor the deployment in Vercel dashboard
2. **Visit Your URL**: `https://your-project.vercel.app`
3. **Test API Connection**: Try analyzing code to verify backend connectivity
4. **Check Console**: Open browser DevTools to check for CORS or API errors

## 🔬 Common Issues & Solutions

### Issue: "Failed to fetch" or CORS errors

**Solution**: 
- Verify `NEXT_PUBLIC_API_URL` is set correctly in Vercel
- Update backend CORS to include your Vercel URL
- Redeploy backend on Render after CORS changes

### Issue: Build fails

**Solution**:
- Check build logs in Vercel dashboard
- Verify all dependencies are in `package.json`
- Ensure TypeScript types are correct

### Issue: Environment variable not working

**Solution**:
- Environment variables must start with `NEXT_PUBLIC_` for client-side access
- Redeploy after adding environment variables
- Clear cache: `vercel --prod --force`

## 🧟 Custom Domain (Optional)

1. Go to your project in Vercel dashboard
2. Click "Settings" → "Domains"
3. Add your custom domain
4. Update DNS records as instructed
5. Wait for SSL certificate (automatic)

## ⚰️ Deployment URLs

After deployment, update your `.deployment-urls.md`:

```markdown
# Deployment URLs

## Frontend (Vercel)
- Production: https://your-project.vercel.app
- Preview: Auto-generated for each PR

## Backend (Render)
- API: https://your-backend.onrender.com
```

## 🔩 Automatic Deployments

Vercel automatically deploys:
- **Production**: Every push to `main` branch
- **Preview**: Every pull request

## ⚡ Quick Commands Reference

```bash
# Deploy to production
vercel --prod

# Deploy preview
vercel

# Check deployment status
vercel ls

# View logs
vercel logs

# Remove deployment
vercel rm [deployment-url]
```

## 🧵 Next Steps

1. ✅ Deploy frontend to Vercel
2. ✅ Update backend CORS settings
3. ✅ Test the live application
4. ✅ Update documentation with URLs
5. ✅ Share your creation with the world!

---

**⚡ It's alive! Your GhostPatch creature is ready to rise from the digital grave!**
