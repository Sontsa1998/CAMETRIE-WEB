<template>
  <div class="q-pa-md row" id="main">

    <q-card style="width: 700px; max-width: 80vw;"
      class="my-card text-white"
    >
    <q-card-section class="bg-red text-h5">
      CAMETRIE WEB <q-icon style="font-size: 38px" name="mic" />
    </q-card-section>
      <q-card-section>
        <q-form
          @submit="onSubmit"
          class="q-gutter-md"
        >
          <q-input
            filled
            v-model="name"
            label="Nom d'utilisateur"
            lazy-rules
            :rules="[ val => val && val.length > 0 || 'Veuillez renseigner votre nom de compte']"
          />

          <q-input
            filled
            type="password"
            v-model="password"
            label="Mot de passe"
            lazy-rules
            :rules="[
              val => val !== null || 'Veuillez renseigner votre mot de passe',
            ]"
          />

          <div>
            <q-btn label="Se connecter" type="submit" color="red"/>
          </div>
        </q-form>
      </q-card-section>

    </q-card>


  </div>
</template>
<script>
export default {
  data () {
    return {
      name: null,
      password: null,
    }
  },

  methods: {
    onSubmit () {

      /*this.$q.notify({
        color: 'green-4',
        textColor: 'white',
        icon: 'cloud_done',
        message: 'Submitted'
      })*/
      this.$router.push('/dashboard')
    },

  }
}
</script>
<style lang="sass">
@import url('https://fonts.googleapis.com/css2?family=Raleway&display=swap')
*
  font-family: 'Raleway', sans-serif
#main
  display: flex
  justify-content: center
  align-items: center
  height: 100vh
</style>
