<template>
	<div class="accountManagement">
		<div class="filter">
			<Form ref="searchForm" :model="searchFormData" :label-width="100" inline>
				<FormItem label="员工名称">
					<Input v-model="searchFormData.employeeName" placeholder="请输入员工名称" />
				</FormItem>
				<FormItem label="状态">
					<Select v-model="searchFormData.status" clearable>
						<Option v-for="item in statusList" :key="item.Id" :value="item.Id" placeholder="请选择状态">{{item.Name}}</Option>
					</Select>
				</FormItem>
			</Form>
			<div class="btns">
				<Button type="ghost" @click="search">查询</Button>
			</div>
		</div>
		<div class="rowBtns">
			<Button type="primary" @click="handleAdd">新增</Button>
			<Button type="ghost">员工管理</Button>
			<Button type="ghost">角色管理</Button>
		</div>
		<div class="tableWarp">
			<jqTable ref="accentTable"></jqTable>
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
		<Modal
			title="账号"
			v-model="isShowAction">
			<Form ref="actionForm" :model="actionForm" :label-width="100">
				<FormItem label="账号" prop="Accent">
					<Input v-model="actionForm.Accent" placeholder="请输入账号" />
				</FormItem>
				<FormItem label="员工姓名" prop="employeeName">
					<Input v-model="actionForm.employeeName" placeholder="请输入员工姓名" />
				</FormItem>
				<FormItem label="角色" prop="RoleId">
					<Select v-model="actionForm.RoleId" placeholder="请输入账号">
						<Option v-if="item in roleList" :key="item.Id" :value="item.Id">{{item.Name}}</Option>
					</Select>
				</FormItem>
				<!-- 禁用控件 -->
				<FormItem label="所属门店" prop="storeName">
					<Input v-model="actionForm.storeName" placeholder="请输入所属门店" />
				</FormItem>
				<FormItem label="所属部门" prop="departmentName">
					<Input v-model="actionForm.departmentName" placeholder="请输入所属部门" />
				</FormItem>
				<FormItem label="职位" prop="position">
					<Input v-model="actionForm.position" placeholder="请输入职位" />
				</FormItem>
				<FormItem label="登记日期" prop="regisDate">
					<Input v-model="actionForm.regisDate" placeholder="请输入登记日期" />
				</FormItem>
				<FormItem label="状态" prop="status">
					<Input v-model="actionForm.status" placeholder="请输入状态" />
				</FormItem>
			</Form>
		</Modal>
	</div>
</template>
<script>
	// import m_auth from '@/../mixins/auth'
	export default {
		name: "accountManagement",
		// mixins: [m_auth],
		data (){
			return {
				list: [],
				isShowAction: false,
				employeeList: [],
				searchFormData: {
					employeeName: "",
					status: null
				},
				actionForm: {
					Id:"",
					position: "",
					storeName: "",
					departmentName: "",
					employeeId: "",
					employeeName: "",
					regisDate: "",
					RoleId: "",
					RoleName: "",
					Accent: "",
					Status: 1
				},
				pager: {
					pageIndex: 1,
					pageSize: 10,
					total: 0
				},
				statusList: [
					{
						Id: 1,
						Name: "启用"
					},{
						Id: 0,
						Name: "未启用"
					}
				],
				roleList: [
					{
						Id: "1234567890",
						Name: "总管理员"
					},
					{
						Id: "0987654321",
						Name: "非管理员"
					},
					{
						Id: "15275687937",
						Name: "私有角色"
					}
				],
				datafield: {}
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
			search(pageIndex){
				let formData = _.extend({}, this.searchFormData);
				_.each(formData, (value,key) =>{
					if(value === "" || value === null || value === undefined){	//过滤掉搜索值为0
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
				_.each(myFormData, (value,key) =>{
					if(value === "" || value === null || value === undefined){	//过滤掉搜索值为0
						delete formData[key]
					}
				})
				this.list = []
				Site.get({
					url: "http://localhost:3000/" + Site.api.accountManagement.list,
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
				});
			},
            handleModifyStatus (data,index) {
				let action = data.Status == 1?"禁用":"启用"
                this.$Modal.confirm({
                    title: '提示',
                    content: '确定要更改"'+ data.Accent + '"的状态吗?',
                    loading: true,
                    onOk: () => {
                        let newStatus = data.Status === 0 ? 1 : 0;
                        // $.when(this.modifyStatus(data.Id, newStatus)).done(res => {
							data.Status = newStatus;
							this.$Message.success('修改成功!');
							this.list[index].Status = newStatus;
							this.loading = false
							setTimeout(() =>{
								this.$Modal.remove();
							},100)
                        // }).fail( err => {
                        //     this.$Message.error('修改失败!');
                        // }).always(() => {
                        //     this.$Modal.remove();
                        // });
                    }
                });
            },
            modifyStatus (id, status) {
                let dtd = $.Deferred(),
                    url = Site.api.employee.status,
                    formData = {
                        EmployeeId: id,
                        NewStatus: status
                    };
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
			handleAdd(){

			},
			handleSubmit(data){
				console.log(data)
			},
			getBascInfo(Name){
				console.log(Name)
			},
			getEmployeeList(){
				Site.get({
					url: "http://localhost:3000/" + Site.api.accountManagement.dropList
				}).done( res =>{
					if(res && res.data){
						if(_.isArray(res.data)){
							this.employeeList = res.data
						}
					}else{
						this.employeeList = []
					}
				}).fail( err =>{
					this.employeeList = []
				})
			}
		},
		created(){
			window.vm = this;
			this.getEmployeeList()
		},
		activated() {
			
		},
		mounted() {
			let that = this,
				accentTable = this.$refs.accentTable;
				accentTable.init({
					type: "edit",
					data: {
						datatype: "json",
						localdata: this.list,
						datafields: [
							{ name: 'Id', type: 'string'},
							{ name: 'Accent', type: 'string'},
							{ name: 'RoleName', type: 'string'},
							{ name: 'employeeName', type: 'string'},
							{ name: 'storeName', type: 'string'},
							{ name: 'departmentName', type: 'string'},
							{ name: 'position', type: 'string'},
							{ name: 'regisDate', type: 'date'},
							{ name: 'Status', type: 'number'},
							{ name: 'RoleId', type: 'string'}
						]
					},
					cols: page.tableModal,
					vm: that,
					custom: {
						width: this.$refs.accentTable.el.parent().width() -2,
						height: "100%",
						ready(){
							accentTable.el.on('cellbeginedit', function (event){
								let args = event.args,
									datafield = args.datafield,
									index = args.rowindex,
									value = args.value,
									rowData = args.row;
								if(['Accent', 'RoleId','employeeName'].indexOf(datafield)>-1){
									that['datafield'] = datafield
								}else{
									that['datafield'] = ''
								}
							})
						}
					}
				})
		},
		watch: {
			list: {
				handler: function (val, oldVal){
					this.$refs.accentTable.updata(val)
				},
				deep: true
			}
		}
	}
	const page = {
		tableModal: [
			{ text: "账号", datafield: "Accent", width: 120, editable: true},
			{ text: "角色", datafield: "RoleId", displayfield: "RoleName", width: 120, editable: true,columntype: 'dropdownlist',
				createEditor: function (vm) {
					return function (row, cellvalue, editor) {
						let rowData = vm.$refs.accentTable.getData(row),
							dropList = vm.roleList || [];
						let source = {
							localdata: dropList,
							datafields: [
								{ name: 'Id' },
								{ name: 'Name' }
							],
						};
						let selectedIndex = -1;
						_.each(dropList, (item, index) => {
							if(item.Name === cellvalue){
								selectedIndex = index;
								return false;
							}
						});
						editor.jqxDropDownList({
							autoOpen: true,
							autoDropDownHeight: true,
							animationType: 'none',
							source: new $.jqx.dataAdapter(source),
							selectedIndex: selectedIndex == -1 ? 0 : selectedIndex,
							displayMember: "Name",
							valueMember: 'Id'
						});
					}
				}
			},
			{ text: "员工姓名", datafield: "employeeId", displayfield: "employeeName", width: 120, editable: true,columntype: 'combobox', clipboard: false,
				createEditor: function (vm) {
					return function (row, cellvalue, editor) {	
						let dropList = vm.employeeList || [],
							rowData = vm.$refs.accentTable.getData(row)
						let	source = {
								localdata: dropList,
								datafields: [
									{name: 'Id'},
									{name: 'Name'}
								],
							},
							selectedIndex = -1
							console.log(cellvalue)
						_.each(dropList, (item, index) => {
							if(item.Name === cellvalue){
								selectedIndex = index
								return false
							}
						})
						editor.jqxComboBox({
							autoOpen: true,
							autoDropDownHeight: false,
							dropDownHeight: 100,
							animationType: 'none',
							source: new $.jqx.dataAdapter(source),
							selectedIndex: selectedIndex == -1 ? 0 : selectedIndex,
							displayMember: "Name",
							valueMember: 'Id'
						})
					}
				},
				createChange(vm){
					return function(rowIndex, datafield, columnname, oldvalue, newvalue){
						if(newvalue === null || newvalue === '' || newvalue === undefined){
							return
						}
						let dropList = vm.employeeList || [],
							rowData = vm.$refs.accentTable.getData(rowIndex)
						let status = true,
							oldName = "",
							oldId = oldvalue
						// if(newvalue && newvalue != oldvalue){
						// 	//调用接口，根据员工姓名扫出基本信息
						// 	vm.getBascInfo(newvalue)
						// }
						_.each(dropList, drop => {
							if(drop.Id == newvalue || drop.Id == newvalue.value){
								status = false
								return false
							}
							if(drop.isOpen){	//已开通账号不允许赋值
								status = false
								vm.$Message.error("该员工已开通账号!")
								return false
							}
							if(drop.Id == oldId){
								oldName = drop.Name
							}
						})
						if(status){
							if(oldName && oldId){
								rowData.employeeId = oldId
								rowData.employeeName = oldName
							}else{
								rowData.employeeId = dropList[0] && dropList[0].Id || ''
								rowData.employeeName = dropList[0] && dropList[0].Name || ''
							}
							vm.$refs.accentTable.setCellsValue([
								{index: rowIndex, datafield: 'employeeId', value: rowData.employeeId}
							])
							return rowData.employeeName
						}
					}
				}
				/*createChange(vm){
					return function(rowIndex, datafield, columnname, oldvalue, newvalue){
						if(newvalue === null || newvalue === '' || newvalue === undefined){
							return
						}
						let dropList = [],
							rowData = vm.$refs.accentTable.getData(rowIndex)
						let status = true
						console.log(newvalue,oldvalue)
						if(newvalue && newvalue != oldvalue){
							//调用接口，根据员工姓名扫出基本信息
							vm.getBascInfo(newvalue)
						}
						// _.each(dropList, drop => {
						// 	if(drop.Name == newvalue){
						// 		status = false
						// 		return false
						// 	}
						// })
						// if(status){
						// 	return oldvalue
						// }
					}
				}*/
			},
			{ text: "所属门店", datafield: "storeName", width: 120, editable: false},
			{ text: "所属部门", datafield: "departmentName", width: 120, editable: false},
			{ text: "职位", datafield: "position", width: 120, editable: false},
			{ text: "登记日期", datafield: "regisDate", width: 120, cellsformat: "yyyy-MM-dd", editable: false},
			{ text: "状态", datafield: "Status", width: 120, editable: false,
				createRender (vm){
					$('.accountManagement').on('click',`.jqTable .tableSwitch .switchMask`, function(){
						let index = Number($(this).attr('index'));
						let rowData = vm.$refs.accentTable.getData(index);
						vm.handleModifyStatus && vm.handleModifyStatus(rowData,index);
					})
					return function (index, fieldName, value, defaultHtml, column, rowData){
						var className = '';
						if(rowData.Status === 1){	//启用状态
							className = 'ivu-switch-checked';
						}else if(rowData.Status === 0){		//禁用状态
							className = '';
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
			{ text: "操作", datafield: "_action", width: 120, editable: false,
				createRender (vm) {
					//绑定事件
					vm.$refs.accentTable.el.off("click").on('click', `button.save`, function(){
						let index = Number($(this).attr('index'));
						if(vm['datafield'] && vm['datafield']){
							vm.$refs.accentTable.el.jqxGrid('endcelledit', index, vm['datafield'], false)
						}
						let rowData = vm.$refs.accentTable.getData(index);
						vm.handleSubmit(rowData)
					});
					// <button class="ivu-btn ivu-btn-text ivu-btn-small groupDel" index="${rowData.boundindex}">删除</button>
					return function (index, fieldName, value, defaultHtml, column, rowData) {
						return `<div class="cellContainer">
							<button class="ivu-btn ivu-btn-text ivu-btn-small save" index="${rowData.boundindex}">保存</button>
						</div>`;
					}
				}
			}

		]
	}
</script>
<style lang="scss">
	.accountManagement{
		display: flex;
		flex-direction: column;
		padding: 16px !important;
		.filter{
			margin-bottom: 15px;
			padding-top: 15px;
			border-bottom: 1px solid #dddee1;
			.ivu-form{
				float: left;
				margin-right: 15px;
				.ivu-select{
					width: 180px !important;
				}
			}
			.btns{
				margin-right: 15px;
				float: right;
			}
		}
		.rowBtns{
			margin-bottom: 15px;
			button{
				margin-right: 10px;
			}
		}
		.tableWarp{
			flex: 1;
			margin-bottom: 15px;
			min-height: 400px;
			.jqTable{
				margin-bottom: 0;
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
		}
	}
</style>

