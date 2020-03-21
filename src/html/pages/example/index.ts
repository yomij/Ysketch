const tpl  = require("./index.html");
require('../../../css/example.scss')
import { HTMLTemp } from '../../../types';

class layer implements HTMLTemp {
    public readonly name: string;
    public readonly tpl: string;
    constructor (name: string) {
        this.name = name
        this.tpl = tpl
    }
}

export default layer;

