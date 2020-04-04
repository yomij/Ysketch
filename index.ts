import Example from './src/html/pages/example/index';
import { HTMLTemp, TempOption } from './src/types';
import ExampleRender from './src/js/image_particle';

class App {
  private readonly dom: HTMLElement | null;

  private layer: HTMLTemp;

  constructor(option: TempOption) {
    this.dom = window.document.getElementById(option.el);
    this.layer = new Example(option.name);
    this.dom && (this.dom.innerHTML = this.layer.tpl);
  }
}

// eslint-disable-next-line no-new
new App({
  el: 'add',
  name: 'app',
});

const e = new ExampleRender('ex');
e.init();

// var canvas: HTMLCanvasElement = document.getElementById('ex') as HTMLCanvasElement;
// if (canvas) {
//     var ctx = canvas.getContext('2d');
//     var grad = null;
//     var texture = null;
//
//     canvas.width = 200;
//     canvas.height = 200;
//     if (ctx) {
//         grad = ctx.createRadialGradient(100, 100, 20, 100, 100, 100);
//         grad.addColorStop(0.2, 'rgba(0, 0, 0, 1)');
//         grad.addColorStop(0.5, 'rgba(0, 0, 0, 0.3)');
//         grad.addColorStop(1.0, 'rgba(0, 0, 0, 0)');
//         ctx.fillStyle = grad;
//         ctx.arc(100, 100, 100, 0, Math.PI / 180, true);
//         ctx.fill();
//     }
// }
//
