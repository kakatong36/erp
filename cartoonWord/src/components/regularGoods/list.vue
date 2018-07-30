<template>
	<div class="regularGoods">
		<h2 class="title">活动规则商品列表<sub>共100款</sub></h2>
		<div class="list">
			<!-- 循环体 :style="(index1+1)%2==0?'float:right;':'float:left;'"-->
			<div class="list-item" v-for="item in list" :key="item.Id">
				<div class="style-info">
					<img v-if="item.MainImg" :src="imgUrl+item.MainImg+'_0x0'" alt="">
					<p>{{item.StyleName}}</p>
					<p>{{item.StyleNumber}}</p>
				</div>
				<div class="table">
						<div class="fixed-header">
							<div>发起人</div>
							<div class="width-num">发起拼单时间</div>
							<div class="width-num">拼单结束时间</div>
							<div>拼单总件数</div>
						</div>
					<div class="table-item">
						<div class="overflow-center">
							<div v-if="item.activityList && item.activityList.length" v-for="(actItem,index) in item.activityList" :key="index" class="row-data">
								<div>{{actItem.CreateUserAccount}}</div>
								<div class="width-num">{{actItem.CreateDate}}</div>
								<div class="width-num">{{actItem.EndDate}}</div>
								<div>{{actItem.SubTotalBuyQuantity}}</div>
							</div>
						</div>
					</div>
						<div class="fixed-footer">
							<div colspan="3" class="float-both">
								<span>当前活动状态：{{item.CurrentActivityStatus}}</span>
								<span class="total-name">总计</span>
							</div>
							<div>{{item.TotalBuyQuantity}}件</div>
						</div>
				</div>
			</div>
		</div>
		<!-- <Page 
			@on-change="pageChange" 
			@on-page-size-change="pageSizeChange" 
			:current="pager.pageIndex" 
			:page-size="pager.pageSize" 
			:total="pager.total" 
			:page-size-opts="[10, 1, 15, 20, 30, 40]" 
			placement="top" show-sizer show-elevator show-total>
		</Page> -->
	</div>
</template>

<script>
// import m_auth from '@/../mixins/auth'

export default {
	name: 'regularGoods',
	// mixins: [m_auth],
	created () {

	},
	mounted () {

	},
	activated () {
		let id = this.$route.params.id
		if(id && id != this.formData.activityRuleId){
			this.formData.activityRuleId = id
			// this.getList(this.formData)
		}
	},
	data () {
		return {
			date: [],
			formData: {
				activityRuleId: ""
			},
			imgUrl: Site.api.upfileBaseUrl,
			list: [
				{
					"StyleName":"kuanming1",
					"StyleNumber":"kuanshao1",
					"MainImg":"d7d798bb-cb83-4270-b40a-c009b2a0c62c",
					"activityList":[{
							"CreateUserAccount": "账号123456",
							"CreateDate": "2018-07-09",
							"EndDate": "2018-12-31",
							"SubTotalBuyQuantity": 20156
						},
						{
							"CreateUserAccount": "账号123456",
							"CreateDate": "2018-07-09",
							"EndDate": "2018-12-31",
							"SubTotalBuyQuantity": 20156
						},
						{
							"CreateUserAccount": "账号123456",
							"CreateDate": "2018-07-09",
							"EndDate": "2018-12-31",
							"SubTotalBuyQuantity": 20156
						},
						{
							"CreateUserAccount": "账号123456",
							"CreateDate": "2018-07-09",
							"EndDate": "2018-12-31",
							"SubTotalBuyQuantity": 20156
						},
						{
							"CreateUserAccount": "账号123456",
							"CreateDate": "2018-07-09",
							"EndDate": "2018-12-31",
							"SubTotalBuyQuantity": 20156
						},
						{
							"CreateUserAccount": "账号123456",
							"CreateDate": "2018-07-09",
							"EndDate": "2018-12-31",
							"SubTotalBuyQuantity": 20156
						},
						{
							"CreateUserAccount": "账号123456",
							"CreateDate": "2018-07-09",
							"EndDate": "2018-12-31",
							"SubTotalBuyQuantity": 20156
						},
						{
							"CreateUserAccount": "账号123456",
							"CreateDate": "2018-07-09",
							"EndDate": "2018-12-31",
							"SubTotalBuyQuantity": 20156
						},
						{
							"CreateUserAccount": "账号123456",
							"CreateDate": "2018-07-09",
							"EndDate": "2018-12-31",
							"SubTotalBuyQuantity": 20156
						}
					],
					"TotalBuyQuantity":0,
					"CurrentActivityStatus":"活动未发起"
				},
				{
					"StyleName":"test44",
					"StyleNumber":"test66",
					"MainImg":"d7d798bb-cb83-4270-b40a-c009b2a0c62c",
					"activityList":[
						{
							"CreateUserAccount": "小红123456",
							"CreateDate": "2018-07-09",
							"EndDate": "2018-12-31",
							"SubTotalBuyQuantity": 20156
						},
						{
							"CreateUserAccount": "小红123456",
							"CreateDate": "2018-07-09",
							"EndDate": "2018-12-31",
							"SubTotalBuyQuantity": 20156
						},
						{
							"CreateUserAccount": "小红123456",
							"CreateDate": "2018-07-09",
							"EndDate": "2018-12-31",
							"SubTotalBuyQuantity": 20156
						}
					],
					"TotalBuyQuantity":0,
					"CurrentActivityStatus":"活动未发起"
				},
				{
					"StyleName":"test44",
					"StyleNumber":"test66",
					"MainImg":"d7d798bb-cb83-4270-b40a-c009b2a0c62c",
					"activityList":[
						{
							"CreateUserAccount": "小红123456",
							"CreateDate": "2018-07-09",
							"EndDate": "2018-12-31",
							"SubTotalBuyQuantity": 20156
						},
						{
							"CreateUserAccount": "小红123456",
							"CreateDate": "2018-07-09",
							"EndDate": "2018-12-31",
							"SubTotalBuyQuantity": 20156
						},
						{
							"CreateUserAccount": "小红123456",
							"CreateDate": "2018-07-09",
							"EndDate": "2018-12-31",
							"SubTotalBuyQuantity": 20156
						}
					],
					"TotalBuyQuantity":0,
					"CurrentActivityStatus":"活动未发起"
				},
				{
					"StyleName":"test44",
					"StyleNumber":"test66",
					"MainImg":"d7d798bb-cb83-4270-b40a-c009b2a0c62c",
					"activityList":[
						{
							"CreateUserAccount": "小红123456",
							"CreateDate": "2018-07-09",
							"EndDate": "2018-12-31",
							"SubTotalBuyQuantity": 20156
						},
						{
							"CreateUserAccount": "小红123456",
							"CreateDate": "2018-07-09",
							"EndDate": "2018-12-31",
							"SubTotalBuyQuantity": 20156
						},
						{
							"CreateUserAccount": "小红123456",
							"CreateDate": "2018-07-09",
							"EndDate": "2018-12-31",
							"SubTotalBuyQuantity": 20156
						}
					],
					"TotalBuyQuantity":0,
					"CurrentActivityStatus":"活动未发起"
				},
				{
					"StyleName":"test44",
					"StyleNumber":"test66",
					"MainImg":"d7d798bb-cb83-4270-b40a-c009b2a0c62c",
					"activityList":[
						{
							"CreateUserAccount": "小红123456",
							"CreateDate": "2018-07-09",
							"EndDate": "2018-12-31",
							"SubTotalBuyQuantity": 20156
						},
						{
							"CreateUserAccount": "小红123456",
							"CreateDate": "2018-07-09",
							"EndDate": "2018-12-31",
							"SubTotalBuyQuantity": 20156
						},
						{
							"CreateUserAccount": "小红123456",
							"CreateDate": "2018-07-09",
							"EndDate": "2018-12-31",
							"SubTotalBuyQuantity": 20156
						}
					],
					"TotalBuyQuantity":0,
					"CurrentActivityStatus":"活动未发起"
				},
				{
					"StyleName":"test44",
					"StyleNumber":"test66",
					"MainImg":"d7d798bb-cb83-4270-b40a-c009b2a0c62c",
					"activityList":[
						{
							"CreateUserAccount": "小红123456",
							"CreateDate": "2018-07-09",
							"EndDate": "2018-12-31",
							"SubTotalBuyQuantity": 20156
						},
						{
							"CreateUserAccount": "小红123456",
							"CreateDate": "2018-07-09",
							"EndDate": "2018-12-31",
							"SubTotalBuyQuantity": 20156
						},
						{
							"CreateUserAccount": "小红123456",
							"CreateDate": "2018-07-09",
							"EndDate": "2018-12-31",
							"SubTotalBuyQuantity": 20156
						}
					],
					"TotalBuyQuantity":0,
					"CurrentActivityStatus":"活动未发起"
				},
				{
					"StyleName":"test44",
					"StyleNumber":"test66",
					"MainImg":"d7d798bb-cb83-4270-b40a-c009b2a0c62c",
					"activityList":[
						{
							"CreateUserAccount": "小红123456",
							"CreateDate": "2018-07-09",
							"EndDate": "2018-12-31",
							"SubTotalBuyQuantity": 20156
						},
						{
							"CreateUserAccount": "小红123456",
							"CreateDate": "2018-07-09",
							"EndDate": "2018-12-31",
							"SubTotalBuyQuantity": 20156
						},
						{
							"CreateUserAccount": "小红123456",
							"CreateDate": "2018-07-09",
							"EndDate": "2018-12-31",
							"SubTotalBuyQuantity": 20156
						}
					],
					"TotalBuyQuantity":0,
					"CurrentActivityStatus":"活动未发起"
				},
				{
					"StyleName":"test44",
					"StyleNumber":"test66",
					"MainImg":"d7d798bb-cb83-4270-b40a-c009b2a0c62c",
					"activityList":[
						{
							"CreateUserAccount": "小红123456",
							"CreateDate": "2018-07-09",
							"EndDate": "2018-12-31",
							"SubTotalBuyQuantity": 20156
						},
						{
							"CreateUserAccount": "小红123456",
							"CreateDate": "2018-07-09",
							"EndDate": "2018-12-31",
							"SubTotalBuyQuantity": 20156
						},
						{
							"CreateUserAccount": "小红123456",
							"CreateDate": "2018-07-09",
							"EndDate": "2018-12-31",
							"SubTotalBuyQuantity": 20156
						}
					],
					"TotalBuyQuantity":0,
					"CurrentActivityStatus":"活动未发起"
				}
			],
			roleList:[],
			pager: {
				pageIndex: 1,
				pageSize: 10,
				total: 0
			}
		}
	},
	watch: {
		// list: function(newValue){
		// 	this.$refs.jqTable.updata(newValue)
		// }
	},
	methods: {
		pageChange (currentPage) {
			this.search(currentPage)
		},
		pageSizeChange (pageSize) {
            this.pager.pageSize = pageSize
			this.search()
		},
		search (pageIndex) {
			let formData = _.extend({}, this.formData);
			_.each(formData, (value,key) =>{
				if(!value){
					delete formData[key]
				}
			})
			this.pager.pageIndex = pageIndex > 0 ? pageIndex : 1;
			this.getList(formData);
		},
		getList (formData) {
			let myFormData = formData || {};
			_.extend(myFormData, this.pager);
			delete myFormData.total;
			Site.get({
				url: Site.api.regularGoods.getPageList,
				data: myFormData
			}).done( res => {
				let data = res.data,
					list = [];
				if(data){
					if(_.isArray(data.data_list)){
						list = data.data_list;
						this.pager = {
							pageIndex: data.page,
							pageSize: data.page_size,
							total: data.total_count
						}
					}else if(_.isArray(data))
						list = data;
				}else{
					list = [];
					this.pager.total = 0;
				}
				this.list = list;
			}).fail( err => {
				this.$Message.error(err.message)
				this.list = []
				this.pager.total = 0
			});
		}
	}
}


</script>

<style lang="scss">
.regularGoods{
		padding: 16px !important;
		// overflow: hidden !important;
		padding-bottom: 30px !important;
		.title{
			margin: 10px;
			sub{
				padding-left: 2rem;
			}
		}
		.list{
			margin-top: 2rem;
			.list-item{
				width: 800px;
				height: 250px;
				margin: 0 7rem 2rem 0;
				display: inline-block;
				.style-info{
					width: 30%;
					text-align: center;
					float: left;
					img{
						width: 100%;
					}
				}
				.table{
					width: 70%;
					height: 100% !important;
					line-height: 100%;
					text-align: center;
					position: relative;
					display: inline-block;
					border: 1px solid red;
						.fixed-header{
							width: 96.8%;
							height: 30px !important;
							line-height: 30px;
							border: 1px solid blue;
							background: rgb(255,255,255);
							position: absolute;
							top: 0px;
							display: flex;
							justify-content: space-between;
							div{
								flex: 1;
								display: inline-block;
								width: 8.2rem;
								border-left: 1px solid #dddee1;
							}
						}
						.fixed-footer{
							width: 96.8%;
							line-height: 30px;
							height: 30px !important;
							border: 1px solid green;
							background: rgb(255,255,255);
							position: absolute;
							bottom: 0;
						}
					.table-item{
						width: 100% !important;
						height: 100% !important;
						float: right;
						overflow-y: auto;
						text-align: center;
						// border-collapse: collapse;
						// border: 1px solid red;
						&>div{
							width: 100%;
							&.overflow-center{
								height: 100%;
								// margin-top: 30px;		
								// border-left: 1px solid red;
								// border-right: 1px solid red;
								.row-data:first-child{
									margin-top: 30px;
								}
								.row-data{
									display: flex;
									justify-content: space-between;
									// display: block;
									height: 30px !important;
									line-height: 30px;
									div{
										width: 8.2rem;
										height: 100%;
										flex: 1;
										display: inline-block;
										border-right: 1px solid blue;
										border-bottom: 1px solid blue;
									}
								}
							}
							&>div{
								height: 100%;
								display: inline-block;
								border-bottom: none;
								&.width-num{
									// width: 10rem;
								}
							}
							.float-both{
								text-align: left;
								span{
									padding: 0 10px;
								}
								.total-name{
									float: right;
								}
							}
						}
					}
				}
			}
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
}
</style>
