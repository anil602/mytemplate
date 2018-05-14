/**
 * Project JS tasks
 */
module.exports = function (grunt) {
    require("load-grunt-tasks")(grunt);

    // Project Config
    grunt.initConfig({
        // Package File
        pkg: grunt.file.readJSON("package.json"),

        /* ======================================================================== */
        /* xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx */
        /* ======================================================================== */

        /**
         * Uglify JS script
         * */
        uglify: {
            // Production config
            prod: {
                files: [{
                    expand: true,
                    cwd: "src/js",
                    src: ["*.js", "!*.min.js"],
                    dest: "dist/js/",
                    ext: ".min.js"
                }]
            },

            // Development config
            dev: {
                options: {
                    compress: false,
                    beautify: true,
                    mangle: false,
                    output: {
                        comments: 'all'
                    }
                },

                files: [{
                    expand: true,
                    cwd: "src/js",
                    src: ["*.js", "!*.min.js"],
                    dest: "dist/js/",
                    ext: ".min.js"
                }]
            }
        },

        /* ======================================================================== */
        /* xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx */
        /* ======================================================================== */

        /**
         * sass task
         * */
        sass: {
            options: {
                sourceMap: true,
                outputStyle: "expanded"
            },
            dist: {
                files: {
                    "dist/css/style.min.css": "src/scss/style.scss"
                }
            }
        },

        /* ======================================================================== */
        /* xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx */
        /* ======================================================================== */

        /**
         *  Watch files for changes
         * */
        watch: {
            scripts: {
                files: ["src/js/*.js"],
                tasks: ["uglify:dev"]
            },
            styles: {
                files: ["src/scss/**/*.scss"],
                tasks: ["sass"]
            }
        },

        /**
         * Apply vendor prefixes
         * */
        postcss: {
            options: {
                processors: [
                    require("autoprefixer")({
                        browsers: "last 2 versions"
                    }) // add vendor prefixes
                ]
            },
            dist: {
                files: {
                    "dist/css/style.min.css": "dist/css/style.min.css"
                }
            }
        },

        /**
         * combine media queries
         * */
        combine_mq: {
            options: {
                beautify: false
            },
            dist: {
                files: {
                    "dist/css/style.min.css": "dist/css/style.min.css"
                }
            }
        },

        /**
         * Browser sync
         * */
        browserSync: {
            bsFiles: {
                src: ["dist/css/*.css", "dist/js/*.js", "index.html"]
            },
            options: {
                server: {
                    baseDir: "./"
                },
                watchTask: true
            }
        }
    });

    /* ======================================================================== */
    /* xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx */
    /* ======================================================================== */

    // Uglify
    grunt.loadNpmTasks("grunt-contrib-uglify");

    // Sass
    grunt.loadNpmTasks("grunt-sass");

    // Watch changes
    grunt.loadNpmTasks("grunt-contrib-watch");

    // postcss task
    grunt.loadNpmTasks("grunt-postcss");

    // combine media queries
    grunt.loadNpmTasks("grunt-combine-mq");

    // Browser sync
    grunt.loadNpmTasks("grunt-browser-sync");

    // Register Tasks
    grunt.registerTask("default", [
        "sass",
        "browserSync",
        "watch"
    ]);

    // production mode
    grunt.registerTask("prod", [
        "sass",
        "postcss",
        "combine_mq",
        "uglify:prod"
    ]);
};
