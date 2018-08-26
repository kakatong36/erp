<template>
	<div class="supplierManagement">
		<div class="filter">
			<Form ref="form" :model="searchFormData" :label-width="100" inline onsubmit="return false" v-if="!isHide">
				<FormItem label="供货商名称">
					<Input v-model.trim="searchFormData.account" placeholder="请输入供货商名称" />
				</FormItem>
				<FormItem label="联系方式">
					<Input v-model.trim="searchFormData.contactTel"  placeholder="请输入联系方式" />
				</FormItem>
				<!-- 供货商所在地区 -->
				
				<FormItem label="供货商状态">
					<Select v-model="searchFormData.status" clearable placeholder="请选择供货商状态">
						<Option v-for="item in statusList" :key="item.Id" :value="item.Id">{{item.Name}}</Option>
					</Select>
				</FormItem>
			</Form>
			<div class="btns">
				<Button type="ghost" @click="search">查询</Button>
				<Button type="ghost" @click="handleReset">清空查询条件</Button>
			</div>
		</div>
		<div class="area-btns">
			<Button type="primary" @click="isAddModal=true">新增供货商</Button>
			<!-- <Button type="ghost" @click="getGroupModal">供货商分组</Button> -->
		</div>
		<div class="dataArea">
			<div class="Tree" :class="{shrink:direction=='right'}">
				<div class="hidden-area">
					<h3>供货商分组</h3>
					<Tree :data="acTree" :render="renderContent"></Tree>
				</div>
				<!-- <div class="side-row">
					<div @click="handlerAside('left')" v-if="direction=='left'">
						<Icon type="arrow-left-b" :size="20"></Icon>
					</div>
					<div @click="handlerAside('right')" v-if="direction=='right'">
						<Icon type="arrow-right-b" :size="20"></Icon>
					</div>
				</div> -->
			</div>
			<div class="tableWrap">
				<h3 v-if="isShowTable">{{nowTreeName}}</h3>
				<jqTable  v-show="isShowTable" ref="jqTable" @onRowSelect="setListDataSelected"></jqTable>
				<Page 
				 	v-if="isShowTable"
					@on-change="pageChange" 
					@on-page-size-change="pageSizeChange" 
					:current="pager.pageIndex" 
					:page-size="pager.pageSize" 
					:total="pager.total" 
					:page-size-opts="[10, 15, 20, 30, 40]" 
					placement="top" show-sizer show-elevator show-total>
				</Page>
				<div class="view-info" v-if="isShowView">
					<h3>基础信息</h3>
					<div class="base">
						<Row>
							<Col span="12">
								<span>供货商名称：</span>
								<span>{{formDataview.supplierName}}</span>
							</Col>
							<Col span="12">
								<span>助记码：</span>
								<span>{{formDataview.code}}</span>
							</Col>
						</Row>
						<Row>
							<Col span="12">
								<span>联系人：</span>
								<span>{{formDataview.contentPerson}}</span>
							</Col>
							<Col span="12">
								<span>联系方式：</span>
								<span>{{formDataview.contentTel}}</span>
							</Col>
						</Row>
						<Row>
							<Col span="12">
								<span>所在地区：</span>
								<span>{{formDataview.Province}}{{formDataview.City}}{{formDataview.Area}}</span>
							</Col>
							<Col span="12">
								<span>详细地址：</span>
								<span>{{formDataview.address}}</span>
							</Col>
						</Row>
						<Row>
							<Col span="12">
								<span>供货商等级：</span>
								<span>{{formDataview.supplierGrade}}</span>
							</Col>
							<Col span="12">
								<span>供货商分组：</span>
								<span>{{formDataview.supplierGroup}}</span>
							</Col>
						</Row>
						<Row>
							<Col span="12">
								<span>供货商状态：</span>
								<span>{{formDataview.supplierStatus?'可用':'不可用'}}</span>
							</Col>
							<Col span="12">
								<span>借还货权限：</span>
								<span>{{formDataview.permissions}}</span>
							</Col>
						</Row>
					</div>
					<h3>账户信息</h3>
					<!---->
					<div class="account">
						<Row>
							<Col span="12">
								<span>账户银行：</span>
								<span>{{formDataview.bank}}</span>
							</Col>
							<Col span="12">
								<span>开户行：</span>
								<span>{{formDataview.depositBank}}</span>
							</Col>
						</Row>
						<Row>
							<Col span="12">
								<span>银行卡账号：</span>
								<span>{{formDataview.bankAccount}}</span>
							</Col>
							<Col span="12">
								<span>户名：</span>
								<span>{{formDataview.accountName}}</span>
							</Col>
						</Row>
						<Row>
							<Col span="24">
								<span>国税编码：</span>
								<span>{{formDataview.TaxCode}}</span>
							</Col>
						</Row>
					</div>
					<h3>授信</h3>
					<div class="credit">
						<Row>
							<Col span="12">
								<span>授信额度(元)：</span>
								<span>{{formDataview.creditLine}}</span>
							</Col>
							<Col span="12">
								<span>免息天数：</span>
								<span>{{formDataview.freeDays}}</span>
							</Col>	
						</Row>
						<Row>
							<Col span="12">
								<span>日利率：</span>
								<span>{{formDataview.dayRate}}</span>
							</Col>
							<Col span="12">
								<span>起息额：</span>
								<span>{{formDataview.startingRate}}</span>
							</Col>	
						</Row>
					</div>
				</div>
			</div>
		</div>
		<Modal
			v-model="isAddModal"
			:title="formData.Id?'编辑供货商':'新增供货商'"
			:mask-closable="false"
			:width="950">
			<Form ref="form" :model="formData" :rules="formDataValidate" :label-width="100" onsubmit="return false" class="addForm">
				<h3>基础信息</h3>
				<div class="base">
					<Row>
						<Col span="12">
							<FormItem label="供货商名称" prop="supplierName">
								<Input v-model.trim="formData.supplierName" placeholder="请输入供货商名称" />
							</FormItem>
						</Col>
						<Col span="12">
							<FormItem label="助记码" prop="code">
								<Input v-model.trim="formData.code"  placeholder="请输入助记码" />
							</FormItem>
						</Col>
					</Row>
					<Row>
						<Col span="12">
							<FormItem label="联系人" prop="contentPerson">
								<Input v-model.trim="formData.contentPerson"  placeholder="请输入联系人" />
							</FormItem>
						</Col>
						<Col span="12">
							<FormItem label="联系方式" prop="contentTel">
								<Input v-model.trim="formData.contentTel"  placeholder="请输入联系方式" />
							</FormItem>
						</Col>
					</Row>
					<Row>
						<Col span="12">
							<FormItem label="所在地区" prop="regionElem">
								<v-distpicker :province="formData.Province" :city="formData.City" :area="formData.Area" @selected="regionElemCallback($event)" class="address-area"></v-distpicker>
							</FormItem>
						</Col>
						<Col span="12">
							<FormItem label="详细地址" prop="address">
								<Input v-model.trim="formData.address" placeholder="请输入详细地址" />
							</FormItem>
						</Col>
					</Row>
					<Row>
						<Col span="12">
							<FormItem label="供货商等级" prop="supplierGrade">
								<Select v-model="formData.supplierGrade" placeholder="请选择供货商等级">
									<Option v-for="item in GradeList" :key="item.Id" :value="item.Id">{{item.Name}}</Option>
								</Select>
							</FormItem>
						</Col>
						<Col span="12">
							<FormItem label="供货商分组" prop="supplierGroup">
								<Select v-model="formData.supplierGroup" placeholder="请选择供货商分组">
									<Option v-for="item in GroupList" :key="item.Id" :value="item.Id">{{item.Name}}</Option>
								</Select>
							</FormItem>
						</Col>
					</Row>
					<Row>
						<Col span="12">
							<FormItem label="供货商状态" prop="supplierStatus">
								<!-- <Select v-model.trim="formData.supplierStatus" placeholder="请选择供货商状态">
									<Option v-for="item in statusList" :key="item.Id" :value="item.Id">{{item.Name}}</Option>
								</Select> -->
								<i-switch v-model="formData.supplierStatus" @on-change="handlerChange"></i-switch>
							</FormItem>
						</Col>
						<Col span="12">
							<FormItem label="是否有可向总部借货权限" prop="permissions" :label-width="170">
								<Checkbox v-model="formData.permissions"></Checkbox>
							</FormItem>
						</Col>
					</Row>
				</div>
				<h3>账户信息</h3>
				<div class="account">
					<Row>
						<Col span="12">
							<FormItem label="账户银行" prop="bank">
								<Input v-model.trim="formData.bank"  placeholder="请输入账户银行" />
							</FormItem>
						</Col>
						<Col span="12">
							<FormItem label="开户行" prop="depositBank">
								<Input v-model.trim="formData.depositBank"  placeholder="请输入开户行" />
							</FormItem>
						</Col>
					</Row>
					<Row>
						<Col span="12">
							<FormItem label="银行卡账号" prop="bankAccount">
								<Input v-model.trim="formData.bankAccount"  placeholder="请输入银行卡账号" />
							</FormItem>
						</Col>
						<Col span="12">
							<FormItem label="户名" prop="accountName">
								<Input v-model.trim="formData.accountName"  placeholder="请输入户名" />
							</FormItem>
						</Col>
					</Row>
					<Row>
						<Col span="12">
							<FormItem label="国税编码" prop="TaxCode">
								<Input v-model.trim="formData.TaxCode"  placeholder="请输入国税编码" />
							</FormItem>
						</Col>
					</Row>
				</div>
				<h3>授信</h3>
				<div class="credit">
					<Row>
						<Col span="12">
							<FormItem label="授信额度(元)" prop="creditLine">
								<Input v-model.trim="formData.creditLine" placeholder="请输入授信额度" />
							</FormItem>
						</Col>
						<Col span="12">
							<FormItem label="免息天数" prop="freeDays">
								<Input v-model.trim="formData.freeDays"  placeholder="请输入免息天数" />
							</FormItem>
						</Col>	
					</Row>
					<Row>
						<Col span="12">
							<FormItem label="日利率" prop="dayRate">
								<Input v-model.trim="formData.dayRate"  placeholder="请输入日利率" />
							</FormItem>
						</Col>
						<Col span="12">
							<FormItem label="起息额" prop="startingRate">
								<Input v-model.trim="formData.startingRate"  placeholder="请输入起息额" />
							</FormItem>
						</Col>	
					</Row>
				</div>
			</Form>
			<div slot="footer">
				<Button type="primary" @click="handleSubmit('form')" html-type="submit">保存</Button>
				<Button type="ghost" @click="handleResetCloseClose('form')" style="margin-left: 15px;">取消</Button>
			</div>
		</Modal>
		<Modal
			title="供货商分组管理"
			:width="650"
			:mask-closable="false"
			v-model="isShowGroupModal">
				<Form ref="modalSearchForm" inline :label-width="80" label-position="left">
					<FormItem label="分组名称">
						<Input v-model="modalSearchForm.groupName" placeholder="请输入分组名称" />
					</FormItem>
					<FormItem>
						<Button type="primary" @click="searchGroupList">查询</Button>
					</FormItem>
				</Form>
				<div class="btns">
					<Button type="primary" @click="handleAddGroup">新建</Button>
					<Button type="ghost" @click="handleDelBatch">批量删除</Button>
					<Button type="ghost" @click="searchGroupList">刷新</Button>
				</div>
				<jqTable ref="supGroupTable"></jqTable>
				<div slot="footer"></div>	
		</Modal>
		<Modal
			:title="submitFormData.Id?'编辑供货商分组':'添加供货商分组'"
			v-model="showAddParent"
			:mask-closable="false" 
			class="action-modal">
				<Form ref="form" :model="submitFormData" :rules="ruleValidate" :label-width="80" onsubmit="return false">
					<FormItem label="分组名称" prop="purseName">
						<Input v-model="submitFormData.purseName" placeholder="请输入分组名称" />
					</FormItem>
					<FormItem label="助记码" prop="code">
						<Input v-model="submitFormData.code" placeholder="请输入助记码" />
					</FormItem>
					<FormItem label="标签" prop="labelName">
						<!-- 图片下拉组件 -->
						<div id='jqxDropDownList'></div>
						<Input v-model="submitFormData.labelName" placeholder="请输入标签" />
					</FormItem>
					<FormItem label="排序" prop="Sort">
						<Input v-model="submitFormData.Sort" placeholder="请输入排序" />
					</FormItem>
				</Form>
				<div slot="footer">
					<Button type="primary"  html-type="submit" @click="handleSubmit('form')">提交</Button>
					<Button type="ghost" @click="showAddParent=false">取消</Button>
				</div>
		</Modal>
	</div>
</template>

<script>
	// import m_auth from '@/../mixins/auth'
	export default {
		name: 'supplierManagement',
		// mixins: [m_auth],
		data () {
			return {
				date: [],
				isHide: false,
				isShowTable: false,
				isShowView: false,
				isShowGroupModal: false,
				nowTreeName: "",
				nowTreeId: "",
				direction: "left",
				acTree: [],
				modalSearchForm: {
					groupName: ""
				},
				imgs: [
					{
						Id: "123456",
						code: "15246689.png"
					},
					{
						Id: "7887455445",
						code: "xvvdv.png"
					}
				],
				formData:{
					supplierName: "",
					code: "",
					contentPerson: "",
					contentTel: "",
					Province: "",
					City: "",
					Area: "",
					address: "",
					supplierGradeId: "",
					supplierGrade: "",
					supplierGroupId: "",
					supplierGroup: "",
					supplierStatus: true,
					permissions: "",
					bank: "",
					depositBank: "",
					bankAccount: "",
					accountName: "",
					TaxCode: "",
					creditLine: 0,
					freeDays: 0,
					dayRate: 0,
					startingRate: 0
				},
				formDataview: {
					supplierName: "深圳钻石供货商",
					code: "zs2015",
					contentPerson: "小强",
					contentTel: "15275687937",
					Province: "广东省",
					City: "深圳市",
					Area: "罗湖区",
					address: "贝丽南路59号",
					supplierGradeId: "5sg4d64fh6gf4h656gh65",
					supplierGrade: "VIP级",
					supplierGroupId: "F56sd4g56f6ds7g67f6d7g0C",
					supplierGroup: "分组1",
					supplierStatus: true,
					permissions: false,
					bank: "平安银行",
					depositBank: "坂田支行",
					bankAccount: "6214057583020143",
					accountName: "深圳公司",
					TaxCode: "1548995465695",
					creditLine: 564800,
					freeDays: 20,
					dayRate: "0.3%",
					startingRate: 2500000
				},
				formDataValidate: {
					supplierName: [
						{ required: true, message: "供货商名称不可为空"}
					],
					contentPerson: [
						{ required: true, message: "联系人不可为空"}
					],
					contentTel: [
						{ required: true, message: "联系方式不可为空"},
						// { validator: Site.formValidate.isTel, name: "联系方式"}
					],
					supplierGradeId: [
						{ required: true, message: "供货商等级不可为空"}
					],
					supplierGroupId: [
						{ required: true, message: "供货商分组不可为空"}
					],
					bank: [
						{ required: true, message: "账户银行不可为空"}
					],
					depositBank: [
						{ required: true, message: "开户行不可为空"}
					],
					bankAccount: [
						{ required: true, message: "银行卡账号不可为空"}
					],
					accountName: [
						{ required: true, message: "户名不可为空"}
					],
					creditLine: [
						{ required: true, message: "授信额度不可为空"}
					],
					accountName: [
						{ required: true, message: "免息天数不可为空"}
					],
					dayRate: [
						{ required: true, message: "日利率不可为空"}
					],
					startingRate: [
						{ required: true, message: "起息额不可为空"}
					],
					regionElem: [
						{ required: true, message: "所在区域不可为空"}
					],
					supplierGroup: [
						{ required: true, message: "供货商分组不能为空"}
					],
					supplierGrade: [
						{ required: true, message: "供货商等级不能为空"}
					]
				},
				submitFormData: {
					Id: "",
					purseName: "",
					Sort: 0,
					code: "",
					labelName: ""
				},
				showAddParent: false,
				searchFormData: {
					account: "",
					contactTel: "",
					status: ""
				},
				ruleValidate: {
					purseName: [
						{ required: true, message: "分组名称不可为空"}
					],
					labelName: [
						{ required: true, message: "分组标签不可为空"}
					]
				},
				datafield: {},
				searchMGroupFormData: {
					groupName: ""
				},
				imgUrl: Site.api.upfileBaseUrl,
				isChange: false,
				isChangeGroup: false,
				isShowModal: false,
				isAddModal: false,
				isShowMemGroup: false,
				GradeList:[],	//会员等级下拉
				GroupList: [],	//会员分组下拉
				listDataSelected: [],
				list: [],
				imgList: [],
				roleList:[],
				statusList:[
					{
						Id: "0",
						Name: "未启用"
					},{
						Id: "1",
						Name: "启用"
					}
				],
				followPeopleList: [],
				pager: {
					pageIndex: 1,
					pageSize: 10,
					total: 0
				},
				Permissions:{
					"add": false,
					"edit": false,
					"delete": false
				}
			}
		},
		watch: {
			list: function(newValue){
				this.$refs.jqTable.updata(newValue)
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
			setListDataSelected () {

			},
			regionElemCallback(region){
				this.formDataview.ProvinceId = region.province.code
				this.formDataview.Province = region.province.value
				this.formDataview.CityId = region.city.code
				this.formDataview.City = region.city.value
				this.formDataview.AreaId = region.area.code
				this.formDataview.Area = region.area.value
				this.formDataview.regionElem = this.formDataview.Province + '/' + this.formDataview.City + '/' + this.formDataview.Area 
			},
			handleAddGroup(){
				this.$refs.supGroupTable.el.jqxGrid("clearselection")
				this.$refs.supGroupTable.el.jqxGrid('addrow', null, {
					Id: '',
					supplierGroupName: "",
					code: "",
					label: "",
					Sort: 0
				}, "first");
			},
			handleDelBatch(){
				let selectedCells = this.$refs.supGroupTable.el.jqxGrid('getselectedcells');	//重复的rowindex
				if (!selectedCells.length){
					this.$Message.error('请选择行号!')
					return
				}
				let endSelectCells = [];
				_.each(selectedCells, cell =>{
					if(endSelectCells.indexOf(cell.rowindex) == -1){
						endSelectCells.push(cell.rowindex);
					}
				})
				let ids = [];
				let noIdList = []
				for(let rowIndex of endSelectCells){
					let rowData = this.$refs.supGroupTable.getData(rowIndex);
					if(rowData.Id){
						ids.push(rowData.Id);
					}else{
						noIdList.push(rowData.uid)
					}
				}
				if(!ids[0] && !noIdList.length){
					this.$Message.error('请选择行号!');
					return false;
				}
				this.$Modal.confirm({
					title: '提示',
					content: '要删除选中的数据吗?',
					loading: true,
					onOk: () => {
						if(noIdList.length){
							this.$refs.supGroupTable.delete(noIdList)
							this.list = this.$refs.supGroupTable.getData;
						}
						if(!ids.length){
							this.$Modal.remove()
							return
						}
						$.when(this.del(ids)).done(res => {
							this.searchGroupList();
							this.$Message.success(res.message || '删除成功!');
						}).fail( err => {
							this.$Message.error(err.message || '删除失败!');
						}).always(() => {
							this.$Modal.remove();
						});
					}
				});
			},
			handleDel(data) {
				this.$Modal.confirm({
					title: "提示",
					content: '确定要删除该会员分组吗?',
					loading: true,
					onOk: () => {
					$.when(this.del([data.Id])).done(res => {
							// this.getMGroupList();
							this.$Message.success(res.message || "删除成功!");
						}).fail(err => {
							this.$Message.error(err.message || "删除失败!");
						}).always(() => {
							this.$Modal.remove();
						});
					}
				});
			},
			del(ids) {
				let dtd = $.Deferred(),
					url = Site.api.memberGroup.delete,
					formData = { ids : ids};
				Site.post({
					url: url,
					data: formData
				}).done(res => {
					dtd.resolve(res);
				}).fail(err => {
					dtd.reject(err);
				});
				return dtd;
			},
			searchGroupList(){
				let formData = _.extend({},this.modalSearchForm)
				_.each(formData,(value,key) =>{
					if(!value){
						delete formData[key]
					}
				})

				/*Site.get({
					url: none,
					data: formData
				}).done( res =>{
					let data = res.data
					this.supplierGroupList = data
				}).fail( err =>{
					this.supplierGroupList = []
				})*/
			},
			getItem (list) {
				this.action = 0;
				if(!list || !list[0]){	//取消选中时,添加界面都不存在
					this.isShowTable = false
					this.nowTreeId = ""
					this.nowTreeName = ""
					// this.ObjectRest(this.formData);
					return;
				}else{
					this.isShowTable = true
					if(list[0]._isParent){
						//展示全部的列表数据
						this.nowTreeId = ""
						this.nowTreeName = "全部供货商"
					}else{
						if(list && list[0]){
							this.nowTreeId = list[0].Id
							this.nowTreeName = "属于分组【"+list[0].title+"】的供货商"
						}
					}
					//请求字典值列表
					// this.getValueList();
				}
			},
			renderContent(h, { root, node, data }){
				// let bg = data.value == this.nowTreeId?'#d5e8fc':''
				let bg = !data._isParent && data.content && data.content.Id == this.nowTreeId?'#d5e8fc':''
				if(data.noButton){
					btn = null
				}
				return h('span', {
					style: {
						display: 'inline-block',
						width: '100%'
					}
				}, [
					h('span', {
						style: {
							padding: '3px',
							cursor: 'pointer',
							background: bg,
							borderRadius: '3px'
						},
						on: {
							click: () => {
								let id = !data._isParent && data.content && data.content.Id
								if(this.nowTreeId == id){
									this.nowTreeId = ''
									this.formData.DicId = "";
									this.getItem([])
								}else{
									this.nowTreeId = id
									this.formData.DicId = id;
									this.getItem([data])
								}
							}
						}
					}, data.title),
					h('span', {
						style: {
							display: 'inline-block',
							float: 'right',
							marginTop: '-3px',
							marginRight: '32px'
						}
					}, [
						h('Button', data._isParent?{
							props: Object.assign({}, this.buttonProps, {
								icon: 'ios-plus-empty',
								type: "primary"
							}),
							style: {
								borderRadius: "100%",
								width: "24px",
								height: "24px",
								padding: '3px 0 2px'
							},
							on: {
								click: () => { 
									console.log(data)
									//添加二级数据
									this.showAddParent = true
									if(data._isParent){
										// this.submitFormData.ParentId = data.Id
									}else{
										// this.submitFormData.ParentId = ""
									}			
									// this.handleAdd(data)
								}
							}
						}:{
							style: {
								display: "none"
							}
						}),
						h('Button', !data._isParent?{
							props: Object.assign({}, this.buttonProps, {
								icon: 'edit'
							}),
							style: {
								marginRight: '8px',
								borderRadius: "100%",
								width: "24px",
								height: "24px",
								padding: '3px 0 2px'
							},
							on: {
								click: () => { 
									console.log(data)
									//编辑 
									this.showAddParent = true;
									this.submitFormData.Id = data.Id
									//排序赋值
									if(data._isParent){
										// this.submitFormData.ParentId = ""
									}else{
										//这里拿值有问题
										// this.submitFormData.ParentId = data.parentId
									}			
									// this.handleEdit(data)
								}
							}
						}:{
							style: {
								display: "none"
							}
						}),
						h('Button', !data._isParent?{
							props: Object.assign({}, this.buttonProps, {
								icon: 'minus'
							}),
							style: {
								borderRadius: "100%",
								width: "24px",
								height: "24px",
								padding: '3px 0 2px'
							},
							on: {
								click: () => {
									// this.handleDelDic(data)
								}
							}
						}:{
							style: {
								display: "none"
							}
						})
					])
				])
			},
			createTree(list){
				list = [
					{
						"Id":"946da4e7-f0af-4891-b0b2-be81438785c4",
						"SubjectCode":"30",
						"SubjectName":"超级供货商"
					},
					{
						"Id":"1a96b1ee-8a00-42c5-8076-daf319eb5a0c",
						"SubjectCode":"40",
						"SubjectName":"至尊供货商"
					}
				]
				if(!list || !list.length){
					this.acTree = []
					return 
				}
				this.acTree = [];
				let obj = {
						title: `全部分组`,
						selected: true,
						_isParent: true,
						expand: true,
						children: []
				}
				list.map((item, index, arr) =>{
					// if(item.ChildList && item.ChildList.length){
					// 	_.each(item.ChildList, child => {
							obj.children.push({
								title: `${item.SubjectName}`,
								selected: false,
								Id: item.Id,
								content: item,
								parentId: item.Id
							})
					// 	})
					// }
				})
				this.acTree.push(obj)
				if(this.acTree && this.acTree[0]){
					this.getItem([this.acTree[0]])
				}
			},
			handlerChange(status){
				this.formData.supplierStatus = status;
			},
			handleReset(){
				this.searchFormData = {
					account: "",
					status: "",
					contactTel: ""
				}
			},
			handleResetCloseClose(name){
				this.$refs[name].resetFields();
				this.isAddModal = false
			},
			handleSubmit(name){
				this.$refs[name].validate((valid) => {
					if (valid) {
						let url = Site.api.userManager.resetPwd
						// Site.post({
						// 	url: url,
						// 	data: data
						// }).done(res =>{
						// 	if (res && res.code == 1001){
						// 		this.$Message.success(res.message || "提交成功!")
						// 	}
						// }).fail(err =>{
						// 	this.$Message.error(err.message || "提交失败!")
						// })
					} else {
						this.$Message.error('表单验证失败!');
					}
				})
			},
			search (pageIndex) {
				// let gradeId = this.$route.query.gradeId
				// this.searchFormData.levelId = gradeId || ""
				let formData = _.extend({}, this.searchFormData);
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
				//query传值过来，导致没有过滤掉无值的字段
				_.each(myFormData, (value,key) =>{
					if(!value){
						delete formData[key]
					}
				})
				this.list = []
				/*Site.get({
					url: Site.api.userManager.getMerBindUserPageList,
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
					this.list = []
					this.pager.total = 0
					if(err.code == -1001 && (err.message == "无数据" || err.message == "没有数据")){
						return 
					}
					this.$Message.error(err.message)
				});*/
			},
			createTable (tableModel) {
				let that = this;
				let jqTable = this.$refs.jqTable;
				jqTable.init({
					type: 'edit',
					data: {
						datatype: 'json',
						localdata: this.list,
						datafields: [
							{ name: 'UserId', type: 'string'},
							{ name: 'Account', type: 'string'},
							{ name: 'Mobile', type: 'string'},
							{ name: 'StatusName', type: 'string'},
							{ name: 'RealName', type: 'string'},
							{ name: 'NickName', type: 'string'},
							{ name: 'MemberGroupName', type: 'string'},
							{ name: 'supplierGroupName', type: 'string'},
							{ name: 'Level', type: 'string'}
						]
					},
					cols: tableModel,
					vm: this,
					custom: {
						// height: this.$refs.jqTable.el.parent().height()-2,
						// width:  this.$refs.jqTable.el.parent().width()-2
					}
				})
			},
			getGradeList(){	//会员等级
				this.GradeList = []
				Site.get({
					url: Site.api.memberLevel.dropList
				}).done( res =>{
					if(res && res.code == 1001){
						let data = res.data
						if(data){
							this.GradeList = data
						}
					}
				}).fail( err =>{
					this.GradeList = []
					if(err.code == -1001 && (err.message == "无数据" || err.message == "没有数据")){
						return 
					}
					this.$Message.error(err.message)
				})
			},
			getGroupModal(){
				this.isShowGroupModal = true
				this.searchGroupList()
			},
			getGroupList(){	//会员分组下拉
				this.GroupList = []
				Site.get({
					url: Site.api.memberGroup.dropList
				}).done( res =>{
					if(res && res.code == 1001){
						let data = res.data
						if(data){
							this.GroupList = data
						}
					}
				}).fail( err =>{
					this.GroupList = []
					if(err.code == -1001 && (err.message == "无数据" || err.message == "没有数据")){
						return 
					}
					this.$Message.error(err.message)
				})
			},
			getFormData(id){
				let formData = {
					userId: id
				};
				this.isShowModal = true
				this.getGroupList();
				this.isChangeGroup = false
				this.isChange = false
				this.formData = {}
				Site.get({
					url: Site.api.userManager.getFactoryMember,
					data: formData
				}).done(res => {
					if(res && res.code == 1001){
						let data = res.data
						if(data){
							this.formData = data
						}
					}
				}).fail(err =>{
					this.$Message.error(err.message || '获取会员信息失败!');
				});
			},
			handlerAside(toDirection){
				if(toDirection == "left"){
					this.direction = "right"
				}else if(toDirection == "right"){
					this.direction = "left"
				}
			},
			getImgsList(){
				var source =
					{
						localdata: this.imgList,
						datatype: "array"
					};

					var dataAdapter = new $.jqx.dataAdapter(source);
					/*$('#jqxDropDownList').jqxDropDownList({
						theme: 'energyblue',
							source: dataAdapter,
							displayMember: "firstname",
							valueMember: "notes",
							itemHeight: 50,
							height: 25,
							width: 270,
							renderer: function (index, label, value) {
								console.log(value)
								var datarecord = data[index];
								var table = '<img src="123.png" />';
								return table;
							}
					});;*/
			}
		},
		created () {
			window.vm = this
			let url = this.$route.path
			/*if(Site.menuList && Site.menuList.length>0){
				_.each(Site.menuList, item =>{
					if(item.ChildList && item.ChildList.length>0){
						_.each(item.ChildList, item1 =>{
							if(item1.Url == url){
								if(item1.ButtonList && item1.ButtonList.length>0){
									this.buttonList = item1.ButtonList;	//当前页面的具有权限的按钮列表
									_.each(this.buttonList, btn =>{
										if(btn.Action){
											this.Permissions[btn.Action] = true;
										}
									})
								}
							}
						})
					}
				})
			}*/
			this.createTree([])
			this.getImgsList();
		},
		mounted () {
			this.createTable(page.tableModel)
			//供货商分组初始化
			let width = 590
			// if(!this.Permissions["add"] && !this.Permissions["edit"] && !this.Permissions["delete"]){
			// 	_.remove(page.mGroupTableModel, item =>{
			// 		item.editable = false
			// 		return item.isShow === false
			// 	})
			// 	width = 390
			// }
			let that = this,
				supGroupTable = this.$refs.supGroupTable;
				supGroupTable.init({
					type: 'edit',
					data: {
						datatype: 'json',
						localdata: this.supplierGroupList,
						datafields: [
							{ name: 'Id', type: 'string'},
							{ name: 'supplierGroupName', type: 'string'},
							{ name: 'code', type: 'string'},
							{ name: 'label', type: 'string'},
							{ name: 'Sort', type: 'number'}
						]
					},
					cols: page.groupModal,
					vm: this,
					custom: {
						width: width,
						ready(){
							supGroupTable.el.on('cellbeginedit', function (event){
								let args = event.args,
									datafield = args.datafield,
									index = args.rowindex,
									value = args.value,
									rowData = args.row;
								if(['supplierGroupName', 'label','Sort'].indexOf(datafield)>-1){
									that['datafield'] = datafield
								}else{
									that['datafield'] = ''
								}
							})
						}
					}
				})
		},
		activated () {
		}
	}
	const page = {
		tableModel: [
			{text: '供货商名称', datafield: 'supplierName', width: 150, editable: false},
			{text: '供货商分组', datafield: 'supplierGroupName', width: 150, editable: false},
			{text: '联系人', datafield: 'NickName',  width: 100,editable: false},
			{text: '联系方式', datafield: 'RealName',  width: 100,editable: false},
			{text: '所在地区', datafield: 'Mobile',  width: 120,editable: false}, 
			{text: '详细地址', datafield: 'StatusName',  width: 100,editable: false},
			{text: '供货商等级', datafield: 'Level',  width: 100,editable: false,
				/*createRender(vm){
					vm.$refs.jqTable.el.on('click', `button.operateGrade`, function(){
						let index = Number($(this).attr('index'));
						let rowData = vm.$refs.jqTable.getData(index);
						if(rowData.Level){
							if(vm.GradeList && vm.GradeList.length>0){
								_.each(vm.GradeList, item =>{
									if(item.Level == rowData.Level){ 
										vm.$router.push({
											name: "discountManage",
											params: {
												levelId: item.Id
											}
										})
									}
								})
							}
						}
					});
					return function(index,datafield,value,defaultHtml,column,rowData){
						return `<div class="cellContainer">
							<button class="ivu-btn ivu-btn-text ivu-btn-small operateGrade" index="${rowData.boundindex}">${value?value:'-'}</button>
						</div>`
					}
				}*/
			},
			{text: '借还货权限', datafield: 'MemberGroupName',  width: 100,editable: false},
			{text: '授信额度', datafield: 'hsdhhh',  width: 100,editable: false},
			{text: '助记码', datafield: 'code',  width: 100,editable: false},
			{text: '状态', datafield: 'status',  width: 100,editable: false,
				createRender (vm){
					vm.$refs.jqTable.el.on('click', `.tableSwitch .switchMask`, function(){
						// if(!vm.Permissions['edit'] && !vm.Permissions['add']){
						// 	return
						// }
						let index = Number($(this).attr('index'));
							// data = vm.$refs.userTab.getData(index)
						// if(data){
						// 	vm.handleModifyStatus && vm.handleModifyStatus(data)
						// }
					})
					return function (index, fieldName, value, defaultHtml, column, rowData){
						var className = ''
						if(value === 1){
							className = 'ivu-switch-checked'
						}else if(value === 0){
							className = ''
						}
						return `<div class="tableSwitch">
									<span class="ivu-switch ${className}">
										<span class="ivu-switch-inner"></span>
									</span>
									<span class="switchMask" index="${rowData.boundindex}"></span>
								</div>`
					}
				}
			},
			{text: '操作', datafield: '_operate', width: 200,
				editable: false,
				createRender (vm) {
					//绑定事件
					vm.$refs.jqTable.el.on('click', `button.operateEdit`, function(){
						let index = Number($(this).attr('index'));
						let rowData = vm.$refs.jqTable.getData(index);
					});
					vm.$refs.jqTable.el.on('click', `button.operateView`, function(){
						let index = Number($(this).attr('index'));
						let rowData = vm.$refs.jqTable.getData(index);

					});
					//如果没有编辑权限时显示： <button class="ivu-btn ivu-btn-text ivu-btn-small operateView" index="${rowData.boundindex}">查看</button>

					return function (index, fieldName, value, defaultHtml, column, rowData) {
						return `<div class="cellContainer">
							<button class="ivu-btn ivu-btn-text ivu-btn-small operateEdit" index="${rowData.boundindex}">编辑</button>
						</div>`;
					}
				}
			}
		],
		groupModal: [
			{text: '供货商分组', datafield: 'supplierGroupName', width: 150, editable: true},
			{text: '助记码', datafield: 'code', width: 100, editable: true},
			{text: '标签', datafield: 'label', width: 100, editable: true},
			{text: '排序', datafield: 'Sort', width: 100, editable: true},
			{text: '操作', datafield: '_action', width: 100,isShow: false, editable: false,
				createRender (vm) {
					//绑定事件
					vm.$refs.supGroupTable.el.off("click").on('click', `button.groupSave`, function(){
						let index = Number($(this).attr('index'));
						if(vm['datafield'] && vm['datafield']){
							vm.$refs.supGroupTable.el.jqxGrid('endcelledit', index, vm['datafield'], false)
						}
						let rowData = vm.$refs.supGroupTable.getData(index);
						// vm.handleSubmit(rowData)
					});
					vm.$refs.supGroupTable.el.on('click', `button.groupDel`, function(){
						let index = Number($(this).attr('index'));
						let rowData = vm.$refs.supGroupTable.getData(index);
						if(rowData.Id){
							// vm.handleDel(rowData);
						}else{
							vm.$refs.supGroupTable.del(index);
						}
					});
					// let isShowDelete = '',
					// 	isShowEdit = ''
					// if(!vm.Permissions['edit'] && !vm.Permissions['add']){
					// 	isShowEdit = "none"
					// }
					// if(!vm.Permissions['delete']){
					// 	isShowDelete = "none"
					// }
					return function (index, fieldName, value, defaultHtml, column, rowData) {
						return `<div class="cellContainer">
							<button class="ivu-btn ivu-btn-text ivu-btn-small groupSave" index="${rowData.boundindex}">保存</button>
							<button class="ivu-btn ivu-btn-text ivu-btn-small groupDel" index="${rowData.boundindex}">删除</button>
						</div>`;
					}
				}
			}
		]
	}
</script>

<style lang="scss">
.supplierManagement{
		display: flex;
		flex-direction: column;
		padding: 16px !important;
		// overflow: hidden !important;
		padding-bottom: 30px !important;
	.filter{
		margin-bottom: 15px;
		padding-top: 15px;
		border-bottom: 1px solid #dddee1;
		.ivu-form{
			float: left;
		}
		.btns{
			margin-right: 15px;
			float: right;
			&.hideType{
				margin: 0 0 15px 15px;
			}
		}
	}
	.area-btns{
		margin-bottom: 15px;
	}
	.dataArea{
		display: flex;
		flex: 1;
		min-height: 550px;
		.Tree{
			width: 15rem;
			position: relative;
			overflow: hidden;
			border: 1px solid #dddee1;
			transition: all 0.5s;
			&.shrink{
				width: 0.6rem;
			}
			h3{
				margin-bottom: 10px;
			}
			.hidden-area{
				padding: 15px;
				position: absolute;

			}
			.side-row{
				position: absolute;
				right: 0;
				height: 100%;
				vertical-align: middle;
				display: flex;
				flex-direction: column;
				justify-content: center;
				border-left: 1px solid #dddee1;
				background: rgb(255,255,255);
				.ivu-icon{
					cursor: pointer;
				}
			}
		}
		.tableWrap{
			flex: 1;
			display: flex;
			flex-direction: column;
			padding: 15px;
			border: 1px solid #dddee1;
			border-left: none;
			h3{
				margin-bottom: 10px;
			}
			.jqTable{
				flex: 1;
			}
			.view-info{
				// width: 50%;
				h3{
					padding-bottom: 8px;
					border-bottom: 1px solid #dddee1;
				}
				.ivu-col{
					padding: 5px 0 8px;
				}
				.base, .account, .credit{
					margin-bottom: 30px;
				}
			}
		}
	}
	.operateWrap{
		display: flex;
		justify-content: flex-start;
		margin-bottom: 15px;
		.ivu-btn{
			margin-right: 20px;
		}
		.groupingIcon{
			img{
				width: 30px;
				height: 30px;
				margin-left: 20px;
			}
		}
	}
	.ivu-form-item-content{
		width: 150px;
	}
}
	.ivu-modal{
		h3{
			width: 91%;
			padding-bottom: 5px;
			margin-bottom: 10px;
			// border-bottom: 1px solid #dddee1;
			span{
				padding: 0 0 5px;
				border-bottom: 1px dotted black;
			}
		}
		.ivu-form-item-error-tip{
			// border: 1px solid green;
		}
		.ivu-modal-footer{
			text-align: center;
		}
		.action-row{
			height: 32px;
			line-height: 32px;
		}
		.ivu-row{
			.ivu-col{
				margin-bottom: 10px;
				.ivu-select{
					width: 5rem;
					.ivu-select-selection{
						height: 30px !important;
						line-height: 30px;
					}
				}
			}
		}
		.handle-action{
			color: #46c78f;
			cursor: pointer;
		}
		.btns{
			margin-bottom: 15px;
		}
		.address-area{
			select{
				width: 5rem !important;
				background: #FFFFFF;
				border: 1px solid #dddee1;
				border-radius: 4px;
				height: 32px !important;
				font-size: 12px !important;
				color: #333333;
				padding: 5px 0 5px 10px !important;
			}
			select:last-child{
				margin-right: 0 !important; 
			}
			select:focus{
				outline: none !important;
				box-shadow: none !important;
			}
		}
		.addForm{
			.ivu-form-item-content,
			.ivu-select.ivu-select-single{
				width: 250px;
			}
			.ivu-form-item{
				margin-bottom: 12px !important;
			}
		}
	}
	.cellContainer .imageView{
		width: 30px !important;
		height: 20px !important;
		img{
			max-width: 100%;
			max-height: 100%;
		}
	}
	.jqTable{
		button{
			&.ivu-btn.ivu-btn-text{
				border: none;
				box-shadow: none;
			}
		}
		.tableSwitch{
			position: relative;
			display: inline-block;
			.switchMask{
				position: absolute;
				left: 0;
				top: 0;
				right: 0;
				bottom: 0;
				cursor: pointer;
			}
			.ivu-switch{
				margin: 2px 7px;
			}
		}
	}
	.action-modal{
		.ivu-form-item-content{
			width: 350px;
		}
	}
</style>
