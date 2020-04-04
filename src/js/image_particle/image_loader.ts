export default class ImageLoader {
  private readonly src: string;

  private readonly image: HTMLImageElement;

  private readonly width: number;

  private readonly height: number;

  private imageData: ImageData | undefined;

  constructor(src: string, width: number, height: number) {
    console.log(src);
    this.src = src;
    // eslint-disable-next-line no-undef
    this.image = new Image();
    this.width = width;
    this.height = height;
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
    const ctx: CanvasRenderingContext2D = canvas.getContext('2d') as CanvasRenderingContext2D;
    canvas.width = this.width;
    canvas.height = this.height;
    ctx.drawImage(this.image, 0, 0);
    this.imageData = ctx.getImageData(0, 0, this.width, this.height);
    return this.imageData;
  }
}
