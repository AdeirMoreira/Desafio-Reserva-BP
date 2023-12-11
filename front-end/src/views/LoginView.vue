<script lang="ts">
import { useVuelidate } from '@vuelidate/core'
import { required, email, minLength } from '@vuelidate/validators'
import { ENDPOINTS, ERROR_MESSAGES } from '@/constants'
import notify from '@/shared/utils'
import { HttpService } from '@/services/http'
import { useStore } from '@/stores'

export default {
  name: 'login-view',
  setup() {
    const store = useStore()
    return {
      v$: useVuelidate({ $autoDirty: false }),
      store
    }
  },
  data() {
    return {
      email: '',
      password: ''
    }
  },
  validations() {
    return {
      email: { required, email },
      password: { required, minLength: minLength(8) }
    }
  },
  methods: {
    async login() {
      const validated = await this.v$.$validate()

      if (!validated) {
        notify.notifyFail(this.$vs, ERROR_MESSAGES.FILL_FIELDS)
        return
      }

      const loginForm = {
        email: this.email,
        password: this.password
      }

      const url = ENDPOINTS.LOGIN

      this.$vs.loading()

      try {
        const result = await HttpService.post(url, loginForm)

        this.store.auth.login({ ...result.user, token: result.accessToken })

        this.$router.push('/')
      } catch (error: any) {
        notify.notifyFail(this.$vs, error.errorMessage)
      } finally {
        this.$vs.loading.close()
      }
    }
  }
}
</script>

<template>
  <div class="container">
    <form @submit.prevent="login" class="form">
      <header><h2>Reserva BP</h2></header>

      <div class="login">
        <vs-input
          class="w-full"
          v-model="email"
          label-placeholder="Email"
          size="large"
          :success="email !== '' && !v$.email.$invalid"
          :danger="email !== '' && v$.email.$invalid"
          danger-text="Email inválido."
        />
        <vs-input
          v-model="password"
          label-placeholder="Password"
          type="password"
          size="large"
          :success="password !== '' && !v$.password.$invalid"
          :danger="password !== '' && v$.password.$invalid"
          danger-text="Senha deve conter pelo menos 8 caractetes."
        />

        <vs-button @click="login">Login</vs-button>

        <nav style="display: flex; justify-content: center">
          <RouterLink to="signin"
            ><span style="color: #1f74ff"
              >Não tem cadastro ainda? Clique aqui para cadastrar-se.</span
            >
          </RouterLink>
        </nav>
      </div>
    </form>
  </div>
</template>

<style lang="scss" scoped>
.container {
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
}

.form {
  width: 500px;

  .login {
    margin-top: 1em;
    display: flex;
    flex-direction: column;
    gap: 1em;
  }
}

.vs-con-input-label {
  width: 100%;
}
</style>
