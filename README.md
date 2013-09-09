grunt-git-ref-changed-files
===========================

> Detects which files have changed between two git refs.

## Getting Started
_If you haven't used [grunt](http://gruntjs.com/) before, be sure to check out the [Getting Started](https://github.com/cowboy/grunt/blob/master/docs/getting_started.md) guide._

From the same directory as your project's Gruntfile and package.json, install this plugin with the following command:

```bash
npm install grunt-git-ref-changed-files
```

Once that's done, add this line to your project's Gruntfile:

```js
grunt.loadNpmTasks('grunt-git-ref-changed-files');
```

## Overview

Inside your `Gruntfile.js` file add a section named `refChangedFiles`. This section specifies the
options to detect which files have changed between two refs (from/to) and a regular expression to filter them.

## How it works

It will query which files have changed since the specified from/to parameter using git by running:

```bash
git log {ref}..{ref} --name-only --pretty=format:
```

Finally it will filter the changed files by applying the **regexp** option to every item. The result of the filtered
files changed will be stored in a grunt config item called *refChangedFiles*.

## Config Example

Example to detect if static files where modified since *v.100* tag:

```javascript
refChangedFiles: {
    dist: {
        options: {
            from: 'v.100', // optional: default is HEAD^
            to: 'HEAD', // optional: default is HEAD
            regexp: /public\/lib\/js/, // optional: default is /.*/
        },
        src: 'repoFolder'
    }
}
```
Then you can access to the filtered changed files using:

```javascript
grunt.config.get('refChangedFiles');
```

License
-------

Copyright (c) 2012 Juan Pablo Garcia
Licensed under the MIT license.
