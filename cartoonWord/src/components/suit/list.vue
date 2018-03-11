<template>
  <div class='page suit' :class="pageClass">
	  <!-- 新表格 -->
	  <jqTable ref='jqTable'></jqTable>
  </div>
</template>
<script>
export default {
	name: 'suit',
	data(){
		return {
      		pageClass: "",
			list: [],
			GenderList: [
				{
					Id: 1,
					Name: '男'
				},{
					Id: 2,
					Name: '女'
				}
			]
		}
	},
 	methods:{
	    getSame(){
		    let tableExistData = [
			  	{
					CategoryName:"彩宝",
					Gender:0,
					GoldWeight:"0.13",
					Id:"3c854e5c-4461-45c3-8404-32fc0453d751",
					MainImage:"",
					StyleId:"e77bb519-243d-4764-8450-03fd53ff4188",
					StyleName:"蒹葭",
					StyleNo:"永生永世",
					SuitId:"d5d05c91-e7db-445b-9ac7-f10c07dd199f",
					boundindex:1,
					uid:1,
					uniqueid:"2220-30-24-24-281727",
					visibleindex:1
				},{
					CategoryName:"钻石",
					Gender:0,
					GoldWeight:"0.25",
					Id:"f18e8208-0e0c-4dd4-9fb6-db5f250ce1d7",
					MainImage:"",
					StyleId:"b1efdd6a-1630-4fb8-ad9f-86324327e938",
					StyleName:"远方追寻套装",
					StyleNo:"far",
					SuitId:"d5d05c91-e7db-445b-9ac7-f10c07dd199f",
					boundindex:0,
					uid:0,
					uniqueid:"2819-16-16-27-222126",
					visibleindex:0
				}
			]
			this.list = tableExistData;
	    },
		createTable(tableModel) {
			this.$refs.jqTable.init({
				type: "list",
				data: this.list,
				cols: tableModel,
				vm: this
			});
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
  pageName: "suit",
  tableModel: [
			{ text: "性别", datafield: "Gender", width: 60 , editable: true,
				clipboard: false,
				columntype: 'dropdownlist',
				createEditor: function (vm) {
					return function (row, cellvalue, editor) {
						let source = {
							localdata: vm.GenderList,
							datafields: [
								{ name: 'Id' },
								{ name: 'Name' }
							],
						};
						editor.jqxDropDownList({
							autoDropDownHeight: true,
							source: new $.jqx.dataAdapter(source),
							displayMember: "Name"
						});
					}
				}
			},
			{ text: "款号", datafield: "StyleNo", width: 100 , editable: false},
			{ text: "款名", datafield: "StyleName", width: 100, editable: false },
			{ text: "款式别名", datafield: "AliasName", width: 100 },
			{ text: "分类", datafield: "CategoryName", width: 150, editable: false },
			{ text: "净金重(约)", datafield: "GoldWeight", width: 120, editable: false }
			/*{
				text: "操作",
				datafield: "_operate",
				width: 80,
				editable: false,
				createRender(vm) {
					//绑定事件
					$(".suit, .suit").on("click", `.jqTable button._operateStyleDel`, function() {
						let index = Number($(this).attr('index'));
						// vm.$refs.jqStyleListShow.del(index);
						let data = vm.$refs.jqStyleListShow.getData();
						if(data.length == 0){
							vm.styleTableShow = false;
							vm.isRegenerate = false;
						}else{
							vm.isRegenerate = true;
						}
					});

					return function(index, fieldName, value, defaultHtml, column, rowData) {
						return `<div class="cellContainer">
									<button class="ivu-btn ivu-btn-text ivu-btn-small _operateStyleDel" index="${rowData.boundindex}">删除</button>
								</div>`;
					};
				}
			}*/
  ]
  }
</script>
<style>
	.suit{

	}
</style>
