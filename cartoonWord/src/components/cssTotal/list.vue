<template>

    <div class="page simpleList printBox" :class="pageClass">

      <div class="innerBorder ListfullHeight AllPrint" >

        <h1 align="center">石料出库单</h1>

       <!-- <Button class="noprint" type="ghost" size="small"  @click="activePrintTwo">打印2</Button>-->

        <div class="info" >

            <table cellpadding="1" align="center" :model="formData">

                <tr>

                    <td class='colNoOne'>客&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;户：<span>{{formData.MemberName}}</span></td>

                    <td class='colNoTwo'>出库日期：<span>{{formData.DeliveryDate}}</span></td>

                    <td class='colNoThree'>出库单号：<span>{{formData.StoneDuctoutNo}}</span></td>

                </tr>

                <tr>

                    <td class='colNoOne'>石料类型：<span>{{formData.StoneTypeName}}</span></td>

                    <td class='colNoTwo'>关联单据：<span>{{formData.RelevanceBills}}</span></td>

                    <td class='colNoThree'>说&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;明：<span>{{formData.Remark}}</span></td>

                </tr>

            </table>

        </div>

        <div class='borderAll' >

            <Table border class='tableWidth' :columns="cols" :data="list" id="print" ref="table"></Table>

            <Button class="noprint" type="ghost" size="large"  @click="activePrint">打印</Button>

        </div>

          

        <Card class="orderInfo">
            <table style="width: 100%;">

                    <tr>

                        <td>

                            <label>经手: <span>{{formData.HandlerName}}</span></label>

                        </td>

                        <td><label>制单人: <span>{{formData.CreateName}}</span></label></td>

                        <td><label>审核人: <span>{{formData.Auditor}}</span></label></td>

                        <td><label>复核 : <span> </span></label></td>

                        <!--<td ><label>第 1-1 页 <span></span></label></td>-->

                    </tr>

            </table>
        </Card>

      </div>

    </div>

</template>



<script>

    export default {

        name: 'printStoneOut',

        data () {

            return {

                pageClass: '',

                userName: '吃屁',

                formData: {

                    StoneDuctoutNo: '',

                    MemberName: '',

                    HandlerName: '',

                    StoneTypeName: '',

                    Auditor: '',

                    BusinessDate: '',

                    DeliveryDate: '',

                    RelevanceBills: '',

                    CreateName: '',

                    Remark: '',

                    nowData: '',	

                    details: []

                },

                listDataSelected: [],

                list: [],

                cols: [],

                ProStone:[],

                pager: {

                    pageIndex: 1,

                    pageSize: 15,

                    total: 0

                }

            }

        },

        methods: {

            activePrintTwo (){

                window.print();

            },

            activePrint (){

                    let AllPrint = $(".AllPrint").html();

                    let oPop = window.open('','oPop');  

                    let str = '<!DOCTYPE html>'  

                        str +='<html>'  

                        str +='<head>'  

                        str +='<meta charset="utf-8">'  

                        str +='<meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">'  

                        str+='<style>'; 

                        str+= '.noprint{display:none;}';

                        str+='.info{margin:1% 0 0;}.AllPrint{width:100%;}h1{text-align:center;}.info{width:100%;margin:1% 0 0;font-size:15px;}.info>table{width:100%;font-size:13px;}.colNoOne,.colNoTwo,.colNoThree{text-align:left;}.colNoOne{width:40%;}.colNoTwo{width:40%;}.colNoThree{width:20%;}.borderAll{width:100%;font-size:15px;} .ivu-table th,.ivu-table td{height:30px;font-weight:normal;}th .ivu-table-cell{padding:0;}.ivu-table-wrapper{border-left:1px solid black;border-bottom:0;border-right:0;}.ivu-table-cell{text-align:center;padding:5px 0;}.ivu-table-border th,.ivu-table-border td{border-bottom:1px solid black;border-right:1px solid black;}.ivu-table-border th{border-top:1px solid black;}'; 

                        str+='</style>';  

                        str +='</head>'

                        str +='<body>'  

                        str +='</body>'  

                        str +='</html>'     

                    oPop.document.write(str);

                    oPop.document.body.innerHTML=AllPrint; 

                    oPop.print();  

                    oPop.close(); 

            },

            changeTime (time){              

                if(time.toLocaleDateString){

                    var dateStr = time.toLocaleDateString();

                    dateStr = dateStr.replace(/\//g,'/');

                    var timeStr = time.toTimeString();

                    timeStr = timeStr.substring(0,5);

                    return dateStr + ' ' +timeStr;

                }else{

                    return time;                    

                }

            },

            isElementType (str, type) {

                return str.split('|')[0] == type;

            },

            getElementType (str) {

                return str.split('|')[1];

            },

            pageChange (currentPage) {

                // this.pager.pageIndex = currentPage;

                this.search(currentPage);

            },

            pageSizeChange (pageSize) {

                this.pager.pageSize = pageSize;

                this.search();

            },

            createTable (tableModel) {

                let cols = [];

                _.each(tableModel, item => {

                    let option = {

                        title: item.name,

                        key: item.key,

                        width: item.width,

                        align: item.align

                    }

                    if(item.createRender){

                        option.render = item.createRender(this);

                    }

                    cols.push(option);

                });

                this.cols = cols;

            },

            getList (id) {

                // let myFormData = {

                //     Id: id

                // };

                // _.extend(myFormData, this.pager);

                // delete myFormData.total;



                // const loader = this.$Message.loading({

                //     content: '正在加载中...',

                //     duration: 0

                // });

                // Site.get({

                //     url: Site.api.productStoneOut.getBulkPrint,

                //     data: myFormData

                // }).done(res => {

                //     loader()

                    let data = {
                                "StoneDuctoutNo":"LSCK17122618105380",
                                "MemberName":"中国黄金",
                                "HandlerName":"李四",
                                "StoneTypeName":"散货",
                                "Auditor":"贝奇",
                                "BusinessDate":"2017-12-26T00:00:00",
                                "DeliveryDate":"2017-12-21T00:00:00",
                                "RelevanceBills":"123",
                                "CreateName":"tick",
                                "Remark":"4444",
                                "PrintNum":0,
                                "details":[
                                    {
                                            "StoneNO":"123/tongbao001",
                                            "WarehouseName":"华南仓",
                                            "WarShelfName":"华南二库",
                                            "Color":"H",
                                            "Shape":"圆形",
                                            "Cleanliness":"VS",
                                            "Weight":0.01,
                                            "Quantity":2,
                                            "TotalWeight":0.3,
                                            "SalePrice":12400,
                                            "SaleTotalPrice":3720,
                                            "Remark":null
                                    },
                                    {
                                            "StoneNO":"j/tongbao001",
                                            "WarehouseName":"华南仓",
                                            "WarShelfName":"华南二库",
                                            "Color":"M-N",
                                            "Shape":"方形",
                                            "Cleanliness":"SI",
                                            "Weight":1.5,
                                            "Quantity":2,
                                            "TotalWeight":0.2,
                                            "SalePrice":11520,
                                            "SaleTotalPrice":2304,
                                            "Remark":null
                                    },{
                                            "StoneNO":"123/tongbao001",
                                            "WarehouseName":"华南仓",
                                            "WarShelfName":"华南二库",
                                            "Color":"H",
                                            "Shape":"圆形",
                                            "Cleanliness":"VS",
                                            "Weight":0.01,
                                            "Quantity":2,
                                            "TotalWeight":0.3,
                                            "SalePrice":12400,
                                            "SaleTotalPrice":3720,
                                            "Remark":null
                                    },
                                    {
                                            "StoneNO":"j/tongbao001",
                                            "WarehouseName":"华南仓",
                                            "WarShelfName":"华南二库",
                                            "Color":"M-N",
                                            "Shape":"方形",
                                            "Cleanliness":"SI",
                                            "Weight":1.5,
                                            "Quantity":2,
                                            "TotalWeight":0.2,
                                            "SalePrice":11520,
                                            "SaleTotalPrice":2304,
                                            "Remark":null
                                    },{
                                            "StoneNO":"123/tongbao001",
                                            "WarehouseName":"华南仓",
                                            "WarShelfName":"华南二库",
                                            "Color":"H",
                                            "Shape":"圆形",
                                            "Cleanliness":"VS",
                                            "Weight":0.01,
                                            "Quantity":2,
                                            "TotalWeight":0.3,
                                            "SalePrice":12400,
                                            "SaleTotalPrice":3720,
                                            "Remark":null
                                    },
                                    {
                                            "StoneNO":"j/tongbao001",
                                            "WarehouseName":"华南仓",
                                            "WarShelfName":"华南二库",
                                            "Color":"M-N",
                                            "Shape":"方形",
                                            "Cleanliness":"SI",
                                            "Weight":1.5,
                                            "Quantity":2,
                                            "TotalWeight":0.2,
                                            "SalePrice":11520,
                                            "SaleTotalPrice":2304,
                                            "Remark":null
                                    }
                                ]
                        },
                        list = [];
                    this.formData = data;

                    if(data){

                        if(data.DeliveryDate){

                            this.formData.DeliveryDate = (data.DeliveryDate).substring(0,10);

                        }

                        _.each(data.details,(item,index) =>{

                            if(!item._rowType){

                                item._index = index;

                            } 

                        })

                        this.list = data.details;

                        this.list.push({

                            _rowType: 'total'

                        })

                        this.formData.nowData = this.changeTime(new Date());

                    }    

                // }).fail(err => {

                //     loader()

                //     this.$Message.error(err.message || '请求失败');

                // })

            }

        },

        created () {

            this.pageClass = page.pageName;

            this.createTable(page.tableModel);

            if(this.$route.params.id){

                this.formData.id = this.$route.params.id;

                this.getList(this.$route.params.id);

            }
            this.getList(2);

        }

    }





const page = {

    pageName: 'printStoneOut',

    searchModel: [],

    tableModel: [

        {

            key: 'index',

            name: '序号',

            align: 'center',

            width: 70,

            fixed: 'left',

            createRender (vm) {

                return function (h, data) {

                    let i ;

                    if(data.row.StoneNO){

                        i = data.row._index + 1;

                    }else{

                        i = '';

                    }

                    return i ;

                }

            }

        },{

            key: 'StoneNO',

            name: '石料码',

            width: 150,

            createRender (vm) {

                return function (h, data) {

                    if(!data.row._rowType){

                        return data.row.StoneNO

                    }

                }

            }

        },{

            key: 'Weight',

            name: '规格',

            width: 100

        },{

            key: 'WarehouseName',

            name: '仓库',

            width: 150

        },{

            key: 'WarShelfName',

            name: '库位',

            width: 150

        },{

            key: 'Shape',

            name: '形状'

        },{

            key: 'Color',

            name: '颜色'

        },{

            key: 'Cleanliness',

            name: '净度',

            createRender (vm){

                return function (h,data){

                    if(data.row._rowType != null && data.row._rowType == 'total'){

                        return '合计';

                    }else{

                        return data.row.Cleanliness 

                    }

                }

            }

        },{

            key: 'TotalWeight',

            name: '总重量(ct)',

            createRender (vm){

                return function (h,data){

                    if(data.row.TotalWeight){

                        let TotalWeight = data.row.TotalWeight;

                        return Number(TotalWeight).toFixed(3);

                    }

                    if(data.row._rowType != null){

                        let TotalWeightTotal = 0;

                        _.each(vm.formData.details, item => {

                            if(item._rowType == null){

                                if(item.TotalWeight){ 

                                    TotalWeightTotal += item.TotalWeight;

                                }

                            }

                        });

                        TotalWeightTotal = Number(TotalWeightTotal).toFixed(3);

                        return TotalWeightTotal

                    }

                }

            }

        },

        {

            key: 'Quantity',

            name: '数量',

            createRender (vm){

                return function (h,data){

                    if(data.row.Quantity){

                        let Quantity = data.row.Quantity;

                        return Number(Quantity);

                    }

                    if(data.row._rowType != null){

                        let QuantityTotal = 0;

                        _.each(vm.formData.details, item => {

                            if(item._rowType == null){

                                if(item.Quantity){ 

                                    QuantityTotal += item.Quantity;

                                }

                            }

                        });

                        QuantityTotal = Number(QuantityTotal);

                        return QuantityTotal

                    }

                }

            }

        },{

            key: 'SalePrice',

            name: '克拉单价',

            createRender (vm){

                return function (h,data){

                    if(data.row._rowType != null && data.row._rowType == 'total'){

                        return '总计';

                    }else{

                        return data.row.SalePrice 

                    }

                }

            }

        },{

            key: 'SaleTotalPrice',

            name: '金额',

            createRender (vm){

                return function (h,data){

                    if(data.row._rowType == null){

                        if(data.row.SaleTotalPrice){

                            let SaleTotalPrice = Number(data.row.SaleTotalPrice).toFixed(2);

                            return SaleTotalPrice

                        }else{

                            return '0.00'

                        }

                    }

                    if(data.row._rowType != null){

                        let TotalSalePrice = 0;

                        _.each(vm.formData.details, item => {

                            if(item._rowType == null){

                                if(item.SaleTotalPrice){

                                    TotalSalePrice += Number(item.SaleTotalPrice);

                                }

                            }

                        });

                        TotalSalePrice = Number(TotalSalePrice).toFixed(2);

                        return TotalSalePrice

                    }

                    

                }

            }

        },{

            key: 'Remark',

            name: '备注',

            width: 250

        }

    ]

}

</script>



<style scoped>

.noprint{

    float: right;

}

.tableSwitch{

    position: relative;

    display: inline-block;
}


.tableSwitch  .switchMask{

        position: absolute;

        left: 0;

        top: 0;

        right: 0;

        bottom: 0;

    }

.orderInfo{

    padding-top: 5px;

    padding-bottom: 0;

}

.orderInfo  table td {

    text-align: center;

}

.info{

    margin:1% 0 0;

}
.AllPrint{
  width: 100%;
}
h1{
  text-align: center;
}
.info{
  width: 100%;
  margin:1% 0 0;
  font-size:15px;
}
.info>table{
    width: 100%;
    font-size:13px;
}
.colNoOne,.colNoTwo,.colNoThree{
    text-align: left;
}
.colNoOne{
    width: 40%;
}
.colNoTwo{
    width: 40%;
}
.colNoThree{
    width: 20%;
}
.borderAll {
  width:100%;
  font-size:15px;
}
.orderInfo {
  width:95%;
  margin-top: 10px;
  font-size:15px;
}
.orderInfo table td {
  text-align:center;
}
.borderAll table{
    border: 1px solid red;
    width: 100% !important;
}


 /* .ivu-table th,.ivu-table td {
  height:30px;
  font-weight:normal;
}
th .ivu-table-cell {
  padding:0;
}
.ivu-table-wrapper {
  border-bottom:0;
  border-right:0;
}
.ivu-table-cell {
  text-align:center;
  padding:5px 0;
}
.ivu-table-border th,.ivu-table-border td {
  border-bottom:1px solid black;
  border-right:1px solid black;
}
.ivu-table-border th {
  border-top:1px solid black;
}  */

</style>

