<template>
    <div id="app">
        <div style="background: #20A0FF;height: 80px;color: white;padding:20px;">
            <h1>智能车锁后台</h1>

        </div>
        <el-row class="tac">
            <el-col :span="4">
                <el-menu default-active="2" class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose">
                    <el-submenu index="1">
                        <template slot="title"><i class="el-icon-message"></i>导航一</template>
                        <el-menu-item-group>
                            <template slot="title">分组一</template>
                            <el-menu-item index="1-1">选项1</el-menu-item>
                            <el-menu-item index="1-2">选项2</el-menu-item>
                        </el-menu-item-group>
                        <el-menu-item-group title="分组2">
                            <el-menu-item index="1-3">选项3</el-menu-item>
                        </el-menu-item-group>
                    </el-submenu>
                    <el-menu-item index="2"><i class="el-icon-menu"></i>设备管理</el-menu-item>
                    <el-menu-item index="3"><i class="el-icon-setting"></i>导航三</el-menu-item>
                </el-menu>
            </el-col>
            <el-col :span="20">
                <router-view></router-view>
            </el-col>
        </el-row>

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

<style>

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

</style>
