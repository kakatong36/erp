<template>
    <div id="layout">
        <div id="header">
            <div id="logo">cartoon管理系统</div>

        </div>
        <div id="content">
            <div id="sidebar">
                <Menu theme="dark" width="auto"  :active-name="openMenu" :open-names="['1']" @on-select='selectMenu'>
                    <div class="layout-logo-left"></div>
                    <Submenu name="1">
                        <template slot="title">
                            <Icon type="ios-navigate"></Icon>
                            表格
                        </template>
                        <MenuItem name="printStoneOut">打印界面</MenuItem>
                        <MenuItem name="commonList">表单验证</MenuItem>
                        <MenuItem name="detailField">测试打包</MenuItem>
                    </Submenu>
                </Menu>
            </div>
            <div id="face">
               <Tabs type="card" :animated='false' :value='currentTab' @on-click='changeTabs' @on-tab-remove="handleTabRemove">
					<TabPane v-for='item in tabs' :label='item.name' :key='item.key' :closable='item.key != "home"?true:false' :name='item.key'>
						<!-- 页面内容 -->
						<keep-alive><router-view id="main"></router-view></keep-alive>
					</TabPane>
                </Tabs>
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
				tabs: [{
					key: 'home',
					name: Site.menu['home']
				}],
				tabsKey: [],
				openMenu: '',
				currentTab: 'home'
            }
        },
        methods: {
            handleTabRemove (name){
				_.each(this.tabsKey, (val,index) =>{
					if(val == name){
						this.tabsKey.splice(index,1);
					}
				})
				// debugger
				_.each(this.tabs, (item,index) =>{
					if(item.key == name){
						this.tabs.splice(index,1)
					}
				})
				// console.log(this.tabs)
				this.$router.push({
					name: this.tabs[this.tabs.length - 1].key
				})
			},
			selectMenu(event){
				//返回菜单的name值
				this.currentTab = event;
				if(this.tabsKey.indexOf(event) == -1){
					this.tabsKey.push(event);
					this.tabs.push({
						key: event,
						name: Site.menu[event]
					})
				}
				//跳转路由
				this.$router.push({
					name: event
				})
			}, 
			changeTabs(event){
				this.currentTab = event;
				this.openMenu = event;
				this.$router.push({
					name: event
				})
			}
		},
		watch: {
			currentTab: {
				handler(val,oldVal){
					this.currentTab = val;
				}
			}
		},
		created(){
			window.vm = this;
			let routeName = this.$route.name;
			this.tabsKey.push(routeName);
			if(routeName != 'home'){
				this.tabs.push({
					key: routeName,
					name: Site.menu[routeName]
				})
			}
			this.currentTab = routeName;
			this.openMenu = routeName;
		},
		activated(){

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

