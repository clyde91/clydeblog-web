import { uploadImage } from "@/api/oss";

export class MyUploadAdapter {
  constructor(loader, api) {
    this.loader = loader;
    this.api = api;
    this.controller = new AbortController();
  }

  async upload() {
    const file = await this.loader.file;
    const result = await uploadImage(file, this.api, {
      signal: this.controller.signal,
      onProgress: ({ loaded, total }) => {
        this.loader.uploadTotal = total;
        this.loader.uploaded = loaded;
      },
    });
    return { default: result.url };
  }

  abort() {
    this.controller.abort();
  }
}
