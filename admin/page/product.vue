<template>
    <div>
        <el-table
                :data="products"
                style="width: 100%">
            <el-table-column
                    prop="product_id"
                    label="产品ID"
                    width="180">
            </el-table-column>
            <el-table-column
                    prop="name"
                    label="产品名称">
            </el-table-column>
        </el-table>
    </div>
</template>

<script>
    export default {
        mounted: function () {
            this.$http.get('/product/_all', {}, {
                emulateJSON: true
            }).then(function(response) {
                this.products = response.data;
            }, function(response) {
                console.log(response)
            });
        },
        data () {
            return {
                products: []
            }
        }
    }
</script>

<style>
</style>
