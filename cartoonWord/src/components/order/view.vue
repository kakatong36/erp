<template>
	<div class="orderView">
		<div class="operateWrap">
			<Button type="primary">查看需石单</Button>
			<Button type="primary" @click="getOrderSummary">查看订单汇总</Button>
			<Button type="primary" @click="handleChangeStatus" v-if="formData.OrderStatus != 40100 && formData.OrderStatus != 40104 && formData.OrderStatus != 40105 && formData.OrderStatus != 40106">更改订单状态</Button>
			<Button type="primary">查看送石明细</Button>
			<Button type="primary">添加送石单</Button>
			<Button type="primary">添加出货单</Button>
			<Button type="primary" v-if="isBreakeOver" @click="toChildOrderView">查看子订单详情</Button>
		</div>
		<div class="orderTable">
			<h2>基本信息</h2>
			<Row>
				<Col span="4">
					<span>订单编号：{{basicFormData.OrderNo}}</span>
				</Col>
				<Col span="4">
					<span>订单状态：{{basicFormData.OrderStatusName}}</span>
					<span class="m-left clickAble" @click="getOrderUpdate">查看订单更新记录</span>
				</Col>
			</Row>
			<Row>
				<Col span="4">
					<span>总件数：{{basicFormData.Quantity}}件</span>
					<span class="m-left">总金额：{{basicFormData.TotalAmount}}</span>
				</Col>
				<Col span="4">
					<span>拆分情况：{{basicFormData.SplitCount>0?"已拆分"+basicFormData.SplitCount+"张子订单":"未拆分"}}</span>
				</Col>
			</Row>
			<Row>
				<Col span="4">
					<span>联系人：{{basicFormData.ContactPerson}}</span>
				</Col>
				<Col span="4">
					<span>联系电话：{{basicFormData.ContactTel}}</span>
				</Col>
				<Col span="10">
					<span>收货地址：{{basicFormData.DeliveryAddress}}</span>
				</Col>
			</Row>
			<Row>
				<Col span="4">
					<span>配石方式：{{basicFormData.StoneModeName}}</span>
				</Col>
				<Col span="4">
					<span>结价方式：{{basicFormData.PriceTypeName}}</span>
				</Col>
				<Col span="4">
					<span>字印要求：{{basicFormData.WordsPrint?basicFormData.WordsPrint:"无"}}</span>
				</Col>
			</Row>
			<Row>
				<Col>
					<span span="12">订单总备注：{{basicFormData.Remark?basicFormData.Remark:"无"}}</span>
				</Col>
			</Row>
			<!-- <jqTable ref="orderTable"></jqTable> -->
		</div>

		
		<div class="orderDatetial">
			<h2>订单明细</h2>
			<!-- 选项卡 -->
			 <Tabs :animated="false" v-model="chiOrderForm.pCategoryId">
				<TabPane v-for="(item,index) in categoryNameList" :key="index" :label="item.Name" :name="item.Id"></TabPane>
			</Tabs>
			<jqTable ref="orderDetailsTable"></jqTable>
			<div class="table">
				<div class="tr">
					<div class="th" v-for="item in page.detailsTableModel" :key=""></div>
				</div>
			</div>
			<Page 
				@on-change="pageChange" 
				@on-page-size-change="pageSizeChange" 
				:current="pager.pageIndex" 
				:page-size="pager.pageSize" 
				:total="pager.total" 
				:page-size-opts="[10, 15, 20, 30, 40]" 
				placement="top" show-sizer show-elevator show-total>
			</Page>

		</div>
		<Modal 
			title="订单汇总"
			v-model="isShow"
			:width="(conditionList.length+2)*140">
				<div class="modalPro modleFixed">
					<div class="modalContent">
						<div class="model-body">
							<div class="model-thead">
								<div class="grid-title">
									<div class="class-name">品类</div>
									<div class="condition">成色</div>
									<div class="seg-line"></div>
								</div>
								<div>小计</div>
								<div v-for="(item, index) in conditionList" :key="index">{{item}}</div>
							</div>
							<div v-for="(item, index) in cateStaticsList" :key="index">
								<div class="model-total">
									<div class="font-weight-bold color-primary">{{item.CategoryName}} （共{{item.TotalQuantity}}件）</div>
								</div>
								<div class="model-tbody">
									<div class="model-tr" v-for="(det, detIndex) in item.DetailList" :key="detIndex" v-if="det.Total">
										<div class="grid-title">{{det.ClassName}}</div>
										<div>{{det.Total && det.Total+'件' || '-'}}</div>
										<div v-for="(condition, conditionIndex) in conditionList" :key="conditionIndex">{{det[condition] && det[condition]+'件' || '-'}}</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
				<div slot="footer"></div>
		</Modal>
		<Modal 
			title="更改订单状态"
			v-model="isChange">
				<div class="orderStatus">
					<div>是否确定更新订单DD2018050918139-01状态，更新后不可修改</div>
					<h2>
						<span>{{formData.OrderStatusName}}</span>
						<span><Icon type="ios-arrow-forward"></Icon></span>
						<span>{{nextStatusName}}</span>
					</h2>
					<div class="tips-text" v-if="nextStatus==40102">更改状态后，用户则可以拆分订单。</div>
					<div class="tips-text" v-if="nextStatus==40104">更改状态后，用户则无法拆分订单，请确认用户已拆分完毕</div>
				</div>
				<div slot="footer">
					<Button type="primary" @click="handleSure()">确认更改</Button>
				</div>
		</Modal>
        <Modal class="orderChildImg" title="查看图片" v-model="isShowImg">
            <img :src="modalImgUrl" style="max-width: 100%;max-height: 100%;">
        </Modal>
		<!-- 订单更新记录 -->
		<Modal
		 title="订单更新记录"
		 v-model="isShowUpdateLine">
			<div v-if="timeLinelist && timeLinelist.length>0">
				<Timeline>
					<TimelineItem color="#46C78F" v-for="(item,index) in timeLinelist" :key="index">
						<span>{{item.time}}</span>
						<span style="padding-left:25px;">{{item.status}}</span>
					</TimelineItem>
				</Timeline>
			</div>
			<div v-else>暂无更新记录</div>
		</Modal>
	</div>
</template>
<script>
	// import m_auth from '@/../mixins/auth'
	export default {
		name: 'orderView',
		// mixins: [m_auth],
		data () {
			return {
				formData: {},
				basicFormData: {},
				isBreakeOver: false,
				nextStatus: 0,
				nextStatusName: "",
				list: [],
				isShow: false,
				isChange: false,
				isShowUpdateLine: false,
				timeLinelist: [],
				conditionList: [],
				cateStaticsList: [],
				OrderStatusList: [],
				chiOrderForm: {
					orderId: "",
					pCategoryId: "0",
					pCategoryName: ""
				},
				categoryNameList: [],	//该子订单下所有款式的所属的分类
				detailsList: [
            {
                "StyleId":"8e885eaa-0075-4f5e-8ab4-ba9eddad3330",
                "StyleName":"蓝心",
                "StyleNumber":"11222",
                "ClassName":"男戒",
                "MainImg":"b7ca2180-7b2b-4e25-b8f8-02c0cb874996",
                "SkuList":[
                    {
                        "Id":"b51f3da3-9a95-419c-aa9b-9cf547188f32",
                        "SkuId":"b02439a2-3f37-4449-b29a-ef6c764ac7e1",
                        "Quantity":1,
                        "RemainQuantity":1,
                        "UnitPrice":1000,
                        "Specification":"14K黄/0.01ct",
                        "UnitWeight":1,
                        "SpecialProcess":"拉丝/车丝|喷砂/钉砂",
                        "InlaySizeParts":null,
                        "Certificate":null,
                        "CertificatePrice":0,
                        "SpecialProcessPrice":0,
                        "InlaySizePartsPrice":0,
                        "Sort":1,
                        "Lettering":null,
                        "Remark":null,
                        "TotalPrice":1000
                    }
                ]
            },
            {
                "StyleId":"ae36eda5-bc94-4d8a-893a-4623d0d9965a",
                "StyleName":"款名113",
                "StyleNumber":"款号113",
                "ClassName":"男戒",
                "MainImg":"36bff093-8f0d-436f-b495-2b61d48c80db",
                "SkuList":[
                    {
                        "Id":"a46b4876-2927-440e-9354-ffc5a4e3951f",
                        "SkuId":"e7734032-5839-4b14-8968-8873371162a9",
                        "Quantity":1,
                        "RemainQuantity":1,
                        "UnitPrice":1365,
                        "Specification":"14K分色/0.25ct",
                        "UnitWeight":1,
                        "SpecialProcess":"假分色|拉丝/车丝",
                        "InlaySizeParts":null,
                        "Certificate":null,
                        "CertificatePrice":0,
                        "SpecialProcessPrice":0,
                        "InlaySizePartsPrice":0,
                        "Sort":2,
                        "Lettering":"",
                        "Remark":"",
                        "TotalPrice":1365
                    }
                ]
            },
            {
                "StyleId":"28fb802e-71b3-4da5-8d4f-b4e31fd70c9c",
                "StyleName":"璀璨珍珠",
                "StyleNumber":"ZZ001",
                "ClassName":"耳饰",
                "MainImg":"81db290f-6294-4ff4-9986-83d9882fcda1",
                "SkuList":[
                    {
                        "Id":"23d3bad5-1a59-435f-ab37-a2372b02f017",
                        "SkuId":"45a81510-0c14-4ebf-be58-c5d84e47298b",
                        "Quantity":101,
                        "RemainQuantity":101,
                        "UnitPrice":1200,
                        "Specification":"18K红/2mm",
                        "UnitWeight":1,
                        "SpecialProcess":"批花(车花)",
                        "InlaySizeParts":null,
                        "Certificate":null,
                        "CertificatePrice":0,
                        "SpecialProcessPrice":0,
                        "InlaySizePartsPrice":0,
                        "Sort":3,
                        "Lettering":null,
                        "Remark":null,
                        "TotalPrice":121200
                    },
                    {
                        "Id":"fb4e0db1-968c-40b9-a797-f83b8e0a0e41",
                        "SkuId":"971a0863-a316-4079-acd6-3897136fbf1c",
                        "Quantity":100,
                        "RemainQuantity":100,
                        "UnitPrice":1500,
                        "Specification":"14K黄/5mm",
                        "UnitWeight":1.4,
                        "SpecialProcess":"批花(车花)",
                        "InlaySizeParts":null,
                        "Certificate":null,
                        "CertificatePrice":0,
                        "SpecialProcessPrice":0,
                        "InlaySizePartsPrice":0,
                        "Sort":3,
                        "Lettering":"",
                        "Remark":"",
                        "TotalPrice":150000
                    }
                ]
            },
            {
                "StyleId":"35c76af8-5e85-4b89-9a7c-4399001f7800",
                "StyleName":"钻石镶嵌0715",
                "StyleNumber":"zsjz0715",
                "ClassName":"指环戒(情侣戒)",
                "MainImg":"3ea0b89e-bf2a-4821-a817-4f69166b3181",
                "SkuList":[
                    {
                        "Id":"27431152-aaae-48f7-ad03-7be543e3c9d8",
                        "SkuId":"01f5452d-ab8b-4a89-a9b1-f2648d536c6a",
                        "Quantity":2,
                        "RemainQuantity":2,
                        "UnitPrice":600,
                        "Specification":"18K红/0.08ct",
                        "UnitWeight":1.1,
                        "SpecialProcess":"",
                        "InlaySizeParts":null,
                        "Certificate":null,
                        "CertificatePrice":0,
                        "SpecialProcessPrice":0,
                        "InlaySizePartsPrice":0,
                        "Sort":4,
                        "Lettering":"ss",
                        "Remark":"dd",
                        "TotalPrice":1200
                    }
                ]
            }
        ],
				pager: {
					pageIndex: 1,
					pageSize: 10,
					total: 0
				},
				isShowImg: false,
				modalImgUrl: ""
			}
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
				let formData = _.extend({}, this.chiOrderForm);
				_.each(formData, (value,key) =>{
					if(!value || (key == "pCategoryId" && value == "0")){
						delete formData[key]
					}
				})
				this.pager.pageIndex = pageIndex > 0 ? pageIndex : 1;
				if(this.chiOrderForm.orderId){
					this.getOrderDetails(formData);
				}
			},
			toChildOrderView(){
				this.$router.push({
					name:'orderChildView',
					params:{
						mainOrderId: this.formData.Id
					}
				})
			},
			getFormData(id){
				let formData = {
					id: id
				};
				Site.get({
					url: Site.api.factoryOrder.getById,
					data: formData
				}).done(res => {
					let data = res.data;
					this.formData = data;
					if (data){
						if (data && _.isObject(data)){
							_.each(data, (value, key) =>{
								if(key == "IsBreakeOver"){
									this.isBreakeOver = value
								}
							})
							this.basicFormData = data
						}else {
							this.basicFormData = {}
						}
					}else{
						this.basicFormData = {}
					}
				}).fail(err => {
					this.basicFormData = {}
				})
			},
			createTable(tableModel){
				let that = this;
				let orderDetailsTable = this.$refs.orderDetailsTable;
				//明细表格初始化
				orderDetailsTable.init({
					type: 'edit',
					data: {
						datatype: 'json',
						localdata: that.detailsList,
						datafields: [
							{ name: 'Id', type: 'string'},
							{ name: 'MainImg', type: 'string'},
							{ name: 'StyleName', type: 'string'},
							{ name: 'StyleNumber', type: 'string'},
							{ name: 'ClassName', type: 'string'},
							{ name: 'Parameter', type: 'string'},
							{ name: 'UnitWeight', type: 'string'},
							{ name: 'ProcessLevel', type: 'string'},
							{ name: 'Specialtech', type: 'string'},
							{ name: 'UnitPrice', type: 'number'},
							{ name: 'Quantity', type: 'number'},
							{ name: 'TotalPrice', type: 'number'},
							{ name: 'Remark', type: 'string'},
							{ name: 'Lettering', type: 'string'},
							{ name: 'Condition', type: 'string'},
							{ name: 'Specification', type: 'string'},
							{ name: "SkuList", type:"array"}
						]
					},
					cols: page.detailsTableModel,
					vm: this,
					custom: {
						noIndex: true,
						width:  this.$refs.orderDetailsTable.el.parent().width()-2
					}
				})
			},
			getOrderSummary(){
				Site.get({
					url: Site.api.factoryOrder.getOrderDetailsSummary,
					data:{
						id: this.formData.Id
					}
				}).done( res =>{
					this.isShow = true
					if(res.code == 1001 && res.data){
						let data = res.data,
							list = data.CategorySummaryList || []
						this.conditionList = data.ConditionArray || []
						_.each(list, item => {
							item.TotalQuantity = 0
							item.ClassNameList = item.ClassNameList || []
							item.DetailList = []
							_.each(item.ClassNameList, classItem => {
								let obj = {
									ClassName: classItem.ClassName,
									Total: 0
								}
								classItem.ConditionList = classItem.ConditionList || []
								_.each(classItem.ConditionList, condition => {
									obj[condition.Condition] = condition.Number
									obj.Total += condition.Number || 0
								})
								item.TotalQuantity += obj.Total
								item.DetailList.push(obj)
							})
						})
						this.cateStaticsList = list
					}
				}).fail( err =>{
					this.optTips = err.message
				})
			},
			handleSure(){
				console.log(this.nextStatus)
				let url = ""
				switch(this.nextStatus){
					case 40102:	//接单
						url = Site.api.factoryOrder.takeOrder
					break;
					case 40103:	//正在生产
						url = Site.api.factoryOrder.productingOrder
					break;
					case 40104: //出货
						url = Site.api.factoryOrder.shipment
					break;
					/*case 40105:	//完成

					break;
					case 40106:	//交易关闭

					break;*/
				}
				Site.get({
					url: url,
					data: {
						id: this.formData.Id
					}
				}).done( res =>{
					if(res && res.data){
						this.isChange = false
						this.formData.OrderStatusName = this.nextStatusName
						this.formData.OrderStatus = this.nextStatus
						this.$Message.success(res.message || "更改成功!")
					}
				}).fail( err =>{
					this.$Message.error(err.message || "更改失败!")
				})
			},
			handleChangeStatus(){
				this.isChange = true
				_.each(this.OrderStatusList, item =>{
					if(this.formData.OrderStatus == item.EnumCode || this.formData.OrderStatusName == item.EnumDescription){
						this.nextStatus = Number(item.EnumCode) + 1;
					}
					if(this.nextStatus == item.EnumCode){
						this.nextStatusName = item.EnumDescription
					}
				})
			},
			getDropList () {
				Site.get({
					url: Site.api.factoryOrder.getSearchDrop
				}).done( res => {
					if(res && res.code == 1001){
						let data = res.data;
						this.OrderStatusList = data.OrderStatusList;
					}else{
						this.OrderStatusList = []
					}
				}).fail( err => {
					this.$Message.error(err.message)
					this.OrderStatusList = []
				});
			},
			createTable(tableModel){
				let that = this;
				let orderDetailsTable = this.$refs.orderDetailsTable;
				//明细表格初始化
				orderDetailsTable.init({
					type: 'edit',
					data: {
						datatype: 'json',
						localdata: that.detailsList,
						datafields: [
							{ name: 'Id', type: 'string'},
							{ name: 'MainImg', type: 'string'},
							{ name: 'StyleName', type: 'string'},
							{ name: 'StyleNumber', type: 'string'},
							{ name: 'ClassName', type: 'string'},
							{ name: 'Parameter', type: 'string'},
							{ name: 'UnitWeight', type: 'string'},
							{ name: 'ProcessLevel', type: 'string'},
							{ name: 'Specialtech', type: 'string'},
							{ name: 'UnitPrice', type: 'number'},
							{ name: 'Quantity', type: 'number'},
							{ name: 'TotalPrice', type: 'number'},
							{ name: 'Remark', type: 'string'},
							{ name: 'Lettering', type: 'string'},
							{ name: 'Condition', type: 'string'},
							{ name: 'Specification', type: 'string'},
							{ name: "SkuList", type:"array"}
						]
					},
					cols: page.detailsTableModel,
					vm: this,
					custom: {
						noIndex: true,
						width:  this.$refs.orderDetailsTable.el.parent().width()-2
					}
				})
			},
			getOrderDetails(formData){
				let myFormData = formData || {};
				_.extend(myFormData, this.pager)
				delete myFormData.total;
				Site.get({
					url: Site.api.factoryOrder.getOrderDetail,
					data: myFormData
				}).done( res =>{
					let list = []
					if(res && res.data){
						let data = res.data;
						if(_.isArray(res.data.data_list)){
							list = res.data.data_list
						}else if(_.isArray(res.data)){
							list = res.data
						}
						this.pager = {
							pageIndex: data.page,
							pageSize: data.page_size,
							total: data.total_count
						}
						if(res && res.code == 1005){
							list = []
							this.pager = {
								pageIndex: 1,
								pageSize: 10,
								total: 0
							}
						}
						this.detailsList = list
						this.categoryNameList = []
						this.cateIdTabs = []
						if(this.cateIdTabs && this.cateIdTabs.length == 0){
							if (list && list.length>0){
								_.each(list, item =>{
									if(this.cateIdTabs.indexOf(item.PCategoryId)){
										this.cateIdTabs.push(item.PCategoryId)
										this.categoryNameList.push({
											Id: item.PCategoryId,
											Name: item.PCategoryName
										})
									}
								})
							}
							this.categoryNameList.unshift({
								Id: "0",
								Name: "全部"
							})
						}

					}

				}).fail( err =>{
					this.detailsList = []
					this.pager = {
						pageIndex: 1,
						pageSize: 10,
						total: 0
					}
					this.categoryNameList.unshift({
						Id: "0",
						Name: "全部"
					})
				})
			},
			getOrderUpdate(){
				this.isShowUpdateLine = true
				this.timeLinelist =[]
				Site.get({
					url: Site.api.factoryOrder.getByOrderId,
					data:{
						orderId: this.formData.Id
					}
				}).done( res =>{
					let list = []
					if(res && res.data && _.isArray(res.data)){
						_.each(res.data, item =>{
							list.push({
								time: item.CreateTime,
								status: item.NewStatusName
							})
						})
					}
					this.timeLinelist = list
				}).fail( err =>{ 
					this.timeLinelist = []
					this.$Message.error(err.message || "获取失败!")
				})
			},
			handleShowImg (e) {
				this.isShowImg = true;
				this.modalImgUrl = e.target.src;
			}
		},
		created () {
			this.getDropList();
		},
		mounted () {
			this.createTable(page.detailsTableModel)
		},
		activated () {
			let id = this.$route.params.id; 
			if(id && id != this.formData.Id){
				this.formData.Id = id;
				this.chiOrderForm.orderId = id;
				this.getFormData(id)
				// this.getOrderDetails(this.chiOrderForm)
			}
		},
		watch:{
			detailsList: {
				handler: function(val,oldVal){
					this.$refs.orderDetailsTable.updata(val);
				},
				deep: true
			},
			"chiOrderForm.pCategoryId": {
				handler: function(val,oldVal){
					// this.search()
				},
				deep: true
			}
			/*list: {
				handler: function(val,oldVal){
					this.$refs.orderTable.updata(val);
				},
				deep: true
			}*/
		}.


		.
		···	
	}
	const page = {
		name: "orderView",
		detailsTableModel: [
			{ text: "款式名称", datafield: "StyleName", width: 120,editable: false},
			{ text: "款号", datafield: "StyleNumber", width: 100,editable: false},
			{ text: "主图", datafield: "MainImg", width: 80,editable: false,
				createRender(vm){
					//绑定事件
					vm.$refs.orderDetailsTable.el.on('click', `.image img`, vm.handleShowImg);
					return function (index, fieldName, value, defaultHtml, column, rowData) {
						let img = '';
						if(value){
							img = Site.api.upfileBaseUrl + value + "_0x0";
							img = `<div class="cellContainer"><div class="image"><img src="${img}" /></div></div>`;
						}
						return img;
					}
				}
			},
			{ text: "品类", datafield: "ClassName", width: 100,editable: false},
			{ text: "参数", datafield: "Parameter", width: 150,editable: false,
				createRender(vm){
					return function(index, fieldName, value, defaultHtml, column, rowData ){
						let SkuList = rowData.SkuList;
						console.log(rowData.SkuList)
						return `<div class="cellContainer">
						</div>`
					}
				}
			},
			{ text: "金重", datafield: "UnitWeight", width: 100,editable: false},
			{ text: "工艺级别", datafield: "ProcessLevel", width: 100,editable: false},
			{ text: "特殊工艺", datafield: "Specialtech", width: 300,editable: false},
			{ text: "单价", datafield: "UnitPrice", width: 100, cellsformat: "c2",editable: false},
			{ text: "数量", datafield: "Quantity", width: 100,editable: false},
			{ text: "小计", datafield: "TotalPrice", width: 100, cellsformat: "c2",editable: false},
			{ text: "备注", datafield: "Remark", width: 100,editable: false,
				createRender(vm){
					return function(index, fieldName, value, defaultHtml, column, rowData){
						return `<div class="cellContainer">${value?value:"无"}</div>`
					}
				}
			},
			{ text: "刻字", datafield: "Lettering", width: 100,editable: false,
				createRender(vm){
					return function(index, fieldName, value, defaultHtml, column, rowData){
						return `<div class="cellContainer">${value?value:"无"}</div>`
					}
				}
			}
		]
	}
</script>
<style lang="scss">
	.orderView{
		.operateWrap{
			margin-bottom: 15px;
		}
		.m-left{
			padding-left: 25px;
		}
		.clickAble{
			cursor: pointer;
			color: #46C78F;
		}
		h2{
			padding-bottom: 10px;
			margin-bottom: 15px;
			border-bottom: 1px solid #dddddd;
		}
		.orderTable{
			.ivu-row{
				padding: 5px 10px;
			}
		}
		.orderDatetial{
			margin-top: 15px;
		}
		.modalPro, .modalSelect{
			position: fixed;
			top: 0;
			bottom: 0;
			left: 0;
			right: 0;
			z-index: 1050;
		}
	}
		.modalPro{
			border: 1px solid #E5E5E5;
			.model-header{
				border-bottom: none;
			}
			.model-total{
				border-top: 1px solid #E5E5E5;
				border-bottom: 1px solid #E5E5E5;
			}
			.modalContent{
				min-width: 24rem;
				background: #fff;
				font-size: 1rem;
			}
			.model-thead{
				height: 2.95rem;
				background: #FFFCED;
				&>div{
					width: 8rem;
					// min-width: 8rem;
					height: 100%;
					float: left;
					border-right: 1px solid #E5E5E5;
					&:not(:first-child){
						text-align: center;
						line-height: 2.95rem;
					}
				}
				&>div:last-child{
					border-right: none;
				}
				.grid-title{
					position: relative;
					&>div{
						position: absolute;
					}
				}
				.seg-line{
					width: 8.52rem;
					height: 1px;
					background: #E4E0CE;
					top: 1.4rem;
					left: -4px;
					transform: rotate(20deg);
				}
				.class-name{
					left: 10px;
					bottom: 5px;
				}
				.condition{
					right: 10px;
					top: 5px;
				}
			}
			.skew-red{
				width: 0.714rem;
				height: 1.143rem;
				background: #C12022;
				transform:skew(-20deg); 
			}
			.model-total{
				height: 2.995rem;
				line-height: 2.995rem;
				text-align: center;
				.color-primary{
					margin: 0 0.71rem;
				}
			}
			.model-tr{
				height: 2.95rem;
				line-height: 2.95rem;
				border-bottom: 1px solid #E5E5E5;
				&>div{
					width: 8rem;
					float: left;
					text-align: center;
					border-right: 1px solid #E5E5E5;
				}
				&>div:last-child{
					border-right: none;
				}
				&:nth-child(odd){
					background: #FBFBFB;
				}
				.grid-title{
					background: #F5F5F5;
				}
			}
			.model-tr:last-child{
				border-bottom: none; 
			}
		}
		.orderStatus{
			text-align: center;
			h2{
				margin: 15px 0;
				.ivu-icon{
					padding: 0 15px;
				}
			}
		}
		.orderChildImg{
			.ivu-modal-body {
				text-align: center;
			}
		}
</style>
