/**
 * @Description: 移动端项目 - H5页面
 * @author liuwenhua@tianli.com
 * @date 2019-08-14
*/
<template>
    <div>
        <index-content></index-content>
    </div>
</template>

<script>
import IndexContent from '@/components/Index'

export default {
    name: 'index',
    components: {
        IndexContent
    },
    data () {
        return {

        }
    }
}
</script>

<style lang="scss" scoped>
    div {
        h1 {
            font-size: 20px;
        }
        p {
            width: 100px;
        }
    }
</style>