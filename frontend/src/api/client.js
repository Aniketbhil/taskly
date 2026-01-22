import { API_BASE_URL } from "./config";

export const apiRequest = async (endpoint, options = {}) => {
    const token = localStorage.getItem("token")

    const headers = {
        "Content-Type": "application/json",
        ...(token &&{Authorization: `Bearer ${token}`}),
        ...(options.headers || {}),
    }

    const url = `${API_BASE_URL}${endpoint}`
    console.log("API CALL →", url)

    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
        ...options,
        headers,
    })

    if(!response.ok){
        const errorData = await response.json()
        throw new Error(errorData.detail || "Request Failed")
    }

    return response.json()
}