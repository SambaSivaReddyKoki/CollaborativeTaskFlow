class Task < ApplicationRecord
  self.inheritance_column = nil
  
  belongs_to :assignee, class_name: 'User'
  belongs_to :project
  has_many :comments, dependent: :destroy
  
  validates :title, presence: true, length: { minimum: 2 }
  validates :description, presence: true
  validates :status, presence: true, inclusion: { in: %w[todo in-progress in-qa done] }
  
  scope :todo, -> { where(status: 'todo') }
  scope :in_progress, -> { where(status: 'in-progress') }
  scope :in_qa, -> { where(status: 'in-qa') }
  scope :done, -> { where(status: 'done') }
end
