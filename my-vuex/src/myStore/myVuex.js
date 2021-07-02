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
        // 绑定this很重要，commit也得写，不然dispatch不生效
        this.commit = this.commit.bind(this)
        this.dispatch = this.dispatch.bind(this)

    }
    commit(params) {
        // console.log(this, '多少') 没有上面的绑定this,那么通过dispatch触发action再commit到mutations时，this就会undefined
        console.log(this.state.age)
        this.mutations[params](this.state)
        console.log(this.state.age)
    }
    dispatch(params) {
        this.actions[params](this)
    }
}

export default {Store, install}

