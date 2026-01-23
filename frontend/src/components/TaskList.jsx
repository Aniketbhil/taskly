import { useState } from "react"
import { updateTaskStatus, deleteTask, updateTask } from "../api/tasks"

function TaskList({ tasks, onDelete, onUpdate }) {
  const [loadingId, setLoadingId] = useState(null)
  const [error, setError] = useState(null)
  const [editingId, setEditingId] = useState(null)
  const [editTitle, setEditTitle] = useState("")
  const [editDescription, setEditDescription] = useState("")

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

  const startEdit = (task) => {
    setEditingId(task.id)
    setEditTitle(task.title)
    setEditDescription(task.description || "")
  }

  const cancelEdit = () => {
    setEditingId(null)
    setEditTitle("")
    setEditDescription("")
  }

  const saveEdit = async (taskId) => {
    setError(null)
    setLoadingId(taskId)

    try {
      await updateTask(taskId, {
        title: editTitle,
        description: editDescription,
      })
      setEditingId(null)
      onUpdate()
    } catch (err) {
      setError("Failed to update task")
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
          {editingId === task.id ? (
            /* EDIT MODE */
            <>
              <input
                className="input"
                style={{ marginBottom: 8 }}
                value={editTitle}
                onChange={(e) => setEditTitle(e.target.value)}
              />

              <textarea
                className="input"
                rows={2}
                value={editDescription}
                onChange={(e) => setEditDescription(e.target.value)}
              />

              <div style={{ marginTop: 12, display: "flex", gap: 8 }}>
                <button
                  className="btn btn-primary"
                  disabled={loadingId === task.id}
                  onClick={() => saveEdit(task.id)}
                >
                  Save
                </button>

                <button className="btn" onClick={cancelEdit}>
                  Cancel
                </button>
              </div>
            </>
          ) : (
            /* VIEW MODE */
            <>
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
                  className="btn"
                  onClick={() => startEdit(task)}
                >
                  Edit
                </button>

                <button
                  className="btn btn-danger"
                  disabled={loadingId === task.id}
                  onClick={() => handleDelete(task.id)}
                >
                  Delete
                </button>
              </div>
            </>
          )}
        </div>
      ))}
    </div>
  )
}

export default TaskList
