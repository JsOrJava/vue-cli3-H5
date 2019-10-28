/**
 * @Description: 商品遮罩，引导
 * @author liuwenhua@tianli.com
 * @date 2019-09-20
*/
<template>
    <div class="mask__wrapper" v-if="isShow" @click="hanldeChange">
        <img  src="../../assets/images/applets-wx-shadow.png"/>
    </div>
</template>

<script>
export default {
    name: 'MaskShare',
    props: {
        isShow: {
            type: Boolean,
            default: false
        }
    },
    data () {
        return {
            // isShow: true
        }
    },

    created() {
    },

    methods: {
        hanldeChange () {
            this.$emit('update:isShow', false)
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
