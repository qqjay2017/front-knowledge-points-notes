<template>
  <div class="x-app full">
    <div class="x-app-toll-box">
      <button :disabled="!canUndo" @click="onUndo">undo</button>
      <button @click="onRedo" :disabled="!canRedo">redo</button>
      <button @click="onCenter">center</button>
    </div>

    <div ref="container" class="x-app-content"></div>
  </div>
</template>

<script>
import { Graph, Addon, Shape } from "@antv/x6";
import "@antv/x6-vue-shape";

import TableBox from "./TableBox";

const { Stencil } = Addon;
const { Rect, Circle } = Shape;
export default {
  props: {
    container: {
      type: String,
      required: true,
    },
  },
  computed: {},
  data() {
    return {
      canUndo: false,
      canRedo: false,
      graph: null,
      history: null,
      isMove: false,
    };
  },
  methods: {
    onUndo() {
      this.history.undo();
    },
    onRedo() {
      this.history.redo();
    },
    onCenter() {
      this.graph.centerContent();
    },
    createTableBoxNode(title) {
      return this.graph.createNode({
        shape: "table-box",
        width: 220,
        height: 40,
        attrs: {
          ".title": {
            fill: "#000",
            text: title,
          },
        },
      });
    },
  },
  mounted() {
    this.graph = new Graph({
      container: this.$refs["container"],
      grid: true,
      scroller: {
        enabled: true,
        pageVisible: false,
        pageBreak: false,
        pannable: true,
      },
      history: {
        enabled: true,
      },
      // interacting: {
      //   nodeMovable: false,
      // },
    });

    this.history = this.graph.history;
    this.graph.lockScroller();

    this.tableBox1 = this.graph.addNode({
      shape: "vue-shape",
      width: 220,
      height: 306,
      x: 100,
      y: 100,
      data: {
        index: 1,
      },
      attrs: {
        body: {
          width: 220,
          height: 306,
        },
      },
      component: {
        template: `<table-box :table-data="tableData" @changemovestatus="changemovestatus" ></table-box>`,
        data() {
          return {
            tableData: {
              name: "表1",
              columns: [
                {
                  id: "1",
                  name: "表1字段1",
                },
                {
                  id: "2",
                  name: "表1字段2",
                },
              ],
            },
          };
        },
        methods: {
          changemovestatus: (flag) => {
            this.isMove = flag;
          },
        },
        components: {
          TableBox,
        },
      },
    });

    this.tableBox2 = this.graph.addNode({
      shape: "vue-shape",
      width: 220,
      height: 306,
      x: 400,
      y: 400,
      data: {
        index: 2,
      },
      attrs: {
        body: {
          width: 220,
          height: 306,
        },
      },
      component: {
        template: `<table-box :table-data="tableData" @changemovestatus="changemovestatus" ></table-box>`,
        data() {
          return {
            tableData: {
              name: "表2",
              columns: [
                {
                  id: "1",
                  name: "表2字段1",
                },
                {
                  id: "2",
                  name: "表2字段2",
                },
              ],
            },
          };
        },
        methods: {
          changemovestatus: (flag) => {
            this.isMove = flag;
          },
        },
        components: {
          TableBox,
        },
      },
    });

    this.graph.history.on("change", (args) => {
      this.canUndo = this.graph.history.canUndo();
      this.canRedo = this.graph.history.canRedo();
    });

    this.graph.on("node:mousedown", (args) => {
      if (args.e.target.hasAttribute("data-rbd-draggable-id")) {
        // 取消物体移动
        args.view.setInteracting(false);
        // 取消画布平移
        this.graph.disablePanning();
      }
    });
    this.graph.on("cell:mouseup", (args) => {
      args.view.setInteracting(true);
      // // 取消画布平移
      this.graph.enablePanning();
    });

    this.graph.on("node:mouseenter", (args) => {
      if (this.isMove) {
        if (args.e.target.hasAttribute("data-rbd-draggable-id")) {
          console.log(args.e.target);

          this.graph.addEdge({
            shape: "edge",
            source: this.tableBox1,
            target: this.tableBox2,
            targetMarker: "block",
          });
        }
      }
    });
  },
};
</script>

<style lang="scss" scoped>
.x-app {
  font-family: sans-serif;
  padding: 0;
  display: flex;
  //   padding: 16px 8px;
  position: relative;
}

.x-app-stencil {
  width: 200px;
  border: 1px solid #f0f0f0;
  position: relative;
}
.x-app-content {
  flex: 1;
  height: 100%;
  margin-left: 8px;
  margin-right: 8px;
  box-shadow: 0 0 10px 1px #e9e9e9;
}
.x-app-toll-box {
  z-index: 999;
  position: absolute;
  top: 10px;
  left: 200px;
}
</style>

<style>
.x6-graph-svg-viewport {
  height: 320px;
}
</style>