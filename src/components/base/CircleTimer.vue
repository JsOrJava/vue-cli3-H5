/**
 * @Description: 定时器 - 圆环记时
 * @author liuwenhua@tianli.com
 * @date 2019-10-14
*/
<template>
    <div class="circle-timer__wrapper" v-show="showCounter">
        <canvas id="myCanvas" width="60" height="60"></canvas>
    </div>
</template>

<script>
    export default {
        name: "index",
        props: {
            showCounter: {
                type: Boolean,
                default: false
            }
        },

        data () {
            return {
                countTimer: null, // 定时器
                count: 0, // 执行定时器的循环次数
                type: 1, // 任务类型
                totalTime: 100 // 总时间10s*10=100
            }
        },

        mounted () {
            this.$nextTick( () => {
                this.startCounter()
            })
        },

        beforeDestroy () {
            this.endCounter()
        },

        methods: {
            // 初始化组建，获取数据 time约定时间-s
            startCounter (time = 10) {
                this.totalTime = time * 10
                this.countInterval()
            },
            // 页面离开，清除倒计时
            endCounter () {
                this.count = 0
                clearInterval(this.countTimer)
                this.$emit('update:showCounter', false)
            },
            // 绘制动态进度
            drawCircle (step) {
                let canvas = document.getElementById('myCanvas')
                if (!canvas.getContext) {
                    this.$message.warning('您所在浏览器环境不支持canvas')
                    return false
                }
                let context = canvas.getContext("2d");
                context.lineWidth = 6
                context.strokeStyle ='#FD6A87'
                context.lineCap = 'round'
                context.beginPath()
                // 参数step 为绘制的圆环周长，从0到2为一周 。 -Math.PI / 2 将起始角设在12点钟位置 ，结束角 通过改变 step 的值确定
                context.arc(30, 30, 13, -Math.PI / 2, step * Math.PI - Math.PI / 2, false)
                context.stroke()
            },
            // 绘制一个空心
            countInterval () {
                let canvas = document.getElementById('myCanvas')
                if (!canvas.getContext) {
                    this.$message.warning('您所在浏览器环境不支持canvas')
                    return false
                }
                let ctx = canvas.getContext("2d");
                ctx.lineWidth = 6
                ctx.strokeStyle  = '#ffeaff'
                ctx.lineCap = 'round'
                ctx.beginPath()
                ctx.arc(30, 30, 12, 0, 2 * Math.PI, false)
                ctx.stroke()
                // 设置倒计时 定时器 每100毫秒执行一次，计数器count + 1, 耗时10秒绘一圈
                this.countTimer = setInterval(() => {
                    if (this.count <= this.totalTime) {
                        // 绘制彩色圆环进度条,step取值范围是0到2
                        this.drawCircle(this.count / (this.totalTime / 2))
                        this.count++
                    } else {
                        clearInterval(this.countTimer)
                        this.count = 0
                        this.$emit('update:showCounter', false)
                        this.$emit('completeCircle', true)
                    }
                }, 100)
            },
            // 暂时无用 参考 - canvas倒计时
            countdown () {
                var canvas = document.getElementById("myCanvas")
                var ctx = canvas.getContext("2d")
                var width = canvas.width
                var height = canvas.height
                var r = Math.floor((width - 50) / 2)

                var total_times = 20                          // 游戏总时间
                var cntd = total_times
                // 运行的线段
                var startAngle = -0.5 * Math.PI               // 开始角度
                var endAngle = -2.5 * Math.PI                 // 结束角度
                runCvs()
                let circle
                clearInterval(circle)
                circle = setInterval(() => {
                    runCvs()
                    //  逆时针运行，角度不断增加
                    endAngle += 2 * Math.PI / total_times
                    cntd--

                    // 刚好一个圆，停止canvas
                    if (endAngle > startAngle) {
                        clearInterval(circle)
                    }
                }, 1000)

                function runCvs() {
                    // 画边框
                    ctx.clearRect(0, 0, 580, 580) // 清除
                    ctx.beginPath()
                    ctx.arc(width / 2, height / 2, r, 0, 2 * Math.PI)   // x, y, 半径, 开始角度, 结束角度
                    ctx.strokeStyle = "#03D0FF"
                    ctx.strokeText(cntd, 200, 200, 200)
                    ctx.stroke()
                    ctx.closePath()
                    // end

                    ctx.save()  // 保存之前状态，也就是保存外部细边框
                    // 开始画粗圆弧
                    ctx.beginPath()
                    ctx.lineWidth = 18
                    ctx.arc(width / 2, height / 2, r - 9, startAngle, endAngle, true)       // true = 逆时针，所以endAngle的值肯定是比startAngle的值要小
                    ctx.strokeStyle = "#03D0FF"
                    ctx.stroke()
                    ctx.closePath()
                    // end

                    // 画跟随的圆圈 内圆
                    ctx.beginPath()
                    let x, y, r1 = 21
                    x = (r - 9) * Math.cos(endAngle) + width / 2        // 通过三角函数计算x y 坐标
                    y = (r - 9) * Math.sin(endAngle) + width / 2
                    ctx.arc(x, y, r1, 0, 2 * Math.PI)
                    ctx.fillStyle = '#87E9FF'
                    ctx.fill()
                    ctx.closePath()
                    // 外圆
                    ctx.beginPath()
                    let r2 = 35
                    ctx.arc(x, y, r2, 0, 2 * Math.PI)
                    ctx.fillStyle = 'rgba(190,243,255,0.30)'
                    ctx.fill()
                    ctx.closePath()
                    ctx.restore()
                }
            }
        }
    }
</script>

<style lang="scss" scoped>
    .circle-timer__wrapper {
        position: fixed;
        top: 400px;
        right: 0;
        background-color: transparent;
        z-index: 9999;
    }
</style>
