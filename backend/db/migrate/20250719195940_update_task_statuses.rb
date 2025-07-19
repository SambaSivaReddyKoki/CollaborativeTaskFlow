class UpdateTaskStatuses < ActiveRecord::Migration[8.0]
  def change
    # Ensure all existing tasks have valid statuses
    # If any tasks have invalid statuses, default them to 'todo'
    execute <<-SQL
      UPDATE tasks 
      SET status = 'todo' 
      WHERE status NOT IN ('todo', 'in-progress', 'in-qa', 'done')
    SQL
    
    # Add any missing columns that might be useful for Kanban board
    unless column_exists?(:tasks, :priority)
      add_column :tasks, :priority, :string, default: 'medium'
    end
    
    unless column_exists?(:tasks, :type)
      add_column :tasks, :type, :string, default: 'task'
    end
    
    unless column_exists?(:tasks, :estimated_hours)
      add_column :tasks, :estimated_hours, :decimal, precision: 5, scale: 2
    end
  end
end
