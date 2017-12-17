<template>
    <div>
        <h1>这是首页</h1>
    </div>
</template>

<script>
export default {
    name: 'home',
    data (){
        return {
           dataArr: [
               {name: '小张',age: '20'},
               {name: '小宇',age: '21'}
           ] 
        }
    },
    methods: {
        test (){
            let cloneArr = _.cloneDeep(this.dataArr);
            // console.log(this.dataArr[0],cloneArr[0])
            // console.log(cloneArr[0] === this.dataArr[0]);
        }
    },
    created (){
        this.test()
    }
}
</script>

<style>

</style>


