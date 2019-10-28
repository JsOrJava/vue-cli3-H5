<template>
    <div>
        <h1 style="font-size: 16px; text-align: center;">{{ $t("message.hello") }}</h1>

        <h1 class="f-tx-center">塞芙蓉移动端活动页</h1>

        <p><a href="index.html">首页</a></p>

        <p><a href="2019-10-20.html">双十一提前购</a></p>

        <p><a href="2019-10-20-message.html">双十一提前购-短信链接</a></p>

        <p><a href="2019-11-11.html">双十一主会场</a></p>

        <p><a href="2019-11-11-assistant.html">双十一副会场</a></p>

        <p><a href="2019-11-11-message.html">双十一短信链接</a></p>

        <p><a href="face-cream.html">面霜专题</a></p>

        <p><a href="face-clean.html">面部清洁专题</a></p>

    </div>
</template>

<script>
export default {
    name: 'index',
    data () {
        return {

        }
    },

    created () {

    },

    methods: {
        /**
         * description:获取URL的参数的value
         * @name：参数名称
         */
        getUrlParam (name) {
            // 传参数之前对中文的url参数进行
            // window.location = encodeURI(encodeURI("xxx.html?title="+"中文"));
            // 接收参数的地方
            // decodeURI(GetUrlParam('title'));
            let reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i") //构造一个含有目标参数的正则表达式对象
            let r = window.location.search.substr(1).match(reg) //匹配目标参数
            if (r != null) return unescape(r[2])
            return null //返回参数值
        },
    }
}
</script>

<style lang="scss" scoped>
    @at-root p {
        padding: 10px 0;
        text-align: center;
        @include fontStyle(14px, $errorColor);
        //@extend %clearFix;
    }
</style>
