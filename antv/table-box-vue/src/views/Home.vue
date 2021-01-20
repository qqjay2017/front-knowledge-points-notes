<template>
  <div class="home">
    <div class="left">
      <TableList :tableList="tableList" />
    </div>
    <div class="right">
        <EditBox />
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import TableList from "./TableList";
import EditBox from './EditBox'
export default {
  name: "Home",
  components: {
    TableList,
    EditBox
  },
  data() {
    return {
      tableList: [
        {
          uuid: "TABLE1TABLE1",
          name: "TABLE1TABLE1",
          columns: [
            {
              id: 1,
              name: "表一字段1",
            },
            {
              id: 2,
              name: "表一字段2",
            },
            {
              id: 3,
              name: "表一字段3",
            },
            {
              id: 4,
              name: "表一字段4",
            },
            {
              id: 5,
              name: "表一字段5",
            },
            {
              id: 6,
              name: "表一字段6",
            },
            {
              id: 7,
              name: "表一字段7",
            },
            {
              id: 8,
              name: "表一字段8",
            },
            {
              id: 9,
              name: "表一字段9",
            },
            {
              id: 10,
              name: "表一字段10",
            },
        {
              id: 11,
              name: "表一字段11",
            },
             {
              id: 10,
              name: "表一字段11",
            },
          ],
        },
         {
          uuid: "TABLE2TABLE2",
          name: "TABLE2TABLE2",
          columns: [
            {
              id: 1,
              name: "表二字段1",
            },
            {
              id: 2,
              name: "表二字段2",
            },
          ],
        },
      ],
    };
  },
};
</script>

<style lang="scss" scoped>
.home {
  width: 100%;
  height: 100%;
  position: relative;
  .left {
    position: absolute;
    left: 0;
    top: 0;
    width: 300px;
    height: 100%;
    bottom: 0;
  }
  .right {
    position: absolute;
    left: 300px;
    top: 0;
    height: 100%;
    bottom: 0;
    right: 0;
  }
}
</style>
