<template>
    <div class="header">
        <div class="l-content">
            <!-- <el-button :icon="Menu"/> -->
            <el-button size="small" @click="handleCollapse" style="margin-right:5px">
                <component class="icons" is="menu"></component>
            </el-button>
            <el-breadcrumb class="bread" :separator-icon="ArrowRight" >
                <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
                <el-breadcrumb-item>商品管理</el-breadcrumb-item>
                <el-breadcrumb-item>用户管理</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="r-content">
            <el-dropdown>
                <span class="el-dropdown-link">
                    <img :src="getImageUrl('user')" class="user">
                </span>
                <template #dropdown>
                <el-dropdown-menu>
                    <el-dropdown-item>个人中心</el-dropdown-item>
                    <el-dropdown-item>退出</el-dropdown-item>
                </el-dropdown-menu>
                </template>
            </el-dropdown>
        </div>
    </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import {useAllDataStore} from '@/stores';
const getImageUrl = (user)=>{
    return new URL(`../assets/images/${user}.png`,import.meta.url).href
}

const store = useAllDataStore();
const handleCollapse = ()=>{
    store.state.isCollapse = !store.state.isCollapse;
}
</script>

<style lang="less" scoped>


.header {
    height: 100%;
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
    justify-content: space-between;
    align-items: center;
    background-color: #333;
    .l-content{
        display: flex;
        flex-direction: row;
        flex-wrap: nowrap;
        align-items: center;
    }
}

.r-content {
    .example-showcase .el-dropdown-link {
        cursor: pointer;
        color: var(--el-color-primary);
        display: flex;
        align-items: center;
    }
    .user {
        height:40px;
        widows: 40px;
        border-radius: 50%;
    }
}

.l-content {
    .el-breadcrumb__inner{
        color: #fff !important;
    }
}
.icons {
    width: 18px;
    height: 18px;
}
:deep(.bread span) {
    color:#fff;
    cursor: alias;
}
// .el-menu {
//     border-right: none;
//     h3 {
//         line-height: 48px;
//         color:#fff;
//         text-align: center;
//     }
// }
// .el-aside {
//     background: #545C64;
//     height: 100%;
// }
</style>