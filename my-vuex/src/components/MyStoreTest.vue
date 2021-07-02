<template>
    <div class="">
         姓名{{$store.state.name}}
        <hr />
        <p>
            <span @click="addAge">增加</span> 年龄：{{age}}
        </p>
        <p>
            <span @click="addAgeAsync">异步增加(2s后)</span>
        </p>
        <p>
            getters:双倍年龄-{{$store.getters.dobuleAge}}
        </p>
    </div>
</template>

<script>
    export default {
        name: "MyStoreTest",
        computed: {
            age() {
                return this.$store.state.age
            }
        },
        methods: {
            addAge() {
                this.$store.commit('ADD')
            },
            addAgeAsync() {
                this.$store.dispatch('add')
            }
        }
    }
</script>

<style scoped>
    span {
        cursor: pointer;
    }
</style>