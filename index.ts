// import * as THREE from 'three';
import Example from './src/html/pages/example/index';
import {HTMLTemp, TempOption} from './src/types';
import ExampleRender from './src/js/image_particle';

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
  el: 'add',
  name: 'app',
});

const e = new ExampleRender('ex');
e.init();
