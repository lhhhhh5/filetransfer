<script setup lang="ts">
import { ref } from 'vue';

import { getFileDownload,deleteFileFromMinio } from '@/api/request';
import axios from 'axios';
const filekey = ref('');
const downloadLink = ref('');
import { ElNotification } from 'element-plus';

const downloadFileButton = async () => {
  try {
    const response = await getFileDownload(filekey.value);
    console.log('下载链接获取成功', response);
    const resBody = response.data;
    // 第一层判空
    if (!resBody || resBody.code !== 200) {
      alert("获取链接失败");
      return;
    }
    const fileInfo = resBody.data;
    // 关键：校验文件对象存在且url不为空
    if (!fileInfo?.url) {
      alert("文件不存在");
      return;
    }

    const res = await axios.get(fileInfo.url, { responseType: 'blob' });

    const blob = new Blob([res.data]);
    const url = URL.createObjectURL(blob);




    // 走到这里才创建a标签，保证a一定有值
    const a = document.createElement('a');
    a.href = url;
    a.download = fileInfo.fileName;
    console.log(a)
    document.body.appendChild(a);

    a.click();
    // 延迟移除，避免浏览器下载失效
    setTimeout(() => {
      document.body.removeChild(a);
    }, 50);
    deleteFileButton(filekey.value, fileInfo.fileName);
  } catch (err) {
    console.error('下载链接获取失败', err);
  }
};
//请求删除minio文件
const deleteFileButton = async (fileKey: string, fileName: string) => {
  const response = await deleteFileFromMinio(fileKey,fileName);
  if (response.data.code === 200) {
    ElNotification({
      title: '成功',
      message: '文件删除成功',
      type: 'success',
    });
  } else {
    ElNotification({
      title: '错误',
      message: '文件删除失败',
      type: 'error',
    });
  }
};
</script>

<template>
  <el-div>
    <el-card shadow="hover" style="background-color: blanchedalmond;">
      <template #header>
        <div class="card-content">
          <h2 style="text-align: center">下载文件</h2>
        </div>
      </template>

      <el-form>
        <el-form-item label="文件key">
          <el-input v-model="filekey" placeholder="请输入文件key"></el-input>
        </el-form-item>
        <el-form-item label="下载链接">
          <p v-if="downloadLink">{{ downloadLink }}</p>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="downloadFileButton">下载</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </el-div>
</template>

<style lang="scss" scoped>

</style>