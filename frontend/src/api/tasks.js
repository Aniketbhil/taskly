import { getToken } from "../auth/authService"

const API_URL = "http://localhost:8000/api/v1/tasks"

// Helper to build auth headers
function authHeaders() {
  const token = getToken()
  return {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  }
}

// Get all tasks
export async function getTasks() {
  const response = await fetch(API_URL, {
    headers: authHeaders(),
  })

  if (!response.ok) {
    throw new Error("Failed to fetch tasks")
  }

  return await response.json()
}

// Create new task
export async function createTask(task) {
  const response = await fetch(API_URL, {
    method: "POST",
    headers: authHeaders(),
    body: JSON.stringify(task),
  })

  if (!response.ok) {
    throw new Error("Failed to create task")
  }

  return await response.json()
}

// Update task status
export async function updateTaskStatus(taskId, status) {
  const response = await fetch(`${API_URL}/${taskId}`, {
    method: "PUT",
    headers: authHeaders(),
    body: JSON.stringify({ status }),
  })

  if (!response.ok) {
    throw new Error("Failed to update task")
  }

  return await response.json()
}

// Delete task
export async function deleteTask(taskId) {
  const response = await fetch(`${API_URL}/${taskId}`, {
    method: "DELETE",
    headers: authHeaders(),
  })

  if (!response.ok) {
    throw new Error("Failed to delete task")
  }
}
