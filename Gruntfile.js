module.exports = function(grunt) {
  require('load-grunt-tasks')(grunt);

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    nodewebkit: {
      options: {
          build_dir: './builds/webkit', // Where the build version of my node-webkit app is saved
          mac: false, // We want to build it for mac
          win: true, // We want to build it for win
          linux32: false, // We don't need linux32
          linux64: false // We don't need linux64
      },
      src: ['./builds/src/*'] // Your node-wekit app
    },
    copy: {
      build: {
        files: [
          {expand: true, cwd: '', src: ['package.json'], dest: 'builds/src/'},
          {expand: true, cwd: 'scripts/js/', src: ['serial.js'], dest: 'builds/src/'},
          {expand: true, cwd: 'scripts/html/', src: ['index.html'], dest: 'builds/src/'},
          {expand: true, cwd: 'builds/nw_modules/', src: ['serialport/**'], dest: 'builds/src/node_modules'}
        ]},
      serialport: {
        files: [
          {expand: true, cwd: 'node_modules/', src: ['serialport/**'], dest: 'builds/nw_modules'}
        ]},
      nw_enigmavb: {
        files: [
          {expand: true, cwd: 'builds/webkit/cache/win/0.8.4', src: ['*.dll'], dest: 'builds/nw_enigmavb'},
          {expand: true, cwd: 'builds/webkit/cache/win/0.8.4', src: ['nw*.*'], dest: 'builds/nw_enigmavb'},
          {expand: true, cwd: 'builds/webkit/directX', src: ['*.*'], dest: 'builds/nw_enigmavb'}
        ]}
      },
    exec: {
        delete_src: { cmd: 'del builds\\nw /F /Q' },
        rename_zip: { cmd: 'del builds\\temp\\ths700.nw & rename builds\\temp\\ths700.zip ths700.nw' },
        compile_serialport: { cmd: 'cd builds\\nw_modules\\serialport && nw-gyp rebuild --target=0.8.4 && cd ..\\..\\..' },
        // run_ths700: { cmd: 'cd builds\\nw && nw ths700.nw' },
        join_nwAPP: { cmd: 'copy /b builds\\nw_enigmavb\\nw.exe+builds\\temp\\ths700.nw builds\\temp\\nw.exe' },
        run_enigma: { cmd: '\"C:\\Program Files\\Enigma Virtual Box\\enigmavb.exe" builds\\enigmavb\\ths700.evb' }
      },
    compress: {
      ths700: {
        options: { archive: 'builds/temp/ths700.zip' },
        files: [ {expand: true, cwd: 'builds/src/', src: ['**'], dest: ''} ] }
    }
  });

  //Note: the final Windows file needs to kept the name nw.exe because of the serialport mmodule

  // main task
  grunt.registerTask('build', [
    'exec:delete_src',    // removes old build
    'copy:build',         // copy files to builds/src
    'compress:ths700',    // zips the src
    'exec:rename_zip',    // renames the zip file to .nw
    'exec:join_nwAPP',    // joins nw.exe and the ths700.nw
    'exec:run_enigma']);  // Packaging for Windows using Enigma Virtual Box

  // support tasks
  // This command compiles the module serialport to be used by node-webkit (requires npm install -g nw-gyp)
  grunt.registerTask('compile_serialport', ['copy:serialport','exec:compile_serialport']);
  // puts together all files to pack together with the nw.exe application
  grunt.registerTask('enigmavb', ['copy:nw_enigmavb']);


};