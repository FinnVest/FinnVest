# Local Testing Guide for Finnvest Website

## 🚀 Quick Start (Recommended)

### Method 1: Using the Provided Scripts

1. **Double-click** `start-server.bat` or run it from the command line
2. **Open your browser** and go to `http://localhost:8000`
3. **Test your website** - try submitting emails, checking forms, etc.
4. **Press Ctrl+C** in the terminal to stop the server

### Method 2: Manual PowerShell

```powershell
# In your project directory, run:
powershell -ExecutionPolicy Bypass -File "start-local-server.ps1"
```

## 🔍 What to Test Locally

### 1. **Basic Functionality**
- [ ] Website loads without errors
- [ ] All images display correctly
- [ ] Navigation works (smooth scrolling, menu)
- [ ] Language switching works (ES/EN)

### 2. **Form Testing**
- [ ] Email validation works
- [ ] Form submission doesn't crash
- [ ] Error messages display correctly
- [ ] Success messages show up

### 3. **JavaScript Testing**
- [ ] Open browser Developer Tools (F12)
- [ ] Check Console tab for any errors
- [ ] Test all interactive elements
- [ ] Verify Supabase integration (if configured)

### 4. **Responsive Design**
- [ ] Test on different screen sizes
- [ ] Check mobile responsiveness
- [ ] Verify all elements are visible

## 🛠️ Alternative Methods

### Method 3: Using Python (if installed)
```bash
python -m http.server 8000
```

### Method 4: Using Node.js (if installed)
```bash
npx http-server -p 8000
```

### Method 5: Using Live Server (VS Code Extension)
1. Install "Live Server" extension in VS Code
2. Right-click on `index.html`
3. Select "Open with Live Server"

## 🐛 Common Issues & Solutions

### Issue: "Execution Policy" Error
**Solution:**
```powershell
Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser
```

### Issue: Port 8000 Already in Use
**Solution:** Change the port in the script or kill the process:
```powershell
netstat -ano | findstr :8000
taskkill /PID <PID> /F
```

### Issue: Files Not Loading
**Solution:** Check file paths and ensure all files are in the correct directory

## 📋 Pre-Deployment Checklist

Before deploying to Netlify, ensure:

- [ ] Website works perfectly locally
- [ ] No console errors in browser
- [ ] All forms submit without issues
- [ ] All images and assets load correctly
- [ ] Responsive design works on mobile
- [ ] Language switching functions properly
- [ ] Email validation works correctly

## 🔧 Environment Variables (for Supabase)

If you need to test with Supabase locally, create a `.env` file:
```
SUPABASE_URL=your_supabase_url
SUPABASE_ANON_KEY=your_supabase_anon_key
```

## 📝 Testing Notes

- **Always test locally first** before pushing to Git
- **Check browser console** for JavaScript errors
- **Test on multiple browsers** (Chrome, Firefox, Edge)
- **Test on mobile devices** or use browser dev tools
- **Verify all links** work correctly

## 🚨 Emergency Stop

If something goes wrong:
1. Press `Ctrl+C` in the terminal to stop the server
2. Close the browser tab
3. Check the console for error messages
4. Fix issues and restart the server

---

**Remember:** Local testing helps catch 90% of deployment issues before they reach production! 