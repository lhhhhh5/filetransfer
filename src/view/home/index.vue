<script setup lang="ts">

import router from '@/router';
import { ref, watch, nextTick } from 'vue';
import { useRoute } from 'vue-router';
import { ElMenu } from 'element-plus';
const route = useRoute();
const menuRef = ref<InstanceType<typeof ElMenu> & {
  updateActiveIndex: (path: string) => void
}>()
router.push('/shouye') // 默认跳转到首页
watch(
  () => route.path,
  () => {
    nextTick(() => {
      // 路由路径 = menu-item 的 index，自动高亮
      menuRef.value?.updateActiveIndex(route.path)
    })
  },
  { immediate: true } // 页面首次加载也执行一次
)


</script>

<template>
<el-container>
  <el-header>
    <el-menu ref="menuRef" mode="horizontal" default-active="/shouye" background-color="#545c64" text-color="#fff" active-text-color="#ffd04b"
      router>
      <el-menu-item index="/shouye">首页</el-menu-item>
      <el-menu-item index="/upload">上传文件</el-menu-item>
      <el-menu-item index="/download">下载文件</el-menu-item>
    </el-menu>
  </el-header>
  <el-main>
    <router-view />
  </el-main>
</el-container>
</template>

<style lang="scss" scoped>
el-container {
  height: 100%;
}
</style>