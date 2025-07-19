class Project < ApplicationRecord
  belongs_to :creator, class_name: 'User'
  has_many :tasks, dependent: :destroy
  has_many :comments, through: :tasks
  
  validates :name, presence: true, length: { minimum: 2 }
  validates :description, presence: true
end
