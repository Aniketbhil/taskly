import { apiRequest } from "../api/client";

export const login = async (email, password) => {
  const data = await apiRequest("/auth/login", {
    method: "POST",
    body: JSON.stringify({ email, password }),
  })

  localStorage.setItem("token", data.access_token)
  return data
}


export const logout = () => {
    localStorage.removeItem("token")
}

export const getToken = () => {
    return localStorage.getItem("token")
}

export const isAuthenticated = () => {
    return !!localStorage.getItem("token")
}