/**
 * @Description: 商品遮罩，引导
 * @author liuwenhua@tianli.com
 * @date 2019-08-20
*/
<template>
    <div class="mask__wrapper" v-if="isShow" @click="isShow = false">
        <img  src="@/assets/images/wx_show.png"/>
    </div>
</template>

<script>
export default {
    name: 'MaskShare',
    data () {
        return {
            isShow: true
        }
    },

    created() {
        // 所在的环境是不是微信内置浏览器,
        const ua = window.navigator.userAgent.toLowerCase();
        if (ua.match(/MicroMessenger/i) == 'micromessenger') {
            this.isShow = true
        } else {
            this.isShow = false
        }
    }
}
</script>

<style lang="scss" scoped>
    .mask__wrapper {
        position: fixed;
        top: 0;
        left: 0;
        width: 100vw;
        height: 100vh;
        z-index: 9999;
        background: rgba(0, 0, 0, 0.6);
        img{
            width: 100%;
        }
    }
</style>
