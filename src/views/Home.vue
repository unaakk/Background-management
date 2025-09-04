<script setup>

var time = new Date().toLocaleTimeString();
const getImageUrl = (user)=> {
    return new URL(`../assets/images/${user}.png`,import.meta.url).href;
}


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
