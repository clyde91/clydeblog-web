<template>
    <ckeditor :editor="editor" v-model="text" @blur="sendText" ></ckeditor>
</template>
<script setup>
import ClassicEditor from "@/api/ckeditor.js";
const emit = defineEmits(["getText"]);
const props = defineProps({ text: String });
const editor = ClassicEditor;
function sendText() {
  emit("getText", props.text);
}
</script>
<style>
.ck-content{
  min-height: 600px;
  width: 900px;
}
</style>