<template>
	<div class="orderSearchDetails">
		<p class='order_status'>
			<span class="title">订单状态</span>
			<span>{{formData.OrderStatusName || orderStatus}}</span>
			<Button type="ghost" @click="changeStatus" v-if="formData.OrderStatus == 40002 || formData.OrderStatus == 40003 || formData.OrderStatus == 40004">更改状态</Button>
			<Button type="ghost" v-if="formData.OrderStatus != 40001 && formData.OrderStatus != 40006" @click="toOrderPrint">打印</Button>
		</p>
        <!-- <Card class="baseAttr">
            <p slot="title">订单信息</p>
            <Row class="itemContent" type="flex" justify="start">
                <Col span="4">订单号：&nbsp;&nbsp;&nbsp;&nbsp;{{formData.OrderNo}}</Col>
                <Col span="4">订单总价：&nbsp;&nbsp;&nbsp;&nbsp;&yen;{{formData.SaleAmount | monetization}}</Col>
                <Col span="4">订单日期：&nbsp;&nbsp;&nbsp;&nbsp;{{formData.InTime | getDate}}</Col>
                <Col span="4">销售分店：&nbsp;&nbsp;&nbsp;&nbsp;{{formData.StoreName}}</Col>
				<Col span="4">销售顾问：&nbsp;&nbsp;&nbsp;&nbsp;{{formData.SaleUserName}}</Col>
            </Row>
        </Card> -->
        <Card class="baseAttr">
            <p slot="title">订单详情&nbsp;&nbsp;&nbsp;&nbsp;共{{number}}件</p>
			<div class='style_list'>
				<!-- 可供循环的div -->
				<div class="list_item" v-for='(startItem,StyleType) in typeClassList' :key="StyleType">
					<p class="order_total">
						<!-- <span>{{item.StyleTypeName}}</span> -->
					<span v-if="StyleType=='1'">定制类型：时尚定制</span>
					<span v-if="StyleType=='2'">定制类型：套装系列</span>
					<span v-if="StyleType=='3'">定制类型：来图定制</span>
					<span v-if="StyleType=='4'">定制类型：轻奢定制</span>
					<span>总价<span style="padding-left:50px;">&yen;{{startItem.TotalPrice | monetization}}</span></span>
					</p>
					<div v-for="(item,index) in startItem.dataList" :key="index">
						<div v-for="(item1, index1) in item.stoneData" :key="index1" class='item_row' :class="{notEndRow:index!=startItem.dataList.length-1}">
							<Row :gutter='16'>
								<Col :lg="4">
									<div class="item_flex">
										<img :src="item.MainImg?(imgUrl + item.MainImg): ''" alt="" width='58' height='58' @click='handleShowImg(item.MainImg)'>
										<p>
											<span v-if="StyleType=='2'">{{item1.StyleName}}</span>
											<span v-if="StyleType!='2'">{{item.StyleName}}</span>
											<span v-if="StyleType=='3' && item.Weight" class="showGoldWeight">已知金重</span>
											<span v-if="StyleType=='3' && !item.Weight"  class="showGoldWeight">未知金重</span>
											<br>
											<span v-if="StyleType!='3' && StyleType != '2'"> {{item.ClassName}} &nbsp;【款号{{item.StyleNo}}】</span>
											<span v-if="StyleType!='3' && StyleType == '2'"> {{item1.ClassName}} &nbsp;【款号{{item1.StyleNo}}】</span>
											<span v-if="StyleType=='3' && !item.Weight" class="attrShow"> 
												<span>{{item1.class}}</span> 
												<span>{{item1.goldType}}</span>
												<span>{{item1.telco}}</span>
											</span>
											<span v-if="StyleType=='3' && item.Weight" class="attrShowNO"> 
												<span>{{item1.class}}</span> 
												<span>{{item1.telco}}</span>
												<br>
												<span>金重</span>
												<span>{{item.Weight}}g</span>
											</span>
										</p>
									</div>
								</Col>
								<Col :lg="4">
									<div class="borderRight">
										<p>
											<b>金拓信息</b> &nbsp;&nbsp;&nbsp;&nbsp;
											<sub v-if="item.RingPrice && StyleType != '2'">&yen;{{item.RingPrice | monetization}}</sub>
											<sub v-if="item1.RingPrice && StyleType == '2'">&yen;{{item1.RingPrice | monetization}}</sub>
											<sub v-else>&yen;0.00</sub>
										</p>
										<div>
											<span>成色：
												<span v-if="item1.finness">{{item1.finness}}</span>
												<span v-else>无</span>
											</span>
										</div>
										<div><span>手寸：
												<span v-if="item1.handSize">{{item1.handSize}}</span>
												<span v-else>无</span>
										</span></div>
										<div>
											<span>刻字要求：
												<span v-if="item.Lettering && StyleType != '2'">{{item.Lettering}}</span>
												<span v-if="item1.Lettering && StyleType == '2'">{{item1.Lettering}}</span>
												<span v-else>无</span>
											</span>
										</div>
									</div>
								</Col>
								<Col :lg="4">
									<div class="borderRight">
										<p><b>辅石信息</b></p>
										<p>辅石类别： 
												<span v-if="item1.StoneCategory">{{item1.StoneCategory}}</span>
												<span v-else>无</span>
										</p>
										<p>辅石粒数： 
												<span v-if="item1.StoneQuantity">{{item1.StoneQuantity}}</span>
												<span v-else>无</span>
										</p>
										<p>辅石重量： 
												<span v-if="item1.StoneWeight">{{item1.StoneWeight}}ct</span>
												<span v-else>无</span>
										</p>
									</div>
								</Col>
								<Col :lg="8">
									<div class="borderRight">
										<p><b>配石信息</b>&nbsp;&nbsp;&nbsp;&nbsp;
											<sub v-if="item.StonePrice && StyleType != '2'">&yen;{{item.StonePrice | monetization}}</sub>
											<sub v-if="item1.StonePrice && StyleType == '2'">&yen;{{item1.StonePrice | monetization}}</sub>
											<sub v-else>&yen;0.00</sub>
										</p>
										<div>
											<span>形状：
												<span class="show_data" v-if="item1.Shape">{{item1.Shape}}</span>
												<span v-else>无</span>
											</span>
											<span>切工：
												<span class="show_data" v-if="item1.Cut">{{item1.Cut}}</span>
												<span v-else>无</span>
											</span>
										</div>
										<div>
											<span>重量：
												<span class="show_data" v-if="item1.Weight">{{item1.Weight}}ct</span>
												<span v-else>无</span>
											</span>
											<span>净度：
												<span class="show_data" v-if="item1.Clarity">{{item1.Clarity}}</span>
												<span v-else>无</span>
											</span>
										</div>
										<div>
											<span>颜色：
												<span class="show_data" v-if="item1.Color">{{item1.Color}}</span>
												<span v-else>无</span>
											</span>
										</div>
									</div> 
								</Col>
								<Col :lg="4">
									<div class="borderRight">
										<p><b>成品价格</b></p>
										<div class="productPrice">&yen;
											<span v-if="item1.couplePrice && StyleType==2">{{item1.couplePrice | monetization}}</span>
											<span v-if="item.TotalPrice && item.StyleType!=2">{{item.TotalPrice | monetization}}</span>
										</div>
									</div>
								</Col>
							</Row>
						</div>
					</div>
				</div>
				
			</div>
        </Card>
        <!-- <Card class="baseAttr">
            <p slot="title">客户信息</p>
            <Row class="itemContent" type="flex" justify="start">
                <Col span="6">姓名：{{formData.Member.MemberName}}</Col>
                <Col span="6">联系方式：{{formData.Member.MemberMobile}}</Col>
                <Col span="6">取货方式: 自取</Col>
                <Col span="6">预计取货日期：{{formData.PickUpDate && formData.PickUpDate.substring(0,10)}}</Col>
            </Row>
        </Card> -->
		<Modal
			v-model="isShowImg"
			title="查看图片"
			@on-ok="isShowImg=false"
            :mask-closable="false"
			 class="franchiserModal">
			<img :src="openImgUrl" alt="">
		</Modal>
		
		<Modal
		  	v-model="changeStatusModal"
			title="更改订单状态"
            width="500"
            :mask-closable="false">
				<p class="marginAuto">
					请确认更改订单&nbsp;{{formData.OrderNo}}&nbsp;的状态
				</p>
				<Form ref="statusFormData" :model="statusFormData" :label-width="100" onsubmit="return false">
					<Form-item label="当前状态">
						<span>{{orderStatus}}</span>
					</Form-item>
					<Form-item label="更改状态" style="width: 300px;" prop="Status">
						<Select v-model="statusFormData.Status" placeholder='请选择状态' clearable>
							<Option v-for="item in statusNewList" :label="item.Name" :value="item.Id" :key="item.Id"></Option>
						</Select>
					</Form-item>
				</Form>
				<div slot="footer">
					<Button type="primary" @click="makeStatus">提交</Button>
					<Button type="ghost" @click="changeStatusModal=false">关闭</Button>
				</div>
		</Modal>
    </div>
</template>
<script>
	export default {
        name: 'orderSearchDetails',
        data(){
            return {
				isShowImg: false,
				totalPrice: 0,
				number: 0,
				openImgUrl: '',
				statusList: [],
				endDataList: [],
				dateialList: [],
				statusNewList: [],
				typeClassList: {},
				changeStatusModal: false,
				orderStatus: '',
				styleTypeName: '',
				statusFormData:{
					Id: '',	//当前要修改的订单Id
					Status: 0
				},
				formData: {
					Id: '',
					OrderNo: '',
					InTime: '',
					PickUpDate: '',
					Member: {
						Id: '',
						MemberName: '',
						MemberMobile: ''
					},
					ProQty: 0,
					StyleTypes: [],
					SaleAmount: 0,
					OrderStatus: 0,
					OrderStatusName: '',
					SaleUserName: '',
					StoreName: ''
				},
	  			imgUrl: Site.api.upfileBaseUrl,	//图片链接
				upfileMainImg:{	//主图
					ImageCode: ''
				}
            }
        },
        methods: {
			handleShowImg(code) {
				this.isShowImg = true;
				this.openImgUrl = this.imgUrl + code;
			},
			changeStatus(){
				this.changeStatusModal = true;
				let statusList = this.statusList
				let endList = []
				endList = _.filter(statusList, item =>{
					return Number(item.Id) > this.formData.OrderStatus
				})
				this.statusNewList = endList;
			},
			toOrderPrint(){
				if(this.formData.Id){
					this.$router.push({
						name: 'orderPrint',
						params: {
							id: this.formData.Id
						}
					})
				}
			},
			makeStatus(){
				let formData = _.extend({},this.statusFormData);
				formData.Id = this.formData.Id;
				if(!formData.Status){
					this.$Message.error('请选择订单状态!');
					return 
				}
                const loader = this.$Message.loading({
                    content: '正在修改中...',
                    duration: 0
                });
                Site.post({
                    url: Site.api.orderCustomize.modifyStatus,
                    data: formData
                }).done(res => {
                    loader();
					let data = res.data
					if(res.code == 1001){
						this.changeStatusModal = false;
						//刷新列表
						this.getFormData(this.formData.Id);
					}
                    this.$Message.success(res.message || '修改成功');
                }).fail(err => {
                    loader();
                    this.$Message.error(err.message || '修改失败');
                })

			},
			getFormData(id) {
				let formData = {
					id: id
				};
				let that = this;
				this.handleReset('form');
				/*const loader = this.$Message.loading({
					content: "正在加载中...",
					duration: 0
				});
				Site.get({
					url: Site.api.orderCustomize.getOrderById,
					data: formData
				}).done(res => {
					loader();
					let data = res.data;
					_.each(data, (value, key) => {
						if (value !== null) {
							if (key == "AttrList") {
							} else if (key == "Member") {  
								this.formData.Member = value;
							} else if (key == "StyleTypes") {
								setStyleType(value)
							} else if(key == 'OrderStatus'){
								if (value){
									_.each(this.statusList, item =>{
										if(item.Id == value){
											this.orderStatus = item.Name;
										}
									})
								}
								this.formData.OrderStatus = value
							} else {
								this.formData[key] = value;
							}
						}
					});
					if (!data.Id && this.$route.params.id) {
						this.formData.Id = this.$route.params.id;
					}
				}).fail(err => {
					loader();
				});*/
				setStyleType([])
				function setStyleType(list){
					list = [
						{
							"StyleType":"4",
							"StyleTypeName":"轻奢定制",
							"StyleList":[
								{
									"Id":"8f9bb7c4-ee34-4e36-a6c2-701635319922",
									"OrderId":"ce2e57ab-3762-4ddb-abee-76138804b62c",
									"StyleType":"4",
									"StyleId":"fecac2f8-da5c-4414-bf37-baf257e2498a",
									"StyleNo":"wandeful",
									"StyleName":"美好时光",
									"SkuId":"3a3bb0e1-ead6-47a6-a079-b212bb3608a7",
									"Attrs":[
										{
											"StyleAttrId":"fce813ce-273f-41c0-9809-bc1e08c7bfb9",
											"StyleAttrName":"成色",
											"StyleAttrValueId":"325e0358-f976-4631-9841-bb00762f925a",
											"StyleAttrValueName":"Pt990",
											"StyleAttrInputValue":null,
											"SetItemId":null
										},
										{
											"StyleAttrId":"7cbb68d8-16cd-41f2-b084-17aeb6a0504e",
											"StyleAttrName":"戒指手寸",
											"StyleAttrValueId":"ae82b140-8d58-434e-a262-c11328dd67c7",
											"StyleAttrValueName":"7",
											"StyleAttrInputValue":null,
											"SetItemId":null
										},
										{
											"StyleAttrId":"e8688526-2944-4dc3-a84e-703f4fa948dd",
											"StyleAttrName":"镶口大小",
											"StyleAttrValueId":"574d3a38-33d6-4c79-8bee-4bbbca6e2548",
											"StyleAttrValueName":"0.02",
											"StyleAttrInputValue":null,
											"SetItemId":null
										}
									],
									"SetItems":[

									],
									"Imgs":[

									],
									"Stones":[
										{
											"SetItemId":null,
											"StoneId":null,
											"StoneType":"1",
											"StoneClass":"钻石(辅)",
											"Shape":null,
											"Color":null,
											"Clarity":null,
											"Cut":null,
											"Weight":0.5,
											"UnitPrice":0,
											"Quantity":1,
											"TotalPrice":0,
											"StoneNo":null,
											"DistributionTime":null
										}
									],
									"StyleMctNum":"3684227902",
									"CategoryName":"戒指",
									"ClassName":"男戒",
									"Category":"41063e2f-a45c-4ff9-81e0-4bf8d879ee90",
									"MainImg":"728043ab-89ca-4c9d-8551-f726f3633254",
									"IsNeedStone":1,
									"Specification":"7",
									"Lettering":null,
									"Quantity":1,
									"Weight":0.13,
									"UnitPrice":15200,
									"TotalPrice":15200,
									"RingPrice":15200,
									"StonePrice":0
								}
							]
						},
						{
							"StyleType":"2",
							"StyleTypeName":"套系",
							"StyleList":[
								{
									"Id":"e7686649-d61a-4a92-a681-fb964cc3dc8e",
									"OrderId":"ce2e57ab-3762-4ddb-abee-76138804b62c",
									"StyleType":"2",
									"StyleId":"d5d05c91-e7db-445b-9ac7-f10c07dd199f",
									"StyleNo":null,
									"StyleName":"newSuit",
									"SkuId":null,
									"Attrs":[
										{
											"StyleAttrId":"fce813ce-273f-41c0-9809-bc1e08c7bfb9",
											"StyleAttrName":"成色",
											"StyleAttrValueId":"4736e9fd-f764-4c83-b34b-5de08ea82cfc",
											"StyleAttrValueName":"18K红",
											"StyleAttrInputValue":null,
											"SetItemId":"3147d13c-c581-48ab-875f-7a5511a9fed9"
										},
										{
											"StyleAttrId":"7cbb68d8-16cd-41f2-b084-17aeb6a0504e",
											"StyleAttrName":"戒指手寸",
											"StyleAttrValueId":"3fc10c9a-4cf0-44f1-b122-318c4b63138c",
											"StyleAttrValueName":"10",
											"StyleAttrInputValue":null,
											"SetItemId":"3147d13c-c581-48ab-875f-7a5511a9fed9"
										},
										{
											"StyleAttrId":"e8688526-2944-4dc3-a84e-703f4fa948dd",
											"StyleAttrName":"镶口大小",
											"StyleAttrValueId":"88884b33-ccfd-4027-8290-7e56a3ae2122",
											"StyleAttrValueName":"0.3",
											"StyleAttrInputValue":null,
											"SetItemId":"3147d13c-c581-48ab-875f-7a5511a9fed9"
										},
										{
											"StyleAttrId":"fce813ce-273f-41c0-9809-bc1e08c7bfb9",
											"StyleAttrName":"成色",
											"StyleAttrValueId":"4736e9fd-f764-4c83-b34b-5de08ea82cfc",
											"StyleAttrValueName":"18K红",
											"StyleAttrInputValue":null,
											"SetItemId":"e06821fe-fa51-43fc-a26c-d534c38638fa"
										},
										{
											"StyleAttrId":"7cbb68d8-16cd-41f2-b084-17aeb6a0504e",
											"StyleAttrName":"戒指手寸",
											"StyleAttrValueId":"3fc10c9a-4cf0-44f1-b122-318c4b63138c",
											"StyleAttrValueName":"10",
											"StyleAttrInputValue":null,
											"SetItemId":"e06821fe-fa51-43fc-a26c-d534c38638fa"
										},
										{
											"StyleAttrId":"e8688526-2944-4dc3-a84e-703f4fa948dd",
											"StyleAttrName":"镶口大小",
											"StyleAttrValueId":"88884b33-ccfd-4027-8290-7e56a3ae2122",
											"StyleAttrValueName":"0.3",
											"StyleAttrInputValue":null,
											"SetItemId":"e06821fe-fa51-43fc-a26c-d534c38638fa"
										},
										{
											"StyleAttrId":"fce813ce-273f-41c0-9809-bc1e08c7bfb9",
											"StyleAttrName":"成色",
											"StyleAttrValueId":"4736e9fd-f764-4c83-b34b-5de08ea82cfc",
											"StyleAttrValueName":"18K红",
											"StyleAttrInputValue":null,
											"SetItemId":"4bb04044-e447-4ba6-8292-d0e1a764d167"
										},
										{
											"StyleAttrId":"7cbb68d8-16cd-41f2-b084-17aeb6a0504e",
											"StyleAttrName":"戒指手寸",
											"StyleAttrValueId":"3fc10c9a-4cf0-44f1-b122-318c4b63138c",
											"StyleAttrValueName":"10",
											"StyleAttrInputValue":null,
											"SetItemId":"4bb04044-e447-4ba6-8292-d0e1a764d167"
										},
										{
											"StyleAttrId":"e8688526-2944-4dc3-a84e-703f4fa948dd",
											"StyleAttrName":"镶口大小",
											"StyleAttrValueId":"88884b33-ccfd-4027-8290-7e56a3ae2122",
											"StyleAttrValueName":"0.3",
											"StyleAttrInputValue":null,
											"SetItemId":"4bb04044-e447-4ba6-8292-d0e1a764d167"
										},
										{
											"StyleAttrId":"fce813ce-273f-41c0-9809-bc1e08c7bfb9",
											"StyleAttrName":"成色",
											"StyleAttrValueId":"4736e9fd-f764-4c83-b34b-5de08ea82cfc",
											"StyleAttrValueName":"18K红",
											"StyleAttrInputValue":null,
											"SetItemId":"02d0b29c-53ee-4587-8cef-14894fd85823"
										},
										{
											"StyleAttrId":"7cbb68d8-16cd-41f2-b084-17aeb6a0504e",
											"StyleAttrName":"戒指手寸",
											"StyleAttrValueId":"3fc10c9a-4cf0-44f1-b122-318c4b63138c",
											"StyleAttrValueName":"10",
											"StyleAttrInputValue":null,
											"SetItemId":"02d0b29c-53ee-4587-8cef-14894fd85823"
										},
										{
											"StyleAttrId":"e8688526-2944-4dc3-a84e-703f4fa948dd",
											"StyleAttrName":"镶口大小",
											"StyleAttrValueId":"88884b33-ccfd-4027-8290-7e56a3ae2122",
											"StyleAttrValueName":"0.3",
											"StyleAttrInputValue":null,
											"SetItemId":"02d0b29c-53ee-4587-8cef-14894fd85823"
										},
										{
											"StyleAttrId":"fce813ce-273f-41c0-9809-bc1e08c7bfb9",
											"StyleAttrName":"成色",
											"StyleAttrValueId":"4736e9fd-f764-4c83-b34b-5de08ea82cfc",
											"StyleAttrValueName":"18K红",
											"StyleAttrInputValue":null,
											"SetItemId":"3f5a7c9e-479c-49cc-ad57-cee545d7ae45"
										},
										{
											"StyleAttrId":"7cbb68d8-16cd-41f2-b084-17aeb6a0504e",
											"StyleAttrName":"戒指手寸",
											"StyleAttrValueId":"3fc10c9a-4cf0-44f1-b122-318c4b63138c",
											"StyleAttrValueName":"10",
											"StyleAttrInputValue":null,
											"SetItemId":"3f5a7c9e-479c-49cc-ad57-cee545d7ae45"
										},
										{
											"StyleAttrId":"e8688526-2944-4dc3-a84e-703f4fa948dd",
											"StyleAttrName":"镶口大小",
											"StyleAttrValueId":"91ac7e1b-54cb-4e99-b1c3-9e296da973cb",
											"StyleAttrValueName":"0.5",
											"StyleAttrInputValue":null,
											"SetItemId":"3f5a7c9e-479c-49cc-ad57-cee545d7ae45"
										}
									],
									"SetItems":[
										{
											"Id":"3147d13c-c581-48ab-875f-7a5511a9fed9",
											"Category":"戒指",
											"CategoryName":"戒指",
											"ClassName":"女戒",
											"StyleId":"e77bb519-243d-4764-8450-03fd53ff4188",
											"StyleNo":"永生永世",
											"StyleName":"蒹葭",
											"SkuId":"7789d55f-a62c-45e9-84fe-fbaad9e5f6c3",
											"Quantity":1,
											"Specification":null,
											"Lettering":null,
											"RingPrice":3540,
											"StonePrice":11666,
											"Stones":[
												{
													"SetItemId":"3147d13c-c581-48ab-875f-7a5511a9fed9",
													"StoneId":"e6791c85-f44d-4406-8afb-640afb793a7d",
													"StoneType":"0",
													"StoneClass":"钻石",
													"Shape":"圆形",
													"Color":"E",
													"Clarity":"VVS1",
													"Cut":"3EX",
													"Weight":0.3,
													"UnitPrice":11666,
													"Quantity":1,
													"TotalPrice":11666,
													"StoneNo":null,
													"DistributionTime":null
												}
											]
										},
										{
											"Id":"e06821fe-fa51-43fc-a26c-d534c38638fa",
											"Category":"戒指",
											"CategoryName":"戒指",
											"ClassName":"男戒",
											"StyleId":"586ab5b7-ce0c-4a5e-931a-cf0eb83c0121",
											"StyleNo":"bestJZ",
											"StyleName":"红红火火",
											"SkuId":"6a6a602c-92ea-4c96-9796-dbaab8d54e8a",
											"Quantity":1,
											"Specification":null,
											"Lettering":null,
											"RingPrice":6696,
											"StonePrice":23332,
											"Stones":[
												{
													"SetItemId":"e06821fe-fa51-43fc-a26c-d534c38638fa",
													"StoneId":"e6791c85-f44d-4406-8afb-640afb793a7d",
													"StoneType":"0",
													"StoneClass":"钻石",
													"Shape":"圆形",
													"Color":"E",
													"Clarity":"VVS1",
													"Cut":"3EX",
													"Weight":0.3,
													"UnitPrice":11666,
													"Quantity":1,
													"TotalPrice":11666,
													"StoneNo":null,
													"DistributionTime":null
												}
											]
										},
										{
											"Id":"4bb04044-e447-4ba6-8292-d0e1a764d167",
											"Category":"戒指",
											"CategoryName":"戒指",
											"ClassName":"男戒",
											"StyleId":"887d17b9-01ad-4762-af26-17abf7df3f7e",
											"StyleNo":"newZJ",
											"StyleName":"崭新曙光",
											"SkuId":"61f92867-a25b-444b-a4a0-2b7dc879bb00",
											"Quantity":1,
											"Specification":null,
											"Lettering":null,
											"RingPrice":3734,
											"StonePrice":23332,
											"Stones":[

											]
										},
										{
											"Id":"02d0b29c-53ee-4587-8cef-14894fd85823",
											"Category":"戒指",
											"CategoryName":"戒指",
											"ClassName":"女戒",
											"StyleId":"3bb9b0f6-3d1e-4faf-93c9-9a49016adab2",
											"StyleNo":"newCircle",
											"StyleName":"绕指柔戒指",
											"SkuId":"2d67776d-07ec-431c-959d-61c1092c3b1a",
											"Quantity":1,
											"Specification":null,
											"Lettering":null,
											"RingPrice":3453,
											"StonePrice":34998,
											"Stones":[
												{
													"SetItemId":"02d0b29c-53ee-4587-8cef-14894fd85823",
													"StoneId":"e6791c85-f44d-4406-8afb-640afb793a7d",
													"StoneType":"0",
													"StoneClass":"钻石",
													"Shape":"圆形",
													"Color":"E",
													"Clarity":"VVS1",
													"Cut":"3EX",
													"Weight":0.3,
													"UnitPrice":11666,
													"Quantity":1,
													"TotalPrice":11666,
													"StoneNo":null,
													"DistributionTime":null
												}
											]
										},
										{
											"Id":"3f5a7c9e-479c-49cc-ad57-cee545d7ae45",
											"Category":"戒指",
											"CategoryName":"戒指",
											"ClassName":"男戒",
											"StyleId":"b1efdd6a-1630-4fb8-ad9f-86324327e938",
											"StyleNo":"far",
											"StyleName":"远方追寻套装",
											"SkuId":"8141135f-ea50-482c-a8fe-1e9e549d7d1c",
											"Quantity":1,
											"Specification":null,
											"Lettering":null,
											"RingPrice":3749,
											"StonePrice":350198,
											"Stones":[
												{
													"SetItemId":"3f5a7c9e-479c-49cc-ad57-cee545d7ae45",
													"StoneId":"0183ba6b-d674-4c1f-a98d-60d0ab83989c",
													"StoneType":"0",
													"StoneClass":"钻石",
													"Shape":"圆形",
													"Color":"E",
													"Clarity":"VVS2",
													"Cut":"3EX",
													"Weight":0.5,
													"UnitPrice":315200,
													"Quantity":1,
													"TotalPrice":315200,
													"StoneNo":null,
													"DistributionTime":null
												}
											]
										}
									],
									"Imgs":[

									],
									"Stones":[
										{
											"SetItemId":"3147d13c-c581-48ab-875f-7a5511a9fed9",
											"StoneId":"e6791c85-f44d-4406-8afb-640afb793a7d",
											"StoneType":"0",
											"StoneClass":"钻石",
											"Shape":"圆形",
											"Color":"E",
											"Clarity":"VVS1",
											"Cut":"3EX",
											"Weight":0.3,
											"UnitPrice":11666,
											"Quantity":1,
											"TotalPrice":11666,
											"StoneNo":null,
											"DistributionTime":null
										},
										{
											"SetItemId":"e06821fe-fa51-43fc-a26c-d534c38638fa",
											"StoneId":"e6791c85-f44d-4406-8afb-640afb793a7d",
											"StoneType":"0",
											"StoneClass":"钻石",
											"Shape":"圆形",
											"Color":"E",
											"Clarity":"VVS1",
											"Cut":"3EX",
											"Weight":0.3,
											"UnitPrice":11666,
											"Quantity":1,
											"TotalPrice":11666,
											"StoneNo":null,
											"DistributionTime":null
										},
										{
											"SetItemId":"02d0b29c-53ee-4587-8cef-14894fd85823",
											"StoneId":"e6791c85-f44d-4406-8afb-640afb793a7d",
											"StoneType":"0",
											"StoneClass":"钻石",
											"Shape":"圆形",
											"Color":"E",
											"Clarity":"VVS1",
											"Cut":"3EX",
											"Weight":0.3,
											"UnitPrice":11666,
											"Quantity":1,
											"TotalPrice":11666,
											"StoneNo":null,
											"DistributionTime":null
										},
										{
											"SetItemId":"3f5a7c9e-479c-49cc-ad57-cee545d7ae45",
											"StoneId":"0183ba6b-d674-4c1f-a98d-60d0ab83989c",
											"StoneType":"0",
											"StoneClass":"钻石",
											"Shape":"圆形",
											"Color":"E",
											"Clarity":"VVS2",
											"Cut":"3EX",
											"Weight":0.5,
											"UnitPrice":315200,
											"Quantity":1,
											"TotalPrice":315200,
											"StoneNo":null,
											"DistributionTime":null
										}
									],
									"StyleMctNum":"3684227902",
									"CategoryName":"套装系列",
									"ClassName":null,
									"Category":"6731ea0f-456d-44ec-8564-13f10fe02cbe",
									"MainImg":"ec23f3b3-b9f8-4790-b396-ae0621a2f572",
									"IsNeedStone":0,
									"Specification":null,
									"Lettering":null,
									"Quantity":1,
									"Weight":0,
									"UnitPrice":371370,
									"TotalPrice":371370,
									"RingPrice":21172,
									"StonePrice":350198
								}
							]
						}
					];
					let endDataList = []
					that.totalPrice = 0;
					that.number = 0
					_.each(list, item =>{
						let StyleTypes = item.StyleList;
						that.dateialList = StyleTypes
						that.dateialList.forEach(item1=>{
							let obj = {},arr = [];
							if(item1.SetItems&&item1.SetItems.length>0){//套装
								let array = [];
								item1.SetItems.forEach(item3=>{
									let str = '',str1 = '',str2 = '',obj = {};
									if(item3.Stones&&item3.Stones.length>0){
										item3.Stones.forEach(item2=>{
											if(item2.StoneType == 0){//主石
												item1.StoneType = 0
												obj.Id = item2.StoneId;
												obj.Shape = item2.Shape
												obj.Color = item2.Color
												obj.Clarity = item2.Clarity
												obj.Cut = item2.Cut
												obj.Weight = item2.Weight
											}else {	//辅石
												if(item1.StoneType !== 0){
													item1.StoneType = 1
												}
												str += item2.StoneClass + '/'
												str1 += item2.Weight + '/';
												str2 += item2.Quantity + '/'
											}
										})
										obj.couplePrice = item3.RingPrice + item3.StonePrice
										obj.RingPrice = item3.RingPrice	//戒托价格
										obj.StonePrice = item3.StonePrice	
										obj.StyleNo = item3.StyleNo	//款号
										obj.StoneCategory = str.slice(0,-1);
										obj.StoneWeight =  str1.slice(0,-1);
										obj.StoneQuantity =  str2.slice(0,-1);
										obj.StyleName = item3.StyleName
										obj.Lettering = item3.Lettering
										obj.StyleCategory = item3.CategoryName
										obj.ClassName = item3.ClassName
										if(item1.Attrs&&item1.Attrs.length){
											item1.Attrs.forEach(item2=>{
												if(item2.StyleAttrName == '成色'){
													obj.finness = item2.StyleAttrValueName
												}else if(item2.StyleAttrName == '戒指手寸'||item1.StyleAttrName == '吊坠尺寸'){
													obj.handSize = item2.StyleAttrValueName
												}else if(item2.StyleAttrName == '镶口大小'){
													obj.Insert = item2.StyleAttrValueName
												}else if(item2.StyleAttrName == '工艺分级'){
													obj.telco = item2.StyleAttrValueName
												}else if(item2.StyleAttrName == '品类'){
													obj.class = item2.StyleAttrValueName
												}else if(item2.StyleAttrName == '金托类型'){
													obj.goldType = item2.StyleAttrValueName
												}
											})
										}
										array.push(obj)
									}
								})
								item1.stoneData = array;
								that.number += array.length
							}else{
								if(item1.Stones&&item1.Stones.length>0){//单品的
									let str = '',str1 = '',str2 = '';
									item1.Stones.forEach(item2=>{
										if(item2.StoneType == 0){//主石
											item1.StoneType = 0
											obj.Id = item2.StoneId;
											obj.Shape = item2.Shape
											obj.Color = item2.Color
											obj.Clarity = item2.Clarity
											obj.Cut = item2.Cut
											obj.Weight = item2.Weight
										}else {
											if(item1.StoneType !== 0){
												item1.StoneType = 1
											}
											str += item2.StoneClass + '/'
											str1 += item2.Weight + '/';
											str2 += item2.Quantity + '/'
										}
									})
									obj.StoneCategory = str.slice(0,-1);
									obj.StoneWeight =  str1.slice(0,-1);
									obj.StoneQuantity =  str2.slice(0,-1);
								}
								if(item1.Attrs&&item1.Attrs.length){
									item1.Attrs.forEach(item2=>{
										if(item2.StyleAttrName == '成色'){
											obj.finness = item2.StyleAttrValueName
										}else if(item2.StyleAttrName == '戒指手寸'||item1.StyleAttrName == '吊坠尺寸'){
											obj.handSize = item2.StyleAttrValueName
										}else if(item2.StyleAttrName == '镶口大小'){
											obj.Insert = item2.StyleAttrValueName
										}else if(item2.StyleAttrName == '工艺分级'){
											obj.telco = item2.StyleAttrValueName
										}else if(item2.StyleAttrName == '品类'){
											obj.class = item2.StyleAttrValueName
										}else if(item2.StyleAttrName == '金托类型'){
											obj.goldType = item2.StyleAttrValueName
										}
									})
								}

								arr.push(obj)
								item1.stoneData=arr
								that.number += arr.length
							}
							
						})
						that.dateialList.forEach(item=>{
							that.totalPrice += item.TotalPrice
						})
						//数组合并
						endDataList = _.concat(that.dateialList,endDataList);
						that.endDataList = endDataList
						 //款式类型属于一类的话
					})
					sortProcessData(that.endDataList);
				}
				function sortProcessData(dataList){
					let sureList = {}
					let styleType = [];	//用于盛放 款式类型Id
					let obj = {
						dataList: [],
						TotalPrice: 0
					}
					_.each(dataList, item=>{
						if(styleType.indexOf(item.StyleType) == -1){
							let sureArr = [];
							obj = {
								dataList: [],
								TotalPrice: 0
							}
							styleType.push(item.StyleType)	//未存在的添加进数组
							sureArr.push(item)
							obj.dataList = sureArr
							obj.TotalPrice = item.TotalPrice
							sureList[item.StyleType] = obj
						}else{
							sureList[item.StyleType].dataList.push(item)
							sureList[item.StyleType].TotalPrice += item.TotalPrice
						}
					})
					that.typeClassList = sureList;
				}
			},
			handleReset(name){
				if (this.$refs[name]) {
					this.$refs[name].resetFields();
				}
				//清空数据显示
				this.endDataList = [];
			},
			getStatusList(){
                Site.get({
                    url: Site.api.orderCustomize.pageDrop
                }).done(res => {
                    let data = res.data.Data,
                        list = [];
                    if(_.isArray(data)){
						_.each(data, item =>{
							if(item.DataName == 'OrderStatus'){
								list = item.DataList;
							}
						})
                    }
                    this.statusList = list;
                }).fail(err => {
                    this.statusList = [];
                })
			}
        },
		filters:{
			monetization(val){
				if(!val) return 0
				let num = val.toFixed(2)
				return (val || 0).toString().replace(/(\d)(?=(?:\d{3})+$)/g, '$1,');
			},
			getDate(val1){
				if(!val1) return 
				let val = new Date(val1);
				let year = val.getFullYear();
				let month = val.getMonth() + 1; // 记得当前月是要+1的  
					month = month < 10 ? ("0" + month) : month;  
				let dd = val.getDate();
					dd = dd < 10 ? ("0" + dd) : dd;
				let today = year + "年" + month + "月" + dd + '日' 
				return today
			}
		},
        created(){
			window.vm = this;
			// this.getStatusList();
                this.getFormData('1223')
        },
        activated(){
            // let id = this.$route.params.id
            // if(id && id != this.formData.Id){
            //     this.formData.Id = id
            //     this.getFormData(id)
            // }
        }
	}
</script>
<style lang="scss">
	.orderSearchDetails{
        .baseAttr{
            .itemContent{
                margin-top: 10px;
            }
        }
		.order_status{
			padding-left: 16px;
			.ivu-btn.ivu-btn-ghost{
				margin:0 8px;
			}
			.title{
				font-size: 14px;
				color: #1c2438;
				font-weight: 700;
				padding-right: 16px;
			}
		}
    }
	.marginAuto{
		margin: auto;
		text-align: center;
		margin-bottom: 15px;
	}
	.notEndRow{
		border-bottom:1px dashed #e9eaec;
	}
	.style_list{
		&.list_dotted{
			border-bottom: 1px dotted #e9eaec;
		}
		.list_item{
			padding: 15px;
			.order_total{
				border-bottom: 1px solid #dddee1;
				span{
					font-size: 14px;
					color: #1c2438;
					font-weight: 700;
				}
				span:last-child{
					float: right;
				}
			}
			.item_row{
				padding: 20px 0;
				.borderRight{
					padding: 5px 10px; 
					border-left: 1px solid #dddee1;
				} 
			}
			.item_flex{
				padding: 30px 10px; 
				display: flex;
				justify-content: space-around;
			}
		}
	}
	.borderRight>p,.borderRight>div{
		padding: 5px 0;
	}
	.borderRight{
		div{
			span{
				padding-right: 50px;
			}
		}
	}
	.franchiserModal .ivu-modal-body{
		text-align: center;
		img{
			width: 100%;
		}
	}
	.productPrice{
		margin: 30px 60px;
	}
	.show_data{
		padding-left: 80px; 
	}
	.showGoldWeight{
		font-size: 1rem;
		font-weight: bold;
		margin: 2rem 0;
	}
	.attrShow{
		span{
			padding-right: 10px;
		}
	}
	.attrShowNO{
		span{
			padding-right: 20px;
		}
	}
</style>