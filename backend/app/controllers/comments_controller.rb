class CommentsController < ApplicationController
  before_action :authenticate_user!
  before_action :set_comment, only: [:show, :update, :destroy]

  def index
    @comments = Comment.includes(:user, :task).all
    render json: @comments.as_json(include: { 
      user: { except: :password_digest },
      task: { include: { assignee: { except: :password_digest } } }
    })
  end

  def show
    render json: @comment.as_json(include: { 
      user: { except: :password_digest },
      task: { include: { assignee: { except: :password_digest } } }
    })
  end

  def create
    @comment = @current_user.comments.build(comment_params)

    if @comment.save
      render json: @comment.as_json(include: { 
        user: { except: :password_digest },
        task: { include: { assignee: { except: :password_digest } } }
      }), status: :created
    else
      render json: { error: @comment.errors.full_messages.join(', ') }, status: :unprocessable_entity
    end
  end

  def update
    if @comment.update(comment_params)
      render json: @comment.as_json(include: { 
        user: { except: :password_digest },
        task: { include: { assignee: { except: :password_digest } } }
      })
    else
      render json: { error: @comment.errors.full_messages.join(', ') }, status: :unprocessable_entity
    end
  end

  def destroy
    @comment.destroy
    head :no_content
  end

  private

  def set_comment
    @comment = Comment.find(params[:id])
  end

  def comment_params
    params.permit(:content, :task_id)
  end
end
