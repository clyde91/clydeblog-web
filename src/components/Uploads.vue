<template>
  <el-upload
    class="avatar-uploader"
    :action="objData.host"
    :show-file-list="false"
    :on-success="handleAvatarSuccess"
    :before-upload="ossPolicy"
    :data="objData"
  >
    <img v-if="imageUrl" :src="imageUrl" class="avatar" />
    <el-icon v-else class="avatar-uploader-icon"><Plus /></el-icon>
  </el-upload>
</template>

<script setup>
import axios from '@/utils/axios'//导入axios
import { ref, reactive } from "vue";
import { ElMessage } from "element-plus";
import { Plus } from "@element-plus/icons-vue";
const props = defineProps({ api: String });//api为父组件传来的保存路径。如"test/"
const emit = defineEmits(["getImageUrl"]);
let objData = reactive({
  OSSAccessKeyId: "",
  policy: "",
  Signature: "",
  key: "",
  host: "",
  dir: "",
});

const imageUrl = ref("");
function beforeAvatarUpload(file) {
  const is10M = file.size > 1000;
  if (is10M) {
    ElMessage.error(`上传文件大小不能超过 10MB!`);
  }
  return is10M;
}

function handleAvatarSuccess(response, uploadFile) {
  imageUrl.value = URL.createObjectURL(uploadFile.raw);
  emit("getImageUrl", `${objData.host}${objData.dir}${uploadFile.name}`); //向父组件传图片地址数据
}

function ossPolicy(file) {
  // 直接停止上传return false;
  // 在上传前 进行服务器签名
  return new Promise((resolve, reject) => {
    // 请求后端
    axios({
        method: "get",
        url: "/oss/policy",
        params: { api: props.api }, //上传路径可以自己调。不用传回来的比如用外部传来的
      })
      // 当使用箭头函数  this 指向的是外层
      .then((response) => {
        objData.OSSAccessKeyId = response.data.accessid;
        objData.policy = response.data.policy;
        objData.Signature = response.data.signature;
        objData.dir = response.data.dir;
        objData.host = response.data.host; // 直传OSS的服务器地址
        objData.key = response.data.dir + "${filename}";
        resolve(true); // 继续上传
      })
      .catch(function (error) {
        console.log(error);
        reject(false); // 停止上传
      });
  });
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