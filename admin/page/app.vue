<template>
    <div id="app">
        <div class="headerWrapper">
            <header class="header" ref="header">
                <div class="container">
                    <h1>
                        <router-link :to="`/`">BIKE</router-link>
                    </h1>
                </div>
            </header>
            <router-view></router-view>
        </div>
    </div>
</template>

<script>
    export default {
        data () {
            return {
                msg: 'Use Vue 2.0 Today!'
            }
        },
        methods: {
            startHacking () {
                this.$notify({
                    title: 'It Works',
                    message: 'We have laid the groundwork for you. Now it\'s your time to build something epic!',
                    duration: 6000
                })
            }
        }
    }
</script>

<style scoped>

    html, body {
        margin: 0;
        padding: 0;
        height: 100%;
    }
    #app {
        height: 100%;
    }
    body {
        font-family: 'Helvetica Neue',Helvetica,'PingFang SC','Hiragino Sans GB','Microsoft YaHei',SimSun,sans-serif;
        overflow: auto;
        font-weight: 400;
        -webkit-font-smoothing: antialiased;
    }
    .headerWrapper {
        height: 80px;
    }
    .header {
        height: 80px;
        background-color: rgba(32, 160, 255, 1);
        color: #fff;
        top: 0;
        left: 0;
        width: 100%;
        line-height: @height;
        z-index: 100;
        position: relative;
    }
    .container {
        height: 100%;
        box-sizing: border-box;
    }
    h1 {
        margin: 0;
        float: left;
        font-size: 32px;
        font-weight: normal;
    }
    a {
        color: #fff;
        text-decoration: none;
        display: block;
    }
</style>
