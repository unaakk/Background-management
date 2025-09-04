export default {
    getTableData: () => {
        return {
            code: 200,
            data: {
                tableData: [
                    {
                      name: 'vivo',
                      todayBuy: '11000',
                      mouthBuy: '23000',
                      totalBuy: '66666',
                    },
                    {
                      name: 'oppo',
                      todayBuy: '11111',
                      mouthBuy: '22222',
                      totalBuy: '666666',
                    },
                    {
                        name: '小米',
                        todayBuy: '11111',
                        mouthBuy: '22222',
                        totalBuy: '666666',
                    },
                ]
            }
        }
    }, 
    getCountData: () => {
        return {
            code: 200,
            data: {
                countData: [
                    {
                      name: '今日支付订单',
                      value: 1234,
                      icon: 'SuccessFilled',
                      color: '#2ec7c9',
                    },
                    {
                        name: '今日收藏订单',
                        value: 210,
                        icon: 'StarFilled',
                        color: '#ffb980',
                    },
                    {
                        name: '今日未支付订单',
                        value: 1234,
                        icon: 'GoodsFilled',
                        color: '#5abe1f',
                    },
                    {
                        name: '本月支付订单',
                        value: 1234,
                        icon: 'SuccessFilled',
                        color: '#2ce7c9',
                    },
                    {
                        name: '本月收藏订单',
                        value: 210,
                        icon: 'StarFilled',
                        color: '#ffb980',
                    },
                    {
                        name: '本月未支付订单',
                        value: 210,
                        icon: 'GoodsFilled',
                        color: '#5abe1f',
                    },
                ]
            }
        }
    },
}