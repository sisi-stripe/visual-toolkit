# Deployment Guide

## 🚀 GitHub Pages Deployment (Frontend Only)

The frontend is deployed to GitHub Pages, but you'll need to deploy the backend separately for full functionality.

### Frontend Deployment Status:
- ✅ **GitHub Pages**: Static site hosting
- ✅ **Environment Variables**: Configured for production
- ✅ **Build Process**: Optimized for production

# Your Complete Deployment Workflow:
For Regular Updates:
git add . && git commit -m "changes"
npm run deploy:current   # Most reliable option

# If Deployment Gets Stuck Again:
npm run deploy:fresh     # Forces a clean deployment

# 🔍 How to Verify Deployment:
Check git commit: git ls-remote origin gh-pages
Visit site: https://sisi-stripe.github.io/visual-toolkit/
Hard refresh if cached: Cmd+Shift+R (Mac) or Ctrl+F5 (PC)


### Live Demo:
🔗 **Frontend**: https://sisi-stripe.github.io/visual-toolkit

## ⚠️ Backend Deployment Required

GitHub Pages only hosts static files, so you need to deploy the backend separately:

### Recommended Backend Hosting Options:

#### 1. **Vercel (Recommended)**
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy backend
vercel --prod
```

#### 2. **Railway**
```bash
# Install Railway CLI
npm install -g @railway/cli

# Deploy
railway login
railway deploy
```

#### 3. **Render**
- Connect your GitHub repo to Render
- Deploy as a Node.js service
- Set environment variables in dashboard

#### 4. **Heroku**
```bash
# Install Heroku CLI and deploy
heroku create your-app-name
git push heroku demo:main
```

## 🔧 Production Setup Steps

### 1. Deploy Backend
Choose one of the hosting options above and deploy `server.js`

### 2. Update Environment Variables
Edit `.env.production` with your backend URL:
```env
VITE_API_BASE_URL=https://your-backend-url.vercel.app
VITE_STRIPE_PUBLISHABLE_KEY=pk_live_your_production_key
```

### 3. Update Production Stripe Keys
- Replace test keys with live keys in your backend hosting environment
- Update `.env.production` with live publishable key

### 4. Redeploy Frontend
```bash
npm run deploy
```

## 🎯 Current Deployment Status

- ✅ **Frontend**: Deployed to GitHub Pages
- ⚠️ **Backend**: Needs separate deployment
- ⚠️ **Stripe Integration**: Using test keys (update for production)

## 📋 Post-Deployment Checklist

- [ ] Backend deployed to hosting service
- [ ] Production Stripe keys configured
- [ ] Environment variables updated
- [ ] CORS configured for your domain
- [ ] SSL/HTTPS enabled
- [ ] Domain configured (if using custom domain)

## 🔗 Useful Links

- **GitHub Repository**: https://github.com/sisi-stripe/visual-toolkit
- **Stripe Dashboard**: https://dashboard.stripe.com
- **Vercel Dashboard**: https://vercel.com/dashboard
- **Railway Dashboard**: https://railway.app/dashboard
