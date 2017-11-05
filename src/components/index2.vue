<template>
  <!-- `checked` 为 true 或 false -->
  <div class="clearFix">
    <aside class="chooseArea">
      <ul>
        <li>
          <h3>选择产品</h3>
            <el-select v-model="value1" clearable placeholder="全部" @change="productSet" @clear="productClear" >
            <el-option
              v-for="item in obj"
              v-if="item.day>=startTime&&item.day<=endTime"
              :key="item.name"
              :label="item.name"
              :value="item.name">
            </el-option>
          </el-select>
        </li>
        <li>
          <h3>选择渠道</h3>
            <el-select v-model="value2" clearable placeholder="全部" @change="sourseSet" @clear="productClear">
                <el-option 
                  v-for="item in obj"
                  :key="item.key"
                  :label="item.key"
                  :value="item.key"
                  v-if="item.name==value1">
                </el-option>
          </el-select>
        </li>
        <li>
          <h3>选择CP</h3>
            <el-select v-model="value3" placeholder="全部" >
                <el-option
                  v-for="item in options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
           
              </el-select>
        </li>
      </ul>
      <c-box :obj='obj'>

      </c-box>
      <h4 class="dataTitle">开始日期</h4> 
      <el-date-picker @change="changeTime1"
        v-model="dataValue1"
        align="right"
        type="date"
        placeholder="选择日期"
        :picker-options="pickerOptions1">
      </el-date-picker>
      <h4 class="dataTitle">结束日期</h4> 
      <el-date-picker
      @change="changeTime2"
        v-model="dataValue2"
        align="right"
        type="date"
        placeholder="选择日期"
        :picker-options="pickerOptions2">
      </el-date-picker>
    </aside>
    <div class="dataListArea">
  
      <el-row  class="dataListTitle" style="padding:0;">
          <el-col :span="3">
              <div>日期</div>
          </el-col>
          <el-col :span="6">
              <div>产品</div>
          </el-col>
          <el-col :span="5">
              <div>渠道</div>

          </el-col>
          <el-col :span="2">
              <div>用户</div>
          </el-col>
          <el-col :span="2">
              <div>订单次数</div>
          </el-col>
            <el-col :span="2">
              <div>付费次数</div>
          </el-col>
            <el-col :span="2">
              <div>同步收入</div>
          </el-col>
      </el-row>
      <div >
        <el-row  class="dataList" style="padding:0;" v-for="item,index in obj" ref="list" v-if="item.day>=startTime&&item.day<=endTime&&value1==''|value1==item.name&&value2==''|value2==item.key">
            <el-col :span="3">
                <div>{{(firstDay+(item.day)*86400000)|formatDate('y-m-d')}}</div>
            </el-col>
            <el-col :span="6">
                <div ref="product">{{item.name}}</div>
            </el-col>
            <el-col :span="5">
                <div>{{item.key}}</div>
            </el-col>
            <el-col :span="2">
                <div v-if="item.nr.user">{{item.nr.user}}</div>
                  <div v-else>&nbsp;</div>
            </el-col>
            <el-col :span="2">
                <div></div>
            </el-col>
              <el-col :span="2">
                <div></div>
            </el-col>
              <el-col :span="2">
                <div></div>
            </el-col>
        </el-row>
        </div>
    </div>
  </div>
</template>
<script>
import CBox from '@/components/CBox.vue'
import axios from "axios";
import formatDate from "@/filters/formatDate.js";
import formatNoRepeat from "@/filters/formatNoRepeat.js";
export default {
  data() {
    return {
      options: [
        {
          value: "黄金糕",
          label: "黄金糕"
        },
        {
          value: "双皮奶",
          label: "双皮奶"
        },
        {
          value: "蚵仔煎",
          label: "蚵仔煎"
        }
      ],
      value1: "",
      value2: "",
      value3:'',
      pickerOptions1: {
        shortcuts: [
          {
            text: "今天",
            onClick(picker) {
              picker.$emit("pick", new Date());
            }
          },
          {
            text: "昨天",
            onClick(picker) {
              const date = new Date();
              date.setTime(date.getTime() - 3600 * 1000 * 24);
              picker.$emit("pick", date);
            }
          },
          {
            text: "一周前",
            onClick(picker) {
              const date = new Date();
              date.setTime(date.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit("pick", date);
            }
          }
        ]
      },
      pickerOptions2: {
        shortcuts: [
          {
            text: "今天",
            onClick(picker) {
              picker.$emit("pick", new Date());
            }
          },
          {
            text: "昨天",
            onClick(picker) {
              const date = new Date();
              date.setTime(date.getTime() - 3600 * 1000 * 24);
              picker.$emit("pick", date);
            }
          },
          {
            text: "一周前",
            onClick(picker) {
              const date = new Date();
              date.setTime(date.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit("pick", date);
            }
          }
        ]
      },
      dataValue1: "",
      dataValue2: "",
      time1: "",
      time2: "",
      result: "",//json数据
      startTime: "",
      endTime: "",
      disTime:'',
      firstDay: new Date(2017, 9, 14, 0, 0, 0).getTime(),
      productKey:[],
      sourse:[],
      sourseKey:[],
      obj:{}
    };
  },
  mounted() {
    axios.get("/goods").then(res => {
        var arr=[];
        this.result = res.data;
        this.result=this.result.reverse();
        
    });
  },
  methods: {
    changeTime1() {
      var time = new Date(this.dataValue1);
      this.time1 = time.getTime();
      this.startTime = (this.time1 - this.firstDay) / 86400000;
      
    },
    changeTime2() {
       this.sourse=[]
      var time = new Date(this.dataValue2);
      this.time2 = time.getTime();
      this.endTime = (this.time2 - this.firstDay) / 86400000;
   
      this.disTime = this.endTime-this.startTime;    
      for(var i=this.startTime;i<this.endTime;i++){
        // arr=arr.concat(this.result[i])  
         this.sourse.push(this.result[i]);
     
        for (var j in this.result[i]) {
          if(j != "_id"){
           
            this.productKey.push(j) ;
            for(var k in this.result[i][j]){
              this.sourseKey.push(k)
            }
          }
        }
      }
      var obj=[]
      for(var i=0;i<this.result.length;i++){
          for(var key in this.result[i]){
              for(var j in this.result[i][key]){
                obj.push({'name':key,'key':j,'nr':this.result[i][key][j],"day":i})   
              }   
  
        }
      }
      this.obj=obj;
      console.log(this.obj)

    // var new1 = Array.from(
    //     obj.reduce((dict, item) => {
    //         if (dict.has(item.name)) {
    //             dict.get(item.name).push(item.key)
    //         } else {
    //             dict.set(item.name, [item.key])
    //         }
    //         return dict
    //     }, new Map())
    // ).map(item => ({
    //     a: item[1],
    //     b: item[0]
    // }))
    // var element='';
    // var elements=[];
    // for(var i=0;i<new1.length;i++){
    
    //   for (var key in new1[i].a) {
    //        element = new1[i].a[key];        
    //       for(var j in element){
    //         // console.log(element[j])
    //         if(j=="AppStore"){
    //           newApp.push(j)
    //         }else{
    //           newElse.push(j)
    //         }          
    //       }
    //   }
    // }
    // new1.c=newApp;
    // new1.d=newElse
    // console.log(new1)
      // for (var i = 0; i < newApp.length; i++) {
      //     for (var j = i + 1; j < newApp.length; j++) {
      //         if (newApp[i] == newApp[j]) {
      //             newApp.splice(j, 1);
      //         }
      //     }
      // }
      // for (var i = 0; i < newElse.length; i++) {
      //     for (var j = i + 1; j < newElse.length; j++) {
      //         if (newElse[i] == newElse[j]) {
      //             newElse.splice(j, 1);
      //         }
      //     }
      // }
      for (var i = 0; i < this.productKey.length; i++) {
          for (var j = i + 1; j < this.productKey.length; j++) {
              if (this.productKey[i] == this.productKey[j]) {
                  this.productKey.splice(j, 1);
              }
          }
      }
     
      for (var i = 0; i < this.sourseKey.length; i++) {
          for (var j = i + 1; j < this.sourseKey.length; j++) {
              if (this.sourseKey[i] == this.sourseKey[j]) {
                  this.sourseKey.splice(j, 1);
              }
          }
      }
      //  this.result=this.result.reverse();
      this.addBg()
    },
    productSet(){
      this.addBg()
    },
    sourseSet(){
      this.addBg()
    },
    productClear(){
      this.addBg()
    },
    addBg(){
      setTimeout(() =>{
          for(var i=0;i<this.$refs.list.length;i++){
             this.$refs.list[i].$el.className="dataList";
          }
         for(var i=0;i<this.$refs.list.length;i++){
           
           if(i%2==1){
              this.$refs.list[i].$el.className="addBg dataList";
           }        
         }
      }, 30)  
    },

  },
  computed:{  
  
  },  
  filters: {
    formatDate,
    formatNoRepeat
  },
  components:{
    CBox
  }
}

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
.chooseArea {
  position: absolute;
  left: 0;
  top: 50px;
  bottom: 0;
  width: 422px;
  background: #f4f3f4;
  border-right: 1px #f4f3f4 solid;
  padding: 5px 20px 13px 13px;
}
.chooseArea ul {
  width: 388px;
}
.chooseArea h3 {
  font-size: 14px;
  line-height: 30px;
  margin-top: 10px;
  font-weight: bold;
}
.el-input__inner {
  padding: 0 10px;
  width: 388px;
}
.radio label {
  width: 150px;
  display: block;
  height: 24px;
  font-size: 12px;
  font-weight: bold;
}
.el-checkbox + .el-checkbox {
  margin-left: 0;
}
.dataTitle {
  font-weight: bold;
  font-size: 14px;
}
.dataListArea {
  position: absolute;
  top: 50px;
  bottom: 0px;
  right: 0px;
  left: 422px;
  padding: 40px;
  overflow:auto;
}
.dataListTitle,
.dataList {
  height: 36px;
  line-height: 36px;
}
.dataListTitle {
  border-bottom: 1px solid #d8d8d8;
  font-weight: bold;
}
.dataList {
  border-top: 1px solid #d8d8d8;
}
.addBg {
  background: #f8f8f8;
}
</style>
