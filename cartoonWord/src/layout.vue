<template>
    <div id="layout">
        <div id="header">
            <div id="logo">cartoon管理系统</div>

        </div>
        <div id="content">
            <div id="sidebar">
                <Menu active-name="1-2" theme="dark" width="auto" :open-names="['1']">
                    <div class="layout-logo-left"></div>
                    <Submenu name="1">
                        <template slot="title">
                            <Icon type="ios-navigate"></Icon>
                            动漫
                        </template>
                        <MenuItem name="1-1">国漫</MenuItem>
                        <MenuItem name="1-2">日漫</MenuItem>
                        <MenuItem name="1-3">美漫</MenuItem>
                    </Submenu>
                    <Submenu name="2">
                        <template slot="title">
                            <Icon type="ios-keypad"></Icon>
                            动画
                        </template>
                        <MenuItem name="2-1">3D</MenuItem>
                        <MenuItem name="2-2">童年</MenuItem>
                    </Submenu>
                    <Submenu name="3">
                        <template slot="title">
                            <Icon type="ios-analytics"></Icon>
                            漫画
                        </template>
                        <MenuItem name="3-1">快看漫画</MenuItem>
                        <MenuItem name="3-2">知音漫客</MenuItem>
                    </Submenu>
                </Menu>
            </div>
            <div id="face">
                <router-view id="main" ></router-view>
               <!-- <Tabs type="card" closable :animated='false' @on-tab-remove="handleTabRemove">
                    <TabPane label='动漫'>

                    </TabPane>
                    <TabPane label='动画'>动画</TabPane>
                    <TabPane label='漫画'>漫画</TabPane>
                </Tabs>-->
            </div>
        </div>
        <div id="footer">
            <span id="center">Copyright &copy; 2017-2027 聊城高新区末桐之花动漫有限公司</span>
        </div>
    </div>
</template>
<script>
    export default {
        name: 'layout',
        data (){
            return {
                
            }
        },
        methods: {
            handleTabRemove (name){
                console.log(name);
            }
        }
    }
</script>
<style scoped>
html,body{
    height: 100%;
}
#app,#layout{
    height: 100%;
}
#logo{
    float: left;
    width: 180px !important;
    margin: auto;
    line-height: 50px;
    font-size: 1.8em;
}
  #header{
    position: fixed;
    height: 50px;
    width: 100%;
    color: #fff;
    background: #373d41;
    z-index: 1000;
    top: 0;
  }
#sidebar{
    position: fixed;
    top: 50px;
    left: 0;
    width: 180px;
    height: calc(100% - 50px - 31px);
    background: #333744;
    overflow: auto;
}

#breadcrumb{
    position: fixed;
    top: 97px;
    left: 180px;
    padding: 10px 10px 0 10px;
    width: calc(100% - 180px);
    font-size: 12px;
    background: #fff;
    display: none;
}
#content{
    padding: 97px 0 0 180px;
    height: 100%;
}
#main{
    position: fixed;
    left: 180px;
    top: 97px;
    right: 0;
    bottom: 30px;
    padding: 15px;
    overflow: auto;
}
#footer{
    position: fixed;
    bottom: 0;
    height: 30px;
    width: 100%;
    border-top: 1px solid #dddee1;
    line-height: 30px;
    background: #fff;
    
}
#footer .left{
        float: left;
        margin-left: 1em;
    }
    #footer .right{
        float: right;
        margin-right: 1em;
    }
#face{
    width: 100%;
    position: fixed;
    top: 60px;
    left: 190px;
    /* border: 1px solid red; */
}
</style>

