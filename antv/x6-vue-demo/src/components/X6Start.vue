<template>
  <div>
    <button @click="onUndo">undo</button>
    <button @click="onRedo">redo</button>
    <button @click="onCenter">center</button>
    <div :id="boxId"></div>
  </div>
</template>

<script>
import Graph from "@/lib/x6/index";
import { Shape } from "@antv/x6";
import x6Factory from "@/lib/x6/register-factory";

export default {
  props: {
    boxId: {
      type: String,
      required: true,
    },
    nodes: {
      type: Array,
      default: () => [],
    },
    edges: {
      type: Array,
      default: () => [],
    },
  },
  name: "X6Start",
  data() {
    return {
      graph: null,
      history: null,
    };
  },
  methods: {
    onUndo() {
      this.history.undo();
    },
    onRedo() {
      this.history.redo();
    },
    onCenter(){
        this.graph.center()
    }
  },
  mounted() {
    this.graph = new Graph({
      container: document.getElementById(this.boxId),
      width: 800,
      height: 600,
      background: {
        color: "#fffbe6", // 设置画布背景颜色
      },
      history: {
        enabled: true,
      },
      snapline: {
        enabled: true,
      },
      scroller: {
        enabled: true,
        pannable:true,
        autoResize:true
      },
      grid: {
        size: 10, // 网格大小 10px
        visible: true, // 渲染网格背景
      },
    });
    this.history = this.graph.history;
    // 注册
    x6Factory(this.graph);
    this.graph.addNode({
      x: 60,
      y: 50,
      shape: "my-rect",
      label: "In Ports & Out Ports",
      ports: [
        {
          id: "port1",
          group: "LEFT",
        },
        {
          id: "port2",
          group: "RIGHT",
        },
      ],
    });
    this.graph.addNode({
      x: 260,
      y: 250,
      shape: "my-rect",
      label: "In Ports & Out Ports",
      ports: [
        {
          id: "port1",
          group: "LEFT",
        },
        {
          id: "port2",
          group: "RIGHT",
        },
      ],
    });
  
    this.graph.lockScroller()
  },
};
</script>