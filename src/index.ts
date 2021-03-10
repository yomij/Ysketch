// import * as THREE from 'three';
import ImagePointPage from './html/pages/imagePoint';
import {HTMLTemp, TempOption} from './types';
import ImageDataRender from './js/image_point';

class App {
  private readonly dom: HTMLElement | null;

  constructor(option: TempOption) {
    this.dom = window.document.getElementById(option.el);
  }

  replace(layer: HTMLTemp): HTMLCanvasElement {
    if (!this.dom) throw Error('Dom No Find');
    this.dom.innerHTML = layer.tpl;
    return this.dom.querySelector('canvas') as HTMLCanvasElement;
  }
}

const app = new App({
  el: 'app',
  name: 'app',
});

const canvas = app.replace(new ImagePointPage('ImagePointPage'));

const image = require('./static/test.jpg').default;

const e = new ImageDataRender(canvas, {
  imgUrl: image,
  width: 500,
  height: 375,
  colorFilter: (r: number): boolean => (r > 200),
});

e.init();
