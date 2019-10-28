<template>
    <header>
      <nav @click="appBack()" v-if="isApp"></nav>
      <nav @click="h5Back()" v-else></nav>
      <span class="share" @click="appShare" v-if="hasRight"></span>
      <span class="title">{{title}}</span>
    </header>
</template>

<script>

export default {
  name: 'headers',
  props: {
    title: {
      type: String,
      default: ''
    },
    goBack: {
      type: Function,
      default: () => window.history.back()
    },
    isApp: {
      type: Boolean,
      default: true
    },
    hasRight: {
      type: Boolean,
      default: false
    },
    appShare: {
      type: Function,
      default: () => this.shareDefault()
    }
  },
  data () {
    return {

    }
  },
  methods: {
    appBack() {
        try {
            window.webkit.messageHandlers.back.postMessage('');
        } catch (err) {
            window.promotion.back();
        }
    },
    h5Back() {
      this.goBack()
    },
    shareDefault() {
      try {
        window.webkit.messageHandlers.share.postMessage('')
      } catch(err) {
        window.promotion.share()
      }
    }
  }
}
</script>
<style scoped lang="scss">
    header{
        position: relative;
        height: 50px;
        line-height: 50px;
        text-align: center;
        font-size: 17px;
        background-color: #fff;
        color: #333333;
        /*z-index: 999;*/
        nav{
            position: absolute;
            left: 15px;
            top: 20px;
            display: inline-block;
            width: 10px;
            height: 10px;
            border-bottom: 2px solid #757575;
            border-left: 2px solid #757575;
            background: transparent;
            transform: rotate(45deg);
            -webkit-transform: rotate(45deg);
        }
        span.share {
            position: absolute;
            top: 14px;
            right: 20px;
            display: inline-block;
            width: 17px;
            height: 17px;
            background: url('../../assets/images/share.png') no-repeat center;
            background-size: cover;
        }
        .title {
            display: inline-block;
            width: calc(100% - 100px);
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
        }
  }
</style>
