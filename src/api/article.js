import axios from "@/api/axios";

const getArticle = slug => {
    return axios.get(`/articles/${slug}`).then(response => response.data.article)
}

const deleteArticle = slug => {
    return axios.delete(`/articles/${slug}`)
}

const createArticle = article => {
    return axios.post('/articles', {article: article}).then(response => response.data.article)
}

const updateArticle = (slug, article) => {
    return axios.put(`/articles/${slug}`, {article: article}).then(response => response.data.article)
}

export default {
    getArticle, deleteArticle, createArticle, updateArticle
}