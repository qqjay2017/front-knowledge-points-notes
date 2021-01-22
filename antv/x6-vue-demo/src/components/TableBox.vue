<template>
  <div class="table-box" >
    <div class="title">
      {{ tableData.name }}
    </div>
    <div class="tool"></div>
    <div class="columns">
      <div>
        <div
          class="column-item"
          v-for="i in tableData.columns"
          :key="`${i.id}-${i.name}`"
          :data-rbd-draggable-id="`${i.id}-${i.name}`"
          @mousedown="onMousedown"
        >
          {{ i.name }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { Addon } from "@antv/x6";
export default {
  name: "TableBox",
  props: {
    tableData: {},
  },
  inject: ["getGraph", "getNode"],
  data() {
    return {
      dnd: null,
    };
  },
  methods: {
    changemovestatus(flag) {
      this.$emit("changemovestatus",flag);
    },
    onMousedown(e) {
      const node = this.getGraph().createNode({
        width: 100,
        height: 40,
        attrs: {
          label: {
            text: "Rect",
            fill: "#6a6c8a",
          },
          body: {
            stroke: "#31d0c6",
            strokeWidth: 2,
          },
        },
      });
     
      this.dnd.start(node, e);
      this.changemovestatus(true)
    },
  },

  created() {},
  mounted() {
    const dnd = new Addon.Dnd({
      target: this.getGraph(),
      validateNode: (droppingNode, options) => {
        return false;
      },
      animation: false,
    });
    this.dnd = dnd;
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