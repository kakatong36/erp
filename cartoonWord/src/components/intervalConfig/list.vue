<template>
	<div class="page simpleList mainPadding searchIntervalConfig">
		<div class="innerBorder ListfullHeight">
			<Tabs @on-click="tabChange($event)" :animated="false" v-model="nowIndex">
				<TabPane label="镶口" v-show="tab['1']" name="1">
					<div class="tablebar">
						<Button type="primary" @click="handleAddInlay">新建</Button>
					</div>
					<jqTable ref="inlayTable" />
				</TabPane>
				<TabPane label="价格" v-show="tab['2']" name="2">
					<div class="tablebar">
						<Button type="primary" @click="handleAddPrice">新建</Button>
					</div>
					<jqTable ref="priceTable" />
				</TabPane>
			</Tabs>
		</div>
	</div>
</template>
<script>
// import m_auth from '@/../mixins/auth'
	export default {
		name: "searchIntervalConfig",
		// mixins: [m_auth],
		data(){
			return {
				tab: {
					'1': true,
					'2': true
				},
				datafield: {
					'1': '',
                    '2': ''
				},
				pageInfo: {
					'1':{
                        pageSize: 10,
                        pageIndex: 1,
                        total: 0
                    },
					'2':{
                        pageSize: 10,
                        pageIndex: 1,
                        total: 0
                    }
				},
				cols: [
					{ name: "SearchType", typr: "number"},
					{ name: "PlatId", type: "string"},
					{ name: "PlatName", type: "string"},
					{ name: "MaxiMum", type: "number"},
					{ name: "MiniMum", type: "number"},
					{ name: "Id", type: "string"}
				],
				nowIndex: 1,
				list: [],
				priceList: [],
				platDropList: []
			}
		},
		methods:{
			tabChange(event){
				this.nowIndex = event;
				//请求对应列表
				this.getList(this.nowIndex);
			},
			handleAddInlay(){
				if(this.nowIndex == 1){	//镶口
					this.$refs.inlayTable.el.jqxGrid('addrow', null, {
						SearchType: 1,
						PlatId: "",
						PlatName: "",
						MaxiMum: 0,
						MiniMum: 0
					}, "first");
				}
			},
			handleAddPrice(){
				if(this.nowIndex == 2){	//价格
					this.$refs.priceTable.el.jqxGrid('addrow', null, {
						SearchType: 2,
						PlatId: "",
						PlatName: "",
						MaxiMum: 0,
						MiniMum: 0
					}, "first");
				}
			},
			handleDel(data) {
				this.$Modal.confirm({
					title: "提示",
					content: '确定要删除该区间配置吗?',
					loading: true,
					onOk: () => {
					$.when(this.del(data.Id)).done(res => {
							this.getList(this.nowIndex);
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
					url = Site.api.searchInConfig.delete,
					formData = { id : ids};
				Site.get({
					url: url,
					data: formData
				}).done(res => {
					dtd.resolve(res);
				}).fail(err => {
					dtd.reject(err);
				});
				return dtd;
			},
			getPlatDropList(){
				Site.get({
					url: Site.api.searchInConfig.dropList
				}).done(res => {
					let data = res.data,
						list = [];
						if(data && _.isArray(data)){
							this.platDropList = data
						}else{
							this.platDropList = []
						}
				}).fail(err => {
					this.$Message.error(err.message || '请求失败');
				})
			},
			getList(type){
				const loader = this.$Message.loading({
					content: '正在加载中...',
					duration: 0
				});
				Site.get({
					url: Site.api.searchInConfig.list,
					data: {
						type: type
					}
				}).done(res => {
					loader();
					let data = res.data,
						list = [];
						if(data && _.isArray(data)){
							if(type == 1){
								this.list = data
							}else if(type == 2){
								this.priceList = data
							}
						}else{
							if(type == 1){
								this.list = []
							}else if(type == 2){
								this.priceList = []
							}
						}
				}).fail(err => {
					loader();
					this.$Message.error(err.message || '请求失败');
				})
			},
            handlerSave (url, data) {
				//提交的时候做拦截
				let flag = false;
				let table  = this.getTrueTable();
				if(!data.PlatName){
					this.$Message.error('第'+(data.boundindex+1) +'行的平台不能为空!');
					table.el.jqxGrid('begincelledit', data.boundindex, "PlatName");
					flag = false;
					return false
				}else if(!data.MiniMum && data.MiniMum != 0){
					this.$Message.error('第'+(data.boundindex+1) +'行的最小值不能为空!');
					table.el.jqxGrid('begincelledit', data.boundindex, "MiniMum");
					flag = false;
					return false
				}else if(!data.MaxiMum && data.MaxiMum !=0){
					this.$Message.error('第'+(data.boundindex+1) +'行的最大值不能为空!');
					table.el.jqxGrid('begincelledit', data.boundindex, "MaxiMum");
					flag = false;
					return false
				}else if((data.MiniMum || data.MiniMum == "0") && (data.MaxiMum || data.MaxiMum == "0")){
					//比较值不能小于0，最小值不能大于最大值，最大值不能小于最小值
					if (data.MiniMum < 0){
						this.$Message.error('搜索区间的最小值不能小于0');
						flag = false;
						return false
					}
					if (data.MaxiMum < 0){
						this.$Message.error('搜索区间的最大值不能小于0');
						flag = false;
						return false
					}
					if (data.MaxiMum < data.MiniMum){
						this.$Message.error('搜索区间的最大值不能小于最小值');
						flag = false;
						return false
					}
					if (Number(data.MaxiMum) == Number(data.MiniMum)){
						this.$Message.error('搜索区间的最大值须大于最小值');
						flag = false;
						return false
					}else{
						flag = true;
					}
				}else {
					flag = true;
				}
				_.each(data, (value, key) =>{
					if(key != 'PlatId'
						&& key != 'PlatName'
						&& key != 'SearchType' 
						&& key != 'MaxiMum'
						&& key != 'MiniMum'
						&& key != 'Id'){
							//这些字段不传
							delete data[key]
					}else{
						if(key == "PlatName"){
							_.each(this.platDropList, item =>{
								if(item.Name == value){
									data["PlatId"] = item.Id
								}
							})
						}else if(key == "SearchType"){
							data.SearchType = this.nowIndex;
						}
					}
				})
				if(!flag){
					return false
				}
                const loader = this.$Message.loading({
                    content: '保存中...',
                    duration: 0
                });
                Site.post({
                    url: url,
                    data: data
                }).done(res => {
                    loader()
					if(res && res.code == 1001){
						this.$Message.success(res.message || '提交成功!');
						this.getList(this.nowIndex);
					}
                }).fail(err => {
                    loader()
					this.$Message.error(err.message || '提交失败!');
                })
			},
			getTrueTable(){
				let nowIndex = this.nowIndex;
				let table;
				if(nowIndex == 1){	//镶口
					table = this.$refs.inlayTable;
				}else if(nowIndex == 2){		//价格
					table = this.$refs.priceTable;
				}
				return table
			}
		},
		mounted(){
			let inlayTable = this.$refs.inlayTable,
				priceTable = this.$refs.priceTable;
			let that = this;
				inlayTable.init({
					type: 'edit',
					data: {
						datatype: 'json',
						localdata: [],
						datafields: this.cols,
					},
					cols: page.tableModel,
					vm: this,
					custom: {
						ready(){
							inlayTable.el.on('cellbeginedit', function (event){
								let args = event.args,
									datafield = args.datafield,
									index = args.rowindex,
									value = args.value,
									rowData = args.row;
								if(['MiniMum', 'MaxiMum'].indexOf(datafield)>-1){
									that['datafield'][that.nowIndex] = datafield
								}else{
									that['datafield'][that.nowIndex] = ''
								}
							})
						}
					}
				})
				priceTable.init({
					type: 'edit',
					data: {
						datatype: 'json',
						localdata: [],
						datafields: this.cols,
					},
					cols: page.priceTable,
					vm: this,
					custom: {
						ready(){
							priceTable.el.on('cellbeginedit', function (event){
								let args = event.args,
									datafield = args.datafield,
									index = args.rowindex,
									value = args.value,
									rowData = args.row
								if(['MiniMum', 'MaxiMum'].indexOf(datafield)>-1){
									that['datafield'][that.nowIndex] = datafield
								}else{
									that['datafield'][that.nowIndex] = ''
								}
							})
						}
					}
				})
		},
		watch:{
			list: {
				handler: function(val,oldVal) {
					this.$refs.inlayTable.updata(val)
				},
				deep: true
			},
			priceList: {
				handler: function(val,oldVal) {
					this.$refs.priceTable.updata(val)
				},
				deep: true
			}
		},
		created(){
			window.vm = this;
			this.tabChange('1')
			this.getPlatDropList();
		},
		activated(){

		}

	}
	const page = {
		name: 'searchIntervalConfig',
		tableModel: [
			{text: '平台', datafield: 'PlatName',columntype: 'dropdownlist', width: 100,
				createEditor: function (vm) {
					return function (row, cellvalue, editor) {
						//得到对应的表格
						let table = vm.getTrueTable();
						let rowData = table.getData(row);
						let source = {
							localdata: vm.platDropList,
							datafields: [
								{ name: 'Id' },
								{ name: 'Name' }
							],
						};
						let selectedIndex = -1;
						_.each(vm.platDropList, (item, index) => {
							if(item.Name === cellvalue){
								selectedIndex = index;
								rowData.PlatId = item.Id;
								return false;
							}
						});
						editor.jqxDropDownList({
							autoOpen: true,
							autoDropDownHeight: true,
							animationType: 'none',
							source: new $.jqx.dataAdapter(source),
							selectedIndex: selectedIndex,
							displayMember: "Name",
							valueMember: 'Id'
						});
					}
				}
			},
			{text: '最小值', datafield: 'MiniMum', width: 80},
			{text: '最大值', datafield: 'MaxiMum', width: 80},
			{text: "操作", datafield: "_action", width: 120,editable: false, 
				createRender(vm){
					//保存操作
					$('.searchIntervalConfig').on('click', '.jqTable button.save', function(){
						let index = Number($(this).attr('index'));
						if(vm['datafield'] && vm['datafield'][vm.nowIndex]){
							vm.$refs.inlayTable.el.jqxGrid('endcelledit', index, vm['datafield'][vm.nowIndex], false)
						}
						let data = vm.$refs.inlayTable.getData(index),
							url;
						if(data.Id){
							//编辑
							url = Site.api.searchInConfig.modify
						}else{
							url = Site.api.searchInConfig.create
							delete data['Id']
						}
						if(data){
							vm.handlerSave(url,data);
						}
					})
					//删除操作
					$('.searchIntervalConfig').on('click', '.jqTable button.del', function(){
						let index = Number($(this).attr('index'))
						let data = vm.$refs.inlayTable.getData(index)
						if(data.Id){
							vm.handleDel(data);
						}else{
							vm.$refs.inlayTable.del(index);
						}
					})
					return function(index, fieldName, value, defaultHtml, column, rowData){
						return `<div class="cellContainer">
									<button type="button" class="ivu-btn ivu-btn-text ivu-btn-small save" index="${rowData.boundindex}">保存</button>
									<button type="button" class="ivu-btn ivu-btn-text ivu-btn-small del" index="${rowData.boundindex}">删除</button>
								</div>`
					}
				}
			}
		],
		priceTable: [
			{text: '平台', datafield: 'PlatName', columntype: 'dropdownlist', width: 100,
				createEditor: function (vm) {
					return function (row, cellvalue, editor) {
						//得到对应的表格
						let table = vm.getTrueTable();
						let rowData = table.getData(row);
						let source = {
							localdata: vm.platDropList,
							datafields: [
								{ name: 'Id' },
								{ name: 'Name' }
							],
						};
						let selectedIndex = -1;
						_.each(vm.platDropList, (item, index) => {
							if(item.Name === cellvalue){
								selectedIndex = index;
								rowData.PlatId = item.Id;
								return false;
							}
						});
						editor.jqxDropDownList({
							autoOpen: true,
							autoDropDownHeight: true,
							animationType: 'none',
							source: new $.jqx.dataAdapter(source),
							selectedIndex: selectedIndex,
							displayMember: "Name",
							valueMember: 'Id'
						});
					}
				}
			},
			{text: '最小值', datafield: 'MiniMum', width: 80, cellsformat: "c2"},
			{text: '最大值', datafield: 'MaxiMum', width: 80, cellsformat: "c2"},
			{text: "操作", datafield: "_action", width: 120,editable: false, 
				createRender(vm){
					//保存操作c
					$('.searchIntervalConfig').on('click', '.jqTable button.saveData', function(){
						let index = Number($(this).attr('index'));
						if(vm['datafield'] && vm['datafield'][vm.nowIndex]){
							vm.$refs.priceTable.el.jqxGrid('endcelledit', index, vm['datafield'][vm.nowIndex], false)
						}
						let data = vm.$refs.priceTable.getData(index),
							url;
						if(data.Id){
							//编辑
							url = Site.api.searchInConfig.modify
						}else{
							url = Site.api.searchInConfig.create
							delete data['Id']
						}
						if(data){
							vm.handlerSave(url,data);
						}
					})
					//删除操作
					$('.searchIntervalConfig').on('click', '.jqTable button.delData', function(){
						let index = Number($(this).attr('index'))
						let data = vm.$refs.priceTable.getData(index)
						if(data.Id){
							vm.handleDel(data);
						}else{
							vm.$refs.priceTable.del(index);
						}
					})
					return function(index, fieldName, value, defaultHtml, column, rowData){
						return `<div class="cellContainer">
									<button type="button" class="ivu-btn ivu-btn-text ivu-btn-small saveData" index="${rowData.boundindex}">保存</button>
									<button type="button" class="ivu-btn ivu-btn-text ivu-btn-small delData" index="${rowData.boundindex}">删除</button>
								</div>`
					}
				}
			}
		]
	}
</script>
<style lang="scss">
	.searchIntervalConfig.page{
		.jqTable{
			button{
				&.ivu-btn.ivu-btn-text{
					border: none;
					box-shadow: none;
				}
			}
		}
	}
</style>
