<template>
  <div class="about pa-6">
    <h1>天空封印之室解密工具</h1>
    <div>请填写3位数字，第1、2、3位数字分别代表左边、中间、右边平台人数。</div>
    <br />
    <div>破译记录：</div>
    <div v-for="record in records">{{ record }}</div>

    <div v-if="all_input.length > 0">
      共有可能组合 {{ allComibinatioons.length }} 个：<br />
      <span v-for="comb in allComibinatioons"> {{ comb }}, </span>
    </div>

    <br />

    <v-row no-gutters>
      <v-col cols="2" class="pr-4">
        <v-text-field
          v-model="input"
          label="猜测组合"
          outlined
          dense
          @keydown.enter.prevent="onClickOk"
        ></v-text-field>
      </v-col>

      <v-col cols="2" class="pr-4">
        <v-select
          v-model="correct_pos"
          :items="items"
          item-text="text"
          item-value="value"
          return-object
          dense
        >
        </v-select>
      </v-col>

      <v-col cols="1">
        <v-btn color="primary" @click="onClickOk"> 确定 </v-btn>
      </v-col>
    </v-row>
    <v-btn color="primary" @click="reset"> 重置 </v-btn>

    <br />
    <br />
    <br />
    <h1>休息室唱片</h1>
    <div>今天的唱片为:</div>
    <img :src="weekpng" />
  </div>
</template>


<script>
function getPosCorrectCount(com, answer) {
  var count = 0;
  for (var i = 0; i < 3; i++) {
    for (var j = 0; j < 3; j++) {
      if (com[i] == answer[j] && i == j) {
        count++;
      }
    }
  }
  return count;
}

function validationCheck(all_input, all_correct_pos, answer) {
  for (var i = 0; i < all_input.length; i++) {
    const posCorrectCount = getPosCorrectCount(all_input[i], answer);
    if (posCorrectCount != all_correct_pos[i]) {
      return false;
    }
  }
  return true;
}

export default {
  name: "App",
  data: () => ({
    input: "",
    correct_pos: { text: "对1个", value: "1" },
    all_input: [],
    all_correct_pos: [],
    allComibinatioons: [],
    records: [],
    items: [
      { text: "对1个", value: "1" },
      { text: "全错", value: "0" },
    ],
    timer: null,
    nowWeek: "",
    weekpng: "",
  }),
  mounted() {
    this.timer = setInterval(() => {
      this.setNowTimes();
    }, 1000);
  },
  methods: {
    reset() {
      this.$router.go();
    },
    setNowTimes() {
      //获取当前时间
      let myDate = new Date();
      let wk = myDate.getDay();
      let weeks = [
        "星期日",
        "星期一",
        "星期二",
        "星期三",
        "星期四",
        "星期五",
        "星期六",
      ];
      let week = weeks[wk];
      if (wk == 0) {
        this.weekpng = require("../assets/sunday.png");
      } else if (wk == 1) {
        this.weekpng = require("../assets/monday.png");
      } else if (wk == 2) {
        this.weekpng = require("../assets/tuesday.png");
      } else if (wk == 3) {
        this.weekpng = require("../assets/wednesday.png");
      } else if (wk == 4) {
        this.weekpng = require("../assets/thursday.png");
      } else if (wk == 5) {
        this.weekpng = require("../assets/friday.png");
      } else if (wk == 6) {
        this.weekpng = require("../assets/saturday.png");
      }
      this.nowWeek = week;
    },
    onClickOk() {
      var numInput = Number(this.input);
      if (isNaN(numInput) || this.input.length != 3) {
        alert("请输入三位数字！");
        this.input = "";
        return;
      }
      var a = Number(this.input[0]);
      var b = Number(this.input[1]);
      var c = Number(this.input[2]);
      if (a + b + c != 3) {
        alert("请输入正确的三位数字！");
        this.input = "";
        return;
      }
      this.all_input.push(this.input);
      this.all_correct_pos.push(this.correct_pos.value);
      this.allComibinatioons = [];
      debugger;
      for (var first = 0; first <= 3; first++) {
        for (var second = 0; second <= 3; second++) {
          for (var third = 0; third <= 3; third++) {
            if (first + second + third == 3) {
              var com = first.toString() + second.toString() + third.toString();

              if (validationCheck(this.all_input, this.all_correct_pos, com)) {
                this.allComibinatioons.push(com);
              }
            }
          }
        }
      }

      debugger;
      this.records.push(
        "第" +
          (this.records.length + 1) +
          "次破译：[" +
          this.input +
          "] " +
          this.correct_pos.value +
          "个平台正确\n"
      );
      this.input = "";
      this.correct_pos = { text: "对1个", value: "1" };
    },
  },
};
</script>