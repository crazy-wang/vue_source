import Vue from 'vue'
// import Vuex from 'vuex'
import Vuex from './myVuex'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        name: '王嗨',
        age: 25
    },
    mutations: {
        ADD(state) {
            state.age++
        }
    },
    actions: {
        add({commit}) {
            setTimeout(() => {
                commit('ADD')
            }, 2000)
        }
    }
})
