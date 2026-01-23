import { useState } from "react"
import { createTask } from "../api/tasks"

function TaskForm({ onTaskCreated }) {
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError(null)
    setLoading(true)

    try {
      await createTask({
        title,
        description,
      })

      setTitle("")
      setDescription("")
      onTaskCreated()
    } catch (err) {
      setError("Failed to create task")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="card">
      <h3 className="subtitle">Create Task</h3>

      {error && <p style={{ color: "red", marginBottom: 12 }}>{error}</p>}

      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: 12 }}>
          <input
            type="text"
            placeholder="Task title"
            className="input"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>

        <div style={{ marginBottom: 12 }}>
          <textarea
            placeholder="Description (optional)"
            className="input"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={3}
          />
        </div>

        <button
          className="btn btn-primary"
          style={{ width: "100%" }}
          disabled={loading}
        >
          {loading ? "Creating..." : "Create Task"}
        </button>
      </form>
    </div>
  )
}

export default TaskForm
