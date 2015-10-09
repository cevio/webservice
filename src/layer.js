import PathToRegExp from 'path-to-regexp';

export default class {
    constructor(expression, handle, type){
        this.keys = [];
        this.handle = handle;
        this.expression = expression;
        this.RegExpExpression = PathToRegExp(this.expression, this.keys);
        this.param = {};
        this.type = type || 'use';
    }

    match(url){
        let exec = this.RegExpExpression.exec(url);
        if ( exec ){
            for ( let i = 1 ; i < exec.length ; i++ ){
                let item = this.keys[i - 1];
                this.param[item.name] = exec[i];
            }
            return true;
        }
    }
}