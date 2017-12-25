<template>
    <div class="page simpleList mainPadding" :class="pageClass">
      <div class="innerBorder ListfullHeight">
            <div class='timeLineArea'>
                <Form ref='form' style='width:600px;' :label-width="80" :model="formData" inline :rules="formDataValidate"  onsubmit="return false">
                    <Form-item prop='email' label = '邮箱'>
                        <Input v-model='formData.email' />
                    </Form-item>
                    <Form-item prop='phone' label = '固定电话'>
                        <Input v-model='formData.phone' />
                    </Form-item>
                    <Form-item prop='mobilePhone' label = '手机号码'>
                        <Input v-model='formData.mobilePhone' />
                    </Form-item>
                    <Form-item prop='twoPhone' label = '手机号码+固定电话'>
                        <Input v-model='formData.twoPhone' />
                    </Form-item>
                    <Form-item prop='number' label = '纯数字'>
                        <Input v-model='formData.number' />
                    </Form-item>
                    <Form-item prop='price' label = '价格'>
                        <Input v-model='formData.price' />
                    </Form-item>
                    <Form-item prop='BusinessDate' label = '日期'>
                        <DatePicker type="date" :value='formData.BusinessDate' placeholder="请选择" @on-change="handleDateSelected($event, 'BusinessDate')"></DatePicker>
                    </Form-item>
                    <Form-item prop='date' label = '日期'>
                        <Input v-model='formData.date' />
                    </Form-item>
                    <Form-item prop='chinese' label = '中文'>
                        <Input v-model='formData.chinese' />
                    </Form-item>
                    <Form-item prop='dword' label = '双字节字符'>
                        <Input v-model='formData.dword' />
                    </Form-item>
                    <Form-item prop='coin' label = '货币'>
                        <Input v-model='formData.coin' />
                    </Form-item>
                    <Form-item prop='num' label = '数值'>
                        <Input v-model='formData.num' />
                    </Form-item>
                    <Form-item prop='idcard' label = '身份证号'>
                        <Input v-model='formData.idcard' />
                    </Form-item>
                    <Form-Item label='重量区间' prop="StartWeight">
                        <Input v-model="formData['StartWeight']" :autosize="true" style="width:40px;"/> <span>&nbsp;ct</span>
                        <span>&nbsp; - &nbsp;</span>
                        <Input v-model="formData['EndWeight']" :autosize="true" style="width:40px;"/> <span>&nbsp;ct</span>
                    </Form-Item>
                    <Form-item prop='father' label = '父亲'>
                        <Select v-model='formData.father' clearable @on-change="handleSelectSelected">
                            <Option v-for="item in fatherList" :value="item.Id" :key="item.Id" >{{ item.Name }}</Option>
                        </Select>
                    </Form-item>
                    <Form-item prop='son' label = '儿子'>
                        <Cascader :data="childrenList" change-on-select v-model="childrenName" ></Cascader>
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
            
        const intCheck = (item, rule, value, callback, required) => {
                if(!required){
                    if(value == ''){
                        callback()
                        return
                    }
                }else{
                    if(value === '' || value === undefined || value == null){
                        callback(new Error('请输入' + item))
                        return
                    }
                }
                if(!Number.isInterger(+value)){
                    callback(new Error('请输入整数'))
                }else{
                    if(value < 0){
                        callback(new Error(item + '不能小于0'))
                    }
                }
        }
        const floatCheck = (name,item, rule, value, callback, required) => {
                if(!required){
                    if(value === '' || value === undefined || value === null){
                        callback()
                        return
                    }
                }else{
                    if(value === '' || value === undefined || value === null){
                        callback(new Error('请输入' + item))
                        return
                    }
                }
                let reg = /^(-?\d+)(\.\d+)?$/
                value = value.trim?value.trim():value
                if(!reg.test(value) || isNaN(parseFloat(value))){
                    callback(new Error('请输入数值'))
                }else{
                    if(value < 0){
                        callback(new Error(item + '不能小于0'))
                    }else{
                        let start = this.formData['StartWeight'] == '' ? 0 : parseFloat(this.formData['StartWeight'])
                        let end = this.formData['EndWeight'] == 0 ? 0 : parseFloat(this.formData['EndWeight'])
                        if(start > end){
                            if(name == 'StartWeight'){
                                callback(new Error('左边数值须小于右边'))
                            }else{
                                callback(new Error('右边数值须大于左边'))
                            }
                        }else{
                            callback()
                        }
                    }
                }
        }
        const validateStartWeight = (rule, value, callback) => {
                floatCheck('StartWeight','起始数值', rule, value, callback, false)
        }
        const validateEndWeight = (rule, value, callback) => {
                floatCheck('EndWeight','结束数值', rule, value, callback, false)
        }
        
            return {
                pageClass: '',
                isEmpty: true,
                childrenName: [],
                childrenList: [],
                fatherList: [
                    {
                        Id: 'big',
                        Name: '大父亲'
                    },{
                        Id: 'small',
                        Name: '小父亲'
                    }
                ],

                formData: {
                    father: null,
                    StartWeight: '',
                    EndWeight: '',
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
                    StartWeight: [
                        {
                            validator: validateStartWeight, trigger: 'blur, change'
                        }
                    ],
                    EndWeight: [
                        {
                            validator: validateEndWeight, trigger: 'blur, change'
                        }
                    ],
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
            },
            handleSelectSelected(value){
                if(this.isEmpty){
                    this.childrenName = [];
                }else{
                    this.isEmpty = true;
                }
                if(value == 'big'){
                    this.childrenList = [{
                        value: 'bigSon',
                        label: '大儿子',
                        children: [
                            {
                                value: 'bigSonSon',
                                label: '大孙子'
                            },{
                                value: 'bigTwoSon',
                                label: '大二孙子'
                            }
                        ]
                    }]
                }else{
                    this.childrenList = [{
                        value: 'smallSon',
                        label: '小儿子',
                        children: [
                            {
                                value: 'smallSonSon',
                                label: '小孙子'
                            },{
                                value: 'smallTwoSon',
                                label: '小二孙子'
                            }
                        ]
                    }]

                }
            },
            getFormData (){
                this.formData.father = 'big';
                this.isEmpty = false; //不清空
                this.childrenName = ['bigSon','bigSonSon'];
            }
        },
        created (){
            this.pageClass = page.pageName;
            this.formDataValidateComplate();
            this.getFormData();
        },
        actived (){
            this.getFormData();
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