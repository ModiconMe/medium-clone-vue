<template>
  <div class="home-page">
    <mcv-banner/>
    <div class="container page">
      <div class="row">
        <div class="col-md-9">
          <mcv-feed-toggler/>
          <mcv-feed :api-url="apiUrl"/>
        </div>
        <div class="col-md-3">
          <mcv-popular-tags/>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import McvFeed from "@/components/Feed.vue";
import McvPopularTags from "@/components/Tags.vue";
import McvBanner from "@/components/Banner.vue";
import McvFeedToggler from "@/components/McvFeedToggler.vue";

export default {
  name: "McvYourFeed",
  components: {
    McvFeedToggler,
    McvBanner,
    McvPopularTags,
    McvFeed
  },
  data() {
    return {
      apiUrl: '/articles/feed'
    }
  }
}
</script>