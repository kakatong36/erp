<template>
	<div class="render">
		<Select v-model="imgCode" style="width:200px">
			<div class="img" v-html="selectImg"></div>
			<Option v-for="item in imgList" :value="item.code" :key="item.Id" :style="imgCode | getBgImg">
				<img :src="item.code" alt="">
			</Option>
		</Select>
		<jqTable ref="jqTable"></jqTable>
	</div>
</template>
<script>
	export default {
		name: "render",
		data (){
			return {
				selectImg: "",
				imgCode: "",
				imgList: [
					{
						Id: "01",
						code: "./src/assets/2.png"
					},{
						Id: "02",
						code: "./src/assets/6.png"
					},{
						Id: "03",
						code: "./src/assets/7.png"
					},{
						Id: "04",
						code: "./src/assets/12.png"
					},{
						Id: "05",
						code: "./src/assets/13.png"
					},{
						Id: "06",
						code: "./src/assets/18.png"
					}
				],
				list: [
					{
						Id: "4544545",
						dropList: "0.020ct",
						dropList2: "0.050ct"
					},{
						Id: "152896",
						dropList: "0.300ct",
						dropList2: "3.000ct"
					}
				],
				specifyList: [
                    {
                        "Id":"ad810cd7-837a-4f2f-af0a-e45005a96ef1",
                        "Name":"0.000ct",
                        "ParentId":""
                    },
                    {
                        "Id":"ad810cd7-837a-4f2f-af0a-e45005a96ef1",
                        "Name":"0.010ct",
                        "ParentId":""
                    },
                    {
                        "Id":"ad810cd7-837a-4f2f-af0a-e45005a96ef1",
                        "Name":"0.020ct",
                        "ParentId":""
                    },
                    {
                        "Id":"ad810cd7-837a-4f2f-af0a-e45005a96ef1",
                        "Name":"0.030ct",
                        "ParentId":""
                    },
                    {
                        "Id":"ad810cd7-837a-4f2f-af0a-e45005a96ef1",
                        "Name":"0.040ct",
                        "ParentId":""
                    },
                    {
                        "Id":"ad810cd7-837a-4f2f-af0a-e45005a96ef1",
                        "Name":"0.050ct",
                        "ParentId":""
                    },
                    {
                        "Id":"ad810cd7-837a-4f2f-af0a-e45005a96ef1",
                        "Name":"0.060ct",
                        "ParentId":""
                    },
                    {
                        "Id":"ad810cd7-837a-4f2f-af0a-e45005a96ef1",
                        "Name":"0.070ct",
                        "ParentId":""
                    },
                    {
                        "Id":"ad810cd7-837a-4f2f-af0a-e45005a96ef1",
                        "Name":"0.080ct",
                        "ParentId":""
                    },
                    {
                        "Id":"ad810cd7-837a-4f2f-af0a-e45005a96ef1",
                        "Name":"0.090ct",
                        "ParentId":""
                    },
                    {
                        "Id":"ad810cd7-837a-4f2f-af0a-e45005a96ef1",
                        "Name":"0.100ct",
                        "ParentId":""
                    },
                    {
                        "Id":"ad810cd7-837a-4f2f-af0a-e45005a96ef1",
                        "Name":"0.120ct",
                        "ParentId":""
                    },
                    {
                        "Id":"ad810cd7-837a-4f2f-af0a-e45005a96ef1",
                        "Name":"0.150ct",
                        "ParentId":""
                    },
                    {
                        "Id":"ad810cd7-837a-4f2f-af0a-e45005a96ef1",
                        "Name":"0.200ct",
                        "ParentId":""
                    },
                    {
                        "Id":"ad810cd7-837a-4f2f-af0a-e45005a96ef1",
                        "Name":"0.250ct",
                        "ParentId":""
                    },
                    {
                        "Id":"ad810cd7-837a-4f2f-af0a-e45005a96ef1",
                        "Name":"0.300ct",
                        "ParentId":""
                    },
                    {
                        "Id":"ad810cd7-837a-4f2f-af0a-e45005a96ef1",
                        "Name":"0.400ct",
                        "ParentId":""
                    },
                    {
                        "Id":"ad810cd7-837a-4f2f-af0a-e45005a96ef1",
                        "Name":"0.500ct",
                        "ParentId":""
                    },
                    {
                        "Id":"ad810cd7-837a-4f2f-af0a-e45005a96ef1",
                        "Name":"0.600ct",
                        "ParentId":""
                    },
                    {
                        "Id":"ad810cd7-837a-4f2f-af0a-e45005a96ef1",
                        "Name":"0.700ct",
                        "ParentId":""
                    },
                    {
                        "Id":"ad810cd7-837a-4f2f-af0a-e45005a96ef1",
                        "Name":"0.800ct",
                        "ParentId":""
                    },
                    {
                        "Id":"ad810cd7-837a-4f2f-af0a-e45005a96ef1",
                        "Name":"1.000ct",
                        "ParentId":""
                    },
                    {
                        "Id":"ad810cd7-837a-4f2f-af0a-e45005a96ef1",
                        "Name":"1.200ct",
                        "ParentId":""
                    },
                    {
                        "Id":"ad810cd7-837a-4f2f-af0a-e45005a96ef1",
                        "Name":"1.500ct",
                        "ParentId":""
                    },
                    {
                        "Id":"ad810cd7-837a-4f2f-af0a-e45005a96ef1",
                        "Name":"2.000ct",
                        "ParentId":""
                    },
                    {
                        "Id":"ad810cd7-837a-4f2f-af0a-e45005a96ef1",
                        "Name":"2.500ct",
                        "ParentId":""
                    },
                    {
                        "Id":"ad810cd7-837a-4f2f-af0a-e45005a96ef1",
                        "Name":"3.000ct",
                        "ParentId":""
                    }
                ]
			}
		},
		methods:{

		},
		created() {
			window.vm = this;
		},
		activated(){

		},
		mounted (){
			let jqTable = this.$refs.jqTable
			jqTable.init({
				type: "edit",
				data: {
					datatype: "json",
					localdata: this.list,
					datafields: [
						{ name: "Id", type: "string"},
						{ name: "dropList", type: "string"},
						{ name: "dropList2", type: "string"}
					]
				},
				cols: page.tableModal,
				vm: this,
				custom: {
					width: 340,
					height: 400
					// width: this.$refs.jqTable.el.parent().width() -2,
					// height: this.$refs.jqTable.el.parent().height() -2
				}
			})
		},
		watch: {
			// list:
		},
		filters:{
			getBgImg: function(val){
				if(val){
					return 	`background:url(${val});`
				}
			}
		}
	}
	const page = {
		tableModal: [
			{ text: "搜索框下拉", datafield:"dropList", editable: true,width: 150,columntype: 'combobox',
				createEditor: function (vm) {
					return function (row, cellvalue, editor) {
						//得到对应的表格
						let rowData = vm.$refs.jqTable.getData(row);
						let specifyList = vm.specifyList || []
						let source = {
							localdata: specifyList,
							datafields: [
								{ name: 'Name' }
							],
						};
						let ids = []
						_.each(specifyList, item =>{
							if(ids.indexOf(item.Name) == -1){
								ids.push(item.Name)
							}
						})
						let selectedIndex = -1;
						_.each(specifyList, (item, index) => {
							if(item.Name === cellvalue){
								selectedIndex = index;
								return false;
							}
						});
						editor.jqxComboBox({
							width:150,
							autoOpen: true,
							autoDropDownHeight: false,
							animationType: 'none',
							source: new $.jqx.dataAdapter(source),
							selectedIndex: selectedIndex,
							displayMember: "Name",
							valueMember: 'Name'
						});
						editor.on('close', function(event){
							let rowData = vm.$refs.jqTable.getData(row),
								newValue = editor.jqxComboBox('val')
								console.log(newValue)
								if(ids.indexOf(newValue) == -1){
									rowData.dropList = "";
									vm.$refs.jqTable.setCellsValue({index: row, datafield: "dropList", value: ""})
									return false
								}
								_.each(specifyList, item => {
									if(newValue == item.Name){
										rowData.dropList = newValue;
										vm.$refs.jqTable.setCellsValue({index: row, datafield: "dropList", newValue})
										return false
									}
								})
						})
					}
				},
				createChange: function(vm){
					return function(rowIndex, datafield, columntype, oldvalue, newvalue){
						if(oldvalue == newvalue){
							return
						}
						let rowData = vm.$refs.jqTable.getData(rowIndex),
							specifyList = vm.specifyList || [],
							selectedIndex = -1
						_.each(specifyList, (item, index) => {
							if(item.Name == newvalue){
								selectedIndex = index
							}
						})
						let value = ''
						if(selectedIndex < 0){
							value = ''
						}else{
							value = newvalue
						}
						if(value || parseFloat(value) == 0){
							vm.$refs.jqTable.setCellsValue({index: rowIndex, datafield, value})	
						}else{
							vm.$refs.jqTable.setCellsValue({index: rowIndex, datafield, value:""})
						}
					}
				}
			},
			{ text: "搜索框下拉2", datafield:"dropList2", editable: true,width: 150,columntype: 'combobox',
				createEditor: function (vm) {
					return function (row, cellvalue, editor) {
						//得到对应的表格
						let rowData = vm.$refs.jqTable.getData(row);
						let specifyList = vm.specifyList || []
						let source = {
							localdata: specifyList,
							datafields: [
								{ name: 'Name' }
							],
						};
						let selectedIndex = -1;
						_.each(specifyList, (item, index) => {
							if(item.Name === cellvalue){
								selectedIndex = index;
								return false;
							}
						});
						editor.jqxComboBox({
							width:150,
							autoOpen: true,
							autoDropDownHeight: false,
							animationType: 'none',
							source: new $.jqx.dataAdapter(source),
							selectedIndex: selectedIndex,
							displayMember: "Name",
							valueMember: 'Name'
						});
					}
				},
				createChange: function(vm){
					return function(rowIndex, datafield, columntype, oldvalue, newvalue){
						if(oldvalue == newvalue){
							return
						}
						let rowData = vm.$refs.jqTable.getData(rowIndex),
							specifyList = vm.specifyList || [],
							selectedIndex = -1
						_.each(specifyList, (item, index) => {
							if(item.Name == newvalue){
								selectedIndex = index
							}
						})
						let value = ''
						if(selectedIndex < 0){
							value = ''
						}else{
							value = newvalue
						}
						console.log(value)
						if(value || parseFloat(value) == 0){
							vm.$refs.jqTable.setCellsValue({index: rowIndex, datafield, value})	
						}
					}
				}
			}
		]
	}
</script>
<style lang="scss">
	.render{
		.ivu-select{
			position: relative;
			margin-bottom: 15px; 
			.img{
				height: 24px;
				width: 24px;
				position: absolute;
				border: 1px solid red;
			}
		}
		.ivu-select-dropdown{
			.ivu-select-item{
				padding: 2px 16px !important;
				img{
					height: 24px;
					width: 24px;
				}
			}
		}
	}
</style>

