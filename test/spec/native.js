'use strict';

var chai = require('chai');
var expect = chai.expect;

var stealthyRequire = require('../../');


describe('When native modules are involved, Stealthy-Require', function () {

    it('should require a module with native deps', function () {

        var req1 = require('../fixtures/native-deps.js');

        var req2 = null;
        expect(function () {
            req2 = stealthyRequire(require.cache, function () {
                return require('../fixtures/native-deps.js');
            });
        }).not.to.throw(/* Error: Module did not self-register. */);

        var req3 = require('../fixtures/native-deps.js');

        expect(req1).to.eql(req3);
        expect(req1).to.not.eql(req2);

    });

});
