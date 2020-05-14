<template>
    <div>
        <div class="container">
            <div class="handle-box">
                <!-- <el-select v-model="query.address" placeholder="地址" class="handle-select mr10">
                    <el-option key="1" label="广东省" value="广东省"></el-option>
                    <el-option key="2" label="湖南省" value="湖南省"></el-option>
                </el-select>-->
                <el-input v-model="query.module" placeholder="模块名" class="handle-input mr10"></el-input>
                <el-date-picker
                    v-model="query.sedate"
                    type="daterange"
                    range-separator="至"
                    start-placeholder="开始日期"
                    end-placeholder="结束日期"
                    value-format='yyyy-MM-dd'
                ></el-date-picker>
                <el-button type="primary" icon="el-icon-search" @click="handleSearch">搜索</el-button>
            </div>
            <el-table
                :data="tableData"
                border
                class="table"
                ref="multipleTable"
                header-cell-class-name="table-header"
            >
                <!-- <el-table-column type="selection" width="55" align="center"></el-table-column> -->
                <el-table-column prop="operateIp" label="ip" align="center"></el-table-column>
                <el-table-column prop="operateUrl" label="url" align="center"></el-table-column>
                <el-table-column prop="operateMethod" label="method" align="center"></el-table-column>
                <el-table-column prop="operateModule" label="模块" width="150" align="center"></el-table-column>
                <el-table-column prop="operateUserName" label="操作用户" width="150" align="center"></el-table-column>
                <el-table-column prop="operateAction" label="操作内容" align="center"></el-table-column>
                <el-table-column prop="operateTime" label="操作时间" align="center"></el-table-column>
            </el-table>
            <div class="pagination">
                <el-pagination
                    background
                    layout="sizes, prev,pager, next,total,jumper"
                    :current-page="query.current"
                    :page-size="query.size"
                    :total="pageTotal"
                    @current-change="handlePageChange"
                    @size-change="handleSizeChage"
                ></el-pagination>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'operateLog',
    data() {
        return {
            query: {
                module: '',
                sedate: '',
                startDate:null,
                endDate:null,
                current: 1,
                size: 10
            },
            tableData: [],
            multipleSelection: [],
            delList: [],
            editVisible: false,
            pageTotal: 0,
            form: {},
            idx: -1,
            id: -1
        };
    },
    created() {
        this.getData();
    },
    methods: {
        // 获取数据
        getData() {
            this.handDate();
            this.$post('/operate/log/list', this.query, true).then(res => {
                if (res.code == 200) {
                    this.tableData = res.data.records;
                    this.pageTotal = res.data.total || 50;
                } else {
                    this.$message.error(res.msg);
                }
            });
        },
        //处理日期
        handDate(){
            if(this.query.sedate){
            this.query.startDate=this.query.sedate[0];
            this.query.endDate=this.query.sedate[1];
            }else{
                this.query.startDate='';
                this.query.endDate='';
            }
        },
        // 触发搜索按钮
        handleSearch() {
            this.$set(this.query, 'current', 1);
            this.getData();
        },

        // 改变当前页数(current)大小
        handlePageChange(val) {
            this.$set(this.query, 'current', val);
            this.getData();
        },
        //改变每页条数(size)大小
        handleSizeChage(val) {
            this.$set(this.query, 'size', val);
            this.getData();
        }
    }
};
</script>

<style scoped>
.handle-box {
    margin-bottom: 20px;
}

.handle-select {
    width: 120px;
}

.handle-input {
    width: 300px;
    display: inline-block;
}
.table {
    width: 100%;
    font-size: 14px;
}
.red {
    color: #ff0000;
}
.mr10 {
    margin-right: 10px;
}
.table-td-thumb {
    display: block;
    margin: auto;
    width: 40px;
    height: 40px;
}
</style>
