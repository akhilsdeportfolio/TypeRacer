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
```

Output: `dist/` folder

---

### 3️⃣ **Deploy to Firebase**

```bash
# Install Firebase CLI
npm install -g firebase-tools

# Login to Firebase
firebase login

# Deploy
firebase deploy --only hosting
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
yarn start              # Start dev server
yarn build              # Build for production

# Firebase
firebase login          # Login to Firebase
firebase init           # Initialize Firebase
firebase serve          # Test locally (port 5000)
firebase deploy         # Deploy to hosting

# Git
git status              # Check status
git add .               # Stage all changes
git commit -m "msg"     # Commit changes
git push origin main    # Push to GitHub (triggers auto-deploy)

# View logs
firebase hosting:channel:list    # List all hosting channels
```

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


