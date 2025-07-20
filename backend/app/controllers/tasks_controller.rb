class TasksController < ApplicationController
  before_action :authenticate_user!
  before_action :set_task, only: [:show, :update, :destroy]

  def index
    @tasks = Task.includes(:assignee, :project).all
    render json: @tasks.as_json(include: { 
      assignee: { except: :password_digest },
      project: { include: { creator: { except: :password_digest } } }
    })
  end

  def show
    render json: @task.as_json(include: { 
      assignee: { except: :password_digest },
      project: { include: { creator: { except: :password_digest } } }
    })
  end

  def create
    @task = Task.new(task_params)

    if @task.save
      render json: @task.as_json(include: { 
        assignee: { except: :password_digest },
        project: { include: { creator: { except: :password_digest } } }
      }), status: :created
    else
      render json: { error: @task.errors.full_messages.join(', ') }, status: :unprocessable_entity
    end
  end

  def update
    if @task.update(task_params)
      render json: @task.as_json(include: { 
        assignee: { except: :password_digest },
        project: { include: { creator: { except: :password_digest } } }
      })
    else
      render json: { error: @task.errors.full_messages.join(', ') }, status: :unprocessable_entity
    end
  end

  def destroy
    @task.destroy
    head :no_content
  end

  private

  def set_task
    @task = Task.find(params[:id])
  end

  def task_params
    if params[:task]
      params.require(:task).permit(:title, :description, :status, :due_date, :assignee_id, :project_id)
    else
      params.permit(:title, :description, :status, :due_date, :assignee_id, :project_id)
    end
  end
end
