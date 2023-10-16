<template>
  <mcv-article-form :initial-values="initialValues" :errors="validationErrors" :is-submitting="isSubmitting"
                    @articleSubmit="onSubmit"/>
</template>

<script>
import {actionTypes} from "@/store/createArticle";
import {mapState} from "vuex";
import McvArticleForm from "@/components/ArticleForm.vue"

export default {
  name: "CreateArticle",
  components: {
    McvArticleForm
  },
  computed: {
    ...mapState({
      isSubmitting: state => state.createArticle.isSubmitting,
      validationErrors: state => state.createArticle.validationErrors,
    })
  },
  data() {
    return {
      initialValues: {
        title: '',
        description: '',
        body: '',
        tagList: []
      },
    }
  },
  methods: {
    onSubmit(data) {
      this.$store.dispatch(actionTypes.createArticle, data).then(response => this.$router.push({name: 'article', params: {slug: response.slug}}))
    }
  }
}
</script>