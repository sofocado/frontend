<template>
  <div class="container">
    <a-page-header title="Statistic" />

    <div class="stat">
      <div class="money-container">
        <span>Income</span>
        <span>{{ totalIncome }}</span>
      </div>
      <div class="money-container">
        <span>Income</span>
        <span>1234.435</span>
      </div>
    </div>

    <a-table
      :columns="columns"
      :data-source="dataList"
      :pagination="true"
      class="table"
    >
      <template #bodyCell="{ column, index }">
        <template v-if="column.type == 'index'">
          <span>{{ index + 1 }}</span>
        </template>
        <!-- <template v-if="column.key == 'createTime'">
          <div>{{ $timeFormat(record.createTime, 1) }}</div>
        </template> -->
      </template>
    </a-table>
  </div>
</template>

<script>
import { TransactionApi } from "@/api/transaction";

export default {
  data() {
    return {
      total: 0,
      current: 1,
      pageSize: 15,
      dataList: [],
      columns: [],
      totalIncome: null,
    };
  },
  created() {
    this.setColumns();
  },
  mounted() {
    this.loadData();
  },
  methods: {
    loadData() {
      TransactionApi("list", {
        start: (this.current - 1) * this.pageSize,
        rid: "3f845b94-9b26-40c2-93d2-48cd09e7bd21",
        sort: [
          {
            key: "createTime",
            isAsc: 0,
          },
        ],
        length: this.pageSize,
      }).then((res) => {
        if (res.result_code === 0) {
          console.log(res.data);
          this.totalIncome = JSON.parse(JSON.stringify(res.data.total));
          this.dataList = JSON.parse(JSON.stringify(res.data.rows));
        }
      });
    },
    setColumns() {
      this.columns = [
        {
          title: "#",
          type: "index",
          width: "55px",
          align: "center",
        },
        {
          title: "amount",
          dataIndex: "amount",
        },
        // {
        //   title: this.$t("l_Description"),
        //   dataIndex: "description",
        // },
        {
          title: "Time",
          dataIndex: "createTime",
          customRender: ({ text }) => {
            return this.$timeFormat(text, 1);
          },
        },
        {
          title: "Action",
          key: "Action",
          width: 50,
          align: "center",
        },
      ];
    },
  },
};
</script>

<style lang="scss">
.container {
  .stat {
    display: flex;
    gap: 30px;
    .money-container {
      background-color: #ccc;
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      justify-content: flex-start;
      padding: 20px 20px;
      width: 20%;
      border-radius: 12px;
    }
  }
}
</style>
