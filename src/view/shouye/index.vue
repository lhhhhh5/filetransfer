<script setup lang="ts">

import { routerKey, useRouter } from 'vue-router';

const router = useRouter();
const goToUpload = () => {
  router.push('/upload');
};
const goToDownload = () => {
  router.push('/download');
};


</script>

<template>

<el-row style="width:100%;margin:auto ;margin-top: 50px" :gutter="20">
  <el-col :span="24">
    <el-card shadow="always" style="background-color: #f5f5f4;">
      <div class="card-content">
        <h1 style="text-align: center">欢迎使用文件传输工具</h1>
        <p style="text-align: center">这是一个简单易用的文件传输工具，帮助你快速上传和下载文件。</p>
      </div>
    </el-card>
  </el-col>
</el-row>
<el-row style="height:100% ;width:100%;margin:auto ;margin-top: 50px" :gutter="20" justify="center">
  <el-col :span="10">
    <el-card shadow="hover" style="background-color: blanchedalmond;">
       <router-link to="/upload" style="text-decoration: none; color: inherit;">
          <h2 style="text-align: center">上传文件</h2>
        </router-link>

    </el-card>
  </el-col>

  <el-col :span="10">
    <el-card shadow="hover"  style="background-color: blanchedalmond;">
      
        <div class="card-content">
          <router-link to="/download" style="text-decoration: none; color: inherit;">
            <h2 style="text-align: center">下载文件</h2>
          </router-link>
        </div>
    </el-card>
  </el-col>
</el-row>

</template>

<style lang="scss" scoped>

</style>