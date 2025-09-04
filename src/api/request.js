import axios from "axios";
import { ElMessage } from "element-plus";
// axios封装
const service = axios.create();
const NETWORK_ERROR = "软件错误";
// 添加请求拦截器
service.interceptors.request.use(function (config) {
    // 在发送请求之前做些什么
    return config;
  }, function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
  });

// 添加响应拦截器
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
    return service(options);
 }

 export default request;
  