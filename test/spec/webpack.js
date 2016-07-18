'use strict';

var path = require('path');
var webpack = require('webpack');

describe('When using Webpack, Stealthy-Require', function () {

    it('should allow Webpack to replace the require call', function (done) {

        var config = {
            entry: path.join(__dirname, '../fixtures/stealthy-require.js'),
            output: {
                path: path.join(__dirname, '../results'),
                filename: 'webpack.bundle.js'
            }
        };

        webpack(config, function (err, stats) {

            if (err) {
                done(err);
                return;
            }

            stats = stats.toJson();

            if (stats.errors && stats.errors.length > 0) {
                done(stats.errors);
                return;
            }

            var log = [];
            var origConsoleLog = console.log;
            console.log = function (text) {
                log.push(text);
            };

            require('../results/webpack.bundle.js');

            console.log = origConsoleLog;

            expect(log.length).to.eql(3);
            expect(log[0]).to.eql(log[2]);
            expect(log[0]).to.not.eql(log[1]);

            done();

        });

    });

});
