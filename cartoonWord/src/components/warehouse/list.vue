<template>
	<div class="warehouse">
		<div class="warehouse-area">
			<div class="filter">
				<Form ref="houseForm" :model="searchHouse" inline :label-width="80">
					<FormItem label="仓库名称">
						<Input v-model="searchHouse.wareHouseName" placeholder="请输入仓库名称" />
					</FormItem>
					<FormItem label="状态">
						<Select v-model="searchHouse.status" clearable>
							<Option v-for="item in statusList" :key="item.Id" :value="item.Id">{{item.Name}}</Option>
						</Select>
					</FormItem>
					<FormItem>
						<Button type="ghost">查询</Button>
					</FormItem>
				</Form>
			</div>
			<div class="btns">
				<Button type="primary">新增</Button>
				<Button type="ghost">批量删除</Button>
				<Button type="ghost">刷新</Button>
			</div>
			<div class="tableWrap">
				<jqTable ref="jqTable"></jqTable>
			</div>
			<!-- 分页 -->
		</div>
		<div class="warehouseShelf-area">

		</div>
	</div>
</template>
<script>
	export default {
		name: "warehouse",
		data(){
			return {
				warehouseList: [],
				warehouseShelf: [],
				isShowShelf: false,
				searchHouse: {
					wareHouseName: "",
					status: ""
				},
				statusList: [
					{ 
						Id: "0",
						Name: "未启用"
					},{ 
						Id: "1",
						Name: "启用"
					}
				],
				storeList: [
					{ 
						Id: "dsfhsdgfhjsd454555",
						Name: "光荣仓"
					},{ 
						Id: "dgfghsfhgsdfsdfjk4556",
						Name: "安全仓"
					}
				],
				wareHouseType: [
					{
						Id: "sdjhcjhsdghjcg45659",
						Name: "回货仓"
					},{
						Id: "dshfjsdhjgfhjs566465456",
						Name: "出货仓"
					}
				]
			}
		},
		mounted(){
			let jqTable = this.$refs.jqTable;
			jqTable.init({
				type: "edit",
				data: {
					datatype: "json",
					localdata: this.warehouseList,
					datafields: [
						{ name: "Id", type: "string"},
						{ name: "code", type: "string"},
						{ name: "store", type: "string"},
						{ name: "wareHouseType", type: "string"},
						{ name: "status", type: "number"},

					]
				},
				cols: page.tableModal,
				vm: this,
				custom: {
					width: this.$refs.jqTable.el.parent().width() -2,
					height: this.$refs.jqTable.el.parent().height() -2
				}
			})
		}
	}
	const page = {
		tableModal: [
			{text: '仓库名称', datafield: 'wareHouseName', width: 150, editable: false},
			{text: '仓库编码', datafield: 'code', width: 100, editable: false},
			{text: '所属门店', datafield: 'store', width: 100, editable: false},
			{text: '仓库类型', datafield: 'wareHouseType', width: 120, editable: false},
			{text: '状态', datafield: 'status', width: 100, editable: false,
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
			{text: '操作', datafield: '_action', width: 150, editable: false,
				createRender (vm) {
					//绑定事件
					vm.$refs.jqTable.el.off("click").on('click', `button.edit`, function(){
						let index = Number($(this).attr('index'));
						let rowData = vm.$refs.jqTable.getData(index);
						// vm.handleSubmit(rowData)
					});
					vm.$refs.jqTable.el.on('click', `button.delete`, function(){
						let index = Number($(this).attr('index'));
						let rowData = vm.$refs.jqTable.getData(index);
						if(rowData.Id){
							// vm.handleDel(rowData);
						}else{
							vm.$refs.jqTable.del(index);
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
							<button class="ivu-btn ivu-btn-text ivu-btn-small edit" index="${rowData.boundindex}">编辑</button>
							<button class="ivu-btn ivu-btn-text ivu-btn-small delete" index="${rowData.boundindex}">删除</button>
						</div>`;
					}
				}
			}
		]
	}
</script>
<style lang="scss">
	.warehouse{
		display: flex;
		justify-content: space-between;
		.warehouse-area,
		.warehouseShelf-area{
			width: 45%;
			display: flex;
			flex-direction: column;
			min-height: 100%;
			// height: 100%;
			padding: 15px 15px 0;
			border: 1px solid #dddee1;
			.filter{
				margin-bottom: 15px;
				padding-top: 15px;
				border-bottom: 1px solid #dddee1;
			}
			.btns{
				margin-bottom: 15px;
			}
			.tableWrap{
				flex: 1;
				margin-bottom: 15px;
				min-height: 400px;
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
			}
		}
	}
</style>

