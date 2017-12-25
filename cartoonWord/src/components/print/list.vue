<template>
    <div class='contentLayer'>
        <div id='shadow' class='postLoginShow' @click='makeShadowHide'></div>
        <img src='../../assets/loginbg.png' class='imgDiv'>
        <Button type='primary' class='btnImg' @click='getLoginForm'></Button>
        <Card class="page login postLoginShow">
            <span slot="title" class='headerAction isAction'><a>登录</a></span>
            <span slot="title" class='headerAction' @click='toSign'><a>注册</a></span>
            <Form ref="formData" :model="formData" :rules="formDataValidate" :label-width="70" onsubmit="return false">
                <Form-item label="账号" prop="Mobile">
                    <Input v-model="formData.Mobile" placeholder="请输入账号" />
                </Form-item>
                <Form-item label="密码" prop="Password">
                    <Input type="password" v-model="formData.Password" placeholder="请输入密码" />
                </Form-item>
                <Form-item :label-width="100">
                    <Button type="primary" html-type="submit">登录</Button>
                    <Button type="ghost" style="margin-left: 8px">清空</Button>
                    <!--<router-link :to="{name:'register'}"><Button type="ghost">注册</Button></router-link>-->
                </Form-item>
            </Form>
        </Card>
        <!--下半部分-->
        <v-pageBottomPart></v-pageBottomPart>
    </div>
</template>

<script>
import pageBottomPart from '../../commonBg'
export default {
    name: 'printFace',
    data () {
        return {
            formData: {
                Mobile: '',
                Password: ''
            },
            formDataValidate: {
                Mobile: [
                    { required: true, message: '账号不能为空', trigger: 'blur' }
                ],
                Password: [
                    { required: true, message: '密码不能为空', trigger: 'blur' }
                ]
            }
        }
    },
    mounted (){
        // bus.$on('loginFaceShow', data =>{
        //     if(data){
        //         this.$nextTick(() =>{
        //             this.getLoginForm();
        //         })
        //     }
        // })
    },
    methods: {
        getLoginForm(){
            $('.postLoginShow').css({
                display: 'block'
            })
        },
        toSign (){
            this.$router.push({name: 'register'});
        },
        makeShadowHide (){
            $('.postLoginShow').css({
                display: 'none'
            })
        }
    },
    components:{
        'v-pageBottomPart': pageBottomPart
    }
}
</script>

<style lang="">
.page.printFace{
    position: fixed;
    top: 40%;
    left: 50%;
    width:350px;
    z-index: 2;
    transform: translate(-50%, -50%);
}
.postLoginShow{
    display: none;
}
*{
    padding:0;
    margin:0;
    -webkit-tap-highlight-color:transparent;
    /*设置元素宽高计算方式*/
    box-sizing: border-box;
    -webkit-box-sizing: border-box;
}
.ivu-table-wrapper{
    margin-bottom: 1em;
}
.ivu-page{
    margin-bottom: 1em;
}

.page.simpleList .tablebar{
    /* .tablebar{ */
        margin-bottom: 1em;
    /* } */
}
.contentLayer{
    width: 100%;
    position: relative;
}
.imgDiv{
    width: 100%;
}
.btnImg{
    width: 130px;
    height: 47px;
    border: none;
    border-radius: 5px;
    position: absolute;
    top: 19%;
    left: 14%;
    z-index: 0;
    background-size: 100% 100% !important;
    background: rgba(255,255,255,0);
    background-image: url('../../assets/btnInter.png');
}
/* // html::-webkit-scrollbar{  //清空滚动条
//     width: 0;
//     height: 0;
//     background-color: none;
//  } */
.headerAction{
    padding: 2%;
    margin: 0 16%;
    font-weight: bold;
    font-size: 20px;
    display: inline-block;
}
.headerAction a{
    color: black;
}
.isAction{
    border-bottom: 2px solid rgb(48,101,233);
}
.isAction a{
    color: rgb(48,101,233);
}
#shadow{
    width: 100%;
    height: 100%;
    position: fixed;
    z-index: 1;
    top: 0;
    background: rgba(0,0,0,0.5);
}
</style>