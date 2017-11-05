<template>
    <div class="header clearFix">
        <h1 id="logo">
            数据统计
        </h1>
        <nav>
            <router-link :to="{name:'Index'}" :class="{ active: isActive }" @click.native="isActive=true">内部数据</router-link>
            <router-link :to="{name:'Index'}" :class="{ active: !isActive }" @click.native="isActive=false">ARPU</router-link>
        </nav> 
        <div id="login">
             <a href="javascropt:;">登录</a>
        </div>
    </div>
</template>
<script>
export default {
    data(){
        return{
            isActive:true
        }
    },
};
</script>
<style>
.header {
  height: 50px;
  background-color: #1f1f1f;
}
#logo,
.header nav,
.header nav a {
  float: left;
  color: #8e8e8e;
  line-height: 50px;
}
#login,
#login a {
  float: right;
   line-height: 50px;
    margin-right:20px;
}
#login a{
     color: #8e8e8e;
}
#logo{
    font-size:20px;
    padding: 0 14px 0 8px;
   
}
.header nav a{
    padding: 0 16px;
}
.header nav .active{
    background:#000;
    color: #fff;
    text-decoration: none;
}
</style>


