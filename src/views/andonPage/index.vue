
<template>
    <div class="page">
        <common-head title="Andon任务中心" :timeDay="fromData.timeDay" />
        <div class="table-content">
            <!-- <input v-model="valueName" v-decimal="{ type: 2, negative: true, integerNum: 7 }">
        <div @click="abc">测试001</div> -->
            <common-table ref="universal" refName="universal" :head-list="fromData.headList"
                :tableList="fromData.universalList" title='Andon任务明细'>
            </common-table>
        </div>
    </div>
</template>
  
<script setup>
import { nextTick, onMounted, onBeforeUnmount, ref } from 'vue';
import { storeToRefs } from 'pinia'
import { useStore } from '@/store'
const store = useStore();
let { cycleCount } = storeToRefs(store);
let { proxy } = getCurrentInstance()
let fromData = reactive({
    headList: [
        { key: "TriggerDate", name: "发布时间" },
        { key: "AndonType", name: "Andon类别" },
        { key: "AndonItem", name: "Andon定义" },
        { key: "FState", name: "Andon状态" },
        { key: "AreaName", name: "区域名称" },
        { key: "WorkcenterName", name: "生产单位名称" },
        { key: "WorkstationName", name: "工位名称" },
    ],
    universalListTotal: [//总数据
       
    ],
    universalList: [

    ],//显示数据
    //存储ref字段，
    //必须  总数据("存储ref字段" + ListTotal)、显示数据("存储ref字段" + List)、一屏显示数据条数("存储ref字段" + num) 
    //例子 fromData.universalListTotal 、fromData.universalList 、fromData.universalNum
    textList: ['universal'],
    universalNum: 10,
    page: 1,
    total: 0,
    timerCount: 0,
    timeDay: Date.now()

})
watch(
    () => cycleCount.value,
    async (newVal, oldVal) => {
        if (fromData.timerCount < 60) {
            console.log(fromData.timerCount)
            fromData.timerCount++
        } else {
            fromData.timerCount = 0
            if (Math.ceil(fromData.total / fromData.universalNum) > fromData.page) {
                fromData.page = fromData.page + 1
            } else {
                fromData.page = 1
                await GetAndonDetailFun()
            }
            let universalList = proxy.$utils.cloneDeep(fromData.universalListTotal)
            fromData.universalList = universalList.slice(fromData.universalNum * (fromData.page - 1), fromData.universalNum * fromData.page)
            await GetCurrentTimeFun()
        }
        fromData.timeDay = fromData.timeDay + 1000
        // console.log(`msg changed from ${oldVal} to ${newVal}`);
    },
    { deep: true }
);

const universal = ref(null)
let listRefs = reactive({})
listRefs.universal = universal
let areaTotal = (name) => {
    // 整体的高度
    try {
        let tableHeight = listRefs[name].$refs['table'].offsetHeight
        //title 整体的高度
        let titleHeight = 0
        if (listRefs[name].$refs[name + 'tableTitle']) {
            titleHeight = listRefs[name].$refs[name + 'tableTitle'].offsetHeight
        }
        //table 头的高度
        let headHeight = listRefs[name].$refs[name + 'headRow'].offsetHeight
        //table 单个行的高度
        let bodyHeight = listRefs[name].$refs[name + 'bodyRow'].offsetHeight + listRefs[name].$refs[name + 'bodyRow'].offsetTop
        //数据条数
        let num = Math.floor((tableHeight - titleHeight - headHeight) / bodyHeight)
        fromData[name + 'Num'] = num // 拼接案例 andonNum
        let dataList = proxy.$utils.cloneDeep(fromData[name + 'ListTotal']) // 拼接案例 andonListTotal
        fromData[name + 'List'] = dataList.slice(0, num) //拼接案例 andonList
    } catch (error) {
        console.log(error)
    }
}
let areaData = () => {
    fromData.textList.forEach(arr => {
        areaTotal(arr)
    })
}
let GetAndonDetailFun = async () => {
    try {
        let res = await proxy.$axios.post('api/TV/GetAndonDetail')
        if (res.data.code == 0) {
            fromData.universalListTotal = res.data.data
            fromData.total = res.data.data.length
        } else {
            return ElMessage.error(res.data.msg)
        }
    } catch (error) {
        console.log(error)
    }
}
//时间
let GetCurrentTimeFun = async () => {
    try {
        let res = await proxy.$axios.post('api/TV/GetCurrentTime')
        if (res.data.code == 0) {
            const date = new Date(res.data.data.Time)
            const timestamp = date.getTime()
            fromData.timeDay = timestamp
        } else {
            return ElMessage.error(res.data.msg)
        }
    } catch (error) {
        console.log(error)
    }
}
onMounted(() => {
    window.addEventListener('resize', areaData);
    nextTick(async () => {
        areaData()
        await GetAndonDetailFun()
        let universalList = proxy.$utils.cloneDeep(fromData.universalListTotal)
        fromData.universalList = universalList.slice(fromData.universalNum * (fromData.page - 1), fromData.universalNum * fromData.page)
        await GetCurrentTimeFun()
    })
})
onBeforeUnmount(() => {
    window.removeEventListener('resize', areaData);
})

</script>
  
<style scoped lang="scss">
.page {
    width: 100%;
    height: 100%;
    background: url('@/assets/images/common/background.png') center 0 no-repeat;
    background-size: cover;

    .table-content {
        width: 100%;
        height: calc(100% - 120px);
        padding: 0 30px;
        box-sizing: border-box;
    }
}
</style>
  