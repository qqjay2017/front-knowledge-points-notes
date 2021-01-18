<template>
  <div class="home full">
      <!-- <X6Start boxId="x6-start-container" :nodes="nodes" :edges="edges"  /> -->
      <X6Addon container='x6-addon' />
  </div>
</template>

<script>
import X6Start from '@/components/X6Start'
import X6Addon from '@/components/X6Addon'
export default {
  name: "Home",
  components: {
    // X6Start,
    X6Addon
  },
  data() {
    return {
      nodes: [
        {
          id: "node1", // String，可选，节点的唯一标识
          x: 40, // Number，必选，节点位置的 x 值
          y: 40, // Number，必选，节点位置的 y 值
          width: 80, // Number，可选，节点大小的 width 值
          height: 40, // Number，可选，节点大小的 height 值
          label: "hello", // String，节点标签
        },
        {
          id: "node2", // String，节点的唯一标识
          x: 160, // Number，必选，节点位置的 x 值
          y: 180, // Number，必选，节点位置的 y 值
          width: 80, // Number，可选，节点大小的 width 值
          height: 40, // Number，可选，节点大小的 height 值
          label: "world", // String，节点标签
        },
      ],
      // 边
      edges: [
        {
          source: "node1", // String，必须，起始节点 id
          target: "node2", // String，必须，目标节点 id
        },
      ],
    };
  },
};
</script>
