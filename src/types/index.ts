export interface HTMLTemp {
  readonly name: string;
  readonly tpl: string;
}

export interface TempOption {
  readonly name: string;
  readonly el: string;
}

export interface YRender {
  readonly canvas: HTMLElement;

  init(): YRender;
}

export interface Point {

}
