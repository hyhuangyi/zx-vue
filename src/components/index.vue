<template>

  <div class="wrapper">
       <vue-particles
        color="#dedede"
        :particleOpacity="0.7"
        :particlesNumber="88"
        shapeType="circle"
        :particleSize="4"
        linesColor="#dedede"
        :linesWidth="1"
        :lineLinked="true"
        :lineOpacity="0.4"
        :linesDistance="150"
        :moveSpeed="3"
        :hoverEffect="true"
        hoverMode="grab"
        :clickEffect="true"
        clickMode="push"
      >
      </vue-particles>
    <!-- 管理后台 -->
    <div class="wrapperchild">
        <div >
          <div class="top">
           <span class="top-one">数据中心</span>
        </div>  
          <div class="form">
          
          <div class="wrapperone">
             <el-form :model="ruleForm" :rules="rules" ref="ruleForm" class="demo-ruleForm loginFrom">
              <div class="name">
             <label class="sr-only" for="name">账号</label>
             <input type="text" class="form-control"  placeholder="账号"  v-model="ruleForm.userName" >
           </div>
           <div class="password">
             <label class="sr-only" for="name">密码</label>
             <input type="password" class="form-control"  placeholder="密码" v-model="ruleForm.passwords" >
           </div>
            <div class="check">
                <input type="checkbox" class="checked" v-model="checked"><span class="rember">记住密码</span>
            </div>
             <div  @click="submitForm('ruleForm')" class="btn btn-default">登录</div>
            </el-form>        
          </div>

          </div>
         </div>
      </div>
  </div>
</template>

<script>
import '../assets/css/index.css'
import axios from 'axios'
export default {
  data() {
    return {
         activeIndex: '1',
         ruleForm: {
           userName: '', //用户名
           passwords: ''  //密码
        },
        checked: true,
        type: "2",
        rollPlay: 0,
        rules: {
          userName: [
             {required: true, message: '请输入手机号', trigger: 'blur'},
             { min: 7, max: 11, message: '长度在 7 到 11 个字符', trigger: 'blur' }
          ],
           passwords: [
             {required: true, message: '请输入密码', trigger: 'blur'}
          ],
        }
    };
  },
  methods: {
         handleSelect(key, keyPath) {
      },
         //点击登录调用方法
    submitForm(formName) {
        //保存的账号
        var name=this.ruleForm.userName;
        //保存的密码
        var pass=this.ruleForm.passwords;
        if(name==''||name==null){
          alert("请输入用户名");
          return
        }else if(pass==''||pass==null) {
            
          alert("请输入密码");
          return
        }
        //判断复选框是否被勾选 勾选则调用配置cookie方法
        if(this.checked==true){
            //传入账号名，密码，和保存天数3个参数
          this.setCookie(name,pass,7);
        }
        else {
          this.clearCookie();
        }
        //接口
         var data={
          "userName": this.ruleForm.userName,
          "type":this.type,
          "passWord": this.ruleForm.passwords,
          
        }
      // console.log(data);
        localStorage.setItem( 'rulefrom', JSON.stringify(this.ruleForm ) );
        this.$get('/comm/v1/user/login',data)
          .then(res=>{
            // alert(1);
            console.log(res);
            if(res.code==0){
             this.$message.error(res.msg);
            } 
           
            if(res.code=200){
             this.$message({
              type: 'success',
              message: '登录成功!'
             });
              localStorage.setItem( 'userId', JSON.stringify(res.data.userId) );
               this.$router.push("statisticalTable")
            }
      });

    },

//设置cookie
  setCookie(c_name,c_pwd,exdays) {
    var exdate=new Date();//获取时间
    exdate.setTime(exdate.getTime() + 24*60*60*1000*exdays);//保存的天数
    //字符串拼接cookie
    window.document.cookie="userName"+ "=" +c_name+";path=/;expires="+exdate.toGMTString();
    window.document.cookie="passwords"+"="+c_pwd+";path=/;expires="+exdate.toGMTString();
  },
  //读取cookie
  getCookie:function () {
    if (document.cookie.length>0) {
      var arr=document.cookie.split('; ');//这里显示的格式需要切割一下自己可输出看下
      for(var i=0;i<arr.length;i++){
        var arr2=arr[i].split('=');//再次切割
        //判断查找相对应的值
        if(arr2[0]=='userName'){
          this.ruleForm.userName=arr2[1];//保存到保存数据的地方
        }else if(arr2[0]=='passwords'){
          this.ruleForm.passwords=arr2[1];
        }
      }
    }
  },
  //清除cookie
  clearCookie:function () {
    this.setCookie("","",-1);//修改2值都为空，天数为负1天就好了
  }
  },
   created() {},
   mounted() {
    this.getCookie();   

  }
};
</script>
<style lang="css" scoped>

</style>
