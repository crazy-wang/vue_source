let Vue

class Store {
    constructor(options) {
        this.$options = options
        this.$mutations = this.$options.mutations
        this.$actions = this.$options.actions
        this.$getters = this.$options.getters
        this._vm = new Vue({
            data() {
                return {
                    $$state: options.state,
                    $c: 3243,
                    abc: 123,
                    // 以$开头的vue将不对他做代理。通过下面的get可以得知结论
                }
            }
        })
        // Vue.util.defineReactive(this, 'state', this.$options.state)

        this.commit = this.commit.bind(this)
        this.dispatch = this.dispatch.bind(this)
        this.getters = this.getters.bind(this)
    }

    // state通过 get/set存取器 做处理
    get state() {
        // console.log(this._vm, 'kk1')
        // console.log(this._vm.abc, 'kk2')
        // console.log(this._vm.$c, 'kk3')
        // console.log(this._vm._data.$c, 'kk4')
        return this._vm._data.$$state
    }

    set state(val) {
        console.error('不能这样直接设置')
    }

    commit(type, payload) {
        // 根据type从用户配置的mutations中获得相应函数
        let entry = this.$mutations[type]
        if (!entry) {
            console.error(`没有定义${type}-mutations`)
            return
        }
        entry(this.state, payload)
    }

    dispatch(type, payload) {
        let entry = this.$actions[type]
        if(!entry) {
            console.error(`没有定义${type}-actions`)
            return
        }
        entry(this, payload) // 前面要绑定this才可以。
    }

    getters() { // 应该返回一个对象
        return
    }
}

function install(_vue) {
    Vue = _vue
    Vue.mixin({
        beforeCreate() {
            if (this.$options.store) {
                Vue.prototype.$store = this.$options.store
            }
        }
    })
}


export default {Store, install}

