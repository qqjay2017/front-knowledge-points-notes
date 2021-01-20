<template>
  <div
    class="table-box"
    draggable="false"
    :style="{ left: curPoint.left + 'px', 
    top: curPoint.top + 'px' ,
     transform: `translate(${translate.x}px, ${translate.y}px)`
    }"
  >
    <div
      class="title"
      @mousedown="onMousedown"
      @mousemove="onMousemove"
      @mouseup="onMouseup"
    >
      {{ model.name }}
    </div>
    <div class="tool"></div>
    <div class="columns">
      <div>
        <div
          class="column-item"
          v-for="i in columns"
          :key="`${i.id}-${i.name}`"
          draggable="true"
          @dragstart="(e) => onDragstart(e, i)"
          @dragover="onDragover"
          @drop="onDrop"
        >
          {{ i.name }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    startLeft: {
      type: Number,
      default: 10000,
    },
    startTop: {
      type: Number,
      default: 10000,
    },
    tableData: {},
  },
  data() {
    return {
      curPoint: {
        left: 10000,
        top: 10000,
      },
      tempPoint: {
        pageX: 0,
        pageY: 0,
      },
      translate: {
        x: 0,
        y: 0,
      },
      model: {
        name: "",
        uuid: "",
      },
      columns: [],
      isMove: false,
    };
  },
  methods: {
    onDragstart(e, item) {
      e.dataTransfer.setData(
        "Column",
        JSON.stringify({
          table: this.model,
          column: item,
        })
      );
    },
    onDragover(ev) {
      ev.preventDefault();
    },
    onDrop(ev) {
      ev.preventDefault();
      const column = ev.dataTransfer.getData("Column");

      try {
        const columnData = JSON.parse(column);
        // 拖进来的数据
        console.log(columnData);
        // 目前的数据
        console.log(this.model);
      } catch (error) {
        console.log(error);
      }
    },
    // 移动盒子开始
    onMousedown(e) {
      if (this.isMove) {
        return false;
      }
      this.isMove = true;
      this.tempPoint = {
        pageX: e.pageX,
        pageY: e.pageY,
      };
      this.translate = {
        x: 0,
        y: 0,
      };
      
    },
    onMousemove(e) {
      if (!this.isMove) {
        return false;
      }
      this.translate = {
          x:e.pageX-this.tempPoint.pageX ,
          y:e.pageY-this.tempPoint.pageY,
      }
      
    },
    onMouseup(e) {
      if (!this.isMove) {
        return false;
      }
      
      const {left,top } = this.curPoint 
      this.curPoint = {
          left:left+e.pageX -this.tempPoint.pageX,
          top:top+e.pageY -this.tempPoint.pageY
      }
       this.translate = {
        x: 0,
        y: 0,
      };
      this.isMove = false;

    },
    // 移动盒子结束
  },

  created() {
    this.curPoint = {
      left: this.startLeft,
      top: this.startTop,
    };
    this.model = {
      ...this.tableData,
    };
    this.columns = [...this.tableData.columns];
  },
};
</script>

<style lang="scss" scoped>
.table-box {
  user-select: none;
  cursor: default;
  width: 220px;
  height: 306px;
  background-color: #333;
  position: absolute;

  z-index: 11;
  border-radius: 4px;
  overflow: hidden;
  .title {
    width: 100%;
    height: 36px;
    background-color: #4b4a67;
    color: #fff;
    font-size: 16px;
    line-height: 36px;
    text-align: center;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
    cursor: move;
    font-weight: 700;
    margin: 0;
  }
  .tool {
    width: 100%;
    height: 30px;
    background-color: #fff;
    border-bottom: 1px solid #777;
  }
  .columns {
    user-select: none;
    width: 100%;
    height: 240px;
    overflow-x: hidden;
    overflow-y: auto;
    &::-webkit-scrollbar {
      width: 5px;
      height: 5px;
      background-color: #fff;
    }
    &::-webkit-scrollbar-thumb {
      border-radius: 4px;
      box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
      background: rgba(0, 0, 0, 0.2);
    }

    .column-item {
      user-select: none;
      width: 100%;
      height: 24px;
      background-color: #fff;
      border-bottom: 1px solid #777;
      color: #000;
      font-size: 14px;
      line-height: 24px;
      cursor: move;
      &:hover {
        background-color: hotpink;
      }
    }
  }
}
</style>