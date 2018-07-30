<template>
	<div class="discountManage">
		<div class="filter">
			<Form ref="form" :model="formData" :label-width="100" inline onsubmit="return false">
				<FormItem label="会员名称">
					<Input v-model.trim="formData.categoryName"  />
				</FormItem>
			</Form>
			<div class="btns">
				<Button type="ghost" @click="search">查询</Button>
			</div>
		</div>
		<div class="operateWrap">
			<Button type="primary" @click="isEdit=true">编辑</Button>
			<Button type="ghost" @click="handleSave" v-if="isEdit">保存</Button>
			<Button type="ghost">查看所属会员</Button>
		</div>
		<!-- 内容 -->
		<Row class="row-total">
			<Col span="2" class="center">
				普通会员
			</Col>
			<Col span="2" class="center">
				A级
			</Col>
			<Col span="12" class="flex-col">
				<div class="categroy-list" v-if="categroyList && categroyList.length">
					<div v-for="(item,index) in categroyList" :key="item.Id" v-if="index<3" class="cateItem" @click="handleClick(item.Id)">
						<Checkbox v-model="single"></Checkbox>
						<span>{{item.Name}}</span>
					</div>
				</div>
				<div class="categroy-list" v-if="categroyList && categroyList.length">
					<div v-for="(item,index) in categroyList" :key="item.Id" v-if="(index>2 && index<6)" class="cateItem" @click="handleClick(item.Id)">
						<Checkbox v-model="single"></Checkbox>
						<span>{{item.Name}}</span>
					</div>
				</div>
				<div v-if="categroyList && categroyList.length==0" class="categroy-list tips-text">
					<div>暂无数据</div>
					<div>请点击编辑</div>
				</div>
			</Col>
			<Col span="8">
				<h2 class="title">{{categoryName}} {{level}} A级折扣权益</h2>
				<Form ref="priceForm" :model="priceFormData" label-position="left" :label-width="100" inline onsubmit="return false">
					<FormItem label="首次起订量">
						<Input v-model="priceFormData.FirstNumber" v-if="isEdit" />
						<span v-if="!isEdit">{{priceFormData.FirstNumber}}</span>
					</FormItem>
					<FormItem label="后续起订量">
						<Input v-model="priceFormData.FollowUpNumber" v-if="isEdit" />
						<span v-if="!isEdit">{{priceFormData.FollowUpNumber}}</span>
					</FormItem>
					<FormItem label="基础工费">
						<Input v-model="priceFormData.BasicWorkPrice" v-if="isEdit" />
						<span v-if="!isEdit">{{priceFormData.BasicWorkPrice}}</span>&nbsp;折
					</FormItem>
					<FormItem label="其他工费">
						<Input v-model="priceFormData.OtherPrice" v-if="isEdit" />
						<span v-if="!isEdit">{{priceFormData.OtherPrice}}</span>&nbsp;折
					</FormItem>
					<FormItem label="金料额">
						每克减
						<Input v-model="priceFormData.GoldPrice" v-if="isEdit" />
						<span v-if="!isEdit">{{priceFormData.GoldPrice}}</span>&nbsp;元
					</FormItem>
				</Form>
				<div class="submit-btn">
					<Button type="primary" @click="handleSubmit('form')">提交</Button>
				</div>
			</Col>
		</Row>
	</div>
</template>

<script>
// import m_auth from '@/../mixins/auth'

export default {
	name: 'discountManage',
	// mixins: [m_auth],
	data () {
		return {
			date: [],
			isEdit: false,
			single: false,
			formData: {
				categoryName: "",
				levelId: ""
			},
			priceFormData: {
				CategoryId: "",
				FirstNumber: 0,
				FollowUpNumber: 0,
				BasicWorkPrice: 0,
				OtherPrice: 0,
				GoldPrice: 0
			},
			categroyList: [],
			categoryName: "",
			clickCategoryId: "",
			level: "",
			levelName: "",
			GradeList: [],
			discountPrice: {}
		}
	},
	methods: {
		search () {
			let formData = _.extend({}, this.formData);
			_.each(formData, (value,key) =>{
				if(!value){
					delete formData[key]
				}
			})
			this.getList(formData);
		},
		getList (formData) {
			let myFormData = formData || {};
			Site.get({
				url: Site.api.levelDiscount.getList,
				data: myFormData
			}).done( res => {
				let data = res.data;
				this.discountPrice = {}
					console.log(data)
					if(data){
						_.each(data, (item,index) =>{
							//处理会员等级的
							/*if(this.GradeList && this.GradeList.length>0){
								_.each(this.GradeList, item =>{
									if(item.Id == data.LevelId){
										this.level = item.Level
									}
								})
							}*/
							if(!this.discountPrice[item.CategoryId]){
								this.discountPrice[item.CategoryId] = item;
							}
							if(index == 0){
								this.handleClick(item.CategoryId)
							}
						})
					}
			}).fail( err => {
				this.discountPrice = {}
				this.$Message.error(err.message)
			});
		},
		handleSubmit(){

		},
		handleSave(){
			this.isEdit = false
		},
		handleClick(categroyId){
			this.clickCategoryId = categroyId;
			_.each(this.categroyList, item =>{
				if(item.Id == categroyId){
					this.categoryName = item.Name
				}
			})
			if (this.discountPrice[categroyId]){
				console.log("已存在")
				this.priceFormData = this.discountPrice[categroyId];
			}else{
				this.priceFormData = {}
			}
			console.log(categroyId)
		},
		getCategroyList(){
			Site.get({
				url: Site.api.levelDiscount.getCateList
			}).done( res =>{
				if(res && res.code == 1001){
					let data = res.data
					this.categroyList = []
					if(data){
						_.each(data, item =>{
							if(item.CategoryName != "需石种类" && item.CategoryName != "主石分类" && item.CategoryName != "产品分类"){
								this.categroyList.push({
									Id: item.Id,
									Name: item.CategoryName
								})
							}
						})
					}
				}
			}).fail( err =>{
				this.categroyList = []
			})
		},
		getGradeList(){
			Site.get({
				url: Site.api.memberLevel.dropList
			}).done( res =>{
				this.GradeList = []
				if(res && res.code == 1001){
					let data = res.data
					if(data){
						this.GradeList = data
					}
				}
			}).fail( err =>{
				this.GradeList = []
				this.$Message.error(err.message)
			})
		}
	},
	created () {
		// this.getCategroyList()
		// this.getGradeList()
	},
	mounted () {

	},
	activated () {
		let id = this.$route.params.levelId
		this.formData.levelId = "08892cc3-62e5-458b-b42b-7fd0bff1a87d";
		// this.getList(this.formData)
	}
}

</script>

<style lang="scss">
.discountManage{
		padding: 16px !important;
		overflow: hidden !important;
		padding-bottom: 30px !important;
		.fullheight{
			height: 100%;
			position: relative;
			padding-bottom: 50px !important;
			margin: 10px 0 !important;
			-webkit-box-shadow: 0 0 5px rgba(0, 0, 0, 0.2);
			box-shadow: 0 0 5px rgba(0, 0, 0, 0.2);
			overflow: hidden !important;
			.content-wrapper{
				position: absolute;
				top:16px;
				left:16px;
				right: 16px;
				bottom: 50px;
				overflow-x: hidden;
				overflow-y: auto;
			}
			.ivu-card-body{
				border: none !important;
			}
			.form-wrapper{
				min-height: 100px;
			}
		}
		.ListfullHeight{
			height: 100%;
			position: relative;
			padding: 16px;
			margin: 10px 0 !important;
			-webkit-box-shadow: 0 0 5px rgba(0, 0, 0, 0.2);
			box-shadow: 0 0 5px rgba(0, 0, 0, 0.2);
			overflow: auto !important;
		}
		.fullheight:hover{
			height: 100%;
			position: relative;
			padding-bottom: 50px !important;
			margin: 10px 0 !important;
			-webkit-box-shadow: 0 0 5px rgba(0, 0, 0, 0.2) !important;
			box-shadow: 0 0 5px rgba(0, 0, 0, 0.2) !important;
		}
	.filter{
		display: flex;
		margin-bottom: 15px;
		padding-top: 15px;
		border: 1px solid #dddee1;
		.ivu-form{
			flex: 1;
		}
		.btns{
			margin-right: 15px;
			align-self: flex-start;
		}
	}
	.operateWrap{
		margin-bottom: 15px;
	}
	.tableWrap{
		flex:1;
		margin-bottom: 15px;
		min-height: 400px;
		.jqTable{
			margin-bottom: 0;
		}
	}
	.ivu-form-item-content{
		width: 150px;
	}
	.jqTable{
		button{
			&.ivu-btn.ivu-btn-text{
				border: none;
				box-shadow: none;
			}
		}
	}
	.row-total{
		height: 270px;
		.ivu-col{
			height: 100%;
			border: 1px solid #dddee1;
			&.flex-col{
				display: flex;
				flex-direction: column;
				align-content: center;
			}
			.categroy-list{
				margin: auto;
				width: 90%;
				display: flex;
				text-align: center;
				justify-content: space-between;
				.cateItem{
					width: 10rem;
					padding: 1.5rem;
					cursor: pointer;
					background: #F2F2F2;
					&.active{
						background: #EB497A;
					}
				}
				&.tips-text{
					color: #bbbec4;
					text-align: center;
					flex-direction: column;
					align-content: center;
				}
			}
			.title{
				padding: 10px 20px;
			}
			.ivu-form{
				margin-left: 20px;
				.ivu-input-wrapper{
					width: 50px !important;
					.ivu-input{
						height: 28px !important;
					}
				}
			}
			.submit-btn{
				margin: 0 20px;
				text-align: right;
			}
		}
		.center{
			text-align: center;
			line-height: 270px;
		}
	}
}
</style>
