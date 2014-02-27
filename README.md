# THS700js

This is an application to interface with a Tektronix THS700-series handheld oscilloscopes (THS710, THS720 and THS730).

This application uses [node-webkit](https://github.com/rogerwang/node-webkit) and is developed mostly in Javascript.

## Usage:

We will make available compiled versions after reaching a good level of functionality.

Meanwhile this source code will make sense for who has experience with [NodeJS](http://nodejs.org/) and [Grunt](http://gruntjs.com/).
We use the node module [serialport](https://github.com/voodootikigod/node-serialport) to handle the RS232 communication with the device - special attention needs to be made to [build native modules using nw-gyp](https://github.com/rogerwang/node-webkit/wiki/Build-native-modules-with-nw-gyp)

The code is documented and BDD tests are included.

## License:
The MIT License (MIT)

Copyright � 2014 Joe Rosa