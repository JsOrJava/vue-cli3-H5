import Vue from 'vue'
import App from './index.vue'

Vue.config.productionTip = false;

import VueI18n from 'vue-i18n'
Vue.use(VueI18n)
const messages = {
    zh: {
        message: {
            hello: '好好学习，天天向上！'
        }
    },
    en: {
        message: {
            hello: 'good good study, day day up!'
        }
    }
}
const i18n = new VueI18n({
    locale: 'en', // 语言标识
    messages
})

new Vue({
    render: h => h(App),
    i18n
}).$mount('#index');
