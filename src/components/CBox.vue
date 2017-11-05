<template>
    <div class="radio">
        <el-checkbox-group v-model="type">
            <el-checkbox label="分产品显示" name="type"  @change="checkProduct" :checked="checked"></el-checkbox>
            <el-checkbox label="分渠道显示" name="type"></el-checkbox>
            <el-checkbox label="分日期显示" name="type" ></el-checkbox>
        </el-checkbox-group>
    </div>
</template>
<script>
    export default{
        props:['obj'],
        data(){
            return{
                type:[],
                checked:false
            }
        },
        methods:{
            checkProduct() {
                this.checked = !this.checked;
                if (this.checked) {
                    console.log(this.obj)
                    this.obj.sort((a,b)=>{
                        return a.name.length>b.name.length
                    })
                    // setTimeout(()=> {
                    //     for(var i=0;i<this.$refs.product.length;i++){
                    //         // console.log(this.$refs.product[i].innerText)
                    //         this.$refs.product.sort((a,b)=>{
                    //         return a.innerText-b.innerText;
                    //         })
                    //     }
                    // }, 20);
                    
                }
            }
        }
        
    }
</script>