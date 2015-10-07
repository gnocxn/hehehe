var grunt = require('grunt');
grunt.config('concat.mydeps', {
    files: [{
        src: ['components/**/*.js', '!components/**/*min.js'],
        dest: 'dist/lib.js'
    }]
})