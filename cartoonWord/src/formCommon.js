
import districts from '../computer/districts'

const formValidate = {
	isMobile: (rule, value, callback) =>{
		if(value){
			//手机号码（考虑086）
			let test = /^(\+)?(0|086|86|17951)?(13[0-9]|15[0-9]|17[0-9]|18[0-9]|14[5678]|19[89]|16[6])[0-9]{8}$/;
			if(!test.test(value)){
				callback(new Error('请输入正确格式的手机号'));
			}else {
				callback();
			}
		}else if(rule.required){
			callback(new Error('手机号不可为空'));
		}else{
			callback();
		}
	},
	isLandTel: (rule, value, callback) =>{
		if(value){
			//固定电话
			let test = /(^0(\d{2}|\d{3})-(\d{7,8})$)|(^(\d{7,8})$)/;
			let delTel = /(^(13[0-9]|15[0-9]|17[0-9]|18[0-9]|14[5678]|19[89]|16[6])[0-9]{4,5}$)/;  //手机号前7/8位
			if(!test.test(value)){
				callback(new Error('请输入正确格式的电话'));
			}else {
				if(delTel.test(value)){ //满足7/8位数，但value若是手机号的前部分，这种情况不允许通过
					callback(new Error('请输入正确格式的电话'));
				}else{
					callback();
				}
			}
		}else if(rule.required){
			callback(new Error('电话不可为空'));
		}else{
			callback();
		}
	}, 
	isTel: (rule, value, callback) =>{
		if(value){
			//固定电话和手机号码(手机号不考虑086，不含直播号)
			let test = /(^(13[0-9]|15[0-9]|17[0-9]|18[0-9]|14[5678]|19[89]|16[6])[0-9]{8}$)|(^0(\d{2}|\d{3})-(\d{7,8})$)|(^(\d{7,8})$)/;
			let delTel = /(^(13[0-9]|15[0-9]|17[0-9]|18[0-9]|14[5678]|19[89]|16[6])[0-9]{4,5}$)/;  //手机号前7/8位
			if(!test.test(value)){
				callback(new Error('请输入正确格式的电话'));
			}else {
				if(delTel.test(value)){ //满足7/8位数，但value若是手机号的前部分，这种情况不允许通过
					callback(new Error('请输入正确格式的电话'));
				}else{
					callback();
				}
			}
		}else if(rule.required){
			callback(new Error('电话不可为空'));
		}else{
			callback();
		}
	}, 
	isEmail: (rule, value, callback) =>{
		if(value){
			//电子邮件
			let email = /\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/;
			if(!email.test(value)){
				callback(new Error('请输入正确格式的邮箱地址'));
			}else {
				callback();
			}
		}else if(rule.required){
			callback(new Error('邮箱不可为空'));
		}else{
			callback();
		}
	},
	isDate: (rule, value, callback) =>{
		if(value){
			//日期
			let date =  /^(?:(?:1[6-9]|[2-9][0-9])[0-9]{2}([-/.]?)(?:(?:0?[1-9]|1[0-2])\1(?:0?[1-9]|1[0-9]|2[0-8])|(?:0?[13-9]|1[0-2])\1(?:29|30)|(?:0?[13578]|1[02])\1(?:31))|(?:(?:1[6-9]|[2-9][0-9])(?:0[48]|[2468][048]|[13579][26])|(?:16|[2468][048]|[3579][26])00)([-/.]?)0?2\2(?:29))(\s+([01][0-9]:|2[0-3]:)?[0-5][0-9]:[0-5][0-9])?$/;
			if(!date.test(value)){
				callback(new Error('请输入正确格式的日期'));
			}else {
				callback();
			}
		}else if(rule.required){
			callback(new Error('日期不可为空'));
		}else{
			callback ()
		}
	},
	isCn: (rule, value, callback) =>{
		if(value){
			//中文
			let chinese =  /^[\u4e00-\u9fa5]+$/;
			if(!chinese.test(value)){
				callback(new Error('请输入中文'));
			}else {
				callback();
			}
		}else if(rule.required){
			callback(new Error('中文字符不可为空'));
		}else{
			callback ()
		}
	},
	isDword: (rule, value, callback) =>{
		if(value){
			//双字节
			let dword = /^[^\x00-\xff]+$/;
			if(!dword.test(value)){
				callback(new Error('请输入双字节字符'));
			}else {
				callback();
			}
		}else if(rule.required){
			callback(new Error('双字节字符不可为空'));
		}else{
			callback ()
		}
	},
	isCoin: (rule, value, callback) =>{
		if(value){
			//货币
			let money = /^([\u0024\u00A2\u00A3\u00A4\u20AC\u00A5\u20B1\20B9\uFFE5]\s*)(\d+,?)+\.?\d*\s*$/;
			if(!money.test(value)){
				callback(new Error('请输入正确格式的金额'));
			}else {
				callback();
			}
		}else if(rule.required){
			callback(new Error('金额不可为空'));
		}else{
			callback ()
		}
	},
	isNum: (rule, value, callback) =>{
		if(value){
			//数值
			let num = /^(\d+[\s,]*)+\.?\d*$/;
			if(!num.test(value)){
				callback(new Error('请输入纯数字'));
			}else {
				callback();
			}
		}else if(rule.required){
			callback(new Error('数值不可为空'));
		}else{
			callback();
		}
	},
	isIdcard: (rule, value, callback) =>{
		if(value){
			let gets = value,
				decide;
			var Wi = [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2]; // 加权因子;
			var ValideCode = [1, 0, 10, 9, 8, 7, 6, 5, 4, 3, 2]; // 身份证验证位值，10代表X;
			if (gets.length == 15) {
				if(isValidityProvice(gets) && isValidityBrithBy15IdCard(gets)){
					decide = true
				}else{
					decide = false
				}
			}else if (gets.length == 18) {
				var a_idCard = gets.split(''); // 得到身份证数组
				if(isValidityProvice(gets) && isTrueValidateCodeBy18IdCard(a_idCard) && isValidityBrithBy18IdCard(gets)){
					decide = true
				}else{
					decide = false
				}
			}    

			function isTrueValidateCodeBy18IdCard(a_idCard) {
				var sum = 0; // 声明加权求和变量   
				if (a_idCard[17].toLowerCase() == 'x') {
				    a_idCard[17] = 10; // 将最后位为x的验证码替换为10方便后续操作   
				}
				for (var i = 0; i < 17; i++) {
				    sum += Wi[i] * a_idCard[i]; // 加权求和
				}
				let valCodePosition = sum % 11; // 得到验证码所位置
				if (a_idCard[17] == ValideCode[valCodePosition]) {
				    return true
				}else{
				    return false
				}
			}

			function isValidityBrithBy18IdCard(idCard18) {
				var year = idCard18.substring(6, 10);
				var month = idCard18.substring(10, 12);
				var day = idCard18.substring(12, 14);
				var temp_date = new Date(year, parseFloat(month) - 1, parseFloat(day));
				// 这里用getFullYear()获取年份，避免千年虫问题   
				if (temp_date.getFullYear() != parseFloat(year) || temp_date.getMonth() != parseFloat(month) - 1 || temp_date.getDate() != parseFloat(day)) {
				    return false
				}else{
				    return true
				}
			}

			function isValidityBrithBy15IdCard(idCard15) {
				var year = idCard15.substring(6, 8);
				var month = idCard15.substring(8, 10);
				var day = idCard15.substring(10, 12);
				var temp_date = new Date(year, parseFloat(month) - 1, parseFloat(day));
				// 对于老身份证中的你年龄则不需考虑千年虫问题而使用getYear()方法
				if(isValidityProvice(idCard15)){
				    if (temp_date.getYear() != parseFloat(year) || temp_date.getMonth() != parseFloat(month) - 1 || temp_date.getDate() != parseFloat(day)) {
						return false;
				    }else{
				       return true; 
				    }
				}
			}
			function isValidityProvice(val){
				var vcity={ 11:"北京",12:"天津",13:"河北",14:"山西",15:"内蒙古", 
				    21:"辽宁",22:"吉林",23:"黑龙江",31:"上海",32:"江苏", 
				    33:"浙江",34:"安徽",35:"福建",36:"江西",37:"山东",41:"河南", 
				    42:"湖北",43:"湖南",44:"广东",45:"广西",46:"海南",50:"重庆", 
				    51:"四川",52:"贵州",53:"云南",54:"西藏",61:"陕西",62:"甘肃", 
				    63:"青海",64:"宁夏",65:"新疆",71:"台湾",81:"香港",82:"澳门",91:"国外" 
				};
				let provinceCode = val.substring(0,2);
				if(vcity[provinceCode] != undefined){
				    return true
				}else{
				    return false
				}

			}
			if(!decide){
				callback(new Error('请输入正确的身份证号'));
			}else{
				callback ()
			}
		}else if(!value && rule.required){
			callback(new Error('身份证号不可为空'));
		}else{
			callback ()
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

 export default formValidate
