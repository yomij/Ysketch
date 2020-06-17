export default class ImageLoader {
  private readonly src: string;

  private readonly image: HTMLImageElement;

  private readonly width: number; // 指定的图片宽

  private readonly height: number; // 指定的图片宽

  private readonly density: number; // 筛选的密度指数，越大，约稀

  private imageData: ImageData | undefined;

  constructor(src: string, width: number, height: number, density: number) {
    this.src = src;
    this.image = new Image();
    this.width = width;
    this.height = height;
    this.density = density;
    this.init().catch((e) => {
      console.log(e);
    });
  }

  async init(): Promise <void> {
    const e: Event = await this.loadImage();
    if (e.type === 'load') {
      this.getImageData();
    } else {
      throw Error('image load failed');
    }
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
    const ctx: CanvasRenderingContext2D = canvas.getContext('2d')!;
    canvas.width = this.width;
    canvas.height = this.height;
    ctx.drawImage(this.image, 0, 0);
    this.imageData = ctx.getImageData(0, 0, this.width, this.height);
    return this.imageData;
  }
}
