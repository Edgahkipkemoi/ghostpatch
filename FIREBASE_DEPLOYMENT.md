# 🔥 GhostPatch Firebase Deployment Guide

**Complete Step-by-Step Guide to Deploy Frontend + Backend on Firebase**

This guide assumes you're starting from scratch. Follow every step exactly.

---

## 📋 Prerequisites Checklist

Before you start, make sure you have:
- [ ] A Google account (Gmail)
- [ ] Node.js 18+ installed (`node --version` to check)
- [ ] npm installed (comes with Node.js)
- [ ] A terminal/command prompt open
- [ ] Internet connection
- [ ] Your GhostPatch project folder

---

## Part 1: Firebase Account & Project Setup

### Step 1: Create Firebase Account

1. Go to https://firebase.google.com/
2. Click **"Get started"** (top right)
3. Sign in with your Google account
4. Accept the terms of service

### Step 2: Create a New Firebase Project

1. Click **"Go to console"** (top right) or go to https://console.firebase.google.com/
2. Click **"Add project"** (or "Create a project")
3. **Project name**: Enter `ghostpatch` (or any name you want)
4. Click **"Continue"**
5. **Google Analytics**: Toggle OFF (you don't need it for this project)
6. Click **"Create project"**
7. Wait 30-60 seconds for project creation
8. Click **"Continue"** when it says "Your new project is ready"

### Step 3: Upgrade to Blaze Plan (Required for Cloud Functions)

⚠️ **Important**: Cloud Functions require the Blaze (pay-as-you-go) plan, but it has a generous free tier.

1. In your Firebase console, look at the bottom left
2. Click on **"Spark"** (the current plan)
3. Click **"Upgrade"** or **"Select plan"**
4. Choose **"Blaze"** plan
5. Click **"Continue"**
6. **Add billing account**: Click "Create billing account"
7. Fill in your billing information (credit card required)
   - Don't worry: Free tier includes:
     - 2M function invocations/month
     - 10GB hosting/month
     - 360MB/day function memory
8. Click **"Confirm plan"**

### Step 4: Enable Required Services

#### Enable Cloud Functions:
1. In Firebase console, click **"Build"** in left sidebar
2. Click **"Functions"**
3. Click **"Get started"** or **"Upgrade project"** if prompted
4. You should see "Functions dashboard" (might be empty)

#### Enable Hosting:
1. In Firebase console, click **"Build"** in left sidebar
2. Click **"Hosting"**
3. Click **"Get started"**
4. Click through the setup wizard (we'll do actual setup via CLI)
5. Click **"Finish"**

---

## Part 2: Install Firebase CLI

### Step 5: Install Firebase Tools

Open your terminal and run:

```bash
npm install -g firebase-tools
```

Wait for installation to complete (might take 1-2 minutes).

### Step 6: Verify Installation

```bash
firebase --version
```

You should see a version number like `13.x.x` or higher.

### Step 7: Login to Firebase

```bash
firebase login
```

This will:
1. Open your browser
2. Ask you to select your Google account
3. Ask for permissions - Click **"Allow"**
4. Show "Success! Logged in as your-email@gmail.com"

Back in terminal, you should see:
```
✔ Success! Logged in as your-email@gmail.com
```

---

## Part 3: Restructure Your Project

### Step 8: Navigate to Your Project

```bash
cd /path/to/ghostpatch
```

Replace `/path/to/ghostpatch` with your actual project path.

### Step 9: Create Firebase Functions Structure

We need to move the backend into a `functions` folder:

```bash
# Create functions directory
mkdir -p functions

# Move backend files to functions
cp -r backend/* functions/

# Create functions package.json (we'll modify it)
```

### Step 10: Update Functions Package.json

Open `functions/package.json` and replace its contents with:

```json
{
  "name": "ghostpatch-functions",
  "version": "1.0.0",
  "type": "module",
  "main": "index.js",
  "engines": {
    "node": "18"
  },
  "scripts": {
    "serve": "firebase emulators:start --only functions",
    "shell": "firebase functions:shell",
    "start": "npm run shell",
    "deploy": "firebase deploy --only functions",
    "logs": "firebase functions:log"
  },
  "dependencies": {
    "express": "^4.18.2",
    "cors": "^2.8.5",
    "@babel/parser": "^7.23.0",
    "archiver": "^6.0.1",
    "firebase-functions": "^4.5.0",
    "firebase-admin": "^11.11.0"
  }
}
```

### Step 11: Create Firebase Function Entry Point

Create a new file `functions/index.js`:

```javascript
import functions from 'firebase-functions';
import express from 'express';
import cors from 'cors';
import analysisRoutes from './routes/analysis.js';
import stitchRoutes from './routes/stitch.js';

const app = express();

// Middleware
app.use(cors({ origin: true }));
app.use(express.json({ limit: '10mb' }));

// Routes
app.use('/api/analysis', analysisRoutes);
app.use('/api/stitch', stitchRoutes);

app.get('/api/health', (req, res) => {
  res.json({ status: '⚡ The laboratory is operational!' });
});

// Export the Express app as a Firebase Function
export const api = functions.https.onRequest(app);
```

### Step 12: Update Frontend to Use Firebase Functions

Open `frontend/next.config.js` and update it:

```javascript
/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  images: {
    unoptimized: true
  },
  trailingSlash: true,
  env: {
    NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5001/ghostpatch/us-central1/api'
  }
}

module.exports = nextConfig
```

### Step 13: Create Frontend Environment File

Create `frontend/.env.production`:

```env
NEXT_PUBLIC_API_URL=https://us-central1-ghostpatch.cloudfunctions.net/api
```

⚠️ **Important**: Replace `ghostpatch` with your actual Firebase project ID if different.

To find your project ID:
1. Go to Firebase console
2. Click the gear icon (⚙️) next to "Project Overview"
3. Click "Project settings"
4. Copy the "Project ID"

---

## Part 4: Initialize Firebase in Your Project

### Step 14: Initialize Firebase

In your project root (`ghostpatch` folder), run:

```bash
firebase init
```

You'll see the Firebase CLI wizard. Follow these steps:

#### Question 1: "Which Firebase features do you want to set up?"
- Use arrow keys to navigate
- Press **Space** to select (you should see a green circle)
- Select:
  - [x] **Functions: Configure a Cloud Functions directory**
  - [x] **Hosting: Configure files for Firebase Hosting**
- Press **Enter**

#### Question 2: "Please select an option"
- Select: **"Use an existing project"**
- Press **Enter**

#### Question 3: "Select a default Firebase project"
- Use arrow keys to find your project (e.g., `ghostpatch`)
- Press **Enter**

#### Question 4: "What language would you like to use to write Cloud Functions?"
- Select: **"JavaScript"**
- Press **Enter**

#### Question 5: "Do you want to use ESLint to catch probable bugs and enforce style?"
- Type: **n** (No)
- Press **Enter**

#### Question 6: "File functions/package.json already exists. Overwrite?"
- Type: **n** (No - we already created our custom one)
- Press **Enter**

#### Question 7: "File functions/index.js already exists. Overwrite?"
- Type: **n** (No - we already created our custom one)
- Press **Enter**

#### Question 8: "Do you want to install dependencies with npm now?"
- Type: **y** (Yes)
- Press **Enter**
- Wait for npm install to complete (1-2 minutes)

#### Question 9: "What do you want to use as your public directory?"
- Type: **frontend/out**
- Press **Enter**

#### Question 10: "Configure as a single-page app (rewrite all urls to /index.html)?"
- Type: **n** (No)
- Press **Enter**

#### Question 11: "Set up automatic builds and deploys with GitHub?"
- Type: **n** (No - we'll deploy manually)
- Press **Enter**

You should see:
```
✔ Firebase initialization complete!
```

### Step 15: Verify .firebaserc File

Check that the `.firebaserc` file was created in your project root:

```bash
cat .firebaserc
```

It should look like:
```json
{
  "projects": {
    "default": "ghostpatch"
  }
}
```

If the project ID is wrong, edit `.firebaserc` and replace `ghostpatch` with your actual project ID.

### Step 16: Update Firebase Configuration

Open the newly created `firebase.json` file in your project root and replace its contents with:

```json
{
  "functions": {
    "source": "functions",
    "runtime": "nodejs18",
    "ignore": [
      "node_modules",
      ".git",
      "firebase-debug.log",
      "firebase-debug.*.log"
    ]
  },
  "hosting": {
    "public": "frontend/out",
    "ignore": [
      "firebase.json",
      "**/.*",
      "**/node_modules/**"
    ],
    "rewrites": [
      {
        "source": "/api/**",
        "function": "api"
      }
    ],
    "headers": [
      {
        "source": "**",
        "headers": [
          {
            "key": "Cache-Control",
            "value": "public, max-age=3600"
          }
        ]
      },
      {
        "source": "**/*.@(jpg|jpeg|gif|png|svg|webp)",
        "headers": [
          {
            "key": "Cache-Control",
            "value": "public, max-age=31536000, immutable"
          }
        ]
      }
    ]
  }
}
```

This configuration:
- Sets up Cloud Functions from the `functions` folder
- Serves frontend from `frontend/out`
- Rewrites all `/api/**` requests to your Cloud Function
- Adds caching headers for better performance

---

## Part 5: Build Your Frontend

### Step 16: Install Frontend Dependencies

```bash
cd frontend
npm install
```

Wait for installation to complete.

### Step 17: Configure Environment Variables for Functions (Optional)

If your backend needs environment variables (API keys, secrets, etc.), set them up:

```bash
# Set environment variables for Cloud Functions
firebase functions:config:set someapi.key="your-api-key-here"
firebase functions:config:set someapi.secret="your-secret-here"
```

To use these in your functions, access them via:
```javascript
import functions from 'firebase-functions';
const apiKey = functions.config().someapi.key;
```

To view all configured variables:
```bash
firebase functions:config:get
```

**Note:** For this basic GhostPatch deployment, no environment variables are required.

### Step 18: Build Frontend for Production

```bash
npm run build
```

This will:
1. Create an optimized production build
2. Export static files to `frontend/out` folder
3. Take 1-2 minutes

You should see:
```
✓ Generating static pages
✓ Finalizing page optimization
```

### Step 19: Verify Build Output

```bash
ls out
```

You should see files like `index.html`, `_next/`, etc.

Go back to project root:

```bash
cd ..
```

---

## Part 6: Test Locally with Firebase Emulators (Optional but Recommended)

### Step 20: Start Firebase Emulators

Before deploying to production, test everything locally:

```bash
# Start the emulators
firebase emulators:start
```

This will start:
- Functions emulator on `http://localhost:5001`
- Hosting emulator on `http://localhost:5000`

You should see output like:
```
✔  functions[us-central1-api]: http function initialized (http://localhost:5001/ghostpatch/us-central1/api).
✔  hosting[ghostpatch]: Local server: http://localhost:5000
```

### Step 21: Test Locally

1. **Test Backend API:**
   ```bash
   curl http://localhost:5001/ghostpatch/us-central1/api/api/health
   ```
   
   Should return: `{"status":"⚡ The laboratory is operational!"}`

2. **Test Frontend:**
   - Open browser to `http://localhost:5000`
   - Try analyzing and stitching code
   - Check browser console for any errors

3. **Stop Emulators:**
   - Press `Ctrl+C` in the terminal

If everything works locally, proceed to production deployment.

---

## Part 7: Deploy to Firebase

### Step 22: Deploy Everything

From your project root, run:

```bash
firebase deploy
```

This will:
1. Upload your Cloud Functions (backend)
2. Upload your static frontend files
3. Take 2-5 minutes

You'll see output like:
```
=== Deploying to 'ghostpatch'...

i  deploying functions, hosting
✔  functions: Finished running predeploy script.
i  functions: preparing functions directory for uploading...
i  functions: packaged functions (X KB) for uploading
✔  functions: functions folder uploaded successfully
i  functions: creating Node.js 18 function api(us-central1)...
✔  functions[api(us-central1)] Successful create operation.
Function URL (api(us-central1)): https://us-central1-ghostpatch.cloudfunctions.net/api

i  hosting[ghostpatch]: beginning deploy...
i  hosting[ghostpatch]: found X files in frontend/out
✔  hosting[ghostpatch]: file upload complete
i  hosting[ghostpatch]: finalizing version...
✔  hosting[ghostpatch]: version finalized
i  hosting[ghostpatch]: releasing new version...
✔  hosting[ghostpatch]: release complete

✔  Deploy complete!

Project Console: https://console.firebase.google.com/project/ghostpatch/overview
Hosting URL: https://ghostpatch.web.app
```

### Step 23: Copy Your URLs

From the deploy output, copy:

1. **Function URL**: `https://us-central1-YOUR-PROJECT-ID.cloudfunctions.net/api`
2. **Hosting URL**: `https://YOUR-PROJECT-ID.web.app`

**Important Note on API URLs:**
- Your function is accessible at: `https://us-central1-YOUR-PROJECT-ID.cloudfunctions.net/api`
- Health check endpoint: `https://us-central1-YOUR-PROJECT-ID.cloudfunctions.net/api/api/health`
- The double `/api` is correct because:
  - First `/api` is the function name
  - Second `/api` is the route in your Express app

---

## Part 8: Update Frontend with Correct API URL

### Step 24: Update Environment Variable

If your function URL is different from what we set earlier, update `frontend/.env.production`:

```env
NEXT_PUBLIC_API_URL=https://us-central1-YOUR-ACTUAL-PROJECT-ID.cloudfunctions.net/api
```

Replace `YOUR-ACTUAL-PROJECT-ID` with your real project ID.

### Step 25: Rebuild and Redeploy Frontend

```bash
cd frontend
npm run build
cd ..
firebase deploy --only hosting
```

This will redeploy just the frontend with the correct API URL (faster than full deploy).

---

## Part 9: Test Your Deployment

### Step 26: Test Backend API

Open your browser or use curl:

```bash
curl https://us-central1-YOUR-PROJECT-ID.cloudfunctions.net/api/api/health
```

You should see:
```json
{"status":"⚡ The laboratory is operational!"}
```

### Step 27: Test Frontend

1. Open your browser
2. Go to: `https://YOUR-PROJECT-ID.web.app`
3. You should see the GhostPatch interface

### Step 28: Test Full Integration

1. On the GhostPatch website, paste some sample code
2. Click "Analyze Code"
3. Click "Stitch Code"
4. Try to download the result

If everything works, you're done! 🎉

---

## Part 10: Understanding Cloud Functions Cold Starts

### What are Cold Starts?

When your Cloud Function hasn't been called for a while (5-15 minutes), Firebase shuts it down to save resources. The next request will experience a "cold start":

- **Cold start response time:** 2-5 seconds
- **Warm response time:** 100-500ms

### How to Minimize Cold Starts:

1. **Keep Functions Warm (Free Method):**
   
   Create a simple cron job or use a free uptime monitor:
   - [UptimeRobot](https://uptimerobot.com/) - Free tier monitors every 5 minutes
   - [Cron-job.org](https://cron-job.org/) - Free scheduled requests
   
   Set it to ping: `https://us-central1-YOUR-PROJECT-ID.cloudfunctions.net/api/api/health`

2. **Optimize Function Code:**
   - Keep dependencies minimal
   - Use lazy loading for heavy imports
   - Initialize connections outside the handler

3. **User Experience:**
   - Add a loading indicator in your frontend
   - Show "Waking up the laboratory..." message for first request
   - Cache results when possible

### Expected Performance:

- First request after idle: 2-5 seconds
- Subsequent requests: 100-500ms
- After 5-15 minutes idle: Cold start again

This is normal for Firebase free tier and most users won't notice.

---

## Part 11: Security and Rate Limiting

### Step 29: Add Basic Rate Limiting

To prevent abuse, add rate limiting to your functions. Update `functions/index.js`:

```javascript
import functions from 'firebase-functions';
import express from 'express';
import cors from 'cors';
import analysisRoutes from './routes/analysis.js';
import stitchRoutes from './routes/stitch.js';

const app = express();

// Rate limiting middleware (simple in-memory)
const requestCounts = new Map();
const RATE_LIMIT = 100; // requests per IP per hour
const RATE_WINDOW = 60 * 60 * 1000; // 1 hour in ms

const rateLimiter = (req, res, next) => {
  const ip = req.ip || req.connection.remoteAddress;
  const now = Date.now();
  
  if (!requestCounts.has(ip)) {
    requestCounts.set(ip, { count: 1, resetTime: now + RATE_WINDOW });
    return next();
  }
  
  const record = requestCounts.get(ip);
  
  if (now > record.resetTime) {
    record.count = 1;
    record.resetTime = now + RATE_WINDOW;
    return next();
  }
  
  if (record.count >= RATE_LIMIT) {
    return res.status(429).json({ 
      error: 'Too many requests. Please try again later.',
      retryAfter: Math.ceil((record.resetTime - now) / 1000)
    });
  }
  
  record.count++;
  next();
};

// Middleware
app.use(cors({ origin: true }));
app.use(express.json({ limit: '10mb' }));
app.use(rateLimiter);

// Routes
app.use('/api/analysis', analysisRoutes);
app.use('/api/stitch', stitchRoutes);

app.get('/api/health', (req, res) => {
  res.json({ status: '⚡ The laboratory is operational!' });
});

// Export the Express app as a Firebase Function
export const api = functions.https.onRequest(app);
```

### Step 30: Configure CORS Properly

For production, restrict CORS to your domains only. Update the CORS configuration:

```javascript
// More secure CORS configuration
const allowedOrigins = [
  'https://YOUR-PROJECT-ID.web.app',
  'https://YOUR-PROJECT-ID.firebaseapp.com',
  'http://localhost:3000', // for local development
  'http://localhost:5000'  // for Firebase emulator
];

app.use(cors({
  origin: (origin, callback) => {
    // Allow requests with no origin (mobile apps, Postman, etc.)
    if (!origin) return callback(null, true);
    
    if (allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true
}));
```

### Step 31: Add Input Validation

Add validation to prevent malicious inputs. Create `functions/middleware/validation.js`:

```javascript
export const validateCodeInput = (req, res, next) => {
  const { code, language } = req.body;
  
  // Check if code exists
  if (!code || typeof code !== 'string') {
    return res.status(400).json({ error: 'Invalid code input' });
  }
  
  // Check code length (prevent huge payloads)
  if (code.length > 100000) { // 100KB limit
    return res.status(400).json({ error: 'Code too large. Maximum 100KB.' });
  }
  
  // Check language if provided
  const validLanguages = ['javascript', 'python', 'java', 'cpp', 'rust', 'go', 'typescript'];
  if (language && !validLanguages.includes(language.toLowerCase())) {
    return res.status(400).json({ error: 'Unsupported language' });
  }
  
  next();
};
```

Then use it in your routes:
```javascript
import { validateCodeInput } from './middleware/validation.js';
app.use('/api/analysis', validateCodeInput, analysisRoutes);
app.use('/api/stitch', validateCodeInput, stitchRoutes);
```

### Security Best Practices:

✅ **Do:**
- Use HTTPS only (Firebase does this automatically)
- Validate all inputs
- Limit request sizes
- Implement rate limiting
- Monitor function logs for suspicious activity
- Keep dependencies updated

❌ **Don't:**
- Store secrets in code (use Firebase config)
- Allow unlimited request sizes
- Trust user input without validation
- Expose internal error details to users

---

## Part 12: Custom Domain Setup (Optional)

### Step 32: Add a Custom Domain

If you want to use your own domain (e.g., `ghostpatch.com`):

1. **In Firebase Console:**
   - Go to Hosting
   - Click "Add custom domain"
   - Enter your domain name
   - Click "Continue"

2. **Verify Domain Ownership:**
   - Firebase will provide a TXT record
   - Add this to your domain's DNS settings
   - Wait for verification (can take up to 24 hours)

3. **Add DNS Records:**
   - Firebase will provide A records
   - Add these to your domain's DNS:
     ```
     A    @    151.101.1.195
     A    @    151.101.65.195
     ```

4. **SSL Certificate:**
   - Firebase automatically provisions SSL
   - Can take up to 24 hours
   - Your site will be available at `https://yourdomain.com`

5. **Update Frontend Environment:**
   ```env
   NEXT_PUBLIC_API_URL=https://us-central1-YOUR-PROJECT-ID.cloudfunctions.net/api
   ```
   
   Rebuild and redeploy:
   ```bash
   cd frontend
   npm run build
   cd ..
   firebase deploy --only hosting
   ```

### Custom Domain for Functions:

Unfortunately, Cloud Functions don't support custom domains directly. Options:

1. **Use Firebase Hosting rewrites** (already configured in `firebase.json`)
   - Access functions via: `https://yourdomain.com/api/...`
   - This proxies through Firebase Hosting

2. **Use Cloud Load Balancer** (requires Google Cloud, more complex)

---

## Part 13: Future Deployments

### When You Make Changes to Backend:

```bash
# Make your changes to files in functions/ folder
firebase deploy --only functions
```

### When You Make Changes to Frontend:

```bash
cd frontend
npm run build
cd ..
firebase deploy --only hosting
```

### Deploy Everything:

```bash
cd frontend
npm run build
cd ..
firebase deploy
```

---

## Part 14: Monitoring and Maintenance

### View Real-Time Logs:

```bash
# Stream function logs in real-time
firebase functions:log --only api

# View last 100 log entries
firebase functions:log --limit 100

# Filter by severity
firebase functions:log --only api --severity ERROR
```

### Monitor in Firebase Console:

1. **Functions Dashboard:**
   - Go to Firebase Console → Functions
   - View invocations, execution time, memory usage
   - Check error rates

2. **Hosting Dashboard:**
   - Go to Firebase Console → Hosting
   - View bandwidth usage
   - Check request counts

3. **Set Up Alerts:**
   - Go to Firebase Console → Alerts
   - Create alerts for:
     - High error rates
     - Unusual traffic spikes
     - Budget thresholds

### Performance Monitoring:

Add Firebase Performance Monitoring to your frontend:

```bash
cd frontend
npm install firebase
```

Then add to your Next.js app (optional, for advanced monitoring).

### Regular Maintenance:

**Weekly:**
- Check function logs for errors
- Review usage statistics
- Monitor costs

**Monthly:**
- Update dependencies:
  ```bash
  cd functions
  npm update
  cd ../frontend
  npm update
  ```
- Review and optimize slow functions
- Check for security updates

**Quarterly:**
- Review and update Node.js version
- Audit security practices
- Optimize costs if needed

---

## 🔧 Troubleshooting

### Problem: "Firebase command not found"

**Solution:**
```bash
npm install -g firebase-tools
```

### Problem: "Billing account not configured"

**Solution:**
1. Go to Firebase console
2. Upgrade to Blaze plan (see Step 3)

### Problem: "Permission denied"

**Solution:**
```bash
firebase login --reauth
```

### Problem: "Build failed" during frontend build

**Solution:**
```bash
cd frontend
rm -rf node_modules .next out
npm install
npm run build
```

### Problem: "Function deployment failed"

**Solution:**
```bash
cd functions
rm -rf node_modules
npm install
cd ..
firebase deploy --only functions
```

### Problem: API calls return 404

**Solution:**
1. Check your function URL in Firebase console
2. Update `frontend/.env.production` with correct URL
3. Rebuild and redeploy frontend

### Problem: CORS errors

**Solution:**
The `cors({ origin: true })` in `functions/index.js` should handle this, but if you still have issues:

```javascript
app.use(cors({
  origin: ['https://YOUR-PROJECT-ID.web.app', 'https://YOUR-PROJECT-ID.firebaseapp.com'],
  credentials: true
}));
```

### Problem: "Cold start" - First request is very slow

**Solution:**
This is normal for Cloud Functions. Options:
1. Use a free uptime monitor to ping your function every 5 minutes
2. Add a loading message: "Waking up the laboratory..."
3. Upgrade to Cloud Run for faster cold starts (more complex)

### Problem: Rate limit errors (429)

**Solution:**
If you added rate limiting and hit the limit:
1. Wait for the rate limit window to reset
2. Adjust `RATE_LIMIT` in `functions/index.js`
3. Redeploy: `firebase deploy --only functions`

### Problem: Environment variables not working

**Solution:**
```bash
# Set the variable
firebase functions:config:set myvar.key="value"

# Verify it's set
firebase functions:config:get

# Redeploy functions
firebase deploy --only functions
```

### Problem: Function timeout (60 seconds)

**Solution:**
If your function takes too long:
1. Optimize your code
2. Increase timeout in `firebase.json`:
   ```json
   {
     "functions": {
       "source": "functions",
       "runtime": "nodejs18",
       "timeout": "120s"
     }
   }
   ```
3. Redeploy: `firebase deploy --only functions`

### Problem: Out of memory errors

**Solution:**
Increase function memory in `functions/index.js`:
```javascript
export const api = functions
  .runWith({ memory: '512MB' }) // or '1GB', '2GB'
  .https.onRequest(app);
```

### Problem: .firebaserc shows wrong project

**Solution:**
```bash
# List available projects
firebase projects:list

# Switch to correct project
firebase use YOUR-PROJECT-ID

# Verify
cat .firebaserc
```

---

## 📊 Monitoring Your App

### View Function Logs:

```bash
firebase functions:log
```

Or in Firebase console:
1. Go to Functions
2. Click on "api" function
3. Click "Logs" tab

### View Hosting Analytics:

1. Go to Firebase console
2. Click "Hosting" in left sidebar
3. View usage statistics

### Check Costs:

1. Go to Firebase console
2. Click "Usage and billing" in left sidebar
3. View current usage (should be well within free tier)

---

## 💰 Cost Estimates (Free Tier)

**Cloud Functions Free Tier (Blaze Plan):**
- 2M invocations/month
- 400,000 GB-seconds/month
- 200,000 CPU-seconds/month
- 5GB outbound data/month

**Hosting Free Tier:**
- 10 GB storage
- 360 MB/day transfer (≈10.8 GB/month)

**For GhostPatch:**
- Each code analysis = 1 invocation (~200ms execution)
- Each stitch operation = 1 invocation (~300ms execution)
- Typical usage: 100-1000 requests/month
- **Expected cost: $0/month** (well within free tier)

**Cost Beyond Free Tier:**
- Functions: $0.40 per million invocations
- Compute time: $0.0000025 per GB-second
- Outbound data: $0.12 per GB

**Example Calculation (if you exceed free tier):**
- 3M invocations/month = 1M over free tier
- Cost: 1M × $0.40 = $0.40/month
- Still very affordable!

**Set Up Budget Alerts:**
1. Go to Firebase Console → Usage and billing
2. Click "Set budget alert"
3. Set alert at $5 or $10
4. Get email notifications before charges occur

---

## 🎯 Quick Reference Commands

```bash
# Deploy everything
firebase deploy

# Deploy only functions
firebase deploy --only functions

# Deploy only hosting
firebase deploy --only hosting

# View logs (real-time)
firebase functions:log --only api

# View logs (last 100 entries)
firebase functions:log --limit 100

# Test locally (emulator)
firebase emulators:start

# Test functions only
firebase emulators:start --only functions

# Check Firebase status
firebase projects:list

# View current project
firebase use

# Switch project
firebase use YOUR-PROJECT-ID

# Set environment variable
firebase functions:config:set key="value"

# Get environment variables
firebase functions:config:get

# Unset environment variable
firebase functions:config:unset key

# Open Firebase console
firebase open

# Open hosting URL
firebase open hosting:site
```

---

## ✅ Deployment Checklist

**Initial Setup:**
- [ ] Firebase account created
- [ ] Project created in Firebase console
- [ ] Upgraded to Blaze plan
- [ ] Budget alerts configured
- [ ] Firebase CLI installed
- [ ] Logged in to Firebase CLI

**Project Configuration:**
- [ ] Functions folder created and configured
- [ ] `.firebaserc` file verified
- [ ] `firebase.json` configured
- [ ] Environment variables set (if needed)
- [ ] Frontend built successfully
- [ ] Firebase initialized in project

**Local Testing:**
- [ ] Tested with Firebase emulators
- [ ] Backend API working locally
- [ ] Frontend working locally
- [ ] Full integration tested locally

**Production Deployment:**
- [ ] Deployed to Firebase
- [ ] Backend API tested in production
- [ ] Frontend website tested in production
- [ ] Full integration tested in production
- [ ] URLs documented

**Security & Performance:**
- [ ] Rate limiting configured
- [ ] CORS properly configured
- [ ] Input validation added
- [ ] Cold start mitigation (optional)
- [ ] Custom domain configured (optional)

**Monitoring:**
- [ ] Function logs reviewed
- [ ] Performance monitoring set up
- [ ] Error alerts configured
- [ ] Usage dashboard checked

---

## 🆘 Need Help?

**Firebase Documentation:**
- Functions: https://firebase.google.com/docs/functions
- Hosting: https://firebase.google.com/docs/hosting

**Common Issues:**
- Check Firebase console for error messages
- View function logs: `firebase functions:log`
- Test locally: `firebase emulators:start`

---

⚡ **Your GhostPatch is now alive on Firebase!** 

**Your URLs:**
- Frontend: `https://YOUR-PROJECT-ID.web.app`
- Backend: `https://us-central1-YOUR-PROJECT-ID.cloudfunctions.net/api`

Share your creation with the world! 🧟
