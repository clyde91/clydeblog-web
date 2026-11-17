// 后台日志详情
<template>
  <el-form class="elform" :model="data.form" label-width="100px">
    <el-form-item label="标题">
      <el-input v-model="data.form.title" />
    </el-form-item>
    <el-form-item label="日期">
      <el-col :span="11">
        <el-date-picker
          v-model="data.form.createdTime"
          type="datetime"
          placeholder="Pick a date"
          style="width: 100%"
        />
      </el-col>
    </el-form-item>
    <el-form-item label="正文">
      <ckeditor
        :editor="ClassicEditor"
        v-model="data.form.body"
        :config="custom_config"
      ></ckeditor>
    </el-form-item>
    <el-form-item label="是否隐私">
       
      <el-switch
        v-model="data.form.hidden"
        :active-value="true"
        :inactive-value="false"
      />
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="onSubmit">提交</el-button>
      <Back>取消</Back>
    </el-form-item>
  </el-form>
</template>
<script setup>
import { MyUploadAdapter } from "@/api/UploadAdapter.js"; //导入自定义上传适配器
import ClassicEditor from "@/api/ckeditor.js"; //导入Ckeditor
import axios from "@/utils/axios"; //导入axios
import router from "@/router"; //导入路由
import Back from "@/components/button/Back.vue";
import { ref, reactive, getCurrentInstance } from "vue";
const { proxy } = getCurrentInstance();
let api = "diary";
let data = reactive({
  form: {},
});

if (proxy.$route.params.id != undefined) {
  getDetail();
}
function getDetail() {
  axios({
    method: "get",
    url: `/${api}/${proxy.$route.params.id}`,
  })
    .then((res) => {
      data.form = res.data.data;
    })
    .catch((error) => {
      console.log(error);
    });
}
function onSubmit() {
  axios({
    method: "post",
    url: `/${api}/update`,
    data: data.form,
  })
    .then((res) => {
      router.push(`/admin/${api}`); //回到列表
    })
    .catch((error) => {
      console.log(error);
    });
}

const custom_config = {
  extraPlugins: [MyCustomUploadAdapterPlugin],
};

function MyCustomUploadAdapterPlugin(editor) {
  editor.plugins.get("FileRepository").createUploadAdapter = (loader) => {
    return new MyUploadAdapter(loader, `${api}/${proxy.$route.params.id || 'draft'}/`);
  };
}

</script>
