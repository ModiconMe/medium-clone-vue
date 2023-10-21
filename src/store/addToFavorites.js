import addToFavoriteApi from '@/api/addToFavorite'

export const mutationTypes = {
    addToFavoriteStart: '[article] Add to favorite start',
    addToFavoriteSuccess: '[article] Add to favorite success',
    addToFavoriteFailure: '[article] Add to favorite failure'
}

export const actionTypes = {
    addToFavorites: '[article] Add to favorites'
}

const mutations = {
    [mutationTypes.addToFavoriteStart]() {
    },
    [mutationTypes.addToFavoriteSuccess]() {
    },
    [mutationTypes.addToFavoriteFailure]() {
    }
}

const actions = {
    [actionTypes.addToFavorites](context, {slug, isFavorited}) {
        return new Promise(resolve => {
            context.commit(mutationTypes.addToFavoriteStart)
            const promise = isFavorited
                ? addToFavoriteApi.removeFromFavorites(slug)
                : addToFavoriteApi.favoriteArticle(slug)
            promise
                .then(response => {
                    context.commit(mutationTypes.addToFavoriteSuccess)
                    resolve(response)
                })
                .catch(() => context.commit(mutationTypes.addToFavoriteFailure))
        })
    }
}

export default {
    mutations, actions
}