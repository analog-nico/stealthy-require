'use strict';

var browserify = require('browserify');
var fs = require('fs');
var path = require('path');

describe('When using Browserify, Stealthy-Require', function () {

    it('should allow Browserify to replace the require call (not working for require.cache)', function (done) {

        var b = browserify();
        b.add(path.join(__dirname, '../fixtures/stealthy-require.js'));
        b.bundle()
            .pipe(fs.createWriteStream(path.join(__dirname, '../results/browserify.bundle.js')))
            .on('finish', function () {

                var log = [];
                var origConsoleLog = console.log;
                console.log = function (text) {
                    log.push(text);
                };

                require('../results/browserify.bundle.js');

                console.log = origConsoleLog;

                expect(log.length).to.eql(3);
                expect(log[0]).to.eql(log[2]);
                // expect(log[0]).to.not.eql(log[1]); // Browserify doesn't provide require.cache
                expect(log[0]).to.eql(log[1]);

                done();

            });

    });

    it('should allow Browserify to replace the require call (working for 6th argument as cache)', function (done) {

        var b = browserify();
        b.add(path.join(__dirname, '../fixtures/stealthy-require-browserify.js'));
        b.bundle()
            .pipe(fs.createWriteStream(path.join(__dirname, '../results/browserify.custom.bundle.js')))
            .on('finish', function () {

                var log = [];
                var origConsoleLog = console.log;
                console.log = function (text) {
                    log.push(text);
                };

                require('../results/browserify.custom.bundle.js');

                console.log = origConsoleLog;

                expect(log.length).to.eql(3);
                expect(log[0]).to.eql(log[2]);
                expect(log[0]).to.not.eql(log[1]);

                done();

            });

    });

});
