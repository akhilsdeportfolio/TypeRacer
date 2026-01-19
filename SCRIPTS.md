# 📜 NPM Scripts Reference

Complete guide to all available scripts in this project.

---

## 🚀 Development Scripts

### `yarn start`
**Purpose:** Start development server with hot reload  
**Port:** `http://localhost:8080`  
**Mode:** Development (unminified, with source maps)  
**Use when:** Actively developing and testing features

```bash
yarn start
```

**Features:**
- ✅ Hot Module Replacement (HMR)
- ✅ Fast rebuild on file changes
- ✅ Source maps for debugging
- ✅ Development warnings enabled

---

## 🏗️ Build Scripts

### `yarn build`
**Purpose:** Create production build  
**Output:** `dist/` folder  
**Mode:** Production (minified, optimized)  
**Use when:** Preparing for deployment

```bash
yarn build
```

**Output includes:**
- Minified JavaScript bundles
- Optimized CSS
- Compressed assets
- Cache-busted filenames

---

### `yarn build:prod`
**Purpose:** Production build with explicit NODE_ENV  
**Output:** `dist/` folder  
**Mode:** Production with environment variable set  
**Use when:** Ensuring production optimizations

```bash
yarn build:prod
```

**Additional optimizations:**
- React production mode
- Dead code elimination
- Tree shaking
- Minification

---

### `yarn build:analyze` (or `yarn analyze`)
**Purpose:** Build with interactive bundle analyzer
**Output:** `dist/` folder + `bundle-report.html`
**Use when:** Analyzing bundle size and composition

```bash
yarn analyze
# or
yarn build:analyze
```

**Features:**
- Opens interactive visualization in browser
- Shows bundle sizes and composition
- Identifies duplicate dependencies
- Helps optimize bundle size

---

### `yarn build:stats`
**Purpose:** Generate webpack stats JSON
**Output:** `stats.json` file
**Use when:** Need raw stats for external tools

```bash
yarn build:stats
```

**Then analyze with:**
```bash
# Upload stats.json to https://webpack.github.io/analyse/
# Or use other analysis tools
```

---

### `yarn clean`
**Purpose:** Remove build artifacts  
**Removes:** `dist/` folder  
**Use when:** Starting fresh build

```bash
yarn clean
```

---

### `yarn rebuild`
**Purpose:** Clean and rebuild from scratch  
**Combines:** `clean` + `build`  
**Use when:** Troubleshooting build issues

```bash
yarn rebuild
```

---

## 🔥 Firebase Scripts

### `yarn serve`
**Purpose:** Serve existing build with Firebase emulator  
**Port:** `http://localhost:5000` (default)  
**Requires:** `dist/` folder must exist  
**Use when:** Testing Firebase hosting configuration

```bash
yarn serve
```

**Note:** Run `yarn build` first if `dist/` doesn't exist

---

### `yarn serve:build`
**Purpose:** Build and serve with Firebase emulator  
**Combines:** `build` + `serve`  
**Port:** `http://localhost:5000`  
**Use when:** Testing production build locally

```bash
yarn serve:build
```

**This is equivalent to:**
```bash
yarn build
yarn serve
```

---

### `yarn test:local`
**Purpose:** Build and serve on specific port for testing  
**Port:** `http://localhost:5002`  
**Use when:** Testing before deployment

```bash
yarn test:local
```

---

## 🚀 Deployment Scripts

### `yarn deploy`
**Purpose:** Deploy existing build to Firebase Hosting  
**Requires:** `dist/` folder must exist  
**Target:** Production (fronten-prepp.web.app)  
**Use when:** Deploying pre-built application

```bash
yarn deploy
```

**Prerequisites:**
- Firebase CLI installed
- Logged in (`firebase login`)
- `dist/` folder exists

---

### `yarn deploy:prod`
**Purpose:** Build and deploy to Firebase Hosting  
**Combines:** `build` + `deploy`  
**Target:** Production  
**Use when:** Complete build and deploy workflow

```bash
yarn deploy:prod
```

**This is the recommended deployment command!**

**Steps performed:**
1. ✅ Clean build
2. ✅ Production optimization
3. ✅ Deploy to Firebase
4. ✅ Live at fronten-prepp.web.app

---

### `yarn preview`
**Purpose:** Deploy to Firebase preview channel  
**Target:** Preview channel (temporary URL)  
**Use when:** Testing before production deploy

```bash
yarn preview
```

**Creates temporary URL like:**
`https://fronten-prepp--preview-abc123.web.app`

---

## 📋 Common Workflows

### **Local Development**
```bash
# Start dev server
yarn start

# Visit http://localhost:8080
# Make changes, see them instantly
```

---

### **Test Production Build Locally**
```bash
# Build and serve
yarn serve:build

# Visit http://localhost:5000
# Test production optimizations
```

---

### **Deploy to Production**
```bash
# Complete deployment
yarn deploy:prod

# Visit https://fronten-prepp.web.app
```

---

### **Preview Before Production**
```bash
# Build first
yarn build

# Deploy to preview
yarn preview

# Test preview URL
# If good, deploy to production
yarn deploy
```

---

### **Troubleshooting Build Issues**
```bash
# Clean rebuild
yarn rebuild

# Or manually
yarn clean
yarn build
```

---

## 🎯 Quick Reference Table

| Script | Command | Purpose | Output |
|--------|---------|---------|--------|
| `start` | `yarn start` | Dev server | localhost:8080 |
| `build` | `yarn build` | Production build | dist/ |
| `build:prod` | `yarn build:prod` | Build with NODE_ENV | dist/ |
| `analyze` | `yarn analyze` | Interactive bundle analyzer | bundle-report.html |
| `build:analyze` | `yarn build:analyze` | Same as analyze | bundle-report.html |
| `build:stats` | `yarn build:stats` | Generate stats JSON | stats.json |
| `serve` | `yarn serve` | Firebase emulator | localhost:5000 |
| `serve:build` | `yarn serve:build` | Build + serve | localhost:5000 |
| `test:local` | `yarn test:local` | Build + serve:5002 | localhost:5002 |
| `deploy` | `yarn deploy` | Deploy to Firebase | Live URL |
| `deploy:prod` | `yarn deploy:prod` | Build + deploy | Live URL |
| `preview` | `yarn preview` | Preview channel | Preview URL |
| `clean` | `yarn clean` | Remove dist/ | - |
| `rebuild` | `yarn rebuild` | Clean + build | dist/ |

---

## 💡 Pro Tips

**1. Always test locally before deploying:**
```bash
yarn serve:build
```

**2. Use preview channels for testing:**
```bash
yarn preview
```

**3. Analyze bundle size regularly:**
```bash
yarn build:analyze
```

**4. Clean build if issues occur:**
```bash
yarn rebuild
```

**5. One-command deployment:**
```bash
yarn deploy:prod
```

---

## 🔧 Environment Variables

Currently no environment variables are required. If you add them:

```bash
# Create .env file
REACT_APP_API_KEY=your-key

# Access in code
process.env.REACT_APP_API_KEY
```

---

## 📚 Additional Resources

- **Webpack Docs:** https://webpack.js.org/
- **Firebase Hosting:** https://firebase.google.com/docs/hosting
- **React Docs:** https://react.dev/

---

**Happy coding!** 🚀


