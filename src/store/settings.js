import {mutationTypes} from '@/store/auth';

const state = {
    isSubmitting: false,
    validationErrors: null,
}

const mutations = {
    [mutationTypes.updateUserStart](state) {
        state.isSubmitting = true
        state.validationErrors = null
    },
    [mutationTypes.updateUserSuccess](state) {
        state.isSubmitting = false
    },
    [mutationTypes.updateUserFailure](state, payload) {
        state.isSubmitting = false
        state.validationErrors = payload
    }
}

export default {
    state, mutations
}