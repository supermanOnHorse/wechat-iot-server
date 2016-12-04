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
            <el-table-column
                    inline-template
                    label="操作"
                    width="180">
                <v-link href="/device/{{row.product_id}}">
                    <el-button type="text" size="small">
                        查看对应设备
                    </el-button>
                </v-link>
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
