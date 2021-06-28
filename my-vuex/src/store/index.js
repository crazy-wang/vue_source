import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

// Moudle 模块
const moduleA = {
    // 默认情况下，模块内部的 action、mutation 和 getter 是注册在全局命名空间的——这样使得多个模块能够对同一 mutation 或 action 作出响应。【激发一次，同名的都会响应】
    // 如果希望你的模块具有更高的封装度和复用性，你可以通过添加 namespaced: true 的方式使其成为带命名空间的模块。当模块被注册后，它的所有 getter、action 及 mutation 都会自动根据模块注册的路径调整命名
    // namespaced: true,
    // 【在带命名空间的模块内访问全局内容】 如果你希望使用全局 state 和 getter，rootState 和 rootGetters 会作为第三和第四参数传入 getter，也会通过 context 对象的属性传入 action。;若需要在全局命名空间内分发 action 或提交 mutation，将 { root: true } 作为第三参数传给 dispatch 或 commit 即可。
    // state: {
    //     name:"王嗨"
    // },浏览器分析performance显示资源加载之间存在空白期
    // state: function() {
    //     return {
    //         name: '王嗨'
    //     }
    // },
    // state: () => {
    //     return {
    //         name: '王嗨'
    //     }
    // },
    state: () => ({
        name: '王嗨'
    }),
    mutations: {
        increment(state) {
            state.name = '王政奇'
        },
        changeName(state) {
            state.name = '王政奇'
        }
    },
    // 对于模块内部的action，局部状态通过 context.state 暴露出来，根节点状态则为 context.rootState
    actions: {
        link({commit, state, rootState}) {
            console.log(state, '局部状态')
            console.log(rootState, '根节点状态')
            commit('increment') // 启用了命名空间的 getter 和 action 会收到局部化的 getter，dispatch 和 commit。换言之，你在使用模块内容（module assets）时不需要在同一模块内额外添加空间名前缀。更改 namespaced 属性后不需要修改模块内的代码
            // commit('changeName')
        }
    }
}

export default new Vuex.Store({
    // 单一状态树
    state: {
        count: 0,
        age: 15
    },
    // mutations 必须是同步函数,不能混入异步调用
    mutations: {
        increment(state) {
            state.count++
        },
        reduce(state) {
            state.count--
        },
        setAge(state, val) {
            state.age = val
        }
    },
    // 为了处理异步操作【Action 类似于 mutation，不同在于： 1.Action 提交的是 mutation，而不是直接变更状态。2.Action 可以包含任意异步操作。】【Action 通过 store.dispatch 方法触发】
    actions: {
        incrementAction(context) { // context 对象 不是 store 实例本身
            console.log(context, 1)
            console.log(this, 2)
            console.log(context == this.$store, 3)
            context.commit('increment')
        },
        reduceAction({commit}) { // 解构
            // commit('reduce')
            setTimeout(() => {
                commit('reduce')
            }, 2000)
        },
        ageAction({commit, state}, val) {
            let num = val + state.count
            commit('setAge', num)
        },
        actionA({commit}) {
            return new Promise((resolve) => {
                setTimeout(() => {
                    commit('reduce')
                    resolve()
                }, 1000)
            })
        },
        // 在另外一个action中调用另外一个action
        actionB({commit, dispatch}) {
            return dispatch('actionA').then(() => {
                commit('setAge', 999999)
            })
        },
        // 用 async/await 代替 promise
        async actionC({commit, dispatch}) {
            let getOtherData = function () {
                let OtherData = new Promise((resolve) => {
                    resolve(99999)
                })// 假设OtherData返回的是Promise
                return OtherData
            }
            await dispatch('actionA')
            commit('setAge', await getOtherData())
        }
    },
    modules: {
        a: moduleA
    },
    // store 创建之后，还可以动态注册模块和动态卸载模块。store.registerModule; store.unregisterModule【注意，不能使用此方法卸载静态模块（即创建 store 时声明的模块】
    // 通过 store.hasModule(moduleName) 方法检查该模块是否已经被注册到 store
    getters: {
        doubleCount: state => {
            return state.count * 2
        },
        ageText: (state, getters) => {
            console.log(getters, 'getters打印')
            return state.age + '岁'
        }
    }
})


