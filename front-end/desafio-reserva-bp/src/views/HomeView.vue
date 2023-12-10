<script lang="ts">
import { useStore } from '@/stores'
import useVuelidate from '@vuelidate/core'
import { required } from '@vuelidate/validators'
import notify from '@/shared/utils'
import { formatDatePtBR } from '@/shared/utils'
import { HttpService } from '@/services/http'
import { ENDPOINTS, USER_ROLES, SUCCESS_MESSAGES } from '@/constants'
import type { Meeting, Broker } from '@/shared/types'
import DateTimePicker from '@/components/DateTimePicker.vue'

export default {
  name: 'home-view',
  components: { DateTimePicker },
  setup() {
    const store = useStore()
    return {
      v$: useVuelidate({ $autoDirty: true }),
      store,
      USER_ROLES,
      formatDatePtBR
    }
  },
  data() {
    const items: Meeting[] = []
    const meeting: Meeting = {
      idMeeting: null,
      idBroker: null,
      idCustomer: null,
      startAt: null,
      endAt: null
    }
    const brokers: Broker[] = []
    return {
      items,
      meeting,
      brokers,
      popupAction: '',
      popupMeeting: false,
      teste: 0
    }
  },
  validations() {
    return {
      meeting: {
        idBroker: { required },
        startAt: { required },
        endAt: { required }
      }
    }
  },
  mounted() {
    this.preGetData()
  },
  computed: {
    getInitials() {
      const userName = this.store.auth.name
      if (userName) {
        const initials = userName
          .split(' ')
          .map((name) => name[0])
          .join('')
          .toUpperCase()
        return initials
      }
      return 'AA'
    },
    userType() {
      const role = this.store.auth.role
      return role === USER_ROLES.BROKER ? 'corretor' : 'cliente'
    }
  },
  methods: {
    async preGetData() {
      const userId = this.store.auth.idUser
      const userRole = this.store.auth.role

      let url = ENDPOINTS.GET_MEETINGS_BY_USER(userId as number)
      this.$vs.loading()
      const meetings = await this.getData(url)

      this.items = meetings

      if (userRole === USER_ROLES.CUSTOMER) {
        const url2 = ENDPOINTS.GET_USERS(USER_ROLES.BROKER)

        this.$vs.loading()
        const brokers = await this.getData(url2)
        this.brokers = brokers.map((b: any) => {
          return { text: b.name, value: b.idUser } as Broker
        })
      }
    },

    logout() {
      this.$router.push('/login')
      this.store.auth.logout()
    },
    openMeetingPopUp(meeting: Meeting | null = null) {
      this.resetModal()
      this.popupAction = 'Marcar nova reunião'

      if (meeting) {
        this.meeting.idMeeting = meeting.idMeeting
        this.meeting.idBroker = meeting.idBroker
        this.meeting.idCustomer = meeting.idCustomer
        this.meeting.startAt = meeting.startAt
        this.meeting.endAt = meeting.endAt

        this.popupAction = 'Editar reunão marcada'
      }

      this.popupMeeting = true
    },
    async handleMeeting() {
      const validated = await this.v$.$validate()

      if (!validated) {
        return
      }

      if (this.popupAction === 'Marcar nova reunião') {
        this.meeting.idCustomer = this.store.auth.idUser
        const url = ENDPOINTS.POST_MEETING

        this.$vs.loading()
        const result = await this.postData(url, this.meeting)

        if (result) {
          this.items = result
          this.closeModal()
        }
      }

      if (this.popupAction === 'Editar reunão marcada') {
        const url = ENDPOINTS.UPDATE_MEETING(this.meeting.idMeeting as number)

        this.$vs.loading()
        const result = await this.patchData(url, this.meeting)

        if (result) {
          this.items = result
          this.closeModal()
        }
      }

      
    },
    async deleteMeeting(meeting: Meeting) {
      const url = ENDPOINTS.DELETE_MEETING(meeting.idMeeting as number)

      this.$vs.loading()
      const result = await this.deleteData(url)
      this.items = result
      this.closeModal()
    },
    resetModal() {
      this.meeting = {
        idMeeting: null,
        idBroker: null,
        idCustomer: null,
        startAt: null,
        endAt: null
      }
    },
    closeModal() {
      this.popupMeeting = false
    },
    async getData(url: string) {
      try {
        return HttpService.get(url)
      } catch (error: any) {
        notify.notifyFail(this.$vs, error.errorMessage)
      } finally {
        setTimeout(() => {
          this.$vs.loading.close()
        }, 100)
      }
    },
    async postData(url: string, body: Meeting) {
      try {
        const result = await HttpService.post(url, body)
        notify.notifySuccess(this.$vs, SUCCESS_MESSAGES.MEETING_SCHEDULED)
        return result
      } catch (error: any) {
        notify.notifyFail(this.$vs, error.errorMessage)
      } finally {
        this.$vs.loading.close()
      }
    },
    async patchData(url: string, body: Meeting) {
      try {
        const result = await HttpService.patch(url, body)
        notify.notifySuccess(this.$vs, SUCCESS_MESSAGES.MEETING_UPDATED)
        return result
      } catch (error: any) {
        notify.notifyFail(this.$vs, error.errorMessage)
      } finally {
        this.$vs.loading.close()
      }
    },

    async deleteData(url: string) {
      try {
        const result = await HttpService.delete(url)
        notify.notifySuccess(this.$vs, SUCCESS_MESSAGES.MEETING_DELETED)
        return result
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
  <!-- Header -->
  <div class="header">
    <!-- Título no meio -->
    <div class="title">Reserva BP</div>

    <!-- Avatar e Botão de Logout à direita -->
    <div class="right-section">
      <vs-avatar color="success" :text="getInitials" />
      <vs-button @click="logout" icon-after icon="logout"></vs-button>
    </div>
  </div>
  <!-- Header -->

  <div class="container">
    <h2>Bem vindo {{ userType }} {{ store.auth.name }}</h2>
    <h4>Suas reuniões agendadas.</h4>
  </div>

  <div
    v-if="store.auth.role === USER_ROLES.CUSTOMER"
    style="display: flex; justify-content: center; margin-top: 2em"
  >
    <vs-button color="success" @click="openMeetingPopUp()">Marcar nova reunião</vs-button>
  </div>

  <!-- table -->
  <div class="container">
    <div style="margin-top: 2em">
      <vs-card>
        <vs-table
          noDataText="Nenhuma reunião agendada"
          class="tablePrincipal"
          ref="table"
          :data="items"
        >
          <template #thead>
            <vs-th>Corretor</vs-th>
            <vs-th>Início</vs-th>
            <vs-th>Fim</vs-th>
            <vs-th>Cliente</vs-th>
            <vs-th>Ações</vs-th>
          </template>

          <template v-slot="{ data }">
            <vs-tr :key="indextr" v-for="(tr, indextr) in data">
              <vs-td :data="tr.broker">{{ tr.broker }}</vs-td>
              <vs-td :data="tr.startAt">{{ formatDatePtBR(tr.startAt) }}</vs-td>
              <vs-td :data="tr.endAt">{{ formatDatePtBR(tr.endAt) }}</vs-td>
              <vs-td :data="tr.customer">{{ tr.customer }}</vs-td>
              <vs-td>
                <div style="display: flex; gap: 1em">
                  <vs-button
                    v-if="store.auth.role === USER_ROLES.CUSTOMER"
                    color="warning"
                    radius
                    type="filled"
                    icon="edit"
                    @click="openMeetingPopUp(tr)"
                  ></vs-button>
                  <vs-button
                    color="danger"
                    radius
                    type="filled"
                    icon="delete"
                    @click="deleteMeeting(tr)"
                  ></vs-button>
                </div>
              </vs-td>
            </vs-tr>
          </template>
        </vs-table>
      </vs-card>
    </div>
  </div>
  <!-- table -->

  <vs-popup :title="popupAction" :active="popupMeeting" @close="popupMeeting = false">
    <span style="font-size: large">Por favor selecione o corretor, a data e hora da reunião.</span>

    <div style="display: flex; flex-direction: column; gap: 1em; margin-top: 1em">
      <div style="display: flex; flex-direction: column; align-items: center">
        <span>Selecione o Corretor</span>
        <select placeholder="Selecione" class="form-select" v-model="meeting.idBroker">
          <option :key="index" :value="item.value" v-for="(item, index) in brokers">
            {{ item.text }}
          </option>
        </select>
        <span class="danger-text" v-if="v$.meeting.idBroker.$invalid">Corretor é obrigatório</span>
      </div>
      <div style="display: flex; flex-direction: row; gap: 2em; justify-content: center">
        <div style="display: flex; flex-direction: column; gap: 0.2em">
          <span>Inicio da reunião</span>
          <DateTimePicker v-model="meeting.startAt" />
          <span class="danger-text" v-if="v$.meeting.startAt.$invalid"
            >Inicio da Reunião é obrigatório</span
          >
        </div>
        <div style="display: flex; flex-direction: column; gap: 0.2em">
          <span>Fim da reunião</span>
          <DateTimePicker v-model="meeting.endAt" />
          <span class="danger-text" v-if="v$.meeting.endAt.$invalid"
            >Fim da Reunião é obrigatório</span
          >
        </div>
      </div>
      <div style="display: flex; justify-content: end">
        <vs-button color="success" @click="handleMeeting()">Pronto</vs-button>
      </div>
    </div>
  </vs-popup>
</template>
<style scoped>
.container {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  background-color: #f0f0f0; /* Cor de fundo do cabeçalho */
}

.title {
  flex: 1;
  text-align: center;
  font-size: 1.5em;
}

.right-section {
  display: flex;
  gap: 10px;
  align-items: center;
}

/* Estilos para o select */
.form-select {
  width: 50%; /* Torna o select 100% da largura do contêiner pai */
  padding: 6px; /* Adiciona algum preenchimento ao redor do select */
  border: 1px solid #ccc; /* Adiciona uma borda para uma aparência mais definida */
  border-radius: 5px; /* Adiciona cantos arredondados */
  font-size: 16px; /* Define o tamanho da fonte */
}

/* Estilos para as opções */
.form-select option {
  font-size: 16px; /* Define o tamanho da fonte para as opções */
}

.danger-text {
  font-size: 0.8em;
  color: #ff5e6c;
}
</style>
