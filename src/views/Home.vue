<script setup>
import { ref } from 'vue';
var time = new Date().toLocaleTimeString();
const getImageUrl = (user)=> {
    return new URL(`../assets/images/${user}.png`,import.meta.url).href;
}
const tableLabel = ref([
    {
        label: "课程", tag: "name", fixed: true
    },
    {
        label: "今日购买", tag: "todayBuy", 
    },
    {
        label: "月度购买", tag: "mouthBuy", 
    },
    {
        label: "总购买", tag: "totalBuy",
    }
]);
const tableData = ref([
  {
    name: 'python',
    todayBuy: '300',
    mouthBuy: '1000',
    totalBuy: '2200',
  },
  {
    name: 'java',
    todayBuy: '700',
    mouthBuy: '900',
    totalBuy: '1200',
  },
]);

import axios from 'axios'; //直接引用写法
axios({
    url:'/api/home/getTableData',
    method:'get'
}).then(res=>{
    console.log(res.data);
})
</script>

<template>
    <div class="home">
        <el-row :gutter="20" height="100%   ">
            <el-col :span="8" style="margin-top:20px" class="first-col">
                <el-card shoadow="hover" class="user-table">
                    <div class="user">
                        <img :src="getImageUrl('user')"/>
                        <div class="user-info">
                            <p class="user-info-n">Admin</p>
                            <p class="user-info-s">超级管理员</p>
                        </div>
                    </div>
                    <div class="login-info"  >
                        <p>上次登录时间：<span >{{ time }}</span></p>
                        <p>上次登录地点：<span >北京</span></p>
                    </div>
                </el-card>
                <el-card shoadow="hover" class="order-table">
                    <el-table :data="tableData" style="width: 100%" height="250">
                        <el-table-column 
                        v-for=" (val,key) in tableLabel" 
                        :key="key" 
                        :prop="val.tag"
                        :label="val.label"
                        :fixed="val.fixed" />
                    </el-table>
                </el-card>
            </el-col>
            <el-col :span="16" style="margin-top:20px">
                
            </el-col>

        </el-row>
    </div>
</template>

<style scoped lang="less">
    .home {
        height: 100%;
        overflow: hidden;
        .user-table {
            margin-bottom: 20px;
        }
        .user {
            display: flex;
            align-items: center;
            border-bottom: 2px solid #ccc;
            margin-bottom: 20px;
            padding-bottom: 20px;
            img {
                width: 150px;
                height:150px;
                border-radius: 50%;
                margin-right: 40px;
            }
            .user-info {
                .user-info-n {
                    color:#000;
                    font-size:30px;
                    margin-bottom:10px;
                }
                .user-info-s {
                    color:#ccc;
                    font-size:16px;
                }
            }
        }
        
        .login-info {
            line-height: 30px;
            font-size: 14px;
            color: #999;
            span {
                color: #666;
                margin-right: 60px;
            }
            p:first-child {
                margin-bottom:10px;
            }
        }

    }
    
</style>
