T = {                 // T global object - THS700
  settings: {
    port: "COM4",     // port
    baudRate: 9600,   // 300 to 38400
    dataBits: 8,      // databits for THS700 are value 8 only
    stopBits: 1,      // 1 or 2
    parity: "none",   // none, odd, even
    xonxoff: false,   // Softflagging in reality 3 options: xon, xoff, xany
    rtscts: true,     // Hardflagging
    delay: 0,         // 0s to 60s in 100ms increments
    EOL: "LF" },      // LF, CR, LF_CR, CR_LF - maybe use unicode
  data: '',           // data holder
  encoding: 'ascii',  // ascii utf8 utf16le ucs2 base64 binary hex
  EOL: '\n'           // EOL character LF=\n CR=\r
};

T.serialport = require("serialport"); // import serialport
T.settings.parser = T.serialport.parsers.readline(T.EOL, T.encoding); // default parser

T.write = function(instruction) { // Check if T.connb exists
  T.conn.write(instruction+T.EOL, function (err, results) {
    if (err) { alert(err) }
    else {
      console.log(instruction);
      $('#tekConsole').val( instruction + "\n" + $('#tekConsole').val() );
    }
     }) }

T.connect = function(){
  T.runSettings = $.extend(true, {}, T.settings); // clone settings
  T.conn = new T.serialport.SerialPort(T.settings.port, T.runSettings, false);
  T.conn.open(function () {
    console.log('Serial port open at '+T.settings.port);
    T.conn.on('error', function (err) { alert(err) });
    T.conn.on('close', function(err) { console.log('Serial port closed - '+T.settings.port) });
    T.conn.on('data', function (buffer){
      console.log(buffer);
      $('#tekConsole').val( buffer + "\n" + $('#tekConsole').val() ) });
    T.write("ID?"); }) };
