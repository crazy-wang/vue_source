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
        ADD(state) { // 这里的state是形参，不过他接收的是真正的state
            state.age++
        }
    },
    actions: {
        add({commit}) {
            setTimeout(() => {
                commit('ADD')
            }, 2000)
        }
    },
    getters: {
        doubleAge(state) {
            return state.age * 2
        },
        selfAge(state) {
            return state.age / 2
        }
    }
})
