<template>
    <div class="page simpleList orderPrint" :class="pageClass">
      <div class="innerBorder ListfullHeight AllPrint" >
        <div class='borderAll' >
			<h2 align="center">-珠宝定制订货单-</h2>
			<div class="right_introInfo">
				<p>订单号码：{{formData.OrderNo}}</p>

				<p>销售顾问：{{formData.SaleUserName}}</p>
			</div>
			<div class="user_info">
				<h2>客户信息</h2>
				<div class='user_contact'>
					<span class='row_left'>姓名：{{formData.Member.MemberName}}</span>
					<span class='row_center'>电话：{{formData.Member.MemberMobile}}</span>
					<span class='row_right'>会员号：{{formData.StyleMctNum}}</span>
				</div>
			</div>

			<div class='goods_info'>
				<h2>商品信息</h2>
				<!-- 循环体 -->
				<div class="loop_div" v-for='(item,index) in endDataList' :key="index" style="margin-top:0px;">
					<h3 v-if="item.StyleType=='1'">定制类型：时尚定制</h3>
					<h3 v-if="item.StyleType=='2'">定制类型：套装系列</h3>
					<h3 v-if="item.StyleType=='3'">定制类型：来图定制</h3>
					<h3 v-if="item.StyleType=='4'">定制类型：轻奢定制</h3>
					<div class="flexBox" v-for="(item1, index1) in item.stoneData" :key="index1">
						<div class="showFlex" :class="{endRow:index==endDataList.length-1 && index1 == item.stoneData.length-1,notEndRow:index!=endDataList.length-1 || (index==endDataList.length-1 && index1 != item.stoneData.length-1)}" style="margin-top:20px;">
							<div class="row-left">
								<span>款式名称：
									<span v-if="item.StyleType=='2'">{{item1.StyleName}}</span>
									<span v-if="item.StyleType!='2'">{{item.StyleName}}</span>
								</span>
								<h3>戒托价格 &nbsp;&nbsp;&yen;
									<span v-if="item1.RingPrice && item.StyleType == '2'">{{item1.RingPrice | monetization}}</span>
									<span v-if="item.RingPrice && item.StyleType != '2'">{{item.RingPrice | monetization}}</span>
									<span v-else>0.00</span>
								</h3>
								<div class="clearance">
									<div><span>成色：{{item1.finness}}</span></div>
									<div><span>手寸：{{item1.handSize}}</span></div>
									<div><span>刻字要求：
										<span v-if="item1.Lettering && item.StyleType == '2'">{{item1.Lettering}}</span>
										<span v-if="item.Lettering && item.StyleType != '2'">{{item.Lettering}}</span>
										<span v-else>无</span></span></div>
								</div>
							</div>
							<div class='row_center'>
								<span>款式编号：
									<span v-if="item.StyleType=='2'">{{item1.StyleNo}}</span>
									<span v-if="item.StyleType!='2'">{{item.StyleNo}}</span>
								</span>
								<h3>配石价格 &nbsp;&nbsp;&yen;
									<span v-if="item1.StonePrice && item.StyleType == '2'">{{item1.StonePrice | monetization}}</span>
									<span v-if="item.StonePrice && item.StyleType != '2'">{{item.StonePrice | monetization}}</span>
									<span v-else>0.00</span>
								</h3>
								<div class="clearance">
									<div>
										<span>形状：<span v-if="item1.Shape">{{item1.Shape}}</span><span v-else>无</span></span>
										<span>切工：<span v-if="item1.Cut">{{item1.Cut}}</span><span v-else>无</span></span>
									</div>
									<div>
										<span>重量：<span v-if="item1.Weight">{{item1.Weight}}ct</span><span v-else>无</span></span>
										<span>净度：<span v-if="item1.Clarity">{{item1.Clarity}}</span><span v-else>无</span></span>
									</div>
									<div>
										<span>颜色：<span v-if="item1.Color">{{item1.Color}}</span><span v-else>无</span></span>
									</div>
								</div>
							</div>
							<div class='row_right'>
								<span>总价 &yen;
									<span v-if="item1.couplePrice && item.StyleType==2">{{item1.couplePrice | monetization}}</span>
									<span v-if="item.TotalPrice && item.StyleType!=2">{{item.TotalPrice | monetization}}</span>
								</span>
								<h3>辅石信息 </h3>
								<div class="clearance">
									<div><span>类别：<span v-if="item1.StoneCategory">{{item1.StoneCategory}}</span><span v-else>无</span></span></div>
									<div><span>粒数：<span v-if="item1.StoneQuantity">{{item1.StoneQuantity}}</span><span v-else>无</span></span></div>
									<div><span>重量：<span v-if="item1.StoneWeight">{{item1.StoneWeight}}ct</span><span v-else>无</span></span></div>
								</div>
							</div>
						</div>
						<!-- 目前按照每页4个来显示,总结的最后一页显示 -->
						<div class='total_info' v-if="index==endDataList.length-1 && index1 == item.stoneData.length-1">
							<h2>总金额：&yen;{{totalPrice  | monetization}}<sub style='margin-left: 50px;font-weight:lighter;'>共 {{number}} 件</sub></h2>
							<div class='total_date'>
								<div>下单日期：{{formData.InTime | getDate}}</div>
								<div>预计取货日期：<span class='row_border'></span></div>
								<div>店铺地址：{{formData.StoreAddr}}</div>
								<div>销售顾问：{{formData.SaleUserName}}</div>
							</div>
							<div class='align-right'>
								<div class='user_handle'>
									<p>客户确认</p>
									<div class='row_border'></div>
								</div>
								<div class='user_handle'>
									<p>签署日期</p>
									<div class='row_border'></div>
								</div>
							</div>
						</div>
						<div class="order_footer" v-if="index==endDataList.length-1 && index1 == item.stoneData.length-1">
							<div style="padding: 10px 0;">客户须知</div>
							<div>
								<div>1.定制周期：取货定制约为<span class='row_border'></span>个工作日。</div>
								<div style="padding: 10px 0;">2.如果遇到天气、法定节假日、物流、业务过于繁忙等原因，可能导致产品周期延长。</div>
							</div>
						</div>
						<div class="pageIndex showNoFooter" v-if="(index1+1)%4==0 || (index==endDataList.length-1 && index1 == item.stoneData.length-1)" style="margin:2rem auto 1rem;page-break-after:always;"><span>第 {{index==0?parseInt((index1+1)/4)>0?parseInt((index1+1)/4):parseInt((index1+1)/4)+1:parseInt((index1+1)/4)>0?parseInt((index1+1)/4)+1:parseInt((index1+1)/4)+2}} 页</span> <span>共 {{((number%4)>=0 && (number%4)<3)?parseInt(number/4)+1:parseInt(number/4)+2}} 页</span></div>
						<h2 align="center" class="showNoFooter" style="margin: 10px auto 50px;" v-if="(index1+1)%4==0 || (index==endDataList.length-1 && index1 != item.stoneData.length-1)">-珠宝定制订货单-</h2>
					</div>
				</div>
			</div>
			<Button type="primary" @click="activePrint" class='noPrintTable'>打印</Button>
        </div>
      </div>
    </div>
</template>

<script>
    export default {
        name: 'orderPrint',
        data () {
            return {
				pageClass: 'orderPrint',
				totalPrice: 0,
				number: 0,
				num: 1,
				dateialList: [],
				endDataList: [],
				showFormData:{
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
					StoreName: '',
					StoreAddr: ''	//店铺完整地址
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
					StoreName: '',
					StoreAddr: ''	//店铺完整地址
				}
            }
        },
        methods: {
            activePrint (){
                    let AllPrint = $(".AllPrint").html();
                    let oPop = window.open('','oPop');  
                    let str = '<!DOCTYPE html>'  
                        str +='<html>'  
                        str +='<head>'  
                        str +='<meta charset="utf-8">'  
                        str +='<meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">';
						str+='<style>';
						str+= 'body,html{font-size: 9px !important;}';
						str+= '.noprint,.noPrintTable{display:none;}';
						str+= 'ul li{list-style-type:none;}';
						str+='.orderPrint{width: 85%;margin:auto;}';
						str+= '.noPrintTable{float:right;}.right_introInfo{float:right;}.user_info{padding:15px 0;margin:15px 0;}.user_info .user_contact span{float:left;}.user_info .user_contact .row_left{width:36%;}.user_info .user_contact .row_center{width:35%;display:inline-block;}.user_info .user_contact .row_right{width:20%;display:inline-block;}.goods_info h2{margin:15px 0;}.goods_info .loop_div .notEndRow{border-bottom:1px dashed #dddee1;}.goods_info .loop_div .endRow{margin-bottom:5px;border-bottom:1px solid #dddee1;}.goods_info .loop_div h3{padding:0px 0;}.goods_info .loop_div .showFlex>div{width:35%;display:inline-block;padding:5px 0;}.goods_info .loop_div .showFlex .row_center{width:40%;}.goods_info .loop_div .showFlex .row_right{width:20%;}.total_info .align-right{text-align:right;margin-top:7rem;}.total_info .user_handle{text-align:left;display:inline-block;margin:3rem 4rem 0 0;}.total_info .user_handle .row_border{padding:20px 70px;border-bottom:1px solid #dddee1;}.total_info .total_date{margin-top:25px;}.total_info .total_date div{padding:5px 0;}.total_info .total_date div .row_border{padding:0px 80px;border-bottom:1px solid #dddee1;}.order_footer .row_border{padding:0px 30px;border-bottom:1px solid #dddee1;}';
						str+='.clearance div{padding: 5px 0;} .total_info h2{margin-top: 20px;} .user_info h2{margin-top: 50px;} .goods_info h2{margin: 20px 0;} .clearance div span{padding-right: 50px;}';
						str+='.pageIndex{text-align:center;}.pageIndex span{padding:10px 5px;}';
						str+='</style>';  
                        str +='</head>'
                        str +='<body>'  
                        str +='</body>'  
                        str +='</html>'     
                    oPop.document.write(str);
                    oPop.document.body.innerHTML=AllPrint; 
                    oPop.print();  
                    oPop.close(); 
            },
			handleReset(name){
				if (this.$refs[name]) {
					this.$refs[name].resetFields();
				}
				//清空数据显示
				this.endDataList = [];
			},
			getFormData(id) {
				/*let formData = {
					id: id
				};
				let that = this;
				this.handleReset('form');
				const loader = this.$Message.loading({
					content: "正在加载中...",
					duration: 0
				});
				Site.get({
					url: Site.api.orderCustomize.getPrintInfo,
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
				let that = this;
				
				setStyleType([])
				function setStyleType(list){
					let endDataList = []	//最终得到的数组来显示
					that.number = 0;
					that.totalPrice = 0;					
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
											}else {
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
					})
				}
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
        created () {
			window.vm = this;
        },
        activated (){
            let id = this.$route.params.id;
            // if(id && this.formData.Id != id){
			// 	this.formData.Id = id
			// 	this.list = [];
                this.getFormData(2123);
            // }
		}
    }
</script>

<style lang="scss">
	.noPrintTable{
		float: right;
	}
	.right_introInfo{
		float: right;
	}
	.user_info{
		padding: 15px 0;
		margin: 15px 0;
		.user_contact{
			border: 0px solid red;
			span{
				width: 45%;
				display: inline-block;
			}
			.row_center{
				width: 40%;
				display: inline-block;
			}
			.row_right{
				width: 13%;
				display: inline-block;
			}
		}
	}
	.goods_info {
		 h2{
			margin: 15px 0;
		}
		.loop_div {
			.notEndRow{
				border-bottom: 1px dashed #dddee1;
			}
			.endRow{
				margin-bottom: 10px;
				border-bottom: 1px solid #dddee1;
			}
			 h3{
				padding: 10px 0;
			}
			.flexBox{
				width: 100%;
			}
			.showFlex>div{
				width: 45%;
				display: inline-block;
				padding: 10px 0;
			}
			.showFlex{
				.row_center{
					width: 40%;
				}
				.row_right{
					width: 13%;
				}
			}
		}
	}
	.total_info{
		.align-right{
			text-align: right;
			margin-top: 7rem;
		}
		.user_handle{
			text-align: left;
			display: inline-block;
			margin: 3rem 3rem 0 0;
			.row_border{
				padding: 20px 80px;
				border-bottom: 1px solid #dddee1;
			}
		}
		.total_date{
			margin-top: 25px;
			div{
				padding: 2px 0;
				.row_border{
					padding: 0px 80px;
					border-bottom: 1px solid #dddee1;
				}
			}
		}
	}
	.order_footer{
		margin-bottom: 1rem;
		.row_border{
			padding: 0px 30px;
			border-bottom: 1px solid #dddee1;
		}
	}
	.clearance div{
		padding: 5px 0;
	}
	.total_info h2,
	.user_info h2{
		margin: 20px 0;
	}
	.clearance div span{
		padding-right: 100px; 
	}
	.pageIndex{
		text-align: center;
		span{
			padding: 10px 5px;
		}
	}

	.showNoFooter{
		display: none;
	}
</style>
