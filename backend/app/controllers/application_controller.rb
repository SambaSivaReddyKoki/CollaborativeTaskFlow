class ApplicationController < ActionController::API
  include ActionController::HttpAuthentication::Token::ControllerMethods
  
  private
  
  def authenticate_user!
    @current_user = current_user
    render json: { error: 'Unauthorized' }, status: :unauthorized unless @current_user
  end
  
  def current_user
    @current_user ||= authenticate_token
  end
  
  def authenticate_token
    authenticate_with_http_token do |token, options|
      begin
        decoded = JWT.decode(token, Rails.application.credentials.secret_key_base, true, { algorithm: 'HS256' })
        User.find(decoded[0]['user_id'])
      rescue JWT::DecodeError, ActiveRecord::RecordNotFound
        nil
      end
    end
  end
  
  def render_error(message, status = :unprocessable_entity)
    render json: { error: message }, status: status
  end
end
