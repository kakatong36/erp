<template>
	<div class="menuIndex mainPadding">
		<div class="innerBorder ListfullHeight">
			<div class="ivu-tabs-bar">
				<div class="ivu-tabs-nav-container">
					<div class="ivu-tabs-nav-wrap">
						<div class="ivu-tabs-nav-scroll">
							<div class="ivu-tabs-nav">
								<div class="ivu-tabs-tab" v-for="item in PlatList" :key="item.PlatId" :class="{'ivu-tabs-tab-active': item.selected}" @click="changePlat(item)">{{item.PlatName}}</div>
							</div>
						</div>
					</div>
				</div>
			</div>
			<div class="menu-info clearfix">
				<div class="left-info clearfix">
					<div class="left-info-1">
						<h3>菜单</h3>
						<Tree :data="Tree" ref="tree" @on-select-change="getItem" />
					</div>
					<div class="left-info-2">
						<h3>按钮</h3>
						<p v-for="btn in ButtonList" :key="btn.ButtonId">
							<Button type="ghost" class="action-padding" @click="handleButtonClick(btn)" size="small">
								<Checkbox @click.native.prevent="handleButtonCheck" :value="btn.IsCheck">
									<span>{{btn.Name}}</span>
								</Checkbox>
							</Button>
						</p>
					</div>
				</div>
				<div class="right-info">
					<h3>列表对应字段</h3>
					<div v-show="menuId">
						<Button type="primary" @click="handleAddTable" v-show="showAddBtn" class="addSubTab">添加子表</Button>
						<div>
							<div v-for="(item, index) in tableList" :key="item.index" v-show="item.isShow || index == 0" class="col-table">
								<div class="btn-list">
									<Button type="primary" @click="handleAdd(item.name, item.index)">新增</Button>
									<Button v-if="item.index != 0" type="ghost" @click="handleDeleteTable(item.name, item.index)">移除此表</Button>
								</div>
								<jqTable :class="item.name" :ref="item.name"/>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
		<div class='fixed'>
			<div class='border-wrapper'>
				<Button type="ghost" @click="getPlatList">查询</Button>
				<Button type="primary" @click="save" :disabled="setSaving">保存</Button>
			</div>
		</div>
	</div>
</template>
<script>
	export default {
		name: 'menuIndex',
		data(){
			return {
				showAddBtn: true,
				tableList: [
					{
						index: 0,
						name: 'menuIndexTab_1',
						isShow: true
					},
					{
						index: 1,
						name: 'menuIndexTab_2',
						isShow: true
					},
					{
						index: 2,
						name: 'menuIndexTab_3',
						isShow: true
					},
					{
						index: 3,
						name: 'menuIndexTab_4',
						isShow: true
					},
					{
						index: 4,
						name: 'menuIndexTab_5',
						isShow: true
					}
				],
				setSaving: false,
				menuId: '1',//这里对menuId的赋默认值是为了处理表格因为父容器的隐藏状态 初始化的时候有宽度显示不正常的问题
				menuName: '',
				buttonId: '',
				ButtonList: [],
				PlatList: [],
				Tree: [],
				fields: {},
				dataTypeList: [],
				fieldsAreaList: [],
				updateList: [],
				listBtnId: '',
				tableDelList: []
			}
		},
		methods: {
			changePlat(plat){
				if(!plat.selected){
					_.each(this.PlatList, item => {
						item.selected = false
					})
					plat.selected = true
					this.Tree = []
					if(plat.MenuList && plat.MenuList.length){
						this.setTree(plat.MenuList)
					}
				}
			},
			setTree(treeInfo){
				this.handleResetMenuInfo()
				if(!treeInfo || !treeInfo.length){
					this.Tree = []
					return
				}
				this.Tree = []
				treeInfo.map((item, index, arr) => {
					let obj = {
						title: `${item.MenuName}`,
						selected: false,
						children: []
					}
					if(item.ChildList && item.ChildList.length){
						_.each(item.ChildList, chl => {
							obj.children.push({
								title: `${chl.MenuName}`,
								selected: false,
								content: chl
							})
						})
					}
					this.Tree.push(obj)
				})
			},
			getItem(list){
				if(list[0] && list[0].content){
					let menu = list[0].content
					if(menu.MenuId == this.menuId){
						return
					}
					this.menuId = menu.MenuId
					this.menuName = menu.MenuName
					this.getFields()
					this.fields = {}
					this.getSelectedBtn()
				}else{
					this.handleResetMenuInfo()
				}
			},
			handleResetMenuInfo(){
				this.menuId = ''
				this.menuName = ''
				this.fields = {}
				_.each(this.ButtonList, btn => {
					btn.IsCheck = false
				})
			},
			handleAddTable(){
				_.each(this.tableList, (item, index) => {
					if(index > 0 && !item.isShow){
						item.isShow = true
						if(index == this.tableList.length - 1){
							this.showAddBtn = false
						}
						return false
					}	
				})
			},
			handleDeleteTable(name, index){
				this.$Modal.confirm({
					title: '提示',
					content: '您确定移除此表吗，此表数据将被清空，请确认？',
					loading: true,
					onOk: () => {
						_.each(this.tableList, tab => {
							if(tab.name == name){
								let data = this.$refs[tab.name][0].getData()
								_.each(data, item => {
									if(item.ModState != 1){
										item.ModState = 3
										this.tableDelList.push(item)
									}
								})
								this.$refs[tab.name][0].emptyData()
								tab.isShow = false
							}
						})
						this.tableList.sort((a, b) => {
							return b.isShow - a.isShow
						})
						this.$Modal.remove()
					}
				})
			},
			handleReset(){
				this.tableList.sort((a, b) => {
					return a.index - b.index
				})
				_.each(this.tableList, (item, index) => {
					this.$refs[item.name][0].emptyData()
					if(index == 0){
						item.isShow = true
					}else{
						item.isShow = false
					}
				})
				this.showAddBtn = true
				this.tableDelList = []
			},
			getFields(){
				this.handleReset()
				Site.get({
					url: Site.api.dataField.get,
					data: {menuId: this.menuId, buttonId: this.listBtnId}
				}).done(res => {
					if(res.code == 1001 && res.data){
						let data = res.data
						data.sort((a, b) => {
							return a.Sort - b.Sort
						})
						_.each(data, item => {
							item.ModState = 0
							_.each(this.dataTypeList, type => {
								if(item.FieldType == type.Id){
									item._FieldType = type.Name
								}
							})
							_.each(this.fieldsAreaList, type => {
								if(item.FieldsAreaId == type.Id){
									item._FieldsAreaId = type.Name
								}
							})
							_.each(this.tableList, tab => {
								if(tab.index == item.DefaultId){
									this.$refs[tab.name][0].add(item)
									tab.isShow = true
									return false
								}
							})
						})
						this.tableList.sort((a, b) => {
							if(a.isShow == b.isShow){
								return a.index - b.index
							}else{
								return b.isShow - a.isShow
							}
						})
					}
				}).fail(err => {
					this.$Message.error(err.message || '获取列表对应字段失败')
				})
			},
			getSelectedBtn(){
				Site.get({
					url: Site.api.buttonAuthority.gGetButtonSetList,
					data: {menuId: this.menuId}
				}).done(res => {
					if(res.code == 1001 && res.data){
						this.ButtonList = res.data
					}else{
						this.ButtonList = []
					}
				}).fail(err => {
					this.ButtonList = []
				})
			},
			handleButtonCheck(){},
			handleButtonClick(btn){
				btn.IsCheck = !btn.IsCheck
				this.buttonId = btn.ButtonId
			},
			getPlatList(){
				const loader = this.$Message.loading({
					content: '正在加载中...',
					duration: 0
				})
				// let url = Site.api.buttonAuthority.getList
				// Site.get({
				// 	url
				// }).done(res => {
				// 	loader()
				// 	console.log(res.data)
					
					// if(res.code == 1001 && res.data){
					// 	let data = res.data
					// 	if(data.ButtonList){
					// 		_.each(data.ButtonList, btn => {
					// 			if(btn.Name == '列表'){
					// 				this.listBtnId = btn.ButtonId
					// 			}
					// 			btn.IsCheck = false
					// 		})
					// 		this.ButtonList = data.ButtonList
					// 	}
					// 	if(data.PlatList){
					// 		_.each(data.PlatList, (plat, pIndex) => {
					// 			if(pIndex == 0){
					// 				plat.selected = true
					// 				this.setTree(plat.MenuList)
					// 			}else{
					// 				plat.selected = false
					// 			}
					// 		})
					// 		this.PlatList = data.PlatList
					// 	}
					// }
				// }).fail(err => {
				// 	loader()
				// })
			},
			getSelect(){
				Site.get({
					url: Site.api.dataField.init
				}).done(res => {
					if(res.code == 1001 && res.data && res.data.Data){
						let data = res.data.Data,
							DataTypeList = [],
							FieldsArea = []
						_.each(data, item =>{
							if(item.DataName == 'dataType'){//字段类型
								this.dataTypeList = item.DataList
							}else if(item.DataName == 'fieldsArea'){//字段域
								this.fieldsAreaList = item.DataList
							}
						})
					}
				}).fail(err => {
					this.$Message.error(err.message)
				})
			},
			createTable(tableName){
				let tableModel = page.tableModel(tableName),
					that = this,
					menuIndexTab = this.$refs[tableName] && this.$refs[tableName][0]
				menuIndexTab.init({
					type: 'edit',
					data: {
						datatype: 'json',
						localdata: [],
						datafields: [
							{name: 'DefaultId', type: 'number'},
							{name: 'ModState', type: 'string'},
							{name: 'Id', type: 'string'},
							{name: 'FieldCode', type: 'string'},
							{name: 'FieldName', type: 'string'},
							{name: 'IsShow', type: 'boolean'},
							{name: 'IsPrint', type: 'boolean'},
							{name: 'IsUse', type: 'boolean'},
							{name: 'IsExport', type: 'boolean'},
							{name: 'IsEdit', type: 'boolean'},
							{name: 'FieldType', type: 'string'},
							{name: 'FieldsAreaId', type: 'string'},
							{name: 'FieldLength', type: 'number'},
							{name: 'FieldWidth', type: 'number'},
							{name: "Sort", type: 'number' },
							{name: '_FieldType', type: 'string'},
							{name: '_FieldsAreaId', type: 'string'}
						]
					},
					cols: tableModel, 
					vm: this,
					custom: {
						height: 335,
						ready(){
							menuIndexTab.el.on('cellvaluechanged', function(event){
								let args = event.args,
									datafield = args.datafield,
									rowBoundIndex = args.rowindex,
									value = args.newvalue,
									oldvalue = args.oldvalue,
									rowData = menuIndexTab.getData(rowBoundIndex)
								if(rowData.ModState == 0){
									menuIndexTab.setCellsValue({index: rowBoundIndex, datafield: 'ModState', value: 2})
								}
							})
						}
					}
				})
			},
			handleAdd(tableName, tableIndex){
				if(!this.menuId){
					this.$Message.info('请先选择要配置的列表对应字段的菜单')
					return
				}
				this.$refs[tableName][0].el.jqxGrid('addrow', null, {
					DefaultId: tableIndex,
					ModState: 1,
					Id: String(new Date().valueOf()),
					IsShow: true,
					IsPrint: true,
					IsUse: true,
					IsExport: true,
					IsEdit: true,
					Sort: 0,
					FieldType: '',
					_FieldType: '',
					FieldsAreaId: '',
					_FieldsAreaId: ''
				})
			},
			save(){
				if(!this.menuId){
					this.$Message.info('请先选择菜单')
					return
				}
				let messeageIndex = -1,
					messeageItem = '',
					tabIndex = 1,
					data = {ButtonFields: []}
				_.each(this.ButtonList, btn => {
					if(btn.IsCheck && btn.Name == '列表'){
						let listData = []
						_.each(this.tableList, tab => {
							if(tab.isShow){
								listData = listData.concat(this.$refs[tab.name][0].getData())
							}
						})
						_.each(listData, (item, index) => {
							delete item.uid
							delete item.boundindex
							delete item.uniqueid
							delete item.visibleindex
							delete item._FieldType
							delete item._FieldsAreaId
							_.each(item, (value, key) =>{
								if(typeof value == 'string' && value.trim){
									item[key] = value.trim()
								}
							})
							tabIndex = item.DefaultId
							if(item.FieldCode === null || item.FieldCode === '' || item.FieldCode === undefined){
								messeageIndex = index
								messeageItem = '列标识不能为空'
								return false
							}
							if(item.FieldName === null || item.FieldName === '' || item.FieldName === undefined){
								messeageIndex = index
								messeageItem = '列名不能为空'
								return false
							}
							if(item.FieldWidth === null || item.FieldWidth === '' || isNaN(+item.FieldWidth) || (+item.FieldWidth)<0){
								messeageIndex = index
								messeageItem = '列宽度必须为大于0的数字'
								return false
							}
							if(item.FieldsAreaId === null || item.FieldsAreaId === '' || item.FieldsAreaId === undefined){
								messeageIndex = index
								messeageItem = '作用域不能为空'
								return false
							}
							if(item.FieldType === null || item.FieldType === '' || item.FieldType === undefined){
								messeageIndex = index
								messeageItem = '列类型不能为空'
								return false
							}
							if(item.FieldLength === null || item.FieldLength === '' || isNaN(+item.FieldLength) || (+item.FieldLength)<0){
								messeageIndex = index
								messeageItem = '列长度必须为大于0的数字'
								return false
							}
							if(item.Sort === null || item.Sort === '' || isNaN(+item.Sort) || (+item.Sort)<0){
								messeageIndex = index
								messeageItem = '列排序不能为空'
								return false
							}
						})
						if(messeageIndex > -1){
							return false
						}
						listData = listData.concat(this.tableDelList)
						listData.sort((a, b) => {
							return b.ModState - a.ModState
						})
						data.ButtonFields.push({
							ButtonId: btn.ButtonId,
							Fields: listData
						})
					}else if(btn.IsCheck && btn.Name != '列表'){
						data.ButtonFields.push({
							ButtonId: btn.ButtonId,
							Fields: []
						})
					}
				})
				if(messeageIndex > -1){
					this.$Message.error(`${this.menuName}列表对应字段表${tabIndex+1}的明细第${messeageIndex+1}行${messeageItem}`)
					return false
				}
				const loader = this.$Message.loading({
					content: '保存中...',
					duration: 0
				})
				let url = Site.api.menuButton.save
					data.MenuId = this.menuId
				this.setSaving = true
				Site.post({
					url,
					data
				}).done(res => {
					if(res.code == 1001){
						this.$Message.success(res.message)
						this.menuBtnModal = false
						this.getFields()
					}
				}).fail(err => {
					this.$Message.error(err.message || '保存失败')
				}).always(() => {
					loader()
					this.setSaving = false
				})
			}
		},
		created(){
			// this.getSelect()
			this.getPlatList()
		},
		mounted(){
			// _.each(this.tableList, item => {
			// 	this.createTable(item.name)
			// })
			// this.menuId = ''
		}
	}
	const page = {
		tableModel: function(tableName) {
			return[
				{datafield: "ModState", width: 0.0001, hidden: true},
				{text: "列标识", datafield: "FieldCode", width: 120},
				{text: "列名", datafield: "FieldName", width: 100},
				{text: "列宽度", datafield: "FieldWidth", width: 60 , cellsformat: 'n'},
				{datafield: "FieldsAreaId", width: 0.0001, hidden: true},
				{text: "作用域", datafield: "_FieldsAreaId", width: 100,columntype: 'custom',
					createEditorOnce: function(vm){
						return function(rowIndex, cellvalue, editor){
							let source = {
								localdata: [],
								datafields: [
									{name: 'Id'},
									{name: 'Name'}
								]
							}
							editor.jqxDropDownList({
								dropDownHeight: 100,
								autoOpen: true,
								width: 100,
								source: new $.jqx.dataAdapter(source)
							})
						}
					},
					createEditor: function(vm){
						return function(rowIndex, cellvalue, editor){
							let rowData = vm.$refs[tableName][0].getData(rowIndex),
								selectedIndex = -1,
								datafield = '_FieldsAreaId';
							_.each(vm.fieldsAreaList, (item, index) => {
								if(item.Name == rowData['_FieldsAreaId']){
									rowData.FieldsAreaId = item.Id;
									selectedIndex = index
								}
							})
							let source = {
								localdata: vm.fieldsAreaList,
								datafields: [
									{name: 'Id'},
									{name: 'Name'}
								]
							}
							editor.jqxDropDownList({
								dropDownHeight: 100,
								width: 100,
								autoOpen: true,
								source: new $.jqx.dataAdapter(source),
								displayMember: 'Name',
								selectedIndex: selectedIndex
							})
							editor.on('close', function(event){
								let rowData = vm.$refs[tableName][0].getData(rowIndex),
									cellValue = editor.jqxDropDownList('val')
								if(rowData.Name == cellValue){
									vm.$refs[tableName][0].el.jqxGrid('endcelledit', rowIndex, datafield, false)
									return
								}
								let updateArr = []
								_.each(vm.fieldsAreaList, item => {
									if(cellValue == item.Name){
										rowData.FieldsAreaId = item.Id
										return false
									}
								})
								updateArr.push({
									index: rowIndex,
									datafield: 'FieldsAreaId',
									value: rowData.FieldsAreaId
								})
								vm.$refs[tableName][0].setCellsValue(updateArr)
								vm.$refs[tableName][0].el.jqxGrid('endcelledit', rowIndex, datafield)
							})
						}
					},
					createChange: function(vm){
						return function(rowIndex, datafield, columntype, oldvalue, newvalue){
							if(newvalue == ''){
								return
							}
							let rowData = vm.$refs[tableName][0].getData(rowIndex),
								updateArr = []
							if(rowData.Name == newvalue){
								return
							}
							_.each(vm.fieldsAreaList, item => {
								if(item.Name == newvalue){
									rowData.FieldsAreaId = item.Id
									return false
								}
							})
							updateArr.push({
								index: rowIndex,
								datafield: 'FieldsAreaId',
								value: rowData.FieldsAreaId
							})
							vm.$refs[tableName][0].setCellsValue(updateArr)
						}
					}
				},
				{text: "列类型", datafield: "_FieldType", width: 100, columntype: 'custom',
					createEditorOnce: function(vm){
						return function(rowIndex, cellvalue, editor){
							let source = {
								localdata: [],
								datafields: [
									{name: 'Id'},
									{name: 'Name'}
								]
							}
							editor.jqxDropDownList({
								dropDownHeight: 100,
								autoOpen: true,
								width: 100,
								source: new $.jqx.dataAdapter(source)
							})
						}
					},
					createEditor: function(vm){
						return function(rowIndex, cellvalue, editor){
							let rowData = vm.$refs[tableName][0].getData(rowIndex),
								selectedIndex = -1,
								datafield = '_FieldType';
							_.each(vm.dataTypeList, (item, index) => {
								if(item.Name == rowData['_FieldType']){
									rowData.FieldType = item.Id
									selectedIndex = index
								}
							})
							let source = {
								localdata: vm.dataTypeList,
								datafields: [
									{name: 'Id'},
									{name: 'Name'}
								]
							}
							editor.jqxDropDownList({
								dropDownHeight: 100,
								width: 100,
								autoOpen: true,
								source: new $.jqx.dataAdapter(source),
								displayMember: 'Name',
								selectedIndex: selectedIndex
							})
							editor.on('close', function(event){
								let rowData = vm.$refs[tableName][0].getData(rowIndex),
									cellValue = editor.jqxDropDownList('val')
								if(rowData.Name == cellValue){
									vm.$refs[tableName][0].el.jqxGrid('endcelledit', rowIndex, datafield, false)
									return
								}
								let updateArr = []
								_.each(vm.dataTypeList, item => {
									if(cellValue == item.Name){
										rowData.FieldType = item.Id
										return false
									}
								})
								updateArr.push({
									index: rowIndex,
									datafield: 'FieldType',
									value: rowData.FieldType
								})
								vm.$refs[tableName][0].setCellsValue(updateArr)
								vm.$refs[tableName][0].el.jqxGrid('endcelledit', rowIndex, datafield)
							})
						}
					},
					createChange: function(vm){
						return function(rowIndex, datafield, columntype, oldvalue, newvalue){
							if(newvalue == ''){
								return
							}
							let rowData = vm.$refs[tableName][0].getData(rowIndex),
								updateArr = []
							if(rowData.Name == newvalue){
								return
							}
							_.each(vm.dataTypeList, item => {
								if(item.Name == newvalue){
									rowData.FieldType = item.Id
									return false
								}
							})
							updateArr.push({
								index: rowIndex,
								datafield: 'FieldType',
								value: rowData.FieldType
							})
							vm.$refs[tableName][0].setCellsValue(updateArr)
						}
					}
				},
				{ text: "是否内置", datafield: "IsEdit", width: 60, columntype: 'checkbox'},
				{ text: "是否显示", datafield: "IsShow", width: 60, columntype: 'checkbox'},
				{ text: "是否可用", datafield: "IsUse", width: 60, columntype: 'checkbox'
				},
				{ text: "是否打印", datafield: "IsPrint", width: 60, columntype: 'checkbox'
				},
				{ text: "是否导出", datafield: "IsExport", width: 60, columntype: 'checkbox'
				},
				{datafield: "FieldType", width: 0.0001, hidden: true},
				{text: "列长度", datafield: "FieldLength", width: 60 , cellsformat: 'n'},
				{text: "列排序", datafield: "Sort", width: 50, cellsformat: 'n'},
				{text: "操作",datafield: "_operate", width: 60,editable: false,
					createRender(vm) {
						$(`.${[tableName]}`).on("click", `button._operateDel`, function() {
							let index = Number($(this).attr('index')),
								data = vm.$refs[tableName][0].getData(index)
							if(data){
								if(data.ModState != 1){
									data.ModState = 3
									vm.tableDelList.push(data)
								}
								vm.$refs[tableName][0].delete(data.uid)
							}
						})
						return function(index, fieldName, value, defaultHtml, column, rowData) {
							return `<div class="cellContainer">
										<button class="ivu-btn ivu-btn-text ivu-btn-small _operateDel" index="${rowData.boundindex}">删除</button>
									</div>`;
						};
					}
				}
			]
		}
	}
</script>
<style lang="scss">
	.menuIndex{
		.ivu-tabs-nav{
			.ivu-tabs-tab-active{
				border-bottom: 2px solid #2d8cf0;
			}
		}
		.ivu-tabs-nav-wrap{
			margin-bottom: 0px;
		}
		.ivu-tree{
			margin-top: -2px;
		}
		.menu-info{
			display: flex;
		}
		.left-info{
			display: flex;
			p{
				margin-bottom: 15px;
			}
		}
		.left-info, .left-info-1, .left-info-2, .right-info{
			h3{
				margin-bottom: 10px;
			}
		}
		.left-info{
			width: 340px;
			border-right: 1px solid #dddee1;
		}
		.left-info-1{
			width: 180px;
			border-right: 1px solid #dddee1;
		}
		.left-info-2{
			width: 140px;
			margin-left: 19px;
		}
		.right-info{
			width: calc(100% - 360px);
			margin-left: 19px;
		}
		.menuIndexTab{
			margin-top: 10px;
		}
		.col-table{
			padding-top: 10px;
			&:first-child{
				border-top: 1px solid #dddee1;
			}
		}
		.btn-list{
			margin-bottom: 10px;
		}
		.addSubTab{
			margin-bottom: 10px;
		}
	}
</style>
