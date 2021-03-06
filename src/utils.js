exports.define = function(obj, key, val, enumerable){
    Object.defineProperty(obj, key, {
        value: val,
        enumerable: !!enumerable,
        writable: true,
        configurable: true
    });
};

exports.defineFreeze = function(object, name, value){
    Object.defineProperty(object, name, {
        value: value,
        enumerable: false,
        writable: false,
        configurable: false
    });
};