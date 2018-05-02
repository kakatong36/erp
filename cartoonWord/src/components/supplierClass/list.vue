<template>
	<div class="page supplierClass">
		<div class="filter">
			<Form ref="form" :model="formData" :label-width="80" inline >
				<FormItem label="分类名称">
					<Input v-model.trim="formData.name" />
				</FormItem>
			</Form>
			<div class="btns">
				<Button type="ghost">查询</Button>
			</div>
		</div>
		<div class="tablebar">
			<Button type="ghost" @click='handleAdd()'>新增</Button>
			<Button type="ghost">删除</Button>
			<Button type="ghost" @click='search()'>刷新</Button>
		</div>
		<jqTable ref="jqTable" @onRowSelect="setListDataSelected"></jqTable>
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

</template>

<script>
export default {
	name: 'supplierClass',
	data () {
		return {
			formData: {},
			listDataSelected: [],
			list: [],
			pager: {
				pageIndex: 1,
				pageSize: 15,
				total: 0
			},

		}
	},
	methods : {

		pageChange (currentPage) {
        	this.search(currentPage);
		},
		pageSizeChange (pageSize) {
			this.pager.pageSize = pageSize;
			this.search();
		},
		setListDataSelected (selection) {
			this.listDataSelected = selection;
		},
		handleAdd(){
			//清空筛选条件
			this.$refs.jqTable.el.jqxGrid('addrow', null, {}, 'first');
		},
		search (pageIndex) {
			let formData = _.extend({}, this.formData);
			_.each(formData, (value, key) => {
				if(value === '')
					delete formData[key];
				else{
					let val;
					formData[key] = val === undefined ? value : val;
				}
			});
			this.pager.pageIndex = pageIndex > 0 ? pageIndex : 1;
			this.getList(formData);
		},
		getList (formData) {
			let myFormData = formData || {};
			_.extend(myFormData, this.pager);
			delete myFormData.total;
			const loader = this.$Message.loading({
				content: '正在加载中...',
				duration: 0
			});
			Site.get({
				url: Site.api.purchaserCategory.list
			}).done(res => {
				loader();
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
			}).fail(err => {
				loader();
				this.$Message.error(err.message || '请求失败');
				this.list = [];
				this.pager.total = 0;
			})
		},
		handleSave(data){
			const loader = this.$Message.loading({
				content: '保存中...',
				duration: 0
			});
			Site.post({
				url: Site.api.purchaserCategory.create,
				data: data
			}).done(res => {
				loader();
				if(rea.code == 1001){
					this.getList();
					this.$Message.success(res.message || '提交成功');
				}
			}).fail(err => {
				loader();
				this.$Message.error(err.message || '提交失败');
			})
		},
		createTable(tableModel){
			let that = this;
			let jqTable = this.$refs.jqTable;
			jqTable.init({
				type: 'edit',
				data: {
					datatype: 'json',
					localdata: [],
					datafields: [
						{name: '_selection', type: 'boolean'},
						{ name: 'Id', type: 'string'},
						{ name: 'ClassName', type: 'string'},
						{ name: 'code', type: 'string'},
						{ name: 'Sort', type: 'string'}
					]
				},
				cols: tableModel,
				vm: this,
				custom: {
					noIndex: true,
					selectedrowindex: -1,
					selectionmode: 'multiplecellsextended',
					ready(){
						jqTable.el.on('cellvaluechanged', function (event){
							let args = event.args,
								datafield = event.args.datafield,
								rowBoundIndex = args.rowindex,
								value = args.newvalue,
								oldvalue = args.oldvalue,
								rowData = jqTable.getData(rowBoundIndex);	//当前选中一行的数据
						})
					}
				}
			})
		}
	},
	watch: {
		list: {
			handler: function (val,oldVal){ 
				this.$refs.jqTable.updata(val);
			},
			deep: true
		}
	},
	created () {
		window.vm=this;
	},
	activated (){
		let dicId = this.$route.params.dicId;
		if(dicId && dicId != this.formData.dicId){
			// this.getList(this.formData)
		}
	},
	mounted (){
		this.createTable(page.tableModel);
	}
}
const page = {
	pageName: 'supplierClass',
	tableModel: [
		{width: 50, datafield: '_selection', columntype: 'checkbox',
			createHeader: function(vm){
				return function(text, align, height){
					return `<div style='position: absolute;top: 50%;left: 50%;margin-top: -7px;margin-left: -10px;overflow: visible;'></div>`
				}
			},
			headerRendered: function(vm){
				return function (element, align, height) {
					element.jqxCheckBox()
					let data = vm.$refs.jqTable.getData(),
						count = 0
					_.each(data, item => {
						if(item._selection){
							count++
						}
					})
					if(data.length && count == data.length){
						element.val(true)
					}else{
						element.val(false)
					}
					element.on('change', function (event) {
						let args = event.args
						if(!args.type){
							return
						}
						let data = vm.$refs.jqTable.getData()
						_.each(data, item => {
							item._selection = args.checked
						})
						if(data.length){
							vm.$refs.jqTable.updata(data)
						}
					})
					return true
				}
			},
			createChange: function(vm){
				return function(rowIndex, datafield, columnname, oldvalue, newvalue){
					vm.$refs.jqTable.el.jqxGrid('setcellvalue', rowIndex, datafield, newvalue)
					let data = vm.$refs.jqTable.getData(),
						count = 0
					_.each(data, item => {
						if(item._selection){
							count++
						}
					})
					if(count == data.length){
						vm.$refs.jqTable.el.find('[role="columnheader"] .jqx-checkbox').val(true)
					}else{
						vm.$refs.jqTable.el.find('[role="columnheader"] .jqx-checkbox').val(false)
					}
					vm.$refs.jqTable.render()
				}
			}
		},
		{text: '行号', datafield: '_index',width: 60,
			createRender(vm){
				return function (index, fieldName, value, defaultHtml, column, rowData){
					return `<div class='cellContainer'>${rowData.boundindex + 1}</div>`
				}
			}
		},
		{text: '分类名称', datafield: 'ClassName',width: 120 },
		{text: '助记码', datafield: 'code', width: 120 },
		{text: '排序', datafield: 'Sort'},
		{text: '操作', datafield: '_action', width: 120, editable: false,
			createRender (vm){
				//保存操作
				$('.supplierClass').on('click',`.jqTable button.actionEdit`, function(){
					let index = Number($(this).attr('index'));
					let rowData = vm.$refs.jqTable.getData(index);
					vm.handleSave(rowData)
				})
				$('.supplierClass').on('click',`.jqTable button.actionDel`, function(){
					let index = Number($(this).attr('index'));
					let rowData = vm.$refs.jqTable.getData(index);
					vm.$refs.jqTable.del(index)
                    // vm.handleDel(rowData);
				})
				//操作按钮
				return function (index, fieldName, value, defaultHtml, column, rowData){
					return `<div class="cellContainer">
								<button type="button" class="ivu-btn ivu-btn-text ivu-btn-small actionEdit" index="${rowData.boundindex}">保存</button>
								<button type="button" class="ivu-btn ivu-btn-text ivu-btn-small actionDel" index="${rowData.boundindex}">删除</button>
							</div>`
				}
			}
		}
	]
}
</script>

<style lang="scss">
.supplierClass.page{
	min-height: 100%;
	.jqTable{
		.ivu-btn.ivu-btn-text{
			border: none;
			box-shadow: none;
		}
	}
	.add{
		width: 270px;
		margin-bottom: 15px;
		margin-left: 15px;
	    padding-top: 15px;
		padding-right: 15px;
		border: 1px solid #dddee1;
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
		    margin: 0 15px;
		}
	}
	.tablebar{
		margin-bottom: 15px;
	}
}
</style>
