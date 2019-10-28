/**
 * @Description: 选择输入框
 * @author liuwenhua@tianli.com
 * @date 2019-08-02
*/
<template>
    <div class="select-input__wrapper">
        <input
                readonly="readonly"
                v-model="labelModel"
                :placeholder="placeholder"
                @click="isOpened = !isOpened"/>
        <img
                class="img-icon"
                :class="{'trans-icon': isOpened}"
                src="../../assets/images/store-franchise/input-icon.png"
                 @click="isOpened = !isOpened"/>
        <ul class="ul" v-show="isOpened">
            <li v-for="(ele, $index) in labelList"
                :key="$index"
                @click="handleSelect(ele,$index)"
                :class="{'active': ele._checked}">
                {{ele[propsParam.label]}}
            </li>
        </ul>
    </div>
</template>

<script>
export default {
    name: "SelectInput",
    props: {
        // 接收绑定参数
        value: [Number, String],
        // 设置绑定参数
        model: {
            prop: 'value',
            event: 'selected'
        },
        // 传递数组
        data: {
            type: [Array, Object],
            default: () => []
        },
        // 自定义字段
        propsParam: {
            type: [Object],
            default: () => {
                return {
                    value: 'id',
                    label: 'name'
                }
            }
        },
        placeholder: {
            type: String,
            default: '请选择'
        }
    },
    data () {
        return {
            isOpened: false,
            index: -1, // 选中值
            // 输入框显示值
            labelModel: '',
            // 实际请求传值
            valueModel: null,
            labelList: []
        }
    },

    watch: {
        data: {
            handler: function (val) {
                if (Array.isArray(val)) {
                    this.labelList  = JSON.parse(JSON.stringify(val))
                } else {
                    this.labelList = [{...val}]
                }
                this.labelList.forEach((ele, index) => {
                    this.$set(ele, '_checked', false)
                    ele.index = index
                })
            },
            deep: true,
            immediate: true
        },
        value: {
            handler: function (val) {
                this.valueModel = val
                val && this.pickValue(val)
            },
            immediate: true
        },
        valueModel (val) {
            this.$emit('selected', val)
            val && this.pickValue(val)
            !val && (this.labelModel = null)
        }
    },

    mounted () {
        // this.value && this
    },

    methods: {
        // 匹配值
        pickValue (val) {
            const obj = this.labelList.find(ele => ele[this.propsParam.value] == val)
            obj &&
            (this.labelModel = obj[this.propsParam.label]) &&
            (this.index = obj.index) &&
            (this.$set(obj, '_checked', true))
        },
        // 选中数据
        handleSelect (val, $index) {
            if (this.index != $index) {
                this.labelList[this.index] && (this.$set(this.labelList[this.index], '_checked', false))
            }
            this.$set(val, '_checked', !val._checked)
            val._checked ?
                ((this.valueModel = val[this.propsParam.value]) && (this.isOpened = false)) :
                (this.valueModel = null)
        }
    }
}
</script>

<style lang="scss" scoped>
    .select-input__wrapper {
        height: 0.25rem;
        position: relative;
        background: rgba(255,255,255,1);
        border: 1px solid #ffffff;
        border-radius: 0.02rem;
        font-size: 0.14rem;
        input {
            padding: 0 0.1rem;
            width: 100%;
            height: 100%;
            box-sizing: border-box;
            border: none;
        }
        .img-icon {
            position: absolute;
            right: 0.1rem;
            top: 0.1rem;
            width: 0.1rem;
        }
        .trans-icon {
            transform: rotate(180deg);
        }
        ul {
            position: relative;
            padding: 0.1rem;
            margin-top: 0.1rem;
            background-color: #ffffff;
            border: 1px solid #ffffff;
            border-radius: 0.02rem;
            z-index: 22;
            li {
                height: 0.25rem;
                border-bottom: 1px solid #6A4825;
            }
        }
        .active {
           color: rgb(25, 137, 250);
        }
    }
</style>
