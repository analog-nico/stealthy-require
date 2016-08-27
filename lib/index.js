'use strict';

var isNative = /\.node$/;

function forEach(obj, callback) {
    for ( var key in obj ) {
        /* istanbul ignore next */
        if (!Object.prototype.hasOwnProperty.call(obj, key)) {
            continue;
        }
        callback(key);
    }
}

function assign(target, source) {
    forEach(source, function (key) {
        target[key] = source[key];
    });
    return target;
}

function clearCache(requireCache) {
    forEach(requireCache, function (resolvedPath) {
        if (!isNative.test(resolvedPath)) {
            delete requireCache[resolvedPath];
        }
    });
}

module.exports = function (requireCache, callback) {

    var temp = assign({}, requireCache);
    clearCache(requireCache);

    var freshModule = callback();

    clearCache(requireCache);
    assign(requireCache, temp);

    return freshModule;

};
