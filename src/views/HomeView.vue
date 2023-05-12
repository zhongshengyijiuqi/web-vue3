
<template>
  <div class="page">
    <common-head title="Andon任务中心" :timeDay="timeDay" />
    <div class="table-content">
      <!-- <input v-model="valueName" v-decimal="{ type: 2, negative: true, integerNum: 7 }">
      <div @click="abc">测试001</div> -->
      <common-table ref="universal" :head-list="headList" :tableList="universalList" title='Andon任务明细'>
      </common-table>

    </div>
  </div>
</template>

<script setup>

import { storeToRefs } from 'pinia'
import { useStore } from '@/store'
const store = useStore();
let { cycleCount } = storeToRefs(store);
let { proxy } = getCurrentInstance()

let headList = reactive([
  { key: "TriggerDate", name: "发布时间" },
  { key: "AndonType", name: "Andon类别" },
  { key: "AndonItem", name: "Andon定义" },
  { key: "FState", name: "Andon状态" },
  { key: "AreaName", name: "区域名称" },
  { key: "WorkcenterName", name: "生产单位名称" },
  { key: "WorkstationName", name: "工位名称" },
])

let universalListTotal = reactive([ //总数据
  // {
  //   TriggerDate: '发布时间',
  //   AndonType: "Andon类别",
  //   AndonItem: "Andon定义",
  //   FState: "Andon状态",
  //   AreaName: "区域名称",
  //   WorkcenterName: "生产单位名称生产单位名称生产单位名称",
  //   WorkstationName: "工位名称",
  // },

])
const universalList = reactive({ data: [] }) //显示数据
let universalNum = ref(10)  // 一屏显示数据条数
let page = ref(1)
let total = ref(0)
let timerCount = ref(0)
//存储ref字段，在areaProcessing文件执行 
//必须  总数据("存储ref字段" + ListTotal)、显示数据("存储ref字段" + List)、一屏显示数据条数("存储ref字段" + num) 
//例子 universalListTotal 、universalList 、universalNum
let textList = reactive(['universal'])
let timeDay = ref(Date.now())
let valueName = ref('')

universalList.data = proxy.$utils.cloneDeep(universalListTotal)
universalList.data = universalList.data.slice(universalNum.value * (page.value - 1), universalNum.value * page.value)

watch(
  () => cycleCount.value,
  (newVal, oldVal) => {
    // console.log(`msg changed from ${oldVal} to ${newVal}`);
  },
  { deep: true }
);
let abc = () => {
  console.log(123)
  universalList.data.push({
    TriggerDate: '发布时间123发布时间123',
    AndonType: "Andon类别Andon类别",
    AndonItem: "Andon定义Andon定义",
    FState: "Andon状态",
    AreaName: "区域名称",
    WorkcenterName: "生产单位名称生产单位名称生产单位名称生产单位名称",
    WorkstationName: "工位名称",
  })
  console.log('universalList', universalList)
}
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
