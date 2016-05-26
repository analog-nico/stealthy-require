'use strict';

var forEach = require('lodash/forEach'),
    assign = require('lodash/assign');


module.exports = function stealthyRequire$init(require) {

    function clearCache() {
        forEach(require.cache, function (cachedModule, resolvedPath) {
            if (resolvedPath.match(/\.node$/) === null) {
                delete require.cache[resolvedPath];
            }
        });
    }

    return function stealthyRequire$exec(path) {

        var temp = assign({}, require.cache);
        clearCache();

        var freshModule = require(path);

        clearCache();
        assign(require.cache, temp);

        return freshModule;

    };

};
