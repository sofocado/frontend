<template>
  <div>
    <a-page-header title="Tables"></a-page-header>
    <div style="display: flex; fles-direction: row">
      <a-modal
        v-model:visible="modalVisible"
        title="Edit"
        style="height: 60vh; border-radius: 10px; width: 60em"
        :footer="null"
      >
        <div>
          <a-table
            :columns="columns"
            :data-source="data"
            :pagination="true"
            class="table"
            style="height: 60vh; overflow-y: scroll"
          >
            <template #bodyCell="{ column, index, record }">
              <template v-if="column.type == 'index'">
                <span>{{ index + 1 }}</span>
              </template>
              <template v-if="column.type == 'action'">
                <a-button danger @click="deleteTable(record.tableId)"
                  >Delete</a-button
                >
              </template>
              <template v-if="column.type == 'qrcode'">
                <div>
                  <qrcode-vue :value="qrValue+'&tableId='+record.tableId+'&rid='+info.rid" :size="80"  ></qrcode-vue>
                </div>
              </template>
            </template>
          </a-table>
          <a-button danger @click="deleteTabl(tid)">Delete All</a-button>
        </div>
      </a-modal>
      <div class="card">
        <h2>You have:</h2>
        <a-row
          justify="center"
          class="row-wrapper"
          style="display: flex; flex-wrap: wrap"
        >
          <a-col
            v-for="item in dataList"
            :key="item.name"
            :span="7"
            :offset="1"
            style="color: black; font-size: 15px"
          >
            <div v-if="item.type == 1" :key="0">
              <div class="buttona" @click="tablesList(item)">
                <img src="../images/1people.png" alt="" /> <br />
                {{ item.tableCount }} tables
              </div>
            </div>
            <div v-if="item.type == 2" :key="0">
              <div class="buttona" @click="tablesList(item)">
                <img src="../images/2people.png" alt="" /> <br />
                {{ item.tableCount }} tables
              </div>
            </div>
            <div v-if="item.type == 3" :key="0">
              <div class="buttona" @click="tablesList(item)">
                <img src="../images/3people.png" alt="" /> <br />
                {{ item.tableCount }} tables
              </div>
            </div>
            <div v-if="item.type == 4" :key="0">
              <div class="buttona" @click="tablesList(item)">
                <img src="../images/4people.png" alt="" /> <br />
                {{ item.tableCount }} tables
              </div>
            </div>
            <div v-if="item.type == 5" :key="0">
              <div class="buttona" @click="tablesList(item)">
                <img src="../images/5people.png" alt="" /> <br />
                {{ item.tableCount }} tables
              </div>
            </div>
            <div v-if="item.type == 6" :key="0">
              <div class="buttona" @click="tablesList(item)">
                <img src="../images/6people.png" alt="" /> <br />
                {{ item.tableCount }} tables
              </div>
            </div>
            <div v-if="item.type == 7" :key="0">
              <div class="buttona" @click="tablesList(item)">
                <img src="../images/7people.png" alt="" /> <br />
                {{ item.tableCount }} tables
              </div>
            </div>
            <div v-if="item.type == 8" :key="0">
              <div class="buttona" @click="tablesList(item)">
                <img src="../images/8people.png" alt="" /> <br />
                {{ item.tableCount }} tables
              </div>
            </div>
            <div v-if="item.type == 9" :key="0">
              <div class="buttona" @click="tablesList(item)">
                <img src="../images/9people.png" alt="" /> <br />
                {{ item.tableCount }} tables
              </div>
            </div>
            <div v-if="item.type == 10" :key="0">
              <div class="buttona" @click="tablesList(item)">
                <img src="../images/10people.png" alt="" /> <br />
                {{ item.tableCount }} tables
              </div>
            </div>
          </a-col>
        </a-row>
      </div>
      <div class="add">
        <h2>Add new Table:</h2>
        <div
          style="
            display: flex;
            flex-direction: row;
            justify-content: space-between;
          "
        >
          <label style="color: black">Type: </label>
          <a-input-number id="inputNumber" v-model:value="info.type" :min="1" />
        </div>

        <br />
        <br />
        <div
          style="
            display: flex;
            flex-direction: row;
            justify-content: space-between;
          "
        >
          <label style="color: black">Table Count: </label>
          <a-input-number
            id="inputNumber"
            v-model:value="info.tableCount"
            :min="1"
          />
        </div>
        <br />
        <br />
        <a-button class="button" @click="tableAdd()">Add</a-button>
      </div>
    </div>
  </div>
</template>

<script>
import { TableApi } from "@/api/table";
import { message } from "ant-design-vue";
import QrcodeVue from 'qrcode.vue';

export default {
  components: {
    QrcodeVue
  },
  data() {
    return {
      modalVisible: false,
      dataList: [],
      data: [],
      tid: "",
      info: {
        type: 0,
        tableCount: 0,
        rid: localStorage.getItem("rid"),
      },
       qrValue: 'https://localhost:2002/' 
    };
  },
  mounted() {
    this.loadData();
    this.setColumns();
  },
  methods: {
    tableAdd() {
      TableApi("add", this.info)
        .then((res) => {
          if (res.result_code === 0) {
            this.info.type = 0;
            this.info.tableCount = 0;
            this.loadData();
          } else {
            console.log("Error");
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },
    loadData() {
      const rid = localStorage.getItem("rid");
      TableApi("list", { rid }).then((res) => {
        if (res.result_code === 0) {
          this.dataList = JSON.parse(JSON.stringify(res.data.rows));
        }
      });
    },
    deleteTable(value) {
      const tid = "";
      const tableId = value;
      TableApi("delete", { tableId, tid }).then((res) => {
        if (res.result_code === 0) {
          this.loadData();
          message.success("Table deleted");
          this.modalVisible = false;
        }
      });
    },
    deleteTabl(value) {
      const tid = value;
      const tableId = "";
      TableApi("delete", { tableId, tid }).then((res) => {
        if (res.result_code === 0) {
          this.loadData();
          message.success("Table type deleted");
          this.modalVisible = false;
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
          fixed: "left",
        },
        {
          title: "Table Code",
          dataIndex: "tableCode",
          key: "tableCode",
        },
          {
          title: "QR Code",
          dataIndex: "qrcode",
          key: "qrcode",
          type: "qrcode",
          width: "70px",
        },
        {
          title: "Action",
          dataIndex: "action",
          key: "action",
          type: "action",
          width: "70px",
        },

      ];
    },
    tablesList(value) {
      this.modalVisible = true;
      this.data = value.tables;
      this.tid = value.tid;
    },
    handleCancel() {
      this.modalVisible = false;
    },
  },
};
</script>


<style scoped>
.card {
  align-content: center;
  padding: 2vw;
  border-radius: 20px;
  border: 1px solid rgb(221, 127, 48);
  width: 40vw;
  background-color: white;
}
.inner {
  margin-bottom: 3vh;
}
.add {
  padding: 2vw;
  border-radius: 20px;
  border: 1px solid rgb(221, 127, 48);
  width: 30vw;
  margin-left: 2vw;
  background-color: white;
}
.button {
  width: 100px;
  background-color: rgb(221, 127, 48);
  border-radius: 20px;
}
.button:hover {
  background-color: rgb(0, 0, 0);
  color: white;
  border: 1px solid black;
}
.buttona {
  height: 100%;
  width: fit-content;
  padding: 1em;
  border-radius: 10px;
  text-align: center;
}
.buttona:hover {
  background-color: #f8e5d5;
}
h2 {
  font-size: 18px;
}
</style>