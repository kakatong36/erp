
<template>
  	<div id="accountManage" class="accountManage">
		<!-- <widgetHead :title="docTitle"></widgetHead> -->
		<div>
			<div id="main" class="mainCurrent" style="width:100rem;margin:auto;">
				<div class="memberInterest box" v-if="actions['memberInterests']">
					<div class="title">会员权益</div>
					<div class="my-grade">
						我的等级：<span>黄金会员（A级会员）</span>
					</div>
					<div class="carousel-grade">
						<div>
							<img src="../../assets/left.png" alt="" v-if="GradeList && GradeList.length>5">
						</div>
						<div class="carousel-center">
							<div class="overflow-box" :style="'width:'+160*(GradeList.length) + 20 + 'px;'">
								<div class="carouselItem" v-if="GradeList && GradeList.length>0" v-for="item in GradeList" :key="item.Id" :class="{active:gradeClick[item.Level]}" @click="handleClick(item.Level)">
									<span>{{item.LevelName}}</span>
									<span>{{item.Level}}</span>
								</div>
							</div>
						</div>
						<div>
							<img src="../../assets/right.png" alt="" v-if="GradeList && GradeList.length>5">
						</div>
					</div>
					<div class="interestInfo">
						<!-- <div class="AcqCondition">
							<div>获得条件</div>
							<div>{{showCondition}}</div>
						</div>
						<div class="interestState">权益说明</div> -->
						<!-- <div v-if="intertsList && intertsList.length" v-for="item in intertsList" :key="item.Id" class="interts-price">
							<div class="col-one">
								<div>{{item.CategoryName}}</div>
							</div>
							<div class="col-two">
								<div v-if="!item.OrderDiscount">
									<div class="cricle"></div>
									<div>基础工费整单打{{item.BasicWorkPrice}}折</div>
								</div>
								<div v-if="!item.OrderDiscount">
									<div class="cricle"></div>
									<div>其他工费整单打{{item.OtherPrice}}折</div>
								</div>
								<div v-if="!item.OrderDiscount">
									<div class="cricle"></div>
									<div>金料额每克减{{item.GoldPrice}}元</div>
								</div>
								<div v-if="item.OrderDiscount>0">
									<div class="cricle"></div>
									<div>整单打{{item.OrderDiscount}}折</div>
								</div>
							</div>
						</div> -->
					</div>
				</div>
			</div>
		</div>
  </div>
</template>

<script>
export default {
	name: 'accountManage',
 	components: {
 	},
	data () {
		return {
			docTitle: '账号管理',
			isClick: false,
			isDefaultClick: false,
			isInfoClick: false,
			showModal: false,
			showOptTips: false,
			optTips: "",
			confirmBtnList: [],
			currentPicture: "",
			title: "",
			isPlainCode: false,
			passFocus: false,
			descImgList: [],  //图片数组
			showCondition: "",
			gradeClick: {
				"A": true,
				"B": false,
				"C": false,
				"D": false,
				"E": false,
				"F": false,
				"G": false,
				"H": false
			},
			intertsList: [],
			GradeList: [
				{
					Level: "A",
					LevelName: "黄金会员",
					List: [
						{
							CategoryName: "钻石镶嵌",
							BasicWorkPrice: 5,
							OtherPrice: 3,
							GoldPrice: 12,
							OrderDiscount: 0
						},
						{
							CategoryName: "黄金",
							BasicWorkPrice: 5,
							OtherPrice: 3,
							GoldPrice: 12,
							OrderDiscount: 0
						},
						{
							CategoryName: "珍珠镶嵌",
							BasicWorkPrice: 5,
							OtherPrice: 3,
							GoldPrice: 12,
							OrderDiscount: 0
						}
					]
				},
				{
					Level: "B",
					LevelName: "黄金会员",
					List: [
						{
							CategoryName: "钻石镶嵌",
							BasicWorkPrice: 5,
							OtherPrice: 3,
							GoldPrice: 12,
							OrderDiscount: 0
						},
						{
							CategoryName: "黄金",
							BasicWorkPrice: 5,
							OtherPrice: 3,
							GoldPrice: 12,
							OrderDiscount: 0
						},
						{
							CategoryName: "珍珠镶嵌",
							BasicWorkPrice: 5,
							OtherPrice: 3,
							GoldPrice: 12,
							OrderDiscount: 0
						}
					]
				},
				{
					Level: "C",
					LevelName: "黄金会员",
					List: [
						{
							CategoryName: "钻石镶嵌",
							BasicWorkPrice: 5,
							OtherPrice: 3,
							GoldPrice: 12,
							OrderDiscount: 0
						},
						{
							CategoryName: "黄金",
							BasicWorkPrice: 5,
							OtherPrice: 3,
							GoldPrice: 12,
							OrderDiscount: 0
						},
						{
							CategoryName: "珍珠镶嵌",
							BasicWorkPrice: 5,
							OtherPrice: 3,
							GoldPrice: 12,
							OrderDiscount: 0
						}
					]
				},
				{
					Level: "D",
					LevelName: "黄金会员",
					List: [
						{
							CategoryName: "钻石镶嵌",
							BasicWorkPrice: 5,
							OtherPrice: 3,
							GoldPrice: 12,
							OrderDiscount: 0
						},
						{
							CategoryName: "黄金",
							BasicWorkPrice: 5,
							OtherPrice: 3,
							GoldPrice: 12,
							OrderDiscount: 0
						},
						{
							CategoryName: "珍珠镶嵌",
							BasicWorkPrice: 5,
							OtherPrice: 3,
							GoldPrice: 12,
							OrderDiscount: 0
						}
					]
				},
				{
					Level: "E",
					LevelName: "黄金会员",
					List: [
						{
							CategoryName: "钻石镶嵌",
							BasicWorkPrice: 5,
							OtherPrice: 3,
							GoldPrice: 12,
							OrderDiscount: 0
						},
						{
							CategoryName: "黄金",
							BasicWorkPrice: 5,
							OtherPrice: 3,
							GoldPrice: 12,
							OrderDiscount: 0
						},
						{
							CategoryName: "珍珠镶嵌",
							BasicWorkPrice: 5,
							OtherPrice: 3,
							GoldPrice: 12,
							OrderDiscount: 0
						}
					]
				},
				{
					Level: "F",
					LevelName: "黄金会员",
					List: [
						{
							CategoryName: "钻石镶嵌",
							BasicWorkPrice: 5,
							OtherPrice: 3,
							GoldPrice: 12,
							OrderDiscount: 0
						},
						{
							CategoryName: "黄金",
							BasicWorkPrice: 5,
							OtherPrice: 3,
							GoldPrice: 12,
							OrderDiscount: 0
						},
						{
							CategoryName: "珍珠镶嵌",
							BasicWorkPrice: 5,
							OtherPrice: 3,
							GoldPrice: 12,
							OrderDiscount: 0
						}
					]
				},
				{
					Level: "G",
					LevelName: "黄金会员",
					List: [
						{
							CategoryName: "钻石镶嵌",
							BasicWorkPrice: 5,
							OtherPrice: 3,
							GoldPrice: 12,
							OrderDiscount: 0
						},
						{
							CategoryName: "黄金",
							BasicWorkPrice: 5,
							OtherPrice: 3,
							GoldPrice: 12,
							OrderDiscount: 0
						},
						{
							CategoryName: "珍珠镶嵌",
							BasicWorkPrice: 5,
							OtherPrice: 3,
							GoldPrice: 12,
							OrderDiscount: 0
						}
					]
				},
				{
					Level: "H",
					LevelName: "黄金会员",
					List: [
						{
							CategoryName: "钻石镶嵌",
							BasicWorkPrice: 5,
							OtherPrice: 3,
							GoldPrice: 12,
							OrderDiscount: 0
						},
						{
							CategoryName: "黄金",
							BasicWorkPrice: 5,
							OtherPrice: 3,
							GoldPrice: 12,
							OrderDiscount: 0
						},
						{
							CategoryName: "珍珠镶嵌",
							BasicWorkPrice: 5,
							OtherPrice: 3,
							GoldPrice: 12,
							OrderDiscount: 0
						}
					]
				}
			],
			userNameView: "",
			titles: {
				"personalData": null,
				"safeSet": null,
				"memberInterests": null,
				"modifyPwd": "修改密码",
				"setUpAccent": "设置账号",
				"bingNum": "修改手机",
				"bingEmail": "设置邮箱"
			},
			actions: {
				"personalData": false,
				"memberInterests": true,
				"safeSet": false,
				"modifyPwd": false,
				"setUpAccent": false,
				"bingNum": false,
				"bingEmail": false
			},
			userInfo: Site.loginInfo,
			judgmentBind: {
				Account: '',
				Email: '',
				IsChangeAccount: false,
				Mobile: null,
				UserId: ''
			},
			/*弹窗提示 */
			messageTip: "",
			showConfirm: false,
			confirmImgClass: "confirm-success",
			showInfoModel: false,
			pager: {
				pageIndex: 1,
				pageSize: 15,
				total: 0
			},
			formData: {},
			personalInfo:{
				Id: "",
				PhotoId: "",
				NickName: "",
				RealName: "",
				Sex: 3,
				Province: "",
				City: "",
				Area: "",
				Address: "",
				regionElem: "省 市 区"
			},
			/*用户信息验证 */
			formValidate:{
				NickName: {
					label: "昵称",
					isNoNull: false,
					tipText: ""
				},
				RealName: {
					label: "真实姓名",
					isNoNull: false,
					tipText: ""
				},
				Sex: {
					label: "性别",
					isNoNull: false,
					tipText: ""
				},
				Birthday: {
					label: "生日",
					isNoNull: false,
					tipText: ""
				},
				regionElem: {
					label: "所在地区",
					isNoNull: false,
					tipText: ""
				},
				Address: {
					label: "详细地址",
					isNoNull: false,
					tipText: ""
				}
			},
			/*账号设置验证 */
			actionValidate:{
				PassWord: {
					label: "登录密码",
					isNoNull: false,
					tipText: "",
					isVia: false
				},
				newPassWord: {
					label: "新密码",
					isNoNull: false,
					tipText: "",
					isVia: false
				},
				Email: {
					label: "邮箱",
					isNoNull: false,
					tipText: "",
					isVia: false
				},
				PhoneNum: {
					label: "新手机号",
					isNoNull: false,
					tipText: "",
					isVia: false
				},
				Accent: {
					label: "新账号",
					isNoNull: false,
					tipText: "",
					isVia: false
				}
			},
			actionFormData: {
				PassWord: "",
				Email: "",
				newPassWord: "",
				PhoneNum: "",
				Accent: ""
			},
			isSaving: false,
			loading: false,
			timer: 4
		}
	},
	methods: {
		regionCallback(region){
			this.personalInfo.Province = region.province.value;
			this.personalInfo.City = region.city.value;
			this.personalInfo.Area = region.area.value;
			this.personalInfo.regionElem = `${region.province.value}  ${region.city.value}  ${region.area.value}`;
		},
		//图片上传
     	getCurrentPic(data, isSuccess){
			if(isSuccess){
				let Id = data.Id;	
				this.personalInfo.PhotoId = Id;  //用于传值
				this.currentPicture = Id;  //用于显示图片
				this.showOptTips = true;
				this.optTips = "上传成功";
			}else{
				this.showOptTips = true;
				this.optTips = data;
			}
     	},
		toLogin(){
			this.$router.push({
				name: "login"
			})
		},
		handleReset(obj){
			_.each(obj, (val,key) =>{
				obj[key] = null;
				if(key == "IsDefault" || key == "Sort"){
					obj[key] = 0;
				}
			})
		},
		returnRoad(){
			if(!this.actions['personalData']){
				//账号管理，点击可以返回
				this.changeView('safeSet');
			}
		},
		changeView(action){
			if (action == "safeSet" || action == "personalData" || action == "memberInterests"){
				this.title = null;
				this.handleClear()
			}
			this.actions[action] = true;
			if(this.titles[action]){
				this.title = this.titles[action];
			}
			_.each(this.actions, (value, key) =>{
				if(key != action){
					this.actions[key] = false
				}
			})
			//清空表单验证提醒
			_.each(this.formValidate, (value, key) =>{
				this.formValidate[key].isNoNull = false
				this.formValidate[key].tipText = null
			})

			if(action == "safeSet"){
				//判断账号的绑定情况
				this.getjudgmentBinding();
			}
		},
		getjudgmentBinding(){
			Site.get({
				url: Site.api.userCenter.getUserSafe
			}).done(res => {
				let data = res.data;
				if(res && res.code == 1001){
					this.judgmentBind = data;
				}
			}).fail(err => {
				this.showOptTips = true;
				this.optTips = err.message || "获取失败";
			})
		},
		nextStep(key){
			_.each(this.actionValidate, (value, key1) =>{
				if(key1 != key){
					this.actionValidate[key1].isNoNull = false;
					this.actionValidate[key1].tipText = null;
				}
			})
			if (!this.actionFormData[key]){
				this.actionValidate[key].isNoNull = true;
				this.actionValidate[key].tipText = this.actionValidate[key].label + "不可为空";
				return 
			}
			if(key == "PassWord"){	//确认密码
				Site.get({
					url: Site.api.userCenter.confirmPassword,
					data: {
						password: md5(this.actionFormData.PassWord)
					}
				}).done(res => {
					if(res && res.code == 1001 && res.data){	//返回1001，res.data为true
						this.actionValidate[key].isVia = true
					}else if(res && res.code == 1001 && !res.data){	//res.data为false
						this.actionValidate[key].isVia = false
						this.actionValidate[key].isNoNull = true;
						this.actionValidate[key].tipText = res.message || "密码错误!";
					}
				}).fail(err => {
					this.actionValidate[key].isVia = false
					this.actionValidate[key].isNoNull = true;
					this.actionValidate[key].tipText = err.message;
				})
			}else if(key == "PhoneNum"){
				//验证手机号
				let test = /^(\+)?(0|086|86|17951)?(13[0-9]|15[0-9]|17[0-9]|18[0-9]|14[5678]|19[89]|16[6])[0-9]{8}$/;
				if(!test.test(this.actionFormData.PhoneNum)){
					this.actionValidate[key].isNoNull = true;
					this.actionValidate[key].tipText = "请输入正确格式的手机号";
					return
				}
				Site.get({
					url: Site.api.userCenter.modifyMobile,
					data: {
						mobile: this.actionFormData.PhoneNum
					}
				}).done(res => {
					if(res && res.code == 1001 && res.data){	//返回1001，res.data为true
						this.actionValidate[key].isVia = true
					}else if(res && res.code == 1001 && !res.data){	//res.data为false
						this.actionValidate[key].isVia = false
						this.actionValidate[key].isNoNull = true;
						this.actionValidate[key].tipText = res.message;
					}
				}).fail(err => {
					this.actionValidate[key].isVia = false
					this.actionValidate[key].isNoNull = true;
					this.actionValidate[key].tipText = err.message;
				})
			}else if(key == "Accent"){
				Site.get({
					url: Site.api.userCenter.modifyAccount,
					data: {
						account: this.actionFormData.Accent
					}
				}).done(res => {
					if(res && res.code == 1001 && res.data){	//返回1001，res.data为true
						this.actionValidate[key].isVia = true
					}else if(res && res.code == 1001 && !res.data){	//res.data为false
						this.actionValidate[key].isVia = false
						this.actionValidate[key].isNoNull = true;
						this.actionValidate[key].tipText = res.message;
					}
				}).fail(err => {
					this.actionValidate[key].isVia = false
					this.actionValidate[key].isNoNull = true;
					this.actionValidate[key].tipText = err.message;
				})
			}else if(key == "newPassWord"){
				let test = /^(?=.*[0-9].*)(?=.*[A-Z].*)(?=.*[a-z].*).{7,}\w+$/
				if(!test.test(this.actionFormData.newPassWord)){
					this.actionValidate[key].isNoNull = true;
					this.actionValidate[key].tipText = "请设置一个包含数字和大小写字母，并且长度为6位以上的密码";
					return
				}
				Site.get({
					url: Site.api.userCenter.modifyOwnPwd,
					data: {
						pwd: md5(this.actionFormData.newPassWord)
					}
				}).done(res => {
					if(res && res.code == 1001 && res.data){	//返回1001，res.data为true
						this.actionValidate[key].isVia = true
						//修改密码完成，倒计时开始
						let that = this;
						countdown()
						function countdown() {
							if (that.timer > 1){
								that.timer--
								setTimeout(countdown, 1000)
							}else{
								setTimeout(() =>{
									that.toLogin();
								},1000)
							}
						}

					}else if(res && res.code == 1001 && !res.data){	//res.data为false
						this.actionValidate[key].isVia = false
						this.actionValidate[key].isNoNull = true;
						this.actionValidate[key].tipText = res.message;
					}
				}).fail(err => {
					this.actionValidate[key].isVia = false
					this.actionValidate[key].isNoNull = true;
					this.actionValidate[key].tipText = err.message;
				})
			}else if(key == "Email"){
				//验证邮箱
				let email = /\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/;
				if(!email.test(this.actionFormData.Email)){
					this.actionValidate[key].isNoNull = true;
					this.actionValidate[key].tipText = "请输入正确的邮箱地址";
					return
				}
				Site.get({
					url: Site.api.userCenter.modifyEmail,
					data: {
						email: this.actionFormData.Email
					}
				}).done(res => {
					if(res && res.code == 1001 && res.data){	//返回1001，res.data为true
						this.actionValidate[key].isVia = true
					}else if(res && res.code == 1001 && !res.data){	//res.data为false
						this.actionValidate[key].isVia = false
						this.actionValidate[key].isNoNull = true;
						this.actionValidate[key].tipText = res.message;
					}
				}).fail(err => {
					this.actionValidate[key].isVia = false
					this.actionValidate[key].isNoNull = true;
					this.actionValidate[key].tipText = err.message;
				})
			}
		},
		getActionValue(e,key){
			_.each(this.actionValidate, (val,key1) =>{
				if(key1 != key){
					this.actionValidate[key1].isNoNull = false;
					this.actionValidate[key].tipText = null;
				}
			})
			let value = e.target.value;
			if(!value){
				this.actionValidate[key].isNoNull = true;
				this.actionValidate[key].tipText = this.actionValidate[key].label + "不可为空";
			}else{
				this.actionValidate[key].isNoNull = false;
				this.actionValidate[key].tipText = null;
			}
		},
		handleSubmitInfo(){
			if(this.isSaving){
				return 
			}
			let personalInfo = _.extend({},this.personalInfo)
			let url;
			//验证拦截
			let flag = true;
			_.each(personalInfo, (value,key) =>{
				if(!value){
					if (this.formValidate[key]){
						this.formValidate[key]["isNoNull"] = true;
						this.formValidate[key]["tipText"] = this.formValidate[key]["label"] + "不可为空"
						flag = false;
					}
				}
			})
			if(!flag){
				this.isInfoClick = true;
				return false
			}
			if(personalInfo.Id){
				url = Site.api.personalData.modify;
			}
			this.isSaving = true
			Site.post({
				url: url,
				data: personalInfo
			}).done(res => {
				if(res && res.code == 1001){
					this.showConfirm = true;
					this.showInfoModel = false;
					this.isInfoClick = false;
					this.isSaving = false
					this.confirmBtnList = [];
					this.messageTip = res.message || "编辑成功！";
					this.confirmImgClass = "confirm-success"
					setTimeout(() =>{
						this.showConfirm = false;
						this.getUserInfo(false)
					},2000)
				}
			}).fail(err => {
				this.showConfirm = true;
				this.isInfoClick = false;
				this.isSaving = false
				this.confirmBtnList = [];
				this.messageTip = err.message || "编辑失败！";
				this.confirmImgClass = "confirm-warning"
				setTimeout(() =>{
					this.showConfirm = false;
				},2000)
			})
		},
		getUserInfo(isShow){
			this.showInfoModel = isShow;
			Site.get({
				url: Site.api.personalData.getByUserId
			}).done(res => {
				let data = res.data;
				if(data && data.Id){
					this.personalInfo = data;
					if(!data.Sex){
						this.personalInfo.Sex = 3;
					}
					if (data.Birthday && data.Birthday == "0001-01-01T00:00:00"){
						this.personalInfo.Birthday = null
					}else if(data.Birthday){
						let endDate = Site.globalize.format(new Date((data.Birthday).toString()),"yyyy-MM-dd");
						this.personalInfo.Birthday = endDate
					}
					if(data.PhotoId){
						this.currentPicture = data.PhotoId
					}
					//真实姓名展示
					this.userNameView = this.personalInfo.RealName;
					this.personalInfo.regionElem = `${this.personalInfo.Province} ${this.personalInfo.City} ${this.personalInfo.Area}`
				} 
			}).fail(err => {
				this.showOptTips = true;
				this.optTips = err.message || "获取失败";
				if(isShow){
					this.personalInfo = {};
				}
			})
		},
		getProvince(val,obj){
			if(val.code == undefined){
				//清空已选择值
				obj.Province = null;
				obj.City = null;
				obj.Area = null;
				this.personalInfo.regionElem = null;
				this.formValidate["regionElem"].isNoNull = true;
				this.formValidate["regionElem"].tipText = "所在地区不可为空"
			}else {
				this.personalInfo.Province = val.value;
				if (obj.City && obj.Area){
					this.formValidate["regionElem"].isNoNull = false;
					this.personalInfo.regionElem = val.value + obj.City + obj.Area;
					this.formValidate["regionElem"].tipText = null
				}
			}
		},
		getCity(val,obj){
			if(val.code == undefined){
				obj.City = null;
				this.personalInfo.regionElem = null;
				this.formValidate["regionElem"].isNoNull = true;
				this.formValidate["regionElem"].tipText = "所在地区不可为空"
			}else {
				this.personalInfo.City = val.value;
				if (obj.Province && obj.Area){
					this.formValidate["regionElem"].isNoNull = false;
					this.personalInfo.regionElem = obj.Province + val.value + obj.Area;
					this.formValidate["regionElem"].tipText = null
				}
			}
		},
		getArea(val,obj){
			if(val.code == undefined){
				obj.Area = null;
				this.personalInfo.regionElem = null;
				this.formValidate["regionElem"].isNoNull = true;
				this.formValidate["regionElem"].tipText = "所在地区不可为空"
			}else {
				this.personalInfo.Area = val.value;
				if (obj.City && obj.Province){
					this.formValidate["regionElem"].isNoNull = false;
					this.personalInfo.regionElem = obj.Province + obj.City + val.value;
					this.formValidate["regionElem"].tipText = null
				}
			}
		},
		userInfoValChange(key, e){
			let value = e.target.value;  
			if (value){
				this.formValidate[key]["isNoNull"] = false;
				this.formValidate[key]["tipText"] = null
			}else{
				this.formValidate[key]["isNoNull"] = true;
				this.formValidate[key]["tipText"] = this.formValidate[key]["label"] + "不可为空"
			}

		},
		handleClear(){
			//清空当前页面的操作
			_.each(this.actions, (value, key) =>{
				this.actions[key] = false;
			})
			_.each(this.actionValidate, (value, key) =>{
				this.actionValidate[key].isNoNull = false;
				this.actionValidate[key].isVia = false;
				this.actionValidate[key].tipText = null;
			})
			//清空表单里面的值
			this.actionFormData = {
				PassWord: null,
				Email: null,
				newPassWord: null,
				PhoneNum: null,
				Accent: null
			}
		},
		toUserCenter(){
			this.handleClear()
			this.$router.push({
				name: "userCenter"
			})
			//清空标签页切换判断
			this.actions['personalData'] = true;
		},
		getGradeDropList(){
			this.GradeList = []
			Site.get({
				url: Site.api.userCenter.dropList
			}).done( res =>{
				if(res && res.code == 1001){
					let data = res.data
					if(data){
						this.GradeList = data
						_.each(this.GradeList, (item,index) =>{
							this.gradeClick[item.Level] = false
							if(index == 0){
								this.gradeClick[item.Level] = true
								this.handleClick(item.Level)
							}
						})
					}
				}
			}).fail( err =>{
				this.GradeList = []
			})
		},
		handleClick(level){
			_.each(this.gradeClick, (isClick, key) =>{
				if(key == level){
					this.gradeClick[level] = true
				}else{
					this.gradeClick[key] = false
				}
			})
			_.each(this.GradeList, item =>{
				if(item.Level == level){
					this.intertsList = item.List;
					this.showCondition = item.Conditions
				}
			})
		}
	},
	filters: {
		getEncryptyName(val){
			let len = val.length;
			let endName = "";
			if(len == 2){
				endName = val[0] + "*"
			}else if(len == 3){
				endName = val[0] + "**"
			}else if (len > 3){
				endName = val[0] + val[1] + "**"
			}
			return endName
		},
		getEncryptionPhone(val){
			let endName = "";
			if (val){
				let len = val.length;
				if (len == 11){		//11位手机号
					endName = val.substring(0,3) + "****" + val.substring(7,11)
				}
			}else{
				endName = ""
			}
			return endName
		}
	},
	created () {
		// this.getUserInfo(true);
		// this.getGradeDropList()
	},
	mounted(){
		
	}
}
</script>

<style lang="scss">

.memberInterest{
	width: 80%;
	border: 1px solid red;
	margin-bottom: 4rem;
	.my-grade{
		margin-left: 1.6rem;
		margin-bottom: 2rem;
	}
	.carousel-grade{
		height: 11.71rem;
		display: flex;
		justify-content: space-between;
		// align-items: center;
		line-height: 11.71rem;
		margin: 0 11.36rem 4.93rem 6.57rem;
		border: 1px solid red;
		&>div{
			display: inline-block;
		}
		// &>div:first-child{
		// 	float: left;
		// }
		// &>div:last-child{
		// 	float: right;
		// }
		&>div>img,
		.carousel-center .carouselItem{
			cursor: pointer;
		} 
		.carousel-center{
			flex: 1;
			// width: 800px;
			height: 100%;
			margin: 0 2.14rem;
			overflow: auto;
			border: 1px solid blue;
				.overflow-box{
					// width: 100%;
					height: 100%;
					.carouselItem{
						display: inline-block;
						width: 160px;
						height: 128px;
						line-height: 128px;
						text-align: center;
						margin: 10px auto 26px;
						border: 1px solid gray;
						span{
							height: 25px;
							color: #333333;
							text-align: center;
							&:first-child{
								font-weight: bold;
							}
							&:last-child{
								font-size: 12px;
							}
						}
						&.active{
							width: 180px;
							height: 164px;
							line-height: 164px;
							margin: 0;
							border: 1px solid red;
							background-size: 100% 100%;
							background: url("../../assets/active.png");
							span{
								color: #FFFFFF;
							}
						}
					}
				}
		}
		.carousel-center::-webkit-scrollbar{  //清空滚动条
			width: 0;
			height: 0;
			background-color: none;
		}
	}
	.interestInfo{
		margin-left: 10.57rem;
		margin-bottom: 15rem;
		.AcqCondition{
			font-size: 14px;
			color: #333333;
			div:first-child{
				margin-bottom: 0.71rem;
				font-weight: bold;
			}
		}
		.interestState{
			font-weight: bold;
			margin: 1.43rem auto 0.71rem;
		}
		.interts-price{
			display: flex;
			height: 8.57rem;
			justify-content: flex-start;
			align-items: flex-start;
			margin-bottom: 0.71rem;
			margin-right: 15.07rem; 
			&>div{
				height: 100%;
				&.col-one{
					width: 11.43rem;
					line-height: 8.57rem;
					text-align: center;
					border: 1px solid #E5E5E5;
				}
				&.col-two{
					border: 1px solid #E5E5E5;
					border-left: none;
					display: flex;
					flex: 1;
					flex-direction: column;
					&>div{
						display: flex;
						align-items: center;
						margin-left: 1.43rem;
						margin-bottom: 0.64rem;
					}
					&>div:first-child{
						margin-top: 1.43rem;
					}
					.cricle{
						width: 1.14rem;
						height: 1.14rem;
						background: #D95D5E;
						display: inline-block;
						border-radius: 0.57rem;
						margin-right: 0.71rem;
					}
				}
			}
		}
	}
}
</style>