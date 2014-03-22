T = {               // global THS700
  settings: {
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
T.write = function(instruction) {
  // Check if T.connb exists
  // T.buffer=''; // Data comes in chunks
  T.conn.write(instruction, function (err, results) {
    if (err) { alert(err) } }); 
}

T.connect = function() {
  // T.settings.parser = T.serialport.parsers.raw; // default parser
  T.settings.parser = T.serialport.parsers.readline(T.EOL, T.encoding); // default parser
  T.conn = new T.serialport.SerialPort(T.settings.port, T.settings, false);
  T.conn.open(function () {
    console.log('Serial port open at '+T.settings.port);
    T.conn.on('error', function (err) { alert('Error: ' + err) });
    T.conn.on('close', function(err) { console.log('Serialport closed!!!') });
    T.conn.on('data', function (buffer){
      $('#tekConsole').val($('#tekConsole').val() + "\n" + buffer); });
    console.log('Before T.getID');
    T.write("ID?\n");
  });
};


function connectionCntrll($scope) {
  $scope.main = {  };
  $scope.defaults = T.settings;
//  $scope.defaults = {baudrate: "9600", parity: "even", xonxof: false, ctsrts: true, stopbits: "1", EOL: "LF"};
  $scope.baudrates = [
    {label: "38400", value: "38400"},
    {label: "19200", value: "19200"},
    {label: "9600", value: "9600"},
    {label: "4800", value: "4800"},
    {label: "2400", value: "2400"},
    {label: "1200", value: "1200"},
    {label: "600", value: "600"},
    {label: "300", value: "300"}
  ];
  $scope.stopbits = [
    {label: "1", value: "1"},
    {label: "2", value: "2"}
  ];
  $scope.parities = [
    {label: "None", value: "none"},
    {label: "Even", value: "even"},
    {label: "Odd", value: "odd"}
  ];
  $scope.EOLS = [
    {label: "LF", value: "LF"},
    {label: "CR", value: "CR"},
    {label: "LF/CR", value: "LF_CR"},
    {label: "CR/LF", value: "CR_LF"}
  ];
  $scope.showValues = function () {alert(JSON.stringify(this.defaults))};
  $scope.getPorts = function (){
    $('#conn-port').empty();
    T.serialport.list(function (err, ports) {
      if (err) { alert(err); }
      else {
        ports.forEach(function (port) {
          $('#conn-port').append($('<option>', { value: port.comName }).text(port.comName));
  }) } }) };

  $scope.close = function() {
    T.conn.close( function(err){ // close port if is open
      if (err) { alert(err) }
      else { console.log('Closing: ' + T.settings.port); } }) }

  $scope.connect = function() {
    // Should send the port as a variable -- check if port is not null
    T.settings = this.defaults;
    T.settings.port = $('#conn-port :selected').text();
    // console.log(T.settings);
    if (T.conn){ T.conn.close( function(err){ // close port if is open
      if (err) { alert(err) }
      else {
        console.log('Closing: ' + T.settings.port);
        // T.conn = null;
        // delete T.conn;
        // console.log('reopening');
        T.connect() } }) }
    else  { T.connect() }
  };

}