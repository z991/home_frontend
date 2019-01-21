<template>
  <div class="daily_container block">

    <div style="width:95%;margin:0 auto;" v-if="!putType">
    <!-- fiter查询 -->
    <!-- 添加 -->
       <div style="height:50px;" class="header_sear">
          <div style="float:left;width:600px;">
        <el-input placeholder="请输入内容" v-model="group.roleSer" class="input-with-select" >
     <el-button slot="append" icon="el-icon-search"></el-button>
    </el-input>
    </div>
        <div style="float:right;">
          <el-button @click="addRole(role_sear)" type="primary" round><i class="el-icon-plus"></i> {{roleMessage}}</el-button>{{group.role}}
          <el-button type="primary" round @click="prveroleType" v-if="!role_sear">返回上一级</el-button>
        </div>
    </div>
    </div>

    <!-- 角色model -->
    <div v-if="!role_sear && !putType" style="height:100%;">
    <p style="width:95%;margin: 20px auto">
      <span>该系统名称：</span>
      <el-input placeholder="系统名称" style="width:512px;" v-model="systemName.new" :disabled="lockSystem" title="权限列表的人才能对名称修改" ></el-input>
      <el-button type="primary" class="amend" @click="revampSystem()">修改</el-button>
    </p>
    <el-table  height="calc(100% - 160px)"
    :data="roleChidrenList.slice((currentPage-1)*pagesize,pagesize*currentPage)" v-if="!role_sear && !putType"
    style="width: 95%;margin:0 auto;overflow-y:auto;">
    <el-table-column
      label="序号"
      type="index"
      header-align="center"
      align="center"
      >
    </el-table-column>
    <el-table-column
      label="角色名称"
      prop="cn"
      header-align="center"
      align="center"
      >
    </el-table-column>
    <el-table-column
      label="操作"
      header-align="center"
      align="center"
      >
    <template  slot-scope="scope" >
      <el-popover
    placement="left"
    width="700"
    trigger="click">
  <el-table    v-loading="freeStyle" :data="gridData.slice((rolecurrentPage-1)*rolepagesize,rolepagesize*rolecurrentPage)" height="340">
    <el-table-column type="index"  label="序号" header-align="center" align="center"></el-table-column>
    <el-table-column  prop="cn" label="名称"  header-align="center" align="center"></el-table-column>
  </el-table>
        <div style="text-align:center;margin:10px  20px;" >
        <el-pagination
          background
          @size-change="handleSizeChange"
          @current-change="rolehandleCurrentChange"
          :current-page="rolecurrentPage"
          :page-size="rolepagesize"
          layout="total, prev, pager, next, jumper"
          :total="roletotalCount">
        </el-pagination>
      </div>
    <!-- <el-button type="primary"   slot="reference" @click="sear_role(scope.row.cn,role_sear)">查看</el-button> -->
  </el-popover>
        <el-button type="primary"  @click="put_role(scope.row.cn,role_sear,roleName)" v-if="superadmin">编辑</el-button>
        <el-button type="warning"  @click="role_put(scope.row.cn,roleName)" v-if="superadmin">修改</el-button>
        <el-button type="danger"  @click="delrole(scope.row.cn,role_sear)" v-if="superadmin">删除</el-button>
   </template>
    </el-table-column>
  </el-table>
        <div style="text-align:center;margin:10px  20px;" >
        <el-pagination
          background
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="currentPage"
          :page-size="pagesize"
          layout="total, prev, pager, next, jumper"
          :total="totalCount">
        </el-pagination>
      </div>
    </div>
    <div class="daily_content" v-if="role_sear">
      <!-- <el-button type="primary">修改该系统的名称</el-button> -->
      <!-- 系统model -->
      <div class="daily_table" >
        <el-table
          :data="roleList"
          highlight-current-row
          height="100%">
          <el-table-column type="index"  head-align="center" align="center" label="序号"></el-table-column>
          <el-table-column prop="cn" label="系统名称" head-align="center" align="center"></el-table-column>
          <el-table-column  label="操作" head-align="center" align="center">
            <template  slot-scope="scope">
              <el-button type="primary"  @click="sear_role(scope.row.cn,role_sear)">进入系统</el-button>

              <el-button type="warning"  @click="put_role(scope.row.cn,role_sear)" v-if="superadmin">修改</el-button>
              <el-button type="danger"  @click="delrole(scope.row.cn,role_sear)" v-if="superadmin">删除</el-button>
          </template>
          </el-table-column>
        </el-table>
      </div>

    </div>

    <!-- 用户模块修改 -->
    <div v-if="putType">
          <el-button type="primary" round  style="float:right;position:relative;right:100px;top:-50px;" @click="prverole">返回上一级</el-button>
          <p style="text-align: center; margin: 80px 0 20px">
              <span>角色名称</span>
              <el-input style="width:500px;" title="权限列表的人才能对名称修改" v-model="rolesNames.new" :disabled="lockRole"></el-input>
              <el-button type="primary" @click="revampRole(rolesNames.new)">修改</el-button>
          </p>
  <div style="text-align: center;">
    <el-transfer
      style="text-align: left; display: inline-block;"
      v-model="roleCreateList"
      filterable
      :left-default-checked="leftrole"
      :right-default-checked="rightrole"
      :render-content="renderFunc"
      :titles="['人员列表', '已有权限']"
      :format="{
        noChecked: '${total}',
        hasChecked: '${checked}/${total}'
      }"
      @change="handleChange(rolesNames.new,roleName,rolesgroup)"
      :data="rolesgroup">
      <span></span>
      <span slot-scope="{ option }">{{ option.key }} - {{ option.dn}}({{option.label}})</span>
      <!-- <el-button class="transfer-footer" slot="right-footer" size="small" @click="delterole()">保存</el-button>
      <el-button class="transfer-footer" slot="left-footer" size="small" @click="delterole()">保存</el-button> -->
    </el-transfer>

  </div>
    </div>

  </div>
</template>
<script src="./index.js"></script>
<style  lang="scss"  src="./style.scss" scoped></style>

<style>
.el-transfer-panel{
  width: 500px;
  height: 500px;
}
.el-transfer-panel__body{
  height: calc(100% - 40px);
  width: 105%;
}
.el-transfer-panel__filter {
  margin-right: 8%;
}
.el-transfer-panel__list.is-filterable {
  height: calc(100% - 50px);
}

@media screen and (min-width: 960px) and (min-width: 1199px) {
  .el-transfer-panel{
  width: 450px;
  height: 500px;
}
 }
</style>
