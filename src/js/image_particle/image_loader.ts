export default class ImageLoader {
  private readonly src: string;

  private readonly image: HTMLImageElement;

  private readonly width: number; // 指定的图片宽

  private readonly height: number; // 指定的图片宽

  // private readonly density: number; // 筛选的密度指数，越大，约稀

  private imageData: ImageData | undefined;

  constructor(src: string, width: number, height: number) {
    this.src = src;
    this.image = new Image();
    this.width = width;
    this.height = height;
    // this.density = density;
  }

  async load(): Promise <ImageData> {
    if (this.imageData) return this.imageData;
    const e: Event = await this.loadImage();
    if (e.type === 'load') {
      return this.getImageData();
    }
    throw Error('image load failed');
  }

  async loadImage(): Promise <Event> {
    this.image.src = this.src;
    return new Promise((resolve, reject) => {
      this.image.onload = resolve;
      this.image.onerror = reject;
    });
  }

  getImageData(): ImageData {
    const canvas: HTMLCanvasElement = document.createElement('canvas');
    const ctx: CanvasRenderingContext2D = canvas.getContext('2d')!; // 非空
    canvas.width = this.width;
    canvas.height = this.height;
    ctx.drawImage(this.image, 0, 0);
    this.imageData = ctx.getImageData(0, 0, this.width, this.height);
    return this.imageData;
  }

  static filterImageData(
    imgData: ImageData,
    density: number,
    threshold = 200,
  ): Array<number> {
    const points = [];
    const { data, width, height } = imgData;
    // for (let x = 0; x < width / density; x += 1) {
    //   for (let y = 0; y < height / density; y += 1) {
    //     if (data[(x * density + y * width) * 4] > threshold) {
    //       points.push(0, x * density - width / 2, height / 2 - y * density);
    //     }
    //   }
    // }
    for (let y = 0; y < width; y += 1) { // 一行一行操作色值数组
      // eslint-disable-next-line no-continue
      if (y % 3 > 0) continue; // 密度控制
      for (let x = 0; x < width; x += 1) {
        // eslint-disable-next-line no-continue
        if (x % 3 > 0) continue; // 密度控制
        if (data[(x + y * width) * 4] > 200) { // 色值筛选 R > 200
          points.push(0, (y - width / 2) * -1, (x - width / 2) * -1); // 放入点坐标 ，y z
        }
      }
    }
    return points;
  }
}
