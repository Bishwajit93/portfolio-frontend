export const API_BASE_URL = process.env.NEXT_PUBLIC_BACKEND_URL

if(!API_BASE_URL) {
    throw new Error("Missing NEXT_PUBLIC_BACKEND_URL in environment")
}

// Utility function to fetch data from the API
export const fetchFromApi = async(endoint: string, options: RequestInit = {}) => {
    const res = await fetch(`${API_BASE_URL}${endoint}`, options)

    if (!res.ok){
        throw new Error(`Failed to fetch ${endoint}`)
    }
    return res.json()
}