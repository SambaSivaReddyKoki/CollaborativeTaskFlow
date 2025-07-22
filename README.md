# 🚀 Collaborative TaskFlow

A full-stack web application for team collaboration and task management, built with React frontend and Ruby on Rails backend.

## ✨ Features

### 🔐 Authentication & User Management
- **User Registration & Login**: Secure JWT-based authentication
- **User Profiles**: View and manage user information
- **Role-based Access**: Different permissions for different users

### 📋 Project Management
- **Create Projects**: Add new projects with descriptions
- **Edit Projects**: Modify existing project details
- **Delete Projects**: Remove projects (with confirmation)
- **Project Dashboard**: View all projects with task counts

### ✅ Task Management
- **Create Tasks**: Add tasks with titles, descriptions, and due dates
- **Assign Tasks**: Assign tasks to team members
- **Status Tracking**: Track task progress (To Do, In Progress, Done)
- **Edit Tasks**: Modify task details and assignments
- **Delete Tasks**: Remove tasks with confirmation
- **Due Date Management**: Set and track task deadlines

### 👥 Team Collaboration
- **User Assignment**: Assign tasks to specific team members
- **Project Ownership**: Track who created each project
- **Task Filtering**: View tasks by assignee or project
- **Real-time Updates**: See changes immediately

### 🎨 Modern UI/UX
- **Responsive Design**: Works on desktop, tablet, and mobile
- **Modern Interface**: Clean, professional design with smooth animations
- **Modal Forms**: Intuitive forms for creating and editing
- **Status Indicators**: Visual status tracking with color coding
- **Loading States**: Smooth loading experiences

## 🛠️ Technology Stack

### Frontend
- **React 18**: Modern React with hooks and functional components
- **CSS3**: Custom styling with modern design patterns
- **Fetch API**: HTTP requests to backend
- **Local Storage**: JWT token storage

### Backend
- **Ruby on Rails 8**: API-only Rails application
- **PostgreSQL**: Robust database for data persistence
- **JWT**: JSON Web Tokens for authentication
- **bcrypt**: Secure password hashing
- **Rack CORS**: Cross-origin resource sharing

### Database
- **PostgreSQL**: Production-ready database
- **Active Record**: ORM for database operations
- **Migrations**: Database schema management

## 🚀 Getting Started

### Prerequisites
- Ruby 3.4+
- Rails 8.0+
- PostgreSQL
- Node.js 18+
- npm

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd CollaborativeTaskFlow
   ```

2. **Backend Setup**
   ```bash
   cd backend
   bundle install
   rails db:create
   rails db:migrate
   rails db:seed
   rails server -b 0.0.0.0 -p 3001
   ```

3. **Frontend Setup**
   ```bash
   cd frontend
   npm install
   npm start
   ```

4. **Access the Application**
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:3001

## 📊 Database Schema

### Users
- `id`: Primary key
- `name`: User's full name
- `email`: Unique email address
- `password_digest`: Hashed password
- `created_at`, `updated_at`: Timestamps

### Projects
- `id`: Primary key
- `name`: Project name
- `description`: Project description
- `creator_id`: Foreign key to User (who created the project)
- `created_at`, `updated_at`: Timestamps

### Tasks
- `id`: Primary key
- `title`: Task title
- `description`: Task description
- `status`: Task status (todo, in-progress, done)
- `due_date`: Task deadline
- `assignee_id`: Foreign key to User (who is assigned)
- `project_id`: Foreign key to Project
- `created_at`, `updated_at`: Timestamps

### Comments
- `id`: Primary key
- `content`: Comment text
- `user_id`: Foreign key to User (who wrote the comment)
- `task_id`: Foreign key to Task
- `created_at`, `updated_at`: Timestamps

## 🔌 API Endpoints

### Authentication
- `POST /users` - Register new user
  <img width="1906" height="977" alt="image" src="https://github.com/user-attachments/assets/ba0345ce-3203-4f7d-a707-6c93bd6b5a3e" />
- `POST /users/login` - User login
  <img width="1919" height="969" alt="image" src="https://github.com/user-attachments/assets/4674cf3a-788a-45d6-a310-3dcf6dcf2102" />
- `GET /users/profile` - Get current user profile

### Users
- `GET /users` - List all users
- `GET /users/:id` - Get specific user
- `PUT /users/:id` - Update user
- `DELETE /users/:id` - Delete user

### Projects
- `GET /projects` - List all projects
- `GET /projects/:id` - Get specific project
- `POST /projects` - Create new project
- `PUT /projects/:id` - Update project
- `DELETE /projects/:id` - Delete project

### Tasks
- `GET /tasks` - List all tasks
- `GET /tasks/:id` - Get specific task
- `POST /tasks` - Create new task
- `PUT /tasks/:id` - Update task
- `DELETE /tasks/:id` - Delete task

### Comments
- `GET /comments` - List all comments
- `GET /comments/:id` - Get specific comment
- `POST /comments` - Create new comment
- `PUT /comments/:id` - Update comment
- `DELETE /comments/:id` - Delete comment

## 🎯 Usage Guide

### 1. Registration & Login
- Visit the application and click "Sign up"
- Fill in your details and create an account
- Use your credentials to log in

### 2. Creating Projects
- Click "Projects" tab
- Click "+ New Project" button
- Fill in project name and description
- Click "Create" to save

### 3. Creating Tasks
- Click "My Tasks" or "All Tasks" tab
- Click "+ New Task" button
- Fill in task details:
  - Title and description
  - Select project
  - Assign to team member
  - Set due date
  - Choose status
- Click "Create" to save

### 4. Managing Tasks
- View tasks in different tabs:
  - **My Tasks**: Tasks assigned to you
  - **All Tasks**: All tasks in the system
- Change task status using the dropdown
- Edit or delete tasks using action buttons

### 5. Project Management
- View all projects in the Projects tab
- See task counts for each project
- Edit or delete projects as needed

## 🔒 Security Features

- **JWT Authentication**: Secure token-based authentication
- **Password Hashing**: bcrypt for secure password storage
- **CORS Configuration**: Proper cross-origin request handling
- **Input Validation**: Server-side validation for all inputs
- **SQL Injection Protection**: Active Record prevents SQL injection

## 🎨 UI Components

### Modals
- **ProjectModal**: Create and edit projects
- **TaskModal**: Create and edit tasks
- **Responsive Design**: Works on all screen sizes

### Dashboard
- **Navigation Tabs**: Switch between Projects, My Tasks, All Tasks
- **Action Buttons**: Edit, delete, and status change buttons
- **Loading States**: Smooth loading indicators
- **Empty States**: Helpful messages when no data exists

## 🚀 Deployment

### Backend Deployment
1. Set up PostgreSQL database
2. Configure environment variables
3. Run migrations and seed data
4. Deploy to your preferred platform (Heroku, AWS, etc.)

### Frontend Deployment
1. Build the production version: `npm run build`
2. Deploy the build folder to your hosting service
3. Configure API endpoint URLs for production

