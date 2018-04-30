<template>
  <div id="dashborderEdit">
    <ul id="smIcons" ref="smIcons" class="clearfix">
      <li>烟感1</li>
      <li>井盖2</li>
      <li>门禁3</li>
      <li>监测4</li>
      <li>安防5</li>
    </ul>
    <div class="canvas">
      <ul id="dragBlocks" ref="dragBlocks" class="clearfix">
        <li>烟感这个什么玩意11</li>
        <li>井盖鬼22</li>
        <li>门禁33</li>
        <li>吼吼吼44</li>
      </ul>
    </div>
  </div>
</template>

<script>
import Sortable from 'sortablejs';

export default {
  data() {
    return {
    };
  },
  mounted() {
    this.dragFun();
  },
  methods: {
    dragFun() {
      const Icons = this.$refs.smIcons;
      const Blocks = this.$refs.dragBlocks;
      Sortable.create(Icons, {
        group: 'drags',
        animation: 150,
        store: {
          get(sortable) {
            const order = localStorage.getItem(sortable.options.group);
            return order ? order.split('|') : [];
          },
          set(sortable) {
            const order = sortable.toArray();
            localStorage.setItem(sortable.options.group, order.join('|'));
          },
        },
      });
      Sortable.create(Blocks, {
        group: 'drags',
        animation: 150,
        scroll: false,
      });
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
  .clearfix:after{clear:both;}
  #smIcons{
    position: fixed;
    bottom:10px;
    left:80px;
    width:40px;
    height:225px;
    li{
      width:40px;
      height:40px;
      text-align:center;
      line-height:40px;
      background:#aaa;
      margin-bottom:5px;
      cursor: pointer;
      overflow:hidden;
    }
  }
  .canvas {
    height: $canvasHeight;
    width: $canvasHeight * 16 / 9;
    background-color: #fff;
    margin: 30px auto;
    border: 1px solid $borderColor;
    ul{width:100%;height:600px;overflow:hidden;}
    li{
      width:49%;
      height:48%;
      border:1px solid #ccc;
      border-radius:3px;
      box-shadow: 0 0 3px 2px rgba(0,0,0,.1);
      background:rgba(6, 131, 79, 0.1);
      float:left;
      cursor: move;
    }
    li:nth-child(2),li:nth-child(4){float:right;}
    li:nth-child(3),li:nth-child(4){margin-top:2%;}
    ul,li{list-style: none;padding:0;margin:0;}
   }
}
</style>
