<template>
  <br /><br />
  <el-card style="border-radius: 18px">
    <el-form :model="form" label-width="120px" :rules="rules">
      <el-form-item label="用户名" prop="username">
        <el-input v-model="form.username" />
      </el-form-item>
      <el-form-item label="输入密码" prop="password">
        <el-input v-model="form.password" type="password" show-password />
      </el-form-item>
      <el-form-item label="再次输入密码" prop="confirmpassword">
        <el-input
          v-model="form.confirmpassword"
          type="password"
          show-password
        />
      </el-form-item>
      <el-form-item label="上传图片">
        <Upload @getImageUrl="getImageUrl" api="user/"></Upload>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="onSubmit">提交</el-button>
        <Back>取消</Back>
      </el-form-item>
    </el-form>
  </el-card>
</template>

<script  setup>
import { reactive } from "vue";
import axios from "@/utils/axios"; //导入axios
import Back from "@/components/button/Back.vue";
import Upload from "@/components/Upload.vue";
import { ElMessage } from "element-plus";
import router from "@/router"; //导入路由
// do not use same name with ref
const form = reactive({
  username: "",
  password: "",
  confirmpassword: "",
  avatar: "",
});
const rules = reactive({
  username: [
    { required: true, message: '请输入用户名', trigger: 'blur' },
    { min: 2, max: 12, message: '用户长度为2-12', trigger: 'blur' },
  ],
  password: [
    {
      required: true,
      message: '请输入密码',
      trigger: 'change',
    },
  ],
  confirmpassword: [
    {
      required: true,
      message: '需要',
      trigger: 'change',
    },
  ],
})


const onSubmit = () => {
  if(form.password!=form.confirmpassword){
      ElMessage({
      message: "2次输入不一致",
      type: "error",
    });
    return
  }
    axios({
    method: "post",
    url: `/register`,
    data: form,
  })
    .then((res) => {
      if(res.data.code==200){
      ElMessage({
      message: "注册成功",
      type: "success",
    });
    router.push('/login'); //回到列表
      }else{
      ElMessage({
      message: "注册失败。用户名重复",
      type: "error",
    });
      }
      
    })
    .catch((error) => {
      console.log(error);
    });
};

const getImageUrl = (url) => {
  form.avatar = url;
};
</script>
