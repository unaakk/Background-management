import Mock from "mockjs"; 
import homeApi from "./mockData/home";
//自定义拦截请求模拟后台取数据
// 1 拦截路径 2 方法 3 假数据
Mock.mock(/api\/home\/getTableData/,"get",homeApi.getTableData);