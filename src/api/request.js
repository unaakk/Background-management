import axios from "axios";
import { ElMessage } from "element-plus";
import config from "@/config/index";
// axios封装
const service = axios.create({
    baseURL: config.baseApi
});
const NETWORK_ERROR = "软件错误";
// 添加请求拦截器
service.interceptors.request.use(function (config) {
    // 在发送请求之前做些什么
    return config;
  }, function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
  });

// 添加响应拦截器 请求之后做处理
service.interceptors.response.use((res) => {
    // 2xx 范围内的状态码都会触发该函数。
    // 对响应数据做点什么
    const {code,data,msg} = res.data;
    if(code === 200) {
        return data;
    }else {
        ElMessage.error(msg || NETWORK_ERROR);
        Promise.reject(msg || NETWORK_ERROR);
    }
});

function  request(options) { 
    options.method = options.method || "get";
    // get请求参数处理
    if (options.method.toLowerCase() === "get") {
        options.params = options.data;
    }
    // mock属性控制请求根路径
    // mock开关做处理,根据每个请求参数mock来
    let isMock = config.mock;
    if (typeof options.mock !== 'undefined') {
        isMock = options.mock;
    }

    //处理正式环境禁用mock
    if (config.env === "prod") {
        service.defaults.baseURL = config.baseApi;
    } else {
        service.defaults.baseURL = isMock ? config.mockApi : config.baseApi;
    }
    return service(options);
 }

 export default request;
  