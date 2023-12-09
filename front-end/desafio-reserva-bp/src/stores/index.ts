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
      const { idUser, email, name, role, token } = userData
      
      this.idUser = idUser
      this.email = email
      this.name = name
      this.role = role
      this.token = token

      this.isAuthenticated = true
    },

    logout() {
      this.isAuthenticated = false
      this.name = null
      this.email = null
      this.role = null
      this.token = null
    }
  },

  getters: {
    // Getter para verificar se o usuário está autenticado
    getIsAuthenticated: (state) => state.isAuthenticated
  }
})

export const useStore = () => {
  return {
    auth: useAuthStore()
  }
}
