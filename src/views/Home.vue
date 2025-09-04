<script setup>
import { ref, getCurrentInstance, onMounted , reactive} from 'vue';
import * as echarts from 'echarts';

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
const countData = ref([]);

const {proxy} = getCurrentInstance();
const getTableData = async ()=>{
    const data = await proxy.$api.getTableData();
    // console.log(data);
    tableData.value = data.tableData;
}
const getCountData = async ()=>{
    const data = await proxy.$api.getCountData();
    // console.log(data);
    countData.value = data.countData;
}
const getChartData = async ()=>{
    const {orderData,userData,videoData} = await proxy.$api.getChartData();

    // 折线图
    xOptions.xAxis.data = orderData.date;
    xOptions.series = Object.keys(orderData.data[0]).map(val=>{
       return {
            name: val,
            data: orderData.data.map(item=>item[val]),
            type: "line",
       }
    });
    const orderEchart = echarts.init(proxy.$refs['orderEchart']);
    orderEchart.setOption(xOptions);

    // 柱状图
    xOptions.xAxis.data = userData.map(item=>(item.date));
    xOptions.series = [
        {
            name: "新增用户",
            data: userData.map(item=>(item.new)),
            type: "bar"
        },
        {
            name:"活跃用户",
            data: userData.map(item=>(item.active)),
            type: "bar"
        }
    ]
    const userEchart = echarts.init(proxy.$refs['userEchart']);
    userEchart.setOption(xOptions);

    // 饼状图
    pipOptions.series = {
        type:'pie',
        data: videoData
    }
    const videoEchart = echarts.init(proxy.$refs['videoEchart']);
    videoEchart.setOption(pipOptions);
}

const xOptions = reactive({
    textStyle: {
        color: "#333"
    },
    legend: {},
    grid: {
        left: "20%",
    },
    tooltip: {
        trigger: "axis",
    },
    xAxis: {
        type: 'category',
        data: [],
        axisLine: {
            // symbol: 'arrow',
            lineStyle: {
                color: '#17b3a3'
                // ...
            }
        },
        axisLabel: {
            interval: 0,
            coloe: "#333",
        }
    },
    yAxis: [
        {
            type: "value",
            axisLine: {
                lineStyle: {
                    color: "17b3a3"
                }
            }
        }
    ],
    color: ["#2ec7c9","#b6a2de","#5ab1ef","#ffb980","#d87a80","#8d98b3"],
    series: [
    ]
})
const pipOptions = reactive({
    tooltip:{
        trigger:"item",
    },
    legend:{},
    color:[
        "#0f78f4",
        "#dd536b",
        "#9462e5",
        "#a6a6a6",
        "#e1bb22",
        "#39c362",
        "#3ed1cf",
    ],

    series: [
    ]
})

onMounted(()=>{
    getTableData();
    getCountData();
    getChartData();
})

// import axios from 'axios'; //直接引用写法
// axios({
//     url:'/api/home/getTableData',
//     method:'get'
// }).then(res=>{
//     console.log(res.data);
//     if (res.data.code === 200) {
//         tableData.value = res.data.data.tableData;
//     }
//     //拦截请求工具mockjs
// })
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
                <div class="count">
                    <el-card 
                    :body-style="{display:'flex',padding: '0px',flexDirection: 'row',flexWrap: 'nowrap',alignItems: center,padding:0}"
                    v-for="item,key in countData"
                    :key="key"
                    class="count-card"
                    >   
                        <div class="icons" :style="{background:item.color}">
                            <component :is="item.icon" class="icon" :style="{background:item.color}"></component>
                        </div>
                        
                        <div class="detail" >
                            <p class="money">￥ {{ item.value }}</p>
                            <p class="name">{{ item.name }}</p>
                        </div>
                    </el-card>
                </div>
                <el-card class="zxChart">
                    <div ref="orderEchart" style="height: 280px;width: 100%;"></div>
                </el-card>
                <div class="graph">
                    <el-card >
                        <div ref="userEchart" style="height: 240px;"></div>
                    </el-card>
                    <el-card>
                        <div ref="videoEchart" style="height: 240px;"></div>
                    </el-card>
                </div>
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

        .count {
            display: flex;
            flex-wrap: wrap;
            justify-content:space-between;
            .count-card {
                width: 32%;
                margin-bottom: 20px;
                // height: 50px;
                .icons {
                    width: 80px;
                    // height: 80px;
                    font-size: 30px;
                    text-align: center;
                    line-height: 80px;
                    color: #fff;
                    .icon {
                        width: 30px;
                        height: 30px;
                    }
                }
                .detail {
                    display: flex;
                    flex-direction: column;
                    flex-wrap: nowrap;
                    justify-content: space-evenly;
                    padding-left: 10px;
                    .money {
                        font-size: 30px;
                    }
                    .name {
                        font-size: 14px;
                        color: #aaa;
                    }
                }
            }
        }

        .graph {
            display: flex;
            flex-direction: row;
            flex-wrap: nowrap;
            // justify-content: space-between;
            margin-top: 20px;
            .el-card {
                width: 50%;
            }
            .el-card:first-child {
                margin-right: 20px;
            }
        }
    }
    
</style>
