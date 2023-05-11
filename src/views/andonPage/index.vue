<template>
    <div class="page">
        <common-head title="Andon任务中心" :timeDay="timeDay" />
        <div class="table-content">
            <common-table ref="universal" :head-list="headList" :tableList="universalList" title='Andon任务明细'>
            </common-table>
        </div>
    </div>
</template>

<script>
// import { mapGetters } from 'vuex'
import areaProcessing from '../common/areaProcessing'
export default {
    name: "AndonPage",
    components: {},
    props: {},
    mixins: [areaProcessing], //列表按屏幕大小显示的计算方法
    data() {
        return {
            headList: [
                { key: "TriggerDate", name: "发布时间" },
                { key: "AndonType", name: "Andon类别" },
                { key: "AndonItem", name: "Andon定义" },
                { key: "FState", name: "Andon状态" },
                { key: "AreaName", name: "区域名称" },
                { key: "WorkcenterName", name: "生产单位名称" },
                { key: "WorkstationName", name: "工位名称" },
            ],

            universalListTotal: [ //总数据
                {
                    TriggerDate: '’发布时间',
                    AndonType: "Andon类别",
                    AndonItem: "Andon定义",
                    FState: "Andon状态",
                    AreaName: "区域名称",
                    WorkcenterName: "生产单位名称",
                    WorkstationName: "工位名称",
                },

            ],
            universalList: [], //显示数据
            universalNum: 10, // 一屏显示数据条数
            page: 1,
            total: 0,
            timerCount: 0,
            //存储ref字段，在areaProcessing文件执行 
            //必须  总数据("存储ref字段" + ListTotal)、显示数据("存储ref字段" + List)、一屏显示数据条数("存储ref字段" + num) 
            //例子 universalListTotal 、universalList 、universalNum
            textList: ['universal'],
            timeDay: Date.now(),
        };
    },
    watch: {
        // async 'cycleCount'() {
        //     if (this.timerCount < 60) {
        //         // console.log(this.timerCount)
        //         this.timerCount++
        //     } else {
        //         this.timerCount = 0
        //         if (Math.ceil(this.total / this.universalNum) > this.page) {
        //             this.page = this.page + 1
        //         } else {
        //             this.page = 1
        //             await this.GetAndonDetailFun()
        //         }
        //         let universalList = this.$utils.cloneDeep(this.universalListTotal)
        //         this.universalList = universalList.slice(this.universalNum * (this.page - 1), this.universalNum * this.page)
        //         await this.GetCurrentTimeFun()
        //     }
        //     this.timeDay = this.timeDay + 1000
        // },

    },
    computed: {
        // ...mapGetters(['cycleCount'])
    },
    methods: {
        // async GetAndonDetailFun() {
        //     try {
        //         let res = await this.$axios.post('api/TV/GetAndonDetail')
        //         console.log(res.data)
        //         if (res.data.code == 0) {
        //             this.universalListTotal = res.data.data
        //             this.total = res.data.data.length
        //         } else {
        //             return this.$message.error(res.data.msg)
        //         }
        //     } catch (error) {
        //         console.log(error)
        //     }
        // },
        // //时间
        // async GetCurrentTimeFun() {
        //     try {
        //         let res = await this.$axios.post('api/TV/GetCurrentTime')
        //         console.log(res.data)
        //         if (res.data.code == 0) {
        //             const date = new Date(res.data.data.Time)
        //             const timestamp = date.getTime()
        //             this.timeDay = timestamp
        //         }
        //     } catch (error) {
        //         console.log(error)
        //     }
        // },
    },
    async created() {
        // await this.GetAndonDetailFun()
        // let universalList = this.$utils.cloneDeep(this.universalListTotal)
        // this.universalList = universalList.slice(this.universalNum * (this.page - 1), this.universalNum * this.page)
        // await this.GetCurrentTimeFun()
    },
    mounted() {
    },
};
</script>

<style scoped lang="scss">
.page {
    width: 100%;
    height: 100%;
    background: url('~@/assets/images/common/background.png') center 0 no-repeat;
    background-size: cover;

    .table-content {
        width: 100%;
        height: calc(100% - 120px);
        padding: 0 30px;
        box-sizing: border-box;
    }
}
</style>
