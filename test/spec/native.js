'use strict';

var stealthyRequire = require('../../lib/index.js')(require);


describe('When native modules are involved, Stealthy-Require', function () {

    it('should require a module with native deps', function () {

        var req1 = require('../fixtures/native-deps.js');

        var req2 = null;
        expect(function () {
            req2 = stealthyRequire('../fixtures/native-deps.js');
        }).not.to.throw(/* Error: Module did not self-register. */);

        var req3 = require('../fixtures/native-deps.js');

        expect(req1).to.eql(req3);
        expect(req1).to.not.eql(req2);

    });

});
