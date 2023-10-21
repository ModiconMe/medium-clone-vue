<template>
  <div>
    <mcv-loading v-if="isLoading"/>
    <mcv-error-message v-if="error"/>

    <div v-if="feed">
      <div class="article-preview" v-for="(article, index) in feed.articles" :key="index">

        <div class="article-meta">
          <router-link :to="{name: 'userProfile', params: {slug: article.author.username}}">
            <img :src="article.author.image"/>
          </router-link>
        </div>

        <div class="info">
          <router-link :to="{name: 'userProfile', params: {slug: article.author.username}}"
                       class="author">
            {{ article.author.username }}
          </router-link>
          <span class="date">
            {{ article.createdAt }}
          </span>
        </div>
        <div class="pull-xs-right">
          <mcv-add-to-favorites v-if="isLoggedIn" :is-favorited="article.favorited" :slug="article.slug"
                                :favorites-count="article.favoritesCount" is-favotited/>
        </div>

        <router-link :to="{name: 'article', params: {slug: article.slug}}" class="preview-link">
          <h1>{{ article.title }}</h1>
          <p>{{ article.description }}</p>
          <span>Read more...</span>
          <mcv-article-tags :tag-list="article.tagList"/>
        </router-link>
      </div>
      <mcv-pagination :total="feed.articlesCount" :limit="limit" :current-page="currentPage" :url="baseUrl"/>

    </div>
  </div>
</template>

<script>
import {mapGetters, mapState} from "vuex";
import {actionTypes as feedActionTypes} from "@/store/feed"
import McvPagination from "@/components/Pagination.vue";
import {limit} from "@/helpers/vars";
import queryString from "query-string";
import McvLoading from "@/components/Loading.vue";
import McvErrorMessage from "@/components/ErrorMessage.vue";
import McvArticleTags from "@/components/ArticleTags.vue";
import {getterTypes} from "@/store/auth";
import McvAddToFavorites from "@/components/AddToFavorites.vue";

export default {
  name: "McvFeed",
  props: {
    apiUrl: {
      type: String,
      required: true
    }
  },
  components: {
    McvAddToFavorites,
    McvArticleTags,
    McvErrorMessage,
    McvLoading,
    McvPagination
  },
  data() {
    return {
      limit
    }
  },
  mounted() {
    this.fetchFeed()
  },
  computed: {
    ...mapState({
      isLoading: state => state.feed.isLoading,
      feed: state => state.feed.data,
      error: state => state.feed.error,
      article: state => state.article.data
    }),
    ...mapGetters({
      isLoggedIn: getterTypes.isLoggedIn
    }),
    currentPage() {
      return Number(this.$route.query.page || '1')
    },
    baseUrl() {
      return this.$route.path
    },
    offset() {
      return (this.currentPage - 1) * limit
    }
  },
  watch: {
    currentPage() {
      this.fetchFeed()
    }
  },
  methods: {
    fetchFeed() {
      const parsedUrl = queryString.parseUrl(this.apiUrl);
      const stringifyParams = queryString.stringify({
        limit,
        offset: this.offset,
        ...parsedUrl.query
      });
      const apiUrlWithParams = `${parsedUrl.url}?${stringifyParams}`
      this.$store.dispatch(feedActionTypes.getFeed, {apiUrl: apiUrlWithParams})
    }
  }
}
</script>