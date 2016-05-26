'use strict';

module.exports = {
    me: Math.random(),
    sync_dep: require('./no-deps.js')
};

setTimeout(function () {
    module.exports.async_dep = require('./no-deps.js');
});
