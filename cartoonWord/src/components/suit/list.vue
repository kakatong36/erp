<template>
    <div class="page simpleList mainPadding " :class="pageClass">
      <div class="innerBorder ListfullHeight">

        <Form ref="form" :model="formData" class="clearfix form-wrapper" :label-width="80" inline onsubmit="return false">
          <Form-item
            v-for="item in searchModel"
            :key="item.key"
            :label="item.name"
            :prop="item.key">
            <!-- style=" display: -webkit-box;display: -webkit-flex; display: -ms-flexbox; display: flex;" -->
            <div  v-if="isElementType(item.typeElem, 'input')">
                <Input v-model="formData[item.key]" :type="getElementType(item.typeElem)"  :autosize="true" :style="{'width':item.vlaueKey == 'area'?'56px':'136px'}"></Input>
                <span v-if='item.vlaueKey=="area"'>&nbsp; - &nbsp;</span>
                <Input v-model="formData[item.keyEnd]" :type="getElementType(item.typeElem)"  :autosize="true" style="width:56px" v-if='item.vlaueKey=="area"'></Input>
            </div>
            <Select v-model="formData[item.key]" clearable @on-change="item.changeCallback($event, item, formData)" v-else-if="isElementType(item.typeElem, 'select')">
              <Option
                v-for="optionItem in item.children"
                :key="optionItem.key"
                :value="optionItem.key">
                {{optionItem.value}}
              </Option>
            </Select>
            <Cascader  :data="item.children" v-model="formData[item.key]" v-else-if="isElementType(item.typeElem, 'cascader')"></Cascader>
            <Date-picker :style="{'width':getElementType(item.typeElem)=='daterange'?'185px':'100%'}" :type="getElementType(item.typeElem)" placeholder="选择日期" v-model="formData[item.key]" v-else-if="isElementType(item.typeElem, 'datePicker')"></Date-picker>
          </Form-item>

        </Form>
        <div class="tablebar">
          <Button type="primary" @click="openTab('add')">添加套装</Button>
          <Button type="ghost" @click="handleModifyStatusBatch('online')">一键操作可用</Button>
          <Button type="ghost" @click="handleModifyStatusBatch('offline')">一键操作不可用</Button>
          <Button type="ghost" @click="handleModifyStatusSell('online')">一键设置可代销</Button>
          <!-- <Button type="ghost">销量（锁定时间区间）</Button>
          <Button type="ghost">现货数量</Button>
          <Button type="ghost">售价（金工石）</Button>
          <Button type="ghost">上线时间</Button> -->
          <Button type="ghost" @click="search()">刷新</Button>
        </div>
		<jqTable ref="jqTable" @onRowSelect="setListDataSelected"></jqTable>
        <Page @on-change="pageChange" @on-page-size-change="pageSizeChange" :current="pager.pageIndex" :page-size="pager.pageSize" :total="pager.total" :page-size-opts="[10, 15, 20, 30, 40]" placement="top" show-sizer show-elevator show-total></Page>
      </div>
      <div class="fixed">
         <div class=" border-wrapper">
           <Button type="ghost"  html-type="submit" @click="search()">查询</Button>
         </div>
      </div>
        <Modal class="styleCenterImg styleCenterListImg" title="查看图片" v-model="isShowImg">
            <img :src="modalImgUrl" style="max-width: 100%;max-height: 100%;">
        </Modal>
    </div>
</template>

<script>
export default {
  name: "suit",
  data() {
    return {
      pageClass: "",
      formData: {},
      listDataSelected: [],
      list: [],
      cols: [],
      pager: {
        pageIndex: 1,
        pageSize: 15,
        total: 0
      },
      rabbetSize: [], //产品参数id,
      searchModel: [],

      isShowImg: false,
      modalImgUrl: null
    };
  },
  methods: {
    handleShowImg(e) {
      this.isShowImg = true;
      this.modalImgUrl = e.target.src;
    },
    isElementType(str, type) {
      return str.split("|")[0] == type;
    },
    getElementType(str) {
      return str.split("|")[1];
    },
    selectTag(val) {
      this.getRabbetSize(val[1]);
    },
    getRabbetSize(data, item) {
      let dtd = $.Deferred(),
        url = Site.api.select.getRabbetDropList;
      Site.get({
        url,
        data: { categoryId: data }
      }).done(res => {
        this.searchModel[7].childrenCallback(res);
      });
    },
    openTab(action, data) {
      switch (action) {
        case "add":
          this.$router.push({
            name: page.pageName + "Add"
          });
          break;
        case "edit":
          this.$router.push({
            name: page.pageName + "Edit",
            params: { id: data.row.Id }
          });
          break;
      }
    },
    pageChange(currentPage) {
      this.search(currentPage);
    },
    pageSizeChange(pageSize) {
      this.pager.pageSize = pageSize;
      this.search();
    },
    createSearchForm(searchModel) {
      let formData = {};
      _.each(searchModel, item => {
        if (item.defaultValue !== undefined) {
          formData[item.key] = item.defaultValue;
        } else {
          formData[item.key] = "";
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
              if (res.data.SuitTypeList) {
                list = res.data.SuitTypeList;
              } else {
                if (res.data[0]) {
                  list = res.data;
                } else if (res.data.data_list && res.data.data_list[0]) {
                  list = res.data.data_list;
                }
              }
              item.childrenCallback(list);
            }
          });
        }
      });
      this.searchModel = searchModel;
      this.formData = formData;
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
      let formData = _.extend({}, this.formData);
      _.each(formData, (value, key) => {
        if (value === "") delete formData[key];
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
                  formData["startDate"] =
                    value[0] && this.formatDate(value[0], "yyyy-MM-dd");
                  formData["endDate"] =
                    value[1] && this.formatDate(value[1], "yyyy-MM-dd");
                }
              }
            }
          });
          formData[key] = val === undefined ? value : val;
        }
      });
      delete formData.makeOrderTime;
      if (!formData.startDate) {
        delete formData.startDate;
      }
      if (!formData.endDate) {
        delete formData.endDate;
      }
      this.pager.pageIndex = pageIndex > 0 ? pageIndex : 1;
      // this.pager.pageIndex = 1;
      this.getList(formData);
      // formData 是查询所有值不为空时的变量的值
    },
    handleDelBatch() {
      let listDataSelected = this.listDataSelected;
      if (!listDataSelected[0]) {
        this.$Message.info("请至少选择一项数据!");
        return false;
      }
      this.$Modal.confirm({
        title: "提示",
        content: "要删除选中的数据吗?",
        loading: true,
        onOk: () => {
          let ids = [];
          _.each(listDataSelected, item => {
            ids.push(item.Id);
          });
          $.when(this.del(ids))
            .done(res => {
              this.search();
              this.$Message.success("删除成功!");
            })
            .fail(err => {
              this.$Message.error("删除失败!");
            })
            .always(() => {
              this.$Modal.remove();
            });
        }
      });
    },
    handleDel(data) {
      this.$Modal.confirm({
        title: "提示",
        content: '确定要删除"' + data.SuitName + '"吗?',
        loading: true,
        onOk: () => {
          $.when(this.del([data.Id]))
            .done(res => {
              this.search();
              this.$Message.success("删除成功!");
            })
            .fail(err => {
              this.$Message.error("删除失败!");
            })
            .always(() => {
              this.$Modal.remove();
            });
        }
      });
    },
    del(ids) {
      let dtd = $.Deferred(),
        url = Site.api.suit.delete,
        formData = { id : ids};
      Site.get({
        url: url,
        data: formData
      })
        .done(res => {
          dtd.resolve(res);
        })
        .fail(err => {
          dtd.reject(err);
        });
      return dtd;
    },
    handleModifyStatusBatch(state) {
      let listDataSelected = this.listDataSelected,
        str = "",
        url = "";
      // console.log(listDataSelected)
      if (state == "online") {
        str = "上架";
        url = Site.api.styleCenter.styleOnShelf;
      } else if (state == "offline") {
        str = "下架";
        url = Site.api.styleCenter.styleOffShelf;
      }
      if (!str) {
        this.$Message.info("未设置款式状态!");
        return false;
      }
      if (!listDataSelected[0]) {
        this.$Message.info("请至少选择一项数据!");
        return false;
      }
      this.$Modal.confirm({
        title: "提示",
        content: "选中的款式状态修改为" + str + "?",
        loading: true,
        onOk: () => {
          let list = { StyleList: [] };
          _.each(listDataSelected, item => {
            list.StyleList.push({
              StyleId: item.Id,
              StyleName: item.StyleName
            });
          });
          $.when(this.modifyStatus(list, url))
            .done(res => {
              this.search();
              this.$Message.success("修改成功!");
              this.listDataSelected = {};
            })
            .fail(err => {
              this.$Message.error("修改失败!");
            })
            .always(() => {
              this.$Modal.remove();
            });
        }
      });
    },
    handleModifyStatusSell(state) {
      let listDataSelected = this.listDataSelected,
        str = "",
        url = "";
      if (state == "online") {
        str = "开启代销";
        url = Site.api.styleConsignment.batchOperateConsignmentTure;
      } else if (state == "offline") {
        str = "取消代销";
        url = Site.api.styleConsignment.batchOperateConsignmentFalse;
      }
      if (!str) {
        this.$Message.info("未设置款式状态!");
        return false;
      }
      if (!listDataSelected[0]) {
        this.$Message.info("请至少选择一项数据!");
        return false;
      }
      this.$Modal.confirm({
        title: "提示",
        content: "选中的代销状态修改为" + str + "?",
        loading: true,
        onOk: () => {
          let list = { StyleIdList: [] };
          _.each(listDataSelected, item => {
            list.StyleIdList.push(item.Id);
          });
          $.when(this.modifyStatus(list, url))
            .done(res => {
              this.search();
              this.$Message.success("修改成功!");
              this.listDataSelected = {};
            })
            .fail(err => {
              this.$Message.error("修改失败!");
            })
            .always(() => {
              this.$Modal.remove();
            });
        }
      });
    },
    modifyStatus(list, url) {
      let dtd = $.Deferred(),
        formData = list;
      Site.post({
        url: url,
        data: formData
      })
        .done(res => {
          dtd.resolve(res);
        })
        .fail(err => {
          dtd.reject(err);
        });
      return dtd;
    },
    setListDataSelected(selection) {
      this.listDataSelected = selection;
    },
    getList(formData) {
      let myFormData = formData || {};
      _.extend(myFormData, this.pager);
      delete myFormData.total;
      this.list = [];
      const loader = this.$Message.loading({
        content: "正在加载中...",
        duration: 0
      });
      Site.get({
        url: Site.api.suit.getPageList,
        data: myFormData
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
            } else if (_.isArray(data)) list = data;
          } else {
            list = [];
            this.pager.total = 0;
          }
          this.list = list;
        })
        .fail(err => {
          loader();
          this.$Message.error(err.message || "请求失败");
          this.list = [];
          this.pager.total = 0;
        });
    }
  },
  watch: {
    list(newValue, oldValue) {
      this.$refs.jqTable.updata(newValue);
    }
  },
  created() {
    this.pageClass = page.pageName;
    this.createSearchForm(page.searchModel);
    this.getList();
    window.vm = this;
  },
  mounted() {
    this.createTable(page.tableModel);
  }
};
const page = {
  pageName: "suit",
  searchModel: [
    {
      key: "suitName",
      name: "套装名称",
      type: "string",
      typeElem: "input|text"
    },
    {
      key: "suitType",
      name: "套装类别",
      childrenApi: Site.api.suit.getSuitFormDrop,
      type: "string",
      typeElem: "select",
      children: [],
      childrenCallback(list) {
        loop(list, (this.children = []));
        function loop(list, children) {
          _.each(list, item => {
            let obj = {
              value: item.EnumDescription,
              key: item.EnumCode
            };
            children.push(obj);
            if (item.ChildList) loop(item.ChildList, (obj.children = []));
          });
        }
      }
    },
    {
      key: "isShelves",
      name: "是否上架",
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
      key: "goldSart",
      keyEnd: "goldEnd",
      name: "金重",
      type: "string",
      typeElem: "input|text",
      vlaueKey: "area"
    },
    {
      key: "priceStart",
      keyEnd: "priceStart",
      name: "销售价",
      type: "string",
      typeElem: "input|text",
      vlaueKey: "area"
    },
    {
      key: "dicPriceStart",
      keyEnd: "disPriceEnd",
      name: "折扣价",
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
  ],
  tableModel: [
    { text: "套装名称", datafield: "SuitName", width: 150 },
    { text: "套装类别名称", datafield: "SuitTypeName", width: 150 },
    {
      text: "主图",
      datafield: "MainImage",
      width: 50,
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
    { text: "分类名称", datafield: "CategoryName", width: 150 },
    { text: "金重", datafield: "GoldWeight", width: 80 },
    {
      text: "是否上架",
      datafield: "IsShelves",
      width: 80,
      cellsrenderer: function(
        index,
        fieldName,
        value,
        defaultHtml,
        column,
        rowData
      ) {
        return `<div class="cellContainer">${value ? "上架" : "下架"}</div>`;
      }
    },
    // { text: "上/下架日期", datafield: "ShelvesDate", width: 80 },
    { text: "套装价", datafield: "SuitPrice", width: 80 },
    { text: "折扣价", datafield: "DiscountPrice", width: 80 },
    {
      text: "是否允许代销",
      datafield: "IsAllowConsignment",
      width: 120,
      cellsrenderer: function(
        index,
        fieldName,
        value,
        defaultHtml,
        column,
        rowData
      ) {
        return `<div class="cellContainer">${value == true ? '是' : '否'}</div>`;
      }
    },
    { text: "创建人", datafield: "CreateAccount", width: 80 },
    { text: "创建时间", datafield: "CreateTime", width: 150 },
    {
      text: "销售平台配置",
      datafield: "_salePlatConf",
      width: 100,
      createRender(vm) {
        //绑定事件
        $(".suit").on(
          "click",
          `.jqTable button.salePlatConf`,
          function() {
            let index = $(".jqTable button.salePlatConf").index(this);
            let rowData = vm.$refs.jqTable.el.jqxGrid("getrowdatabyid", index);
            vm.$router.push({
              name: "styleCenterPlatConf",
              params: {
                styleId: rowData.Id
              }
            });
          }
        );

        return function(index, fieldName, value, defaultHtml, column, rowData) {
          return `<div class="cellContainer">
						<button class="ivu-btn ivu-btn-text ivu-btn-small salePlatConf">配置</button>
					</div>`;
        };
      }
    },
    {
      text: "操作",
      datafield: "_operate",
      width: 150,
      editable: false,
      createRender(vm) {
        //绑定事件
        $(".suit").on(
          "click",
          `.jqTable button.operateEdit`,
          function() {
            let index = $(".jqTable button.operateEdit").index(this);
            let rowData = vm.$refs.jqTable.el.jqxGrid("getrowdatabyid", index);
            vm.$router.push({
              name: page.pageName + "Edit",
              params: { id: rowData.Id }
            });
          }
        );
        $(".suit").on("click", `.jqTable button.operateDel`, function() {
          let index = $(".jqTable button.operateDel").index(this);
          let rowData = vm.$refs.jqTable.el.jqxGrid("getrowdatabyid", index);
          vm.handleDel(rowData);
        });

        return function(index, fieldName, value, defaultHtml, column, rowData) {
          return `<div class="cellContainer">
						<button class="ivu-btn ivu-btn-text ivu-btn-small operateEdit">编辑款式</button>
						<button class="ivu-btn ivu-btn-text ivu-btn-small operateDel">删除款式</button>
					</div>`;
        };
      }
    }
  ]
};
</script>

<style lang="scss">
.styleCenter {
  .ivu-table-cell {
    img {
      max-width: 3em;
      max-height: 3em;
    }
  }
}
.styleCenterListImg {
  .ivu-modal-body {
    display: flex;
    justify-content: center;
    align-items: center;
  }
}
.tableSwitch {
  position: relative;
  display: inline-block;
  .switchMask {
    position: absolute;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
  }
}
.ivu-form-item-error-tip {
  width: 200px !important;
}
</style>
