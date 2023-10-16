<template>
  <div class="editor-page">
    <div class="container-page">
      <div class="row">
        <div class="col-md-10 offset-md-1 col-xs-12">
          <mcv-validation-errors v-if="errors" :validation-errors="errors"/>
          <form @submit.prevent="onSubmit">
            <fieldset :disabled="isSubmitting">
              <fieldset class="form-group">
                <input class="form-control form-control-lg" type="text" placeholder="Article title"
                       v-model="title"/>
              </fieldset>
              <fieldset class="form-group">
                <input class="form-control" type="text" placeholder="What's this article about"
                       v-model="description"/>
              </fieldset>
              <fieldset class="form-group">
              <textarea class="form-control" rows="8" placeholder="Write your article (in markdown)"
                        v-model="body"/>
              </fieldset>
              <fieldset class="form-group">
                <input class="form-control" type="text" placeholder="Enter tags" v-model="tagList"/>
              </fieldset>
              <fieldset class="form-group">
                <button class="btn btn-lg pull-xs-right btn-primary" type="submit">
                  Publish Article
                </button>
              </fieldset>
            </fieldset>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import McvValidationErrors from "@/components/ValidationErrors.vue";

export default {
  name: "ArticleForm",
  components: {McvValidationErrors},
  props: {
    initialValues: {
      type: Object,
      required: true
    },
    errors: {
      type: Object,
      required: false
    },
    isSubmitting: {
      type: Boolean,
      required: true
    },
  },
  data() {
    return {
      title: '',
      description: '',
      body: '',
      tagList: ''
    }
  },
  methods: {
    onSubmit() {
      const form = {
        title: this.title,
        description: this.description,
        body: this.body,
        tagList: this.tagList.split(' ')
      }
      this.$emit('articleSubmit', form)
    }
  }
}
</script>