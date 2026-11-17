<template>
  <el-upload
    class="avatar-uploader"
    action=""
    accept="image/*"
    :show-file-list="false"
    :on-success="handleAvatarSuccess"
    :http-request="uploadRequest"
    :on-error="handleUploadError"
    :on-remove="cancelUpload"
  >
    <img v-if="imageUrl" :src="imageUrl" class="avatar" />
    <el-icon v-else class="avatar-uploader-icon"><Plus /></el-icon>
  </el-upload>
</template>

<script setup>
import { uploadImage } from "@/api/oss";
import { ref, watch, onBeforeUnmount } from "vue";
import { ElMessage } from "element-plus";
import { Plus } from "@element-plus/icons-vue";
const props = defineProps({ api: String, oldImageUrl: { default: "" } }); //api为父组件传来的保存路径。如"test/"
const emit = defineEmits(["getImageUrl"]);
const imageUrl = ref(props.oldImageUrl);
const controllers = new Map();
watch(() => props.oldImageUrl, url => {
  imageUrl.value = url;
});
onBeforeUnmount(() => {
  controllers.forEach(controller => controller.abort());
});

function uploadRequest(options) {
  const controller = new AbortController();
  controllers.set(options.file.uid, controller);
  return uploadImage(options.file, props.api, {
    signal: controller.signal,
    onProgress: options.onProgress,
  }).finally(() => controllers.delete(options.file.uid));
}

function cancelUpload(file) {
  const controller = controllers.get(file.uid);
  if (controller) controller.abort();
}

function handleAvatarSuccess(response) {
  imageUrl.value = response.url;
  emit("getImageUrl", response.url);
}

function handleUploadError(error) {
  if (error.name !== "AbortError") ElMessage.error(error.message || "图片上传失败");
}
</script>

<style scoped>
.avatar-uploader .avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>

<style>
.avatar-uploader .el-upload {
  border: 1px dashed var(--el-border-color);
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  transition: var(--el-transition-duration-fast);
}

.avatar-uploader .el-upload:hover {
  border-color: var(--el-color-primary);
}

.el-icon.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  text-align: center;
}
</style>
