// Global fetch interceptor: on any 401 response (token expired/invalid), clears session and redirects to login.
import router from '../router'

let installed = false

export function installAuthInterceptor() {
    if (installed) return
    installed = true

    const originalFetch = window.fetch.bind(window)

    window.fetch = async (...args) => {
        const response = await originalFetch(...args)

        if (response.status === 401) {
            localStorage.removeItem('user')
            if (router.currentRoute.value.path !== '/') {
                router.push('/')
            }
        }

        return response
    }
}
