import axios from "@/utils/axios";

const MAX_IMAGE_SIZE = 10 * 1024 * 1024;

function cancelledError() {
  const error = new Error("上传已取消");
  error.name = "AbortError";
  return error;
}

function createFilename(file) {
  const bytes = new Uint8Array(16);
  crypto.getRandomValues(bytes);
  const id = Array.from(bytes, byte => byte.toString(16).padStart(2, "0")).join("");
  const extension = file.name.match(/\.[a-z0-9]+$/i);
  return id + (extension ? extension[0].toLowerCase() : "");
}

// 只向业务后端请求签名；文件直接以表单上传 OSS，不携带业务请求头或长期密钥。
export async function uploadImage(file, api, { signal, onProgress } = {}) {
  if (signal && signal.aborted) throw cancelledError();
  if (!file || !file.size) throw new Error("请选择非空图片文件");
  if (file.size > MAX_IMAGE_SIZE) throw new Error("上传文件大小不能超过 10MB");
  if (file.type ? !file.type.startsWith("image/") : !/\.(jpe?g|png|gif|webp|bmp|avif|tiff?)$/i.test(file.name)) {
    throw new Error("仅支持上传图片文件");
  }

  const response = await axios({
    method: "get",
    url: "/oss/policy",
    params: { api },
    signal,
  }).catch(error => {
    if (signal && signal.aborted) throw cancelledError();
    throw error;
  });
  if (signal && signal.aborted) throw cancelledError();
  const body = response.data;
  if (!body || (body.code != null && Number(body.code) !== 200)) {
    throw new Error("获取上传授权失败");
  }
  const policy = body.data;
  if (!policy || !policy.host || !policy.accessKeyId || !policy.policy || !policy.signature ||
      (!policy.key && typeof policy.dir !== "string")) {
    throw new Error("上传授权信息不完整");
  }
  const host = new URL(policy.host);
  if (!["https:", "http:"].includes(host.protocol) || host.username || host.password || host.search || host.hash) {
    throw new Error("上传地址无效");
  }

  // 优先使用后端签发的对象名；兼容现有只返回 dir 的接口。
  const filename = createFilename(file);
  const key = policy.key
    ? policy.key.replace(/\$\{filename\}/g, filename)
    : policy.dir + filename;
  const url = host.href.replace(/\/$/, "") + "/" + key.split("/").map(encodeURIComponent).join("/");
  const form = new FormData();
  form.append("key", key);
  form.append("OSSAccessKeyId", policy.accessKeyId);
  form.append("policy", policy.policy);
  form.append("Signature", policy.signature);
  if (policy.securityToken) form.append("x-oss-security-token", policy.securityToken);
  // OSS 要求 file 字段位于表单最后。
  form.append("file", file, file.name);

  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    const finish = (error) => {
      if (signal) signal.removeEventListener("abort", abort);
      if (error) reject(error);
      else resolve({ url, key });
    };
    const abort = () => xhr.abort();
    xhr.open("POST", host.href, true);
    xhr.timeout = 120000;
    xhr.onload = () => {
      if (xhr.status >= 200 && xhr.status < 300) finish();
      else finish(new Error(`图片上传失败（HTTP ${xhr.status}）`));
    };
    xhr.onerror = () => finish(new Error("图片上传失败，请检查网络或 OSS 跨域配置"));
    xhr.ontimeout = () => finish(new Error("图片上传超时，请重试"));
    xhr.onabort = () => finish(cancelledError());
    xhr.upload.onprogress = event => {
      if (event.lengthComputable && onProgress) {
        onProgress({ loaded: event.loaded, total: event.total, percent: event.loaded / event.total * 100 });
      }
    };
    if (signal) signal.addEventListener("abort", abort, { once: true });
    try {
      xhr.send(form);
    } catch (error) {
      finish(error);
    }
  });
}
