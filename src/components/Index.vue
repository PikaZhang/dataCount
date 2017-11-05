<template>
  <!-- `checked` 为 true 或 false -->
  <div class="clearFix">
    <aside class="chooseArea">
      <ul v-if="(isNaN(startTime)|startTime <0)&&(endTime <0|isNaN(endTime))">
        <li>
          <h3>选择产品</h3>
            <el-select v-model="value1" clearable placeholder="全部" @change="productSet" @clear="productClear" >
            <el-option
              v-for="item,index in meta.products"
              :value="item.uid"
              :label="item.title"
              >
            </el-option>
          </el-select>
        </li>
        <li>
          <h3>选择渠道</h3>
            <el-select v-model="value2" clearable placeholder="全部" @change="sourseSet" @clear="productClear">
                <el-option 
                  v-for="item in meta.channels"
                  :value="item.uid"
                  :label="item.title">
                </el-option>
          </el-select>
        </li>
        <li>
          <h3>选择CP</h3>
            <el-select v-model="value3" placeholder="全部" >
                <el-option
                  v-for="val in options"
                  :key="val.value"
                  :label="val.label"
                  :value="val.value">
                </el-option>
           
              </el-select>
        </li>
      </ul>
      <ul v-else>
        <li>
          <h3>选择产品</h3>
            <el-select v-model="value1" clearable placeholder="全部" @change="productSet" @clear="productClear" >
            <el-option
              v-for="item in productFn"
              :value="item"
              :label="item"
              :key="item"
              >
            </el-option>
          </el-select>
        </li>
        <li>
          <h3>选择渠道</h3>
            <el-select v-model="value2" clearable placeholder="全部" @change="sourseSet" @clear="productClear">
                <el-option 
                  v-for="item in sourseArrFn"
                  :value="item"
                 >
                </el-option>
          </el-select>
        </li>
        <li>
          <h3>选择CP</h3>
            <el-select v-model="value3" placeholder="全部" >
                <el-option
                  v-for="val in options"
                  :key="val.value"
                  :label="val.label"
                  :value="val.value">
                </el-option>
           
              </el-select>
        </li>
      </ul>
      <el-checkbox-group v-model="type" class="radio">
          <el-checkbox label="分产品显示" name="type"  @change="checkProduct" :checked="checkedPro"></el-checkbox>
          <el-checkbox label="分渠道显示" name="type" @change="checkSource" :checked="checkedSou"></el-checkbox>
          <el-checkbox label="分日期显示" name="type" @change="checkDate" :checked="checkedDay"></el-checkbox>
      </el-checkbox-group>
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
      <div class="buttons">
        <el-button size="small" round @click="today">今天</el-button>
        <el-button size="small" round @click='yesterday'>昨天</el-button>
        <el-button size="small" round @click='nowMonth'>本月</el-button>
        <el-button size="small" round @click='yesMonth'>上个月</el-button>
      </div>

    </aside>
    <div class="dataListArea">
  
      <el-row  class="dataListTitle" style="padding:0;">
          <el-col :span="2">
              <div>日期</div>
          </el-col>
          <el-col :span="4">
              <div>产品</div>
          </el-col>
          <el-col :span="2">
              <div>渠道</div>

          </el-col>
          <el-col :span="1">
              <div>用户</div>
          </el-col>
          <el-col :span="2">
              <div>用户活跃</div>
          </el-col>
          <el-col :span="2">
              <div>新设备</div>
          </el-col>
          <el-col :span="2">
              <div>活跃设备</div>
          </el-col>
          <el-col :span="2">
              <div>贷款创造</div>
          </el-col>
           <el-col :span="2">
              <div>贷款提交</div>
          </el-col>
          <el-col :span="2">
              <div>贷款取消</div>
          </el-col>
          <el-col :span="2">
              <div>CP</div>
          </el-col>
      </el-row>
      <div >
        <!-- item.day>=startTime&&item.day<=endTime&& -->
        <!-- item.day>=startTime&&item.day<=endTime&& -->
        <!-- "(item.day>=(startTime-1)&&item.day<endTime)|(value1==item.name&&(value2==item.source|value2==''))|(value2==item.source&&(value1==''|value1==item.name))"  -->
          <!-- "(item.day>=(startTime-1)&&item.day<endTime)|(value1==item.name&&(value2==item.source|value2==''))|(value2==item.source&&(value1==''|value1==item.name)) -->
        <el-row  class="dataList" style="padding:0;" v-for="item in objFn" ref="list" v-show="isTrue(item)">
            <el-col :span="2">
                <div>{{(firstDay+(item.day+1)*86400000)|formatDate('y-m-d')}}</div>
            </el-col>
            <el-col :span="4">
                <div ref="product">{{item.name}}</div>
            </el-col>
            <el-col :span="2">
                <div>{{item.source}}</div>
            </el-col>
            <el-col :span="1">
                <div v-if="item.nr.user">{{item.nr.user}}</div>
                <div v-else>&nbsp;</div>
            </el-col>
            <el-col :span="2">
                <div v-if="item.nr.ua">{{item.nr.ua}}</div>
                <div v-else>&nbsp;</div>
            </el-col>
              <el-col :span="2">
               <div v-if="item.nr.device">{{item.nr.device}}</div>
               <div v-else>&nbsp;</div>
            </el-col>
              <el-col :span="2">
               <div v-if="item.nr.da">{{item.nr.da}}</div>
               <div v-else>&nbsp;</div>
            </el-col>
              <el-col :span="2">
               <div v-if="item.nr.loan_create">{{item.nr.loan_create}}</div>
               <div v-else>&nbsp;</div>
            </el-col>
              <el-col :span="2">
               <div v-if="item.nr.loan_submit">{{item.nr.loan_submit}}</div>
               <div v-else>&nbsp;</div>
            </el-col>
            <el-col :span="2">
               <div v-if="item.nr.loan_cancel">{{item.nr.loan_cancel}}</div>
               <div v-else>&nbsp;</div>
            </el-col>
            <el-col :span="2">
               
               <div >&nbsp;</div>
            </el-col>
        </el-row>
        </div>
    </div>
  </div>
</template>
<script>

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
      meta:'',
      startTime: "",
      endTime: "",
      // disTime:'',
      firstDay: new Date(2017, 9, 14, 0, 0, 0).getTime(),
      obj:'',
      newObj:'',
      type:[],
      checkedPro:false,
      checkedSou:false,
      checkedDay:false,
      res:[],
      resPro:[]

    };
  },
  mounted() {
    axios.get("/private").then(res => {
        this.result = res.data;
        this.result=this.result.reverse();
        var obj=[]
        for(var i=0;i<this.result.length;i++){
            for(var key in this.result[i]){
                for(var j in this.result[i][key]){       
                  obj.push({'name':key,'source':j,'nr':this.result[i][key][j],"day":i})   
                }   
    
          }
        }
        this.obj=obj.reverse(); 
    }).then(()=>{
          this.addBg()
    });
    axios.get("/meta").then(res => {
        this.meta = res.data;
        for(var i=0;i<this.meta.products.length;i++){
          this.meta.products[i].uid=this.meta.products[i].uid.replace(/\./g,'_')
          if( this.meta.products[i].title==''){
                this.meta.products[i].title= this.meta.products[i].uid;
          }
        }
        for(var i=0;i<this.meta.channels.length;i++){
          if( this.meta.channels[i].title==''){
                this.meta.channels[i].title= this.meta.channels[i].uid;
          }
        }

    });
    //默认事件一周前
    this.dataValue1=new Date()-86400000*7;
    this.dataValue2=new Date();
    var dataValue1=new Date().getTime()-86400000*7;
    this.startTime=Math.floor((dataValue1-this.firstDay)/86400000);
    this.endTime=Math.floor((this.dataValue2.getTime()-this.firstDay)/86400000);
 
   
  },
  methods: {
    changeTime1() {
      var time = new Date(this.dataValue1);
      this.time1 = time.getTime();
      this.startTime = (this.time1 - this.firstDay) / 86400000;
    },
    changeTime2() {
      var time = new Date(this.dataValue2);
      this.time2 = time.getTime();
      this.endTime = (this.time2 - this.firstDay) / 86400000;
      // this.disTime = this.endTime-this.startTime;    

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
      if(this.$refs.list){
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
      }
     
    },
    checkProduct() {
      if(this.obj==''){
        return
      }

      this.checkedPro = !this.checkedPro;
      if (this.checkedPro) {
         
          this.obj.sort((a,b)=>{
            if(b.name.length==a.name.length){
              return b.name.substr(b.name.length-1,1) - a.name.substr(a.name.length-1,1)
            }else{
              return b.name.length - a.name.length;
            }
              
          })
          this.addBg()
      }
    },
    checkSource(){
        if(this.obj==''){
          return
        }
        this.checkedSou = !this.checkedSou
        if (this.checkedSou) {
          this.obj.sort((a,b)=>{
             if(b.source.length==a.source.length){
               if(b.source.charCodeAt(0) == a.source.charCodeAt(0)){
                  return b.source-a.source;
               }else{
                  return b.source.charCodeAt(0) - a.source.charCodeAt(0)
               }
                
            }else{
              return b.source.length - a.source.length;
            }
          })
          this.addBg()
      }
    },
    checkDate(){
        if(this.obj==''){
          return
        }
        this.checkedDay = !this.checkedDay
        if (this.checkedDay) {
          this.obj.sort((a,b)=>{
              return b.day-a.day
          })
          this.addBg()
        }
    },
    isTrue(item){
      // true的情况是没有选择时间
      // false 是选择了时间
      if((isNaN(this.startTime)|this.startTime <0)&&(this.endTime <0|isNaN(this.endTime))){
        return (item.day>=(this.startTime-1)&&item.day<this.endTime)|(this.value1==item.name&&(this.value2==item.source|this.value2==''))|(this.value2==item.source&&(this.value1==''|this.value1==item.name))
      }else{
        if(this.startTime==NaN){
          return false
        }else{
          return (item.day>=(this.startTime-1)&&item.day<this.endTime)&&this.value1==''|this.value1==item.name&&this.value2==''|this.value2==item.source
        }
        
      }
    },
    //今天
    today(){
      this.dataValue1=new Date();
      this.dataValue2=new Date();
      var dataValue1=new Date().getTime();
      this.startTime=Math.floor((this.dataValue2.getTime()-this.firstDay)/86400000);
      this.endTime=Math.floor((this.dataValue2.getTime()-this.firstDay)/86400000);
    },
    yesterday(){
      this.dataValue1=new Date()-86400000;
      this.dataValue2=new Date()-86400000;
      var dataValue1=new Date().getTime()-86400000;
      this.startTime=Math.floor((dataValue1-this.firstDay)/86400000);
      this.endTime=Math.floor(( dataValue1-this.firstDay)/86400000);
    },
    nowMonth(){
      var now = new Date(); //当前日期 
      var nowMonth = now.getMonth(); //当前月 
      var nowYear = now.getFullYear(); //当前年 
      var monthStartDate = new Date(nowYear, nowMonth, 1);  
       this.dataValue1=monthStartDate
       this.dataValue2=now;
       var dataValue1=monthStartDate.getTime()
       this.startTime=Math.floor((dataValue1-this.firstDay)/86400000);
       this.endTime=Math.floor((this.dataValue2.getTime()-this.firstDay)/86400000);
    },
    yesMonth(){
       var now = new Date(); //当前日期 
       var yesMonth = now.getMonth()-1; //上个月月 
       var nowYear = now.getFullYear(); //当前年
       var nowMonth = now.getMonth(); //当前月  
       var monthStartDate = new Date(nowYear, yesMonth, 1);
       var monthEndDate = new Date(new Date(nowYear, nowMonth, 1)-1);  
       this.dataValue1=monthStartDate
       this.dataValue2=monthEndDate;
       var dataValue1=monthStartDate.getTime()
       this.startTime=Math.floor((dataValue1-this.firstDay)/86400000);
       this.endTime=Math.floor((this.dataValue2.getTime()-this.firstDay)/86400000);
    }

  },
  computed:{  
      objFn(){
       
        if((this.startTime==''|isNaN(this.startTime)|this.startTime <0)&&(this.endTime <0|isNaN(this.endTime)|this.endTime=="")){
           return this.obj;
        }else{
          var newObj=[];
          for(var i=this.startTime-1;i<this.endTime;i++){
            for(var key in this.result[i]){
                for(var j in this.result[i][key]){       
                  newObj.push({'name':key,'source':j,'nr':this.result[i][key][j],"day":i})   
                }   
             }
          }
          this.newObj=newObj.reverse();
         
          //将产品添加到数组中
           var filterObj=[]
  
         
          for(var i=0;i<this.newObj.length;i++){
              filterObj.push({"name":this.newObj[i].name,"value":this.newObj[i].source}) 
               
          }
          
          //数据处理 用于过滤
          var hash = {};
          var i = 0;
          var res = [];
          filterObj.forEach(function(item) {
              var objName = item.name;
              hash[objName] ? res[hash[objName] - 1].value.push(item.value) : hash[objName] = ++i && res.push({
                  name: objName,
                  value: [item.value],
              })
          });
         

          var hash1 = {};
          var j = 0;
          var resPro = [];
          filterObj.forEach(function(item) {
              var objValue = item.value;
              hash[objValue] ? resPro[hash[objValue] - 1].name.push(item.name) : hash[objValue] = ++i && resPro.push({
                  value: objValue,
                  name: [item.name],
              })
          });
          for(var i=0;i<res.length;i++){
           
            res[i].value=[...new Set(res[i].value)]
          }
          for(var i=0;i<resPro.length;i++){
           
            resPro[i].name=[...new Set(resPro[i].name)]
          }
          this.res=res;
          this.resPro = resPro;
          return this.newObj;
        }
      
      },
      productFn(){
        var arr=[]
        for(var i =0;i<this.resPro.length;i++){
          arr=arr.concat(this.resPro[i].name)
          
          if(this.value2==this.resPro[i].value&&this.value2!=""){          
            return this.resPro[i].name
          }

        }
        if(this.value2==""){
          arr=[...new Set(arr)]
          return arr
        }
      },
      sourseArrFn(){
        var arr=[]
  
        for(var i =0;i<this.res.length;i++){
          arr=arr.concat(this.res[i].value)
          
          if(this.value1==this.res[i].name&&this.value1!=""){          
            return this.res[i].value
          }

        }
        if(this.value1==""){
          arr=[...new Set(arr)]
          return arr
        }
      }
  },  
  filters: {
    formatDate,
    formatNoRepeat
  },
  components:{
  
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
  width: 388px!important;
}
.radio label {
  width: 150px;
  display: block;
  height: 24px;
  font-size: 12px;
  font-weight: bold;
}
.el-checkbox + .el-checkbox {
  margin-left: 0!important;
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
  min-width:1250px;
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
.buttons {
  margin-top:20px;
}
</style>
