<template>
    <div class="page" :class="pageClass" id="suit">
        <div v-if="!this.isCategorySelected" class='categorySelectControll'>
            <div>
                <Card class="categorySelectList">
                    <p slot="title">选择类别</p>
                    <a v-for="item in categorySelectList" :key="item.Id" @click="handleCateSelect(item)">{{item.label}}</a>
                </Card>
            </div>
            <!--循环创建-->
            <div v-if = 'categorySelectChildListTwo.length>0?true:false'>
                <Card class="categorySelectList">
                    <p slot="title">{{CategoryName}}</p>
                    <a v-for="item in categorySelectChildListTwo" :key="item.Id" @click="handleCateSelect(item)">{{item.label}}</a>
                </Card>
            </div> 
            <div v-if = 'categorySelectChildListThree.length>0?true:false'>
                <Card class="categorySelectList">
                    <p slot="title">{{CategoryNameThree}}</p>
                    <a v-for="item in categorySelectChildListThree" :key="item.Id" @click="handleCateSelect(item)">{{item.label}}</a>
                </Card>
            </div>
            <div v-if = 'categorySelectChildListFour.length>0?true:false'>
                <Card class="categorySelectList">
                    <p slot="title">{{CategoryNameFour}}</p>
                    <a v-for="item in categorySelectChildListFour" :key="item.Id" @click="handleCateSelect(item)">{{item.label}}</a>
                </Card>
            </div>
        </div>

        <Form ref="form" :model="formData" :rules="formDataValidate" :label-width="100" v-else onsubmit="return false">
            <Card class="baseAttr">
                <p slot="title">基本属性</p>
                <div class="itemContent">
                    <div>
                        <Form-item label="套装名称" prop="SuitName">
                            <Input v-model="formData.SuitName"></Input>
                        </Form-item>
                        <Form-item label="产品分类">
                            <Input v-model="formData.CategoryName" disabled></Input>
                        </Form-item>
                        <!-- <Form-item label="套装价" prop="SuitPrice">
                            <Input number v-model="formData.SuitPrice"></Input>
                        </Form-item> -->
                    </div>
                    <div>
                        <Form-item label="套装类别" prop="SuitType">
							<Select v-model="formData.SuitType" clearable>
								<Option
									v-for="optionItem in selectArr"
									:key="optionItem.EnumCode"
									:value="optionItem.EnumCode">
									{{optionItem.EnumDescription}}
								</Option>
							</Select>

                        </Form-item>
                        <!-- <Form-item label="折扣价" prop="DiscountPrice">
                            <Input number v-model="formData.DiscountPrice"></Input>
                        </Form-item> -->
                    </div>
                    <Form-item label="销售授权" class="saleEmpower">
                        <CheckboxGroup v-model="saleEmpower">
                            <Checkbox v-for="item in saleEmpowerOptions" :label="item.Id" :key="item.Id"><span>{{item.ValueName}}</span><Input v-model="saleEmpowerRemark[item.Id]" placeholder="备注"></Input></Checkbox>
                        </CheckboxGroup>
                    </Form-item>
                    <Form-item label="状态" class="status">
                        <Checkbox v-model="formData.IsAllowConsignment">可代销</Checkbox>
                        <Checkbox v-model="formData.IsShelves">可用</Checkbox>
                    </Form-item>
                    <Form-item label="套装文案" class="status">
                        <v-upfile type="2" title="图片" :uploadedFileList="SuitCopyImgList" @upfileSuccess="handleSuitCopyImg" @delfile="handleDelSuitCopyImg"></v-upfile>
                    </Form-item>
                </div>
            </Card>
            <Card class="styleImgs">
                <p slot="title">款式图像</p>
                <v-upfile type="1" :uploadedFileList="upfileMainImg" @upfileSuccess="handleUpfileMainImg" @delfile="handleDelUpfileMainImg"></v-upfile>
                <v-upfile type="3" :uploadedFileList="upfileVideo" @upfileSuccess="handleUpfileVideo" @delfile="handleDelUpfileVideo"></v-upfile>
                <v-upfile type="4" :uploadedFileList="upfile3d" @upfileSuccess="handleUpfile3d" @delfile="handleDelUpfile3d"></v-upfile>
                <v-upfile type="2" :uploadedFileList="upfileImgList" @upfileSuccess="handleUpfileImgs" @delfile="handleDelUpfileImgs"></v-upfile>
            </Card>
            <!-- <Card v-for="item in AttrList" :key="item.Id + ',' + item.GroupName">
                <p slot="title">{{item.GroupName}}</p>
                <div class="itemContent">
                    <Form-item :required="item2.IsMust" :label="item2.DictionaryName" v-for="item2 in item.AttrList"
					 :key="item2.Id" :prop="item.Id + '_' + item2.Id + '_' + item.GroupName + '_' + item2.DictionaryName + '_' + item2.DictionaryId">
					 
                        <template v-if="item2.IsMulti || (!item2.IsMulti && item2.AttrValueList.length == 1)">
                            <CheckboxGroup v-model="styleAttrSelected[item2.Id]" @on-change="getRadio">
                                <Checkbox v-for="item3 in item2.AttrValueList"
								 :label="item.Id + ',' + item2.Id + ',' + item3.Id + ',' + item.GroupName + ',' + item2.DictionaryName + ',' + item3.DictionaryValueName + ',' + item2.DictionaryId + ',' + item3.DictionaryValueId"
								  :key="item3.inputValue"><span>{{item3.DictionaryValueName}}</span>
								  <Input v-if="item3.DictionaryValueName == '手工录入'" v-model="InputValues[item.Id + ',' + item2.Id + ',' + item3.Id]"></Input>
								</Checkbox>
                            </CheckboxGroup>
                        </template>
                        <template v-else>
                            <RadioGroup v-model="styleAttrSelected[item2.Id]" @on-change="getRadio($event)">
                                <Radio v-for="item3 in item2.AttrValueList" :label="item.Id + ',' + item2.Id + ',' + item3.Id + ',' + item.GroupName + ',' + item2.DictionaryName + ',' + item3.DictionaryValueName + ',' + item2.DictionaryId + ',' + item3.DictionaryValueId" :key="item3.inputValue"><span>{{item3.DictionaryValueName}}</span><Input v-if="item3.DictionaryValueName == '手工录入'" v-model="InputValues[item.Id + ',' + item2.Id + ',' + item3.Id]"></Input></Radio>
                            </RadioGroup>
                        </template>
                    </Form-item>
                </div>
            </Card> -->
            <!-- <Card>
                <p slot="title">证书</p>
                <div class="itemContent">
                    <Form-item label="证书">
                        <CheckboxGroup v-model="certificate" @on-change="getCertificatePrice" >
                            <Checkbox v-for="item in certificateOptions" :label="item.Id" :key="item.Id"><span>{{item.ValueName}}</span><Input v-model="certificatePrice[item.Id]" placeholder="价格" disabled></Input></Checkbox>
                        </CheckboxGroup>
                    </Form-item>
                </div>
            </Card> -->
            <!-- <Card>
                <p slot="title">辅石</p>
                <div class="itemContent">
                    <Button type="success" @click="deputyStoneTableAddRow">添加</Button>
                    <Table class="small-table" style="margin-top:1em;width:721px;" border :columns="deputyStoneTableCols" :data="deputyStoneTableList" v-if="deputyStoneTableList.length"></Table>
                </div>
            </Card>
            <Card>
                <p slot="title">配件</p>
                <div class="itemContent">
                    <Button type="success" @click="partsTableAddRow">添加</Button>
                    <Table class="small-table" style="margin-top:1em;width:721px;" border :columns="partsTableCols" :data="partsTableList" v-if="partsTableList.length"></Table>
                </div>
            </Card> -->
            <Card>
                <p slot="title">SKU</p>
                <div class="itemContent">
                    <Button type="success" @click="showSkuModal">选择款式</Button>
					<jqTable ref="jqSkuTable" @onRowSelect="setSkuListDataSelected"></jqTable>
				</div>
            </Card>


			
            <Form-item>
                <Button type="primary" html-type="submit" @click="handleSubmit('form')">提交</Button>
                <Button type="ghost" @click="handleReset('form')" style="margin-left: 8px">清空</Button>
            </Form-item>
        </Form>
        <Modal title="sku属性" 
            v-model="isShowSkuModal" 
            :mask-closable="false"
			width="1000px">
            <Form ref="skuform" :model="skuformData" class="clearfix form-wrapper" :label-width="80" inline onsubmit="return false">
				<Form-item
					v-for="item in searchModel"
					:key="item.key"
					:label="item.name"
					:prop="item.key">
					<!-- style=" display: -webkit-box;display: -webkit-flex; display: -ms-flexbox; display: flex;" -->
					<div  v-if="isElementType(item.typeElem, 'input')">
						<Input v-model="skuformData[item.key]" :type="getElementType(item.typeElem)"  :autosize="true" :style="{'width':item.vlaueKey == 'area'?'56px':'136px'}"></Input>
						<span v-if='item.vlaueKey=="area"'>&nbsp; - &nbsp;</span>
						<Input v-model="skuformData[item.keyEnd]" :type="getElementType(item.typeElem)"  :autosize="true" style="width:56px" v-if='item.vlaueKey=="area"'></Input>
					</div>
					<Select v-model="skuformData[item.key]" clearable @on-change="item.changeCallback($event, item, formData)" v-else-if="isElementType(item.typeElem, 'select')">
					<Option
						v-for="optionItem in item.children"
						:key="optionItem.key"
						:value="optionItem.key">
						{{optionItem.value}}
					</Option>
					</Select>
					<Cascader  :data="item.children" v-model="skuformData[item.key]" v-else-if="isElementType(item.typeElem, 'cascader')"></Cascader>
					<Date-picker :style="{'width':getElementType(item.typeElem)=='daterange'?'185px':'100%'}" :type="getElementType(item.typeElem)" placeholder="选择日期" v-model="formData[item.key]" v-else-if="isElementType(item.typeElem, 'datePicker')"></Date-picker>
				</Form-item>

			</Form>
			<Button type="ghost"  html-type="submit" @click="search()" class='suitTableInstance'>查询</Button>
			<jqTable ref="jqTable" @onRowSelect="setListDataSelected"></jqTable>
			<div slot="footer">
                <Button type="ghost" @click="handleSkuModalCancel">取消</Button>
                <Button type="primary" @click="handleSkuModalok">选择sku列表</Button>
            </div>
        </Modal>
    </div>
</template>

<script>
export default {
  name: "suitEdit",
  props: ["page"],
  data() {
    return {
      pageClass: "",
      dataModel: [],
      inputValueSkuName: "", //sku属性列表(包括名称，净金重，其他费用，其他费用名称)输入值
      inputValueGoldWeight: "",
      inputValueOtherWorkName: "",
      inputValueOtherWorkPrice: "",
      inputValueDiscountPrice: "",
      otherPrice: "",
      selectClaTec: false,
      reqNumber: 0,
      loading: false, //sku表格加载
      allParam: {},
      selectArr: [], //下拉选项
      searchModel: [],
	  list: [],
	  styleList: [],
	  GenderList:[
		  {
			  Id: 1,
			  Name: '男'
		  },{
			  Id: 2,
			  Name: '女'
		  }
	  ],
	  pager:{
        pageIndex: 1,
        pageSize: 15,
        total: 0
      },
      formData: {
        SuitName: null,
        SuitType: null,
        // SuitPrice: null,
        CategoryId: null,
        // DiscountPrice: null, //折扣价
        SuitCopy: null, //文案
        IsAllowConsignment: false, //是否允许代销
        IsShelves: false, //可用状态
        SuitCopy: null,
        ImageList: [], //款式图像 (没接口)
        // StyleDeputyList: [], //辅石,关联deputyStoneTableList
		SkuList: [], //sku列表
		StyleList: [], //套装包含的款式
		AttrList: [], //套装属性
        // CertificateList: [], //证书,关联certificate、certificateOptions、certificatePrice
        // PartList: [], //配件,关联partsTableList
        AuthList: [] //销售授权,关联saleEmpower、saleEmpowerOptions、saleEmpowerRemark
      },
      formDataValidate: {
        SuitName: [{ required: true, message: "套装名称不能为空" }],
        SuitType: [{ required: true, message: "款名不能为空" }],
        // SuitPrice: [
        //     { required: true, message: '套装价不能为空' },
        //     { type: 'number', message: '必须为数字' }
        // ],
        CategoryId: [{ required: true, message: "请选择类别" }]
        // DiscountPrice: [
        //     { required: true, message: '折扣价不能为空' },
        //     { type: 'number', message: '必须为数字' }
        // ]
      },
      listDataSelected: [], //款式列表选择
      skuListDataSelected: [], //sku列表
      tempSaveData: {}, //存储 品类、工艺、产品分类
      CertificateName: "",
      categoryList: [],
      categorySelectList: [],
      categorySelectChildListTwo: [],
      isCategorySelected: false,

      isShowSkuModal: false,

      isCategoryLoaded: false, //选择分类后获取的数据是否加载完成
      categoryLoadedCallback: [], // 分类数据加载完成的回调，某些数据需要根据分类数据显示

      isSkuListLoaded: false,
      skuListLoadedCallback: [],

      skuTableCols: [
        {
          //表格需要一个表头
          title: "表格",
          key: "key"
        }
      ],
      skuTableList: [],
      skuTableRowsData: [],

      skuFormData: {},
      skuFormDataBak: {},
      skuFormDataValidate: {},

      skuAttrList: [],
      skuAttrInputValues: {},
      skuAttrNameSelected: [],
      isSkuModalLoading: true,

      styleAttrSelected: {},
      InputValues: {},

      saleEmpower: [], //选择的销售授权
      saleEmpowerOptions: [], //销售授权选项
      saleEmpowerRemark: {}, //销售授权备注
      certificate: [], //选择的证书
      certificateOptions: [], //证书选项
      certificatePrice: {}, //证书价格
      partsOptions: [], //配件选项
      deputyStoneOptions: [], //副石选项

      //辅石表
      deputyStoneFormData: [],
      deputyStoneTableCols: [
        {
          title: "类型",
          key: "StoneType",
          width: 150,
          render: (h, data) => {
            let that = this,
              value = "",
              value2 =
                data.row[data.column.key] ||
                this.deputyStoneFormData[data.index][data.column.key];
            if (value2 != null) {
              value = value2;
            }

            let options = [];
            _.each(this.deputyStoneOptions, item => {
              options.push(
                h(
                  "Option",
                  {
                    props: {
                      value: item.ValueName
                    }
                  },
                  item.ValueName
                )
              );
            });

            return h(
              "Select",
              {
                props: { value: value, size: "small" },
                on: {
                  "on-change": val => {
                    that.setDeputyStoneTableFormData(val, data);
                    if (val) {
                      if (that.deputyStoneFormData[data.index].StoneWeight) {
                        Site.post({
                          //请求辅石价格
                          url: Site.api.priceHelper.getDeputyStonePrice,
                          data: {
                            list: [
                              {
                                SideStoneName: val,
                                Count: 1,
                                Weight:
                                  that.deputyStoneFormData[data.index]
                                    .StoneWeight
                              }
                            ]
                          }
                        }).done(res => {
                          if (res.data != null) {
                            that.$set(
                              that.deputyStoneTableList[data.index],
                              "StonePrice",
                              Number(res.data).toFixed(2)
                            );
                          }
                          if (res.data == 0) {
                            that.$set(
                              that.deputyStoneTableList[data.index],
                              "StonePrice",
                              "0.00"
                            );
                          }
                        });

                        //判断是否有品类和工艺分级
                        that.selectClass();
                        if (that.selectClaTec) {
                          that.getToatalPrices();
                        }
                      }
                    }
                  }
                }
              },
              options
            );
          }
        },
        {
          title: "数量",
          key: "StoneAmount",
          width: 150,
          render: (h, data) => {
            let that = this,
              value = "",
              value2 =
                data.row[data.column.key] ||
                this.deputyStoneFormData[data.index][data.column.key];
            if (value2 != null) {
              value = value2;
            }
            return h("Input", {
              props: { value: value, size: "small" },
              on: {
                "on-blur"(e) {
                  let val;
                  val = e.target.value;
                  that.setDeputyStoneTableFormData(val, data);
                }
              }
            });
          }
        },
        {
          title: "总重",
          key: "StoneWeight",
          width: 150,
          render: (h, data) => {
            let that = this,
              value = "",
              value2 =
                data.row[data.column.key] ||
                this.deputyStoneFormData[data.index][data.column.key];
            if (value2 != null) {
              value = value2;
            }
            return h("Input", {
              props: { value: value, size: "small" },
              on: {
                "on-blur"(e) {
                  let val;
                  val = e.target.value;
                  that.setDeputyStoneTableFormData(val, data);
                  if (that.deputyStoneFormData[data.index].StoneType) {
                    Site.post({
                      url: Site.api.priceHelper.getDeputyStonePrice,
                      data: {
                        list: [
                          {
                            SideStoneName:
                              that.deputyStoneFormData[data.index].StoneType,
                            Weight: val,
                            Count: 1
                          }
                        ]
                      }
                    }).done(res => {
                      if (res.data != null) {
                        that.$set(
                          that.deputyStoneTableList[data.index],
                          "StonePrice",
                          Number(res.data).toFixed(2)
                        );
                      }
                      if (res.data == 0) {
                        that.$set(
                          that.deputyStoneTableList[data.index],
                          "StonePrice",
                          "0.00"
                        );
                      }
                      that.$set(
                        that.deputyStoneTableList[data.index],
                        "StoneWeight",
                        val
                      );
                    });
                    that.selectClass();
                    if (that.selectClaTec) {
                      that.getToatalPrices();
                    }
                  }
                }
              }
            });
          }
        },
        {
          title: "价格",
          key: "StonePrice",
          width: 150,
          render: (h, data) => {
            let that = this,
              value = "",
              value2 =
                data.row[data.column.key] ||
                this.deputyStoneFormData[data.index][data.column.key];
            if (value2 != null) {
              value = value2;
            }
            return h("Input", {
              props: { value: value, disabled: true, size: "small" },
              on: {
                input(val) {
                  that.setDeputyStoneTableFormData(val, data);
                }
              }
            });
          }
        },
        {
          title: "操作",
          key: "action",
          width: 120,
          render: (h, data) => {
            return h("div", [
              h(
                "Button",
                {
                  props: {
                    type: "text",
                    size: "small"
                  },
                  on: {
                    click: () => {
                      this.deputyStoneTableDelRow(data);
                      if (data.row.StonePrice) {
                        this.getToatalPrices();
                      }
                    }
                  }
                },
                "删除"
              )
            ]);
          }
        }
      ],
      deputyStoneTableList: [],

      //配件表
      partsFormData: [],
      partsTableCols: [
        {
          title: "名称",
          key: "PartName",
          width: 150,
          render: (h, data) => {
            let that = this,
              value = "",
              value2 =
                data.row[data.column.key] ||
                this.partsFormData[data.index][data.column.key];
            if (value2 != null) {
              value = value2;
            }

            let options = [];
            _.each(this.partsOptions, item => {
              options.push(
                h(
                  "Option",
                  {
                    props: {
                      value: item.ValueName
                    }
                  },
                  item.ValueName
                )
              );
            });

            return h(
              "Select",
              {
                props: { value: value, size: "small" },
                on: {
                  "on-change": val => {
                    that.setPartsTableFormData(val, data);
                    if (that.partsFormData[data.index].PartQuantity) {
                      Site.post({
                        url: Site.api.priceHelper.getPartsPricce,
                        data: {
                          list: [
                            {
                              PartName: val,
                              Count: that.partsFormData[data.index].PartQuantity
                            }
                          ]
                        }
                      }).done(res => {
                        if (res.data != null || res.data != undefined) {
                          that.$set(
                            that.partsTableList[data.index],
                            "PartPrice",
                            Number(res.data).toFixed(2)
                          );
                        }
                        if (res.data == 0) {
                          that.$set(
                            that.partsTableList[data.index],
                            "PartPrice",
                            "0.00"
                          );
                        }
                      });
                      that.selectClass();
                      if (that.selectClaTec) {
                        that.getToatalPrices();
                      }
                    }
                  }
                }
              },
              options
            );
          }
        },
        {
          title: "数量",
          key: "PartQuantity",
          width: 150,
          render: (h, data) => {
            let that = this,
              value = "",
              value2 =
                data.row[data.column.key] ||
                this.partsFormData[data.index][data.column.key];
            if (value2 != null) {
              value = value2;
            }
            return h("Input", {
              props: { value: value, size: "small" },
              on: {
                "on-blur"(e) {
                  let val;
                  val = e.target.value;
                  that.setPartsTableFormData(val, data);
                  if (val) {
                    if (that.partsFormData[data.index].PartName) {
                      Site.post({
                        url: Site.api.priceHelper.getPartsPricce,
                        data: {
                          list: [
                            {
                              Count: val,
                              PartName: that.partsFormData[data.index].PartName
                            }
                          ]
                        }
                      }).done(res => {
                        if (res.data != null || res.data != undefined) {
                          that.$set(
                            that.partsTableList[data.index],
                            "PartPrice",
                            Number(res.data).toFixed(2)
                          );
                        }
                        if (res.data == 0) {
                          that.$set(
                            that.partsTableList[data.index],
                            "PartPrice",
                            "0"
                          );
                        }
                        that.$set(
                          that.partsTableList[data.index],
                          "PartQuantity",
                          val
                        );
                      });
                      that.selectClass();
                      if (that.selectClaTec) {
                        that.getToatalPrices();
                      }
                    }
                  }
                }
              }
            });
          }
        },
        {
          title: "重量",
          key: "PartWeight",
          width: 150,
          render: (h, data) => {
            let that = this,
              value = "",
              value2 =
                data.row[data.column.key] ||
                this.partsFormData[data.index][data.column.key];
            if (value2 != null) {
              value = value2;
            }
            return h("Input", {
              props: { value: value, size: "small" },
              on: {
                input(val) {
                  that.setPartsTableFormData(val, data);
                }
              }
            });
          }
        },
        {
          title: "价格",
          key: "PartPrice",
          width: 150,
          render: (h, data) => {
            let that = this,
              value = "",
              value2 =
                data.row[data.column.key] ||
                this.partsFormData[data.index][data.column.key];
            if (value2 != null) {
              value = value2;
            }
            return h("Input", {
              props: { value: value, disabled: true, size: "small" },
              on: {
                input(val) {
                  that.setPartsTableFormData(val, data);
                }
              }
            });
          }
        },
        {
          title: "操作",
          key: "action",
          width: 120,
          render: (h, data) => {
            return h("div", [
              h(
                "Button",
                {
                  props: {
                    type: "text",
                    size: "small"
                  },
                  on: {
                    click: () => {
                      this.partsTableDelRow(data);
                      if (data.row.PartPrice) {
                        this.getToatalPrices();
                      }
                    }
                  }
                },
                "删除"
              )
            ]);
          }
        }
      ],
      partsTableList: [],
      categorySelectChildListThree: [],
      categorySelectChildListFour: [],
      CategoryName: "",
      CategoryNameThree: "",
      CategoryNameFour: "",
      skuformData: {},

      upfileMainImg: {
        ImageCode: "",
        IsMain: 1,
        ImageType: 1
      },
      upfileImgList: [],
      upfileVideo: {
        ImageCode: "",
        IsMain: 0,
        ImageType: 2
      },
      upfile3d: {
        ImageCode: "",
        IsMain: 0,
        ImageType: 3
      },
      SuitCopyImgList: []
    };
  },
  methods: {
    handleUpfileMainImg(file) {
      this.upfileMainImg.ImageCode = file.Id;
    },
    handleDelUpfileMainImg(item) {
      this.upfileMainImg.ImageCode = "";
    },
    handleUpfileImgs(file) {
      this.upfileImgList.push({
        ImageCode: file.Id,
        IsMain: 0,
        ImageType: 1
      });
    },
    handleDelUpfileImgs(item) {
      this.upfileImgList.splice(_.indexOf(this.upfileImgList, item), 1);
    },
    handleUpfileVideo(file) {
      this.upfileVideo.ImageCode = file.Id;
    },
    handleDelUpfileVideo(item) {
      this.upfileVideo.ImageCode = "";
    },
    handleUpfile3d(file) {
      this.upfile3d.ImageCode = file.Id;
    },
    handleDelUpfile3d(item) {
      this.upfile3d.ImageCode = "";
    },

    handleSuitCopyImg(file) {
      this.SuitCopyImgList.push({
        ImageCode: file.Id,
        IsMain: 0,
        ImageType: 1
      });
    },
    handleDelSuitCopyImg(item) {
      this.SuitCopyImgList.splice(_.indexOf(this.SuitCopyImgList, item), 1);
    },

    isElementType(str, type) {
      return str.split("|")[0] == type;
    },
    getElementType(str) {
      return str.split("|")[1];
    },
    handleReset(name) {
      if (this.$refs[name]) {
        this.$refs[name].resetFields();
      }
      this.formData.IsAllowConsignment = false;
      this.formData.IsShelves = false;

      this.saleEmpower = [];
      this.saleEmpowerRemark = {};
      this.certificate = [];
      this.certificatePrice = {};
      this.deputyStoneTableList = [];
      this.deputyStoneFormData = [];
      this.partsTableList = [];
      this.partsFormData = [];

      //清空上传
      this.upfileMainImg.ImageCode = "";
      this.upfileImgList = [];
      this.upfileVideo.ImageCode = "";
      this.upfile3d.ImageCode = "";

      this.styleAttrSelected = {}; //已经选择的款式属性
      this.InputValues = {}; //款式属性手工录入

      this.skuAttrInputValues = {}; //sku弹出框选项手工录入
      //清空套装文案数据
      this.SuitCopyImgList = [];
      //清空sku表格数据
      let skuTableCols = this.createSkuTableCols();
      this.skuTableList = [];
      this.skuTableCols = [];
      this.skuFormData = {}; //清除sku弹窗的已选项
      // _.each(this.skuTableList, item => {
      //     _.each(item, (value, key) => {
      //         _.each(skuTableCols, item2 => {
      //             if(item2.key == key){
      //                 item[key] = null;
      //             }
      //         });
      //         this.$set(item, '_update', Date());//用于触发表格更新
      //     })
      // });
    },
    handleSubmit(name) {
      this.$refs[name].validate(valid => {
        if (valid) {
          $.when(this.postForm()).done(res => {
              if (!this.$route.params.id){
				//   this.handleReset("form");
			  } 
            //   this.$Message.success("提交成功!");
            }).fail(err => {
              this.$Message.error(err.message || "提交失败!");
            });
        } else {
          this.$Message.error("表单验证失败!");
        }
      });
    },

    createTable(tableModel) {
      this.$refs.jqTable.init({
        type: "list",
        data: this.list,
        cols: tableModel,
        vm: this
      });
    },
    search(pageIndex) {
      let skuformData = _.extend({}, this.skuformData);
      _.each(skuformData, (value, key) => {
        if (value === "") delete skuformData[key];
        else {
          let val;
          _.each(this.searchModel, item => {
            if (item.key == key) {
              if (item.typeElem == "cascader") {
                if (value && value[0]) {
                  val = value[value.length - 1];
                }
              } else if (item.typeElem == "datePicker") {
                val = this.formatDate(value, "yyyy-MM-dd");
              } else if (item.typeElem == "datePicker|daterange") {
                if (value && value.length == 2) {
                  skuformData["startDate"] =
                    value[0] && this.formatDate(value[0], "yyyy-MM-dd");
                  skuformData["endDate"] =
                    value[1] && this.formatDate(value[1], "yyyy-MM-dd");
                }
              }
            }
          });
          skuformData[key] = val === undefined ? value : val;
        }
      });
      delete skuformData.makeOrderTime;
      if (!skuformData.startDate) {
        delete skuformData.startDate;
      }
      if (!skuformData.endDate) {
        delete skuformData.endDate;
      }
      this.pager.pageIndex = pageIndex > 0 ? pageIndex : 1;
      // this.pager.pageIndex = 1;
      this.getList(skuformData);
      // formData 是查询所有值不为空时的变量的值
    },
    getList(formData) {
      let myskuFormData = formData || {};
      _.extend(myskuFormData, this.pager);
      delete myskuFormData.total;
      this.list = [];
      const loader = this.$Message.loading({
        content: "正在加载中...",
        duration: 0
      });
      Site.get({
        url: Site.api.styleCenter.list,
        data: myskuFormData
      })
        .done(res => {
          loader();
          let data = res.data,
            list = [];
          if (data) {
            if (_.isArray(data.data_list)) {
              list = data.data_list;
              this.pager = {
                pageIndex: data.page,
                pageSize: data.page_size,
                total: data.total_count
              };
            }else if (_.isArray(data)) {
				list = data;
			}
          }else {
            list = [];
            this.pager.total = 0;
          }
		  this.list = list;
		//   console.log(this.list);
			if(this.formData.SuitType && this.formData.SuitType == 2){	//情侣款添加选男女款

			}else if(this.formData.SuitType && this.formData.SuitType != 2){	//非情侣款，没有男女款选项
				// $('.jqTable').jqxGrid('hidecolumn', 'Gender');
			}else{
				this.$message.error('请选择套装类别!');
				return 
			}
          this.createTable(page.tableModel);
        })
        .fail(err => {
          loader();
          this.$Message.error(err.message || "请求失败");
          this.list = [];
          this.pager.total = 0;
        });
    },
    createSearchForm(searchModel) {
      let skuformData = {};
      _.each(searchModel, item => {
        if (item.defaultValue !== undefined) {
          skuformData[item.key] = item.defaultValue;
        } else {
          skuformData[item.key] = "";
        }
        if (
          this.isElementType(item.typeElem, "select") &&
          !item.changeCallback
        ) {
          item.changeCallback = () => {};
        }

        if (item.childrenApi && item.key != "rabbetSize") {
          Site.get({
            url: item.childrenApi
          }).done(res => {
            let list = [];
            if (res.data) {
              if (res.data[0]) {
                list = res.data;
              } else if (res.data.data_list && res.data.data_list[0]) {
                list = res.data.data_list;
              }
              item.childrenCallback(list);
            }
          });
        }
      });
      this.searchModel = searchModel;
      this.skuformData = skuformData;
    },
    getCertificatePrice(val) {
      //获取证书价格
      let CertificateName,
        that = this;
      _.each(val, id => {
        _.each(this.certificateOptions, item => {
          if (id == item.Id) {
            certificatePricce(id, item.ValueName);
          }
        });
      });
      _.each(that.certificatePrice, (value, key) => {
        //去掉反选时候的输入框的价格
        let length = 0;
        _.each(val, item => {
          if (item != key) {
            length++;
          }
        });
        if (length == val.length) {
          that.certificatePrice[key] = "";
        }
      });
      function certificatePricce(id, CertificateName) {
        const loader = that.$Message.loading({
          content: "正在加载中...",
          duration: 0
        });
        Site.post({
          url: Site.api.priceHelper.getCertificatePricce,
          data: {
            CertificateName: CertificateName
          }
        })
          .done(res => {
            loader();
            if (res.data != null || res.data != undefined) {
              that.$set(that.certificatePrice, id, Number(res.data).toFixed(2));
            }
          })
          .fail(err => {
            loader();
            that.$Message.error("获取证书价格失败");
          });
      }
    },
    allParams() {
      let that = this;
      let obj = {};
      let conditionArr = [];
      _.each(that.skuTableList, item => {
        //获取成色 和 镶口大小
        let obj = {};
        _.each(item._rowAttrs, item1 => {
          if (item1.DictionaryName == "成色") {
            obj.Condition = item1.DictionaryValueName;
            obj.ConditionId = item1.AttrId;
          }
          if (item1.DictionaryName == "镶口大小") {
            obj.StoneSize = item1.DictionaryValueName;
            obj.StoneSizeId = item1.AttrId;
          }
        });
        obj.GoldWeight = item.GoldWeight;
        conditionArr.push(obj);
      });

      //获取品类和工艺分级
      let CateName, Technology;
      _.each(that.styleAttrSelected, (value, key) => {
        if (!_.isArray(value) && value) {
          let valueId = value.split(",");
          _.each(that.AttrList, item => {
            if (item.Id == valueId[0]) {
              _.each(item.AttrList, item1 => {
                if (item1.Id == valueId[1]) {
                  if (item1.DictionaryName == "品类") {
                    _.each(item1.AttrValueList, item2 => {
                      if (item2.Id == valueId[2]) {
                        CateName = item2.DictionaryValueName;
                      }
                    });
                  }
                  if (item1.DictionaryName == "工艺分级") {
                    _.each(item1.AttrValueList, item2 => {
                      if (item2.Id == valueId[2]) {
                        Technology = item2.DictionaryValueName;
                      }
                    });
                  }
                }
              });
            }
          });
        }
      });

      //特殊工艺
      let Specials = [];
      _.each(that.styleAttrSelected, (value, key) => {
        //特殊工艺
        _.each(that.AttrList, item => {
          if (item.GroupName == "基础属性") {
            _.each(item.AttrList, item1 => {
              if (key == item1.Id && item1.DictionaryName == "特殊工艺") {
                _.each(value, value1 => {
                  let arr = value1.split(",");
                  _.each(item1.AttrValueList, item2 => {
                    if (arr[2] == item2.Id) {
                      Specials.push(item2.DictionaryValueName);
                    }
                  });
                });
              }
            });
          }
        });
      });
      //配件
      _.each(that.partsFormData, item => {
        //设置count count 数量
        if (item.count == null) {
          that.$set(item, "Count", item.PartQuantity);
        } else {
          item.Count = item.PartQuantity;
        }
      });
      //辅石
      _.each(that.deputyStoneFormData, item => {
        //辅石默认数量为1
        item.Count = 1;
        item.SideStoneName = item.StoneType;
        item.Weight = item.StoneWeight;
      });
      obj.conditionArr = conditionArr;
      obj.CateName = CateName;
      obj.Technology = Technology;
      obj.Specials = Specials;
      this.allParam = obj;
    },
    selectClass() {
      //获取品类和工艺分级
      let CateName,
        Technology,
        that = this;
      _.each(that.styleAttrSelected, (value, key) => {
        if (!_.isArray(value) && value) {
          let valueId = value.split(",");
          _.each(that.AttrList, item => {
            if (item.Id == valueId[0]) {
              _.each(item.AttrList, item1 => {
                if (item1.Id == valueId[1]) {
                  if (item1.DictionaryName == "品类") {
                    _.each(item1.AttrValueList, item2 => {
                      if (item2.Id == valueId[2]) {
                        CateName = item2.DictionaryValueName;
                      }
                    });
                  }
                  if (item1.DictionaryName == "工艺分级") {
                    _.each(item1.AttrValueList, item2 => {
                      if (item2.Id == valueId[2]) {
                        Technology = item2.DictionaryValueName;
                      }
                    });
                  }
                }
              });
            }
          });
        }
      });
      if (CateName && Technology) {
        this.selectClaTec = true;
      } else {
        this.selectClaTec = false;
      }
    },
    getToatalPrices() {
      let that = this;
      that.allParams();
      that.loading = true;
      //计算总价
      let loopNum = 5;
      let len = that.skuTableList.length;
      let con, stoneId, conId, GoldWeight;
      for (let index = loopNum - 5; index < loopNum; index++) {
        if (index == that.skuTableList.length) {
          that.loading = false;
          return false;
        }
        (con = that.allParam.conditionArr[index]["Condition"]),
          (stoneId = that.allParam.conditionArr[index]["StoneSize"]),
          (conId = that.allParam.conditionArr[index]["ConditionId"]);
        GoldWeight = that.allParam.conditionArr[index]["GoldWeight"];
        $.when(that.requestTotalPrice(con, stoneId, conId, GoldWeight))
          .done(res => {
            if (res == 5) {
              loop();
            } else {
              that.loading = false;
            }
          })
          .fail(err => {
            if (err == 5) {
              loop();
            } else {
              that.loading = false;
            }
          });
      }
      function loop() {
        that.reqNumber = 0;
        let relNum = 0;
        if (loopNum + 5 > len) {
          relNum = loopNum + 5 - len;
          loopNum = len;
        } else {
          loopNum = loopNum + 5;
        }
        for (let index = loopNum - 5 + relNum; index < loopNum; index++) {
          $.when(
            that.requestTotalPrice(
              that.allParam.conditionArr[index]["Condition"],
              that.allParam.conditionArr[index]["StoneSize"],
              that.allParam.conditionArr[index]["ConditionId"],
              that.allParam.conditionArr[index]["GoldWeight"]
            )
          )
            .done(res => {
              if (res == 5) {
                //这里需要吧异步函数变为同步函数
                loop();
              } else {
                that.loading = false; //表格加载的效果
              }
            })
            .fail(err => {
              if (err == 5) {
                loop();
              } else {
                that.loading = false;
              }
            });
        }
      }
    },
    getRadio(val) {
      let radioArr = [];
      if (!_.isArray(val) && val) {
        radioArr = val.split(",");
      }
      if (_.isArray(val) && val.length) {
        _.each(val, item => {
          radioArr = item.split(",");
        });
      }
      _.each(this.AttrList, item => {
        if (item.Id == radioArr[0]) {
          _.each(item.AttrList, item1 => {
            if (item1.Id == radioArr[1]) {
              if (
                item1.DictionaryName == "品类" ||
                item1.DictionaryName == "工艺分级" ||
                item1.DictionaryName == "特殊工艺"
              ) {
                this.loading = true;
                this.getToatalPrices();
              }
            }
          });
        }
      });
    },
    requestTotalPrice(Condition, StoneSize, ConditionId, GoldWeight) {
      //获取总价 四个参数分别代表 成色 镶口大小 成色Id 净金重 其中成色id是用来区分哪一行请求数据的
      let Specials = [];
      let tempArr;
      let dtd = $.Deferred();
      let that = this;
      _.each(that.styleAttrSelected, (value, key) => {
        //特殊工艺
        _.each(that.AttrList, item => {
          if (item.GroupName == "基础属性") {
            _.each(item.AttrList, item1 => {
              if (key == item1.Id && item1.DictionaryName == "特殊工艺") {
                _.each(value, value1 => {
                  let arr = value1.split(",");
                  _.each(item1.AttrValueList, item2 => {
                    if (arr[2] == item2.Id) {
                      Specials.push(item2.DictionaryValueName);
                    }
                  });
                });
              }
            });
          }
        });
      });
      _.each(that.partsFormData, item => {
        //设置配件 count count 数量
        if (item.count == null) {
          that.$set(item, "Count", item.PartQuantity);
        } else {
          item.Count = item.PartQuantity;
        }
      });
      _.each(that.deputyStoneFormData, item => {
        //辅石默认数量为1
        item.Count = 1;
        item.SideStoneName = item.StoneType;
        item.Weight = item.StoneWeight;
      });
      let url2 = Site.api.priceHelper.returnPrice;
      let formData2 = {
        goldPrice: {
          Count: 1,
          GoldWeight: GoldWeight,
          Condition: Condition,
          Technology: that.allParam.Technology,
          CateName: that.allParam.CateName,
          CategoryID: that.formData.CategoryId
        },
        Parts: that.partsFormData,
        // certificatePrice: {//款式里面不需要证书价格
        //     CertificateName: that.CertificateName
        // },
        SideStones: that.deputyStoneFormData,
        workPrice: {
          Condition: Condition,
          Technology: that.allParam.Technology,
          CateName: that.allParam.CateName,
          CategoryID: that.formData.CategoryId,
          GoldWeight: GoldWeight,
          Count: 1,
          IsEmptyPallet: true,
          StoneSize: StoneSize,
          Specials: Specials,
          SideStone: that.deputyStoneFormData
        }
      };
      Site.post({
        url: url2,
        data: formData2
      })
        .done(res => {
          // loader();
          this.reqNumber++; //无论成功与否都要加一
          let data2 = res.data;
          _.each(that.skuTableList, (item, index) => {
            if (item[ConditionId] == Condition) {
              that.$set(
                item,
                "GoldPrice",
                data2.GoldPrice === 0 ? "0" : data2.GoldPrice.toFixed(2)
              );
              that.$set(
                item,
                "WorkPrice",
                data2.WorkFee === 0 ? "0" : data2.WorkFee.toFixed(2)
              );
              that.$set(
                item,
                "TotalPrice",
                data2.TotalPrice === 0
                  ? "0"
                  : (Number(data2.TotalPrice) +
                      Number(
                        item.OtherWorkPrice == undefined
                          ? 0
                          : item.OtherWorkPrice
                      )
                    ).toFixed(2)
              );
              that.$set(
                item,
                "Loss",
                data2.Loss === 0 ? "0" : data2.Loss.toFixed(2)
              );
            }
          });
          dtd.resolve(this.reqNumber);
        })
        .fail(err => {
          reqNumber++;
          that.$Message.error(err.message || "请求失败");
          dtd.reject(this.reqNumber);
        });
      return dtd;
    },
    createForm(dataModel) {
      let formData = {},
        formDataValidate = {};
      _.each(dataModel, item => {
        //验证规则
        let rules = {};
        if (item.rule) {
          _.each(item.rule, (value, key) => {
            if (key == "required" && value) {
              rules.required = true;
              if (!item.rule.message) {
                if (
                  this.isElementType(item.typeElem, "input") ||
                  this.isElementType(item.typeElem, "textarea") ||
                  this.isElementType(item.typeElem, "datePicker")
                ) {
                  rules.message = item.name + "不能为空";
                } else if (
                  this.isElementType(item.typeElem, "select") ||
                  this.isElementType(item.typeElem, "checkbox") ||
                  this.isElementType(item.typeElem, "regionElem") ||
                  this.isElementType(item.typeElem, "radio") ||
                  this.isElementType(item.typeElem, "iSwitch") ||
                  this.isElementType(item.typeElem, "cascader")
                ) {
                  rules.message = "请选择" + item.name;
                }
              }
            }
          });
        } else {
          //表单项没有配置验证规则时，设置默认验证
          if (this.isElementType(item.typeElem, "iSwitch")) {
            rules.required = true;
            rules.message = "请选择" + item.name;
          }
        }
        formDataValidate[item.key] = [rules];

        //设置默认值
        if (item.defaultValue !== undefined) {
          formData[item.key] = item.defaultValue;
        } else {
          formData[item.key] = "";
        }

        //不同表单项个性设置
        if (
          this.isElementType(item.typeElem, "select") &&
          !item.changeCallback
        ) {
          item.changeCallback = () => {};
        }

        //表单项数据请求
        if (item.childrenApi) {
          Site.get({
            url: item.childrenApi
          }).done(res => {
            let list = [];
            if (res.data) {
              if (res.data[0]) {
                list = res.data;
              } else if (res.data.data_list && res.data.data_list[0]) {
                list = res.data.data_list;
              }
              item.childrenCallback(list);
            }
          });
        }
      });
      this.dataModel = dataModel;
      this.formData = formData;
      this.formDataValidate = formDataValidate;
    },
    postForm() {
      let dtd = $.Deferred(),
        formData = _.extend({}, this.formData),
        url = Site.api.suit.create;
      if (this.$route.params.id) url = Site.api.styleCenter.modify;
      /*
                //提交之前对数据处理
                //营销平台
                if(formData.MarketingStatistics.MarketingPlat){
                    formData.MarketingStatistics.MarketingPlat = Number(formData.MarketingStatistics.MarketingPlat);
                }*/

      //套装文案
      formData.SuitCopy = this.SuitCopyImgList.filter(item => {
        return item.ImageCode != "";
      });
      formData.SuitCopy = formData.SuitCopy.map(item => {
        return item.ImageCode;
      });
      formData.SuitCopy = formData.SuitCopy.join(",");

      //上传图像
      let imgList = [];
      if (this.upfileImgList.length) {
        [].push.apply(imgList, this.upfileImgList);
      }
      if (this.upfileMainImg.ImageCode) {
        imgList.push(this.upfileMainImg);
      }
      if (this.upfileVideo.ImageCode) {
        imgList.push(this.upfileVideo);
      }
      if (this.upfile3d.ImageCode) {
        imgList.push(this.upfile3d);
      }
      if (imgList.length) {
        formData.ImageList = imgList;
      }

      /*//款式属性
      _.each(this.styleAttrSelected, (value, key) => {
        if (_.isArray(value) && value.length) {
          _.each(value, item => {
            let arr = item.split(","),
              obj = {
                AttrGroupId: arr[0],
                AttrId: arr[1],
                AttrValueId: arr[2],
                AttrGroupName: arr[3],
                AttrName: arr[4],
                AttrValue: arr[5],
                DictionaryId: arr[6],
                DictionaryValueId: arr[7],
                InputValue: this.InputValues[item] || ""
              };
            // formData.AttrList.push(obj);
          });
        } else if (_.isString(value) && value.split(",").length) {
          let arr = value.split(","),
            obj = {
              AttrGroupId: arr[0],
              AttrId: arr[1],
              AttrValueId: arr[2],
              AttrGroupName: arr[3],
              AttrName: arr[4],
              AttrValue: arr[5],
              DictionaryId: arr[6],
              DictionaryValueId: arr[7],
              InputValue: this.InputValues[value] || ""
            };
          //   formData.AttrList.push(obj);
        }
	  });
	  */

       //套装SKU
      if(this.skuListDataSelected && !this.skuListDataSelected.length){
		  this.$Message.error('至少选择一项款式!');
		  return false
	  }else{
		  let skuList = [],
			  skuItem = {},
			  skuAttr = {};
		  if(this.skuListDataSelected && this.skuListDataSelected.length>0){
			  _.each(this.skuListDataSelected, item =>{
				  _.each(item, (value, key) =>{
					  if(key == 'GoldPrice' || key == 'WorkPrice' || key == 'MainStonePrice' || key == 'DeputyStonePrice' || key == 'PartPrice' ||
					  	 key == 'CertificatePrice' || key == 'OtherWorkPrice' || key == 'OtherWorkName' || key == 'TotalPrice' || key == 'MouthPrice'){
							   skuItem[key] = value;
					  }
				  })
				skuItem.SkuName = item.SkuName;	 //手动填写
				skuItem.Loss = item.Loss;
				skuItem.GoldWeight = item.GoldWeight;
				skuItem.SkuAttrList = [];
				skuAttr.AttrGroupId = item.StyleAttrGroupId;
				skuAttr.AttrGroupName = item.StyleAttrGroupName;
				skuAttr.AttrId = item.StyleAttrId;
				skuAttr.AttrName = item.StyleAttrName;
				skuAttr.AttrValueId = item.StyleAttrValueId;
				skuAttr.AttrValue = item.StyleAttrValueName;
				skuAttr.InputValue = item.StyleAttrInputValue;
				skuAttr.DictionaryId = item.DictionaryId;	//字典
				skuAttr.DictionaryValueId = item.StyleAttrValueId; //字典值
				skuItem.SkuAttrList.push(skuAttr);
				skuList.push(skuItem);
			  })
		  }
		  formData.SkuList = skuList; 		//套装SKU
		  formData.AttrList = skuItem.SkuAttrList; //套装属性
		  formData.StyleList = this.styleList;	//款式信息
	  }
      //销售授权
      let AuthList = [];
      _.each(this.saleEmpower, id => {
        let obj = {
          PlatId: id,
          PlatName: "",
          Remark: this.saleEmpowerRemark[id] || ""
        };
        let flag = false;
        _.each(this.saleEmpowerOptions, item => {
          if (item.Id == id) {
            obj.PlatName = item.ValueName;
            flag = true;
            return false;
          }
        });
        if (flag) {
          AuthList.push(obj);
        }
      });
      formData.AuthList = AuthList;
	/*
      //证书
      //   let certificateList = [];
      //   _.each(this.certificate, id => {
      //     let obj = {
      //       CerticifateTypeId: id,
      //       CerticifateTypeName: "",
      //       Price: this.certificatePrice[id] || 0
      //     };
      //     let flag = false;
      //     _.each(this.certificateOptions, item => {
      //       if (item.Id == id) {
      //         obj.CerticifateTypeName = item.ValueName;
      //         flag = true;
      //         return false;
      //       }
      //     });
      //     if (flag) {
      //       certificateList.push(obj);
      //     }
      //   });
      //   formData.CertificateList = certificateList;

      //辅石
      //   let deputyStone = [];
      //   _.each(this.deputyStoneFormData, (item, index) => {
      //     let obj = {};
      //     _.each(item, (value, key) => {
      //       obj[key] = value;
      //       obj.StonePrice = this.deputyStoneTableList[index].StonePrice;
      //     });
      //     deputyStone.push(obj);
      //   });
      //   formData.StyleDeputyList = deputyStone;

      //配件
      //   let parts = [];
      //   _.each(this.partsFormData, (item, index) => {
      //     let obj = {};
      //     _.each(item, (value, key) => {
      //       obj[key] = value;
      //       obj.PartPrice = this.partsTableList[index].PartPrice;
      //     });
      //     parts.push(obj);
      //   });
      //   formData.PartList = parts;
		*/
		delete formData['makeOrderTime'];
      const loader = this.$Message.loading({
        content: "正在加载中...",
        duration: 0
	  });
	//   console.log(formData);
      Site.post({
        url: url,
        data: formData
      })
        .done(res => {
          loader();
          dtd.resolve(res);
        })
        .fail(err => {
          loader();
          dtd.reject(err);
        });
      return dtd;
    },
    getFormData(id) {
      let formData = {
        styleId: id
      };
      let that = this;
      this.handleReset("form");

      const loader = this.$Message.loading({
        content: "正在加载中...",
        duration: 0
      });
      Site.get({
        url: Site.api.styleCenter.get,
        data: formData
      })
        .done(res => {
          loader();
          let data = res.data;
          _.each(data, (value, key) => {
            if (value !== null) {
              if (key == "AttrList") {
                setStyleAttr(value);
              } else if (key == "SkuList") {
                setSku(value);
              } else if (key == "CategoryList") {
                let name = "";
                _.each(value, item => {
                  if (name) {
                    name += "/" + item.CategoryName;
                  } else {
                    name = item.CategoryName;
                  }
                });
                this.formData.CategoryId = value[value.length - 1].Id;
                this.formData.CategoryName = name;
              } else if (key == "AuthList") {
                //销售授权
                setAuthList(value);
              } else if (key == "CertificateList") {
                //证书
                setCertificateList(value);
              } else if (key == "StyleDeputyList") {
                //辅石
                setStyleDeputyList(value);
              } else if (key == "PartList") {
                //配件
                setPartList(value);
              } else if (key == "ImageList") {
                //上传图像
                setImgList(value);
              } else if (key == "SuitCopy") {
                //套装文案
                if (value) {
                  let list = value.split(",");
                  list.forEach((item, index) => {
                    this.SuitCopyImgList.push({
                      ImageCode: item,
                      IsMain: 0,
                      ImageType: 1
                    });
                  });
                }
              } else {
                this.formData[key] = value;
              }
            }
          });

          if (!data.Id && this.$route.params.id) {
            this.formData.Id = this.$route.params.id;
          }
          if (this.formData.CategoryId) {
            // this.getProductCategoryTree();
            this.getSkuList();
          }
        })
        .fail(err => {
          loader();
        });

      function setImgList(list) {
        that.upfileImgList = [];
        _.each(list, item => {
          if (item.ImageType == 1) {
            //图片
            if (item.IsMain) {
              that.upfileMainImg.ImageCode = item.ImageCode;
            } else {
              that.upfileImgList.push({
                ImageCode: item.ImageCode,
                IsMain: 0,
                ImageType: 1
              });
            }
          } else if (item.ImageType == 2) {
            //视频
            that.upfileVideo.ImageCode = item.ImageCode;
          } else if (item.ImageType == 3) {
            //3d
            that.upfile3d.ImageCode = item.ImageCode;
          }
        });
      }
      function setStyleAttr(list) {
        let values = {};
        _.each(list, item => {
          if (that.styleAttrSelected[item.AttrId] == undefined) {
            that.$set(
              that.styleAttrSelected,
              item.AttrId,
              item.AttrGroupId + "," + item.AttrId + "," + item.AttrValueId
            );
          } else if (_.isArray(that.styleAttrSelected[item.AttrId])) {
            that.styleAttrSelected[item.AttrId].push(
              item.AttrGroupId + "," + item.AttrId + "," + item.AttrValueId
            );
          } else {
            let val = that.styleAttrSelected[item.AttrId];
            if (val == "") {
              that.styleAttrSelected[item.AttrId] =
                item.AttrGroupId + "," + item.AttrId + "," + item.AttrValueId;
            } else {
              that.styleAttrSelected[item.AttrId] = [];
              that.styleAttrSelected[item.AttrId].push(val);
              that.styleAttrSelected[item.AttrId].push(
                item.AttrGroupId + "," + item.AttrId + "," + item.AttrValueId
              );
            }
          }

          if (item.InputValue != null) {
            values[
              item.AttrGroupId + "," + item.AttrId + "," + item.AttrValueId
            ] =
              item.InputValue;
          }
        });
        that.InputValues = values;
      }
      function setSku(list) {
        //sku表格数据回拼, 没有采用添加时的生成方式
        if (that.isCategoryLoaded) {
          getSkuList();
        } else {
          that.categoryLoadedCallback.push(getSkuList);
        }

        function getSkuList() {
          if (that.isSkuListLoaded) {
            createSkuTable(); //确定款式分类和sku列表都加载之后才创建表格
          } else {
            that.skuListLoadedCallback.push(createSkuTable);
          }
        }

        function createSkuTable() {
          const skuCols = that.createSkuTableCols();
          let selecteds = {},
            inputValues = {},
            attrNameList = [],
            tableColList = [],
            tableRowList = [];

          _.each(list, item => {
            //设置弹出框选择的sku属性
            _.each(item.SkuAttrList, item2 => {
              if (selecteds[item2.AttrId]) {
                if (_.indexOf(selecteds[item2.AttrId], item2.AttrValueId) < 0) {
                  selecteds[item2.AttrId].push(item2.AttrValueId);
                }
              } else {
                selecteds[item2.AttrId] = [item2.AttrValueId];
              }
              if (item2.InputValue != null) {
                inputValues[item2.AttrId + "," + item2.AttrValueId] =
                  item2.InputValue;
              }
            });

            //sku表格数据
            let row = {};
            _.each(item, (value, key) => {
              if (key != "SkuAttrList") {
                if (key == "SkuPrice") {
                  _.each(value, (value2, key2) => {
                    if (key2 == "Id") {
                      row._priceId = value2;
                    } else {
                      row[key2] = value2;
                    }
                  });
                } else {
                  row[key] = value;
                }
              } else {
                let rowAttrs = [];
                _.each(value, (value2, key2) => {
                  let col = {};
                  _.each(that.skuAttrList, attr => {
                    if (attr.Id == value2.AttrId) {
                      _.each(attr.AttrValueList, attrVal => {
                        if (attrVal.Id == value2.AttrValueId) {
                          if (value2.InputValue != null) {
                            row[value2.AttrId] = value2.InputValue; //手工录入
                          } else {
                            row[value2.AttrId] = attrVal.DictionaryValueName;
                          }

                          col = {
                            CategoryId: attr.CategoryId,
                            GroupId: attr.GroupId,

                            AttrId: attr.Id,
                            DictionaryId: attr.DictionaryId,
                            DictionaryName: attr.DictionaryName,

                            AttrValueId: attrVal.Id,
                            DictionaryValueId: attrVal.DictionaryValueId,
                            DictionaryValueName: attrVal.DictionaryValueName,

                            ComputeValue: attrVal.ComputeValue
                          };

                          return false;
                        }
                      });
                      return false;
                    }
                  });
                  rowAttrs.push(col);
                });
                row._rowAttrs = rowAttrs;
              }
            });
            tableRowList.push(row);
          });

          //属性名
          _.each(selecteds, (value, key) => {
            //selecteds只有id，这里找出名称
            _.each(that.skuAttrList, item => {
              if (item.Id == key) {
                tableColList.push({
                  title: item.DictionaryName,
                  key: item.Id,
                  width: 100
                });
              }
            });
          });

          attrNameList = tableColList;

          that.skuFormData = selecteds;
          that.skuAttrInputValues = inputValues;

          that.skuAttrNameSelected = attrNameList;

          that.skuTableCols = _.concat(tableColList, skuCols);
          _.each(tableRowList, item => {
            if (item.OtherWorkPrice) {
              item.OtherWorkPrice_bak = Number(item.OtherWorkPrice);
            } else {
              item.OtherWorkPrice_bak = 0;
            }
          });
          that.skuTableList = tableRowList;
        }
      }

      function setAuthList(list) {
        _.each(list, item => {
          that.saleEmpower.push(item.PlatId);
          that.saleEmpowerRemark[item.PlatId] = item.Remark;
        });
      }
      function setCertificateList(list) {
        _.each(list, item => {
          that.certificate.push(item.CerticifateTypeId);
          that.certificatePrice[item.CerticifateTypeId] = item.Price;
        });
      }
      function setStyleDeputyList(list) {
        _.each(list, item => {
          let obj = {
            StoneType: item.StoneType,
            StoneAmount: item.StoneAmount,
            StoneWeight: item.StoneWeight,
            StonePrice: item.StonePrice
          };
          that.deputyStoneTableList.push(obj);
          that.deputyStoneFormData.push(_.extend({}, obj));
        });
      }
      function setPartList(list) {
        _.each(list, item => {
          let obj = {
            PartName: item.PartName,
            PartQuantity: item.PartQuantity,
            PartWeight: item.PartWeight,
            PartPrice: item.PartPrice
          };
          that.partsTableList.push(obj);
          that.partsFormData.push(_.extend({}, obj));
        });
      }
    },
    getCategoryList() {
      const loader = this.$Message.loading({
        content: "正在加载中...",
        duration: 0
      });
      Site.get({
        url: Site.api.productCategory.getSuitCategoryTreeList
      })
        .done(res => {
          loader();
          let data = res.data,
            list = [];
          if (data) {
            if (_.isArray(data.data_list)) {
              list = data.data_list;
            } else if (_.isArray(data)) {
              list = data;
            }
          }
          loop(list, (this.categoryList = [])); //类别列表
          this.categorySelectList = this.categoryList;

          function loop(list, children) {
            _.each(list, item => {
              let obj = {
                value: item.Id,
                label: item.CategoryName
              };
              children.push(obj);
              if (item.ChildList) loop(item.ChildList, (obj.children = []));
            });
          }
        })
        .fail(err => {
          loader();
          this.$Message.error(err.message || "请求失败");
        });
    },
    /*getProductCategoryTree() {
      let that = this;
      const loader = this.$Message.loading({
        content: "正在加载中...",
        duration: 0
      });
      Site.get({
        //url: Site.api.productCategorySelect.tree,
        url: Site.api.select.categorySuitAttrList, //新接口、没包含sku
        data: {
          categoryId: this.formData.CategoryId
        }
      })
        .done(res => {
          loader();
          let data = res.data,
            list = [],
            that = this;
          if (data) {
            if (_.isArray(data.GroupList)) {
              list = data.GroupList;
            }
          }
          this.isCategoryLoaded = true;
          this.AttrList = list;
          _.each(list, item => {
            if (item.GroupName == "SKU" && _.isArray(item.AttrList)) {
              this.skuAttrList = item.AttrList;
            }
            _.each(item.AttrList, item2 => {
              //设置默认值
              if (this.styleAttrSelected[item2.Id] == undefined) {
                if (
                  item2.IsMulti ||
                  (!item2.IsMulti && item2.AttrValueList.length == 1)
                ) {
                  this.$set(this.styleAttrSelected, item2.Id, []);
                } else {
                  this.$set(this.styleAttrSelected, item2.Id, null);
                }
              } else {
                if (
                  (item2.IsMulti ||
                    (!item2.IsMulti && item2.AttrValueList.length == 1)) &&
                  !_.isArray(this.styleAttrSelected[item2.Id])
                ) {
                  this.styleAttrSelected[item2.Id] = [
                    this.styleAttrSelected[item2.Id]
                  ];
                }
              }
              //设置验证规则
              this.formDataValidate[item.Id + "_" + item2.Id] = [
                {
                  validator(rule, value, callback) {
                    let arr = this.field.split("_"),
                      groupId = arr[0],
                      attrId = arr[1],
                      val = that.styleAttrSelected[item2.Id];
                    if (item2.IsMust) {
                      if (val == null || val == "") {
                        callback(new Error("请选择" + item2.DictionaryName));
                      } else {
                        let flag = false;
                        if (_.isArray(val)) {
                          _.each(val, selectedVal => {
                            flag = checkInputVal(selectedVal.split(",")[2]);
                            if (flag) {
                              // 退出循环
                              return false;
                            }
                          });
                        } else {
                          flag = checkInputVal(val.split(",")[2]);
                        }
                        if (flag) {
                          callback(new Error("请输入" + item2.DictionaryName));
                        } else {
                          callback();
                        }
                        function checkInputVal(attrValId) {
                          let flag = false;
                          _.each(item2.AttrValueList, attrValItem => {
                            if (attrValItem.Id == attrValId) {
                              if (attrValItem.DictionaryValueName == "手工录入") {
                                let inputVal =
                                  that.InputValues[
                                    groupId + "," + attrId + "," + attrValId
                                  ];
                                if (inputVal == null || inputVal == "") {
                                  flag = true;
                                }
                              }
                            }
                          });
                          return flag;
                        }
                      }
                    } else {
                      callback();
                    }
                  }
                }
              ];
            });
          });
          if (this.categoryLoadedCallback.length) {
            _.each(this.categoryLoadedCallback, callback => {
              callback();
            });
          }
        })
        .fail(err => {
          loader();
          this.$Message.error(err.message || "请求失败");
        });
	},
	*/
    handleCateSelect(item) {
      if (this.formData.CategoryName) {
        _.each(this.categorySelectList, eve => {
          if (eve.value == item.value) {
            //符合一级菜单时,标签名字做处理
            this.CategoryName = eve.label;
            this.formData.CategoryName = "";
            this.formData.CategoryName = item.label;
            this.categorySelectChildListTwo = item.children;
            this.categorySelectChildListThree = [];
            this.categorySelectChildListFour = [];
          }
        });
        _.each(this.categorySelectChildListTwo, eve => {
          if (eve.value == item.value) {
            this.CategoryNameThree = item.label;
            this.formData.CategoryName = this.CategoryName + "/" + item.label;
            this.categorySelectChildListThree = item.children;
            this.categorySelectChildListFour = [];
          }
        });
        _.each(this.categorySelectChildListThree, eve => {
          if (eve.value == item.value) {
            this.CategoryNameFour = item.label;
            this.formData.CategoryName =
              this.CategoryName +
              "/" +
              this.CategoryNameThree +
              "/" +
              item.label;
            this.categorySelectChildListFour = item.children;
          }
        });

        _.each(this.categorySelectChildListFour, eve => {
          if (eve.value == item.value) {
            this.formData.CategoryName =
              this.CategoryName +
              "/" +
              this.CategoryNameThree +
              "/" +
              this.CategoryNameFour +
              "/" +
              item.label;
          }
        });
      } else {
        this.CategoryName = item.label;
        this.formData.CategoryName = item.label;
        this.categorySelectChildListTwo = item.children;
      }
      if (item.children) {
      } else {
        this.formData.CategoryId = item.value;
        this.isCategorySelected = true;
        // this.getProductCategoryTree();
        this.getSkuList();
      }
    },
    handleSkuModalCancel() {
	  this.skuFormData = this.skuFormDataBak;
	  this.isShowSkuModal = false;
    },
    setListDataSelected(selection) {
      this.listDataSelected = selection;
    },
    setSkuListDataSelected(selection) {
      this.skuListDataSelected = selection;
    },
    handleSkuModalok() {
	  let listDataSelected = this.listDataSelected;
      if (listDataSelected.length > 0) {
        this.handleSkuList();
      } else {
		this.$Message.info("请至少选择一项数据!");
		return
      }
    },
    handleSkuList() {
      let list = this.listDataSelected,
		formData = {},
		SuitType,
        url = Site.api.styleCenterSku.getSkuFinenessPrice,
		idList = [];
	  if(!this.formData.SuitType){
		this.$Message.info("请选择套装类别");
		return 
	  }else{
		  	SuitType = this.formData.SuitType;	//已选套装类别
			_.each(list, (item, index) => {
				let styleObj = {};
				let id = item.Id;	//所选款的Id
				idList.push(id);
				if(this.formData.SuitType != 2){	//非情侣款
					styleObj = {
						StyleId: item.Id,
						StyleNo: item.StyleNo,
						StyleName: item.StyleName,
						Gender: 0
					}
				}else{	//情侣款需要设置男女款式（0：无/1：男/2：女）
					if(!item.Gender){
						this.$Message.info("请设置第"+(index+1)+"项情侣款式的男女款");
						return 
					}else{
						styleObj = {
							StyleId: item.Id,
							StyleNo: item.StyleNo,
							StyleName: item.StyleName,
							Gender: item.Gender
						}
					}
				}
				this.styleList.push(styleObj);	//款式信息
			});
	  }
	  formData = {
		  StyleIdList: idList,
		  SuitType: SuitType
	  }
      const loader = this.$Message.loading({
        content: "正在加载中...",
        duration: 0
      });
      Site.post({
        url: url,
        data: formData
      }).done(res => {
          loader();
		  let data;
		  let obj={};
          if (res.data && _.isArray(res.data) && res.data.length>0) {
            data = res.data;  //接口返回数据数组
		  }
          _.each(data, (item, index) => {
			  _.each(item.AttrList, attrItem => {
				  _.each(attrItem,(value,key) => {
						if(key == 'StyleAttrName'){
							obj[key] = attrItem['StyleAttrValueName'];
						}
				  })
				 //  obj = _.extend(attrItem, item.PriceModel);
				//   page.skuTableModel[0].text = attrItem.StyleAttrName;
			  })
			   
			});
			console.log(data); //赋值给this.skuListDataSelected并要提交
			// this.skuListDataSelected = data;
			this.$refs.jqSkuTable.init({
				type: "list",
				data: data,
				cols: page.skuTableModel,
				vm: this
			});
        	this.isShowSkuModal = false;
        }).fail(err => {
          loader();
          formData = "";
          this.$Message.error(err.message || "获取列表数据失败");
        });
    },
    getPrice(url, data, id, name) {
      let formData;
      const loader = this.$Message.loading({
        content: "正在加载中...",
        duration: 0
      });
      Site.post({
        url,
        data: data
      })
        .done(res => {
          loader();
          let lossData;
          if (res.data != null || res.data != undefined) {
            lossData = res.data;
          }
          if (res.data == 0) {
            lossData = "0";
          }
          _.each(this.skuTableList, (item, index) => {
            _.each(item, (value, key) => {
              if (key == id) {
                if (value == name) {
                  this.$set(
                    this.skuTableList[index],
                    "Loss",
                    Number(lossData).toFixed(2)
                  );
                }
              }
            });
          });
        })
        .fail(err => {
          loader();
          formData = "";
          this.$Message.error(err.message || "获取价格数据失败");
        });
    },
    setSkuTableFormData(val, data) {
      let that = this,
        rowAttrs = data.row._rowAttrs,
        rowsData = this.skuTableRowsData,
        currentRow;
      _.each(rowsData, item => {
        if (isRowAttrsAlike(item._rowAttrs, rowAttrs)) {
          currentRow = item;
        }
      });
      if (currentRow) {
        currentRow.values[data.column.key] = val;
        if (data.row.Id) {
          currentRow.values.Id = data.row.Id;
        }
        if (data.row._priceId) {
          currentRow.values._priceId = data.row._priceId;
        }
      } else {
        let obj = {
          _rowAttrs: rowAttrs,
          values: {
            [data.column.key]: val
          }
        };
        if (data.row.Id) {
          obj.values.Id = data.row.Id;
        }
        if (data.row._priceId) {
          obj.values._priceId = data.row._priceId;
        }
        rowsData.push(obj);
      }
    },
    createSkuTableCols() {
      //定义sku表格输入类表头
      return [
        {
          title: "名称",
          key: "SkuName",
          width: 120,
          renderHeader: (h, data) => {
            let value,
              that = this;
            function batchModify() {
              _.each(that.skuTableList, (item, index) => {
                _.each(item, (value, key) => {
                  if (
                    key == "GoldWeight" ||
                    key == "OtherWorkName" ||
                    key == "OtherWorkPrice" ||
                    key == "DiscountPrice"
                  ) {
                    item[key] = that.skuTableRowsData[index]["values"][key];
                  }
                });
                // debugger
                if (item[data.column.key] == null) {
                  that.$set(item, data.column.key, that.inputValueSkuName);
                } else {
                  item[data.column.key] = ""; //触发更新
                  item[data.column.key] = that.inputValueSkuName;
                }
              });
              _.each(that.skuTableRowsData, item => {
                //清空输入
                if (item["values"][data.column.key] == null) {
                  that.$set(
                    item["values"],
                    data.column.key,
                    that.inputValueSkuName
                  );
                } else {
                  item["values"][data.column.key] = ""; //触发更新
                  item["values"][data.column.key] = that.inputValueSkuName;
                }
              });
            }
            function getVal(val) {
              that.inputValueSkuName = val;
            }
            return (
              <div class="skuTableHeader">
                <p class="title">{data.column.title}</p>
                <div class="input">
                  <i-input
                    icon="ios-clock-outline"
                    placeholder="批量修改"
                    onInput={getVal}
                    size="small"
                  >
                    <i-button
                      slot="append"
                      icon="arrow-down-c"
                      size="small"
                      onClick={batchModify}
                    />
                  </i-input>
                </div>
              </div>
            );
          },
          render: (h, data) => {
            let that = this,
              value = "",
              value2 = "";
            // if(data.row.SkuName) {
            //     if(that.skuTableRowsData[data.index].values[data.column.key]) {
            //         value2 = that.skuTableRowsData[data.index].values[data.column.key];
            //     }else {
            //         value2 = data.row.SkuName;
            //     }
            // }else {
            //     if(that.skuTableRowsData[data.index] && that.skuTableRowsData[data.index].values) {
            //         value2 = that.skuTableRowsData[data.index].values[data.column.key];
            //     }
            // }
            value2 =
              (data.row.SkuName === 0 ? "0" : data.row.SkuName) ||
              (that.skuTableRowsData[data.index] &&
              that.skuTableRowsData[data.index].values
                ? that.skuTableRowsData[data.index].values[data.column.key]
                : "");
            if (value2 != null) {
              value = value2;
            }
            that.setSkuTableFormData(value, data);
            return h("Input", {
              props: { value: value, size: "small" },
              on: {
                input(val) {
                  that.setSkuTableFormData(val, data);
                }
              }
            });
          }
        },
        {
          title: "损耗",
          key: "Loss",
          width: 80,
          // renderHeader: (h, data) => {
          //     let value = '',
          //         that = this;
          //     function batchModify () {
          //         if(value != ''){
          //             _.each(that.skuTableList, item => {
          //                 if(item[data.column.key] == null){
          //                     that.$set(item, data.column.key, value)
          //                 }else{
          //                     item[data.column.key] = ''; //触发更新
          //                     item[data.column.key] = value;
          //                 }
          //             });
          //         }
          //     }
          //     function getVal (val) {
          //         value = val;
          //     }
          //     return (
          //         <div class="skuTableHeader">
          //             <p class="title">{data.column.title}</p>
          //             <div class="input">
          //                 <i-input icon="ios-clock-outline" placeholder="批量修改" onInput={getVal}>
          //                     <i-button slot="append" icon="arrow-down-c" onClick={batchModify}
          //                     ></i-button>
          //                 </i-input>
          //             </div>
          //         </div>
          //     )
          // },
          render: (h, data) => {
            let that = this,
              value = "",
              value2 =
                (data.row.Loss === 0 ? "0" : data.row.Loss) ||
                (that.skuTableRowsData[data.index] &&
                that.skuTableRowsData[data.index].values
                  ? that.skuTableRowsData[data.index].values[data.column.key]
                  : "");
            if (value2 != null) {
              value = value2;
            }
            that.setSkuTableFormData(value, data);
            return h("Input", {
              props: { value: value, disabled: true, size: "small" },
              on: {
                input(val) {
                  that.setSkuTableFormData(val, data);
                }
              }
            });
          }
        },
        {
          title: "净金重",
          key: "GoldWeight",
          width: 80,
          renderHeader: (h, data) => {
            let value = "",
              that = this;
            let reqNumber = 0;
            //获取品类和工艺分级
            let CateName, Technology;
            _.each(that.styleAttrSelected, (value, key) => {
              if (!_.isArray(value) && value) {
                let valueId = value.split(",");
                _.each(that.AttrList, item => {
                  if (item.Id == valueId[0]) {
                    _.each(item.AttrList, item1 => {
                      if (item1.Id == valueId[1]) {
                        if (item1.DictionaryName == "品类") {
                          _.each(item1.AttrValueList, item2 => {
                            if (item2.Id == valueId[2]) {
                              CateName = item2.DictionaryValueName;
                            }
                          });
                        }
                        if (item1.DictionaryName == "工艺分级") {
                          _.each(item1.AttrValueList, item2 => {
                            if (item2.Id == valueId[2]) {
                              Technology = item2.DictionaryValueName;
                            }
                          });
                        }
                      }
                    });
                  }
                });
              }
            });

            function getPrice(Condition, StoneSize, ConditionId, StoneSizeId) {
              //总价请求
              let Specials = [];
              let tempArr;
              let dtd = $.Deferred();
              _.each(that.styleAttrSelected, (value, key) => {
                //特殊工艺
                _.each(that.AttrList, item => {
                  if (item.GroupName == "基础属性") {
                    _.each(item.AttrList, item1 => {
                      if (key == item1.Id && item1.DictionaryName == "特殊工艺") {
                        _.each(value, value1 => {
                          let arr = value1.split(",");
                          _.each(item1.AttrValueList, item2 => {
                            if (arr[2] == item2.Id) {
                              Specials.push(item2.DictionaryValueName);
                            }
                          });
                        });
                      }
                    });
                  }
                });
              });
              _.each(that.partsFormData, item => {
                //设置count count 数量
                if (item.count == null) {
                  that.$set(item, "Count", item.PartQuantity);
                } else {
                  item.Count = item.PartQuantity;
                }
              });
              _.each(that.deputyStoneFormData, item => {
                //辅石默认数量为1
                item.Count = 1;
                item.SideStoneName = item.StoneType;
                item.Weight = item.StoneWeight;
              });
              let url2 = Site.api.priceHelper.returnPrice;
              let formData2 = {
                goldPrice: {
                  Count: 1,
                  GoldWeight: that.inputValueGoldWeight,
                  Condition: Condition,
                  Technology: Technology,
                  CateName: CateName,
                  CategoryID: that.formData.CategoryId
                },
                Parts: that.partsFormData,
                // certificatePrice: {//款式里面不需要证书价格
                //     CertificateName: that.CertificateName
                // },
                SideStones: that.deputyStoneFormData,
                workPrice: {
                  Condition: Condition,
                  Technology: Technology,
                  CateName: CateName,
                  CategoryID: that.formData.CategoryId,
                  GoldWeight: that.inputValueGoldWeight,
                  Count: 1,
                  IsEmptyPallet: true,
                  StoneSize: StoneSize,
                  Specials: Specials,
                  SideStone: that.deputyStoneFormData
                }
              };
              Site.post({
                url: url2,
                data: formData2
              })
                .done(res => {
                  reqNumber++;
                  let data2 = res.data;
                  _.each(that.skuTableList, (item, index) => {
                    if (item[ConditionId] == Condition) {
                      that.$set(
                        item,
                        "GoldPrice",
                        data2.GoldPrice === 0 ? "0" : data2.GoldPrice.toFixed(2)
                      );
                      that.$set(
                        item,
                        "WorkPrice",
                        data2.WorkFee === 0 ? "0" : data2.WorkFee.toFixed(2)
                      );
                      that.$set(
                        item,
                        "TotalPrice",
                        data2.TotalPrice === 0
                          ? "0"
                          : (Number(data2.TotalPrice) +
                              Number(
                                item.OtherWorkPrice == undefined
                                  ? 0
                                  : item.OtherWorkPrice
                              )
                            ).toFixed(2)
                      );
                      that.$set(
                        item,
                        "Loss",
                        data2.Loss === 0 ? "0" : data2.Loss.toFixed(2)
                      );
                    }
                  });
                  dtd.resolve(reqNumber);
                })
                .fail(err => {
                  reqNumber++;
                  that.$Message.error(err.message || "请求失败");
                  dtd.reject(reqNumber);
                });
              return dtd;
            }
            function batchModify() {
              that.loading = true;
              _.each(that.skuTableList, (item, index) => {
                _.each(item, (value, key) => {
                  if (
                    key == "SkuName" ||
                    key == "OtherWorkName" ||
                    key == "OtherWorkPrice" ||
                    key == "DiscountPrice"
                  ) {
                    item[key] = that.skuTableRowsData[index]["values"][key];
                  }
                });
                if (item[data.column.key] == null) {
                  that.$set(item, data.column.key, that.inputValueGoldWeight);
                } else {
                  item[data.column.key] = ""; //触发更新
                  item[data.column.key] = that.inputValueGoldWeight;
                }
              });
              _.each(that.skuTableRowsData, item => {
                //清空输入
                if (item["values"][data.column.key] == null) {
                  that.$set(
                    item["values"],
                    data.column.key,
                    that.inputValueGoldWeight
                  );
                } else {
                  item["values"][data.column.key] = ""; //触发更新
                  item["values"][data.column.key] = that.inputValueGoldWeight;
                }
              });
              // 批量请求
              let len = that.skuTableList.length; //表格长度
              let conditionArr = [];
              _.each(that.skuTableList, item => {
                //将所有的镶口 成色放进一个数组
                let obj = {
                  Condition: "",
                  ConditionId: "",
                  StoneSize: "",
                  StoneSizeId: ""
                };
                _.each(item._rowAttrs, item1 => {
                  if (item1.DictionaryName == "成色") {
                    obj.Condition = item1.DictionaryValueName;
                    obj.ConditionId = item1.AttrId;
                  }
                  if (item1.DictionaryName == "镶口大小") {
                    obj.StoneSize = item1.DictionaryValueName;
                    obj.StoneSizeId = item1.AttrId;
                  }
                });
                conditionArr.push(obj);
              });
              if (len) {
                let loopNum = 5; //
                // console.log(conditionArr)
                let con, stoneId, conId;
                for (let index = loopNum - 5; index < loopNum; index++) {
                  if (index == that.skuTableList.length) {
                    that.loading = false;
                    return false;
                  }
                  (con = conditionArr[index]["Condition"]),
                    (stoneId = conditionArr[index]["StoneSize"]),
                    (conId = conditionArr[index]["ConditionId"]);

                  $.when(getPrice(con, stoneId, conId))
                    .done(res => {
                      if (res == 5) {
                        loop();
                      } else {
                        that.loading = false;
                      }
                    })
                    .fail(err => {
                      if (err == 5) {
                        loop();
                      } else {
                        that.loading = false;
                      }
                    });
                }
                function loop() {
                  reqNumber = 0;
                  let relNum = 0;
                  if (loopNum + 5 > len) {
                    relNum = loopNum + 5 - len;
                    loopNum = len;
                  } else {
                    loopNum = loopNum + 5;
                  }
                  for (
                    let index = loopNum - 5 + relNum;
                    index < loopNum;
                    index++
                  ) {
                    $.when(
                      getPrice(
                        conditionArr[index]["Condition"],
                        conditionArr[index]["StoneSize"],
                        conditionArr[index]["ConditionId"]
                      )
                    )
                      .done(res => {
                        if (res == 5) {
                          //这里需要吧异步函数变为同步函数
                          loop();
                        } else {
                          that.loading = false; //表格加载的效果
                        }
                      })
                      .fail(err => {
                        if (err == 5) {
                          loop();
                        } else {
                          that.loading = false;
                        }
                      });
                  }
                }
              }
              // let length = 0;
              // _.each(that.skuTableList, item=>{
              //     if(item[data.column.key]){//这里是为了判断是否修改全部，还是修改部分的
              //         length ++
              //     }
              // })
              // _.each(that.skuTableList, (item,index) => {
              //     if(length == that.skuTableList.length) {
              //         item[data.column.key] = value;
              //     }else{
              //         if(item[data.column.key] == null){
              //             if(that.skuTableRowsData[index]['values'][data.column.key]) {
              //                 that.$set(item, data.column.key, that.skuTableRowsData[index]['values'][data.column.key])
              //             }else{
              //                 that.$set(item, data.column.key, value)
              //             }
              //         }else{
              //             item[data.column.key] = ''; //触发更新
              //             item[data.column.key] = that.skuTableRowsData[index]['values'][data.column.key];
              //         }
              //     }
              // })
            }

            function getVal(val) {
              that.inputValueGoldWeight = val;
            }
            return (
              <div class="skuTableHeader">
                <p class="title">{data.column.title}</p>
                <div class="input">
                  <i-input
                    icon="ios-clock-outline"
                    size="small"
                    placeholder="批量修改"
                    onInput={getVal}
                  >
                    <i-button
                      slot="append"
                      size="small"
                      icon="arrow-down-c"
                      onClick={batchModify}
                    />
                  </i-input>
                </div>
              </div>
            );
          },
          render: (h, data) => {
            let that = this,
              value = "",
              value2 =
                data.row.GoldWeight ||
                (that.skuTableRowsData[data.index] &&
                that.skuTableRowsData[data.index].values
                  ? that.skuTableRowsData[data.index].values[data.column.key]
                  : "");
            if (value2 != null) {
              value = value2;
            }

            that.setSkuTableFormData(value, data);
            return h("Input", {
              props: { value: value, size: "small" },
              on: {
                "on-blur"(e) {
                  let val = e.target.value;
                  that.setSkuTableFormData(val, data);
                  let finnessId;
                  let stoneId;
                  const loader = that.$Message.loading({
                    content: "正在加载中...",
                    duration: 0
                  });
                  _.each(that.skuAttrList, item => {
                    if (item.DictionaryName == "成色") {
                      finnessId = item.Id;
                    }
                    if (item.DictionaryName == "镶口大小") {
                      stoneId = item.Id;
                    }
                  });
                  let CateName, Technology; //获取品类和工艺要求
                  _.each(that.styleAttrSelected, (value, key) => {
                    if (!_.isArray(value) && value) {
                      let valueId = value.split(",");
                      _.each(that.AttrList, item => {
                        if (item.Id == valueId[0]) {
                          _.each(item.AttrList, item1 => {
                            if (item1.Id == valueId[1]) {
                              if (item1.DictionaryName == "品类") {
                                _.each(item1.AttrValueList, item2 => {
                                  if (item2.Id == valueId[2]) {
                                    CateName = item2.DictionaryValueName;
                                  }
                                });
                              }
                              if (item1.DictionaryName == "工艺分级") {
                                _.each(item1.AttrValueList, item2 => {
                                  if (item2.Id == valueId[2]) {
                                    Technology = item2.DictionaryValueName;
                                  }
                                });
                              }
                            }
                          });
                        }
                      });
                    }
                  });
                  let Specials = []; //特殊工艺
                  let tempArr;
                  _.each(that.styleAttrSelected, (value, key) => {
                    _.each(that.AttrList, item => {
                      if (item.GroupName == "基础属性") {
                        _.each(item.AttrList, item1 => {
                          if (
                            key == item1.Id &&
                            item1.DictionaryName == "特殊工艺"
                          ) {
                            _.each(value, value1 => {
                              let arr = value1.split(",");
                              _.each(item1.AttrValueList, item2 => {
                                if (arr[2] == item2.Id) {
                                  Specials.push(item2.DictionaryValueName);
                                }
                              });
                            });
                          }
                        });
                      }
                    });
                  });
                  _.each(that.partsFormData, item => {
                    if (item.count == null) {
                      that.$set(item, "Count", item.PartQuantity);
                    } else {
                      item.Count = item.PartQuantity;
                    }
                  });
                  let inputVal = [];
                  _.each(that.deputyStoneFormData, item => {
                    item.SideStoneName = item.StoneType;
                    item.Count = 1;
                    item.Weight = item.StoneWeight;
                  });
                  //请求售价的
                  let url2 = Site.api.priceHelper.returnPrice;
                  let formData2 = {
                    goldPrice: {
                      Count: 1,
                      GoldWeight: val == "" ? 0 : val,
                      Condition: that.skuTableList[data.index][finnessId],
                      Technology: Technology,
                      CateName: CateName,
                      CategoryID: that.formData.CategoryId
                    },
                    Parts: that.partsFormData,
                    // certificatePrice: { //款式里面不需要证书价格
                    //     CertificateName: that.CertificateName
                    // },
                    SideStones: that.deputyStoneFormData,
                    workPrice: {
                      Condition: that.skuTableList[data.index][finnessId],
                      Technology: Technology,
                      CateName: CateName,
                      CategoryID: that.formData.CategoryId,
                      GoldWeight: val == "" ? 0 : val,
                      Count: 1,
                      IsEmptyPallet: true,
                      StoneSize: that.skuTableList[data.index][stoneId],
                      Specials: Specials,
                      SideStone: that.deputyStoneFormData
                    }
                  };
                  Site.post({
                    url: url2,
                    data: formData2
                  })
                    .done(res => {
                      let data2 = res.data;
                      loader();
                      // that.$set(that.skuTableList[data.index], 'Loss', data2.Loss === 0 ? '0':(data2.Loss).toFixed(2));
                      that.$set(
                        that.skuTableList[data.index],
                        "GoldPrice",
                        data2.GoldPrice === 0 ? "0" : data2.GoldPrice.toFixed(2)
                      );
                      that.$set(
                        that.skuTableList[data.index],
                        "WorkPrice",
                        data2.WorkFee === 0 ? "0" : data2.WorkFee.toFixed(2)
                      );
                      that.$set(
                        that.skuTableList[data.index],
                        "TotalPrice",
                        data2.TotalPrice === 0
                          ? "0"
                          : (Number(data2.TotalPrice) +
                              Number(
                                that.skuTableList[data.index].OtherWorkPrice ==
                                undefined
                                  ? 0
                                  : that.skuTableList[data.index].OtherWorkPrice
                              )
                            ).toFixed(2)
                      );
                      _.each(that.skuTableList, (item, index) => {
                        _.each(item, (value, key) => {
                          if (index == data.index) {
                            if (
                              key == "SkuName" ||
                              key == "OtherWorkName" ||
                              key == "OtherWorkPrice" ||
                              key == "GoldWeight"
                            ) {
                              item[key] =
                                that.skuTableRowsData[data.index]["values"][
                                  key
                                ];
                            }
                            item.GoldWeight = Number(val);
                          }
                        });
                      });
                    })
                    .fail(err => {
                      loader();
                      that.$Message.error(err.message || "请求失败");
                    });
                }
              }
            });
          }
        },
        {
          title: "金料",
          key: "GoldPrice",
          width: 120,
          // renderHeader: (h, data) => {
          //     let value = '',
          //         that = this;
          //     function batchModify () {
          //         if(value != ''){
          //             _.each(that.skuTableList, item => {
          //                 if(item[data.column.key] == null){
          //                     that.$set(item, data.column.key, value)
          //                 }else{
          //                     item[data.column.key] = ''; //触发更新
          //                     item[data.column.key] = value;
          //                 }
          //             });
          //         }
          //     }
          //     function getVal (val) {
          //         value = val;
          //     }
          //     return (
          //         <div class="skuTableHeader">
          //             <p class="title">{data.column.title}</p>
          //             <div class="input">
          //                 <i-input icon="ios-clock-outline" placeholder="批量修改" onInput={getVal}>
          //                     <i-button slot="append" icon="arrow-down-c" onClick={batchModify}
          //                     ></i-button>
          //                 </i-input>
          //             </div>
          //         </div>
          //     )
          // },
          render: (h, data) => {
            let that = this,
              value = "",
              value2 =
                (data.row.GoldPrice === 0 ? "0" : data.row.GoldPrice) ||
                (that.skuTableRowsData[data.index] &&
                that.skuTableRowsData[data.index].values
                  ? that.skuTableRowsData[data.index].values[data.column.key]
                  : "");
            if (value2 != null) {
              value = value2;
            }
            that.setSkuTableFormData(value, data);
            return h("Input", {
              props: { value: value, disabled: true, size: "small" },
              on: {
                input(val) {
                  that.setSkuTableFormData(val, data);
                  if (val) {
                  }
                }
              }
            });
          }
        },
        {
          title: "工费",
          key: "WorkPrice",
          width: 120,
          // renderHeader: (h, data) => {
          //     let value = '',
          //         that = this;
          //     function batchModify () {
          //         if(value != ''){
          //             _.each(that.skuTableList, item => {
          //                 if(item[data.column.key] == null){
          //                     that.$set(item, data.column.key, value)
          //                 }else{
          //                     item[data.column.key] = ''; //触发更新
          //                     item[data.column.key] = value;
          //                 }
          //             });
          //         }
          //     }
          //     function getVal (val) {
          //         value = val;
          //     }
          //     return (
          //         <div class="skuTableHeader">
          //             <p class="title">{data.column.title}</p>
          //             <div class="input">
          //                 <i-input icon="ios-clock-outline" placeholder="批量修改" onInput={getVal}>
          //                     <i-button slot="append" icon="arrow-down-c" onClick={batchModify}
          //                     ></i-button>
          //                 </i-input>
          //             </div>
          //         </div>
          //     )
          // },
          render: (h, data) => {
            let that = this,
              value = "",
              value2 =
                (data.row.WorkPrice === 0 ? "0" : data.row.WorkPrice) ||
                (that.skuTableRowsData[data.index] &&
                that.skuTableRowsData[data.index].values
                  ? that.skuTableRowsData[data.index].values[data.column.key]
                  : "");
            if (value2 != null) {
              value = value2;
            }
            that.setSkuTableFormData(value, data);
            return h("Input", {
              props: { value: value, disabled: true, size: "small" },
              on: {
                input(val) {
                  that.setSkuTableFormData(val, data);
                }
              }
            });
          }
        },
        {
          title: "其他费用",
          key: "OtherWorkPrice",
          width: 80,
          renderHeader: (h, data) => {
            let value = "",
              that = this;
            function batchModify() {
              _.each(that.skuTableList, (item, index) => {
                if (item[data.column.key] == null) {
                  that.$set(
                    item,
                    data.column.key,
                    that.inputValueOtherWorkPrice
                  );
                } else {
                  item[data.column.key] = ""; //触发更新
                  item[data.column.key] = that.inputValueOtherWorkPrice;
                }
                _.each(item, (value, key) => {
                  if (
                    key == "GoldWeight" ||
                    key == "OtherWorkName" ||
                    key == "SkuName" ||
                    key == "DiscountPrice"
                  ) {
                    item[key] = that.skuTableRowsData[index]["values"][key];
                  }
                  if (key == "OtherWorkPrice") {
                    item["TotalPrice"] = (Number(
                      that.inputValueOtherWorkPrice
                    ) +
                      Number(
                        item["TotalPrice"] == undefined ? 0 : item["TotalPrice"]
                      ) -
                      Number(item.OtherWorkPrice_bak)
                    ).toFixed(2);
                    item.OtherWorkPrice_bak = Number(
                      that.inputValueOtherWorkPrice
                    );
                  }
                });
              });
              _.each(that.skuTableRowsData, item => {
                //清空输入
                if (item["values"][data.column.key] == null) {
                  that.$set(
                    item["values"],
                    data.column.key,
                    that.inputValueOtherWorkPrice
                  );
                } else {
                  item["values"][data.column.key] = ""; //触发更新
                  item["values"][data.column.key] =
                    that.inputValueOtherWorkPrice;
                }
              });
            }
            function getVal(val) {
              if (isNaN(val)) {
                that.$Message.error("请输入数字！");
                return false;
              }
              that.inputValueOtherWorkPrice = val;
            }
            return (
              <div class="skuTableHeader">
                <p class="title">{data.column.title}</p>
                <div class="input">
                  <i-input
                    icon="ios-clock-outline"
                    size="small"
                    placeholder="批量修改"
                    onInput={getVal}
                  >
                    <i-button
                      slot="append"
                      size="small"
                      icon="arrow-down-c"
                      onClick={batchModify}
                    />
                  </i-input>
                </div>
              </div>
            );
          },
          render: (h, data) => {
            let that = this,
              value = "",
              value2 =
                (data.row.OtherWorkPrice === 0
                  ? "0"
                  : data.row.OtherWorkPrice) ||
                (that.skuTableRowsData[data.index] &&
                that.skuTableRowsData[data.index].values
                  ? that.skuTableRowsData[data.index].values[data.column.key]
                  : "");
            if (value2 != null) {
              value = value2;
            }
            that.setSkuTableFormData(value, data);
            return h("Input", {
              props: { value: value, size: "small" },
              on: {
                "on-blur"(e) {
                  let val = e.target.value;
                  that.setSkuTableFormData(val, data);
                  _.each(that.skuTableList, (item, index) => {
                    if (index == data.index) {
                      if (val == item.OtherWorkPrice_bak) {
                        return false;
                      } else {
                        that.$set(
                          item,
                          "TotalPrice",
                          (Number(
                            item.TotalPrice == undefined ? 0 : item.TotalPrice
                          ) +
                            Number(val) -
                            item.OtherWorkPrice_bak
                          ).toFixed(2)
                        );
                        that.$set(
                          item,
                          "OtherWorkPrice",
                          that.skuTableRowsData[data.index]["values"][
                            "OtherWorkPrice"
                          ]
                        );
                        that.$set(
                          item,
                          "OtherWorkPrice_bak",
                          item.OtherWorkPrice
                        );
                      }
                    }
                  });
                }
              }
            });
          }
        },
        {
          title: "其他费用名称",
          key: "OtherWorkName",
          width: 120,
          renderHeader: (h, data) => {
            let value = "",
              that = this;
            function batchModify() {
              _.each(that.skuTableList, (item, index) => {
                _.each(item, (value, key) => {
                  if (
                    key == "GoldWeight" ||
                    key == "SkuName" ||
                    key == "OtherWorkPrice" ||
                    key == "DiscountPrice"
                  ) {
                    item[key] = that.skuTableRowsData[index]["values"][key];
                  }
                });
                // debugger
                if (item[data.column.key] == null) {
                  that.$set(
                    item,
                    data.column.key,
                    that.inputValueOtherWorkName
                  );
                } else {
                  item[data.column.key] = ""; //触发更新
                  item[data.column.key] = that.inputValueOtherWorkName;
                }
              });
              _.each(that.skuTableRowsData, item => {
                //清空输入
                if (item["values"][data.column.key] == null) {
                  that.$set(
                    item["values"],
                    data.column.key,
                    that.inputValueOtherWorkName
                  );
                } else {
                  item["values"][data.column.key] = ""; //触发更新
                  item["values"][data.column.key] =
                    that.inputValueOtherWorkName;
                }
              });
            }
            function getVal(val) {
              that.inputValueOtherWorkName = val;
            }
            return (
              <div class="skuTableHeader">
                <p class="title">{data.column.title}</p>
                <div class="input">
                  <i-input
                    size="small"
                    icon="ios-clock-outline"
                    placeholder="批量修改"
                    onInput={getVal}
                  >
                    <i-button
                      size="small"
                      slot="append"
                      icon="arrow-down-c"
                      onClick={batchModify}
                    />
                  </i-input>
                </div>
              </div>
            );
          },
          render: (h, data) => {
            let that = this,
              value = "",
              value2 =
                (data.row.OtherWorkName === 0 ? "0" : data.row.OtherWorkName) ||
                (that.skuTableRowsData[data.index] &&
                that.skuTableRowsData[data.index].values
                  ? that.skuTableRowsData[data.index].values[data.column.key]
                  : "");
            if (value2 != null) {
              value = value2;
            }
            that.setSkuTableFormData(value, data);
            return h("Input", {
              props: { value: value, size: "small" },
              on: {
                "on-blur"(e) {
                  let val = e.target.value;
                  that.setSkuTableFormData(val, data);
                }
              }
            });
          }
        },
        {
          title: "售价(金工石)",
          key: "TotalPrice",
          width: 120,
          // renderHeader: (h, data) => {
          //     let value = '',
          //         that = this;
          //     function batchModify () {
          //         if(value != ''){
          //             _.each(that.skuTableList, item => {
          //                 if(item[data.column.key] == null){
          //                     that.$set(item, data.column.key, value)
          //                 }else{
          //                     item[data.column.key] = ''; //触发更新
          //                     item[data.column.key] = value;
          //                 }
          //             });
          //         }
          //     }
          //     function getVal (val) {
          //         value = val;
          //     }
          //     return (
          //         <div class="skuTableHeader">
          //             <p class="title">{data.column.title}</p>
          //             <div class="input">
          //                 <i-input icon="ios-clock-outline" placeholder="批量修改" onInput={getVal}>
          //                     <i-button slot="append" icon="arrow-down-c" onClick={batchModify}
          //                     ></i-button>
          //                 </i-input>
          //             </div>
          //         </div>
          //     )
          // },
          render: (h, data) => {
            let that = this,
              value = "",
              value2 =
                (data.row.TotalPrice === 0 ? "0" : data.row.TotalPrice) ||
                (that.skuTableRowsData[data.index] &&
                that.skuTableRowsData[data.index].values
                  ? that.skuTableRowsData[data.index].values[data.column.key]
                  : "");
            if (value2 != null) {
              value = value2;
            }
            that.setSkuTableFormData(value, data);
            return h("Input", {
              props: { value: value, disabled: true, size: "small" },
              on: {
                input(val) {
                  that.setSkuTableFormData(val, data);
                }
              }
            });
          }
        },
        {
          title: "折扣价",
          key: "DiscountPrice",
          width: 120,
          renderHeader: (h, data) => {
            let value = "",
              that = this;
            // function batchModify () {
            //     if(value != ''){
            //         _.each(that.skuTableList, item => {
            //             if(item[data.column.key] == null){
            //                 that.$set(item, data.column.key, value)
            //             }else{
            //                 item[data.column.key] = ''; //触发更新
            //                 item[data.column.key] = value;
            //             }
            //         });
            //     }
            // }
            function batchModify() {
              _.each(that.skuTableList, (item, index) => {
                _.each(item, (value, key) => {
                  if (
                    key == "GoldWeight" ||
                    key == "OtherWorkName" ||
                    key == "SkuName" ||
                    key == "OtherWorkPrice"
                  ) {
                    item[key] = that.skuTableRowsData[index]["values"][key];
                  }
                });
                // debugger
                if (item[data.column.key] == null) {
                  that.$set(
                    item,
                    data.column.key,
                    that.inputValueDiscountPrice
                  );
                } else {
                  item[data.column.key] = ""; //触发更新
                  item[data.column.key] = that.inputValueDiscountPrice;
                }
              });
              _.each(that.skuTableRowsData, item => {
                //清空输入
                if (item["values"][data.column.key] == null) {
                  that.$set(
                    item["values"],
                    data.column.key,
                    that.inputValueDiscountPrice
                  );
                } else {
                  item["values"][data.column.key] = ""; //触发更新
                  item["values"][data.column.key] =
                    that.inputValueDiscountPrice;
                }
              });
            }
            function getVal(val) {
              that.inputValueDiscountPrice = val;
            }
            return (
              <div class="skuTableHeader">
                <p class="title">{data.column.title}</p>
                <div class="input">
                  <i-input
                    size="small"
                    icon="ios-clock-outline"
                    placeholder="批量修改"
                    onInput={getVal}
                  >
                    <i-button
                      size="small"
                      slot="append"
                      icon="arrow-down-c"
                      onClick={batchModify}
                    />
                  </i-input>
                </div>
              </div>
            );
          },
          render: (h, data) => {
            let that = this,
              value = "",
              value2 =
                (data.row.DiscountPrice === 0 ? "0" : data.row.DiscountPrice) ||
                (that.skuTableRowsData[data.index] &&
                that.skuTableRowsData[data.index].values
                  ? that.skuTableRowsData[data.index].values[data.column.key]
                  : "");
            if (value2 != null) {
              value = value2;
            }
            that.setSkuTableFormData(value, data);
            return h("Input", {
              props: { value: value, size: "small" },
              on: {
                "on-blur"(e) {
                  let val = e.target.value;
                  that.setSkuTableFormData(val, data);
                }
              }
            });
          }
        }
      ];
    },

    showSkuModal() {
      this.createSearchForm(page.searchModel);
      this.getList();
      this.skuFormDataBak = {};
      this.isShowSkuModal = true;
      _.each(this.skuFormData, (value, key) => {
        this.$set(this.skuFormDataBak, key, value);
      });
      let isSelect = 0;
      let isLack = "";
     /* _.each(this.styleAttrSelected, (value, key) => {//是否已经选择了品类和工艺要求
          _.each(this.AttrList,item => {
              if(item.GroupName == '基础属性'||item.GroupName == '基础') {
                  _.each(item.AttrList,item1 => {
                      if(item1.Id == key && (item1.DictionaryName == '品类'||item1.DictionaryName == "工艺分级")){
                          if(value){
                              let arr = value.split(',')
                              _.each(item1.AttrValueList, item2 => {
                                  if(arr[2] == item2.Id){
                                      isSelect ++;
                                  }
                              })
                          }

                      }
                  })
              }
          })
      })
      if(isSelect == 2){
      this.isShowSkuModal = true;
      }else{
          this.$Message.warning('请选择品类或者工艺分级')
	  }*/
    },
    getSelectType() {
      let formData = {};
      const loader = this.$Message.loading({
        content: "正在加载中...",
        duration: 0
      });
      Site.get({
        url: Site.api.suit.getSuitFormDrop
      })
        .done(res => {
          loader();
          let data = res.data;
          if (data) {
            this.selectArr = data.SuitTypeList;
          }
        })
        .fail(err => {
          loader();
        });
    },
    getSelectOptions() {
      let formData = {};
      const loader = this.$Message.loading({
        content: "正在加载中...",
        duration: 0
      });
      Site.get({
        url: Site.api.select.getStyleCreateDrop
      })
        .done(res => {
          loader();
          let data = res.data;
          if (data) {
            this.saleEmpowerOptions = data.PlatList;
            this.certificateOptions = data.CertificateList;
            this.partsOptions = data.PartNameList;
            this.deputyStoneOptions = data.DeputyList;
          }
        })
        .fail(err => {
          loader();
        });
    },
    getSkuList() {
      if (this.skuAttrList.length == 0) {
        const loader = this.$Message.loading({
          content: "正在加载中...",
          duration: 0
        });
        Site.get({
          url: Site.api.select.categorySkuAttrList,
          data: {
            categoryId: this.formData.CategoryId
          }
        })
          .done(res => {
            loader();
            let data = res.data;
            this.isSkuListLoaded = true;
            if (data && data.length > 0) {
              let that = this;
              this.skuAttrList = data;
              _.each(data, item => {
                //设置验证规则
                this.skuFormDataValidate[item.Id] = [
                  {
                    validator(rule, value, callback) {
                      let val = that.skuFormData[item.Id];
                      if (item.IsMust) {
                        if (item.IsMulti) {
                          if (!(val && val.length)) {
                            callback(new Error("请选择" + item.DictionaryName));
                          }
                        } else {
                          if (val == null || val == "") {
                            callback(new Error("请选择" + item.DictionaryName));
                          }
                        }
                      }
                      callback();
                    }
                  }
                ];
              });
            }
            if (this.skuListLoadedCallback.length) {
              _.each(this.skuListLoadedCallback, callback => {
                callback();
              });
            }
          })
          .fail(err => {
            loader();
          });
      }
    },

    //石头
    deputyStoneTableAddRow() {
      // this.deputyStoneTableList = [];
      // _.each(this.deputyStoneFormData, item => {
      //     let obj = {};
      //     _.each(item, (value, key) => {
      //         obj[key] = value;
      //     });
      //     this.deputyStoneTableList.push(obj);
      // });
      this.deputyStoneTableList.push({});
      this.deputyStoneFormData.push({});
    },
    deputyStoneTableDelRow(data) {
      this.deputyStoneTableList.splice(data.index, 1);
      this.deputyStoneFormData.splice(data.index, 1);
    },
    setDeputyStoneTableFormData(val, data) {
      if (!this.deputyStoneFormData[data.index]) {
        this.deputyStoneFormData[data.index] = {};
      }
      this.deputyStoneFormData[data.index][data.column.key] = val;
    },

    //配件
    partsTableAddRow() {
      // this.partsTableList = [];
      // _.each(this.partsFormData, item => {
      //     let obj = {};
      //     _.each(item, (value, key) => {
      //         obj[key] = value;
      //     });
      //     this.partsTableList.push(obj);
      // });
      this.partsTableList.push({});
      this.partsFormData.push({});
    },
    partsTableDelRow(data) {
      this.partsTableList.splice(data.index, 1);
      this.partsFormData.splice(data.index, 1);
    },
    setPartsTableFormData(val, data) {
      if (!this.partsFormData[data.index]) {
        this.partsFormData[data.index] = {};
      }
      this.partsFormData[data.index][data.column.key] = val;
    }
  },
  created() {
    this.page && _.extend(page, this.page);
    this.pageClass = page.pageName;
    this.getCategoryList();
    this.getSelectType();
    this.getSelectOptions();
    //this.createForm(page.dataModel);
  },
  activated() {
    let id = this.$route.params.id;
    if (id && id != this.formData.Id) {
      this.skuTableList = [];
      this.skuTableRowsData = [];
      this.getFormData(id);
      this.isCategorySelected = true; //不显示分类选择
    }
  }
};

function modFoat(v) {
  var max = parseInt(v) + 1;
  if (max - v < 1) {
    return max;
  }
  return v;
}

//比较sku表格属性列是否一样
function isRowAttrsAlike(rowAttrs1, rowAttrs2) {
  let isAlike = false;
  if (rowAttrs1.length == rowAttrs2.length) {
    let count = 0;
    _.each(rowAttrs1, colAttr => {
      let flag = false;
      _.each(rowAttrs2, colAttr2 => {
        if (
          colAttr.AttrId == colAttr2.AttrId &&
          colAttr.AttrValueId == colAttr2.AttrValueId
        ) {
          flag = true;
          return false;
        }
      });
      if (!flag) {
        return false;
      }
      count++;
    });
    if (count == rowAttrs1.length) {
      isAlike = true;
    }
  }
  return isAlike;
}

let page = {
  pageName: "suitEdit",
  dataModel: [
    {
      key: "SuitName",
      name: "套装名称",
      type: "string",
      typeElem: "input|text",
      rule: {
        required: true
      }
    },

    // {
    //     key: 'SuitPrice',
    //     name: '套装价',
    //     type: 'number',
    //     typeElem: 'input|text',
    //     rule: {
    //         required: true
    //     }
    // },
    {
      key: "CategoryId",
      name: "分类id",
      type: "string",
      typeElem: "input|text",
      rule: {
        required: true
      }
    },
    {
      key: "IsAllowConsignment",
      name: "是否允许代销",
      type: "boolean",
      typeElem: "radio",
      children: [
        {
          key: 1,
          value: "是"
        },
        {
          key: 0,
          value: "否"
        }
      ],
      rule: {
        required: true
      }
    },
    {
      key: "SuitCopy",
      name: "文案/装修",
      type: "string",
      typeElem: "input|text"
    },
    {
      key: "IsShelves",
      name: "上下架状态",
      type: "boolean",
      typeElem: "radio",
      children: [
        {
          key: 1,
          value: "是"
        },
        {
          key: 0,
          value: "否"
        }
      ],
      rule: {
        required: true
      }
    },
    {
      key: "GoldWeight",
      name: "净金重",
      type: "number",
      typeElem: "input|text",
      rule: {
        required: true
      }
    },
    {
      key: "MarketingStatistics",
      name: "营销统计",
      type: "string",
      typeElem: "input|text",
      rule: {
        required: true
      }
    },
    {
      key: "AuthList",
      name: "代销授权",
      type: "string",
      typeElem: "input|text",
      rule: {
        required: true
      }
    },
    {
      key: "ImageList",
      name: "款式图像",
      type: "string",
      typeElem: "input|text",
      rule: {
        required: true
      }
    },
    // {
    //   key: "AttrList",
    //   name: "款式属性",
    //   type: "string",
    //   typeElem: "select",
    //   children: [],
    //   childrenApi: Site.api.wareHouseShelf.list,
    //   childrenCallback(list) {
    //     this.children = [];
    //     _.each(list, item => {
    //       this.children.push({
    //         key: item.Id,
    //         value: item.Name
    //       });
    //     });
    //   },
    //   rule: {
    //     required: true
    //   }
    // },
    {
      key: "StyleDeputyList",
      name: "款式副石",
      type: "string",
      typeElem: "select",
      children: [],
      childrenApi: Site.api.wareHouseShelf.list,
      childrenCallback(list) {
        this.children = [];
        _.each(list, item => {
          this.children.push({
            key: item.Id,
            value: item.Name
          });
        });
      },
      rule: {
        required: true
      }
    },
    {
      key: "SkuList",
      name: "sku列表",
      type: "string",
      typeElem: "input|text",
      rule: {
        required: true
      }
    }
  ],

  tableModel: [
    { text: "款号", datafield: "StyleNo", width: 150 },
    { text: "款名", datafield: "StyleName", width: 150 },
    {
      text: "主图",
      datafield: "MainImage",
      width: 80,
      createRender(vm) {
        //绑定事件
        $(".styleCenter").on("click", `.jqTable .image img`, vm.handleShowImg);

        return function(index, fieldName, value, defaultHtml, column, rowData) {
          let img = "";
          if (value) {
            img = Site.api.upfileBaseUrl + value;
            img = `<div class="cellContainer"><div class="image"><img src="${img}" /></div></div>`;
          }
          return img;
        };
      }
    },
    { text: "分类", datafield: "CategoryName", width: 150 },
    { text: "净金重(约)", datafield: "GoldWeight", width: 120 },
    {
      text: "开启代销",
      datafield: "IsAllowConsignment",
      width: 150,
      cellsrenderer: function(
        index,
        fieldName,
        value,
        defaultHtml,
        column,
        rowData
      ) {
        return `<div class="cellContainer">${value ? "是" : "否"}</div>`;
      }
    },
    {
      text: "可用状态",
      datafield: "IsOnTheShelves",
      width: 120,
      cellsrenderer: function(index,fieldName,value,defaultHtml,column,rowData) {
        return `<div class="cellContainer">${value ? "可用" : "不可用"}</div>`;
      }
	},
	{ text: "性别", datafield: "Gender", width: 100 , editable: true,
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
	}
  ],
  skuTableModel: [
    {
      text: "属性组名称",
      datafield: "StyleAttrValueName",
      width: 150,
      cellsrenderer: function(index,fieldName,value, defaultHtml,column,rowData) {
        // return `<div class="cellContainer">${value ? "可用" : "不可用"}</div>`;
	  }
	},
	{ text: "sku名称", datafield: "SkuName", width: 100, editable: true},
	{ text: "金料", datafield: "GoldPrice", width: 100, cellsformat : 'c2'},
    { text: "工费", datafield: "WorkPrice", width: 100 , cellsformat : 'c2'},
    { text: "主石价", datafield: "MainStonePrice", width: 100 , cellsformat : 'c2'},
    { text: "副石价", datafield: "DeputyStonePrice", width: 100 , cellsformat : 'c2'},
    { text: "配件价", datafield: "PartPrice", width: 80 , cellsformat : 'c2'},
    { text: "证书价", datafield: "CertificatePrice", width: 80 , cellsformat : 'c2'},
    { text: "其他费用价格", datafield: "OtherWorkPrice", width: 100 , cellsformat : 'c2'},
    { text: "其他费用名称", datafield: "OtherWorkName", width: 100 , cellsformat : 'c2'},
    { text: "销售价格", datafield: "TotalPrice", width: 100 , cellsformat : 'c2', editable: true},
	{ text: "一口价", datafield: "MouthPrice", width: 100 , cellsformat : 'c2', editable: true}					
  ],

  searchModel: [
    {
      key: "categoryId",
      name: "产品分类 ",
      type: "string",
      typeElem: "cascader",
      defaultValue: [],
      children: [],
      childrenApi: Site.api.productCategory.getStyleTreeList,
      childrenCallback(list) {
        loop(list, (this.children = []));

        function loop(list, children) {
          _.each(list, item => {
            let obj = {
              value: item.Id,
              label: item.CategoryName
            };
            children.push(obj);
            if (item.ChildList) loop(item.ChildList, (obj.children = []));
          });
        }
      },
      rule: [
        {
          type: "array",
          message: ""
        }
      ]
    },
    {
      key: "styleName",
      name: "款式名称",
      type: "string",
      typeElem: "input|text"
    },
    {
      key: "styleNo",
      name: "款号",
      type: "string",
      typeElem: "input|text"
    },
    {
      key: "isConsignment",
      name: "代销商品",
      type: "boolean",
      typeElem: "select",
      children: [
        {
          key: 1,
          value: "是"
        },
        {
          key: 0,
          value: "否"
        }
      ]
    },
    {
      key: "isAllowConsignment",
      name: "开启代销",
      type: "boolean",
      typeElem: "select",
      children: [
        {
          key: 1,
          value: "是"
        },
        {
          key: 0,
          value: "否"
        }
      ]
    },
    {
      key: "isOnTheShelf",
      name: "款式状态",
      type: "boolean",
      typeElem: "select",
      children: [
        {
          key: 1,
          value: "可用"
        },
        {
          key: 0,
          value: "不可用"
        }
      ]
    },
    {
      key: "goldWeightStart",
      keyEnd: "goldWeightEnd",
      name: "金重",
      type: "string",
      typeElem: "input|text",
      vlaueKey: "area"
    },
    {
      key: "rabbetSizeStart",
      keyEnd: "rabbetSizeEnd",
      name: "镶口大小",
      type: "string",
      typeElem: "input|text",
      vlaueKey: "area"
    },
    {
      key: "salePriceStart",
      keyEnd: "salePriceEnd",
      name: "售价",
      type: "string",
      typeElem: "input|text",
      vlaueKey: "area"
    },
    {
      key: "purchaserId",
      name: "供货商",
      childrenApi: Site.api.select.getSupplierDropList,
      type: "string",
      typeElem: "select",
      children: [],
      childrenCallback(list) {
        loop(list, (this.children = []));
        function loop(list, children) {
          _.each(list, item => {
            let obj = {
              value: item.CompanyName,
              key: item.Id
            };
            children.push(obj);
            if (item.ChildList) loop(item.ChildList, (obj.children = []));
          });
        }
      }
    },
    // {
    //     key: 'startDate',
    //     name: '上线时间',
    //     type: 'string',
    //     typeElem: 'datePicker'
    // },
    {
      key: "makeOrderTime",
      name: "上线时间",
      type: "string",
      typeElem: "datePicker|daterange"
    }
  ]
};
</script>

<style lang="scss">
.suitTableInstance{
	&.ivu-btn{
		margin-bottom: 8px !important;
	}
  }
.page,
.suitAdd,
.suitEdit {
  .auth-table {
    width: 1280px;
  }
  .categorySelectControll > div {
    width: 200px;
    float: left;
    margin-right: 15px;
    margin-top: 5px;
  }
  .categorySelectList {
    width: 200px;
    border: 1px solid #dddee1;
    &:hover {
      border: 1px solid #dddee1;
    }
    a {
      display: block;
      margin-bottom: 1em;
      color: inherit;
    }
  }
  .baseAttr {
    .ivu-form-item {
      display: inline-block;
      width: 250px;
      &.saleEmpower {
        width: 100%;
      }
      &.status {
        width: 100%;
      }
    }
  }

  .SkuPrice,
  .SkuAttrList {
    margin-left: 2em;
  }
  .ivu-checkbox-wrapper {
    .ivu-input-wrapper {
      width: 8em;
    }
  }

  .ivu-table-header {
    thead {
      th {
        .input {
          display: none;
        }
        &:hover {
          .title {
            display: none;
          }
          .input {
            display: inline-block;
          }
        }
      }
    }
  }
  .loading {
    &:before {
      display: inline-block;
      content: "";
      width: 50px;
      height: 50px;
      background: #2d8cf0;
      border-radius: 100%;
      animation: loading 1s infinite;
      position: absolute;
      top: 50%;
      left: 50%;
      margin-left: -25px;
      margin-top: -25px;
      z-index: 10;
    }
    &:after {
      display: inline-block;
      content: "";
      width: 100%;
      height: 100%;
      background: rgba(255, 255, 255, 0.8);
      position: absolute;
      left: 0;
      top: 0;
    }
  }
  @keyframes loading {
    0% {
      transform: scale(0);
      opacity: 1;
    }
    20% {
      transform: scale(0.2);
      opacity: 0.8;
    }
    40% {
      transform: scale(0.4);
      opacity: 0.6;
    }
    60% {
      transform: scale(0.6);
      opacity: 0.4;
    }
    80% {
      transform: scale(0.8);
      opacity: 0.2;
    }
    100% {
      transform: scale(1);
      opacity: 0;
    }
  }
}
</style>
