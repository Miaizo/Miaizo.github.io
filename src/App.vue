<template>
  <v-app id="inspire">
    <v-navigation-drawer v-model="drawer" app align="center" permanent>
      <v-list-item>
        <v-list-item-content>
          <v-chip :color="color" text-color="white">
            <v-icon left> mdi-clock-outline </v-icon>
            更新时间：{{ time_passed }}前
          </v-chip>
        </v-list-item-content>
      </v-list-item>
      <v-chip color="red" text-color="white"> 6月1日起停止更新 </v-chip>
      <br />
      <br />
      <v-divider></v-divider>

      <v-list dense nav align="left">
        <v-list-item v-for="item in items" :key="item.title" :to="item.to" link>
          <v-list-item-icon>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
      <img src="./assets/3.png" />
      <br />
      <v-chip color="orange">可爱岛首富收女徒弟</v-chip>
    </v-navigation-drawer>

    <v-main>
      <keep-alive>
        <router-view></router-view>
      </keep-alive>
    </v-main>
  </v-app>
</template>

<script>
import json from "./views/data.json";

function getTime() {
  var pass_seconds = Math.trunc(Date.now() / 1000 - json.starttime);
  const pass_days = Math.trunc(pass_seconds / 86400);
  pass_seconds -= pass_days * 86400;
  const pass_hours = Math.trunc(pass_seconds / 3600);
  pass_seconds -= pass_hours * 3600;
  const pass_mins = Math.trunc(pass_seconds / 60);
  var time_passed = "";
  if (pass_days > 0) {
    time_passed += pass_days + "天";
  }
  if (pass_hours > 0) {
    time_passed += pass_hours + "小时";
  }
  if (pass_mins > 0) {
    time_passed += pass_mins + "分钟";
  }
  var color = "green";
  if (pass_days >= 1) {
    color = "red";
  } else if (pass_hours >= 12) {
    color = "orange";
  }
  return {
    time_passed: time_passed,
    color: color,
  };
}

var init = getTime();

export default {
  name: "App",
  data: () => ({
    color: init.color,
    time_passed: init.time_passed,
    drawer: true,
    items: [
      { title: "市场总览", icon: "mdi-store", to: "/overview" },
      { title: "市场搜索", icon: "mdi-magnify", to: "/search" },
      { title: "历史低价", icon: "mdi-currency-usd", to: "/chart" },
      { title: "解密游戏", icon: "mdi-numeric", to: "/puzzle" },
      { title: "中国心解密", icon: "mdi-calculator", to: "/solve" },
      { title: "天空解密", icon: "mdi-calculator", to: "/solve2" },
      { title: "家族解密", icon: "mdi-calculator", to: "/solve3" },
      { title: "使用说明", icon: "mdi-help-box", to: "/" },
    ],
  }),
  created() {
    var _this = this; //声明一个变量指向Vue实例this，保证作用域一致
    this.timer = setInterval(function () {
      var now = getTime();
      _this.color = now.color;
      _this.time_passed = now.time_passed;
    }, 1000);
  },
  beforeDestroy() {
    if (this.timer) {
      clearInterval(this.timer); // 在Vue实例销毁前，清除我们的定时器
    }
  },
};
</script>
