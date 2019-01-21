<template>
  <div
    class="daily_container block"
>
    <!-- 操作 -->
    <div class="daily_header block">
      <!-- 日历 -->
      <div class="daily_date block">
        <span class="demonstration">日期：</span>
        <el-date-picker
          v-model="time"
          type="daterange"
          align="left"

          unlink-panels
          value-format="yyyy-MM-dd"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          :picker-options="pickerOptions">
        </el-date-picker>
      </div>
      <div class="daily_date block">
        <span class="demonstration">人员名称：</span>
        <el-input v-model="system_log.username" class="user_pt" placeholder="人员名称" ></el-input>
      </div>
      <!-- 操作 -->
      <div class="select_desc">
        <span class="demonstration">行为对象：</span>
        <el-select v-model="system_log.action" placeholder="操作描述" @change="Searstatus">
          <el-option
            v-for="item in actions"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </div>
      <!-- 搜索、重置 -->
      <div>
      <el-button type="primary" icon="el-icon-search" size="medium" class="daily_search" @click="search" round>搜索</el-button>
      <el-button type="info" icon="el-icon-refresh" size="medium" class="daily_reset" @click="reset" round>重置</el-button>
      </div>
    </div>

    <!-- 数据表单及分页 -->
    <div class="daily_content">
      <!-- 表单 -->
      <div class="daily_table">
        <el-table
          :data="tableData"
          highlight-current-row
          height="100%"
          style="width:100%;">
          <el-table-column prop="index"  head-align="center" align="center" label="序号"></el-table-column>
          <el-table-column prop="created_date" label="日期" head-align="center" align="center"></el-table-column>
          <el-table-column prop="created_time" label="时间" head-align="center" align="center"></el-table-column>
          <el-table-column property="username" label="姓名" head-align="center" align="center"></el-table-column>
          <el-table-column property="ip" label="ip" head-align="center" align="center"></el-table-column>
          <el-table-column property="action"  label="行为对象" head-align="center" align="center"></el-table-column>
          <el-table-column  property="operationmodule"  label="操作描述" head-align="center" align="center"></el-table-column>
        </el-table>
      </div>
      <!-- 分页 -->
      <div class="daily_pages block">
        <el-pagination
          background
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page.sync="currentPage"

          :page-size="pagesize"
          layout="total, prev, pager, next, jumper"
          :total="totalCount">
        </el-pagination>
      </div>
    </div>
  </div>
</template>

<script src="./index.js"></script>
<style rel="stylesheet/scss" lang="scss"  src="./style.scss" scoped></style>
