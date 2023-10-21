import axios from "@/api/axios";

const getUrl = slug => `/articles/${slug}/favorite`

const favoriteArticle = slug => {
    return axios.post(getUrl(slug)).then(response => response.data.article)
}

const removeFromFavorites = slug => {
    return axios.delete(getUrl(slug)).then(response => response.data.article)
}

export default {
    favoriteArticle, removeFromFavorites
}