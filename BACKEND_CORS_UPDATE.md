# 🔩 Backend CORS Update for Vercel

## Current Issue

Your backend currently allows ALL origins with `app.use(cors())`. While this works, it's better to restrict to specific domains for security.

## 🧵 Update Your Backend

Replace the CORS configuration in `backend/server.js`:

### Before:
```javascript
app.use(cors());
```

### After:
```javascript
const allowedOrigins = [
  'http://localhost:3000',
  'http://localhost:3001',
  process.env.FRONTEND_URL || 'https://your-vercel-app.vercel.app'
];

app.use(cors({
  origin: function(origin, callback) {
    // Allow requests with no origin (like mobile apps or curl)
    if (!origin) return callback(null, true);
    
    if (allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error('⚡ The lightning strike was blocked by CORS!'));
    }
  },
  credentials: true
}));
```

## 🔬 Add Environment Variable on Render

1. Go to your Render dashboard
2. Select your backend service
3. Go to "Environment" tab
4. Add new environment variable:
   - **Key**: `FRONTEND_URL`
   - **Value**: `https://your-vercel-app.vercel.app` (update after Vercel deployment)
5. Save and redeploy

## ⚡ Quick Deploy Steps

1. **Deploy Frontend to Vercel first** (get your URL)
2. **Update Render environment variable** with Vercel URL
3. **Redeploy backend** on Render
4. **Test connection** from Vercel frontend

## 🧪 Alternative: Keep Open CORS (Not Recommended for Production)

If you want to keep it simple for now:

```javascript
app.use(cors({
  origin: '*',
  credentials: false
}));
```

But remember: ⚠️ The creature is unstable! This allows ANY website to call your API.

---

**🔩 All stitches secure! Your backend will be ready for Vercel.**
