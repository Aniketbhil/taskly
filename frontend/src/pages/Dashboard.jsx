import { useEffect, useState } from "react"
import { fetchTasks, createTask, deleteTask, updateTask } from "../api/taskService"
import { logout } from "../auth/authService"
import { useNavigate } from "react-router-dom"
import TaskForm from "../components/TaskForm"
import TaskList from "../components/TaskList"


function Dashboard() {
  const [tasks, setTasks] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const navigate = useNavigate()

  // Fetch tasks on load
  useEffect(() => {
    loadTasks()
  }, [])

  const loadTasks = async () => {
    setLoading(true)
    setError(null)

    try {
      const data = await fetchTasks()
      setTasks(data)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  const handleLogout = () => {
    logout()
    navigate("/login")
  }

  return (
    <div style={{ maxWidth: "800px", margin: "50px auto" }}>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <h1>Taskly Dashboard</h1>
        <button onClick={handleLogout}>Logout</button>
      </div>

      {loading && <p>Loading tasks...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}

      {!loading && !error && (
        <>
          <TaskForm onTaskCreated={loadTasks} />
          <TaskList tasks={tasks} onDelete={loadTasks} onUpdate={loadTasks} />
        </>
      )}
    </div>
  )
}

export default Dashboard
