// 初始化：Store声明、install实现
let Vue

function install(_vue) {
    Vue = _vue
    console.log(Vue)
    Vue.mixin({
        beforeCreate() {
            if (this.$options.store) {
                Vue.prototype.$store = this.$options.store
            }
        }
    })
}
class Store {
    constructor(options) {
        // this.$options = options
        this.state = options.state || {}
        this.mutations = options.mutations || {}
        this.actions = options.actions || {}

        new Vue({
            data: this.state
        })
    }
    commit(params) {
        console.log(this.state.age)
        this.mutations[params](this.state)
        console.log(this.state.age)
    }
    dispatch(params) {
        this.actions[params](this.commit[params])
    }
}

export default {Store, install}

