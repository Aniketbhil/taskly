import { useEffect, useState } from "react"
import { getTasks } from "../api/tasks"
import TaskForm from "../components/TaskForm"
import TaskList from "../components/TaskList"
import { logout } from "../auth/authService"

function Dashboard() {
  const [tasks, setTasks] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const loadTasks = async () => {
    try {
      const data = await getTasks()
      setTasks(data)
    } catch (err) {
      setError("Failed to load tasks")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadTasks()
  }, [])

  const handleLogout = () => {
    logout()
    window.location.href = "/login"
  }

  return (
    <div className="container">
      {/* Header */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <h1 className="title">Taskly Dashboard</h1>
        <button className="btn btn-danger" onClick={handleLogout}>
          Logout
        </button>
      </div>

      {loading && <p>Loading tasks...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}

      {!loading && !error && (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 2fr",
            gap: 24,
            marginTop: 24,
          }}
        >
          {/* LEFT: Create Task */}
          <TaskForm onTaskCreated={loadTasks} />

          {/* RIGHT: Task List */}
          <TaskList tasks={tasks} onDelete={loadTasks} onUpdate={loadTasks} />
        </div>
      )}
    </div>
  )
}

export default Dashboard
