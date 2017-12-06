
import districts from '../computer/districts'

const formCommon = {
    isMobile: (rule, value, callback) =>{
        if(value){//手机号码
            let test = /^(\+)?(0|086|86|17951)?(13[0-9]|15[0-9]|17[0-9]|18[0-9]|14[57])[0-9]{8}$/;
            if(!test.test(value)){
                callback(new Error('请输入正确格式的手机号'));
            }else {
                callback();
            }
        }else{
            callback(new Error('手机号不可为空'));
        }
    }, 
    isLandlineTelephone: (rule, value, callback) =>{
        if(value){//固定电话
            let test = /^0(\d{1,3}-?)?\d{7,8}$/;
            if(!test.test(value)){
                callback(new Error('请输入正确格式的电话'));
            }else {
                callback();
            }
        }else{
            callback(new Error('电话不可为空'));
        }
    }, 
    isTelephone: (rule, value, callback) =>{
        if(value){//固定电话和手机号码
            let test = /(^(\+)?(0|086|86|17951)?(13[0-9]|15[0-9]|17[0-9]|18[0-9]|14[57])[0-9]{8}$)|(^0(\d{1,3}-?)?\d{7,8}$)/;
            if(!test.test(value)){
                callback(new Error('请输入正确格式的电话'));
            }else {
                callback();
            }
        }else{
            callback(new Error('电话不可为空'));
        }
    },
    isEmail: (rule, value, callback) =>{
        if(value){//电子邮件
            let email = /\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/;
            if(!email.test(value)){
                callback(new Error('请输入正确格式的邮箱地址'));
            }else {
                callback();
            }
        }else{
            callback(new Error('邮箱不可为空'));
        }
    },
    isDate: (rule, value, callback) =>{
        if(value){//日期
            let date =  /^(?:(?:1[6-9]|[2-9][0-9])[0-9]{2}([-/.]?)(?:(?:0?[1-9]|1[0-2])\1(?:0?[1-9]|1[0-9]|2[0-8])|(?:0?[13-9]|1[0-2])\1(?:29|30)|(?:0?[13578]|1[02])\1(?:31))|(?:(?:1[6-9]|[2-9][0-9])(?:0[48]|[2468][048]|[13579][26])|(?:16|[2468][048]|[3579][26])00)([-/.]?)0?2\2(?:29))(\s+([01][0-9]:|2[0-3]:)?[0-5][0-9]:[0-5][0-9])?$/;
            if(!date.test(value)){
                callback(new Error('请输入正确格式的日期'));
            }else {
                callback();
            }
        }else{
            callback(new Error('日期不可为空'));
        }
    },
    isChinese: (rule, value, callback) =>{
        if(value){//中文
            let chinese =  /^[\u4e00-\u9fa5]+$/;
            if(!chinese.test(value)){
                callback(new Error('请输入正确的中文字符'));
            }else {
                callback();
            }
        }else{
            callback(new Error('中文字符不可为空'));
        }
    },
    isDword: (rule, value, callback) =>{
        if(value){//日期
            let dword = /^[^\x00-\xff]+$/;
            if(!dword.test(value)){
                callback(new Error('请输入正确的双字节字符'));
            }else {
                callback();
            }
        }else{
            callback(new Error('双字节字符不可为空'));
        }
    },
    isCoin: (rule, value, callback) =>{
        if(value){//货币
            let money = /^([\u0024\u00A2\u00A3\u00A4\u20AC\u00A5\u20B1\20B9\uFFE5]\s*)(\d+,?)+\.?\d*\s*$/;
            if(!money.test(value)){
                callback(new Error('请输入正确格式的金额'));
            }else {
                callback();
            }
        }else{
            callback(new Error('金额不可为空'));
        }
    },
    isNum: (rule, value, callback) =>{
        if(value){//数值
            let num = /^(\d+[\s,]*)+\.?\d*$/;
            if(!num.test(value)){
                callback(new Error('请输入正确格式的数值'));
            }else {
                callback();
            }
        }else{
            callback(new Error('数值不可为空'));
        }
    },
    getAreaList: () =>{
        let provinceList = {};
        let cityList = {};
        let areaList = {};
        let address = [];
        _.each(districts[100000],(proVal,proKey) =>{//所有省份
            provinceList = {
                value: proKey,
                label: proVal,
                children: []
            }
            address.push(provinceList);
            _.each(districts[proKey],(cityVal,cityKey) =>{//所有城市（键，值）
                cityList = {
                    value: cityKey,
                    label: cityVal,
                    children: []
                }
                provinceList.children.push(cityList);
                _.each(districts[cityKey],(areaVal,areaKey) =>{//所有区（键，值）   
                    areaList = {
                        value: areaKey,
                        label: areaVal
                    }
                    cityList.children.push(areaList);
                })
            })
        })
        return address
    }
}

 export default formCommon
