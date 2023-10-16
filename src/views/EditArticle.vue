<template>
  <div>
    <mcv-loading v-if="isLoading"/>
    <mcv-article-form v-if="initialValues" :initial-values="initialValues" :errors="validationErrors" :is-submitting="isSubmitting"
                      @articleSubmit="onSubmit"/>
  </div>
</template>

<script>
import {actionTypes} from "@/store/editArticle";
import {mapState} from "vuex";
import McvArticleForm from "@/components/ArticleForm.vue"
import McvLoading from '@/components/Loading.vue'

export default {
  name: "McvEditArticle",
  components: {
    McvArticleForm,
    McvLoading
  },
  computed: {
    ...mapState({
      isSubmitting: state => state.editArticle.isSubmitting,
      validationErrors: state => state.editArticle.validationErrors,
      isLoading: state => state.editArticle.isLoading,
      article: state => state.editArticle.article,
    }),
    initialValues() {
      if (!this.article) {
        return null
      } else {
        return {
          title: this.article.title,
          description: this.article.description,
          body: this.article.body,
          tagList: this.article.tagList
        }
      }
    }
  },
  mounted() {
    this.$store.dispatch(actionTypes.getArticle, {slug: this.$route.params.slug})
  },
  methods: {
    onSubmit(article) {
      const slug = this.$route.params.slug
      let newVar = {slug, article};
      console.log(newVar)
      this.$store.dispatch(actionTypes.editArticle, newVar)
          .then(response => this.$router.push({name: 'article', params: {slug: response.slug}}))
    }
  }
}
</script>