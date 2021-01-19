<template>
  <div class="x-app full">
    <div class="x-app-toll-box">
      <button :disabled="!canUndo" @click="onUndo">undo</button>
      <button @click="onRedo" :disabled="!canRedo">redo</button>
      <button @click="onCenter">center</button>
    </div>
    <div id="refStencil" class="x-app-stencil" ref="refStencil"></div>
    <div :id="container" :ref="container" class="x-app-content"></div>
  </div>
</template>

<script>
import { Graph, Addon, Shape } from "@antv/x6";
import tableBox from "@/lib/x6/shape/items/table-box";
import columnItem from "@/lib/x6/shape/items/column-item";
columnItem(Graph);
tableBox(Graph);
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
      stencil: null,
      stencilContainer: null,
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
      container: this.$refs[this.container],
      grid: true,
      snapline: {
        enabled: true,
        sharp: true,
      },
      scroller: {
        enabled: true,
        pageVisible: false,
        pageBreak: false,
        pannable: true,
      },
      history: {
        enabled: true,
      },
      // resizing: {
      //   enabled: false,
      //   minWidth: 220,
      //   minHeight: 0,
      //   maxWidth: 420,
      //   maxHeight: 520,
    
      // },
    });

    // 新建左边的
    const stencil = new Stencil({
      title: "Components",
      target: this.graph,
      search: true,
      collapsable: true,
      stencilGraphWidth: 200,
      stencilGraphHeight: 180,
      groups: [
        {
          name: "kafka",
          title: "kafka",
        },
        {
          name: "mysql",
          title: "mysql",
          collapsable: true,
        },
      ],
      getDropNode: (draggingNode, options) => {
        // const graph = this.graph;
        return draggingNode.clone();
      },
    });

    this.$refs["refStencil"].appendChild(stencil.container);
    // 添加一些模板节点。
    const r = new Rect({
      width: 70,
      height: 40,
      attrs: {
        rect: { fill: "#31D0C6", stroke: "#4B4A67", strokeWidth: 6 },
        text: { text: "rect", fill: "white" },
      },
    });

    const c = new Circle({
      width: 60,
      height: 60,
      attrs: {
        circle: { fill: "#FE854F", strokeWidth: 6, stroke: "#4B4A67" },
        text: { text: "ellipse", fill: "white" },
      },
    });

    const c2 = new Circle({
      width: 60,
      height: 60,
      attrs: {
        circle: { fill: "#4B4A67", "stroke-width": 6, stroke: "#FE854F" },
        text: { text: "ellipse", fill: "white" },
      },
    });

    const r2 = new Rect({
      width: 70,
      height: 40,
      attrs: {
        rect: { fill: "#4B4A67", stroke: "#31D0C6", strokeWidth: 6 },
        text: { text: "rect", fill: "white" },
      },
    });

    const r3 = new Rect({
      width: 70,
      height: 40,
      attrs: {
        rect: { fill: "#31D0C6", stroke: "#4B4A67", strokeWidth: 6 },
        text: { text: "rect", fill: "white" },
      },
    });

    const c3 = new Circle({
      width: 60,
      height: 60,
      attrs: {
        circle: { fill: "#FE854F", strokeWidth: 6, stroke: "#4B4A67" },
        text: { text: "ellipse", fill: "white" },
      },
    });
    // 将模板节点添加到指定的群组中。
    stencil.load([r, c, c2, r2.clone()], "kafka");
    stencil.load([c2.clone(), r2, r3, c3], "mysql");
    this.history = this.graph.history;
    this.graph.lockScroller();
    this.graph.addNode(this.createTableBoxNode("表名称啊 啊啊啊aa"));

    this.graph.history.on("change", (args) => {
      this.canUndo = this.graph.history.canUndo();
      this.canRedo = this.graph.history.canRedo();
    });

    this.graph.on("node:add", (args) => {
      // 监听点击事件
      console.log(args);
    });

        this.graph.on("node:mousewheel", (args) => {
      // 监听点击事件
      console.log(args);
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