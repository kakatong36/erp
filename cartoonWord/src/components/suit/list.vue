<template>
  <div class='page detailField' :class="pageClass">
	  <Button type='primary' style='margin-bottom: 16px;' @click='handleAdd'>新建</Button>
	   <Button type='ghost' style='margin-bottom: 16px;' @click='search'>刷新</Button>
	  <!-- 新表格 -->
	  <jqTable ref='jqTable'></jqTable>
	  <!-- 隐藏列/显示列 -->
	  <Button type='ghost' style='margin-top: 16px;' @click='hideColumn'>隐藏列</Button>
	  <Button type='ghost' style='margin-top: 16px;' @click='showColumn'>显示列</Button>
  </div>
</template>
<script>
export default {
	name: 'detailField',
	data(){
		return {
			pageClass: "",
			disabled: true,	//每一行数据提交按钮的显示与否
			list: [],
			billType: [	//单据类型
				{
					// Id: '01',
					typeName: '入库单'
				},
				{
					// Id: '02',
					typeName: '出库单'
				},
				{
					// Id: '03',
					typeName: '需求单'
				},
				{
					// Id: '04',
					typeName: '采购单'
				}
			],
			fieldType: [	//字段类型
				{
					// Id: '001',
					fieldName: '名称类'
				},
				{
					// Id: '002',
					fieldName: '数字类'
				},
				{
					// Id: '003',
					fieldName: '金额类'
				},
				{
					// Id: '004',
					fieldName: '备注类'
				}
			]
		}
	},
 	methods:{
	    getSame(){
		    let tableExistData = [{
					Id : '123456789',
					FieldCode : 'stoneNo',
					FieldName : '石料码',
					IsShow : true,
					IsPrint : true,
					IsExport : true,
					IsUse : false,
					IsEdit : false,
					Sort : 1,
					BillType : '入库单',
					FieldType : '名称类',
					FieldLength : 10,
					FieldWidth : 21,
					FieldsArea : '字母'
				},{
					Id : '3838438',
					FieldCode : 'cerNo',
					FieldName : '证书号',
					IsShow : false,
					IsPrint : false,
					IsExport : false,
					IsUse : true,
					IsEdit : true,
					Sort : 2,
					BillType : '出库单',
					FieldType : '数字类',
					FieldLength : 156,
					FieldWidth : 16,
					FieldsArea : '字母'
				},{
					Id : '98987564',
					FieldCode : 'color',
					FieldName : '颜色',
					IsShow : false,
					IsPrint : false,
					IsExport : false,
					IsUse : false,
					IsEdit : false,
					Sort : 3,
					BillType : '需求单',
					FieldType : '金额类',
					FieldLength : 30,
					FieldWidth : 19,
					FieldsArea : '字母'
				}
			]
			this.list = tableExistData;
		},
		handleAdd (){
			var jqTable = this.$refs.jqTable;
			jqTable.el.jqxGrid('addrow', null, {});
			//第一行数据添加空表行    得到（有bug产生）
		},
		createTable(tableModel) {
			this.$refs.jqTable.init({
				type: "edit",
				data: {
					datafield: [	//改行的数据字段显示
						{name: 'Id', type: 'string'},
						{name: 'FieldCode', type: 'string'},
						{name: 'FieldName', type: 'string'},
						{name: 'IsShow', type: 'boolean'},
						{name: 'IsPrint', type: 'boolean'},
						{name: 'IsUse', type: 'boolean'},
						{name: 'IsExport', type: 'boolean'},
						{name: 'IsEdit', type: 'boolean'},
						{name: 'BillType', type: 'string'},
						{name: 'FieldType', type: 'string'},
						{name: 'FieldLength', type: 'number'},
						{name: 'FieldWidth', type: 'number'},
						{name: 'FieldsArea', type: 'string'},
						{name: "Sort", type: 'number' }
					]
				},
				cols: tableModel,
				vm: this,
				custom: {
					autoHeight: true
				}
			});
		},
		hideColumn (){
			//隐藏列
			this.$refs.jqTable.el.jqxGrid('hidecolumn', 'FieldName');
		},
		showColumn (){
			//显示列
			this.$refs.jqTable.el.jqxGrid('showcolumn', 'FieldName');
		},
		search (){
			this.list.push({
					Id : '148952562',
					FieldCode : 'lolop',
					FieldName : '穷逼',
					IsShow : true,
					IsPrint : true,
					IsExport : true,
					IsUse : false,
					IsEdit : false,
					Sort : 1,
					BillType : '吃货单',
					FieldType : '潜水类',
					FieldLength : 15,
					FieldWidth : 13,
					FieldsArea : '基本字段'
				})
			this.$refs.jqTable.updata(this.list);
		}
  	},
	created(){
		window.vm = this;
    	this.pageClass = page.pageName;
		this.getSame();
	},
	watch: {
		list(newValue, oldValue) {
		  this.$refs.jqTable.updata(newValue);
		}
	},
	mounted(){
		this.createTable(page.tableModel);
	}

  
}
const page ={
  pageName: "detailField",
  tableModel: [
			{ text: "字段", datafield: "FieldCode", width: 200,editable:false },
			{ text: "字段名", datafield: "FieldName", width: 200,editable:false },
			{ text: "是否显示", datafield: "IsShow", width: 100,editable:false,
				//复选框
				columntype: 'checkbox',
				createChange: function(vm){
					return function(index,datafield,columntype,oldvalue,newvalue){
						return newvalue
					}
				}
			},
			{ text: "是否打印", datafield: "IsPrint", width: 100,editable:false,
				//复选框
				columntype: 'checkbox',
				createChange: function(vm){
					return function(index,datafield,columntype,oldvalue,newvalue){
						return newvalue
					}
				}
			},
			{ text: "是否可用", datafield: "IsUse", width: 100,editable:false,
				//复选框
				columntype: 'checkbox',
				createChange: function(vm){
					return function(index,datafield,columntype,oldvalue,newvalue){
						return newvalue
					}
				}
			},
			{ text: "是否导出", datafield: "IsExport", width: 100,editable:false,
				//复选框
				columntype: 'checkbox',
				createChange: function(vm){
					return function(index,datafield,columntype,oldvalue,newvalue){
						return newvalue
					}
				}
			},			
			{ text: "是否可编辑", datafield: "IsEdit", width: 120,editable:false,
				//复选框
				columntype: 'checkbox',
				createChange: function(vm){
					return function(index,datafield,columntype,oldvalue,newvalue){
						return newvalue
					}
				}
			},
			{ text: "单据类型", datafield: "BillType", width: 100,editable:false,
				columntype: 'combobox',
				createEditorOnce: function (vm) {
					return function (rowIndex, cellvalue, editor) {
						let rowData = vm.$refs.jqTable.getData(rowIndex),
							selectedIndex = -1,
							datafield = 'BillType',
							source = {
								localdata:  vm.billType,
								datafields: [
									{name: 'typeName'}
								],
							}
						_.each(vm.billType, (item, index) => {
							if(item.typeName == rowData[datafield]){
								selectedIndex = index
							}
						})
						editor.jqxComboBox({
							dropDownHeight: 100,
							autoOpen: true,
							source: new $.jqx.dataAdapter(source),
							displayMember: 'typeName',
							valueMember: 'typeName',
							selectedIndex: selectedIndex
						})
					}
				},
				createChange: function(vm){
					return function(rowIndex, datafield, columnname, oldvalue, newvalue){
						if(newvalue == oldvalue){
							return
						}
						let rowData = vm.$refs.jqTable.getData(rowIndex),
							selectedIndex = -1
						_.each(vm.billType, (item, index) => {
							if(item.typeName == newvalue){
								selectedIndex = index
							}
						})
						if(selectedIndex < 0){
							setTimeout(() => {
								vm.$refs.jqTable.el.jqxGrid('setcellvalue', rowIndex, datafield, '')
							}, 1)
						}
					}
				}
			},
			{ text: "字段类型", datafield: "FieldType", width: 100,editable:false,
				columntype: 'dropdownlist',
				createEditor: function (vm) {
					return function (row, cellvalue, editor) {
						let source = {
							localdata: vm.fieldType,
							datafields: [
								// { name: 'Id' },
								{ name: 'fieldName' }
							],
						};
						editor.jqxDropDownList({
							autoDropDownHeight: true,
							source: new $.jqx.dataAdapter(source),
							displayMember: "fieldName"
						});
					}
				}
			},

			{ text: "ook", datafield: "abc", width: 100 , cellsformat: 'n0',editable:false},
			{ text: "ook", datafield: "FieldLedddngth", width: 100 , cellsformat: 'n0',editable:false},
			{ text: "ook", datafield: "ghhgh", width: 100 , cellsformat: 'n0',editable:false},
			{ text: "ook", datafield: "jhjhj", width: 100 , cellsformat: 'n0',editable:false},
			{ text: "ook", datafield: "dree", width: 100 , cellsformat: 'n0',editable:false},
			{ text: "ook", datafield: "jhgjgh", width: 100 , cellsformat: 'n0',editable:false},
			{ text: "ook", datafield: "kjkjk", width: 100 , cellsformat: 'n0',editable:false},
			
			{ text: "ook", datafield: "tttyuy", width: 100 , cellsformat: 'n0',editable:false},
			{ text: "字段宽度", datafield: "FieldWidth", width: 100, cellsformat: 'n0',editable:false },
			{ text: "字段域", datafield: "FieldsArea", width: 100 ,editable:false},
			{ text: "排序", datafield: "Sort", width: 100,editable:false },
			{
				text: "操作",
				datafield: "_operate",
				width: 300,
				pinned: true,
				editable: false,
				pinned: 'right',
				createRender(vm) {
					//绑定删除事件
					$(".detailField, .detailField").on("click", `.jqTable button._operateDel`, function() {
						let index = Number($(this).attr('index'));
						// vm.$refs.jqTable.del(index);
						let data = vm.$refs.jqTable.getData(index);
						// console.log(data);
					});
					//绑定提交事件
					$(".detailField, .detailField").on("click", `.jqTable button._operateSure`, function() {
						let index = Number($(this).attr('index'));
						// vm.$refs.jqTable.del(index);
						let data = vm.$refs.jqTable.getData(index);
						// console.log(data);
					});

					return function(index, fieldName, value, defaultHtml, column, rowData) {
						return `<div class="cellContainer">
									<button class="ivu-btn ivu-btn-text ivu-btn-small _operateSure" index="${rowData.boundindex}">确定</button>
									<button class="ivu-btn ivu-btn-text ivu-btn-small _operateDel" index="${rowData.boundindex}">删除</button>
								</div>`;
					};
				}
			}
  ]
  }
</script>
<style>
	.detailField{

	}
</style>
