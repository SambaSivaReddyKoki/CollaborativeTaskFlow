Rails.application.routes.draw do
  post '/users/login', to: 'users#login'
  get '/users/profile', to: 'users#profile'
  
  resources :users, only: [:index, :show, :create, :update, :destroy]
  resources :projects
  resources :tasks
  resources :comments
  
  resources :projects do
    resources :tasks, only: [:index, :create]
  end
  
  resources :tasks do
    resources :comments, only: [:index, :create]
  end
end
