<template>
  <div class="about pa-6">
    <h1>BOSS刷新时间计算</h1>
    <div>
      当前时间：
      {{ dateFormat(date) }}
    </div>

    <v-row no-gutters>
      <v-col cols="1" class="pr-6">
        <v-text-field
          v-model="name"
          label="BOSS"
          outlined
          dense
          @keydown.enter.prevent="onClickOk"
        ></v-text-field>
      </v-col>
      <v-col cols="1" class="pr-6"> 将于 </v-col>
      <v-col cols="1" class="pr-6">
        <v-text-field
          v-model="hh"
          label="小时"
          outlined
          dense
          @keydown.enter.prevent="onClickOk"
        ></v-text-field>
      </v-col>
      <v-col cols="1" class="pr-6">
        <v-text-field
          v-model="mm"
          label="分钟"
          outlined
          dense
          @keydown.enter.prevent="onClickOk"
        ></v-text-field>
      </v-col>
      <v-col cols="1" class="pr-6">
        <v-text-field
          v-model="ss"
          label="秒"
          outlined
          dense
          @keydown.enter.prevent="onClickOk"
        ></v-text-field>
      </v-col>
      <v-col cols="1" class="pr-6">
        <v-btn color="primary" @click="onClickOk"> 降临 </v-btn>
      </v-col>
    </v-row>

    <v-data-table :headers="headers" :items="bosses" class="elevation-1">
      <template v-slot:item.actions="{ item }">
        <v-icon small @click="deleteItem(item)"> mdi-delete </v-icon>
      </template>
    </v-data-table>
  </div>
</template>


<script>
export default {
  data() {
    return {
      date: new Date(),
      name: "",
      hh: "",
      mm: "",
      ss: "",
      nhh: "",
      nmm: "",
      nss: "",
      headers: [
        {
          text: "BOSS名字",
          align: "start",
          sortable: false,
          value: "name",
        },
        { text: "刷新时间", value: "refreshTime" },
        { text: "删除", value: "actions", sortable: false },
      ],
      bosses: [],
      editedIndex: -1,
      editedItem: {
        name: "",
        refreshTime: "",
      },
    };
  },
  methods: {
    deleteItem(item) {
      this.editedIndex = this.bosses.indexOf(item);
      this.bosses.splice(this.editedIndex, 1);
    },
    onClickOk() {
      var date = new Date();
      var hours = date.getHours();
      var minutes = date.getMinutes();
      var seconds = date.getSeconds();
      var hh = Number(this.hh);
      var mm = Number(this.mm);
      var ss = Number(this.ss);
      var nhh = 0;
      var nmm = 0;
      var nss = 0;
      var carry = 0;
      if (ss + seconds >= 60) {
        nss = ss + seconds - 60;
        carry = 1;
      } else {
        nss = ss + seconds;
        carry = 0;
      }
      if (mm + minutes + carry >= 60) {
        nmm = mm + minutes + carry - 60;
        carry = 1;
      } else {
        nmm = mm + minutes + carry;
        carry = 0;
      }
      if (hh + hours + carry >= 24) {
        nhh = hh + hours + carry - 24;
        carry = 1;
      } else {
        nhh = hh + hours + carry;
        carry = 0;
      }
      this.nhh = nhh < 10 ? "0" + nhh : nhh;
      this.nmm = nmm < 10 ? "0" + nmm : nmm;
      this.nss = nss < 10 ? "0" + nss : nss;
      this.bosses.push({
        name: this.name,
        refreshTime: this.nhh + ":" + this.nmm + ":" + this.nss,
      });
      this.name = "";
      this.hh = "";
      this.mm = "";
      this.ss = "";
    },
    dateFormat(time) {
      var date = new Date(time);
      var year = date.getFullYear();
      /* 在日期格式中，月份是从0开始的，因此要加0
       * 使用三元表达式在小于10的前面加0，以达到格式统一  如 09:11:05
       * */
      var month =
        date.getMonth() + 1 < 10
          ? "0" + (date.getMonth() + 1)
          : date.getMonth() + 1;
      var day = date.getDate() < 10 ? "0" + date.getDate() : date.getDate();
      var hours =
        date.getHours() < 10 ? "0" + date.getHours() : date.getHours();
      var minutes =
        date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes();
      var seconds =
        date.getSeconds() < 10 ? "0" + date.getSeconds() : date.getSeconds();
      // 拼接
      return (
        year +
        "-" +
        month +
        "-" +
        day +
        " " +
        hours +
        ":" +
        minutes +
        ":" +
        seconds
      );
    },
  },
  mounted() {
    //显示当前日期时间
    let _this = this; // 声明一个变量指向Vue实例this，保证作用域一致
    this.timer = setInterval(() => {
      _this.date = new Date(); // 修改数据date
    }, 1000);
  },
  beforeDestroy() {
    if (this.timer) {
      clearInterval(this.timer); // 在Vue实例销毁前，清除我们的定时器
    }
  },
};
</script>
