# 📦 Setting up GitHub + Actions

1. **Create a GitHub Repository**
   - Name: `better-bets`
   - Make it private (optional)

2. **Push Code to GitHub**
```bash
git init
git remote add origin https://github.com/YOUR_USERNAME/better-bets.git
git add .
git commit -m "Initial commit"
git push -u origin main
```

3. **CI/CD with GitHub Actions**
- GitHub Actions file already included:
  → `.github/workflows/deploy.yml`
- Triggers on push to `main` and pull requests.

4. **Set Secrets**
Go to `Settings → Secrets → Actions` and add:
   - `MONGO_URI`
   - `STRIPE_SECRET_KEY`

GitHub will now build + test on every push 🚀