import {HTMLTemp} from '../../../types';

const tpl = require('./index.html');
require('./index.scss');

class Layer implements HTMLTemp {
  public readonly name: string;

  public readonly tpl: string = tpl;

  constructor(name: string) {
    this.name = name;
  }
}

export default Layer;
