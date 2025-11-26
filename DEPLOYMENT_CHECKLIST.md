# ⚡ Deployment Checklist

## 🔬 Pre-Deployment

- [x] Code pushed to GitHub
- [ ] Vercel account created
- [ ] Render account created

## 🧟 Backend Deployment (Render)

- [ ] Create new Web Service on Render
- [ ] Connect GitHub repository
- [ ] Configure settings:
  - Root Directory: `backend`
  - Build Command: `npm install`
  - Start Command: `npm start`
- [ ] Add environment variables:
  - `NODE_ENV=production`
  - `PORT=10000`
  - `CORS_ORIGIN=*`
- [ ] Deploy and wait for completion
- [ ] **Copy backend URL**: `https://ghostpatch-backend-xxxx.onrender.com`

## ⚡ Frontend Deployment (Vercel)

- [ ] Import project on Vercel
- [ ] Configure settings:
  - Framework: Next.js
  - Root Directory: `frontend`
- [ ] Add environment variable:
  - `NEXT_PUBLIC_API_URL=<YOUR_RENDER_BACKEND_URL>`
- [ ] Deploy and wait for completion
- [ ] **Copy frontend URL**: `https://ghostpatch-xxxx.vercel.app`

## 🔩 Testing

- [ ] Visit frontend URL
- [ ] Test code stitching with sample code
- [ ] Verify backend responds
- [ ] Check browser console for errors
- [ ] Test different language combinations

## 🎃 Post-Deployment

- [ ] Update README.md with live URLs
- [ ] Share your creation!
- [ ] Monitor logs for issues

---

## 📝 Your Live URLs

```
Frontend: ___________________________________
Backend:  ___________________________________
```

⚡ **It's alive!** ⚡
