# Clear existing data
User.destroy_all
Project.destroy_all
Task.destroy_all
Comment.destroy_all

# Create users
user1 = User.create!(
  name: 'John Doe',
  email: 'john@example.com',
  password: 'password123',
  password_confirmation: 'password123'
)

user2 = User.create!(
  name: 'Jane Smith',
  email: 'jane@example.com',
  password: 'password123',
  password_confirmation: 'password123'
)

user3 = User.create!(
  name: 'Bob Johnson',
  email: 'bob@example.com',
  password: 'password123',
  password_confirmation: 'password123'
)

# Create projects
project1 = Project.create!(
  name: 'Website Redesign',
  description: 'Complete redesign of the company website with modern UI/UX',
  creator: user1
)

project2 = Project.create!(
  name: 'Mobile App Development',
  description: 'Develop a new mobile application for iOS and Android',
  creator: user2
)

project3 = Project.create!(
  name: 'Database Migration',
  description: 'Migrate legacy database to new cloud infrastructure',
  creator: user1
)

# Create tasks
Task.create!(
  title: 'Design Homepage',
  description: 'Create wireframes and mockups for the new homepage design',
  status: 'in-progress',
  due_date: Date.current + 7.days,
  assignee: user1,
  project: project1
)

Task.create!(
  title: 'Implement User Authentication',
  description: 'Set up user registration and login functionality',
  status: 'todo',
  due_date: Date.current + 14.days,
  assignee: user2,
  project: project2
)

Task.create!(
  title: 'Database Schema Design',
  description: 'Design the new database schema for the mobile app',
  status: 'done',
  due_date: Date.current - 2.days,
  assignee: user3,
  project: project2
)

Task.create!(
  title: 'Backup Existing Data',
  description: 'Create full backup of current database before migration',
  status: 'todo',
  due_date: Date.current + 3.days,
  assignee: user1,
  project: project3
)

Task.create!(
  title: 'API Development',
  description: 'Develop RESTful APIs for the mobile app backend',
  status: 'in-progress',
  due_date: Date.current + 21.days,
  assignee: user2,
  project: project2
)

puts "Seed data created successfully!"
puts "Users: #{User.count}"
puts "Projects: #{Project.count}"
puts "Tasks: #{Task.count}"
