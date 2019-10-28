<template>
    <div class="down-load" @click="linkTo">立即下载奢社APP购买</div>
</template>

<script>
export default {
    name: 'DownLoad',
    data () {
        return {

        }
    },

    methods: {
        linkTo() {
            let ua = navigator.userAgent;
            if (ua.indexOf('Android') > -1 || ua.indexOf('Linux') > -1) {
                console.log("安卓手机")
            } else if (ua.indexOf('iPhone') > -1) {
                window.location.href = 'itms-apps://itunes.apple.com/cn/app/id1449966526' //ios
            } else {
                console.log('其他')
            }
        }
    }
}
</script>

<style lang="scss" scoped>
    .down-load {
        width: 100vw;
        height: 0.5rem;
        background: #E9CDA4;
        color: #333;
        font-size: .17rem;
        line-height: 0.5rem;
        text-align: center;
        position: fixed;
        bottom: 0;
    }
</style>
