import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useAuthStore = defineStore('auth', () => {
    const user = ref(JSON.parse(localStorage.getItem('user') ?? 'null'))

    const isAuthenticated = computed(() => !!user.value)

    function setUser(userData) {
        user.value = userData
        localStorage.setItem('user', JSON.stringify(userData))
    }

    function logout() {
        user.value = null
        localStorage.removeItem('user')
    }

    return { user, isAuthenticated, setUser, logout }
})
