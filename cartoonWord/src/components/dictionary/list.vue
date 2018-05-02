<template>
	<div>
		<div class="page simpleList mainPadding" :class="pageClass">
			<!-- 字典大类 -->
			<Row :gutter="16">
				<Col :lg='4'>
					<div class="innerBorder ListfullHeight" style='height: 603px;'>
						<Button type="primary" @click="openTab('add')">新建</Button>
						<Tree :data="acTree" id ='myTree' ref="tree" @on-select-change="getTreeItem"></Tree>
					</div>
				</Col>
				<Col :lg='10'>
					<div class="innerBorder ListfullHeight">
						<Form ref="form" class="clearfix form-wrapper" :model="searchFormData" :label-width="80" >
							<Form-item label="字典值名称" prop="valueName">
								<Input v-model="searchFormData.valueName" type="text" />
							</Form-item>
							<Button type="primary" @click="search()">查询</Button>
						</Form>
						<div class="tablebar" style='margin-bottom: 12px;'>
							<Button type="primary" @click="openTab('addDicVal')">新建</Button>
							<Button type="ghost" @click='handleDelBatch'>批量删除</Button>
							<Button type="ghost" @click="search()">刷新</Button>
						</div>
						<jqTable ref="jqTable" @onRowSelect="setListDataSelected"></jqTable>
						<Page @on-change="pageChange" @on-page-size-change="pageSizeChange" :current="Pager.pageIndex" :page-size="Pager.pageSize" :total="Pager.total" :page-size-opts="[10, 15, 20, 30, 40]" placement="top" show-sizer show-elevator show-total></Page>
					</div>
				</Col>
				<Col :lg='6'>
					<div class="innerBorder ListfullHeight" style='height: 603px;'>
						<Form ref="form" :label-width="100" inline onsubmit="return false">
							<!-- 第一大类字典 -->
							<RadioGroup v-model="DictionaryIdParent" @on-change='changeDicDropData' vertical style='width:100%;'>
								<Radio v-for='(item, index) in dicDropList' :key='index' :label="item.Id" >{{item.Name}}</Radio>
							</RadioGroup>
							<!-- 目前做的是二级字典 -->
							<Form-item label="字典名称" prop="DictionaryId">
								<Select v-model="dicFormData.DictionaryId" placeholder='请选择字典名称' clearable>
									<Option v-for="item in secondDicDropList" :label="item.Name" :value="item.Id" :key="item.Id"></Option>
								</Select>
							</Form-item>
							<Form-item label="字典值名称" prop="valueName">
								<Input v-model="formData.valueName" type="text" />
							</Form-item>
							<Form-item label="助记码" prop="Code">
								<Input v-model="formData.Code" type="text" />
							</Form-item>
							<Form-item label="排序" prop="Sort">
								<Input v-model="formData.Sort" type="text" number />
							</Form-item>
						</Form>
					</div>
				</Col>
			</Row>
		</div>
		<Modal
			title='字典配置'
		 	v-model='isShowDicAdd'
			:mask-closable='false'>
			<Form ref='dicFormModal' :model="dicFormData" :rules="dicFormDataValidate" :label-width="80" onsubmit="return false">
				<Tabs :animated="false" value="Parent">
					<TabPane label="父级分类" name="Parent">
						<Form-item label="分类名称" prop="DictionaryName">
							<Input v-model="dicFormData.DictionaryName" type="text" />
						</Form-item>
						<Form-item label="排序" prop="Sort">
							<Input v-model="dicFormData.Sort" type="text" />
						</Form-item>
					</TabPane>
					<TabPane label="子级分类" name="Child">
						<Form-item label="父级分类" prop="ParentId">
							<Select v-model="dicFormData.ParentId" placeholder='请选择父级分类' clearable>
								<Option v-for="item in dicDropList" :label="item.Name" :value="item.Id" :key="item.Id"></Option>
							</Select>
							<!-- <Cascader :data="dicDropList" v-model="dicFormData.ParentId" ></Cascader> -->
						</Form-item>
						<Form-item label="分类名称" prop="DictionaryName">
							<Input v-model="dicFormData.DictionaryName" type="text" />
						</Form-item>
						<Form-item label="排序" prop="Sort">
							<Input v-model="dicFormData.Sort" type="text" />
						</Form-item>
					</TabPane>
				</Tabs>
			</Form>
			<div slot="footer">
				<Button type="primary" html-type="submit" @click="handleSubmit('dicFormModal')">提交</Button>
				<Button type="ghost" @click='isShowDicAdd=false' style="margin-left: 8px">关闭</Button>
			</div>
		</Modal>
	</div>
</template>

<script>
export default {
	name: 'dictionary',
	data (){
		return {
			pageClass: '',
			acTree: [],
			inintDicList: [],
			formData: {
				Id: '',
				DictionaryId: '',
				ValueName: '',
				Code: '',
				Sort: 0
			},
			dicDropList: [],
			secondDicDropList: [], 
			listDataSelected: [],
			DictionaryIdParent: '',	//第一大类字典Id
			isShowDicAdd: false,
			showEditForm: false,
			searchFormData: {
				valueName: '',
				dicId: ''
			},
			Pager: {
				pageIndex: 1,
				pageSize: 15,
				total: 0
			},
			dicFormData: {
				DictionaryName: '',
				ParentId: '0',
				Code: '',
				Sort: 0,
			},
			dicFormDataValidate: {
				DictionaryName: [
					{ required: true, message: '分类名称不可为空', triggle: 'change,blur'}
				],
				ParentId: [
					{ required: true, message: '父级分类不可为空' }
				]
			}
		}
	},
	methods: {
		openTab (action, data) {
			switch(action){
				case 'add':
					//添加字典
					this.isShowDicAdd = true;
					break
				case 'edit':

					break
				case 'addDicVal':
					this.showEditForm = false;
				break
			}
		},
		setListDataSelected (selection) {
			this.listDataSelected = selection;
		},
		createTable (tableModel) {
			let that = this;
			let jqTableList = this.$refs.jqTable;
			this.$refs.jqTable.init({
				type: 'list',
				data: {
					datatype: 'json',
					localdata: [],
					datafields: [	//这里放的是当前行用来操作/显示的数据
						{name: 'Id', type: 'string'},
						{name: 'DictionaryName', type: 'string'},
						{name: 'ValueName', type: 'string'},
						{name: 'Code', type: 'string'},
						{name: 'Sort', type: 'number'},
						{name: 'DictionaryId', type: 'string'}
					]
				},
				cols: tableModel, 
				vm: this,
				custom: {
					selectionmode: 'multiplecellsextended'
				}
			});
		},
		handleSubmit(name){
			this.$refs[name].validate(valid => {
				if (valid) {
					$.when(this.postForm(name)).done(res => {
						if(res.code == 1001){           
							this.$Message.success('提交成功!');
							if(name == 'dicFormModal'){
								this.handleReset('dicFormModal');
								// this.isShowDicAdd = false;
								// this.getDicTreeList();
							}
						} 
					}).fail( err => { 
						this.$Message.error(err.message || '提交失败!');
					});
				} else {
					this.$Message.error('表单验证失败!');
				}
			})
		},
		handleDelBatch () {
			let selectedCells = this.$refs.jqTable.el.jqxGrid('getselectedcells');	//重复的rowindex
			let endSelectCells = [];
			_.each(selectedCells, cell =>{
				if(endSelectCells && endSelectCells.length > 0){
					if(endSelectCells.indexOf(cell.rowindex) == -1){
						endSelectCells.push(cell.rowindex);
					}
				}else{
					endSelectCells.push(cell.rowindex);
				}
			})
			let ids = [];
			for(let rowIndex of endSelectCells){		//循环的是 数组的元素值(行下标rowindex)
				//通过行Id得到当前行的数据
				let rowData = this.$refs.jqTable.getData(rowIndex);
				ids.push(rowData.Id);	//删除的数据的Id
			}
			let listDataSelected = this.listDataSelected;
			if(!ids[0]){
				this.$Message.info('请至少选择一项数据!');
				return false;
			}
			this.$Modal.confirm({
				title: '提示',
				content: '要删除选中的数据吗?',
				loading: true,
				onOk: () => {
					$.when(this.del(ids)).done(res => {
						// this.search();
						this.$Message.success('删除成功!');
					}).fail( err => {
						this.$Message.error('删除失败!');
					}).always(() => {
						this.$Modal.remove();
					});
				}
			});
		},
		handleDel (data) {
			this.$Modal.confirm({
				title: '提示',
				content: '确定要删除 '+data.Id+' 配置吗?',
				loading: true,
				onOk: () => {
					$.when(this.del([data.Id])).done(res => {
						this.search();
						// this.showEditForm = false;
						this.$Message.success('删除成功!');
					}).fail( err => {
						this.$Message.error(err.message || '删除失败!');
					}).always(() => {
						this.$Modal.remove();
					});
				}
			});
		},
		del (ids) {
			let dtd = $.Deferred(),
				url,
				formData = {Id: ids};
				url = Site.api.dictionaryValue.batchDelete
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
		postForm (name) {
			let dtd = $.Deferred(),
				url,
				formData = {};
			if(name == 'dicFormModal'){
				formData = _.extend({}, this.dicFormData),
				url = Site.api.dictionary.create;
			}
			_.each(formData, (value, key) => {
				let val;
				formData[key] = val === undefined ? value : val;
			});
			const loader = this.$Message.loading({
				content: '正在加载中...',
				duration: 0
			});
			Site.post({
				url: url,
				data: formData
			}).done(res => {
				loader();
				dtd.resolve(res);
			}).fail(err => {
				loader();
				dtd.reject(err);
			})
			return dtd;
		},
		getDicDropList(){
			Site.get({
				url: Site.api.dictionary.getDropDownList
			}).done(res => {
				let data = res.data,
					list = [];
				if(data){
					_.each(data, item =>{
						if(item.ParentId == '0'){
							list.push({
								Id: item.Id,
								Name: item.DictionaryName
							})
						}
					})
				}else{
					list = [];
				}
				this.dicDropList = list;
			}).fail(err => {
				this.$Message.error(err.message || '请求失败');
				this.dicDropList = [];
			})
		},
		getTreeItem(data){
			console.log(data)
		},
		pageChange (currentPage) {
			this.search(currentPage);
		},
		pageSizeChange (pageSize) {
			this.pager.pageSize = pageSize;
			this.search();
		},
		search (pageIndex) {
			let formData = _.extend({}, this.searchFormData);
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
				url: Site.api.dictionaryValue.getList,
				data: myFormData
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
		changeDicDropData(value){
			console.log(value);
			let data;
			_.each(this.dicDropList, item =>{
				if(item.Id == value){
					//联动下拉框的数据
				}
			})
		},
		getDicTreeList(){
			let options = {
				url : Site.api.dictionary.getDicTreeList
			};
			Site.get(options).done( res =>{
				this.acTree= [];
				this.inintDicList = res.data;
				_.each(res.data, (item, index, coll) =>{
					this.acTree = this.acTree.concat(this.getTreeData(item,'DictionaryName'));
				});
			});
		},
		getTreeData (data, title) {
			var treedata = [], obj;
			let numStart = 1;
			obj = {
				title: "<span>" + data[title] + "</span>",
				expand: true,
				_class: 'hierarchy_' + numStart
			};

			if (data.ChildList && data.ChildList.length) {
				obj.children = [];
				loop(data.ChildList, obj.children,numStart+1);
			}

			treedata.push(obj);
			return treedata;

			function loop(list, children,num) {
				list.map((item, index, arrar) => {
					var obj;
					obj = {
						title: `<span>${item.DictionaryName}</span>`,
						content: item,
						selected: false,
						_class: 'hierarchy_' + num
					};
					children.push(obj)
					if (item.ChildList && item.ChildList.length) {
						obj.children = [];
						loop(item.ChildList, obj.children, num+1);
					}
				});
			}
		}
	},
	watch: {
		list: {
			handler: function(val,oldval){
				this.$refs.jqTable.updata(val);
			},
			deep: true
		}
	},
	mounted(){
		this.createTable(page.tableModel);
	},
	created (){
		window.vm = this;
		this.pageClass = page.pageName;
		// this.getDicTreeList();
		// this.getDicDropList();
	},
	activated () {

	}

}
const page = {
	pageName: 'dictionary',
    tableModel: [
		{text: '字典名称', datafield: 'DictionaryName', editable: false},
		{text: '字典值名称', datafield: 'ValueName', editable: false},
		{text: '助记码', datafield: 'Code', width: 100, editable: false},
		{text: '排序', datafield: 'Sort', editable: false},
		{text: '操作', datafield: '_action', width: 120,
			editable: false,
			createRender (vm){
				//编辑操作
				$('.dictionary').on('click',`.jqTable button.actionEdit`, function(){
					let index = Number($(this).attr('index'));
					let rowData = vm.$refs.jqTable.getData(index);
					vm.showEditForm = true;
					// vm.getFormData(rowData.ID);
				})
				//删除操作
				$('.dictionary').on('click',`.jqTable button.actionDel`, function(){
					let index = Number($(this).attr('index'));
					let rowData = vm.$refs.jqTable.getData(index);
                    vm.handleDel(rowData);
				})
				//操作按钮
				return function (index, fieldName, value, defaultHtml, column, rowData){
					return `<div class="cellContainer">
								<button type="button" class="ivu-btn ivu-btn-text ivu-btn-small actionEdit" index="${rowData.boundindex}">编辑</button>
								<button type="button" class="ivu-btn ivu-btn-text ivu-btn-small actionDel" index="${rowData.boundindex}">删除</button>
							</div>`
				}
			}
		}
	]
}
</script>

<style lang="scss" >
.tableSwitch{
    position: relative;
    display: inline-block;
    .switchMask{
        position: absolute;
        left: 0;
        top: 0;
        right: 0;
        bottom: 0;
    }
}
.justify{
    float:left;
}
.dictionary{
	.ivu-radio-group.ivu-radio-group-vertical{
		padding-left: 50px;
		padding-bottom: 10px;
	}
}
</style>
