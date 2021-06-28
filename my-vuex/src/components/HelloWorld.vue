<template>
    <div class="hello">
        <h1 @click="handleClick">{{ $store.state.count }}</h1>
        <h1>{{ count2 }}</h1>
        <p>{{age}} <span @click="setAge(18)">设置年龄为18</span></p>
        <p>{{$store.getters.ageText}}</p>
        {{$store.getters.doubleCount}}
        <hr />
        <div>mapGetters:{{ageText}} | mapGetters: {{doubleCount}}</div>
        <hr />
        <h2>action调用</h2>
        <div>
            <span @click="incrementAction">点击我调用incrementAction</span>|
            <span @click="reduceAction">点击我异步调用reduceAction，2s后执行</span>|
            <span @click="ageAction">点击我调用ageAction</span>|
            <span @click="actionA">点击我调用actionA</span>|
        </div>
        <div>
            <span>{{$store.state.a.name}}</span>
            <span @click="moduleA">点击我调用moduleA改变名字</span>|
            <span @click="moduleA2">点击我调用moduleA的actions</span>
        </div>
    </div>
</template>

<script>
    import {mapState, mapGetters, mapMutations, mapActions} from 'vuex'

    // import {createNamespacedHelpers} from 'vuex'  createNamespacedHelpers 创建基于某个命名空间辅助函数
    // const {mapState, mapActions} = createNamespacedHelpers('命名空间路径')

    export default {
        name: 'HelloWorld',
        props: {
            msg: String
        },
        data() {
            return {
                text: '测试文本'
            }
        },
        // computed: {
        //     count() {
        //         return this.$store.state.count
        //     },
        //     age() {
        //         return this.$store.state.age
        //     }
        // },
        // computed: mapState({
        //     count2: state => state.count, // 1 箭头函数
        //     // count2: 'count' 2 字符串参数
        //     age: function (state) { // 3 常规函数可以使用this获取当前实例局部信息
        //         return state.age + this.text
        //     },
        // }),
        computed: {
            ...mapState({
                count2: state => state.count, // 1 箭头函数
                // count2: 'count' 2 字符串参数
                age: function (state) { // 3 常规函数可以使用this获取当前实例局部信息
                    return state.age + this.text
                },
            }),
            ...mapGetters(['doubleCount', 'ageText'])
        },
        // 当映射的计算属性的名称与state的字节点名称相同时，可以给mapState传一个字符串数组
        // computed： mapState(['count', 'age']) // 映射 this.count = store.state.count
        // computed: {
        //     count2() {
        //         return 3
        //     },
        //     ...mapState(['count', 'age']), // 使用对象展开运算符将此对象混入到外部对象中
        //     doubleCount() {
        //         return this.$store.getters.doubleCount
        //     }
        // },
        methods: {
            // handleClick() {
            //     this.$store.commit('increment')
            //     // this.$store.state.count = 9
            // },
            // setAge(val) {
            //     this.$store.commit('setAge', val)
            // },
            ...mapMutations({
                handleClick: 'increment',
                setAge: 'setAge'
            }),
            // ...mapMutations(['setAge'])
            // incrementAction() {
            //     this.$store.dispatch('incrementAction')
            // },
            // reduceAction() {
            //     this.$store.dispatch('reduceAction')
            // },
            // ageAction() {
            //     this.$store.dispatch('ageAction', 28)
            // },
            ...mapActions(['incrementAction', 'reduceAction', 'ageAction']),
            actionA() {
                console.log(this.$store.dispatch('actionA').then(res => console.log(res, '里面')), '测返回结果')
            },
            moduleA() {
                this.$store.commit('changeName')
            },
            moduleA2() {
                this.$store.dispatch('link')
                // this.$store.dispatch('a/link')
                // this.$store.commit('increment')
                // this.$store.commit('a/increment')
            }
        },
        created() {
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    h3 {
        margin: 40px 0 0;
    }

    ul {
        list-style-type: none;
        padding: 0;
    }

    li {
        display: inline-block;
        margin: 0 10px;
    }

    a {
        color: #42b983;
    }
</style>
