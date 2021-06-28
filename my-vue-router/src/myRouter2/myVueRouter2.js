// import Home from '../views/Home.vue'


let Vue

class MyVueRouter2 {
    constructor(options) {
        this.$optins = options // 拿到实例化时传入的options。以便后面调用
        // this.current = window.location.hash.slice(1) || '/'
        Vue.util.defineReactive(this, 'current', window.location.hash.slice(1) || '/')
        console.log(this.current, '哈希path')
        window.addEventListener('hashchange', ev => {
            this.current = window.location.hash.slice(1)
            console.log(ev, '改变了', this.current)
        })
    }
}

MyVueRouter2.install = function (_vue) {
    Vue = _vue // 保存vue构造函数以方便后面使用

    // Vue.mixin() 混入
    Vue.mixin({
        beforeCreate() {
            if (this.$options.router) {
                Vue.prototype.$router = this.$options.router // 挂到原型上，下面的组件都可以拿到路由实例
                                        // main.js中传入到vue实例中的options选项
            }
        }
    })

    Vue.component('router-link', {
        props: {
            to: {
                type: String,
                required: true
            }
        },
        render(h) {
            return h('a', {
                attrs: {
                    href: `#${this.to}`
                }
            }, this.$slots.default)
        }
    })
    Vue.component('router-view', {
        render(h) {
            console.log(this.$router, '拿到路由实例')
            console.log(this.$router.$optins.routes, '拿到路由对象')
            // console.log(this.$router.currentRoute, '当前路由path') // undefined. 因为不是官方路由插件，没做处理这里拿不到，自己做处理
            console.log(this.$router.current, '当前路由path')
            let com // component
            let route = this.$router.$optins.routes.find(item => item.path === this.$router.current)
            if (route) {
                com = route.component
            }
            return h(com);
        }
    })
}
export default MyVueRouter2