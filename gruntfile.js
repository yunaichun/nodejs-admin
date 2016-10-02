module.exports = function(grunt) {
    grunt.initConfig({
            //watch file
            watch: {
                jade: {
                    files: ['views/**'],
                    options: {
                        livereload: true
                    }
                },
                js: {
                    files: ['public/js/**', 'models/**/*.js', 'schemas/**/*.js'],
                    //tasks: ['jshint'],
                    options: {
                        livereload: true
                    }
                },
                // uglify: {
                //     files: ['public/**/*.js'],
                //     tasks: ['jshint'],
                //     options: {
                //       livereload: true
                //     }
                //   },
                //   styles: {
                //     files: ['public/**/*.less'],
                //     tasks: ['less'],
                //     options: {
                //       nospawn: true
                //     }
                //   }
            },
            // jshint: {
            //   options: {
            //     jshintrc: '.jshintrc',
            //     ignores: ['public/libs/**/*.js']
            //   },
            //   all: ['public/js/*.js', 'test/**/*.js', 'app/**/*.js']
            // },

            // less: {
            //   development: {
            //     options: {
            //       compress: true,
            //       yuicompress: true,
            //       optimization: 2
            //     },
            //     files: {
            //       'public/build/index.css': 'public/less/index.less'
            //     }
            //   }
            // },

            // uglify: {
            //   development: {
            //     files: {
            //       'public/build/admin.min.js': 'public/js/admin.js',
            //       'public/build/detail.min.js': [
            //         'public/js/detail.js'
            //       ]
            //     }
            //   }
            // },
            //restart app.js
            nodemon: {
                dev: {
                    options: {
                        file: 'app.js',
                        args: [],
                        ignoredFiles: ['README.md', 'node_modules/**', '.DS_Store'],
                        watchedExtensions: ['js'],
                        watchedFolders: ['./'],
                        debug: true,
                        delayTime: 1,
                        env: {
                            PORT: 3000
                        },
                        cwd: __dirname
                    }
                }
            },
            // //配置单元测试任务
            // mochaTest: {
            //   options: {
            //     reporter: 'spec'
            //   },
            //   //指定测试目录  test下所有js目录
            //   src: ['test/**/*.js']
            // },
            //speedUp task
            concurrent: {
                tasks: ['nodemon', 'watch'],
                options: {
                    logConcurrentOutput: true
                }
            }
        })
        //watch file
    grunt.loadNpmTasks('grunt-contrib-watch');
    //restart app.js
    grunt.loadNpmTasks('grunt-nodemon');
    //speedUp task
    grunt.loadNpmTasks('grunt-concurrent');
    // //加载单元测试模块
    // grunt.loadNpmTasks('grunt-mocha-test');
    // grunt.loadNpmTasks('grunt-contrib-less')
    // grunt.loadNpmTasks('grunt-contrib-uglify')
    // grunt.loadNpmTasks('grunt-contrib-jshint')


    //aviod warning TO FORCE TASK
    grunt.option('force', true);
    //default task
    grunt.registerTask('default', ['concurrent']);

    // //注册任务
    // grunt.registerTask('test',  ['mochaTest']);
}
