<template>
  <div id="dashborderEdit">
    <div class="canvas" @mousemove="mousemove" @mouseup="moveReset" @mouseleave="moveReset">
      <div class="top">
        <div class="topLeft" ref="topLeftRef">

        </div>
        <div class="topLine" ref="topLineRef" @mousedown="drageTopAble=true"></div>
        <div class="topRight">

        </div>
      </div>
      <div class="bottom">
        <div class="bottomLeft" ref="bottomLeftRef"></div>
        <div class="bottomLine" ref="bottomLineRef" @mousedown="drageBottomAble=true"></div>
        <div class="bottomRight"></div>
      </div>
    </div>
  </div>
</template>

<script>

// const canvasHeight = 600;
const canvasWidth = (600 * 16) / 9;
const activeLength = 50;
export default {
  data() {
    return {
      drageTopAble: false,
      drageBottomAble: false,
      topLeft: 0,
      bootomLeft: 0,
    };
  },
  mounted() {
    this.topLeft = this.$refs.topLeftRef.offsetWidth;
    this.bootomLeft = this.$refs.bottomLeftRef.offsetWidth;
  },
  methods: {
    mousemove(e) {
      // 上方
      if (this.drageTopAble) {
        if (e.offsetX > activeLength) {
          this.drageTopAble = false;
          const ele = this.$refs.topLeftRef;
          const lineEle = this.$refs.topLineRef;
          ele.style.flex = 'none';
          ele.style.width = `${this.topLeft}px`;
          lineEle.style.left = `${this.topLeft}px`;
          // 右移
          const interval = setInterval(() => {
            // console.log(ele.style.width, lineEle.style.left);
            ele.style.width = `${Number(ele.style.width.replace('px', '')) + 10}px`;
            lineEle.style.left = `${Number(lineEle.style.left.replace('px', '')) + 10}px`;
            if (Number(ele.style.width.replace('px', '')) > canvasWidth) {
              ele.style.flex = '1';
              lineEle.style.left = '100%';
              clearInterval(interval);
            }
          }, 500);
        }
      }
    },
    moveReset() {
      this.drageTopAble = false;
      this.drageBottomAble = false;
      // console.log(this.$refs.topLineRef.left);
    },
  },
};
</script>

<style lang="scss">
$minWidth: 720px;
$canvasHeight: 600px;
$borderColor: #aaa;

#dashborderEdit {
  min-width: $minWidth;
  width: 100%;
  .canvas {
    display: flex;
    height: $canvasHeight;
    width: $canvasHeight * 16 / 9;
    background-color: #fff;
    flex-direction: column;
    margin: 50px auto;
    border: 1px solid $borderColor;
    .top,
    .bottom{
      position: relative;
    }
    .top,
    .bottom,
    .topLeft,
    .topRight,
    .bottomLeft,
    .bottomRight {
      flex: 1;
      display: flex;
    }
    .top {
      border-bottom: 1px solid $borderColor;
    }
    .topLine,.bottomLine,{
      position: absolute;
      top: 0;
      bottom: 0;
      left: 50%;
      width: 5px;
      transform: translateX(-50%);
      background-color: $borderColor;
      cursor: e-resize;
    }
  }
}
</style>
