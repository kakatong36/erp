

// const ORIGIN = 'http://192.168.0.191:9085';
let api = {
    // uploadUrl: ORIGIN + '/service/resource/', //上传文件的获取接口
    // upfile: ORIGIN + '/service/Resource/Resource_api_ResourceManager', //上传接口
    // upfileBaseUrl: ORIGIN + '/Resource/Resource/Resource_GetResource_', //上传文件的获取接口

    // preUrl: ORIGIN + '/service/path/',
    // logout: ORIGIN + '/auth/logout',
    // member: {
    //     create: 'system_Api_Member_Create',
    //     modify: 'system_Api_Member_Modify',
    //     list: 'system_Api_Member_Search',
    //     delete: 'system_Api_Member_DeleteBatch',
    //     get: 'system_Api_Member_Get',
    //     dropList: 'system_Api_Member_DropList',
    //     searchPrice: 'system_Api_Member_SearchPrice',
    //     category: 'system_Api_Member_GetCategoryDropList',
    //     getByMobile: 'system_Api_Member_GetByMobile'
    // }
}

/*
_.each(api, (value, key) => {
    _.each(api_twn, (value2, key2) => {
        if(key == key2){
            _.extend(api[key], api_twn[key]);
        }
    });
});
_.each(api, (value, key) => {
    _.each(api_zwt, (value2, key2) => {
        if(key == key2){
            _.extend(api[key], api_zwt[key]);
        }
    });
});
_.each(api, (value, key) => {
    _.each(api_hjh, (value2, key2) => {
        if(key == key2){
            _.extend(api[key], api_hjh[key]);
        }
    });
});
*/

// _.extend(api)
export default api


/*

用户注册步骤-UserCenter
1 /Api/UnifyUser/CreateMemberUser
2 /Api/UnifyUser/Login
3 /Api/Merchant/Create
4 /Api/Merchant/GetList (admin权限)
5 /Api/Merchant/ModifyStatus (admin权限)
6 /Api/ErpInfo/Create
7 /Api/ErpInfo/GetList (admin权限)

8 /Api/ErpInfo/ModifyStatus (admin权限)
9 /Api/UnifyUser/LoginSystem

*/