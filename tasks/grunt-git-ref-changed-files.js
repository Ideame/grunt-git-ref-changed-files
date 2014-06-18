/*
 * grunt-git-ref-changed-files
 * https://github.com/Ideame/grunt-git-ref-changed-files
 *
 * Copyright (c) 2013 Ideame
 */
module.exports = function (grunt) {
    var _ = require('underscore')
        , util = require('util');

    grunt.registerMultiTask("refChangedFiles", "Detects which files have changed between two git refs.", function () {
        var done = this.async();

        var options = this.options({
            from: 'HEAD^',
            to: 'HEAD',
            regexp: /.*/
        });

        var src = this.filesSrc[0];

        if (!src) {
            grunt.fail.warn('The src folder provided does not exists.');
        }

        grunt.util.spawn({
            cmd: 'git',
            args: [ 'log', util.format('%s..%s', options.from, options.to), '--name-only', '--pretty=format:' ],
            opts: { cwd: src }
        }, function (err, result){

            grunt.log.writeln('Checking if provided regular expression matches with file changes in the last commit.');

            if (err) {
                grunt.log.error(err);
                return done();
            }

            var refsChangedFiles = _.compact(String(result).split(grunt.util.linefeed));

            grunt.verbose.write(refsChangedFiles);

            var changedFiles = _.filter(refsChangedFiles, function (f) {
                return new RegExp(options.regexp).test(f);
            });

            grunt.config.set('refChangedFiles', changedFiles);

            done();
        });
    });
};
