const assert = require('assert').strict;
const fs = require('fs');
const vm = require('vm');
const { webcrypto } = require('crypto');

const file = { name: '图片 test.PNG', type: 'image/png', size: 1024 };
const policy = {
  host: 'https://example.oss-cn-shanghai.aliyuncs.com',
  dir: 'media/blog/draft/',
  accessKeyId: 'test-id', policy: 'test-policy', signature: 'test-signature',
};

function setup({ data = { code: 200, data: policy }, request, status = 204, event = 'load' } = {}) {
  const requests = [];
  const uploads = [];
  class FormData {
    constructor() { this.fields = []; }
    append(...args) { this.fields.push(args); }
  }
  class XMLHttpRequest {
    constructor() { this.upload = {}; uploads.push(this); }
    open(method, url) { this.method = method; this.url = url; }
    send(form) {
      this.form = form;
      if (event !== 'pending') queueMicrotask(() => {
        if (this.aborted) return;
        this.status = status;
        if (this.upload.onprogress) this.upload.onprogress({ lengthComputable: true, loaded: 512, total: 1024 });
        this['on' + event]();
      });
    }
    abort() { this.aborted = true; this.onabort(); }
  }
  const context = vm.createContext({
    URL, Uint8Array, crypto: webcrypto, FormData, XMLHttpRequest, AbortController,
    axios: options => {
      requests.push(options);
      return request ? request(options) : Promise.resolve({ data });
    },
  });
  const helper = fs.readFileSync('src/api/oss.js', 'utf8')
    .replace(/^import .*;\r?\n/m, '').replace('export async function', 'async function');
  vm.runInContext(helper + '\nthis.uploadImage = uploadImage;', context);
  const adapter = fs.readFileSync('src/api/UploadAdapter.js', 'utf8')
    .replace(/^\uFEFF/, '').replace(/^import .*;\r?\n/m, '').replace('export class', 'class');
  vm.runInContext(adapter + '\nthis.MyUploadAdapter = MyUploadAdapter;', context);
  return { ...context, context, requests, uploads };
}

const cases = [];
function test(name, fn) { cases.push([name, fn]); }

test('uses signed form fields and a unique object name, with file last', async () => {
  const env = setup();
  const first = await env.uploadImage(file, 'blog/draft/');
  const second = await env.uploadImage(file, 'blog/draft/');
  assert.equal(env.requests[0].url, '/oss/policy');
  assert.equal(env.requests[0].params.api, 'blog/draft/');
  assert.match(first.key, /^media\/blog\/draft\/[a-f0-9]{32}\.png$/);
  assert.notEqual(first.key, second.key);
  assert.equal(first.url, policy.host + '/' + first.key);
  const xhr = env.uploads[0];
  assert.equal(xhr.method, 'POST');
  assert.equal(xhr.url, policy.host + '/');
  const fields = Object.fromEntries(xhr.form.fields.map(([key, value]) => [key, value]));
  assert.equal(fields.key, first.key);
  assert.equal(fields.OSSAccessKeyId, policy.accessKeyId);
  assert.equal(fields.policy, policy.policy);
  assert.equal(fields.Signature, policy.signature);
  assert.equal(fields.file, file);
  assert.equal(xhr.form.fields.at(-1)[0], 'file');
  assert.equal(fields.accessKeySecret, undefined);
});

test('honors a server-assigned key and encodes the returned URL', async () => {
  const env = setup({ data: { code: 200, data: { ...policy, key: 'media/图片 1.png', securityToken: 'test-token' } } });
  const result = await env.uploadImage(file, 'blog/1/');
  assert.equal(result.key, 'media/图片 1.png');
  assert.equal(result.url, policy.host + '/media/' + encodeURIComponent('图片 1.png'));
  assert.equal(env.uploads[0].form.fields.find(([key]) => key === 'x-oss-security-token')[1], 'test-token');
});

test('replaces filename placeholders without retaining the original name', async () => {
  const env = setup({ data: { data: { ...policy, key: 'media/${filename}' } } });
  const result = await env.uploadImage(file, 'blog/');
  assert.match(result.key, /^media\/[a-f0-9]{32}\.png$/);
});

test('rejects invalid files before requesting upload authorization', async () => {
  const env = setup();
  for (const invalid of [null, { ...file, size: 0 }, { ...file, size: 10 * 1024 * 1024 + 1 }, { ...file, type: 'text/html' }]) {
    await assert.rejects(env.uploadImage(invalid, 'blog/'));
  }
  assert.equal(env.requests.length, 0);
});

test('rejects failed or incomplete authorization without uploading', async () => {
  for (const data of [{ code: 403, data: policy }, { code: 200, data: {} }, null]) {
    const env = setup({ data });
    await assert.rejects(env.uploadImage(file, 'blog/'));
    assert.equal(env.uploads.length, 0);
  }
});

test('propagates policy network errors', async () => {
  const failure = new Error('policy unavailable');
  const env = setup({ request: () => Promise.reject(failure) });
  await assert.rejects(env.uploadImage(file, 'blog/'), error => error === failure);
  assert.equal(env.uploads.length, 0);
});

test('propagates OSS rejection, network failure and timeout', async () => {
  for (const config of [{ status: 403 }, { event: 'error' }, { event: 'timeout' }]) {
    const env = setup(config);
    await assert.rejects(env.uploadImage(file, 'blog/'));
  }
});

test('cancels an upload while waiting for authorization', async () => {
  const env = setup({ request: ({ signal }) => new Promise((resolve, reject) => {
    signal.addEventListener('abort', () => reject(new Error('canceled')), { once: true });
  }) });
  const controller = new AbortController();
  const promise = env.uploadImage(file, 'blog/', { signal: controller.signal });
  controller.abort();
  await assert.rejects(promise, error => error.name === 'AbortError');
  assert.equal(env.uploads.length, 0);
});

test('cancels an active upload', async () => {
  const env = setup({ event: 'pending' });
  const controller = new AbortController();
  const promise = env.uploadImage(file, 'blog/', { signal: controller.signal });
  while (!env.uploads.length) await Promise.resolve();
  controller.abort();
  await assert.rejects(promise, error => error.name === 'AbortError');
  assert.equal(env.uploads[0].aborted, true);
});

test('CKEditor receives the URL and progress, and can cancel before the file resolves', async () => {
  const env = setup();
  const loader = { file: Promise.resolve(file) };
  const adapter = new env.MyUploadAdapter(loader, 'diary/draft/');
  const result = await adapter.upload();
  assert.match(result.default, /media\/blog\/draft\/.*\.png$/);
  assert.equal(env.requests[0].params.api, 'diary/draft/');
  assert.equal(loader.uploadTotal, 1024);
  assert.equal(loader.uploaded, 512);

  const canceled = setup();
  let resolveFile;
  const pending = new canceled.MyUploadAdapter({ file: new Promise(resolve => { resolveFile = resolve; }) }, 'blog/');
  const promise = pending.upload();
  pending.abort();
  resolveFile(file);
  await assert.rejects(promise, error => error.name === 'AbortError');
  assert.equal(canceled.requests.length, 0);
});

test('image upload component cancels requests on removal and unmount', async () => {
  for (const action of ['remove', 'unmount']) {
    const env = setup({ event: 'pending' });
    let unmount;
    Object.assign(env.context, {
      defineProps: () => ({ api: 'user/', oldImageUrl: '' }),
      defineEmits: () => () => {},
      ref: value => ({ value }), watch: () => {},
      onBeforeUnmount: callback => { unmount = callback; },
    });
    const component = fs.readFileSync('src/components/Upload.vue', 'utf8')
      .match(/<script setup>([\s\S]*?)<\/script>/)[1]
      .replace(/^import .*;\r?\n/gm, '');
    vm.runInContext(component, env.context);
    const uploadingFile = { ...file, uid: 1 };
    const promise = env.context.uploadRequest({ file: uploadingFile });
    while (!env.uploads.length) await Promise.resolve();
    if (action === 'remove') env.context.cancelUpload(uploadingFile);
    else unmount();
    await assert.rejects(promise, error => error.name === 'AbortError');
    assert.equal(env.uploads[0].aborted, true);
  }
});

(async () => {
  for (const [name, fn] of cases) {
    await fn();
    console.log('PASS ' + name);
  }
  console.log(`${cases.length} upload tests passed`);
})().catch(error => { console.error(error); process.exitCode = 1; });
