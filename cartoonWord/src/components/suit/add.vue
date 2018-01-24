<template>
    <pageEdit :page="page"></pageEdit>
</template>

<script>
    import pageEdit from '@/suit/edit'
    export default {
        name: 'suitAdd',
        components: {
            pageEdit
        },
        data () {
            return {
                page
            }
        }
    }

let page = {
    pageName: 'suitAdd'
}

</script>

<style lang="scss">

</style>
