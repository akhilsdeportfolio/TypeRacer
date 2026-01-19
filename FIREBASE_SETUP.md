# 🔥 Firebase Hosting & GitHub Actions Setup Guide

This guide will help you set up Firebase Hosting with automatic deployment through GitHub Actions.

---

## 📋 Prerequisites

- Node.js (v16 or higher)
- Firebase account ([firebase.google.com](https://firebase.google.com))
- GitHub account
- Firebase CLI installed globally

---

## 🚀 Step-by-Step Setup

### **Step 1: Install Firebase CLI**

```bash
npm install -g firebase-tools
```

### **Step 2: Login to Firebase**

```bash
firebase login
```

This will open a browser window for authentication.

### **Step 3: Create a Firebase Project**

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Click "Add project"
3. Enter project name (e.g., "typeracer-app")
4. Follow the setup wizard
5. Note your **Project ID**

### **Step 4: Initialize Firebase in Your Project**

```bash
# In your project directory
firebase init hosting
```

When prompted:
- **Select project**: Choose the project you just created
- **Public directory**: Enter `dist`
- **Configure as single-page app**: Yes
- **Set up automatic builds**: No (we'll use GitHub Actions)
- **Overwrite index.html**: No

### **Step 5: Update Firebase Configuration**

Edit `.firebaserc` and replace `your-project-id` with your actual Firebase project ID:

```json
{
  "projects": {
    "default": "your-actual-project-id"
  }
}
```

### **Step 6: Generate Firebase Service Account**

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Select your project
3. Click the gear icon ⚙️ → Project settings
4. Go to "Service accounts" tab
5. Click "Generate new private key"
6. Save the JSON file securely (DO NOT commit this to Git!)

### **Step 7: Add GitHub Secrets**

1. Go to your GitHub repository
2. Navigate to **Settings** → **Secrets and variables** → **Actions**
3. Click **New repository secret**
4. Add the following secret:

**Secret Name:** `FIREBASE_SERVICE_ACCOUNT`
**Secret Value:** Paste the entire contents of the service account JSON file

### **Step 8: Update GitHub Actions Workflows**

Edit both workflow files and replace `your-project-id` with your actual Firebase project ID:

**Files to update:**
- `.github/workflows/firebase-hosting-merge.yml` (line 32)
- `.github/workflows/firebase-hosting-pull-request.yml` (line 28)

```yaml
projectId: your-actual-project-id
```

### **Step 9: Build Your Project Locally (Test)**

```bash
yarn build
```

This creates the `dist` folder with your production build.

### **Step 10: Test Firebase Hosting Locally**

```bash
firebase serve
```

Visit `http://localhost:5000` to preview your app.

### **Step 11: Manual Deploy (Optional)**

```bash
firebase deploy --only hosting
```

This deploys your app to Firebase Hosting manually.

### **Step 12: Commit and Push**

```bash
git add .
git commit -m "Add Firebase hosting and GitHub Actions auto-deploy"
git push origin main
```

---

## ✅ **How It Works**

### **Automatic Deployment on Push to Main**

When you push to the `main` branch:
1. GitHub Actions triggers the workflow
2. Installs dependencies with Yarn
3. Builds the production bundle
4. Deploys to Firebase Hosting (live channel)
5. Your app is live at: `https://your-project-id.web.app`

### **Preview Deployments on Pull Requests**

When you create a pull request:
1. GitHub Actions triggers the preview workflow
2. Builds the app
3. Deploys to a temporary preview channel
4. Adds a comment to the PR with the preview URL
5. Preview is automatically deleted when PR is merged/closed

---

## 🌐 **Your Live URLs**

After deployment, your app will be available at:

- **Production:** `https://your-project-id.web.app`
- **Alternative:** `https://your-project-id.firebaseapp.com`
- **Custom Domain:** Can be configured in Firebase Console

---

## 📊 **GitHub Actions Workflows**

### **Workflow 1: Deploy on Merge** (`.github/workflows/firebase-hosting-merge.yml`)
- **Trigger:** Push to `main` branch
- **Action:** Deploy to production
- **Channel:** Live

### **Workflow 2: Deploy on PR** (`.github/workflows/firebase-hosting-pull-request.yml`)
- **Trigger:** Pull request created/updated
- **Action:** Deploy to preview channel
- **Channel:** Temporary preview URL

---

## 🔧 **Useful Firebase Commands**

```bash
# Login to Firebase
firebase login

# List your projects
firebase projects:list

# Deploy to hosting
firebase deploy --only hosting

# Serve locally
firebase serve

# View hosting URLs
firebase hosting:channel:list

# Open Firebase Console
firebase open hosting
```

---

## 🎯 **Verification Steps**

1. ✅ Firebase project created
2. ✅ `.firebaserc` updated with project ID
3. ✅ Service account JSON generated
4. ✅ `FIREBASE_SERVICE_ACCOUNT` secret added to GitHub
5. ✅ Workflow files updated with project ID
6. ✅ Code committed and pushed to GitHub
7. ✅ GitHub Actions workflow runs successfully
8. ✅ App is live on Firebase Hosting

---

## 🐛 **Troubleshooting**

### **Build Fails in GitHub Actions**

- Check that `yarn build` works locally
- Verify all dependencies are in `package.json`
- Check GitHub Actions logs for specific errors

### **Deployment Fails**

- Verify `FIREBASE_SERVICE_ACCOUNT` secret is set correctly
- Check that project ID matches in all files
- Ensure Firebase Hosting is enabled in Firebase Console

### **404 Errors on Deployed Site**

- Verify `dist` folder is being created during build
- Check `firebase.json` public directory is set to `dist`
- Ensure rewrites are configured for SPA

---

## 📚 **Additional Resources**

- [Firebase Hosting Documentation](https://firebase.google.com/docs/hosting)
- [GitHub Actions Documentation](https://docs.github.com/en/actions)
- [Firebase CLI Reference](https://firebase.google.com/docs/cli)

---

## 🎉 **You're All Set!**

Your TypeRacer app will now automatically deploy to Firebase Hosting whenever you push to the `main` branch!

**Next Steps:**
1. Push your code to GitHub
2. Watch the GitHub Actions workflow run
3. Visit your live app at `https://your-project-id.web.app`
4. Share your world-class TypeRacer with the world! 🚀


