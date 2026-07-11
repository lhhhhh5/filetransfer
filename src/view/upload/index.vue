<script setup lang="ts">
import { ref } from 'vue';
const key = ref('空');

import {uploadFile,uploadFileToMinio} from '@/api/request';
import { ElNotification } from 'element-plus';


const fileAll = ref<File | null>(null);

const signature = ref<Map<string, string>>(new Map());

const formData = new FormData();

const bucketName = ref("");


const uploadRef = ref<InstanceType<typeof import('element-plus')['ElUpload']> | null>(null);



const getKey = async (uploadFil: any) => {
  const file = uploadFil.raw;
  console.log("上传的文件", file)
  try {
    const response = await uploadFile(file.name)
    console.log("后台访问成功", response)
    key.value = response.data.data.fileKeys
    console.log("获取key成功", key.value)
    // 后端返回对象
    const signObj = response.data.data.signerture
    // 转Map
    signature.value = new Map(Object.entries(signObj))
    console.log("凭证：",signature.value)

    //minio的桶bucket名称
    bucketName.value = response.data.data.bucket

    fileAll.value = file;

    for (const [key, value] of signature.value.entries()) {
      console.log(`${key}: ${value}`);
      formData.append(key, value);
    }
    formData.append("key",file.name)
    formData.append('file', file);
  } catch (err) {
    console.error('获取key失败', err)
    key.value = '请求出错'
  }
  // 阻止el-upload自动上传
  return false
}





//上传按钮
const uploadFileToMinioButton= async () => {
  if (!fileAll.value){
    //TODO 通知
    ElNotification({
      title: '错误',
      message: '请先选择文件',
      type: 'error',
    });
    console.log("没有文件")
  }else{
    
    try {
      const response = await uploadFileToMinio(bucketName.value, formData);
      console.log("上传到Minio成功", response)
      if(response.status === 200 || response.status === 201|| response.status === 204|| response.status === 202) {
        ElNotification({
          title: '成功',
          message: '文件上传成功',
          type: 'success',
        });
        uploadRef.value?.clearFiles();
      } else {
        ElNotification({
          title: '错误',
          message: '文件上传失败',
          type: 'error',
        });
      
    }
    } catch (err) {
      console.error('上传到Minio失败', err)
    }
  }
}

const handle = (files: any, fileList: any) => {
  uploadRef.value?.clearFiles();
  if(fileList.length > 1) {
    ElNotification({
      title: '错误',
      message: '只能上传一个文件',
      type: 'error',
    });
    console.log("只能上传一个文件")
  }
  if(files.size > 10 * 1024 * 1024) { // 10MB
    ElNotification({
      title: '错误',
      message: '文件大小不能超过10MB',
      type: 'error',
    });
    console.log("文件大小不能超过10MB")
  }
}
</script>

<template>
  <div>
    <h1>目前只能上传小文件，不得大于10mb</h1>
    <el-upload
    ref="uploadRef"
    drag show-file-list action="" :auto-upload="false" 
    :on-exceed="handle"
    :on-change="getKey" limit="1">

    <!-- !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!! file获取的是raw，需要通过raw属性获取原始文件对象 关闭自动上传不会触发上传钩子-->
      <el-icon><Upload /></el-icon>
      <div class="el-upload__text">将文件拖到此处，或<em>点击上传获取key</em></div>
    </el-upload>
    <el-button type="primary" style="margin-top: 20px" @click="uploadFileToMinioButton">确认上传文件</el-button>
  </div>

  <div style="margin-top: 20px;min-width: 300px;margin:auto">
    <el-card>
      <div>
        <h1>文件的key</h1>
        <hr/>
        <p>{{ key }}</p>
      </div>
    </el-card>
  </div>
</template>

<style lang="scss" scoped>

</style>