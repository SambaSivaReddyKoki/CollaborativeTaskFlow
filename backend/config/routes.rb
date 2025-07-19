Rails.application.routes.draw do
  # Authentication routes
  post '/users/login', to: 'users#login'
  get '/users/profile', to: 'users#profile'
  
  # API resources
  resources :users, only: [:index, :show, :create, :update, :destroy]
  resources :projects
  resources :tasks
  resources :comments
  
  # Nested routes for better organization
  resources :projects do
    resources :tasks, only: [:index, :create]
  end
  
  resources :tasks do
    resources :comments, only: [:index, :create]
  end
end
