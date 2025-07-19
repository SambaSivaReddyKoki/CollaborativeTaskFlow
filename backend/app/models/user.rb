class User < ApplicationRecord
  has_secure_password
  
  has_many :projects, foreign_key: 'creator_id', dependent: :destroy
  has_many :tasks, foreign_key: 'assignee_id', dependent: :destroy
  has_many :comments, dependent: :destroy
  
  validates :email, presence: true, uniqueness: true, format: { with: URI::MailTo::EMAIL_REGEXP }
  validates :name, presence: true, length: { minimum: 2 }
  validates :password, length: { minimum: 6 }, if: -> { password.present? }
  
  before_save :downcase_email
  
  def generate_jwt
    JWT.encode(
      { user_id: id, exp: 24.hours.from_now.to_i },
      Rails.application.credentials.secret_key_base
    )
  end
  
  private
  
  def downcase_email
    self.email = email.downcase if email.present?
  end
end
