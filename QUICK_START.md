# ⚡ Quick Start Guide

## 🚀 Get Started in 3 Steps

### 1️⃣ **Install & Run Locally**

```bash
# Install dependencies
yarn install

# Start development server
yarn start
```

Visit: `http://localhost:8080/`

---

### 2️⃣ **Build for Production**

```bash
# Create production build
yarn build

# Or test production build locally
yarn serve:build
```

Output: `dist/` folder

---

### 3️⃣ **Deploy to Firebase**

```bash
# One-command deployment (recommended)
yarn deploy:prod

# Or manual steps
yarn build
yarn deploy
```

---

## 🔥 Firebase Auto-Deploy Setup (One-Time)

### Quick Setup Checklist:

- [ ] Create Firebase project at [console.firebase.google.com](https://console.firebase.google.com)
- [ ] Note your Firebase Project ID
- [ ] Generate service account JSON (Project Settings → Service Accounts)
- [ ] Add `FIREBASE_SERVICE_ACCOUNT` secret to GitHub (Settings → Secrets)
- [ ] Update `.firebaserc` with your project ID
- [ ] Update `.github/workflows/firebase-hosting-merge.yml` (line 32)
- [ ] Update `.github/workflows/firebase-hosting-pull-request.yml` (line 28)
- [ ] Push to GitHub

### After Setup:

✅ **Every push to `main`** → Auto-deploys to production  
✅ **Every pull request** → Creates preview deployment  
✅ **Live URL:** `https://your-project-id.web.app`

---

## 📚 Full Documentation

- **[README.md](./README.md)** - Project overview
- **[FIREBASE_SETUP.md](./FIREBASE_SETUP.md)** - Detailed Firebase setup
- **[WORLD_CLASS_FEATURES.md](./WORLD_CLASS_FEATURES.md)** - All features

---

## 🎯 Common Commands

```bash
# Development
yarn start              # Start dev server (localhost:8080)
yarn build              # Build for production

# Testing Production Build
yarn serve:build        # Build and serve locally (localhost:5000)
yarn test:local         # Build and serve on port 5002

# Deployment
yarn deploy:prod        # Build and deploy (recommended)
yarn deploy             # Deploy existing build
yarn preview            # Deploy to preview channel

# Maintenance
yarn clean              # Remove dist/ folder
yarn rebuild            # Clean and rebuild

# Git
git status              # Check status
git add .               # Stage all changes
git commit -m "msg"     # Commit changes
git push origin main    # Push to GitHub (triggers auto-deploy)
```

**See [SCRIPTS.md](./SCRIPTS.md) for complete scripts documentation.**

---

## 🐛 Troubleshooting

**Build fails?**
```bash
rm -rf node_modules
yarn install
yarn build
```

**Firebase deploy fails?**
- Check you're logged in: `firebase login`
- Verify project ID in `.firebaserc`
- Ensure Hosting is enabled in Firebase Console

**GitHub Actions fails?**
- Check `FIREBASE_SERVICE_ACCOUNT` secret is set
- Verify project ID in workflow files
- Check Actions tab for detailed logs

---

## 🎉 You're Ready!

Your TypeRacer is now:
- ✅ Running locally
- ✅ Ready to build
- ✅ Ready to deploy
- ✅ Auto-deploy configured

**Happy typing!** ⌨️🚀


