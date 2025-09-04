import request from "./request";

export default {
    getTableData() {
        return request({
            url: "/home/getTable",
            method: "get",
            mock: false,//true并且mockjs拦截器不引用-使用远端数据;false&&引用mockjs拦截器-使用本地home.js创造的假数据
        })
    },
}