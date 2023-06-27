
<!-- 模版 -->
<template>
  <div class="table" ref="universal">
    <div class="title" ref="tableTitle">{{ title }}</div>
    <div class="swiper-table">
      <tr class="head-row" ref="headRow">
        <th class="th-cell" v-for="(item, index) of fromData.headList" :key="index">
          <div class="th-label">{{ item.name }}</div>
        </th>
      </tr>
      <div class="table-body">
        <div class="body-row" v-for="(row, rowIndex) of fromData.universalList" :key="rowIndex">
          <div class="td-cell" ref="parent" v-for="(headItem, headIndex) of headList" :key="headIndex">
            <span>{{ row[headItem.key] }}</span>
          </div>
        </div>
        <div class="body-row example" ref="bodyRow"></div>
      </div>
    </div>
  </div>
</template>
<script setup>
import { onMounted, onBeforeUnmount, nextTick,getCurrentInstance } from 'vue';
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
  universalList: [
    {
      TriggerDate: '发布时间',
      AndonType: "Andon类别",
      AndonItem: "Andon定义",
      FState: "Andon状态",
      AreaName: "区域名称",
      WorkcenterName: "生产单位名称生产单位名称生产单位名称",
      WorkstationName: "工位名称",
    },
    {
      TriggerDate: '发布时间',
      AndonType: "Andon类别",
      AndonItem: "Andon定义",
      FState: "Andon状态",
      AreaName: "区域名称",
      WorkcenterName: "生产单位名称生产单位名称生产单位名称",
      WorkstationName: "工位名称",
    },
  ],
  textList: ['universal'],
  universalNum: 10,
  page: 1,
  total: 0,

})
let areaTotal = (name) => {
  // 整体的高度
  try {
    // 整体的高度
    let tableHeight = this.$refs[name].$el.offsetHeight
    //title 整体的高度
    let titleHeight = 0
    if (this.$refs[name].$refs['table-title']) {
      titleHeight = this.$refs[name].$refs['table-title'].offsetHeight
    }
    //table 头的高度
    let headHeight = this.$refs[name].$refs['head-row'].offsetHeight
    //table 单个行的高度
    let bodyHeight = this.$refs[name].$refs['body-row'].offsetHeight + this.$refs[name].$refs['body-row'].offsetTop
    //数据条数
    let num = Math.floor((tableHeight - titleHeight - headHeight) / bodyHeight)
    this[name + 'Num'] = num // 拼接案例 andonNum
    let dataList = this.$utils.cloneDeep(this[name + 'ListTotal']) // 拼接案例 andonListTotal
    this[name + 'List'] = dataList.slice(0, num) //拼接案例 andonList
  } catch (error) {
    console.log(error)
  }
}
let areaData = () => {
  fromData.textList.forEach(arr => {
    areaTotal(arr)
  })
}

onMounted(async () => {
  window.addEventListener('resize', areaData);
  await nextTick(() => {
    areaData()
  })
})
onBeforeUnmount(() => {
  window.removeEventListener('resize', areaData);
})
</script>
<style scoped lang="scss">
.table {
  background-color: rgba(33, 90, 255, 0.15);
  width: 100%;
  height: 100%;
  padding: 0 13px;

  .title {
    font-size: 22px;
    font-weight: bold;
    color: #d9efff;
    padding-left: 9px;
    padding-top: 20px;
    box-sizing: border-box;
  }

  .swiper-table {
    width: 100%;
    height: calc(100% - 50px);
    position: relative;

    .head-row {
      @extend %row;
      height: 84px;
      line-height: 60px;
      border-bottom: 2px solid #0576d2;
    }

    .th-cell {
      @extend %cell;
      color: $table-head-color;
      font-family: PingFang SC;
      flex-direction: column;
    }

    .th-label {
      height: 84px;
      line-height: 84px;
      text-align: center
    }

    .body-row {
      @extend %row;
      margin-top: 10px;
      height: 54px;
      line-height: 54px;

      &:nth-child(even) {
        background: $table-row-background-color;
      }
    }

    .example {
      position: absolute;
      top: 0;
      left: 0;
      z-index: -1;
      opacity: 0;
    }

    .td-cell {
      @extend %cell;
      height: 100%;

      &>span {
        white-space: nowrap;
      }
    }
  }

  .table-body {
    width: 100%;
  }
}
</style>
