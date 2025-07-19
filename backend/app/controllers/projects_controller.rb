class ProjectsController < ApplicationController
  before_action :authenticate_user!
  before_action :set_project, only: [:show, :update, :destroy]

  def index
    @projects = Project.includes(:creator).all
    render json: @projects.as_json(include: { creator: { except: :password_digest } })
  end

  def show
    render json: @project.as_json(include: { creator: { except: :password_digest } })
  end

  def create
    @project = @current_user.projects.build(project_params)

    if @project.save
      render json: @project.as_json(include: { creator: { except: :password_digest } }), status: :created
    else
      render json: { error: @project.errors.full_messages.join(', ') }, status: :unprocessable_entity
    end
  end

  def update
    if @project.update(project_params)
      render json: @project.as_json(include: { creator: { except: :password_digest } })
    else
      render json: { error: @project.errors.full_messages.join(', ') }, status: :unprocessable_entity
    end
  end

  def destroy
    @project.destroy
    head :no_content
  end

  private

  def set_project
    @project = Project.find(params[:id])
  end

  def project_params
    params.permit(:name, :description)
  end
end
