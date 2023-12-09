<script lang="ts">
import { useStore } from '@/stores'
import useVuelidate from '@vuelidate/core'
import notify from '@/shared/utils'
import { HttpService } from '@/services/http'
import { ENDPOINTS,  USER_ROLES } from '@/constants'

export default {
  name: 'home-view',
  setup() {
    const store = useStore()
    return {
      v$: useVuelidate({ $autoDirty: false }),
      store
    }
  },
  data(){
    return {
        meeting: [],
        brokers: []
    }
  },
  mounted() {
    this.getData()
  },
  methods: {
    async getData(){
        const userId = this.store.auth.idUser
        const userRole = this.store.auth.role

        let url: string = ''

        if(userRole === USER_ROLES.BROKER) {
            url = ENDPOINTS.GET_BROKER(userId as number)
        }

        if(userRole === USER_ROLES.CUSTOMER) {
            url = ENDPOINTS.GET_USERS(USER_ROLES.BROKER)
        }

        try {
            const result = await HttpService.get(url)

            console.log('RESULT',result);
            
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
  <div>HOME</div>
</template>
<style></style>
