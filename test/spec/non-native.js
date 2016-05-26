'use strict';

var stealthyRequire = require('../../lib/index.js')(require);


describe('When only non-native modules are involved, Stealthy-Require', function () {

    it('should require a module without deps', function () {

        var req1 = require('../fixtures/no-deps.js');
        var req2 = stealthyRequire('../fixtures/no-deps.js');
        var req3 = require('../fixtures/no-deps.js');

        expect(req1).to.eql(req3);
        expect(req1).to.not.eql(req2);

    });

    it('should require a module with sync deps', function () {

        var req1 = require('../fixtures/sync-deps.js');
        var req2 = stealthyRequire('../fixtures/sync-deps.js');
        var req3 = require('../fixtures/sync-deps.js');

        expect(req1).to.eql(req3);
        expect(req1).to.not.eql(req2);

    });

    it('should require a module with the exception of async deps', function () {

        var req1 = require('../fixtures/async-deps.js');
        var req2 = stealthyRequire('../fixtures/async-deps.js');
        var req3 = require('../fixtures/async-deps.js');

        expect(req1).to.eql(req3);
        expect(req1.me).to.not.eql(req2.me);
        expect(req1.sync_dep).to.not.eql(req2.sync_dep);
        expect(req1.async_dep).to.eql(req2.async_dep); // <-- exception

    });

});
