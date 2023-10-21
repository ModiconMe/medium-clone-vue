<template>
  <button :class="{'btn': true, 'btn-sm': true, 'btn-primary': isFavoritedOptimistic,
           'btn-outline-primary': !isFavoritedOptimistic}"
          @click="handleLike(slug)">
    <i class="ion-heart"></i>
    <span>&nbsp;{{ favoritesCountOptimistic }}</span>
  </button>
</template>

<script>
import {actionTypes} from "@/store/addToFavorites";

export default {
  name: "McvAddToFavorites",
  props: {
    isFavorited: {
      type: Boolean,
      required: true
    },
    slug: {
      type: String,
      required: true
    },
    favoritesCount: {
      type: Number,
      required: true
    }
  },
  data() {
    return {
      isFavoritedOptimistic: this.isFavorited,
      favoritesCountOptimistic: this.favoritesCount
    }
  },
  methods: {
    handleLike() {
      this.$store.dispatch(actionTypes.addToFavorites, {
        slug: this.slug,
        isFavorited: this.isFavoritedOptimistic
      })
      if (this.isFavoritedOptimistic) {
        this.favoritesCountOptimistic = this.favoritesCountOptimistic - 1
      } else {
        this.favoritesCountOptimistic = this.favoritesCountOptimistic + 1
      }
      this.isFavoritedOptimistic = !this.isFavoritedOptimistic
    }
  }
}
</script>