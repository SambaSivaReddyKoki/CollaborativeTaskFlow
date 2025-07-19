#!/bin/bash

echo "🚀 Deploying Collaborative TaskFlow to Render..."

# Step 1: Push to GitHub (if not already done)
echo "📤 Pushing to GitHub..."
git add .
git commit -m "Deploy to Render"
git push origin main

echo "✅ Code pushed to GitHub!"

echo "
🎯 Next Steps:

1. Go to https://render.com and sign up/login
2. Click 'New +' and select 'Blueprint'
3. Connect your GitHub repository
4. Render will automatically detect the render.yaml file
5. Click 'Apply' to deploy both frontend and backend

🌐 Your app will be available at:
- Frontend: https://collaborative-taskflow-frontend.onrender.com
- Backend: https://collaborative-taskflow-backend.onrender.com

⏱️  Deployment takes 5-10 minutes for the first time.
" 