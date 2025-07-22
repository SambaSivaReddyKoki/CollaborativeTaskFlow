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
<img width="1920" height="1080" alt="image" src="https://github.com/user-attachments/assets/1896a999-14c9-4d35-a8b0-f3f87f9d0ac6" />


### Users
- `GET /users` - List all users
  <img width="1920" height="1080" alt="image" src="https://github.com/user-attachments/assets/d9202e7e-e406-4ff2-a121-e732085ea69d" />

- `GET /users/:id` - Get specific user
<img width="1920" height="1080" alt="image" src="https://github.com/user-attachments/assets/a6802013-fdc7-4ade-96d3-c63abf13e93f" />

- `PUT /users/:id` - Update user
  <img width="1920" height="1080" alt="image" src="https://github.com/user-attachments/assets/8148f380-4711-4700-94ff-612c84fde7ad" />

- `DELETE /users/:id` - Delete user
  <img width="1920" height="1080" alt="image" src="https://github.com/user-attachments/assets/1fa5537c-d838-43d5-ac98-10af47095106" />
  <img width="1920" height="1080" alt="image" src="https://github.com/user-attachments/assets/adf52b42-88d4-4b32-ba93-d53c422a0529" />



### Projects
- `GET /projects` - List all projects
  <img width="1910" height="916" alt="image" src="https://github.com/user-attachments/assets/8cacc9ff-e6ee-43b9-887a-db72e0f91da3" />

- `GET /projects/:id` - Get specific project
  <img width="1918" height="969" alt="image" src="https://github.com/user-attachments/assets/ac965933-b1aa-4bd7-b6d0-bb949e4189c2" />

- `POST /projects` - Create new project
<img width="1919" height="966" alt="image" src="https://github.com/user-attachments/assets/8fcb8343-8a52-4d5c-a32a-b6207112c9af" />

- `PUT /projects/:id` - Update project
- <img width="1917" height="966" alt="image" src="https://github.com/user-attachments/assets/e5f6a98d-f37c-4b18-8d3e-1a01d1df689f" />

- `DELETE /projects/:id` - Delete project
- <img width="1917" height="974" alt="image" src="https://github.com/user-attachments/assets/1f46c5c9-94b6-4b3a-b66f-7d742e5c4217" />


### Tasks
- `GET /tasks` - List all tasks
  <img width="1919" height="969" alt="image" src="https://github.com/user-attachments/assets/3f8592c9-1506-4959-a935-3d71ceb4a5af" />
<img width="1920" height="1080" alt="image" src="https://github.com/user-attachments/assets/4a2b8bc5-ecfb-4dd9-b002-f66b8f6b4d8e" />

- `GET /tasks/:id` - Get specific task
  <img width="1918" height="969" alt="image" src="https://github.com/user-attachments/assets/c2beaa08-671b-454d-a2da-a23ad60de0f9" />

- `POST /tasks` - Create new task
  <img width="1919" height="919" alt="image" src="https://github.com/user-attachments/assets/95c41b52-ee6e-4213-ae5e-7a7d85572267" />

- `PUT /tasks/:id` - Update task
  <img width="1913" height="914" alt="image" src="https://github.com/user-attachments/assets/20b8a454-9cd7-402a-854f-d5c1fe28b731" />

- `DELETE /tasks/:id` - Delete task
  <img width="1916" height="912" alt="image" src="https://github.com/user-attachments/assets/fb5662b5-7fd3-459e-bf18-a5783e096ed8" />


### Comments
- `GET /comments` - List all comments
  <img width="1920" height="1080" alt="image" src="https://github.com/user-attachments/assets/1e807784-e082-4239-bb64-9a3c156922d0" />

- `GET /comments/:id` - Get specific comment
  <img width="1920" height="1080" alt="image" src="https://github.com/user-attachments/assets/44079d93-efe3-4db4-9c31-cb059107a467" />

- `POST /comments` - Create new comment
  <img width="1920" height="1080" alt="image" src="https://github.com/user-attachments/assets/4bcfe5e3-5a64-4b48-b95b-cea2fa16e35f" />

- `PUT /comments/:id` - Update comment
<img width="1920" height="1080" alt="image" src="https://github.com/user-attachments/assets/021e732b-7021-403e-94b1-90f8eb95499f" />

- `DELETE /comments/:id` - Delete comment
  <img width="1920" height="1080" alt="image" src="https://github.com/user-attachments/assets/24442b94-42a4-48ef-9bed-63eba59990e9" />


###Integrated Kanban Board - can be able to drag and drop any task included all functionalities of Kanban Board
<img width="1919" height="972" alt="image" src="https://github.com/user-attachments/assets/b261af38-f629-4226-ae1e-08866062c9fa" />


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

