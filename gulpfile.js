'use strict';

var gulp = require('gulp');
var istanbul = require('gulp-istanbul');
var mocha = require('gulp-mocha');
var chalk = require('chalk');
var rimraf = require('rimraf');
var eslint = require('gulp-eslint');
var mkdirp = require('mkdirp');


var paths = {
    libJsFiles: './lib/**/*.js',
    specFiles: './test/spec/**/*.js',
    fixtureFiles: './test/fixtures/**/*.js',
    gulpfile: './gulpfile.js',
    eslintrc: './.eslintrc.json'
};


function lint() {

    return gulp.src([
        paths.libJsFiles,
        paths.gulpfile,
        paths.specFiles,
        paths.fixtureFiles,
        paths.gulpfile
    ])
        .pipe(eslint())
        .pipe(eslint.format())
        .pipe(eslint.failAfterError());

}

function cleanCoverage(done) {
    rimraf('./coverage', done);
}

function cleanResults(done) {
    rimraf('./test/results', function (err) {
        if (err) {
            return done(err);
        }
        mkdirp('./test/results', done);
    });
}

function instrument() {
    return gulp.src(paths.libJsFiles)
        .pipe(istanbul())
        .pipe(istanbul.hookRequire());
}

function runTest() {
    return gulp.src(paths.specFiles)
        .pipe(mocha())
        .on('error', function (err) {
            console.error(String(err));
            console.error(chalk.bold.bgRed(' TESTS FAILED '));
        })
        .pipe(istanbul.writeReports());
}

function test() {
    return gulp.series(cleanCoverage, cleanResults, instrument, runTest);
}

function testNoCov() {

    return gulp.src(paths.specFiles)
        .pipe(mocha())
        .on('error', function (err) {
            console.error(String(err));
            console.log(chalk.bold.bgRed(' TESTS FAILED '));
        });

}

function watch() {

    gulp.watch([
        paths.libJsFiles,
        paths.specFiles,
        paths.fixtureFiles,
        paths.gulpfile
    ], gulp.series(lint, test()));

    gulp.watch([
        paths.eslintrc
    ], lint);

}

module.exports = {
    dev: gulp.series(lint, test(), watch),
    test: gulp.series(lint, cleanResults, testNoCov, test()),
    testNoCov: testNoCov
};
