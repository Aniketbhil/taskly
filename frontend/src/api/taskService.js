import { apiRequest } from "./client"

export const fetchTasks = async () => {
  return apiRequest("/tasks", {
    method: "GET",
  })
}

export const createTask = async (taskData) => {
  return apiRequest("/tasks", {
    method: "POST",
    body: JSON.stringify(taskData),
  })
}

export const deleteTask = async (taskId) => {
  return apiRequest(`/tasks/${taskId}`, {
    method: "DELETE",
  })
}

export const updateTask = async (taskId, updates) => {
  return apiRequest(`/tasks/${taskId}`, {
    method: "PUT",
    body: JSON.stringify(updates),
  })
}
