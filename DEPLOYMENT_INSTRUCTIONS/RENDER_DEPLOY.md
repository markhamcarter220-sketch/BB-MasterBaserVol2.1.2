# 🚀 Deploying to Render

1. **Create a Render Account** → https://render.com
2. **Create New Web Service**
   - Environment: `Node`
   - Build Command: `npm install`
   - Start Command: `node server.js`
3. **Connect GitHub Repo**
   - Select this repo after pushing to GitHub
4. **Add Environment Variables**
   - `MONGO_URI`
   - `STRIPE_SECRET_KEY`
   - `NODE_ENV=production`
5. **Deploy and Monitor Logs**

✅ Your `render.yaml` file is already included for autoconfig on Render.