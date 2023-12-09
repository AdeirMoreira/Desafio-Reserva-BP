<script lang="ts">
import { useVuelidate } from '@vuelidate/core'
import { required, email, minLength } from '@vuelidate/validators'
import { ENDPOINTS, ERROR_MESSAGES, USER_ROLES } from '@/constants'
import notify from '@/shared/utils'
import { HttpService } from '@/services/http'
import { useStore } from '@/stores'

export default {
  name: 'signin-view',
  setup() {
    const store = useStore()
    return {
      v$: useVuelidate({ $autoDirty: false }),
      store,
      USER_ROLES
    }
  },
  data() {
    return {
      name: '',
      email: '',
      password: '',
      role: ''
    }
  },
  validations() {
    return {
      name: { required },
      email: { required, email },
      password: { required, minLength: minLength(8) },
      role: { required }
    }
  },
  methods: {
    async signin() {
      const validated = await this.v$.$validate()

      if (!validated) {
        notify.notifyFail(this.$vs, ERROR_MESSAGES.FILL_FIELDS)
        return
      }

      const signinForm = {
        name: this.name,
        email: this.email,
        password: this.password,
        role: this.role
      }

      const url = ENDPOINTS.SIGNIN

      this.$vs.loading()

      try {
        await HttpService.post(url, signinForm)

        this.$router.push('/login')
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
    <form @submit.prevent="signin" class="form">
      <header><h2>Reserva BP</h2></header>

      <div class="login">
        <vs-input
          class="w-full"
          v-model="name"
          label-placeholder="Nome"
          size="large"
          :success="name !== '' && !v$.name.$invalid"
          :danger="name !== '' && v$.name.$invalid"
          danger-text="O nome é obrigatório"
        />
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
          label-placeholder="Senha"
          size="large"
          type="password"
          :success="password !== '' && !v$.password.$invalid"
          :danger="password !== '' && v$.password.$invalid"
          danger-text="Senha deve conter pelo menos 8 caractetes."
        />

        <div class="checkboxRow">
          <vs-radio v-model="role" vs-name="role" :vs-value="USER_ROLES.BROKER">Corretor</vs-radio>
          <vs-radio v-model="role" vs-name="role" :vs-value="USER_ROLES.CUSTOMER">Cliente</vs-radio>
        </div>

        <vs-button @click="signin">Cadastrar</vs-button>
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

.checkboxRow {
  display: flex;
  flex-direction: row;
  justify-content: center;
  gap: 1em;
}
</style>
