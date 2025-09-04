const env = import.meta.env.MODE || "prod";
//处理请求根路径，模拟 开发、测试、线上环境
// mockApi根据全局mock属性和请求中的mock属性调用
// 使用远程路径https://apifoxmock.com/m1/4068509-0-default/api/home/getTable
const EvnConfig = {
    development: {
        baseApi: "/api",
        mockApi: "https://apifoxmock.com/m1/4068509-0-default/api"
    },
    test: {
        baseApi: "//test.future.com/api",
        mockApi: "https://apifoxmock.com/m1/4068509-0-default/api"
    },
    prod: {
        baseApi: "//future.com/api",
        mockApi: "https://apifoxmock.com/m1/4068509-0-default/api"
    }
}

export default {
    env,
    ...EvnConfig[env],
    mock: false,
}