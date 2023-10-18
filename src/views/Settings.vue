<template>
  <div class="settings-page" v-if="!isLoading && currentUser">
    <div class="container-page">
      <div class="row">
        <div class="col-md-6 offset-md-3 col-xs-12">
          <h1 class="text-xs-center">Your Settings</h1>
          <mcv-validation-errors v-if="validationErrors" :validation-errors="validationErrors"/>
          <form @submit.prevent="onSubmit">
            <fieldset :disabled="isSubmitting">
              <fieldset class="form-group">
                <input class="form-control" type="text" placeholder="URL of profile picture" v-model="form.image">
              </fieldset>
              <fieldset class="form-group">
                <input class="form-control form-control-lg" type="text" placeholder="Username" v-model="form.username">
              </fieldset>
              <fieldset class="form-group">
                <textarea class="form-control form-control-lg" rows="8" placeholder="Short bio about you"
                          v-model="form.bio"></textarea>
              </fieldset>
              <fieldset class="form-group">
                <input class="form-control form-control-lg" type="email" placeholder="Email" v-model="form.email">
              </fieldset>
              <fieldset class="form-group">
                <input class="form-control form-control-lg" type="password" placeholder="New Password"
                       v-model="form.password">
              </fieldset>
              <fieldset class="form-group">
                <button class="btn btn-lg pull-xs-right btn-primary" type="submit">
                  Update Settings
                </button>
              </fieldset>
            </fieldset>
          </form>
          <hr/>
          <button class="btn btn-outline-danger" @click="logout" type="text">Or click here to logout</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {actionTypes} from "@/store/auth";
import McvValidationErrors from "@/components/ValidationErrors.vue";
import {mapGetters, mapState} from "vuex";
import {getterTypes} from "@/store/auth";

export default {
  name: "McvSettings",
  components: {McvValidationErrors},
  computed: {
    ...mapState({
      isSubmitting: state => state.settings.isSubmitting,
      validationErrors: state => state.settings.validationErrors,
      isLoading: state => state.auth.isLoading,
    }),
    ...mapGetters({
      currentUser: getterTypes.currentUser,
    }),
    form() {
      return { // без проверки потому что идет проверка v-if="currentUser"
        image: this.currentUser.image,
        bio: this.currentUser.bio,
        email: this.currentUser.email,
        password: '',
        username: this.currentUser.username
      }
    }
  },
  mounted() {
    this.$store.dispatch(actionTypes.getCurrentUser)
  },
  methods: {
    onSubmit() {
      this.$store.dispatch(actionTypes.updateUser, this.form)
    },
    logout() {
      this.$store.dispatch(actionTypes.logout)
          .then(() => this.$router.push({name: 'globalFeed'}))
    }
  }
}
</script>