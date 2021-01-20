<template>
  <div class="editor" @dragover.stop="onDragover" @drop.stop="onDrop">
    <div
      class="editor-2w"
      ref="editor-2w"
      @mousedown.stop="onMousedown"
      @mousemove.stop="onMousemove"
      @mouseup.stop="onMouseup"
      :style="{
        left: editorCurPosition.left + 'px',
        top: editorCurPosition.top + 'px',
        transform: `translate(${translate.x}px, ${translate.y}px)`,
      }"
    >
      <!-- <div class="table-boxx">22</div> -->
    </div>
  </div>
</template>

<script>
import createAPI from "./createAPI";

export default {
  data() {
    return {
      isMove: false,
      editorCurPosition: {
        left: -10000,
        top: -10000,
      },
      editorTempPosition: {
        pageX: 0,
        pageY: 0,
      },
      translate: {
        x: 0,
        y: 0,
      },
    };
  },
  methods: {
    onDragover(ev) {
      ev.preventDefault();
    },
    onDrop(ev) {
      ev.preventDefault();
      const table = ev.dataTransfer.getData("Text");

      if (table) {
        try {
          const data = JSON.parse(table);
          const startLeft = 10000 - 390 + ev.pageX;
          const startTop = 10000 - 50 + ev.pageY;
          import("./TableBox").then((res) => {
            createAPI(
              res.default,
              {
                startLeft,
                startTop,
                tableData: data,
              },
              this.$refs["editor-2w"]
            );
          });
        } catch (error) {
          console.log(error);
        }
      }
    },
    // 挪动画布逻辑开始
    onMousedown(e) {
      if (e.target != this.$refs["editor-2w"]) return false;
      if (this.isMove) return;

      this.isMove = true;
      this.editorTempPosition = {
        pageX: e.pageX,
        pageY: e.pageY,
      };
    },
    onMousemove(e) {
      if (!this.isMove) return;

      this.translate = {
        x: e.pageX - this.editorTempPosition.pageX,
        y: e.pageY - this.editorTempPosition.pageY,
      };
    },
    onMouseup(e) {
      if (!this.isMove) return;
      this.isMove = false;
      const { left, top } = this.editorCurPosition;
      this.translate = {
        x: 0,
        y: 0,
      };
      this.editorCurPosition = {
        left: left + e.pageX - this.editorTempPosition.pageX,
        top: top + e.pageY - this.editorTempPosition.pageY,
      };
    },
    // 挪动画布逻辑结束
  },
};
</script>


<style lang="scss" scoped>
.editor {
  width: 100%;
  height: 100%;
  position: relative;
  overflow: hidden;
  .editor-2w {
    width: 20000px;
    height: 20000px;
    position: absolute;
    z-index: 1;
    cursor: move;
    background-color: #fff;
  }
}

</style>