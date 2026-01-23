import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { login } from "../auth/authService"

function Login() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(false)

  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError(null)
    setLoading(true)

    try {
      await login(email, password)
      navigate("/dashboard")
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="container">
      <div className="card" style={{ maxWidth: 400, margin: "60px auto" }}>
        <h2 className="title" style={{ textAlign: "center" }}>
          Taskly Login
        </h2>

        {error && (
          <p style={{ color: "red", marginBottom: 12, textAlign: "center" }}>
            {error}
          </p>
        )}

        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: 12 }}>
            <label>Email</label>
            <input
              type="email"
              className="input"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div style={{ marginBottom: 16 }}>
            <label>Password</label>
            <input
              type="password"
              className="input"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button className="btn btn-primary" style={{ width: "100%" }}>
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>
      </div>
    </div>
  )
}

export default Login
