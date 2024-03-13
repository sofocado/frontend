<template>
  <a-table :dataSource="dataList" :columns="columns">
    <template #bodyCell="{ column, record }">
      <template v-if="column.dataIndex === 'actions'">
        <a-popconfirm
          v-if="dataList.length"
          title="Sure to delete?"
          @confirm="onDelete(record.itemName)"
        >
          <a>Delete</a>
        </a-popconfirm>
      </template>
    </template>
  </a-table>
</template>

<script>
import { MenuApi } from "@/api/menu";

const columns = [
  {
    title: "Item name",
    dataIndex: "itemName",
    key: "itemName",
  },
  {
    title: "Description",
    dataIndex: "description",
    key: "description",
  },
  {
    title: "Price",
    dataIndex: "price",
    key: "price",
  },
  {
    title: "Price with discount",
    dataIndex: "disPrice",
    key: "disPrice",
  },
  {
    title: "Actions",
    dataIndex: "actions",
    key: "actions",
  },
];

export default {
  data() {
    return {
      columns,
      dataList: [],
    };
  },

  mounted() {
    this.loadData();
  },
  methods: {
    loadData() {
      MenuApi("list", {}, "GET")
        .then((res) => {
          this.dataList = JSON.parse(JSON.stringify(res.data));
        })
        .catch((error) => {
          console.log(error);
        });
    },
    onDelete(key) {
      console.log(key);
       MenuApi("delete", {key})
        .then(() => {
          this.loadData();
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
};
</script>