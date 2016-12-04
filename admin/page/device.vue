<template>
    <div>
        <el-button type="primary" @click="getDevice()">授权设备</el-button>
        <el-table
                :data="devices"
                style="width: 100%">
            <el-table-column
                    type="index"
                    width="180"
                    label="序号">
            </el-table-column>
            <el-table-column
                    prop="deviceid"
                    label="设备ID"
                    width="360">
            </el-table-column>
            <el-table-column
                    inline-template
                    label="操作">
                <el-button type="text" size="small" @click="showQr(row)">
                    查看二维码
                </el-button>
                <el-button type="text" size="small" @click="showLicense(row)">
                    查看证书
                </el-button>
            </el-table-column>
        </el-table>
        <el-dialog title="提示" v-model="dialogVisible" size="tiny">
            <span>授权成功</span>
            <span slot="footer" class="dialog-footer">
                <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
            </span>
        </el-dialog>
        <el-dialog title="二维码图片" v-model="qrDialogVisible" size="tiny">
            <img v-bind:src="imgSrc"/>
            <span slot="footer" class="dialog-footer">
                <el-button type="primary" @click="qrDialogVisible = false">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
    export default {
        mounted: function () {
            this.$http.get('/device/_all', {}, {
                emulateJSON: true
            }).then(function(response) {
                this.devices = response.data;
            }, function(response) {
                console.log(response)
            });
            this.product_id = this.$route.params.product_id;
        },
        data () {
            return {
                devices: [],
                product_id: "",
                dialogVisible: false,
                qrDialogVisible: false,
                imgSrc:"",
                licenseDialogVisible:false,
                license:""
            }
        },
        methods:{
            getDevice() {
                this.$http.get('/device/' + this.product_id + '/_init', {}, {
                    emulateJSON: true
                }).then(function(response) {
                    if(response.data.error_code == 0){
                        this.dialogVisible = true;
                    }
                }, function(response) {
                    console.log(response)
                });
            },
            showQr(row){
                this.imgSrc = "http://qr.liantu.com/api.php?text="+row.qrticket;
                this.qrDialogVisible = true;
            },
            showLicense(row){
                this.license = row.licence;
                this.licenseDialogVisible = true;
            }
        }
    }
</script>

<style>
</style>
