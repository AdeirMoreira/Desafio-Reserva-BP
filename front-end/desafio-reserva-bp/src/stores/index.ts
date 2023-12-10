import { defineStore } from 'pinia'

type UserData = {
  isAuthenticated: boolean
  idUser: number | null
  email: string | null
  name: string | null
  role: string | null
  token: string | null
}

const useAuthStore = defineStore('auth', {
  state: (): UserData => ({
    isAuthenticated: false,
    idUser: null,
    email: null,
    name: null,
    role: null,
    token: null
  }),

  actions: {
    login(userData: Omit<UserData, 'isAuthenticated'>) {
      localStorage.setItem('userData', JSON.stringify(userData))

      const { idUser, email, name, role, token } = userData

      this.idUser = idUser
      this.email = email
      this.name = name
      this.role = role
      this.token = token

      this.isAuthenticated = true
    },

    logout() {
      localStorage.removeItem('userData')
      this.name = null
      this.email = null
      this.role = null
      this.token = null

      this.isAuthenticated = false
    },

    getIsAuthenticated() {
      if (this.isAuthenticated) {
        return this.isAuthenticated
      }

      const localStorageData = localStorage.getItem('userData')

      if (localStorageData) {
        const userData: UserData = JSON.parse(localStorageData)

        this.idUser = userData.idUser
        this.email = userData.email
        this.name = userData.name
        this.role = userData.role
        this.token = userData.token
        this.isAuthenticated = true
      }

      return this.isAuthenticated
    }
  }
})

export const useStore = () => {
  return {
    auth: useAuthStore()
  }
}
