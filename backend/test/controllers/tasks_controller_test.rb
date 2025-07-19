require "test_helper"

class TasksControllerTest < ActionDispatch::IntegrationTest
  setup do
    @task = tasks(:one)
  end

  test "should get index" do
    get tasks_url, as: :json
    assert_response :success
  end

  test "should create task" do
    assert_difference("Task.count") do
      post tasks_url, params: { task: { assignee_id: @task.assignee_id, description: @task.description, due_date: @task.due_date, project_id: @task.project_id, status: @task.status, title: @task.title } }, as: :json
    end

    assert_response :created
  end

  test "should show task" do
    get task_url(@task), as: :json
    assert_response :success
  end

  test "should update task" do
    patch task_url(@task), params: { task: { assignee_id: @task.assignee_id, description: @task.description, due_date: @task.due_date, project_id: @task.project_id, status: @task.status, title: @task.title } }, as: :json
    assert_response :success
  end

  test "should destroy task" do
    assert_difference("Task.count", -1) do
      delete task_url(@task), as: :json
    end

    assert_response :no_content
  end
end
