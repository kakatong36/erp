<template>
    <div>
        <div class="page simpleList justify" :class="pageClass" style='width:43%;margin-right: 20px;display:inline-block;'>
            <div class="innerBorder ListfullHeight">
				<Form ref="form" class="clearfix form-wrapper" :model="formData" :label-width="80" inline onsubmit="return false">
					<Form-item
						v-for="item in searchModel"
						:key="item.key"
						:label="item.name"
						:prop="item.key">
						<Input v-model="formData[item.key]" :type="getElementType(item.typeElem)" v-if="isElementType(item.typeElem, 'input')" :autosize="true"></Input>
						<Select v-model="formData[item.key]" clearable @on-change="item.changeCallback($event, item, formData)" v-else-if="isElementType(item.typeElem, 'select')">
						<Option
							v-for="optionItem in item.children"
							:key="optionItem.key"
							:value="optionItem.key">
							{{optionItem.value}}
						</Option>
						</Select>
						<Cascader :data="item.children" v-model="formData[item.key]" v-else-if="isElementType(item.typeElem, 'cascader')"></Cascader>
						<Date-picker :type="getElementType(item.typeElem)" v-model="formData[item.key]" v-else-if="isElementType(item.typeElem, 'datePicker')"></Date-picker>
					</Form-item>
				<Button type="primary" @click="search()">查询</Button>
				</Form>
                <div class="tablebar" >
                    <Button type="primary" @click="openTab('add')">新建</Button>
                    <Button type="ghost" @click="search()">刷新</Button>
                </div>
				<jqTable ref='jqTable' @onRowSelect="setListDataSelected"></jqTable>
                <Page @on-change="pageChange" @on-page-size-change="pageSizeChange" :current="pager.pageIndex" :page-size="pager.pageSize" :total="pager.total" :page-size-opts="[10, 15, 20, 30, 40]" placement="top" show-sizer show-elevator show-total></Page>
            </div>
        </div>
		<div style='width:45%;margin-right: 20px;display:inline-block;'>
            <div class="innerBorder ListfullHeight" v-show='!isConfig'>
				<Form ref="interfaceForm" class="clearfix form-wrapper" :model="interfaceForm" :label-width="80" inline onsubmit="return false">
					<Form-item
						v-for="item in searchInterModel"
						:key="item.key"
						:label="item.name"
						:prop="item.key">
						<Input v-model="interfaceForm[item.key]" :type="getElementType(item.typeElem)" v-if="isElementType(item.typeElem, 'input')" :autosize="true"></Input>
						<Select v-model="interfaceForm[item.key]" clearable @on-change="item.changeCallback($event, item, formData)" v-else-if="isElementType(item.typeElem, 'select')">
						<Option
							v-for="optionItem in item.children"
							:key="optionItem.key"
							:value="optionItem.key">
							{{optionItem.value}}
						</Option>
						</Select>
						<Cascader :data="item.children" v-model="interfaceForm[item.key]" v-else-if="isElementType(item.typeElem, 'cascader')"></Cascader>
						<Date-picker :type="getElementType(item.typeElem)" v-model="interfaceForm[item.key]" v-else-if="isElementType(item.typeElem, 'datePicker')"></Date-picker>
					</Form-item>
					<Button type="primary" @click="searchInter()">查询</Button>
				</Form>
                <div class="tablebar" style='margin-bottom: 12px;'>
                    <Button type="primary" @click="openTab('addInter')">新建</Button>
                    <Button type="ghost" @click="searchInter()">刷新</Button>
                </div>
				<jqTable ref='jqTableInterface' class='jqTableInterface'></jqTable>
                <Page @on-change="pageInterChange" @on-page-size-change="pageInterSizeChange" :current="interPager.pageIndex" :page-size="interPager.pageSize" :total="interPager.total" :page-size-opts="[10, 15, 20, 30, 40]" placement="top" show-sizer show-elevator show-total></Page>
            </div>
		</div>
		<!-- 弹框 -->
		<Modal
			:title='message'
			v-model='showEditForm'
			:mask-closable='false'>
			<Form ref="formModal" :model="formDataModal" :rules="formDataValidate" :label-width="80" onsubmit="return false" onkeydown="if(event.keyCode==13)return false;">
                <Form-item label="服务名称" prop="ProName">
					<Input v-model="formDataModal.ProName"  style='width: 350px;' placeholder='请输入服务名称'></Input>
				</Form-item>
				<Form-item label="别名" prop="ProNickName">
					<Input v-model="formDataModal.ProNickName"  style='width: 350px;' placeholder='请输入别名'></Input>
				</Form-item>
				<Form-item label="IP" prop="IP">
					<Input v-model="formDataModal.IP"  style='width: 350px;' placeholder='请输入IP地址'></Input>
				</Form-item>
				<Form-item label="超时" prop="TimeOut">
					<Input v-model="formDataModal.TimeOut"  style='width: 330px;' placeholder='请输入超时'></Input><span>&nbsp;&nbsp;毫秒</span>
				</Form-item>
				<Form-item label="请求间隔" prop="RequestInterval">
					<Input v-model="formDataModal.RequestInterval"  style='width: 330px;' placeholder='请输入请求间隔'></Input><span>&nbsp;&nbsp;秒</span>
				</Form-item>
				<Form-item label="异常间隔" prop="ExceptionInterval">
					<Input v-model="formDataModal.ExceptionInterval"  style='width: 330px;' placeholder='请输入异常间隔'></Input><span>&nbsp;&nbsp;秒</span>
				</Form-item>
				<Form-item label="备注" prop="Remark">
					<Input v-model="formDataModal.Remark"  type='textarea' style='width: 350px;' placeholder='请输入备注'></Input>
				</Form-item>
            </Form>
			<div slot="footer">
				<Button type="primary" html-type="submit" @click="handleSubmit('formModal')">提交</Button>
				<Button type="ghost" @click="handleReset('formModal')" style="margin-left: 8px">清空</Button>
			</div>
		</Modal>
		<Modal
			:title='interMessage'
			v-model='showInterTable'
			:mask-closable='false'>
			<Form ref="interfaceForm" :model="interfaceFormData" :rules="formDataInterValidate" :label-width="80" onsubmit="return false" onkeydown="if(event.keyCode==13)return false;">
                <Form-item label="接口名称" prop="InterfaceName">
					<Input v-model="interfaceFormData.InterfaceName"  style='width: 350px;' placeholder='请输入接口名称'></Input>
				</Form-item>
				<Form-item label="接口别名" prop="InterfaceNickName">
					<Input v-model="interfaceFormData.InterfaceNickName"  style='width: 350px;' placeholder='请输入接口别名'></Input>
				</Form-item>
				<Form-item label="接口IP" prop="InterfaceIP">
					<Input v-model="interfaceFormData.InterfaceIP"  style='width: 350px;' placeholder='请输入接口IP地址'></Input>
				</Form-item>
				<Form-item label="超时" prop="TimeOut">
					<Input v-model="interfaceFormData.TimeOut"  style='width: 330px;' placeholder='请输入超时'></Input><span>&nbsp;&nbsp;毫秒</span>
				</Form-item>
				<Form-item label="请求间隔" prop="RequestInterval">
					<Input v-model="interfaceFormData.RequestInterval"  style='width: 330px;' placeholder='请输入请求间隔'></Input><span>&nbsp;&nbsp;秒</span>
				</Form-item>
				<Form-item label="异常间隔" prop="ExceptionInterval">
					<Input v-model="interfaceFormData.ExceptionInterval"  style='width: 330px;' placeholder='请输入异常间隔'></Input><span>&nbsp;&nbsp;秒</span>
				</Form-item>
				<!-- <Form-item label="缓存策略" prop="CachEstrategyID">
					<Select v-model="interfaceFormData.CachEstrategyID" placeholder='请选择缓存策略' clearable>
						<Option v-for="item in KindredCategoryList" :label="item.Name" :value="item.Name" :key="item.Id"></Option>
					</Select>
				</Form-item> -->
				<Form-item label="备注" prop="Remark">
					<Input v-model="interfaceFormData.Remark"  type='textarea' style='width: 350px;' placeholder='请输入备注'></Input>
				</Form-item>
            </Form>
			<div slot="footer">
				<Button type="primary" html-type="submit" @click="handleSubmit('interfaceForm')">提交</Button>
				<Button type="ghost" @click="handleReset('interfaceForm')" style="margin-left: 8px">清空</Button>
			</div>
		</Modal>
    </div>
</template>
<script>

    export default {
        name: 'projectManagement',
        data () {
            return {
				pageClass: '',
				message: '',
				interMessage: '',
				formData: {},
				isConfig: false,
				commonInterProID: {
					ProID: ''
				},
				formDataModal: {
					ID: '',
					ProName: '',
					ProNickName: '',
					IP: '',
					TimeOut: '',
					ExceptionInterval: 0,
					RequestInterval: 0,
					Remark: ''
				},
				interfaceFormData: {
					ID: '',
					ProID: '',
					InterfaceName: '',
					InterfaceNickName: '',
					InterfaceIP: '',
					TimeOut: '',
					ExceptionInterval: 0,
					RequestInterval: 0,
					Remark: '',
					CachEstrategyID: '01',	//传默认值
					CachEstrategy: '120'
				},
                listDataSelected: [],
                list: [],
				cols: [],
                interList: [],
				interCols: [],
				defaultModal: false,
				defaultAddress: {
					id: '',
					defaultType: 0
				},
                pager: {
                    pageIndex: 1,
                    pageSize: 15,
                    total: 0
                },
                interPager: {
                    pageIndex: 1,
                    pageSize: 15,
                    total: 0
                },
                formDataValidate: {
					ProName: [
						{
							required: true, message: '服务名称不可为空', trigger: 'change,blur'
						}
					],
					ProNickName:  [
						{
							required: true, message: '别名不可为空', trigger: 'change,blur'
						}
					],
					IP: [
						{
							required: true, message: 'IP地址不可为空', trigger: 'change,blur'
						}
					]
				},
                formDataInterValidate: {
					InterfaceName: [
						{
							required: true, message: '接口名称不可为空', trigger: 'change,blur'
						}
					],
					InterfaceNickName:  [
						{
							required: true, message: '接口别名不可为空', trigger: 'change,blur'
						}
					],
					InterfaceIP: [
						{
							required: true, message: '接口IP地址不可为空', trigger: 'change,blur'
						}
					]
				},
				searchInterModel: [],
                showEditForm: false,
                showInterTable: false
            }
        },
        methods: {
            isElementType (str, type) {
                return str.split('|')[0] == type;
            },
            getElementType (str) {
                return str.split('|')[1];
            },
            openTab (action, data) {
                switch(action){
					case 'add':
						this.showEditForm = true;
						this.message = '新增服务配置'
                        break
					case 'edit':
					
						break
					case 'addInter':
						this.showInterTable = true
						this.interMessage = '新增接口配置'
						this.interfaceFormData.ProID = data.ID
					break

                }
            },
            pageChange (currentPage) {
                this.search(currentPage);
            },
            pageSizeChange (pageSize) {
                this.pager.pageSize = pageSize;
                this.search();
			},
            pageInterChange (currentPage) {
                this.searchInter(currentPage);
            },
            pageInterSizeChange (pageSize) {
                this.interPager.pageSize = pageSize;
                this.searchInter();
			},
            handleReset (name) {
				this.$refs[name] && this.$refs[name].resetFields()
				if(name == 'interfaceForm'){	//接口配置，不能清空服务Id
					_.each(this.interfaceFormData, (value, key) => {
						if(key != 'ProId'){
							this.interfaceFormData[key] = ''
						}
					})
				}
            },
			handleSubmit(name){
                this.$refs[name].validate(valid => {
                    if (valid) {
                        $.when(this.postForm(name)).done(res => {
							if(res.code == 1001){           
								this.$Message.success('提交成功!');
								if(name == 'interfaceForm'){

									if(!this.interfaceFormData.ID){	//清空
										this.handleReset('interfaceForm');
									}       
									this.showInterTable = false;
									this.getInterList();

								}else if(name == 'formModal'){
									
									if(!this.interfaceFormData.ID){	//清空
										this.handleReset('formModal');
									}       
									this.showEditForm = false;
									this.getList();
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
            postForm (name) {
				let dtd = $.Deferred(),
					url,
					formData = {};
				if(name == 'formModal'){
					formData = _.extend({}, this.formDataModal),
					url = Site.api.projectManagement.create;
					if(this.formDataModal.ID){
						url = Site.api.projectManagement.modify;
					}else{
						delete formData[ID]
					}
                    
				}else if(name == 'interfaceForm'){
					formData = _.extend({}, this.interfaceFormData),
					url = Site.api.interfaceConfig.create;
					if(this.interfaceFormData.ID){
                    	url = Site.api.interfaceConfig.modify;
					}else{
						delete formData[ID]
					}
				}
                _.each(formData, (value, key) => {
                    let val;
                   /* _.each(endModal, item => {
                        if(item.key == key){
                            switch(item.typeElem){
                                case 'iSwitch':
                                    val = Number(value);
                                    break;
                                case 'cascader':
                                    if(value && value[0])
                                        val = value[value.length - 1];
                                    break;
                                case 'regionElem':
                                    if(!value){
                                        formData.ProvinceId = '';
                                        formData.Province = '';
                                        formData.CityId = '';
                                        formData.City = '';
                                        formData.AreaId = '';
                                        formData.Area = '';
                                    }
                                    break;
                            }
                        }
                    });*/
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
			createInterSearchForm(searchModel){
                let formData = {};
                _.each(searchModel, item => {
                    if(item.defaultValue !== undefined){
                        formData[item.key] = item.defaultValue;
                    }else{
                        formData[item.key] = '';
                    }

                    if(this.isElementType(item.typeElem, 'select') && !item.changeCallback){
                        item.changeCallback = () => {};
                    }

                    if(item.childrenApi){
                        Site.get({
                            url: item.childrenApi
                        }).done(res => {
                            let list = [];
                            if(res.data){
                                if(res.data[0]){
                                    list = res.data;
                                }else if(res.data.data_list && res.data.data_list[0]){
                                    list = res.data.data_list;
                                }
                                item.childrenCallback(list);
                            }
                        })
                    }
                });
                this.searchInterModel = searchModel;
                this.interfaceForm = formData; //搜索表单
			},
            createSearchForm (searchModel) {
                let formData = {};
                _.each(searchModel, item => {
                    if(item.defaultValue !== undefined){
                        formData[item.key] = item.defaultValue;
                    }else{
                        formData[item.key] = '';
                    }

                    if(this.isElementType(item.typeElem, 'select') && !item.changeCallback){
                        item.changeCallback = () => {};
                    }

                    if(item.childrenApi){
                        Site.get({
                            url: item.childrenApi
                        }).done(res => {
                            let list = [];
                            if(res.data){
                                if(res.data[0]){
                                    list = res.data;
                                }else if(res.data.data_list && res.data.data_list[0]){
                                    list = res.data.data_list;
                                }
                                item.childrenCallback(list);
                            }
                        })
                    }
                });
                this.searchModel = searchModel;
                this.formData = formData;
			},
			createInterfaceTable(tableModel){
				let that = this;
				let jqTableList = this.$refs.jqTableInterface;
				jqTableList.init({
					type: 'edit',
					data: {
						datatype: 'json',
						localdata: [],
						datafields: [	//这里放的是当前行用来操作/显示的数据
							{name: 'ID', type: 'string'},
							{name: 'InterfaceName', type: 'string'},
							{name: 'InterfaceNickName', type: 'string'},
							{name: 'InterfaceIP', type: 'string'},
							{name: 'TimeOut', type: 'number'},
							{name: 'ExceptionInterval', type: 'number'},
							{name: 'RequestInterval', type: 'number'},
							{name: 'Remark', type: 'string'},
							{name: 'AddDate', type: 'number'},
							{name: 'ProID', type: 'string'},
							{name: 'CachEstrategyID', type: 'string'},
							{name: 'CachEstrategy', type: 'string'}
						]
					},
					cols: tableModel, 
					vm: this,
					custom: {
						selectionmode: 'multiplecellsextended'
					}
				});
			},
			createTable (tableModel) {
				let that = this;
				let jqTableList = this.$refs.jqTable;
				this.$refs.jqTable.init({
					type: 'edit',
					data: {
						datatype: 'json',
						localdata: [],
						datafields: [	//这里放的是当前行用来操作/显示的数据
							{name: 'ID', type: 'string'},
							{name: 'ProName', type: 'string'},
							{name: 'ProNickName', type: 'string'},
							{name: 'IP', type: 'string'},
							{name: 'TimeOut', type: 'number'},
							{name: 'ExceptionInterval', type: 'number'},
							{name: 'RequestInterval', type: 'number'},
							{name: 'Remark', type: 'string'},
							{name: 'AddDate', type: 'number'}
						]
					},
					cols: tableModel, 
					vm: this,
					custom: {
						selectionmode: 'multiplecellsextended'
					}
				});
			},
			searchInter(pageIndex){
				let formData = _.extend({}, this.interfaceForm);
				//要有服务配置的Id
				
                _.each(formData, (value, key) => {
                    if(value === '')
                        delete formData[key];
                    else{
                        let val;
                        _.each(this.searchInterModel, item => {
                            if(item.key == key)
                                if(item.typeElem == 'cascader')
                                    if(value && value[0])
                                        val = value[value.length - 1];
                        });
                        formData[key] = val === undefined ? value : val;
                    }
                });
                this.interPager.pageIndex = pageIndex > 0 ? pageIndex : 1;
                this.getInterList(formData);
			},
            search (pageIndex) {
                let formData = _.extend({}, this.formData);
                _.each(formData, (value, key) => {
                    if(value === '')
                        delete formData[key];
                    else{
                        let val;
                        _.each(this.searchModel, item => {
                            if(item.key == key)
                                if(item.typeElem == 'cascader')
                                    if(value && value[0])
                                        val = value[value.length - 1];
                        });
                        formData[key] = val === undefined ? value : val;
                    }
                });
                this.pager.pageIndex = pageIndex > 0 ? pageIndex : 1;
                this.getList(formData);
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
							this.search();
                            this.$Message.success('删除成功!');
                        }).fail( err => {
                            this.$Message.error('删除失败!');
                        }).always(() => {
                            this.$Modal.remove();
                        });
                    }
                });
            },
            handleDel (data,action) {
				let title = '';
				if(action == 'interDal'){
					title = data.InterfaceName + '接口'
				}else if(action == 'Service'){
					title = data.ProName + '服务'
				}
                this.$Modal.confirm({
                    title: '提示',
                    content: '确定要删除 '+title+' 配置吗?',
                    loading: true,
                    onOk: () => {
                        $.when(this.del(data.ID,action)).done(res => {
                            this.search();
                            this.$Message.success('删除成功!');
							this.showEditForm = false;
                        }).fail( err => {
                            this.$Message.error(err.message || '删除失败!');
                        }).always(() => {
                            this.$Modal.remove();
                        });
                    }
                });
            },
            del (ids,action) {
                let dtd = $.Deferred(),
                    url,
					formData = {ID: ids};
					if(action = 'interDal'){
						url = Site.api.interfaceConfig.delete
					}else if(action = 'Service'){
						url = Site.api.projectManagement.delete
					}
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
            setListDataSelected (selection) {
                this.listDataSelected = selection;
			},
			getInterList(formData){
                let myFormData = formData || {};
				_.extend(myFormData, this.interPager);
				myFormData.ProID = this.commonInterProID.ProID;
                delete myFormData.total;
	
                const loader = this.$Message.loading({
                    content: '正在加载中...',
                    duration: 0
                });
                Site.get({
                    url: Site.api.interfaceConfig.list,
                    data: myFormData
                }).done(res => {
                    loader();
                    let data = res.data,
                        list = [];
                    if(data){
                        if(_.isArray(data.data_list)){
                            list = data.data_list;
                            this.interPager = {
                                pageIndex: data.page,
                                pageSize: data.page_size,
                                total: data.total_count
                            }
                        }else if(_.isArray(data))
                            list = data;
                    }else{
                        list = [];
                        this.interPager.total = 0;
                    }
                    this.interList = list;
                }).fail(err => {
                    loader();
                    this.$Message.error(err.message || '请求失败');
                    this.interList = [];
                    this.interPager.total = 0;
                })
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
                    url: Site.api.projectManagement.list,
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
            getFormData (id) {
                const loader = this.$Message.loading({
                    content: '正在加载中...',
                    duration: 0
                });
                let formData = {
                    Id: id
                };
                this.handleReset('form');
                Site.get({
                    url: Site.api.projectManagement.get,
                    data: formData
                }).done(res => {
                    loader();
                    let data = res.data;
                    _.each(data, (value, key) => {
                        let val;
                        this.formDataModal[key] = val === undefined ? value : val;
                    });
                }).fail(err => {
                    loader();
                })
            },
            getInterFormData (id) {
                const loader = this.$Message.loading({
                    content: '正在加载中...',
                    duration: 0
                });
                let formData = {
                    Id: id
                };
                this.handleReset('interfaceForm');
                Site.get({
                    url: Site.api.interfaceConfig.get,
                    data: formData
                }).done(res => {
                    loader();
                    let data = res.data;
                    _.each(data, (value, key) => {
                        let val;
                        /*_.each(this.dataModel, item => {
                            if(item.key == key)
                                if(item.typeElem == 'iSwitch')
                                    val = !!value;
                            else if(item.typeElem == 'cascader')
                                if(value){
                                    loop(item.children);
                                    function loop(list) {
                                        _.each(list, cate => {
                                            if(cate.value == value)
                                                val = cate.__value ? cate.__value.split(',') : [cate.value];
                                            else
                                                loop(cate.children);
                                        });
                                    }
                                }
                        });*/
                        this.interfaceFormData[key] = val === undefined ? value : val;
                    });
                }).fail(err => {
                    loader();
                })
            }
        },
		watch: {
			list: {
				handler: function(val, oldVal){
					this.$refs.jqTable.updata(val);
				},
				deep: true
			},
			interList: {
				handler: function(val, oldVal){
					this.$refs.jqTableInterface.updata(val);
				},
				deep: true
			}
		},
        created () {
			window.vm = this;
			this.pageClass = page.pageName;
			this.createSearchForm(page.searchModel)
			this.createInterSearchForm(page.searchInterModel)
            // this.getList();
		},
		mounted (){
			this.createTable(page.tableModel);
			this.createInterfaceTable(page.interfaceTableModel);
		}		
    }


const page = {
    pageName: 'projectManagement',
    searchModel: [
        {
            key: 'Name',
            name: '服务名称',
            type: 'string',
            typeElem: 'input|text'
        }
	],
	searchInterModel: [
        {
            key: 'Name',
            name: '接口名称',
            type: 'string',
            typeElem: 'input|text'
        }
	],
    tableModel: [
		{text: '服务名称', datafield: 'ProName', editable: false},
		{text: '别名', datafield: 'ProNickName', editable: false},
		{text: 'IP地址', datafield: 'IP', width: 160, editable: false},
		{text: '接口配置', datafield: '_InterfaceConfig', width: 80, editable: false,
			createRender(vm){
				$('.projectManagement').on('click',`.jqTable button.actionConfig`, function(){
					let index = Number($(this).attr('index'));
					let rowData = vm.$refs.jqTable.getData(index);
					vm.isConfig = true;
					vm.commonInterProID.ProID = rowData.ID;
					vm.getInterList();
				})
				return function (index, fieldName, value, defaultHtml, column, rowData){
					return `<div class='cellContainer'>
							<button type="button" class="ivu-btn ivu-btn-text ivu-btn-small actionConfig" index="${rowData.boundindex}">配置</button>
						</div>`
				}
			}
		},
		{text: '链接', datafield: '_Link', width: 80, editable: false,
			createRender(vm){
				$('.projectManagement').on('click',`.jqTable button.actionLink`, function(){
					let index = Number($(this).attr('index'));
					let rowData = vm.$refs.jqTable.getData(index);
					let linkAddress = 'http://' + rowData.IP;
					window.open(linkAddress); 
				})
				return function (index, fieldName, value, defaultHtml, column, rowData){
					return `<div class='cellContainer'>
							<button type="button" class="ivu-btn ivu-btn-text ivu-btn-small actionLink" index="${rowData.boundindex}">链接</button>
						</div>`
				}
			}
		},
		{text: '操作', datafield: '_action', width: 120,
			editable: false,
			createRender (vm){
				//编辑操作
				$('.projectManagement').on('click',`.jqTable button.actionEdit`, function(){
					let index = Number($(this).attr('index'));
					let rowData = vm.$refs.jqTable.getData(index);
					vm.showEditForm = true;
					vm.getFormData(rowData.ID);
					vm.message = '编辑服务配置'
				})
				//删除操作
				$('.projectManagement').on('click',`.jqTable button.actionDel`, function(){
					let index = Number($(this).attr('index'));
					let rowData = vm.$refs.jqTable.getData(index);
                    vm.handleDel(rowData,'Service');
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
	],
    interfaceTableModel: [
		{text: '接口名称', datafield: 'InterfaceName', editable: false},
		{text: '接口别名', datafield: 'InterfaceNickName', width: 100,editable: false},
		{text: '接口IP地址', datafield: 'InterfaceIP', width: 200, editable: false},
		{text: '操作', datafield: '_action', width: 120,
			editable: false,
			createRender (vm){
				//编辑操作
				$('.projectManagement').on('click',`.jqTableInterface button.actionEdit`, function(){
					let index = Number($(this).attr('index'));
					let rowData = vm.$refs.jqTableInterface.getData(index);
					vm.showInterTable = true;
					vm.getInterFormData(rowData.ID);
					vm.interMessage = '编辑接口配置'
				})
				//删除操作
				$('.projectManagement').on('click',`.jqTableInterface button.actionDel`, function(){
					let index = Number($(this).attr('index'));
					let rowData = vm.$refs.jqTableInterface.getData(index);
                    vm.handleDel(rowData,'interDal');
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

<style lang="scss" scoped>
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

</style>

+