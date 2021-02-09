// import * as THREE from 'three';
import Example from './html/pages/example';
import { HTMLTemp, TempOption } from './types';
import ImageDataRender from './js/image_particle';

class App {
  private readonly dom: HTMLElement | null;

  private layer: HTMLTemp;

  constructor(option: TempOption) {
    this.dom = window.document.getElementById(option.el);
    this.layer = new Example(option.name);
    // eslint-disable-next-line no-new,no-unused-expressions
    this.dom && (this.dom.innerHTML = this.layer.tpl);
  }
}

// eslint-disable-next-line no-new
new App({
  el: 'app',
  name: 'app',
});

const e = new ImageDataRender('ex');
e.init()
