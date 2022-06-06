<template>
  <div class="small">
    <v-text-field
      v-model="input"
      label="商品名称"
      clearable
      solo
      @keydown.enter.prevent="fillData"
    ></v-text-field>
  
    <v-tooltip right>
      <template v-slot:activator="{ on, attrs }">
        <v-icon
          color="primary"
          dark
          v-bind="attrs"
          v-on="on"
        >
          mdi-help-circle-outline
        </v-icon>
      </template>
      <span>输入商品全名，按回车键搜索，显示过去几天内商品最低价的变化</span>
    </v-tooltip>

    <line-chart :chart-data="datacollection"></line-chart>

  </div>
</template>

<script>
  import LineChart from './LineChart.js'
import json from './price.json'


function TimeStampToString(timestamp)
{
  var date = new Date(timestamp * 1000);
  var timestring = date.toLocaleDateString().replace(/\//g, "-") + " " + date.toTimeString().substr(0, 8);
  timestring = timestring.slice(5, timestring.length - 3);
  return timestring;
}

  export default {
    props: [
      'query',
    ],
    components: {
      LineChart
    },
    data () {
      return {
        input: '',
        datacollection: {}
      }
    },
    mounted () {
      this.fillData()
    },
    methods: {
      fillData () {
        var data = []
        var label = []
        var name = this.input.trim();
        for (var i = 0; i < json.length; i++)
        {
          var item = json[i];
          if (item.name == name)
          {
            for (var j = 0; j < item.prices.length; j++)
            {
              var price = item.prices[j];
              data.push(price.price);
              label.push(TimeStampToString(price.time));
            }
          }
        }

        this.datacollection = {
          labels: label,
          datasets: [
            {
              label: this.input,
              backgroundColor: '#f87979',
              lineTension: 0,
              data: data
            }
          ]
        }
      }
    }
  }
</script>

<style>
  .small {
    max-width: 600px;
    margin:  150px auto;
  }
</style>