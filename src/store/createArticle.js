import articleApi from '@/api/article'

const state = {
    isSubmitting: false,
    validationErrors: null
}

export const mutationTypes = {
    createArticleStart: '[createArticle] Create article start',
    createArticleSuccess: '[createArticle] Create article success',
    createArticleFailure: '[createArticle] Create article failure',
}

export const actionTypes = {
    createArticle: '[article] Create article'
}

const mutations = {
    [mutationTypes.createArticleStart](state) {
        state.isSubmitting = true
    },
    [mutationTypes.createArticleSuccess](state) {
        state.isSubmitting = false
    },
    [mutationTypes.createArticleFailure](state, payload) {
        state.isSubmitting = false
        state.validationErrors = payload
    },
}

const actions = {
    [actionTypes.createArticle](context, article) {
        return new Promise(resolve => {
            context.commit(mutationTypes.createArticleStart)
            articleApi.createArticle(article)
                .then(response => {
                    context.commit(mutationTypes.createArticleSuccess)
                    resolve(response)
                })
                .catch(response => context.commit(mutationTypes.createArticleFailure, response.response.data.errors))
        })
    }
}

export default {
    state, mutations, actions
}