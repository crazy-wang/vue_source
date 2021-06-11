// vue插件形式: 对象或者函数；会有一个install方法，该方法会在use的时候被调用

let Vue // 将来做保存用。// 不直接import vue 引用进来，原因是属于第三方的插件库，不希望和vue有太多耦合关系，打包也小。所以将来会用一个参数的形式把vue构造函数传进来

class MyVueRouter {
    constructor(options) { // 构造函数在用来new的时候可以接受选项
        // 1.选项中包含路由配置信息，保存起来以便下边组件使用。
        this.$options = options
        // console.log(Vue, '111')
        // console.log(Vue.util, '222')

        Vue.util.defineReactive(this, 'current', window.location.hash.slice(1) || '/')

        // 2.监听url变化，hashchange事件处理，并在变化的时候响应
        window.addEventListener('hashchange', () => {
            this.current = window.location.hash.slice(1)
            // current需要处理为响应式
        })
    }
}

// 静态函数
MyVueRouter.install = function (_vue) { // 接受一个构造函数。_vue形参接收的就是vue的构造函数。不是vue实例.构造函数和实例还是不一样的。相当于一个虚空壳一个实体
    // 传入构造函数，我们可以修改它的原型，起到扩展作用。
    Vue = _vue // 保存一份，将来可以在MyVueRouter中使用

    // 1.注册$router实例，因为在以后所有的组件中都可以通过this.$router操作。
    // 延迟执行接下来的代码，等到router实例创建之后再执行。
    // 全局混入：Vue.mixin()
    // Vue.mixin()
    Vue.mixin({
        beforeCreate() {
            // 此处的this指的是组件实例
            if (this.$options.router) { // 保证只在根组件vue实例中执行一次，并不是所有组件实例都需要执行
                console.log(Vue, '是啥2')
                Vue.prototype.$router = this.$options.router
            }
        }
    })
    // console.log(Vue,'是啥1')
    // Vue.prototype.$router = Vue.options.router


    // 2.全局组件 router-link 和 router-view

    // runtime-only版本没有编译器，不允许使用template。所以要使用render
    // Vue.component('router-link', {
    //     template: '<a>ooxx</a>'
    // })
    // Vue.component('router-view', {
    //     template: '<div>你好大</div>'
    // })

    Vue.component('router-link', {
        // router-link to属性没有在props中声明，则会显示在标签上。声明后就不显示在标签上了。
        props: {
            to: {
                type: String,
                required: true
            }
        },
        render(h) { // h是createElement,返回虚拟dom
            // 获取插槽内容
            let slotDVal = this.$slots.default
            // a标签to属性转href。 <a to="/about"> => <a href="#/about">
            // 获取router-link to属性
            return h('a', {
                attrs: {
                    href: '#' + this.to // 前面锚点#很重要。有了它就实现了url改变页面不刷新。利用了hash。
                }
            }, slotDVal)
        }
    })
    Vue.component('router-view', {
        render: function render(h) {
            // let slotDVal = this.$slots.default
            // return h('div', {}, 'router-view')
            // return h(组件) h函数除了渲染字符串模板；也可以直接渲染一个组件

            // 1.获取router实例，有了实例就能拿到里面的options路由表配置信息。
            // 2.获取当前浏览器hash部分，获取path
            // 3.根据path,从路由表中或者com组件

            console.log(this.$router.$options, '配置') //映射构myVueRouter类中的造函数中的$options
            console.log(this.$router.current, '当前hash')
            let com = null
            let route = this.$router.$options.routes.find(item => {
                return item.path === this.$router.current
            })
            if(route) {
                com = route.component
            }
            return h(com)
        }
    })
}


export default MyVueRouter