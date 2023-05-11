<template>
    <div class="table">
        <div class="title" ref="table-title">{{ title }}</div>
        <div class="swiper-table">
            <tr class="head-row" ref="head-row">
                <th class="th-cell" v-for="(item, index) of headList" :key="index" :style="{
                    width: 100 / headList.length + '%',
                    'max-width': item.maxwidth,
                    'min-width': item.minwidth,
                }">
                    <div class="th-label">{{ item.name }}</div>
                </th>
            </tr>
            <div class="table-body">
                <div class="body-row" v-for="(row, rowIndex) of tableList.data" :key="rowIndex">
                    <div class="td-cell" ref="parent" v-for="(headItem, headIndex) of headList" :key="headIndex" :style="{
                        width: 100 / headList.length + '%',
                        'max-width': headItem.maxwidth,
                        'min-width': headItem.minwidth
                    }">
                        <slot v-if="headItem.slot" :name="headItem.slot" :scope="row"></slot>
                        <span v-else :class="[{ animate: needAnimateList['animate' + rowIndex + headIndex] }]"
                            :id="'animate' + rowIndex + headIndex"
                            :ref="(el) => getDivRef(el, 'animate' + rowIndex + headIndex)"
                            :style="AnimateWidthList['animate' + rowIndex + headIndex] ? { width: AnimateWidthList['animate' + rowIndex + headIndex] / 100 + 'rem' } : ''">{{
                                row[headItem.key]
                            }}</span>
                    </div>
                </div>
                <div class="body-row example" ref="body-row"></div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { nextTick, onMounted } from 'vue';


const props = defineProps({
    title: String,
    headList: Array,
    tableList: Object,
})
const internalInstance = getCurrentInstance()
let needAnimateList = reactive({})
let AnimateWidthList = reactive({})
let listRefs = reactive({})
let parent = ref(null)
const getDivRef = (e, index) => {
    listRefs[index] = e
}
const updateView = () => {
    needAnimateList = {};
    AnimateWidthList = {};
    props.tableList.data.forEach((arr, rowIndex) => {
        props.headList.forEach((item, index) => {
            if (listRefs['animate' + rowIndex + index]) {
                let pWidth = listRefs['animate' + rowIndex + index].scrollWidth;
                let iWidth = parent.value[index].offsetWidth;
                if (pWidth > iWidth) {
                    needAnimateList['animate' + rowIndex + index] = true;
                    AnimateWidthList['animate' + rowIndex + index] = pWidth;
                }
            }
        });
    });
    internalInstance.ctx.$forceUpdate();
};

onMounted(async () => {
    // console.log(parent.value)
    watchEffect(() => {
        updateView()
    });
    // console.log(needAnimateList,AnimateWidthList)
})
</script>

<style scoped lang="scss">
$table-head-color: rgba(255, 255, 255, 0.9);
$table-head-background-color: rgba(33, 90, 255, 0.1);
$table-body-background-color: rgba(33, 90, 255, 0.1);
$table-row-background-color: rgba(2, 22, 70, 1);
$no-data-color: rgba(255, 255, 255, 0.6);

%row {
    display: flex;
    width: 100%;
}

%cell {
    display: inline-flex;
    justify-content: center;
    align-items: center;
    color: #fff;
    font-size: 22px;
    font-weight: 500;
    overflow: hidden;
    box-sizing: border-box;
    word-break: break-all;
    vertical-align: top;
}

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

.animate {
    padding-left: .1rem;
    animation: 10s wordsLoop linear infinite normal;
}

@keyframes wordsLoop {
    0% {
        transform: translateX(0px);
        -webkit-transform: translateX(0px);
    }

    100% {
        transform: translateX(-100%);
        -webkit-transform: translateX(-100%);
    }
}

@-webkit-keyframes wordsLoop {
    0% {
        transform: translateX(0px);
        -webkit-transform: translateX(0px);
    }

    100% {
        transform: translateX(-100%);
        -webkit-transform: translateX(-100%);
    }
}
</style>
