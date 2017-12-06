<template>
    <div class="page simpleList mainPadding" :class="pageClass">
      <div class="innerBorder ListfullHeight">
            <div class='timeLineArea'>
                <Form ref='form' style='width:600px;' :label-width="80" :model="formData" inline :rules="formDataValidate" inline onsubmit="return false">
                    <Form-item prop='email' label = '邮箱'>
                        <Input v-model='formData.email'></Input>
                    </Form-item>
                    <Form-item prop='phone' label = '固定电话'>
                        <Input v-model='formData.phone'></Input>
                    </Form-item>
                    <Form-item prop='mobilePhone' label = '手机号码'>
                        <Input v-model='formData.mobilePhone'></Input>
                    </Form-item>
                    <Form-item prop='twoPhone' label = '手机号码+固定电话'>
                        <Input v-model='formData.twoPhone'></Input>
                    </Form-item>
                    <Form-item prop='number' label = '纯数字'>
                        <Input v-model='formData.number'></Input>
                    </Form-item>
                    <Form-item prop='price' label = '价格'>
                        <Input v-model='formData.price'></Input>
                    </Form-item>
                    <Form-item prop='BusinessDate' label = '日期'>
                        <DatePicker type="date" :value='formData.BusinessDate' placeholder="请选择" @on-change="handleDateSelected($event, 'BusinessDate')"></DatePicker>
                    </Form-item>
                    <Form-item prop='date' label = '日期'>
                        <Input v-model='formData.date'></Input>
                    </Form-item>
                    <Form-item prop='chinese' label = '中文'>
                        <Input v-model='formData.chinese'></Input>
                    </Form-item>
                    <Form-item prop='dword' label = '双字节字符'>
                        <Input v-model='formData.dword'></Input>
                    </Form-item>
                    <Form-item prop='coin' label = '货币'>
                        <Input v-model='formData.coin'></Input>
                    </Form-item>
                    <Form-item prop='num' label = '数值'>
                        <Input v-model='formData.num'></Input>
                    </Form-item>
                    <Form-item prop='idcard' label = '身份证号'>
                        <Input v-model='formData.idcard'></Input>
                    </Form-item>
                    <Form-item>
                        <Button type="primary" @click="handleSubmit">提交</Button>
                        <Button type="ghost" @click="handleReset" style="margin-left: 8px">重置</Button>
                    </Form-item>
                </Form>
                
            </div>
      </div>
    </div>
</template>
<script>
    export default {
        name: 'commonList',
        data () {
            return {
                pageClass: '',
                formData: {
                    email: '',
                    phone: '',
                    mobilePhone: '',
                    twoPhone: '',
                    number: 0,
                    price: '0.00',
                    BusinessDate: '',
                    date: '',
                    chinese: '',
                    dword: '',
                    coin: '',
                    num: '',
                    idcard: ''
                },
                formDataValidate: {
                    email: [
                        { required: true,validator: Site.formCommon.isEmail,trigger: 'blur'}
                    ],
                    phone: [//固定电话
                        { required: true,validator: Site.formCommon.isLandlineTelephone,trigger: 'blur'}
                    ],
                    mobilePhone: [//手机号码
                        { required: true,validator: Site.formCommon.isMobile,trigger: 'blur'}
                    ],
                    twoPhone: [//固定电话和手机号码
                        { required: true,validator: Site.formCommon.isTelephone,trigger: 'blur'}
                    ],
                    number: [
                        {required: true,trigger: 'blur',message: '数字不可为空'}
                    ],
                    price: [
                        {required: true,trigger: 'blur'}
                    ],
                    BusinessDate: [
                        {required: true,message: '日期不可为空'}
                    ],
                    date: [
                        { required: true,validator: Site.formCommon.isDate,trigger: 'blur,change'}
                    ],
                    chinese: [
                        { required: true,validator: Site.formCommon.isChinese,trigger: 'blur,change'}
                    ],
                    dword: [
                        { required: true,validator: Site.formCommon.isDword,trigger: 'blur,change'}
                    ],
                    coin: [
                        { required: true,validator: Site.formCommon.isCoin,trigger: 'blur,change'}
                    ],
                    num: [
                        { required: true,validator: Site.formCommon.isNum,trigger: 'blur,change'}
                    ],
                    idcard: [
                        { required: true,validator: Site.formCommon.isIdcard,trigger: 'blur,change'}
                    ]
                },
                updateList: []
            }
        },
        methods: {
            handleSubmit (){
                this.$refs['form'].validate(valid =>{
                    if(valid){
                        this.$Message.success('提交成功');
                    }
                })
            },
            handleReset (){
                this.$refs['form'].resetFields();
            },
            handleDateSelected (val, key) {
                this.formData[key] = val;
            },
            formDataValidateComplate (){
                if(this.formData){
                    let formData = this.formData;
                    _.each(formData,(value,key) =>{
                        
                    })
                }
            }
        },
        created (){
            this.pageClass = page.pageName;
            this.formDataValidateComplate();
        }
    }

    const page = {
        pageName: 'commonList'
    }
</script>
<style scoped>
    .commonList{
        bottom: -50px !important;
    }
    .time{
        font-size: 14px;
        font-weight: bold;
    }
    .content{
        padding-left: 5px;
    }
    .timeLineArea {
        margin: 0 16px;
    }
    .timeLineArea p {
        margin: 10px 0;
    }
</style>