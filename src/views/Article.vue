<template>
  <div class="article-page">
    <div class="banner">
      <div class="container" v-if="article && !isLoading">
        <h1>{{ article.title }}</h1>
        <div class="article-meta">
          <router-link :to="{name: 'userProfile', params: {slug: article.author.username}}">
            <img :src="article.author.image" alt="avatar">
          </router-link>
          <div class="info">
            <router-link class="author" :to="{name: 'userProfile', params: {slug: article.author.username}}">
              {{ article.author.username }}
            </router-link>
            <span class="date">
              {{ article.createdAt }}
            </span>
          </div>

          <span v-if="isAuthor">
            <router-link class="btn btn-outline-secondary btn-sm"
                         :to="{name: 'editArticle', params: {slug: article.slug}}">
              <i class="ion-edit"/>
              Edit article
            </router-link>
            <button class="btn btn-outline-danger btn-sm" @click="onDeleteArticle">
              <i class="ion-trash-a"/>
              Delete article
            </button>
          </span>
        </div>
      </div>
    </div>

    <div class="container page">
      <mcv-loading v-if="isLoading"/>
      <mcv-error-message v-if="error" :message="error"/>
      <div class="row article-content" v-if="article && !isLoading">
        <div class="col-xs-12">
          <div>
            <p>{{ article.body }}</p>
          </div>
          <mcv-article-tags :tag-list="article.tagList"/>
        </div>
      </div>
      <hr>

      <div class="article-actions" v-if="article && !isLoading">
        <div class="article-meta">
          <router-link :to="{name: 'userProfile', params: {slug: article.author.username}}">
            <img :src="article.author.image">
          </router-link>
          <div class="info">
            <router-link class="author" :to="{name: 'userProfile', params: {slug: article.author.username}}">
              {{ article.author.username }}
            </router-link>
            <span class="date">
              {{ article.createdAt }}
            </span>
          </div>

          <div>
            Edit delete article
          </div>

          <span>
            <button class="btn btn-sm action-btn btn-secondary">
            <div v-if="article.author.following">
              <i class="ion-plus-round"></i>
              &nbsp; Unfollow {{ article.author.username }}
            </div>
            <div v-else>
              <i class="ion-plus-round"></i>
              &nbsp; Follow {{ article.author.username }}
            </div>
          </button>

          <button class="btn btn-sm btn-outline-primary">
            <div v-if="article.favorited">
              <i class="ion-plus-round"></i>
              &nbsp; Favorite Article {{ article.author.username }}
            </div>
            <div v-else>
              <i class="ion-plus-round"></i>
              &nbsp; Unfavorite Article
            </div>
          </button>
          </span>

        </div>
      </div>

      <div class="row">
        <div class="col-xs-12 col-md-8 offset-md-2">
          <div v-if="isLoggedIn">
            <div v-if="error">errors</div>
            <form class="card comment-form" @submit.prevent="onSubmit">
              <div class="card-block">
                <textarea class="form-control" placeholder="Write a comment..." rows="3">

                </textarea>
              </div>
              <div class="card-footer">
                <img :src="currentUser.image" class="comment-author-img"/>
                <button class="btn btn-sm btn-primary" type="submit">
                  Post comment
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>

    </div>
  </div>
</template>

<script>
import {actionTypes as articleActionTypes} from "@/store/article";
import {mapGetters, mapState} from "vuex";
import {getterTypes as authGetterTypes} from "@/store/auth";
import McvLoading from "@/components/Loading.vue";
import McvErrorMessage from "@/components/ErrorMessage.vue";
import McvArticleTags from "@/components/ArticleTags.vue";

export default {
  name: "McvArticle",
  components: {McvArticleTags, McvErrorMessage, McvLoading},
  computed: {
    ...mapState({
      isLoading: state => state.article.isLoading,
      article: state => state.article.data,
      error: state => state.article.error,
    }),
    ...mapGetters({
      isLoggedIn: authGetterTypes.isLoggedIn,
      currentUser: authGetterTypes.currentUser,
    }),
    isAuthor() {
      if (!this.currentUser || !this.article) {
        return false
      }
      return this.currentUser.username === this.article.author.username
    }
  },
  mounted() {
    this.$store.dispatch(articleActionTypes.getArticle, {slug: this.$route.params.slug})
  },
  methods: {
    onSubmit() {
      console.log('sumbit comment')
    },
    onDeleteArticle() {
      this.$store.dispatch(articleActionTypes.deleteArticle, {slug: this.$route.params.slug})
          .then(() => this.$router.push({name: 'globalFeed'}))
    }
  }
}
</script>