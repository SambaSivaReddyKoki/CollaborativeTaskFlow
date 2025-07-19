class UsersController < ApplicationController
  
  def create
    user = User.new(user_params)
    
    if user.save
      token = user.generate_jwt
      render json: { 
        user: user.as_json(except: :password_digest),
        token: token 
      }, status: :created
    else
      render json: { error: user.errors.full_messages.join(', ') }, status: :unprocessable_entity
    end
  end
  
  def login
    user = User.find_by(email: params[:email]&.downcase)
    
    if user&.authenticate(params[:password])
      token = user.generate_jwt
      render json: { 
        user: user.as_json(except: :password_digest),
        token: token 
      }
    else
      render json: { error: 'Invalid email or password' }, status: :unauthorized
    end
  end
  
  def profile
    authenticate_user!
    render json: @current_user.as_json(except: :password_digest)
  end
  
  def index
    authenticate_user!
    users = User.all
    render json: users.as_json(except: :password_digest)
  end
  
  def show
    authenticate_user!
    user = User.find(params[:id])
    render json: user.as_json(except: :password_digest)
  end
  
  def update
    authenticate_user!
    if @current_user.update(user_params)
      render json: @current_user.as_json(except: :password_digest)
    else
      render json: { error: @current_user.errors.full_messages.join(', ') }, status: :unprocessable_entity
    end
  end
  
  def destroy
    authenticate_user!
    @current_user.destroy
    head :no_content
  end
  
  private
  
  def user_params
    params.permit(:name, :email, :password, :password_confirmation, :role)
  end
end
