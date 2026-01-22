import { deleteTask, updateTask } from "../api/taskService"

function TaskList({ tasks, onDelete, onUpdate }) {
  if (tasks.length === 0) {
    return <p>No tasks yet.</p>
  }

  return (
    <div>
      <h3>Your Tasks</h3>

      {tasks.map((task) => (
        <div
          key={task.id}
          style={{
            border: "1px solid #ccc",
            padding: "10px",
            marginBottom: "10px",
          }}
        >
          <h4>{task.title}</h4>
          {task.description && <p>{task.description}</p>}

          <p>Status: <b>{task.status}</b></p>

          <div>
            <button onClick={() => handleStatus(task, "todo", onUpdate)}>
              Todo
            </button>

            <button onClick={() => handleStatus(task, "in_progress", onUpdate)}>
              In Progress
            </button>

            <button onClick={() => handleStatus(task, "done", onUpdate)}>
              Done
            </button>

            <button
              style={{ marginLeft: "10px", color: "red" }}
              onClick={() => handleDelete(task.id, onDelete)}
            >
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  )
}

async function handleDelete(taskId, onDelete) {
  await deleteTask(taskId)
  onDelete()
}

async function handleStatus(task, status, onUpdate) {
  await updateTask(task.id, { status })
  onUpdate()
}

export default TaskList
