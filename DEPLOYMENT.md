# Deployment Guide

## 🚀 How to Deploy Collaborative TaskFlow

### Frontend (Vercel) + Backend (Railway/Heroku)

#### 1. Deploy Backend First

**Option A: Railway (Recommended)**
```bash
# Install Railway CLI
npm install -g @railway/cli

# Login to Railway
railway login

# Deploy backend
cd backend
railway init
railway up
```

**Option B: Heroku**
```bash
# Install Heroku CLI
# Create new Heroku app
heroku create your-app-name

# Deploy backend
cd backend
git add .
git commit -m "Deploy backend"
git push heroku main

# Run migrations
heroku run rails db:migrate
```

#### 2. Get Backend URL
After deployment, get your backend URL:
- Railway: `https://your-app-name.railway.app`
- Heroku: `https://your-app-name.herokuapp.com`

#### 3. Deploy Frontend to Vercel

1. **Set Environment Variable in Vercel:**
   - Go to your Vercel project settings
   - Add environment variable: `REACT_APP_API_URL`
   - Set value to your backend URL (e.g., `https://your-app-name.railway.app`)

2. **Deploy:**
   ```bash
   # Deploy frontend directory to Vercel
   cd frontend
   vercel --prod
   ```

#### 4. Alternative: Deploy Both to Railway

Railway supports both frontend and backend:

```bash
# Deploy entire project
railway init
railway up

# Set environment variables in Railway dashboard
REACT_APP_API_URL=https://your-backend-url.railway.app
```

### Environment Variables

**Frontend (.env.local):**
```
REACT_APP_API_URL=http://localhost:3001
```

**Backend (.env):**
```
DATABASE_URL=your_database_url
JWT_SECRET=your_jwt_secret
```

### Database Setup

Make sure to:
1. Set up PostgreSQL database
2. Run migrations: `rails db:migrate`
3. Seed data if needed: `rails db:seed`

### CORS Configuration

Update `backend/config/initializers/cors.rb`:
```ruby
Rails.application.config.middleware.insert_before 0, Rack::Cors do
  allow do
    origins 'https://your-frontend-domain.vercel.app'
    resource '*', headers: :any, methods: [:get, :post, :put, :patch, :delete, :options, :head]
  end
end
``` 