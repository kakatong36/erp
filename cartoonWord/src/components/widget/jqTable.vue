<template>
    <div class="jqTable"></div>
</template>

<script>
import '../../../static/jqwidgets/styles/jqx.base.css'
// import '../../../static/jqwidgets/styles/jqx.green.css'

import '../../../static/jqwidgets/jqxcore.js'
import '../../../static/jqwidgets/jqxdata-2.js'

import '../../../static/jqwidgets/jqxbuttons.js'
import '../../../static/jqwidgets/jqxcheckbox-2.js'
import '../../../static/jqwidgets/jqxnumberinput.js'
import '../../../static/jqwidgets/jqxdropdownlist-2.js'
import '../../../static/jqwidgets/jqxlistbox.js'
import '../../../static/jqwidgets/jqxcombobox.js'
import '../../../static/jqwidgets/jqxscrollbar.js'
import '../../../static/jqwidgets/jqxcalendar.js'
import '../../../static/jqwidgets/jqxdatetimeinput.js'
import '../../../static/jqwidgets/jqxinput.js'


import '../../../static/jqwidgets/jqxgrid-2.js'
//import '../../../static/jqwidgets/jqxgrid-pinned.js'
import '../../../static/jqwidgets/jqxgrid.edit-2.js'
import '../../../static/jqwidgets/jqxgrid.columnsresize.js'
import '../../../static/jqwidgets/jqxgrid.aggregates.js'
// import '../../../static/jqwidgets/jqxgrid.aggregates-1.js'
import '../../../static/jqwidgets/jqxgrid.selection-2.js'
import '../../../static/jqwidgets/jqxgrid.sort-2.js'
import '../../../static/jqwidgets/jqxgrid.storage.js'
import '../../../static/jqwidgets/jqxgrid.columnsreorder.js'
import '../../../static/jqwidgets/jqxmenu.js'
import '../../../static/jqwidgets/jqxgrid.filter.js'
import '../../../static/jqwidgets/jqxtooltip.js'


import {setFieldDefaultValue} from '../../assets/js/utils'

// showloadelement, hideloadelement
    export default {
        name: 'jqTable',
        data () {
            return {
                el: {},
				dataAdapter: {},
				config: {},
				source: {},

				//列选择使用
				isSelecting: false,
				currentSelectCol: null,
				
				isInited: false
            }
        },
        props: {
        },
        computed: {

        },
        watch: {

        },
        created () {

        },
        mounted () {
			this.el = $(this.$el, 'jqTable');
        },
        activated () {

        },
        deactivated () {

        },
        destoryed () {

        },
        methods:{
			/**
			 * @summary							- jqTable初始化
			 * @param {(string|object)} type	- 表格类型list或者edit, 如果是object类型将覆盖其他参数
			 * @param {array|object} 	data	- 显示的数据
			 * @param {array} 			cols	- 列定义
			 * @param {VueComponent} 	vm		- 可以让cols的createXXX函数访问
			 * @param {object} 			custom	- 自定义配置
			 * @return {void}
			 */
            init (type, data, cols, vm, custom) {
				let that = this;
				if(_.isObject(type)){
					data = type.data;
					cols = type.cols;
					vm = type.vm;
					custom = type.custom;
					type = type.type;
				}
				if(!(type == 'list' || type == 'edit')){
					//throw new Error('jqTable的type参数只能是list或者edit'); 
					console.error('jqTable的type参数只能是list或者edit')
					return false;
				}

				let config = {
					localization: Site.globalize.culture(),
					clipboard: false,
					selectionmode: 'multiplerowsextended',
					columnsresize: true,
					columnsreorder: true,
					width: '100%',
					//height: '100%',
              		showpinnedcolumnbackground: false,  //固定列与其他列样式一致
					columns: [],
					rendered: tooltiprenderer, 
					handlekeyboardnavigation: handlekeyboardnavigation(custom),
					ready () {
						let el = $(this.element);
						//选中的数据
						el.on('rowselect', function (event) {
							let list = el.jqxGrid('getrows'),
								indexs = el.jqxGrid('getselectedrowindexes'),
								data = [];
							indexs.forEach(index => {
								list.forEach((item, i) => {
									if(index == i){
										data.push(item);
									}
								});
							});
							that.$emit('onRowSelect', data);
						});
					}
				};
				let columns = [
					{text: '行号', datafield: '_index', width: 40, editable: false,
						cellsrenderer: function (index) {
							return `<div class="cellContainer table-actionBtns">${index + 1}</div>`;
						}
					}
				];
                _.each(cols, item => {
					let option = {};
					_.each(item, (value, key) => {
						if(key == 'createRender'){ //单元格
							option.cellsrenderer = value(vm, this);
						}else if(key == 'createHeader'){ //表头
							option.renderer = value(vm, this);
						}else if(key == 'headerRendered'){
							option.rendered = value(vm, this);
						}else if(key == 'createEditor'){ //编辑框
							option.initeditor = value(vm, this);
						}else if(key == 'createChange'){ //数据改变时
							option.cellvaluechanging = value(vm, this);
						}else if(key == 'createValidation'){ //验证
							option.validation = value(vm, this);
						}else if(key == 'createEditorOnce'){
							option.createeditor = value(vm, this);
						}else if(key.indexOf('create') === 0 && _.isFunction(value)){
							let name = key.slice('create'.length);
							name = name[0].toLowerCase() + name.slice(1);
							option[name] = value(vm, this);
						}else{
							option[key] = value;
						}
					});
					if(option.pinned == true || option.pinned == "left" || option.pinned == "right"){
						columns[0].pinned = "left";
					}
					columns.push(option);
				});

				let width = 0;
                _.each(columns, item => {
					if(item.width){
						width += item.width;
					}else{
						width += 100; //如果不设置宽度，默认150
					}
				});

				config.columns = columns;

				if(type == 'edit'){
					config.clipboard = true;
					config.editable = true;
					config.selectionmode = 'multiplecellsadvanced';
					config.editmode = 'click';
				}

				this.noDefaultValue = false;
				if(custom){
					_.each(custom, (value, key) => {
						if(key == 'noEnter'){

						}else if(key == 'noIndex'){
							if(value){
								width -= columns[0].width;
								config.columns.shift();
							}
						}else if(key == 'noDefaultValue'){
							if(value){
								this.noDefaultValue = true;
							}
						}else{
							config[key] = value;
						}
					})
				}

				if(width > 0){
					let elWidth = this.el.width();
					if(elWidth == 0){
						elWidth = this.el.parent().width();
					}
					if(width < elWidth){
						config.width = width;
					}
				}

				if(config.source){
					this.source = config.source;
				}else{
					let source = {};
					if(_.isArray(data)){
						source.localdata = data;
					}else if(_.isObject(data)){
						if(this.noDefaultValue === false){
							data.localdata = setFieldDefaultValue(data.localdata, data.datafields);
						}
						source = data;
					}
					
					this.source = source;
				}

				this.dataAdapter = new $.jqx.dataAdapter(this.source);
				this.config = config;
                let _config = _.extend({}, this.config, {source: this.dataAdapter})
				this.el.jqxGrid(_config);
				
				this.isInited = true;
				this.$emit('init');
			},
			
			updata (data) {
				this.el.jqxGrid('clearselection');
				if(this.noDefaultValue){
					this.source.localdata = data;
				}else{
					this.source.localdata = setFieldDefaultValue(data, this.source.datafields);
				}
                this.dataAdapter = new $.jqx.dataAdapter(this.source);
                let _config = _.extend({}, this.config, {source: this.dataAdapter})
                this.el.jqxGrid(_config);
			},
			updataRows (ids, dataList) {
				if(this.noDefaultValue){
					this.el.jqxGrid('updaterow', ids, dataList);
				}else{
					this.el.jqxGrid('updaterow', ids, setFieldDefaultValue(dataList, this.source.datafields));
				}
			},
			updataCells (index, fields) {

			},

			add (data) {
				if(this.noDefaultValue){
					this.el.jqxGrid('addrow', null, data);
				}else{
					this.el.jqxGrid('addrow', null, setFieldDefaultValue(data, this.source.datafields));
				}
			},

			del (index) {
				let rowscount, id, commit;
				rowscount = this.el.jqxGrid('getdatainformation').rowscount;
				if (index >= 0 && index < rowscount) {
					id = this.el.jqxGrid('getrowid', index);
					commit = this.el.jqxGrid('deleterow', id);
				}
			},
			emptyData () {
				this.el.jqxGrid('clear');
			},
			getData (indexs) {
				let data = this.el.jqxGrid('getrows'),
					list = [];
				_.each(data, item => {
					item = _.extend({}, item);
					// delete item.boundindex;
					// delete item.uid;
					// delete item.uniqueid;
					// delete item.visibleindex;
					list.push(item);
				});
				if(_.isArray(indexs)){
					let newData = [];
					_.each(indexs, index => {
						if(list[index]){
							newData.push(list[index]);
						}
					});
					list = newData;
				}else if(_.isNumber(indexs)){
					let index = indexs;
					if(list[index]){
						list = list[index];
					}else{
						list = null;
					}
				}
                return list;
			},
			getRowsIndexBySelected () {
				let cells = this.el.jqxGrid('getselectedcells'),
					indexs = new Set();
				_.each(cells, cell => {
					if(cell.datafield == "_index"){
						indexs.add(cell.rowindex);
					}
				});
				indexs = Array.from(indexs);
				return indexs;
			},
			delete(ids){
				if(ids === null || ids === undefined || ids === ''){
					return
				}
				if(Object.prototype.toString.call(ids) == "[object Object]"){
					return
				}
				this.el.jqxGrid('deleterow', ids)
				this.render()
			},
			render(){
				this.el.jqxGrid('render')
			},
			setCellsValue(values){
				if(values === null || values === undefined || values === ''){
					return
				}
				if(Object.prototype.toString.call(values) == "[object Object]"){
					this.el.jqxGrid('setcellvalue', values.index, values.datafield, values.value)
				}
				if(_.isArray(values)){
					_.each(values, item => {
						this.el.jqxGrid('setcellvalue', item.index, item.datafield, item.value)
					})
				}
			},
			hidevalidationpopups(rowIndex, datafield){
				this.el.jqxGrid('hidevalidationpopups', rowIndex, datafield)
			},
			showvalidationpopup(rowIndex, datafield, tip){
				this.el.jqxGrid('showvalidationpopup', rowIndex, datafield, tip)
			}
        }
	}

function tooltiprenderer() {
	if($(".dropDownAble") && $(".dropDownAble").length > 0){
		$(".dropDownAble").jqxTooltip({
			position: 'top', 
			content: "单击可批量修改",
			theme:'green' 
		});
	}
}
//监听回车键
function handlekeyboardnavigation(custom) {

	return function(event) {
		function getNextCol(cols, datafield) {
			let firstCol, nextCol, isAfterCol = false;
			_.each(cols, col => {
				if(!firstCol && col.editable && !col.hidden){
					firstCol = col;
				}
				if(isAfterCol && col.editable && !col.hidden){
					nextCol = col;
					return false;
				}
				if(col.datafield === datafield){
					isAfterCol = true;
				}
			});
			
			return {
				first: firstCol,
				next: nextCol
			};
		}

		let $el = this.host;
		let key = event.charCode ? event.charCode : event.keyCode ? event.keyCode : 0;
		const KEY_ENTER = 13,
			KEY_YES = 89,
			KEY_NO = 78;
			
		if (key == KEY_ENTER) { //回车键处理
			let currentCell = $el.jqxGrid('getselectedcell');
			if(currentCell){
				if(custom && custom.noEnter && custom.noEnter.includes(currentCell.datafield)){
					$el.jqxGrid('endcelledit', currentCell.rowindex, currentCell.datafield, false);
					
					return true;
					/* let nextCell = currentCell.gotoCell();
					if(nextCell === true){
						return true;
					}
					if(nextCell){
						$el.jqxGrid('endcelledit', currentCell.rowindex, currentCell.datafield, false);
						$el.jqxGrid('clearselection');
						$el.jqxGrid('selectcell', nextCell.rowindex, nextCell.datafield);
						this.ensurecellvisible(nextCell.rowindex, nextCell.datafield)
						return true;
					} */
				}else{
					let rowindex = currentCell.rowindex;
					let objCol = getNextCol(this.columns.records, currentCell.datafield);
					if(objCol.next){
						$el.jqxGrid('endcelledit', currentCell.rowindex, currentCell.datafield, false);
						$el.jqxGrid('clearselection');
						$el.jqxGrid('selectcell', rowindex, objCol.next.datafield);
						this.ensurecellvisible(rowindex, objCol.next.datafield)
						return true;
					}else if(objCol.first){
						let datainfo = $el.jqxGrid('getdatainformation');
						if(rowindex + 1 < datainfo.rowscount){
							rowindex++;
							$el.jqxGrid('endcelledit', currentCell.rowindex, currentCell.datafield, false);
							$el.jqxGrid('clearselection');
							$el.jqxGrid('selectcell', rowindex, objCol.first.datafield);
							this.ensurecellvisible(rowindex, objCol.first.datafield)
							return true;
						}
					}
				}
			}
		}else{

		}
	}

}
</script>

<style lang="scss">
.jqTable{
	margin-bottom: 1em !important;
	.jqx-widget-header{
		border-color: #dddee1;
    	background: #f8f8f9;;
	}
	.jqx-fill-state-hover {
		background: #ebf7ff;
	}
	.jqx-fill-state-pressed{
		background: #DAF7F5 !important;
	}
	&.jqx-widget-content {
		border-color: #dddee1;
	}
	&.jqx-widget{
		.jqx-grid-cell,
		.jqx-grid-column-header,
		.jqx-grid-group-cell {
			border-color: #e9eaec;
		}
	}
	.jqx-scrollbar{
		.jqx-fill-state-hover {
			background: #e8e8e8;
		}
		.jqx-fill-state-pressed{
			background: #d1d1d1;
		}

	}
	.cellContainer{
		height: calc(100% - 6px);
		overflow: hidden;
		text-overflow: ellipsis;
		padding-bottom: 2px;
		text-align: left;
		margin-right: 2px;
		margin-left: 4px;
		margin-top: 6px;
		.ivu-btn-small{
			margin-top: -5px;
		}
		.optSpan{
			cursor: pointer;
			margin-right: 5px;
		}
		.opt{
			cursor: pointer;
			margin-right: 8px;
		}
	}
	.image{
		width: 100%;
		height: 100%;
		img{
			max-width: 100%;
			max-height: 100%;
		}
	}
}
body.jqTableProceeding{
    cursor: wait;
}
</style>
