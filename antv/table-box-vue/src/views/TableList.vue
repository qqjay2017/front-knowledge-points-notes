<template>
  <div class="table">
    <div class="stencil">
      <div class="stencil-title">表列表</div>
      <div class="stencil-search">
        <el-input size="mini" />
      </div>
      <div class="stencil-content">
        <div v-for="table in tableList" :key="table.uuid" class="column"
        draggable="true"
        @dragstart="(e)=>onDragstart(e,table)"
        
        >
          {{ table.name }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    tableList: {
      type: Array,
      default: () => [],
    },
  },
  methods:{
      onDragstart(ev,table){
          
          ev.dataTransfer.setData("Text",JSON.stringify(table));
      }
  }
};
</script>

<style lang="scss" scoped>
*,
:after,
:before {
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
}
.table {
    position: relative;
    z-index: 99;
  width: 100%;
  height: 100%;
  .stencil {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    color: #333;
    background: #f5f5f5;
    .stencil-title {
      background: #e9e9e9;
      position: relative;
      left: 0;
      box-sizing: border-box;
      width: 100%;
      height: 32px;
      padding: 0 5px 0 8px;
      color: #666;
      font-weight: 700;
      font-size: 12px;
      line-height: 32px;
    }
    .stencil-search {
      margin: 10px;
    }
    .stencil-content {
      top: 80px;
      position: absolute;
      bottom: 0;
      left: 10px;
      right: 10px;
      height: auto;
      overflow-x: hidden;
      overflow-y: auto;
    }
  }

  .column {
    width: 100%;
    height: 28px;
    border: 1px solid #ccc;
    background-color: #4b4a67;
    color: #fff;
    margin-bottom: 3px;
    font-size: 14px;
    line-height: 28px;
    text-align: center;
    user-select: none;
    cursor: move;
    font-weight: 700;
  }
}
</style>