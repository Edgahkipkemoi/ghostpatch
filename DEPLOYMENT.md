# 🧟 GhostPatch Deployment Guide

⚡ **Bring your creation to life!** This guide covers local, production, and cloud deployment.

---

## 📋 Prerequisites

- **Node.js** 18+ and npm
- **Git** (for cloning)
- 2GB+ RAM recommended
- Port 3000 (frontend) and 3001 (backend) available

---

## 🔬 Local Development Deployment

### 1. Clone & Install

```bash
# Clone the repository
git clone <your-repo-url>
cd ghostpatch

# Install all dependencies (root, backend, frontend)
npm run install:all
```

### 2. Start Development Servers

```bash
# Start both frontend and backend concurrently
npm run dev
```

This will start:
- **Backend**: http://localhost:3001
- **Frontend**: http://localhost:3000

### 3. Verify Installation

Open http://localhost:3000 in your browser. You should see the GhostPatch interface.

Test the backend health endpoint:
```bash
curl http://localhost:3001/api/health
```

---

## 🏭 Production Deployment

### Option 1: Traditional Server (VPS/Dedicated)

#### Step 1: Prepare the Server

```bash
# Update system
sudo apt update && sudo apt upgrade -y

# Install Node.js 18+
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt install -y nodejs

# Install PM2 for process management
sudo npm install -g pm2

# Install nginx (optional, for reverse proxy)
sudo apt install -y nginx
```

#### Step 2: Deploy Application

```bash
# Clone repository
git clone <your-repo-url> /var/www/ghostpatch
cd /var/www/ghostpatch

# Install dependencies
npm run install:all

# Build frontend for production
cd frontend
npm run build
cd ..
```

#### Step 3: Configure PM2

Create `ecosystem.config.js` in project root:

```javascript
module.exports = {
  apps: [
    {
      name: 'ghostpatch-backend',
      cwd: './backend',
      script: 'server.js',
      env: {
        NODE_ENV: 'production',
        PORT: 3001
      }
    },
    {
      name: 'ghostpatch-frontend',
      cwd: './frontend',
      script: 'node_modules/next/dist/bin/next',
      args: 'start',
      env: {
        NODE_ENV: 'production',
        PORT: 3000
      }
    }
  ]
};
```

Start with PM2:
```bash
pm2 start ecosystem.config.js
pm2 save
pm2 startup
```

#### Step 4: Configure Nginx (Optional)

Create `/etc/nginx/sites-available/ghostpatch`:

```nginx
server {
    listen 80;
    server_name your-domain.com;

    # Frontend
    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }

    # Backend API
    location /api {
        proxy_pass http://localhost:3001;
        proxy_http_version 1.1;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
    }
}
```

Enable and restart:
```bash
sudo ln -s /etc/nginx/sites-available/ghostpatch /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl restart nginx
```

---

### Option 2: Docker Deployment

#### Step 1: Create Dockerfiles

**Backend Dockerfile** (`backend/Dockerfile`):
```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
EXPOSE 3001
CMD ["node", "server.js"]
```

**Frontend Dockerfile** (`frontend/Dockerfile`):
```dockerfile
FROM node:18-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

FROM node:18-alpine
WORKDIR /app
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/public ./public
EXPOSE 3000
CMD ["npm", "start"]
```

#### Step 2: Create Docker Compose

**docker-compose.yml** (root):
```yaml
version: '3.8'

services:
  backend:
    build: ./backend
    ports:
      - "3001:3001"
    environment:
      - NODE_ENV=production
    restart: unless-stopped

  frontend:
    build: ./frontend
    ports:
      - "3000:3000"
    environment:
      - NODE_ENV=production
      - NEXT_PUBLIC_API_URL=http://localhost:3001
    depends_on:
      - backend
    restart: unless-stopped
```

#### Step 3: Deploy with Docker

```bash
# Build and start
docker-compose up -d

# View logs
docker-compose logs -f

# Stop
docker-compose down
```

---

### Option 3: Cloud Platform Deployment

#### Vercel (Frontend Only - Recommended for Frontend)

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy frontend
cd frontend
vercel --prod
```

**Note**: You'll need to deploy the backend separately (see Railway/Render below).

Update frontend environment variable:
- `NEXT_PUBLIC_API_URL`: Your backend URL

---

#### Railway (Full Stack)

1. Create account at https://railway.app
2. Click "New Project" → "Deploy from GitHub"
3. Select your repository
4. Railway will auto-detect and deploy both services

Configure services:
- **Backend**: Root directory = `backend`, Start command = `node server.js`
- **Frontend**: Root directory = `frontend`, Start command = `npm start`

---

#### Render (Full Stack)

1. Create account at https://render.com
2. Create two Web Services:

**Backend Service**:
- Build Command: `cd backend && npm install`
- Start Command: `cd backend && node server.js`
- Port: 3001

**Frontend Service**:
- Build Command: `cd frontend && npm install && npm run build`
- Start Command: `cd frontend && npm start`
- Port: 3000
- Environment Variable: `NEXT_PUBLIC_API_URL` = your backend URL

---

#### DigitalOcean App Platform

1. Create account at https://www.digitalocean.com
2. Go to App Platform → Create App
3. Connect GitHub repository
4. Configure components:

**Backend**:
- Type: Web Service
- Source Directory: `/backend`
- Build Command: `npm install`
- Run Command: `node server.js`
- HTTP Port: 3001

**Frontend**:
- Type: Web Service
- Source Directory: `/frontend`
- Build Command: `npm install && npm run build`
- Run Command: `npm start`
- HTTP Port: 3000

---

## 🔧 Environment Configuration

### Backend Environment Variables

Create `backend/.env`:
```env
NODE_ENV=production
PORT=3001
CORS_ORIGIN=https://your-frontend-domain.com
```

Update `backend/server.js`:
```javascript
import dotenv from 'dotenv';
dotenv.config();

const PORT = process.env.PORT || 3001;
const corsOptions = {
  origin: process.env.CORS_ORIGIN || '*'
};

app.use(cors(corsOptions));
```

### Frontend Environment Variables

Create `frontend/.env.production`:
```env
NEXT_PUBLIC_API_URL=https://your-backend-domain.com
```

Update API calls in frontend to use:
```javascript
const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';
```

---

## 🔒 Security Checklist

- [ ] Set proper CORS origins (not `*` in production)
- [ ] Use HTTPS (Let's Encrypt with Certbot)
- [ ] Set rate limiting on API endpoints
- [ ] Validate and sanitize all user inputs
- [ ] Keep dependencies updated (`npm audit`)
- [ ] Use environment variables for sensitive data
- [ ] Implement request size limits (already set to 10mb)
- [ ] Add authentication if needed

---

## 📊 Monitoring & Maintenance

### PM2 Monitoring

```bash
# View status
pm2 status

# View logs
pm2 logs ghostpatch-backend
pm2 logs ghostpatch-frontend

# Restart services
pm2 restart all

# Monitor resources
pm2 monit
```

### Health Checks

Set up monitoring for:
- Backend: `GET /api/health`
- Frontend: `GET /` (should return 200)

### Updates

```bash
# Pull latest changes
git pull origin main

# Reinstall dependencies
npm run install:all

# Rebuild frontend
cd frontend && npm run build && cd ..

# Restart services
pm2 restart all
```

---

## 🧪 Testing Deployment

### 1. Backend Health Check
```bash
curl https://your-backend-domain.com/api/health
```

Expected: `{"status":"⚡ The laboratory is operational!"}`

### 2. Frontend Access
Open https://your-frontend-domain.com in browser

### 3. Full Integration Test
1. Paste sample code in editor
2. Click "Analyze Code"
3. Click "Stitch Code"
4. Download ZIP file

---

## 🆘 Troubleshooting

### Port Already in Use
```bash
# Find process using port
lsof -i :3000
lsof -i :3001

# Kill process
kill -9 <PID>
```

### Frontend Can't Connect to Backend
- Check CORS settings
- Verify `NEXT_PUBLIC_API_URL` is set correctly
- Check firewall rules
- Verify backend is running: `curl http://localhost:3001/api/health`

### Build Failures
```bash
# Clear caches
rm -rf node_modules package-lock.json
rm -rf backend/node_modules backend/package-lock.json
rm -rf frontend/node_modules frontend/package-lock.json frontend/.next

# Reinstall
npm run install:all
```

### Memory Issues
- Increase Node.js memory: `NODE_OPTIONS=--max-old-space-size=4096`
- Use PM2 with memory limits: `max_memory_restart: '500M'`

---

## 🎯 Quick Deploy Commands

### Local Development
```bash
npm run install:all && npm run dev
```

### Production (PM2)
```bash
npm run install:all && \
cd frontend && npm run build && cd .. && \
pm2 start ecosystem.config.js
```

### Docker
```bash
docker-compose up -d --build
```

---

## 📞 Support

If you encounter issues:
1. Check logs: `pm2 logs` or `docker-compose logs`
2. Verify all dependencies are installed
3. Check firewall and port availability
4. Review environment variables

⚡ **Your creation is ready to rise!** Choose your deployment method and bring GhostPatch to life!
