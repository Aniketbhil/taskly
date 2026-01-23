import { useState } from "react"
import { updateTaskStatus, deleteTask } from "../api/tasks"

function TaskList({ tasks, onDelete, onUpdate }) {
  const [loadingId, setLoadingId] = useState(null)
  const [error, setError] = useState(null)

  const handleStatus = async (taskId, status) => {
    setError(null)
    setLoadingId(taskId)

    try {
      await updateTaskStatus(taskId, status)
      onUpdate()
    } catch (err) {
      setError("Failed to update task status")
    } finally {
      setLoadingId(null)
    }
  }

  const handleDelete = async (taskId) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this task?")
    if (!confirmDelete) return

    setError(null)
    setLoadingId(taskId)

    try {
      await deleteTask(taskId)
      onDelete()
    } catch (err) {
      setError("Failed to delete task")
    } finally {
      setLoadingId(null)
    }
  }

  return (
    <div>
      <h3 className="subtitle">Your Tasks</h3>

      {error && <p style={{ color: "red", marginBottom: 12 }}>{error}</p>}

      {tasks.length === 0 && <p>No tasks yet. Create one!</p>}

      {tasks.map((task) => (
        <div key={task.id} className="card" style={{ marginBottom: 16 }}>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <div>
              <h4 style={{ margin: 0 }}>{task.title}</h4>
              {task.description && (
                <p style={{ color: "#6b7280", fontSize: 14 }}>
                  {task.description}
                </p>
              )}
            </div>

            <span style={{ fontWeight: 600, color: "#2563eb" }}>
              {task.status}
            </span>
          </div>

          <div
            style={{
              marginTop: 12,
              display: "flex",
              gap: 8,
              flexWrap: "wrap",
            }}
          >
            <button
              className="btn"
              disabled={loadingId === task.id}
              onClick={() => handleStatus(task.id, "todo")}
            >
              Todo
            </button>

            <button
              className="btn"
              disabled={loadingId === task.id}
              onClick={() => handleStatus(task.id, "in_progress")}
            >
              In Progress
            </button>

            <button
              className="btn"
              disabled={loadingId === task.id}
              onClick={() => handleStatus(task.id, "done")}
            >
              Done
            </button>

            <button
              className="btn btn-danger"
              disabled={loadingId === task.id}
              onClick={() => handleDelete(task.id)}
            >
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  )
}

export default TaskList
