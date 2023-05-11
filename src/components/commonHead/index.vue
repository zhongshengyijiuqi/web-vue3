<template>
    <div class="head-content">
        <div class="picture"></div>
        <div class="title">{{ title }}</div>
        <div class="clock">
            <span class="day">实时 / {{ currentDay }}</span>
            <div class="time-clock">
                <span>{{ hourleft }}</span>
                <span>{{ hourright }}</span>
                <span>:</span>
                <span>{{ minleft }}</span>
                <span>{{ minright }}</span>
            </div>
        </div>
    </div>
</template>

<script setup>
const props = defineProps({
    title: String,
    timeDay: Number
})
let day = ref(Date.now())
watch(
    () => props.timeDay,
    (newVal, oldVal) => {
        console.log(`msg changed from ${oldVal} to ${newVal}`);
        day.value = newVal
    },
    { deep: true }
);

let currentDay = computed(() =>{
    const now = new Date(day.value);
    const year = now.getFullYear();
    const month = now.getMonth() + 1;
    const date = now.getDate();
    return `${year}-${month}-${date}`;
}) 
let currentTime = computed(() =>{
    const now = new Date(day.value);
    const hour = now.getHours() < 10 ? '0' + now.getHours() : now.getHours();
    const minute = now.getMinutes() < 10 ? '0' + now.getMinutes() : now.getMinutes()
    return `${hour}:${minute}`;
})
let hourleft = computed(() =>{
    return currentTime.value.substr(0, 1) || 0;
})
let hourright = computed(() =>{
    return currentTime.value.substr(1, 1) || 0;
})
let minleft = computed(() =>{
    return currentTime.value.substr(3, 1) || 0;
})
let minright = computed(() =>{
    return currentTime.value.substr(4, 1) || 0;
})

</script>

<style scoped lang="scss">
.head-content {
    width: 100%;
    height: 90px;
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    padding: 0 70px;

    .picture {
        width: 30%;
    }

    .title {
        width: 40%;
        letter-spacing: 10px;
        display: inline-block;
        text-align: center;
        transform: translate(0, -50%);
        color: #fff;
        background: linear-gradient(0deg, #0a93f3 0%, #b0f7fa 100%);
        -webkit-background-clip: text;
        background-clip: text;
        -webkit-text-fill-color: transparent;
        font-weight: bold;
        font-size: 40px;
    }

    .clock {
        width: 30%;
        display: flex;
        align-items: center;
        justify-content: flex-end;

        .day {
            display: block;
            margin-right: 17px;
            font-size: 19px;
            font-weight: 500;
            color: #d9efff;
        }

        .time-clock {
            display: flex;
            align-items: center;

            span {
                font-size: 24px;
                font-weight: bold;
                color: #ffffff;
                padding-top: 5px;
                text-align: center;
                display: block;
                width: 29.4px;
                height: 35px;
                background: #0a54ea;
                border-radius: 6px;
                margin-right: 5px;

                &:nth-child(3) {
                    width: 5px;
                    background: none;
                }
            }
        }
    }


}
</style>
