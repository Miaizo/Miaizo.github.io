<template>
  <div class="about pa-6">
    <h1>家族副本解密工具</h1>
    <div>
      请按从左往右顺序填写4位数字，1、2、3、4分别代表卷轴、勋章、过期食物、青蛇酒
    </div>
    <v-tooltip right>
      <template v-slot:activator="{ on, attrs }">
        <v-icon color="primary" dark v-bind="attrs" v-on="on">
          mdi-help-circle-outline
        </v-icon>
      </template>
      <span>
        贡品不认识不影响解密结果，可以不需要填，如遇到解密失败，群里@剑痕反馈</span
      >
    </v-tooltip>
    <div>破译记录：</div>
    <div v-for="record in records">{{ record }}</div>

    <div v-if="all_input.length > 0">
      <br />
      共有可能组合 {{ allComibinatioons.length }} 个：<br />
      <span v-for="comb in allComibinatioons"> {{ comb }}, </span>
    </div>

    <br />

    <v-row no-gutters>
      <v-col cols="2" class="pr-6">
        <v-text-field
          v-model="input"
          label="猜测组合"
          outlined
          dense
          @keydown.enter.prevent="onClickOk"
        ></v-text-field>
      </v-col>

      <v-col cols="2" class="pr-6">
        <v-text-field
          v-model="correct_pos"
          label="贡品正确"
          outlined
          dense
          @keydown.enter.prevent="onClickOk"
        ></v-text-field>
      </v-col>
      <v-col cols="2" class="pr-6">
        <v-text-field
          v-model="correct_num"
          label="贡品不正确"
          outlined
          dense
          @keydown.enter.prevent="onClickOk"
        ></v-text-field>
      </v-col>
      <v-col cols="2" class="pr-6">
        <v-text-field
          v-model="not_correct_num"
          label="贡品不认识"
          outlined
          dense
          @keydown.enter.prevent="onClickOk"
        ></v-text-field>
      </v-col>
      <v-col cols="1" class="pr-6">
        <v-btn color="primary" @click="onClickOk"> 确定 </v-btn>
      </v-col>
    </v-row>

    <v-btn color="primary" @click="reset"> 重置 </v-btn>
  </div>
</template>

<script>
function getNumCorrectCount(com, answer) {
  var count = 0;
  var i_used = [];
  var j_used = [];
  for (var i = 0; i < 4; i++) {
    for (var j = 0; j < 4; j++) {
      if (com[i] == answer[i] || com[j] == answer[j]) {
        continue;
      }
      var flag = false;
      for (var k = 0; k < i_used.length; k++) {
        if (i_used[k] == i) {
          flag = true;
        }
      }
      for (var k = 0; k < j_used.length; k++) {
        if (j_used[k] == j) {
          flag = true;
        }
      }
      if (flag == true) {
        continue;
      }
      if (com[i] == answer[j] && i != j) {
        i_used.push(i);
        j_used.push(j);
        count++;
      }
    }
  }
  return count;
}

function getPosCorrectCount(com, answer) {
  var count = 0;
  for (var i = 0; i < 4; i++) {
    for (var j = 0; j < 4; j++) {
      if (com[i] == answer[j] && i == j) {
        count++;
      }
    }
  }
  return count;
}

function validationCheck(all_input, all_correct_num, all_correct_pos, answer) {
  for (var i = 0; i < all_input.length; i++) {
    const numCorrectCount = getNumCorrectCount(all_input[i], answer);
    const posCorrectCount = getPosCorrectCount(all_input[i], answer);
    if (
      numCorrectCount != all_correct_num[i] ||
      posCorrectCount != all_correct_pos[i]
    ) {
      return false;
    }
  }
  return true;
}

export default {
  name: "App",
  data: () => ({
    input: "",
    correct_num: "",
    correct_pos: "",
    not_correct_num: "",
    all_input: [],
    all_correct_num: [],
    all_correct_pos: [],
    allComibinatioons: [],
    records: [],
  }),
  methods: {
    reset() {
      this.$router.go();
    },
    onClickOk() {
      var numInput = Number(this.input);
      if (isNaN(numInput) || numInput < 1111 || numInput > 4444) {
        alert("请输入四位数字！");
        this.input = "";
        return;
      }
      if (this.correct_num == "") {
        this.correct_num = 0;
      }
      if (this.correct_pos == "") {
        this.correct_pos = 0;
      }
      this.all_input.push(this.input);
      this.all_correct_num.push(this.correct_num);
      this.all_correct_pos.push(this.correct_pos);
      this.allComibinatioons = [];
      for (var first = 1; first <= 4; first++) {
        for (var second = 1; second <= 4; second++) {
          for (var third = 1; third <= 4; third++) {
            for (var fourth = 1; fourth <= 4; fourth++) {
              var com =
                first.toString() +
                second.toString() +
                third.toString() +
                fourth.toString();

              if (
                validationCheck(
                  this.all_input,
                  this.all_correct_num,
                  this.all_correct_pos,
                  com
                )
              ) {
                this.allComibinatioons.push(com);
              }
            }
          }
        }
      }

      this.records.push(
        "第" +
          (this.records.length + 1) +
          "次破译：[" +
          this.input +
          "] " +
          this.correct_num +
          "个数字正确，" +
          this.correct_pos +
          "个位置正确\n"
      );
      this.input = "";
      this.correct_num = "";
      this.correct_pos = "";
      this.not_correct_num = "";
    },
  },
};
</script>