<template>
    <div class="bg-box">
        <div class="panel-close">
            <MinClose />
        </div>

        <div class="panel-box">
            <div class="thumbnail-div" v-for="(item, index) in fromData.panelConfig" :key="index"
                @click="activePanelFn(index, item)">
                <img :src="item.url" :class="[
                    'panel-img',
                    { 'focusUI': fromData.activePanel.type === item.type },
                ]" alt="" />
                <p>{{ item.key }}</p>
            </div>
        </div>
        <div class="panel-operate">
            <div class="panel-url">
                <el-input class="input-url" v-model="urlIp" placeholder="请输入服务器地址" @blur="handleUrlInput" clearable>
                    <template #prepend>{{ http }}</template>
                </el-input>
            </div>
            <div class="panel-account">
                <el-select v-model="SelectedAccountCode" placeholder="请选择账套" size="small" @change="changeAccount" clearable>
                    <el-option v-for="item in fromData.AccountSetList" :key="item.CODE" :label="item.NAME"
                        :value="item.CODE">
                    </el-option>
                </el-select>
            </div>
            <div class="panel-select" v-for="(item, index) in activeSelect" :key="index">
                <el-select v-model="item.selectItem" :placeholder="item.message" size="small" clearable
                    :value-key="item.value" @visible-change='getList($event, item)'>
                    <el-option v-for="listItem in item.list" :key="listItem[item.key]" :label="listItem[item.label]"
                        :value="listItem">
                    </el-option>
                </el-select>
            </div>
            <div class="panel-confirm">
                <button class="home-btn--common" :class="isComeinActive ? 'comein-active' : ''" @focus="changeComeinColor"
                    @blur="isComeinActive = false" @click="enterPanel">
                    进入面板
                </button>
            </div>
        </div>
    </div>
</template>

<script setup>
import qs from 'qs'
import { useRouter, useRoute } from 'vue-router'
// import { useStore } from '@/store'
const { proxy } = getCurrentInstance()
// const store = useStore();
const router = useRouter()
// const route = useRoute()
// store.SHOW_LOADING()
let http = ref('http://')
let storageList = (val) => {
    return proxy.$storage.get(val) || []
}
let storageItem = (val) => {
    return proxy.$storage.get(val) || {}
}

let fromData = reactive({
    activePanel: {},
    panelConfig: [
        {
            key: 'Andon任务中心', // 安灯任务看板
            path: 'andonPage', // andonPage
            type: 'andon',
            url: new URL('./images/andon.png', import.meta.url).href,
        },
        {
            key: '分拣预警看板', // 分拣预警看板
            path: 'sortWarningPage',
            type: 'sortWarning',
            url: new URL('./images/sortWarning.png', import.meta.url).href,
        },
        {
            key: '协同任务中心', // 协同任务中心
            path: 'coTaskingPage',
            type: 'coTasking',
            url: new URL('./images/coTasking.png', import.meta.url).href,
            select: [
                {
                    api: 'api/ITCHome/GetWorkshops',
                    listLabel: 'Workshop',
                    key: 'WorkshopCode',
                    value: 'WorkshopGuid',
                    label: 'WorkshopName',
                    list: reactive(storageList('WorkshopList')),
                    selectItem: reactive(storageItem('WorkshopItem')),
                    message: '请选择区域配置'
                },
            ],
        },
        {
            key: '收货区物料监控中心', // 收货区物料监控中心
            path: 'receivingMaterialPage',
            type: 'receivingMaterial',
            url: new URL('./images/receivingMaterial.png', import.meta.url).href,
        },
        {
            key: '来料检验监控中心', // 来料检验监控中心
            path: 'incomingInspectionPage',
            type: 'incomingInspection',
            url: new URL('./images/incomingInspection.png', import.meta.url).href,
        },
        {
            key: '来料监控中心', // 来料监控中心
            path: 'incomingMaterialPage',
            type: 'incomingMaterial',
            url: new URL('./images/incomingMaterial.png', import.meta.url).href,
        },
        {
            key: '物流发货仓库监控中心', // 物流发货仓库监控中心
            path: 'deliveryPage',
            type: 'delivery',
            url: new URL('./images/delivery.png', import.meta.url).href,
        },
        {
            key: '生产综合监控中心', // 生产综合监控中心
            path: 'productionCenterPage',
            type: 'productionCenter',
            query: 'NoHeatTreatment',
            url: new URL('./images/productionCenter.png', import.meta.url).href,
            select: [
                {
                    api: 'api/ITCHome/GetWorkshops',
                    listLabel: 'Workshop',
                    key: 'WorkshopCode',
                    value: 'WorkshopGuid',
                    label: 'WorkshopName',
                    list: reactive(storageList('WorkshopList')),
                    selectItem: reactive(storageItem('WorkshopItem')),
                    message: '请选择区域配置'
                },
            ],
        },
        {
            key: '生产综合监控中心(热处理)', // 生产综合监控中心(热处理)
            path: 'productionCenterPage',
            type: 'productionCenterHeat',
            query: 'heatTreatment',
            url: new URL('./images/productionCenterHeat.png', import.meta.url).href,
            select: [
                {
                    api: 'api/ITCHome/GetWorkshops',
                    listLabel: 'Workshop',
                    key: 'WorkshopCode',
                    value: 'WorkshopGuid',
                    label: 'WorkshopName',
                    list: reactive(storageList('WorkshopList')),
                    selectItem: reactive(storageItem('WorkshopItem')),
                    message: '请选择区域配置'
                },
            ],
        },
        {
            key: '设备综合监控中心', // 设备综合监控中心
            path: 'equipmentPage',
            type: 'equipment',
            url: new URL('./images/equipment.png', import.meta.url).href,
            select: [
                {
                    api: 'api/ITCHome/GetWorkshops',
                    listLabel: 'Workshop',
                    key: 'WorkshopCode',
                    value: 'WorkshopGuid',
                    label: 'WorkshopName',
                    list: reactive(storageList('WorkshopList')),
                    selectItem: reactive(storageItem('WorkshopItem')),
                    message: '请选择区域配置'
                },
                {
                    api: 'api/Andon/GetAndonMonitory',
                    listLabel: 'andon',
                    key: 'GUID',
                    value: 'GUID',
                    label: 'NAME',
                    list: reactive(storageList('andonList')),
                    selectItem: reactive(storageItem('andonItem')),
                    message: '请选择安灯监控点'
                }
            ],

            workShopSelect: true,
            andonSelect: true
        },
        {
            key: '车间检验监控中心', // 车间检验监控中心
            path: 'workshopInspectionPage',
            type: 'workshopInspection',
            url: new URL('./images/workshopInspection.png', import.meta.url).href,
            select: [
                {
                    api: 'api/ITCHome/GetWorkshops',
                    listLabel: 'Workshop',
                    key: 'WorkshopCode',
                    value: 'WorkshopGuid',
                    label: 'WorkshopName',
                    list: reactive(storageList('WorkshopList')),
                    selectItem: reactive(storageItem('WorkshopItem')),
                    message: '请选择区域配置'
                },
            ],
        },
        {
            key: '油漆任务中心', // 油漆任务中心
            path: 'paintTaskPage',
            type: 'paintTask',
            url: new URL('./images/paintTask.png', import.meta.url).href,
        },
    ],
    AccountSetList: [],
})
let activePanelIndex = ref(-1)
// 输入的服务地址
let urlIp = ref('')
let SelectedAccountCode = ref('')// 选择的账套
let SelectedWorkShop = ref('')// 选择的车间
let isComeinActive = ref(false)// 选择的车间

watch(
    () => SelectedAccountCode.value,
    (newVal, oldVal) => {
        console.log(newVal, oldVal)
        proxy.$storage.set('registerId', oldVal || newVal)

        proxy.$storage.set('AccountSetList', fromData.AccountSetList)
    },
    { deep: true }
);

let hostIp = computed(() => {
    return http.value + urlIp.value
})
let activeSelect = computed(() => {
    console.log(fromData.activePanel)
    if (fromData.activePanel && fromData.activePanel.select) return fromData.activePanel.select
    else return []
})
let getList = (visible, item) => {
    // console.log(item)
    if (visible) {
        proxy.$axios.post(item.api()).then(resData => {
            if (resData && resData.data) {
                item.list = proxy.$utils.judgeObj(resData.data) ? JSON.parse(resData.data) : resData.data
                // console.log(item.list)
                proxy.$storage.set(`${item.listLabel}List`, resData.data)
            }
        })
    }
}
let changeComeinColor = () => {
    isComeinActive.value = true
}

let changeAccount = (val) => {
    // console.log(val)
    if (activePanelIndex.value == -1) return
}
let enterPanel = () => {
    console.log(SelectedAccountCode.value)
    if (SelectedAccountCode.value === '') ElMessage.warning('请选择账套')
    if (activePanelIndex.value > -1) {
        if (activeSelect.length) {
            let checkPass = true
            for (let item of activeSelect) {
                if (Object.keys(item.selectItem).length == 0) {
                    checkPass = false
                    return ElMessage.warning(item.message)
                } else {
                    proxy.$storage.set(`${item.listLabel}Item`, item.selectItem)
                }
            }
            if (checkPass) {
                const activePathName = fromData.panelConfig[activePanelIndex.value].path;
                const parameter = fromData.panelConfig[activePanelIndex.value].query;
                router.push({
                    name: activePathName,
                    query: { parameter }
                })
            }
        } else {
            const activePathName = fromData.panelConfig[activePanelIndex.value].path;
            const parameter = fromData.panelConfig[activePanelIndex.value].query;
            router.push({
                name: activePathName,
                query: { parameter }
            })
        }
    } else {
        ElMessage.warning('请选择面板')
    }

}
// 激活当前面板
let activePanelFn = (index, item) => {
    if (fromData.activePanel.type == item.type) return false;
    fromData.activePanel = item
    activePanelIndex.value = index;
}
let handleUrlInput = async () => {
    try {
        if (urlIp.value) {
            proxy.$storage.set('url', urlIp.value);
            proxy.$storage.set('hostIp', hostIp.value + `/${proxy.$storage.get("WEBAPI_NAME")}`)
            await proxy.$axios.defaults({
                method: 'post',
                url: '/token',
                // withCredentials: false,
                data: qs.stringify({
                    'grant_type': 'password',
                    'username': 'guest',
                    'password': 'kWS/rVmF3u4='
                }),
                headers: {
                    'Access-Control-Allow-Origin': '*',
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
            }).then(async res => {
                proxy.$storage.set('Authorization', res.data.access_token)
                ElMessage.closeAll()
                // 获取帐套
                await GetAccountInfoApi()
            }).catch((error) => {
                console.log(error)
                ElMessage.error('地址不合法！')
                SelectedAccountCode.value = ''
                SelectedWorkShop.value = ''
                fromData.AccountSetList = []
            })
        }

    } catch (error) {
        console.log(error)
    }
}
// 获取账套
let GetAccountInfoApi = async () => {
    try {
        resetPanelConfig();
        let res = await proxy.$axios.post('/api/Mes/GetAccountInfo')
        if (res.status == 200) {
            fromData.AccountSetList = res.data;
            const localRegisterId = proxy.$storage.get('registerId')
            if (fromData.AccountSetList.find(item => item.CODE === localRegisterId)) {
                // console.log('找到了');
                SelectedAccountCode.value = localRegisterId
            } else {
                SelectedAccountCode.value = fromData.AccountSetList[0].CODE;
            }
        } else {
            ElMessage.error(res.data.msg)
        }
    } catch (error) {
        console.log(error)
    }
}
let resetPanelConfig = () => {
    SelectedAccountCode.value = '';
    fromData.AccountSetList = [];
    activePanelIndex.value = -1;
}
onMounted(() => {
    if (proxy.$storage.get('url')) {
        urlIp.value = proxy.$storage.get('url');
    } else {
        urlIp.value = window.location.host;
    }
    SelectedAccountCode.value = proxy.$storage.get('registerId')
    fromData.AccountSetList = proxy.$storage.get('AccountSetList') || []
    console.log(proxy.$storage.get('registerId'))
    console.log(fromData.AccountSetList)
    if (fromData.AccountSetList.length == 0) {
        console.log(123)
        proxy.$storage.set('registerId', '')
        SelectedAccountCode.value = ''
    }
})
</script>
<style lang="scss" scoped>
::v-deep .el-input-group__prepend {
    font-size: 0.2rem;
    padding: 1vh 0.1rem;
}

::v-deep .el-input-group--prepend .el-input__inner,
.el-input-group__append {
    height: 6vh;
    font-size: 0.24rem;
    // padding: 1vh 0.1rem;
}

::v-deep .el-select>.el-input {
    width: 300px;
}

::v-deep .el-select .el-input__inner {
    height: 6vh;
    padding: 1vh 0.1rem;
    font-size: 0.2rem;
}

.bg-box {
    width: 100%;
    height: 100%;
    background-color: rgb(13, 32, 82);
}

.panel-close {
    width: 100%;
    text-align: right;
    padding-top: 20px;
    padding-right: 10px;
}

.panel-box {
    display: flex;
    flex-wrap: wrap;
    width: 100%;
    padding: 0.25rem 0.01rem;
    overflow: hidden;
    flex-direction: row;
    justify-content: center;
}

.thumbnail-div {
    // display: flex;
    // align-items: center;
    // flex-direction: column;
    margin-right: 0.2rem;
    padding-bottom: 0.1rem;
    width: calc(20% - 0.2rem);

    &:nth-child(5n) {
        margin: 0;
    }

    .panel-img {
        width: 100%;
        // height: 200px;
        border: 3px solid transparent;

        &.focusUI {
            border-color: #f8cf5d; 
        }
        &.active{
            border-color: white;
        }
    }

    p {
        text-align: center;
        color: #b8bdc9;
        font-size: 16px;
        margin-top: 10px;
    }
}

.active {
    border: 3px solid rgba(56, 98, 255, 1);
}

.comein-active {
    border: 3px solid #f8cf5d;
}

.panel-operate {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: 3vh;

    //   padding-left: 3rem;
    .panel-url {
        width: 4rem;
        margin-right: 0.2rem;
    }

    .panel-account {
        // width: 4rem;
        margin-right: 0.2rem;
    }

    .panel-select {
        margin-right: 20px;
    }
}

.panel-confirm {
    .home-btn--common {
        height: 6vh;
        padding: 0 0.2rem;
        background: linear-gradient(0deg, #4589ff, #4691fe);
        border-radius: 0.05rem;
        color: #fff;
    }

    .home-btn--cancel {
        background: linear-gradient(0deg, #a7d6ff, #effbff);
        color: #75b4d5;
    }
}
</style>
  