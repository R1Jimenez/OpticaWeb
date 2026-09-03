// Shared token lookup/header builder used by the router guard (src/router/index.js) and all services.
export function getAuthToken() {
    try {
        const stored = JSON.parse(localStorage.getItem('user') ?? 'null')
        const candidate = stored?.user ?? stored
        return candidate?.token || candidate?.access_token || candidate?.accessToken
            || stored?.token || stored?.access_token || stored?.accessToken
            || null
    } catch {
        return null
    }
}

export function authHeaders(extra = {}) {
    const token = getAuthToken()
    return token ? { ...extra, Authorization: `Bearer ${token}` } : extra
}
