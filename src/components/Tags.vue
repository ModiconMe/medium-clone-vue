<template>
  <div>
    <mcv-loading v-if="isLoading"/>
    <mcv-error-message v-if="error"/>
    <div class="sidebar" v-if="tags">
      <p>Popular Tags</p>
      <div class="tag-list">
        <router-link v-for="tag in tags" :key="tag" :to="{name: 'tag', params: {slug: tag}}"
                     class="tag-default tag-pill">
          {{ tag }}
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
import {mapState} from "vuex";
import {actionTypes} from "@/store/tags";
import McvLoading from "@/components/Loading.vue";
import McvErrorMessage from "@/components/ErrorMessage.vue";

export default {
  name: "McvPopularTags",
  components: {McvErrorMessage, McvLoading},
  computed: {
    ...mapState({
      isLoading: state => state.tags.isLoading,
      tags: state => state.tags.data,
      error: state => state.tags.error,
    })
  },
  mounted() {
    this.$store.dispatch(actionTypes.getTags)
  }
}
</script>