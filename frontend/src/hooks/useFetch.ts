import { useEffect, useState } from "react";

export function useFetch<T>(url: string, options: Object) {
    const [loading, setLoading] = useState<boolean>(true)
    const [data, setData] = useState<T | null>(null)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        const controller = new AbortController()

        setLoading(true)
        setError(null)
        fetch(url, { signal: controller.signal, ...options })
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP Error, Status: ${response.status}`)
                }
                return response.json()
            })
            .then(data => setData(data))
            .catch(error => {
                if (error.name !== "AbortError")
                    setError(error.message || "Error while fetching data")
            })
            .finally(() => setLoading(false))

        return () => controller.abort()
    }, [url])

    return { loading, data, error }
}



